#include <stdbool.h>  // for bool, true, false
#include <stdio.h>    // for printf, fprintf, sscanf, snprintf
#include <stdlib.h>   // for exit
#include <string.h>   // for strlen
#include <time.h>     // for time_t, struct tm, mktime, difftime, time

/** Maximum length for date string in dd/mm/yyyy format. */
#define DATE_STR_MAX_LEN 16

/** Maximum length for WOA result string. */
#define WOA_STR_MAX_LEN 32

/** Days to add to LMP day component for EDD calculation. */
#define EDD_DAY_OFFSET 7

/** Months to adjust for EDD (subtract 3 or add 9). */
#define EDD_MONTH_OFFSET 3

/** Return codes for API functions. */
typedef enum {
    NAEGELES_OK                   = 0,  /**< Operation successful. */
    NAEGELES_ERR_NULL_PARAM       = -1, /**< NULL parameter provided. */
    NAEGELES_ERR_INVALID_DATE     = -2, /**< Invalid date format or value. */
    NAEGELES_ERR_DATE_CONVERSION  = -3, /**< Failed to convert date. */
    NAEGELES_ERR_SYSTEM_TIME      = -4, /**< Failed to get system time. */
    NAEGELES_ERR_FUTURE_DATE      = -5, /**< LNMP date is in the future. */
    NAEGELES_ERR_BUFFER_TOO_SMALL = -6  /**< Output buffer too small. */
} naegeles_error_t;

/**
 * Checks if a given year is a leap year.
 * @param year The year to check.
 * @return true if leap year, false otherwise.
 */
