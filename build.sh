#!/usr/bin/env bash

# Initialize emscripten environment
export EMSDK_QUIET=1
source "$HOME/emscripten/emsdk-portable/emsdk_env.sh"

# Compile the c file and build a wasm module bundles with Javascript and loading helpers.
emcc -std=c23 -DWASM_BUILD \
     -s EXPORTED_FUNCTIONS='["_naegeles_compute_edd","_naegeles_compute_woa","_naegeles_compute","_naegeles_error_string"]' \
     -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap","stackSave","stackAlloc","UTF8ToString","stackRestore"]' \
     -s ENVIRONMENT=web \
     -s SINGLE_FILE=1 \
     -s MODULARIZE=1 \
     -s EXPORT_NAME='createNaegelesModule' \
     -o edd.js \
     edd.c
