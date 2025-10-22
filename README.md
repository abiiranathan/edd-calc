# edd-calc — Pregnancy due date & gestational age calculator

This project is a small web-based pregnancy due-date (EDD) and gestational weeks calculator. It was built primarily as a technical demo to test calling C code from JavaScript by compiling `edd.c` to WebAssembly (WASM) with Emscripten.

Live demo (GitHub Pages): https://abiiranathan.github.io/edd-calc/

## What this is

- A simple UI (`index.html`) that accepts a date (e.g., date of last menstrual period or conception) and calculates the expected due date and current gestational age in weeks/days.
- The core date calculations are implemented in `edd.c` and compiled to WASM so JavaScript can call native C functions in the browser.
- This repo is primarily educational: it shows one way to integrate C logic into a web app via Emscripten and WebAssembly.

## Files

- `index.html` — Web UI and demo page used on GitHub Pages.
- `calculator.js` — JavaScript glue for the UI; calls into the generated WASM module.
- `edd.js` — Additional JS helper code (may include the Emscripten-generated glue when present).
- `edd.c` — C source implementing the due-date / gestational age calculations.
- `build.sh` — Helper script (if present) to compile `edd.c` to WASM using Emscripten. Inspect before running.

If `build.sh` exists and is intended for this, make it executable and run it instead:

```bash
chmod +x build.sh
./build.sh
```

## Run locally

Serve the directory over HTTP (WASM modules often require a server). Example using Python 3's simple server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or open `index.html` directly in a browser for simple static tests (some browsers restrict WASM or module loading from file:// URLs).

## How the Web ↔ WASM integration works (quick)

1. `emcc` compiles `edd.c` into `edd.wasm` and a JavaScript glue file `edd.js`.
2. The glue file initializes the WASM module and exposes functions (via `cwrap`/`ccall`) that JavaScript can invoke.
3. `calculator.js` obtains user input, calls the exported C functions, and displays the formatted result in the page.

## Contributing / Extending

- Add more clinical calculations, validation, and unit tests for the date arithmetic.
- Add TypeScript definitions for the JS glue or create a small test harness to exercise the C functions directly.
- If you'd like, I can add a small GitHub Actions workflow to automatically build the WASM and deploy to GitHub Pages.

## License

MIT