static bool is_leap_year(int year) {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

/**
 * Returns the number of days in a given month for a given year.
 * @param month Month (1-12).
 * @param year Year to account for leap years.
 * @return Number of days in the month, or 0 if month is invalid.
 */
static int days_in_month(int month, int year) {
    static const int days[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    if (month < 1 || month > 12) {
        return 0;
    }
    if (month == 2 && is_leap_year(year)) {
        return 29;
    }
    return days[month - 1];
}

/**
 * Validates if a date is valid.
 * @param day Day of month (1-31).
 * @param month Month (1-12).
 * @param year Year (must be reasonable, e.g., 1900-2100).
 * @return true if valid, false otherwise.
 */
static bool is_valid_date(int day, int month, int year) {
    if (year < 1900 || year > 2100) {
        return false;
    }
    if (month < 1 || month > 12) {
        return false;
    }
    if (day < 1 || day > days_in_month(month, year)) {
        return false;
    }
    return true;
}

/**
 * Parses a date string in dd/mm/yyyy format.
 * @param lnmp Input date string.
 * @param day Output day.
 * @param month Output month.
 * @param year Output year.
 * @return true on successful parse and validation, false otherwise.
 */
static bool parse_date(const char* lnmp, int* day, int* month, int* year) {
    if (lnmp == NULL || day == NULL || month == NULL || year == NULL) {
        return false;
    }

    // Expected format: dd/mm/yyyy (10 characters minimum)
    if (strlen(lnmp) != 10) {
        return false;
    }

    // Parse using sscanf with strict format checking
    int parsed = sscanf(lnmp, "%2d/%2d/%4d", day, month, year);
    if (parsed != 3) {
        return false;
    }

    // Validate the parsed date
    if (!is_valid_date(*day, *month, *year)) {
        return false;
    }

    return true;
}

/**
 * Computes the Estimated Due Date (EDD) using Naegele's rule.
 * Naegele's rule: Add 7 days, subtract 3 months (or add 9), add 1 year if needed.
 *
 * @param lnmp Last Normal Menstrual Period in dd/mm/yyyy format.
 * @param edd_out Output buffer for EDD string (dd/mm/yyyy format). Must be at least
 * DATE_STR_MAX_LEN bytes.
 * @param edd_out_size Size of the output buffer.
 * @return NAEGELES_OK on success, error code otherwise.
 */
int naegeles_compute_edd(const char* lnmp, char* edd_out, size_t edd_out_size) {
    if (lnmp == NULL || edd_out == NULL) {
        return NAEGELES_ERR_NULL_PARAM;
    }

    if (edd_out_size < DATE_STR_MAX_LEN) {
        return NAEGELES_ERR_BUFFER_TOO_SMALL;
    }

    int day = 0, month = 0, year = 0;

    if (!parse_date(lnmp, &day, &month, &year)) {
        snprintf(edd_out, edd_out_size, "Invalid date");
        return NAEGELES_ERR_INVALID_DATE;
    }

    int max_days = days_in_month(month, year);

    // Apply Naegele's rule: +7 days, -3 months (or +9 if month <= 3)
    day += EDD_DAY_OFFSET;

    // Handle month adjustment
    if (month > 3) {
        month -= EDD_MONTH_OFFSET;
    } else {
        month += (12 - EDD_MONTH_OFFSET);  // Add 9 months
        year -= 1;                         // Temporarily go back a year
    }

    // Handle day overflow into next month(s)
    while (day > max_days) {
        day -= max_days;
        month++;
        if (month > 12) {
            month = 1;
            year++;
        }
        max_days = days_in_month(month, year);
    }

    // Add 1 year to compensate for the -3 months adjustment
    year += 1;

    // Format the result
    snprintf(edd_out, edd_out_size, "%02d/%02d/%04d", day, month, year);
    return NAEGELES_OK;
}

/**
 * Computes Weeks of Amenorrhea (WOA) from LNMP to current date.
 * WOA is calculated as the number of complete weeks and remaining days since LNMP.
 *
 * @param lnmp Last Normal Menstrual Period in dd/mm/yyyy format.
 * @param woa_out Output buffer for WOA string (e.g., "5 weeks" or "5 weeks, 3 days"). Must be at
 * least WOA_STR_MAX_LEN bytes.
 * @param woa_out_size Size of the output buffer.
 * @return NAEGELES_OK on success, error code otherwise.
 */
int naegeles_compute_woa(const char* lnmp, char* woa_out, size_t woa_out_size) {
    if (lnmp == NULL || woa_out == NULL) {
        return NAEGELES_ERR_NULL_PARAM;
    }

    if (woa_out_size < WOA_STR_MAX_LEN) {
        return NAEGELES_ERR_BUFFER_TOO_SMALL;
    }

    int day = 0, month = 0, year = 0;

    if (!parse_date(lnmp, &day, &month, &year)) {
        snprintf(woa_out, woa_out_size, "Invalid date");
        return NAEGELES_ERR_INVALID_DATE;
    }

    // Convert LNMP to time_t using mktime
    struct tm lnmp_tm = {0};
    lnmp_tm.tm_year   = year - 1900;  // Years since 1900
    lnmp_tm.tm_mon    = month - 1;    // Months since January (0-11)
    lnmp_tm.tm_mday   = day;
    lnmp_tm.tm_hour   = 0;
    lnmp_tm.tm_min    = 0;
    lnmp_tm.tm_sec    = 0;
    lnmp_tm.tm_isdst  = -1;  // Let mktime determine DST

    time_t lnmp_time = mktime(&lnmp_tm);
    if (lnmp_time == (time_t)-1) {
        snprintf(woa_out, woa_out_size, "Date conversion error");
        return NAEGELES_ERR_DATE_CONVERSION;
    }

    // Get current time
    time_t current_time = time(NULL);
    if (current_time == (time_t)-1) {
        snprintf(woa_out, woa_out_size, "System time error");
        return NAEGELES_ERR_SYSTEM_TIME;
    }

    // Calculate difference in seconds and convert to days
    double diff_seconds = difftime(current_time, lnmp_time);
    if (diff_seconds < 0) {
        snprintf(woa_out, woa_out_size, "LNMP is in the future");
        return NAEGELES_ERR_FUTURE_DATE;
    }

    int total_days = (int)(diff_seconds / 86400);  // 86400 seconds per day
    int weeks      = total_days / 7;
    int days       = total_days % 7;

    // Format the result conditionally
    if (days > 0) {
        snprintf(woa_out, woa_out_size, "%d %s, %d %s", weeks, weeks == 1 ? "week" : "weeks", days,
                 days == 1 ? "day" : "days");
    } else {
        snprintf(woa_out, woa_out_size, "%d %s", weeks, weeks == 1 ? "week" : "weeks");
    }

    return NAEGELES_OK;
}

/**
 * Computes both EDD and WOA in a single call.
 * This is a convenience function that calls both naegeles_compute_edd and naegeles_compute_woa.
 *
 * @param lnmp Last Normal Menstrual Period in dd/mm/yyyy format.
 * @param edd_out Output buffer for EDD string. Must be at least DATE_STR_MAX_LEN bytes.
 * @param edd_out_size Size of the EDD output buffer.
 * @param woa_out Output buffer for WOA string. Must be at least WOA_STR_MAX_LEN bytes.
 * @param woa_out_size Size of the WOA output buffer.
 * @return NAEGELES_OK if both computations succeed, otherwise the first error encountered.
 */
int naegeles_compute(const char* lnmp, char* edd_out, size_t edd_out_size, char* woa_out,
                     size_t woa_out_size) {
    int edd_result = naegeles_compute_edd(lnmp, edd_out, edd_out_size);
    if (edd_result != NAEGELES_OK) {
        return edd_result;
    }

    int woa_result = naegeles_compute_woa(lnmp, woa_out, woa_out_size);
    return woa_result;
}

/**
 * Returns a human-readable error message for a given error code.
 * @param error_code The error code returned by a naegeles function.
 * @return Error message string (never NULL).
 */
const char* naegeles_error_string(int error_code) {
    switch (error_code) {
        case NAEGELES_OK:
            return "Success";
        case NAEGELES_ERR_NULL_PARAM:
            return "NULL parameter provided";
        case NAEGELES_ERR_INVALID_DATE:
            return "Invalid date format or value";
        case NAEGELES_ERR_DATE_CONVERSION:
            return "Failed to convert date";
        case NAEGELES_ERR_SYSTEM_TIME:
            return "Failed to get system time";
        case NAEGELES_ERR_FUTURE_DATE:
            return "LNMP date is in the future";
        case NAEGELES_ERR_BUFFER_TOO_SMALL:
            return "Output buffer too small";
        default:
            return "Unknown error";
    }
}

// CLI-specific code - only compiled when not building for WASM
#ifndef WASM_BUILD

/**
 * Entry point for the CLI Naegele's rule EDD/WOA calculator.
 * @param argc Argument count.
 * @param argv Argument vector. Expects LNMP date in dd/mm/yyyy format.
 * @return 0 on success, 1 on error.
 */
int main(int argc, char* argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s LNMP[dd/mm/yyyy]\n", argv[0]);
        return 1;
    }

    char edd[DATE_STR_MAX_LEN];
    char woa[WOA_STR_MAX_LEN];

    int result = naegeles_compute(argv[1], edd, sizeof(edd), woa, sizeof(woa));

    if (result != NAEGELES_OK) {
        fprintf(stderr, "Error: %s\n", naegeles_error_string(result));
        return 1;
    }

    printf("EDD: %s\n", edd);
    printf("WOA: %s\n", woa);

    return 0;
}

#endif  // WASM_BUILD
