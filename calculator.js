/**
 * JavaScript wrapper for the Naegele's rule WASM module.
 * Provides a clean API for computing EDD and WOA from the browser.
 */

// Error codes matching the C enum
const NaegelesError = {
    OK: 0,
    NULL_PARAM: -1,
    INVALID_DATE: -2,
    DATE_CONVERSION: -3,
    SYSTEM_TIME: -4,
    FUTURE_DATE: -5,
    BUFFER_TOO_SMALL: -6
};

// Buffer sizes matching C constants
const DATE_STR_MAX_LEN = 16;
const WOA_STR_MAX_LEN = 32;

/**
 * Naegele's rule calculator wrapper class.
 * Wraps the WASM module functions with memory management.
 */
class NaegelesCalculator {
    constructor(wasmModule) {
        this.Module = wasmModule;

        // Wrap C functions using cwrap
        this._computeEDD = this.Module.cwrap(
            'naegeles_compute_edd',
            'number',                    // Return type: int (error code)
            ['string', 'number', 'number'] // Args: const char*, char*, size_t
        );

        this._computeWOA = this.Module.cwrap(
            'naegeles_compute_woa',
            'number',                    // Return type: int (error code)
            ['string', 'number', 'number'] // Args: const char*, char*, size_t
        );

        this._computeBoth = this.Module.cwrap(
            'naegeles_compute',
            'number',                    // Return type: int (error code)
            ['string', 'number', 'number', 'number', 'number'] // Args: const char*, char*, size_t, char*, size_t
        );

        this._errorString = this.Module.cwrap(
            'naegeles_error_string',
            'string',                    // Return type: const char*
            ['number']                   // Args: int error_code
        );
    }

    /**
     * Computes the Estimated Due Date (EDD) using Naegele's rule.
     * @param {string} lnmp - Last Normal Menstrual Period in dd/mm/yyyy format.
     * @returns {{success: boolean, edd: string|null, error: string|null}}
     */
    computeEDD(lnmp) {
        // Allocate buffer for EDD output using stackAlloc for automatic cleanup
        const eddBuffer = this.Module.stackAlloc(DATE_STR_MAX_LEN);

        // Call the C function
        const result = this._computeEDD(lnmp, eddBuffer, DATE_STR_MAX_LEN);

        if (result === NaegelesError.OK) {
            // Read the string from the buffer
            const edd = this.Module.UTF8ToString(eddBuffer);
            return { success: true, edd, error: null };
        } else {
            const error = this._errorString(result);
            return { success: false, edd: null, error };
        }
    }

    /**
     * Computes Weeks of Amenorrhea (WOA) from LNMP to current date.
     * @param {string} lnmp - Last Normal Menstrual Period in dd/mm/yyyy format.
     * @returns {{success: boolean, woa: string|null, error: string|null}}
     */
    computeWOA(lnmp) {
        // Allocate buffer for WOA output using stackAlloc for automatic cleanup
        const woaBuffer = this.Module.stackAlloc(WOA_STR_MAX_LEN);

        // Call the C function
        const result = this._computeWOA(lnmp, woaBuffer, WOA_STR_MAX_LEN);

        if (result === NaegelesError.OK) {
            // Read the string from the buffer
            const woa = this.Module.UTF8ToString(woaBuffer);
            return { success: true, woa, error: null };
        } else {
            const error = this._errorString(result);
            return { success: false, woa: null, error };
        }
    }

    /**
     * Computes both EDD and WOA in a single call.
     * @param {string} lnmp - Last Normal Menstrual Period in dd/mm/yyyy format.
     * @returns {{success: boolean, edd: string|null, woa: string|null, error: string|null}}
     */
    computeBoth(lnmp) {
        // Allocate buffers for both outputs using stackAlloc for automatic cleanup
        const stackStart = this.Module.stackSave();

        const eddBuffer = this.Module.stackAlloc(DATE_STR_MAX_LEN);
        const woaBuffer = this.Module.stackAlloc(WOA_STR_MAX_LEN);

        // Call the C function
        const result = this._computeBoth(
            lnmp,
            eddBuffer, DATE_STR_MAX_LEN,
            woaBuffer, WOA_STR_MAX_LEN
        );

        if (result === NaegelesError.OK) {
            // Read both strings from their buffers
            const edd = this.Module.UTF8ToString(eddBuffer);
            const woa = this.Module.UTF8ToString(woaBuffer);

            this.Module.stackRestore(stackStart);
            return { success: true, edd, woa, error: null };
        } else {
            const error = this._errorString(result);
            this.Module.stackRestore(stackStart);
            return { success: false, edd: null, woa: null, error };
        }
    }

    /**
     * Gets a human-readable error message for an error code.
     * @param {number} errorCode - Error code from NaegelesError enum.
     * @returns {string} Error message.
     */
    getErrorMessage(errorCode) {
        return this._errorString(errorCode);
    }
}

function initNaegelesCalculator() {
    return new Promise((resolve, reject) => {
        if (typeof createNaegelesModule === 'undefined') {
            reject(new Error('WASM module not found. Make sure edd.js is loaded first.'));
            return;
        }

        createNaegelesModule().then(Module => {
            try {
                const calculator = new NaegelesCalculator(Module);
                console.log('Naegele\'s rule calculator ready');
                resolve(calculator);
            } catch (error) {
                reject(error);
            }
        }).catch(reject);
    });
}

// Export for use in other modules (Node.js/bundlers)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NaegelesCalculator, NaegelesError, initNaegelesCalculator };
}

// Export for browser global scope
if (typeof window !== 'undefined') {
    window.NaegelesCalculator = NaegelesCalculator;
    window.NaegelesError = NaegelesError;
    window.initNaegelesCalculator = initNaegelesCalculator;
}
