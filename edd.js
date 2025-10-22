// This code implements the `-sMODULARIZE` settings by taking the generated
// JS program code (INNER_JS_CODE) and wrapping it in a factory function.

// Single threaded MINIMAL_RUNTIME programs do not need access to
// document.currentScript, so a simple export declaration is enough.
var createNaegelesModule = (() => {
  // When MODULARIZE this JS may be executed later,
  // after document.currentScript is gone, so we save it.
  // In EXPORT_ES6 mode we can just use 'import.meta.url'.
  var _scriptName = globalThis.document?.currentScript?.src;
  return async function(moduleArg = {}) {
    var moduleRtn;

// include: shell.js
// include: minimum_runtime_check.js
(function() {
  // "30.0.0" -> 300000
  function humanReadableVersionToPacked(str) {
    str = str.split('-')[0]; // Remove any trailing part from e.g. "12.53.3-alpha"
    var vers = str.split('.').slice(0, 3);
    while(vers.length < 3) vers.push('00');
    vers = vers.map((n, i, arr) => n.padStart(2, '0'));
    return vers.join('');
  }
  // 300000 -> "30.0.0"
  var packedVersionToHumanReadable = n => [n / 10000 | 0, (n / 100 | 0) % 100, n % 100].join('.');

  var TARGET_NOT_SUPPORTED = 2147483647;

  var currentNodeVersion = typeof process !== 'undefined' && process?.versions?.node ? humanReadableVersionToPacked(process.versions.node) : TARGET_NOT_SUPPORTED;
  if (currentNodeVersion < TARGET_NOT_SUPPORTED) {
    throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');
  }
  if (currentNodeVersion < 2147483647) {
    throw new Error(`This emscripten-generated code requires node v${ packedVersionToHumanReadable(2147483647) } (detected v${packedVersionToHumanReadable(currentNodeVersion)})`);
  }

  var currentSafariVersion = typeof navigator !== 'undefined' && navigator?.userAgent?.includes("Safari/") && navigator.userAgent.match(/Version\/(\d+\.?\d*\.?\d*)/) ? humanReadableVersionToPacked(navigator.userAgent.match(/Version\/(\d+\.?\d*\.?\d*)/)[1]) : TARGET_NOT_SUPPORTED;
  if (currentSafariVersion < 150000) {
    throw new Error(`This emscripten-generated code requires Safari v${ packedVersionToHumanReadable(150000) } (detected v${currentSafariVersion})`);
  }

  var currentFirefoxVersion = typeof navigator !== 'undefined' && navigator?.userAgent?.match(/Firefox\/(\d+(?:\.\d+)?)/) ? parseFloat(navigator.userAgent.match(/Firefox\/(\d+(?:\.\d+)?)/)[1]) : TARGET_NOT_SUPPORTED;
  if (currentFirefoxVersion < 79) {
    throw new Error(`This emscripten-generated code requires Firefox v79 (detected v${currentFirefoxVersion})`);
  }

  var currentChromeVersion = typeof navigator !== 'undefined' && navigator?.userAgent?.match(/Chrome\/(\d+(?:\.\d+)?)/) ? parseFloat(navigator.userAgent.match(/Chrome\/(\d+(?:\.\d+)?)/)[1]) : TARGET_NOT_SUPPORTED;
  if (currentChromeVersion < 85) {
    throw new Error(`This emscripten-generated code requires Chrome v85 (detected v${currentChromeVersion})`);
  }
})();

// end include: minimum_runtime_check.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = moduleArg;

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

var ENVIRONMENT_IS_WEB = true;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)


var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_SHELL) {

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  try {
    scriptDirectory = new URL('.', _scriptName).href; // includes trailing slash
  } catch {
    // Must be a `blob:` or `data:` URL (e.g. `blob:http://site.com/etc/etc`), we cannot
    // infer anything from them.
  }

  if (!(globalThis.window || globalThis.WorkerGlobalScope)) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  {
// include: web_or_worker_shell_read.js
readAsync = async (url) => {
    assert(!isFileURI(url), "readAsync does not work with file:// URLs");
    var response = await fetch(url, { credentials: 'same-origin' });
    if (response.ok) {
      return response.arrayBuffer();
    }
    throw new Error(response.status + ' : ' + response.url);
  };
// end include: web_or_worker_shell_read.js
  }
} else
{
  throw new Error('environment detection error');
}

var out = console.log.bind(console);
var err = console.error.bind(console);

var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var FETCHFS = 'FETCHFS is no longer included by default; build with -lfetchfs.js';
var ICASEFS = 'ICASEFS is no longer included by default; build with -licasefs.js';
var JSFILEFS = 'JSFILEFS is no longer included by default; build with -ljsfilefs.js';
var OPFS = 'OPFS is no longer included by default; build with -lopfs.js';

var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

// perform assertions in shell.js after we set up out() and err(), as otherwise
// if an assertion fails it cannot print the message

assert(!ENVIRONMENT_IS_WORKER, 'worker environment detected but not enabled at build time.  Add `worker` to `-sENVIRONMENT` to enable.');

assert(!ENVIRONMENT_IS_NODE, 'node environment detected but not enabled at build time.  Add `node` to `-sENVIRONMENT` to enable.');

assert(!ENVIRONMENT_IS_SHELL, 'shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.');

// end include: shell.js

// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary;

if (!globalThis.WebAssembly) {
  err('no native wasm support detected');
}

// Wasm globals

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.
function _malloc() {
  abort('malloc() called but not included in the build - add `_malloc` to EXPORTED_FUNCTIONS');
}
function _free() {
  // Show a helpful error since we used to include free by default in the past.
  abort('free() called but not included in the build - add `_free` to EXPORTED_FUNCTIONS');
}

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');

// include: runtime_common.js
// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
// include: runtime_exceptions.js
// end include: runtime_exceptions.js
// include: runtime_debug.js
var runtimeDebug = true; // Switch to false at runtime to disable logging at the right times

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(...args) {
  if (!runtimeDebug && typeof runtimeDebug != 'undefined') return;
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn(...args);
}

// Endianness check
(() => {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) abort('Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)');
})();

function consumedModuleProp(prop) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      set() {
        abort(`Attempt to set \`Module.${prop}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);

      }
    });
  }
}

function makeInvalidEarlyAccess(name) {
  return () => assert(false, `call to '${name}' via reference taken before Wasm module initialization`);

}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_preloadFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

function missingLibrarySymbol(sym) {

  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      },
    });
  }
}

// end include: runtime_debug.js
var readyPromiseResolve, readyPromiseReject;

// Memory management
var
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

// BigInt64Array type is not correctly defined in closure
var
/** not-@type {!BigInt64Array} */
  HEAP64,
/* BigUint64Array type is not correctly defined in closure
/** not-@type {!BigUint64Array} */
  HEAPU64;

var runtimeInitialized = false;



function updateMemoryViews() {
  var b = wasmMemory.buffer;
  HEAP8 = new Int8Array(b);
  HEAP16 = new Int16Array(b);
  HEAPU8 = new Uint8Array(b);
  HEAPU16 = new Uint16Array(b);
  HEAP32 = new Int32Array(b);
  HEAPU32 = new Uint32Array(b);
  HEAPF32 = new Float32Array(b);
  HEAPF64 = new Float64Array(b);
  HEAP64 = new BigInt64Array(b);
  HEAPU64 = new BigUint64Array(b);
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// end include: runtime_common.js
assert(globalThis.Int32Array && globalThis.Float64Array && Int32Array.prototype.subarray && Int32Array.prototype.set,
       'JS engine does not provide full typed array support');

function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  consumedModuleProp('preRun');
  // Begin ATPRERUNS hooks
  callRuntimeCallbacks(onPreRuns);
  // End ATPRERUNS hooks
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  // No ATINITS hooks

  wasmExports['__wasm_call_ctors']();

  // No ATPOSTCTORS hooks
}

function postRun() {
  checkStackCookie();
   // PThreads reuse the runtime from the main thread.

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  consumedModuleProp('postRun');

  // Begin ATPOSTRUNS hooks
  callRuntimeCallbacks(onPostRuns);
  // End ATPOSTRUNS hooks
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  readyPromiseReject?.(e);
  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// show errors on likely calls to FS when it was not included
var FS = {
  error() {
    abort('Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM');
  },
  init() { FS.error() },
  createDataFile() { FS.error() },
  createPreloadedFile() { FS.error() },
  createLazyFile() { FS.error() },
  open() { FS.error() },
  mkdev() { FS.error() },
  registerDevice() { FS.error() },
  analyzePath() { FS.error() },

  ErrnoError() { FS.error() },
};


function createExportWrapper(name, nargs) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return f(...args);
  };
}

var wasmBinaryFile;

function findWasmBinary() {
  return base64Decode('AGFzbQEAAAAB8wElYAN/f38Bf2AGf3x/f39/AX9gAn9/AGADf35/AX5gAAF8YAR/f39/AGABfwF+YAAAYAF/AX9gBH9/f38Bf2AEf35/fwF/YAJ/fwF/YAV/f39/fwF/YAJ+fgF8YAF/AGAAAX9gAnx/AXxgB39/f39/f38Bf2ADf39/AGADfn9/AX9gAn5/AX9gBX9/f39/AGABfAF+YAJ/fgBgBX9+fn5+AGAEf35+fwBgAn5+AX9gA39+fgBgBn9/f39/fwBgB39/f39/f38AYAJ/fwF+YAR/f39+AX5gA39/fgBgBH5+fn4Bf2ACf3wAYAJ/fQBgAn5+AX0CzgEIA2VudhNlbXNjcmlwdGVuX2RhdGVfbm93AAQDZW52CV90enNldF9qcwAFA2VudgpfbWt0aW1lX2pzAAYDZW52CV9hYm9ydF9qcwAHFndhc2lfc25hcHNob3RfcHJldmlldzEIZmRfY2xvc2UACBZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxCGZkX3dyaXRlAAkWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQdmZF9zZWVrAAoDZW52FmVtc2NyaXB0ZW5fcmVzaXplX2hlYXAACAN7egcACQsACAAMCA0GCAgODgcHDwYJAAgIDg8HCAALEAAAAAAMERIIBRMUFBUAAQIWCQAICBcIEBgZGhgbBQgcHR4fCA8PDwcJCAAICyAAAAALBwgICAADAwgADgsLAg8IGBkhIRgiIwICDw8ZGBgHDw8PGA0kCA4IDwsIBAUBcAEICAUGAQGCAoICBhIDfwFBgIAEC38BQQALfwFBAAsH6AIQBm1lbW9yeQIAEV9fd2FzbV9jYWxsX2N0b3JzAAgUbmFlZ2VsZXNfY29tcHV0ZV9lZGQACRRuYWVnZWxlc19jb21wdXRlX3dvYQAOEG5hZWdlbGVzX2NvbXB1dGUADxVuYWVnZWxlc19lcnJvcl9zdHJpbmcAEBlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQAGZmZsdXNoAHwIc3RyZXJyb3IAgQEYZW1zY3JpcHRlbl9zdGFja19nZXRfZW5kAHgZZW1zY3JpcHRlbl9zdGFja19nZXRfYmFzZQB3FWVtc2NyaXB0ZW5fc3RhY2tfaW5pdAB1GWVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2ZyZWUAdhlfZW1zY3JpcHRlbl9zdGFja19yZXN0b3JlAH0XX2Vtc2NyaXB0ZW5fc3RhY2tfYWxsb2MAfhxlbXNjcmlwdGVuX3N0YWNrX2dldF9jdXJyZW50AH8JDQEAQQELBzQ1OFVbXF4K8fwCegYAEHUQTQuPBAEHfyOAgICAAEEwayEDIAMkgICAgAAgAyAANgIoIAMgATYCJCADIAI2AiACQAJAAkAgAygCKEEARkEBcQ0AIAMoAiRBAEZBAXFFDQELIANBfzYCLAwBCwJAIAMoAiBBEElBAXFFDQAgA0F6NgIsDAELIANBADYCHCADQQA2AhggA0EANgIUAkAgAygCKCADQRxqIANBGGogA0EUahCKgICAAEEBcQ0AIAMoAiQgAygCIEHZgYSAAEEAEJuAgIAAGiADQX42AiwMAQsgAyADKAIYIAMoAhQQi4CAgAA2AhAgAyADKAIcQQdqNgIcAkACQCADKAIYQQNKQQFxRQ0AIAMgAygCGEEDazYCGAwBCyADIAMoAhhBCWo2AhggAyADKAIUQQFrNgIUCwJAA0AgAygCHCADKAIQSkEBcUUNASADKAIQIQQgAyADKAIcIARrNgIcIAMgAygCGEEBajYCGAJAIAMoAhhBDEpBAXFFDQAgA0EBNgIYIAMgAygCFEEBajYCFAsgAyADKAIYIAMoAhQQi4CAgAA2AhAMAAsLIAMgAygCFEEBajYCFCADKAIkIQUgAygCICEGIAMoAhwhByADKAIYIQggAyADKAIUNgIIIAMgCDYCBCADIAc2AgAgBSAGQcmChIAAIAMQm4CAgAAaIANBADYCLAsgAygCLCEJIANBMGokgICAgAAgCQ8L0wIBBX8jgICAgABBMGshBCAEJICAgIAAIAQgADYCKCAEIAE2AiQgBCACNgIgIAQgAzYCHAJAAkACQCAEKAIoQQBGQQFxDQAgBCgCJEEARkEBcQ0AIAQoAiBBAEZBAXENACAEKAIcQQBGQQFxRQ0BCyAEQQBBAXE6AC8MAQsCQCAEKAIoEJ2AgIAAQQpHQQFxRQ0AIARBAEEBcToALwwBCyAEKAIoIQUgBCgCJCEGIAQoAiAhByAEIAQoAhw2AgggBCAHNgIEIAQgBjYCACAEIAVB2IKEgAAgBBCcgICAADYCGAJAIAQoAhhBA0dBAXFFDQAgBEEAQQFxOgAvDAELAkAgBCgCJCgCACAEKAIgKAIAIAQoAhwoAgAQjICAgABBAXENACAEQQBBAXE6AC8MAQsgBEEBQQFxOgAvCyAELQAvQQFxIQggBEEwaiSAgICAACAIDwuwAQEDfyOAgICAAEEQayECIAIkgICAgAAgAiAANgIIIAIgATYCBAJAAkACQCACKAIIQQFIQQFxDQAgAigCCEEMSkEBcUUNAQsgAkEANgIMDAELAkAgAigCCEECRkEBcUUNACACKAIEEI2AgIAAQQFxRQ0AIAJBHTYCDAwBCyACKAIIQQFrIQMgAkGAg4SAACADQQJ0aigCADYCDAsgAigCDCEEIAJBEGokgICAgAAgBA8L6AEBAn8jgICAgABBEGshAyADJICAgIAAIAMgADYCCCADIAE2AgQgAyACNgIAAkACQAJAIAMoAgBB7A5IQQFxDQAgAygCAEG0EEpBAXFFDQELIANBAEEBcToADwwBCwJAAkAgAygCBEEBSEEBcQ0AIAMoAgRBDEpBAXFFDQELIANBAEEBcToADwwBCwJAAkAgAygCCEEBSEEBcQ0AIAMoAgggAygCBCADKAIAEIuAgIAASkEBcUUNAQsgA0EAQQFxOgAPDAELIANBAUEBcToADwsgAy0AD0EBcSEEIANBEGokgICAgAAgBA8LTQEDfyOAgICAAEEQayEBIAEgADYCDAJAAkAgASgCDEEEbw0AIAEoAgxB5ABvIQJBASEDIAINAQsgASgCDEGQA29BAEYhAwsgA0EBcQ8L5AYDAX8Bfgx/I4CAgIAAQZABayEDIAMkgICAgAAgAyAANgKIASADIAE2AoQBIAMgAjYCgAECQAJAAkAgAygCiAFBAEZBAXENACADKAKEAUEARkEBcUUNAQsgA0F/NgKMAQwBCwJAIAMoAoABQSBJQQFxRQ0AIANBejYCjAEMAQsgA0EANgJ8IANBADYCeCADQQA2AnQCQCADKAKIASADQfwAaiADQfgAaiADQfQAahCKgICAAEEBcQ0AIAMoAoQBIAMoAoABQdmBhIAAQQAQm4CAgAAaIANBfjYCjAEMAQsgA0EANgJwQgAhBCADIAQ3A2ggAyAENwNgIAMgBDcDWCADIAQ3A1AgAyAENwNIIAMgAygCdEHsDms2AlwgAyADKAJ4QQFrNgJYIAMgAygCfDYCVCADQQA2AlAgA0EANgJMIANBADYCSCADQX82AmggAyADQcgAahCagICAADcDQAJAIAMpA0BCf1FBAXFFDQAgAygChAEgAygCgAFB2ICEgABBABCbgICAABogA0F9NgKMAQwBCyADQQAQkoCAgAA3AzgCQCADKQM4Qn9RQQFxRQ0AIAMoAoQBIAMoAoABQe6AhIAAQQAQm4CAgAAaIANBfDYCjAEMAQsgAyADKQM4IAMpA0AQkYCAgAA5AzACQCADKwMwQQC3Y0EBcUUNACADKAKEASADKAKAAUGBgoSAAEEAEJuAgIAAGiADQXs2AowBDAELIAMgAysDMEQAAAAAABj1QKP8AjYCLCADIAMoAixBB202AiggAyADKAIsQQdvNgIkAkACQCADKAIkQQBKQQFxRQ0AIAMoAoQBIQUgAygCgAEhBiADKAIoIQcgAygCKEEBRiEIQZyBhIAAQbeAhIAAIAhBAXEbIQkgAygCJCEKIAMoAiRBAUYhCyADQYmAhIAAQaqAhIAAIAtBAXEbNgIMIAMgCjYCCCADIAk2AgQgAyAHNgIAIAUgBkG9gISAACADEJuAgIAAGgwBCyADKAKEASEMIAMoAoABIQ0gAygCKCEOIAMoAihBAUYhDyADQZyBhIAAQbeAhIAAIA9BAXEbNgIUIAMgDjYCECAMIA1BxICEgAAgA0EQahCbgICAABoLIANBADYCjAELIAMoAowBIRAgA0GQAWokgICAgAAgEA8LpwEBAn8jgICAgABBIGshBSAFJICAgIAAIAUgADYCGCAFIAE2AhQgBSACNgIQIAUgAzYCDCAFIAQ2AgggBSAFKAIYIAUoAhQgBSgCEBCJgICAADYCBAJAAkAgBSgCBEUNACAFIAUoAgQ2AhwMAQsgBSAFKAIYIAUoAgwgBSgCCBCOgICAADYCACAFIAUoAgA2AhwLIAUoAhwhBiAFQSBqJICAgIAAIAYPC8EBAQR/I4CAgIAAQRBrIQEgASAANgIIIAEoAgghAkEGIQMgAiADaiEEIAQgA0saAkACQAJAAkACQAJAAkACQAJAIAQOBwYFBAMCAQAHCyABQa+AhIAANgIMDAcLIAFBsYKEgAA2AgwMBgsgAUGlgYSAADYCDAwFCyABQcKBhIAANgIMDAQLIAFBl4KEgAA2AgwMAwsgAUHmgYSAADYCDAwCCyABQYSBhIAANgIMDAELIAFByoCEgAA2AgwLIAEoAgwPCwgAIAAgAX25CykBAX4QgICAgABEAAAAAABAj0Cj/AYhAQJAIABFDQAgACABNwMACyABCwQAQQALBABBAAsCAAsCAAsgAEGgnoSAABCVgICAABCYgICAAEGgnoSAABCWgICAAAuFAQACQEEALQC8noSAAEEBcQ0AQaSehIAAEJOAgIAAGgJAQQAtALyehIAAQQFxDQBBkJ6EgABBlJ6EgABBwJ6EgABB4J6EgAAQgYCAgABBAEHgnoSAADYCnJ6EgABBAEHAnoSAADYCmJ6EgABBAEEBOgC8noSAAAtBpJ6EgAAQlICAgAAaCwsIAEH0noSAAAspAQF+EJeAgIAAAkAgABCCgICAACIBQn9SDQAQmYCAgABBPTYCAAsgAQs5AQF/I4CAgIAAQRBrIgQkgICAgAAgBCADNgIMIAAgASACIAMQt4CAgAAhAyAEQRBqJICAgIAAIAMLNwEBfyOAgICAAEEQayIDJICAgIAAIAMgAjYCDCAAIAEgAhDUgICAACECIANBEGokgICAgAAgAguHAQEDfyAAIQECQAJAIABBA3FFDQACQCAALQAADQAgACAAaw8LIAAhAQNAIAFBAWoiAUEDcUUNASABLQAADQAMAgsLA0AgASICQQRqIQFBgIKECCACKAIAIgNrIANyQYCBgoR4cUGAgYKEeEYNAAsDQCACIgFBAWohAiABLQAADQALCyABIABrCwQAQQELAgALFABB+J6EgAAQlYCAgABB/J6EgAALDgBB+J6EgAAQloCAgAALXAEBfyAAIAAoAkgiAUF/aiABcjYCSAJAIAAoAgAiAUEIcUUNACAAIAFBIHI2AgBBfw8LIABCADcCBCAAIAAoAiwiATYCHCAAIAE2AhQgACABIAAoAjBqNgIQQQAL6QEBAn8gAkEARyEDAkACQAJAIABBA3FFDQAgAkUNACABQf8BcSEEA0AgAC0AACAERg0CIAJBf2oiAkEARyEDIABBAWoiAEEDcUUNASACDQALCyADRQ0BAkAgAC0AACABQf8BcUYNACACQQRJDQAgAUH/AXFBgYKECGwhBANAQYCChAggACgCACAEcyIDayADckGAgYKEeHFBgIGChHhHDQIgAEEEaiEAIAJBfGoiAkEDSw0ACwsgAkUNAQsgAUH/AXEhAwNAAkAgAC0AACADRw0AIAAPCyAAQQFqIQAgAkF/aiICDQALC0EACxoBAX8gAEEAIAEQo4CAgAAiAiAAayABIAIbC5IBAgF+AX8CQCAAvSICQjSIp0H/D3EiA0H/D0YNAAJAIAMNAAJAAkAgAEQAAAAAAAAAAGINAEEAIQMMAQsgAEQAAAAAAADwQ6IgARClgICAACEAIAEoAgBBQGohAwsgASADNgIAIAAPCyABIANBgnhqNgIAIAJC/////////4eAf4NCgICAgICAgPA/hL8hAAsgAAsTACACBEAgACABIAL8CgAACyAAC5MEAQN/AkAgAkGABEkNACAAIAEgAhCmgICAAA8LIAAgAmohAwJAAkAgASAAc0EDcQ0AAkACQCAAQQNxDQAgACECDAELAkAgAg0AIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAkEDcUUNASACIANJDQALCyADQXxxIQQCQCADQcAASQ0AIAIgBEFAaiIFSw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBwABqIQEgAkHAAGoiAiAFTQ0ACwsgAiAETw0BA0AgAiABKAIANgIAIAFBBGohASACQQRqIgIgBEkNAAwCCwsCQCADQQRPDQAgACECDAELAkAgAkEETw0AIAAhAgwBCyADQXxqIQQgACECA0AgAiABLQAAOgAAIAIgAS0AAToAASACIAEtAAI6AAIgAiABLQADOgADIAFBBGohASACQQRqIgIgBE0NAAsLAkAgAiADTw0AA0AgAiABLQAAOgAAIAFBAWohASACQQFqIgIgA0cNAAsLIAAL5gEBA38CQAJAIAIoAhAiAw0AQQAhBCACEKKAgIAADQEgAigCECEDCwJAIAEgAyACKAIUIgRrTQ0AIAIgACABIAIoAiQRgICAgACAgICAAA8LAkACQCACKAJQQQBIDQAgAUUNACABIQMCQANAIAAgA2oiBUF/ai0AAEEKRg0BIANBf2oiA0UNAgwACwsgAiAAIAMgAigCJBGAgICA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AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAUF3ag4SAAECBQMEBgcICQoLDA0ODxAREgsgAiACKAIAIgFBBGo2AgAgACABKAIANgIADwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAIgFBBGo2AgAgACABMgEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMwEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMAAANwMADwsgAiACKAIAIgFBBGo2AgAgACABMQAANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKwMAOQMADwsgACACIAMRgoCAgACAgICAAAsLPQEBfwJAIABQDQADQCABQX9qIgEgAKdBD3EtAICHhIAAIAJyOgAAIABCD1YhAyAAQgSIIQAgAw0ACwsgAQs2AQF/AkAgAFANAANAIAFBf2oiASAAp0EHcUEwcjoAACAAQgdWIQIgAEIDiCEAIAINAAsLIAELigECAX4DfwJAAkAgAEKAgICAEFoNACAAIQIMAQsDQCABQX9qIgEgACAAQgqAIgJCCn59p0EwcjoAACAAQv////+fAVYhAyACIQAgAw0ACwsCQCACUA0AIAKnIQMDQCABQX9qIgEgAyADQQpuIgRBCmxrQTByOgAAIANBCUshBSAEIQMgBQ0ACwsgAQuEAQEBfyOAgICAAEGAAmsiBSSAgICAAAJAIAIgA0wNACAEQYDABHENACAFIAEgAiADayIDQYACIANBgAJJIgIbEKmAgIAAGgJAIAIN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//////8/g4Q3AwgL5gIBAX8jgICAgABB0ABrIgQkgICAgAACQAJAIANBgIABSA0AIARBIGogASACQgBCgICAgICAgP//ABDzgICAACAEKQMoIQIgBCkDICEBAkAgA0H//wFPDQAgA0GBgH9qIQMMAgsgBEEQaiABIAJCAEKAgICAgICA//8AEPOAgIAAIANB/f8CIANB/f8CSRtBgoB+aiEDIAQpAxghAiAEKQMQIQEMAQsgA0GBgH9KDQAgBEHAAGogASACQgBCgICAgICAgDkQ84CAgAAgBCkDSCECIAQpA0AhAQJAIANB9IB+TQ0AIANBjf8AaiEDDAELIARBMGogASACQgBCgICAgICAgDkQ84CAgAAgA0HogX0gA0HogX1LG0Ga/gFqIQMgBCkDOCECIAQpAzAhAQsgBCABIAJCACADQf//AGqtQjCGEPOAgIAAIAAgBCkDCDcDCCAAIAQpAwA3AwAgBEHQAGokgICAgAALSwIBfgJ/IAFC////////P4MhAgJAAkAgAUIwiKdB//8BcSIDQf//AUYNAEEEIQQgAw0BQQJBAyACIACEUBsPCyACIACEUCEECyAEC+cGBAN/An4BfwF+I4CAgIAAQYABayIFJICAgIAAAkACQAJAIAMgBEIAQgAQ6YCAgABFDQAgAyAEEMCAgIAARQ0AIAJCMIinIgZB//8BcSIHQf//AUcNAQsgBUEQaiABIAIgAyAEEPOAgIAAIAUgBSkDECIEIAUpAxgiAyAEIAMQ64CAgAAgBSkDCCECIAUpAwAhBAwBCwJAIAEgAkL///////////8AgyIIIAMgBEL///////////8AgyIJEOmAgIAAQQBKDQACQCABIAggAyAJEOmAgIAARQ0AIAEhBAwCCyAFQfAAaiABIAJCAEIAEPOAgIAAIAUpA3ghAiAFKQNwIQQMAQsgBEIwiKdB//8BcSEKAkACQCAHRQ0AIAEhBAwBCyAFQeAAaiABIAhCAEKAgICAgIDAu8AAEPOAgIAAIAUpA2giCEIwiKdBiH9qIQcgBSkDYCEECwJAIAoNACAFQdAAaiADIAlCAEKAgICAgIDAu8AAEPOAgIAAIAUpA1giCUIwiKdBiH9qIQogBSkDUCEDCyAJQv///////z+DQoCAgICAgMAAhCELIAhC////////P4NCgICAgICAwACEIQgC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aiAGKQPQASAGKQPYAUIAQoCAgICAgMAAEPOAgIAAIAZBsAFqIAYpA8ABIAYpA8gBQgBCgICAgICAwAAQ84CAgAAgBikDuAEhESAGKQOwASENCyAAIA03AwAgACARNwMIIAZBsANqJICAgIAAC60fCQR/AX4EfwF+An8BfgF/A34BfCOAgICAAEGQxgBrIgckgICAgABBACEIQQAgBGsiCSADayEKQgAhC0EAIQwCQAJAAkADQAJAIAJBMEYNACACQS5HDQQgASgCBCICIAEoAmhGDQIgASACQQFqNgIEIAItAAAhAgwDCwJAIAEoAgQiAiABKAJoRg0AQQEhDCABIAJBAWo2AgQgAi0AACECDAELQQEhDCABELyAgIAAIQIMAAsLIAEQvICAgAAhAgtCACELAkAgAkEwRw0AA0ACQAJAIAEoAgQiAiABKAJoRg0AIAEgAkEBajYCBCACLQAAIQIMAQsgARC8gICAACECCyALQn98IQsgAkEwRg0AC0EBIQwLQQEhCAtBACENIAdBADYCkAYgAkFQaiEOAkACQAJAAkACQAJAAkAgAkEuRiIPDQBCACEQIA5BCU0NAEEAIRFBACESDAELQgAhEEEAIRJBACERQQAhDQNAAkACQCAPQQFxRQ0AAkAgCA0AIBAhC0EBIQgMAgsgDEUhDwwECyAQQgF8IRACQCARQfwPSg0AIBCnIQwgB0GQBmogEUECdGohDwJAIBJFDQAgAiAPKAIAQQpsakFQaiEOCyANIAwgAkEwRhshDSAPIA42AgBBASEMQQAgEkEBaiICIAJBCUYiAhshEiARIAJqIREMAQsgAkEwRg0AIAcgBygCgEZBAXI2AoBGQdyPASENCwJAAkAgASgCBCICIAEoAmhGDQAgASACQQFqNgIEIAItAAAhAgwBCyABELyAgIAAIQILIAJBUGohDiACQS5GIg8NACAOQQpJDQALCyALIBAgCBshCwJAIAxFDQAgAkFfcUHFAEcNAAJAIAEgBhDHgICAACITQoCAgICAgICAgH9SDQAgBkUNBEIAIRMgASkDcEIAUw0AIAEgASgCBEF/ajYCBAsgEyALfCELDAQLIAxFIQ8gAkEASA0BCyABKQNwQgBTDQAgASABKAIEQX9qNgIECyAPRQ0BEJmAgIAAQRw2AgALQgAhECABQgAQu4CAgABCACELDAEL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NgJMIAMgADYCLCADQYSAgIAANgIgIAMgADYCVCADIAEgAhDQgICAACEAIANBkAFqJICAgIAAIAALXQEDfyAAKAJUIQMgASADIANBACACQYACaiIEEKOAgIAAIgUgA2sgBCAFGyIEIAIgBCACSRsiAhCngICAABogACADIARqIgQ2AlQgACAENgIIIAAgAyACajYCBCACC6wCAQF/QQEhAwJAAkAgAEUNACABQf8ATQ0BAkACQBDMgICAACgCYCgCAA0AIAFBgH9xQYC/A0YNAxCZgICAAEEZNgIADAELAkAgAUH/D0sNACAAIAFBP3FBgAFyOgABIAAgAUEGdkHAAXI6AABBAg8LAkACQCABQYCwA0kNACABQYBAcUGAwANHDQELIAAgAUE/cUGAAXI6AAIgACABQQx2QeABcjoAACAAIAFBBnZBP3FBgAFyOgABQQMPCwJAIAFBgIB8akH//z9LDQAgACABQT9xQYABcjoAAyAAIAFBEnZB8AFyOgAAIAAgAUEGdkE/cUGAAXI6AAIgACABQQx2QT9xQYABcjoAAUEEDwsQmYCAgABBGTYCAAtBfyEDCyADDwsgACABOgAAQQELGAACQCAADQBBAA8LIAAgAUEAENaAgIAACwkAEIOAgIAAAAsZAAJAIAANAEEADwsQmYCAgAAgADYCAEF/CwQAIAALGQAgACgCPBDagICAABCEgICAABDZgICAAAuBAwEHfyOAgICAAEEgayIDJICAgIAAIAMgACgCHCIENgIQIAAoAhQhBSADIAI2AhwgAyABNgIYIAMgBSAEayIBNgIUIAEgAmohBiADQRBqIQRBAiEHAkACQAJAAkACQCAAKAI8IANBEGpBAiADQQxqEIWAgIAAENmAgIAARQ0AIAQhBQwBCwNAIAYgAygCDCIBRg0CAkAgAUF/Sg0AIAQhBQwECyAEQQhBACABIAQoAgQiCEsiCRtqIgUgBSgCACABIAhBACAJG2siCGo2AgAgBEEMQQQgCRtqIgQgBCgCACAIazYCACAGIAFrIQYgBSEEIAAoAjwgBSAHIAlrIgcgA0EMahCFgICAABDZgICAAEUNAAsLIAZBf0cNAQsgACAAKAIsIgE2AhwgACABNgIUIAAgASAAKAIwajYCECACIQEMAQtBACEBIABBADYCHCAAQgA3AxAgACAAKAIAQSByNgIA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gIAAIAGnIgJPDQEgAhCHgICAAA0BCxCZgICAAEEwNgIAQX8PC0EAIAI2AoSehIAAIAALgAsHAX8BfgF/An4BfwF+AX8jgICAgABB8ABrIgUkgICAgAAgBEL///////////8AgyEGAkACQAJAIAFQIgcgAkL///////////8AgyIIQoCAgICAgMCAgH98QoCAgICAgMCAgH9UIAhQGw0AIANCAFIgBkKAgICAgIDAgIB/fCIJQoCAgICAgMCAgH9WIAlCgICAgICAwICAf1EbDQELAkAgByAIQoCAgICAgMD//wBUIAhCgICAgICAwP//AFEbDQAgAkKAgICAgIAghCEEIAEhAwwCCwJAIANQIAZCgICAgICAwP//AFQgBkKAgICAgIDA//8AURsNACAEQoCAgICAgCCEIQQMAgsCQCABIAhCgICAgICAwP//AIWEQgBSDQBCgICAgICA4P//ACACIAMgAYUgBCAChUKAgICAgICAgIB/hYRQIgcbIQRCACABIAcbIQMMAgsgAyAGQoCAgICAgMD//wCFhFANAQJAIAEgCIRCAFINACADIAaEQgBSDQIgAyABgyEDIAQgAoMhBAwCCyADIAaEUEUNACABIQMgAiEEDAELIAMgASADIAFWIAYgCFYgBiAIURsiChshBiAEIAIgChsiCUL///////8/gyEIIAIgBCAKGyILQjCIp0H//wFxIQwCQCAJQjCIp0H//wFxIgcNACAFQeAAaiAGIAggBiAIIAhQIgcbeULAAEIAIAcbfKciB0FxahDogICAAEEQIAdrIQcgBSkDaCEIIAUpA2AhBgsgASADIAobIQMgC0L///////8/gyEBAkAgDA0AIAVB0ABqIAMgASADIAEgAVAiCht5QsAAQgAgCht8pyIKQXFqEOiAgIAAQRAgCmshDCAFKQNYIQEgBSkDUCEDCyABQgOGIANCPYiEQoCAgICAgIAEhCEBIAhCA4YgBkI9iIQhCyADQgOGIQggBCAChSEDAkAgByAMRg0AAkAgByAMayIKQf8ATQ0AQgAhAUIBIQgMAQsgBUHAAGogCCABQYABIAprEOiAgIAAIAVBMGogCCABIAoQ8oCAgAAgBSkDMCAFKQNAIAUpA0iEQgBSrYQhCCAFKQM4IQELIAtCgICAgICAgASEIQsgBkIDhiEGAkACQCADQn9VDQBCACEDQgAhBCAGIAiFIAsgAYWEUA0CIAYgCH0hAiALIAF9IAYgCFStfSIEQv////////8DVg0BIAVBIGogAiAEIAIgBCAEUCIKG3lCwABCACAKG3ynQXRqIgoQ6ICAgAAgByAKayEHIAUpAyghBCAFKQMgIQIMAQsgASALfCAIIAZ8IgIgCFStfCIEQoCAgICAgIAIg1ANACACQgGIIARCP4aEIAhCAYOEIQIgB0EBaiEHIARCAYghBAsgCUKAgICAgICAgIB/gyEIAkAgB0H//wFIDQAgCEKAgICAgIDA//8AhCEEQgAhAwwBC0EAIQoCQAJAIAdBAEwNACAHIQoMAQsgBUEQaiACIAQgB0H/AGoQ6ICAgAAgBSACIARBASAHaxDygICAACAFKQMAIAUpAxAgBSkDGIRCAFKthCECIAUpAwghBAsgAkIDiCAEQj2GhCEDIAqtQjCGIARCA4hC////////P4OEIAiEIQQgAqdBB3EhBwJAAkACQAJAAkAQ8ICAgAAOAwABAgMLAkAgB0EERg0AIAQgAyAHQQRLrXwiCCADVK18IQQgCCEDDAMLIAQgAyADQgGDfCIIIANUrXwhBCAIIQMMAwsgBCADIAhCAFIgB0EAR3GtfCIIIANUrXwhBCAIIQMMAQsgBCADIAhQIAdBAEdxrXwiCCADVK18IQQgCCEDCyAHRQ0BCxDxgICAABoLIAAgAzcDACAAIAQ3AwggBUHwAGokgICAgAALUwEBfgJAAkAgA0HAAHFFDQAgASADQUBqrYYhAkIAIQEMAQsgA0UNACABQcAAIANrrYggAiADrSIEhoQhAiABIASGIQELIAAgATcDACAAIAI3AwgL5gECAX8CfkEBIQQCQCAAQgBSIAFC////////////AIMiBUKAgICAgIDA//8AViAFQoCAgICAgMD//wBRGw0AIAJCAFIgA0L///////////8AgyIGQoCAgICAgMD//wBWIAZCgICAgICAwP//AFEbDQACQCACIACEIAYgBYSEUEUNAEEADwsCQCADIAGDQgBTDQACQCAAIAJUIAEgA1MgASADURtFDQBBfw8LIAAgAoUgASADhYRCAFIPCwJAIAAgAlYgASADVSABIANRG0UNAEF/DwsgACAChSABIAOFhEIAUiEECyAEC9gBAgF/An5BfyEEAkAgAEIAUiABQv///////////wCDIgVCgICAgICAwP//AFYgBUKAgICAgIDA//8AURsNACACQgBSIANC////////////AIMiBkKAgICAgIDA//8AViAGQoCAgICAgMD//wBRGw0AAkAgAiAAhCAGIAWEhFBFDQBBAA8LAkAgAyABg0IAUw0AIAAgAlQgASADUyABIANRGw0BIAAgAoUgASADhYRCAFIPCyAAIAJWIAEgA1UgASADURsNACAAIAKFIAEgA4WEQgBSIQQLIAQLnxEGAX8DfgN/AX4Bfwt+I4CAgIAAQdACayIFJICAgIAAIARC////////P4MhBiACQv///////z+DIQcgBCAChUKAgICAgICAgIB/gyEIIARCMIinQf//AXEhCQJAAkACQCACQjCIp0H//wFxIgpBgYB+akGCgH5JDQBBACELIAlBgYB+akGBgH5LDQELAkAgAVAgAkL///////////8AgyIMQoCAgICAgMD//wBUIAxCgICAgICAwP//AFEbDQAgAkKAgICAgIAghCEIDAILAkAgA1AgBEL///////////8AgyICQoCAgICAgMD//wBUIAJCgICAgICAwP//AFEbDQAgBEKAgICAgIAghCEIIAMhAQwCCwJAIAEgDEKAgICAgIDA//8AhYRCAFINAAJAIAMgAkKAgICAgIDA//8AhYRQRQ0AQgAhAUKAgICAgIDg//8AIQgMAwsgCEKAgICAgIDA//8AhCEIQgAhAQwCCwJAIAMgAkKAgICAgIDA//8AhYRCAFINAEIAIQEMAgsCQCABIAyEQgBSDQBCgICAgICA4P//ACAIIAMgAoRQGyEIQgAhAQwCCwJAIAMgAoRCAFINACAIQoCAgICAgMD//wCEIQhCACEBDAILQQAhCwJAIAxC////////P1YNACAFQcACaiABIAcgASAHIAdQIgsbeULAAEIAIAsbfKciC0FxahDogICAAEEQIAtrIQsgBSkDyAIhByAFKQPAAiEBCyACQv///////z9WDQAgBUGwAmogAyAGIAMgBiAGUCING3lCwABCACANG3ynIg1BcWoQ6ICAgAAgDSALakFwaiELIAUpA7gCIQYgBSkDsAIhAwsgBUGgAmogA0IxiCAGQoCAgICAgMAAhCIOQg+GhCICQgBCgICAgLDmvIL1ACACfSIEQgAQ9ICAgAAgBUGQAmpCACAFKQOoAn1CACAEQgAQ9ICAgAAgBUGAAmogBSkDkAJCP4ggBSkDmAJCAYaEIgRCACACQgAQ9ICAgAAgBUHwAWogBEIAQgAgBSkDiAJ9QgAQ9ICAgAAgBUHgAWogBSkD8AFCP4ggBSkD+AFCAYaEIgRCACACQgAQ9ICAgAAgBUHQAWogBEIAQgAgBSkD6AF9QgAQ9ICAgAAgBUHAAWogBSkD0AFCP4ggBSkD2AFCAYaEIgRCACACQgAQ9ICAgAAgBUGwAWogBEIAQgAgBSkDyAF9QgAQ9ICAgAAgBUGgAWogAkIAIAUpA7ABQj+IIAUpA7gBQgGGhEJ/fCIEQgAQ9ICAgAAgBUGQAWogA0IPhkIAIARCABD0gICAACAFQfAAaiAEQgBCACAFKQOoASAFKQOgASIGIAUpA5gBfCICIAZUrXwgAkIBVq18fUIAEPSAgIAAIAVBgAFqQgEgAn1CACAEQgAQ9ICAgAAgCyAKIAlraiIKQf//AGohCQJAAkAgBSkDcCIPQgGGIhAgBSkDgAFCP4ggBSkDiAEiEUIBhoR8IgxCmZN/fCISQiCIIgIgB0KAgICAgIDAAIQiE0IBhiIUQiCIIgR+IhUgAUIBhiIWQiCIIgYgBSkDeEIBhiAPQj+IhCARQj+IfCAMIBBUrXwgEiAMVK18Qn98Ig9CIIgiDH58IhAgFVStIBAgD0L/////D4MiDyABQj+IIhcgB0IBhoRC/////w+DIgd+fCIRIBBUrXwgDCAEfnwgDyAEfiIVIAcgDH58IhAgFVStQiCGIBBCIIiEfCARIBBCIIZ8IhUgEVStfCAVIBJC/////w+DIhIgB34iECACIAZ+fCIRIBBUrSARIA8gFkL+////D4MiEH58IhggEVStfHwiESAVVK18IBEgEiAEfiIVIBAgDH58IgQgAiAHfnwiByAPIAZ+fCIMQiCIIAQgFVStIAcgBFStfCAMIAdUrXxCIIaEfCIEIBFUrXwgBCAYIAIgEH4iByASIAZ+fCICQiCIIAIgB1StQiCGhHwiByAYVK0gByAMQiCGfCIGIAdUrXx8IgcgBFStfCAHQQAgBiACQiCGIgIgEiAQfnwgAlStQn+FIgJWIAYgAlEbrXwiBCAHVK18IgJC/////////wBWDQAgFCAXhCETIAVB0ABqIAQgAkKAgICAgIDAAFQiC60iBoYiByACIAaGIARCAYggC0E/c62IhCIEIAMgDhD0gICAACAKQf7/AGogCSALG0F/aiEJIAFCMYYgBSkDWH0gBSkDUCIBQgBSrX0hBkIAIAF9IQIMAQsgBUHgAGogBEIBiCACQj+GhCIHIAJCAYgiBCADIA4Q9ICAgAAgAUIwhiAFKQNofSAFKQNgIgJCAFKtfSEGQgAgAn0hAiABIRYLAkAgCUH//wFIDQAgCEKAgICAgIDA//8AhCEIQgAhAQwBCwJAAkAgCUEBSA0AIAZCAYYgAkI/iIQhASAJrUIwhiAEQv///////z+DhCEGIAJCAYYhAgwBCwJAIAlBj39KDQBCACEBDAILIAVBwABqIAcgBEEBIAlrEPKAgIAAIAVBMGogFiATIAlB8ABqEOiAgIAAIAVBIGogAyAOIAUpA0AiByAFKQNIIgYQ9ICAgAAgBSkDOCAFKQMoQgGGIAUpAyAiAUI/iIR9IAUpAzAiAiABQgGGIgRUrX0hASACIAR9IQILIAVBEGogAyAOQgNCABD0gICAACAFIAMgDkIFQgAQ9ICAgAAgBiAHIAdCAYMiBCACfCICIANWIAEgAiAEVK18IgEgDlYgASAOURutfCIEIAdUrXwiAyAEIANCgICAgICAwP//AFQgAiAFKQMQViABIAUpAxgiA1YgASADURtxrXwiAyAEVK18IgQgAyAEQoCAgICAgMD//wBUIAIgBSkDAFYgASAFKQMIIgJWIAEgAlEbca18IgEgA1StfCAIhCEICyAAIAE3AwAgACAINwMIIAVB0AJqJICAgIAAC/QBAwF/BH4BfyOAgICAAEEQayICJICAgIAAIAG9IgNC/////////weDIQQCQAJAIANCNIhC/w+DIgVQDQACQCAFQv8PUQ0AIARCBIghBiAEQjyGIQQgBUKA+AB8IQUMAgsgBEIEiCEGIARCPIYhBEL//wEhBQwBCwJAIARQRQ0AQgAhBEIAIQZCACEFDAELIAIgBEIAIAR5pyIHQTFqEOiAgIAAIAIpAwhCgICAgICAwACFIQZBjPgAIAdrrSEFIAIpAwAhBAsgACAENwMAIAAgBUIwhiADQoCAgICAgICAgH+DhCAGhDcDCCACQRBqJICAgIAAC+oBAgV/An4jgICAgABBEGsiAiSAgICAACABvCIDQf///wNxIQQCQAJAIANBF3YiBUH/AXEiBkUNAAJAIAZB/wFGDQAgBK1CGYYhByAFQf8BcUGA/wBqIQRCACEIDAILIAStQhmGIQdCACEIQf//ASEEDAELAkAgBA0AQgAhCEEAIQRCACEHDAELIAIgBK1CACAEZyIEQdEAahDogICAAEGJ/wAgBGshBCACKQMIQoCAgICAgMAAhSEHIAIpAwAhCAsgACAINwMAIAAgBK1CMIYgA0Efdq1CP4aEIAeENwMIIAJBEGokgICAgAALoQEDAX8CfgF/I4CAgIAAQRBrIgIkgICAgAACQAJAIAENAEIAIQNCACEEDAELIAIgASABQR91IgVzIAVrIgWtQgAgBWciBUHRAGoQ6ICAgAAgAikDCEKAgICAgIDAAIVBnoABIAVrrUIwhnxCgICAgICAgICAf0IAIAFBAEgbhCEEIAIpAwAhAwsgACADNwMAIAAgBDcDCCACQRBqJICAgIAAC4EBAgF/An4jgICAgABBEGsiAiSAgICAAAJAAkAgAQ0AQgAhA0IAIQQMAQsgAiABrUIAQfAAIAFnIgFBH3NrEOiAgIAAIAIpAwhCgICAgICAwACFQZ6AASABa61CMIZ8IQQgAikDACEDCyAAIAM3AwAgACAENwMIIAJBEGokgICAgAALBABBAAsEAEEAC1MBAX4CQAJAIANBwABxRQ0AIAIgA0FAaq2IIQFCACECDAELIANFDQAgAkHAACADa62GIAEgA60iBIiEIQEgAiAEiCECCyAAIAE3AwAgACACNwMIC7ULBgF/BH4DfwF+AX8EfiOAgICAAEHgAGsiBSSAgICAACAEQv///////z+DIQYgBCAChUKAgICAgICAgIB/gyEHIAJC////////P4MiCEIgiCEJIARCMIinQf//AXEhCgJAAkACQCACQjCIp0H//wFxIgtBgYB+akGCgH5JDQBBACEMIApBgYB+akGBgH5LDQELAkAgAVAgAkL///////////8AgyINQoCAgICAgMD//wBUIA1CgICAgICAwP//AFEbDQAgAkKAgICAgIAghCEHDAILAkAgA1AgBEL///////////8AgyICQoCAgICAgMD//wBUIAJCgICAgICAwP//AFEbDQAgBEKAgICAgIAghCEHIAMhAQwCCwJAIAEgDUKAgICAgIDA//8AhYRCAFINAAJAIAMgAoRQRQ0AQoCAgICAgOD//wAhB0IAIQEMAwsgB0KAgICAgIDA//8AhCEHQgAhAQwCCwJAIAMgAkKAgICAgIDA//8AhYRCAFINACABIA2EIQJCACEBAkAgAlBFDQBCgICAgICA4P//ACEHDAMLIAdCgICAgICAwP//AIQhBwwCCwJAIAEgDYRCAFINAEIAIQEMAgsCQCADIAKEQgBSDQBCACEBDAILQQAhDAJAIA1C////////P1YNACAFQdAAaiABIAggASAIIAhQIgwbeULAAEIAIAwbfKciDEFxahDogICAAEEQIAxrIQwgBSkDWCIIQiCIIQkgBSkDUCEBCyACQv///////z9WDQAgBUHAAGogAyAGIAMgBiAGUCIOG3lCwABCACAOG3ynIg5BcWoQ6ICAgAAgDCAOa0EQaiEMIAUpA0ghBiAFKQNAIQMLIAsgCmogDGpBgYB/aiEKAkACQCAGQg+GIg9CIIhCgICAgAiEIgIgAUIgiCIEfiIQIANCD4YiEUIgiCIGIAlCgIAEhCIJfnwiDSAQVK0gDSADQjGIIA+EQv////8PgyIDIAhC/////w+DIgh+fCIPIA1UrXwgAiAJfnwgDyARQoCA/v8PgyINIAh+IhEgBiAEfnwiECARVK0gECADIAFC/////w+DIgF+fCIRIBBUrXx8IhAgD1StfCADIAl+IhIgAiAIfnwiDyASVK1CIIYgD0IgiIR8IBAgD0IghnwiDyAQVK18IA8gDSAJfiIQIAYgCH58IgkgAiABfnwiAiADIAR+fCIDQiCIIAkgEFStIAIgCVStfCADIAJUrXxCIIaEfCICIA9UrXwgAiARIA0gBH4iCSAGIAF+fCIEQiCIIAQgCVStQiCGhHwiBiARVK0gBiADQiCGfCIDIAZUrXx8IgYgAlStfCAGIAMgBEIghiICIA0gAX58IgEgAlStfCICIANUrXwiBCAGVK18IgNCgICAgICAwACDUA0AIApBAWohCgwBCyABQj+IIQYgA0IBhiAEQj+IhCEDIARCAYYgAkI/iIQhBCABQgGGIQEgBiACQgGGhCECCwJAIApB//8BSA0AIAdCgICAgICAwP//AIQhB0IAIQEMAQsCQAJAIApBAEoNAAJAQQEgCmsiC0H/AEsNACAFQTBqIAEgAiAKQf8AaiIKEOiAgIAAIAVBIGogBCADIAoQ6ICAgAAgBUEQaiABIAIgCxDygICAACAFIAQgAyALEPKAgIAAIAUpAyAgBSkDEIQgBSkDMCAFKQM4hEIAUq2EIQEgBSkDKCAFKQMYhCECIAUpAwghAyAFKQMAIQQMAgtCACEBDAILIAqtQjCGIANC////////P4OEIQMLIAMgB4QhBwJAIAFQIAJCf1UgAkKAgICAgICAgIB/URsNACAHIARCAXwiAVCtfCEHDAELAkAgASACQoCAgICAgICAgH+FhEIAUQ0AIAQhAQwBCyAHIAQgBEIBg3wiASAEVK18IQcLIAAgATcDACAAIAc3AwggBUHgAGokgICAgAALdQEBfiAAIAQgAX4gAiADfnwgA0IgiCICIAFCIIgiBH58IANC/////w+DIgMgAUL/////D4MiAX4iBUIgiCADIAR+fCIDQiCIfCADQv////8PgyACIAF+fCIBQiCIfDcDCCAAIAFCIIYgBUL/////D4OENwMACyAAQYCAhIAAJIKAgIAAQYCAgIAAQQ9qQXBxJIGAgIAACw8AI4CAgIAAI4GAgIAAawsIACOCgICAAAsIACOBgICAAAtUAQF/I4CAgIAAQRBrIgUkgICAgAAgBSABIAIgAyAEQoCAgICAgICAgH+FEOeAgIAAIAUpAwAhBCAAIAUpAwg3AwggACAENwMAIAVBEGokgICAgAALqQQDAX8CfgR/I4CAgIAAQSBrIgIkgICAgAAgAUL///////8/gyEDAkACQCABQjCIQv//AYMiBKciBUH/h39qQf0PSw0AIABCPIggA0IEhoQhAyAFQYCIf2qtIQQCQAJAIABC//////////8PgyIAQoGAgICAgICACFQNACADQgF8IQMMAQsgAEKAgICAgICAgAhSDQAgA0IBgyADfCEDC0IAIAMgA0L/////////B1YiBRshACAFrSAEfCEDDAELAkAgACADhFANACAEQv//AVINACAAQjyIIANCBIaEQoCAgICAgIAEhCEAQv8PIQMMAQsCQCAFQf6HAU0NAEL/DyEDQgAhAAwBCwJAQYD4AEGB+AAgBFAiBhsiByAFayIIQfAATA0AQgAhAEIAIQMMAQsgAyADQoCAgICAgMAAhCAGGyEDQQAhBgJAIAcgBUYNACACQRBqIAAgA0GAASAIaxDogICAACACKQMQIAIpAxiEQgBSIQYLIAIgACADIAgQ8oCAgAAgAikDACIDQjyIIAIpAwhCBIaEIQACQAJAIANC//////////8PgyAGrYQiA0KBgICAgICAgAhUDQAgAEIBfCEADAELIANCgICAgICAgIAIUg0AIABCAYMgAHwhAAsgAEKAgICAgICACIUgACAAQv////////8HViIFGyEAIAWtIQMLIAJBIGokgICAgAAgA0I0hiABQoCAgICAgICAgH+DhCAAhL8LigQDAX8CfgR/I4CAgIAAQSBrIgIkgICAgAAgAUL///////8/gyEDAkACQCABQjCIQv//AYMiBKciBUH/gH9qQf0BSw0AIANCGYinIQYCQAJAIABQIAFC////D4MiA0KAgIAIVCADQoCAgAhRGw0AIAZBAWohBgwBCyAAIANCgICACIWEQgBSDQAgBkEBcSAGaiEGC0EAIAYgBkH///8DSyIHGyEGQYGBf0GAgX8gBxsgBWohBQwBCwJAIAAgA4RQDQAgBEL//wFSDQAgA0IZiKdBgICAAnIhBkH/ASEFDAELAkAgBUH+gAFNDQBB/wEhBUEAIQYMAQsCQEGA/wBBgf8AIARQIgcbIgggBWsiBkHwAEwNAEEAIQZBACEFDAELIAMgA0KAgICAgIDAAIQgBxshA0EAIQcCQCAIIAVGDQAgAkEQaiAAIANBgAEgBmsQ6ICAgAAgAikDECACKQMYhEIAUiEHCyACIAAgAyAGEPKAgIAAIAIpAwgiA0IZiKchBgJAAkAgAikDACAHrYQiAFAgA0L///8PgyIDQoCAgAhUIANCgICACFEbDQAgBkEBaiEGDAELIAAgA0KAgIAIhYRCAFINACAGQQFxIAZqIQYLIAZBgICABHMgBiAGQf///wNLIgUbIQYLIAJBIGokgICAgAAgBUEXdCABQiCIp0GAgICAeHFyIAZyvgv7AgEDfwJAIAANAEEAIQECQEEAKAKAn4SAAEUNAEEAKAKAn4SAABD8gICAACEBCwJAQQAoAoCehIAARQ0AQQAoAoCehIAAEPyAgIAAIAFyIQELAkAQoICAgAAoAgAiAEUNAANAAkACQCAAKAJMQQBODQBBASECDAELIAAQnoCAgABFIQILAkAgACgCFCAAKAIcRg0AIAAQ/ICAgAAgAXIhAQsCQCACDQAgABCfgICAAAsgACgCOCIADQALCxChgICAACABDwsCQAJAIAAoAkxBAE4NAEEBIQIMAQsgABCegICAAEUhAgsCQAJAAkAgACgCFCAAKAIcRg0AIABBAEEAIAAoAiQRgICAgACAgICAABogACgCFA0AQX8hASACRQ0BDAILAkAgACgCBCIBIAAoAggiA0YNACAAIAEgA2usQQEgACgCKBGDgICAAICAgIAAGgtBACEBIABBADYCHCAAQgA3AxAgAEIANwIEIAINAQsgABCfgICAAAsgAQsKACAAJICAgIAACxoBAn8jgICAgAAgAGtBcHEiASSAgICAACABCwgAI4CAgIAACx4AQQAgACAAQZkBSxtBAXQvAbCahIAAQbyLhIAAagsMACAAIAAQgIGAgAALC5UeAgBBgIAEC+QcaW5maW5pdHkAZGF5AC0rICAgMFgweAAtMFgrMFggMFgtMHgrMHggMHgAZGF5cwBTdWNjZXNzAHdlZWtzACVkICVzLCAlZCAlcwBVbmtub3duIGVycm9yAERhdGUgY29udmVyc2lvbiBlcnJvcgBTeXN0ZW0gdGltZSBlcnJvcgBuYW4AT3V0cHV0IGJ1ZmZlciB0b28gc21hbGwAd2VlawBpbmYASW52YWxpZCBkYXRlIGZvcm1hdCBvciB2YWx1ZQBGYWlsZWQgdG8gY29udmVydCBkYXRlAEludmFsaWQgZGF0ZQBMTk1QIGRhdGUgaXMgaW4gdGhlIGZ1dHVyZQBMTk1QIGlzIGluIHRoZSBmdXR1cmUARmFpbGVkIHRvIGdldCBzeXN0ZW0gdGltZQBOVUxMIHBhcmFtZXRlciBwcm92aWRlZAAlMDJkLyUwMmQvJTA0ZAAlMmQvJTJkLyU0ZABOQU4ASU5GAC4AKG51bGwpAAAAAAAAAAAAAAAAHwAAABwAAAAfAAAAHgAAAB8AAAAeAAAAHwAAAB8AAAAeAAAAHwAAAB4AAAAfAAAAGQALABkZGQAAAAAFAAAAAAAACQAAAAALAAAAAAAAAAAZAAoKGRkZAwoHAAEACQsYAAAJBgsAAAsABhkAAAAZGRkAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAGQALDRkZGQANAAACAAkOAAAACQAOAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAABMAAAAAEwAAAAAJDAAAAAAADAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAPAAAABA8AAAAACRAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAAAAAAAEQAAAAARAAAAAAkSAAAAAAASAAASAAAaAAAAGhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoAAAAaGhoAAAAAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAXAAAAABcAAAAACRQAAAAAABQAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFgAAAAAAAAAAAAAAFQAAAAAVAAAAAAkWAAAAAAAWAAAWAAAwMTIzNDU2Nzg5QUJDREVG0XSeAFedvSqAcFIP//8+JwoAAABkAAAA6AMAABAnAACghgEAQEIPAICWmAAA4fUFGAAAADUAAABxAAAAa////877//+Sv///AAAAAAAAAAD/////////////////////////////////////////////////////////////////AAECAwQFBgcICf////////8KCwwNDg8QERITFBUWFxgZGhscHR4fICEiI////////woLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIj/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wABAgQHAwYFAAAAAAAAAAIAAMADAADABAAAwAUAAMAGAADABwAAwAgAAMAJAADACgAAwAsAAMAMAADADQAAwA4AAMAPAADAEAAAwBEAAMASAADAEwAAwBQAAMAVAADAFgAAwBcAAMAYAADAGQAAwBoAAMAbAADAHAAAwB0AAMAeAADAHwAAwAAAALMBAADDAgAAwwMAAMMEAADDBQAAwwYAAMMHAADDCAAAwwkAAMMKAADDCwAAwwwAAMMNAADTDgAAww8AAMMAAAy7AQAMwwIADMMDAAzDBAAM21N1Y2Nlc3MASWxsZWdhbCBieXRlIHNlcXVlbmNlAERvbWFpbiBlcnJvcgBSZXN1bHQgbm90IHJlcHJlc2VudGFibGUATm90IGEgdHR5AFBlcm1pc3Npb24gZGVuaWVkAE9wZXJhdGlvbiBub3QgcGVybWl0dGVkAE5vIHN1Y2ggZmlsZSBvciBkaXJlY3RvcnkATm8gc3VjaCBwcm9jZXNzAEZpbGUgZXhpc3RzAFZhbHVlIHRvbyBsYXJnZSBmb3IgZGVmaW5lZCBkYXRhIHR5cGUATm8gc3BhY2UgbGVmdCBvbiBkZXZpY2UAT3V0IG9mIG1lbW9yeQBSZXNvdXJjZSBidXN5AEludGVycnVwdGVkIHN5c3RlbSBjYWxsAFJlc291cmNlIHRlbXBvcmFyaWx5IHVuYXZhaWxhYmxlAEludmFsaWQgc2VlawBDcm9zcy1kZXZpY2UgbGluawBSZWFkLW9ubHkgZmlsZSBzeXN0ZW0ARGlyZWN0b3J5IG5vdCBlbXB0eQBDb25uZWN0aW9uIHJlc2V0IGJ5IHBlZXIAT3BlcmF0aW9uIHRpbWVkIG91dABDb25uZWN0aW9uIHJlZnVzZWQASG9zdCBpcyBkb3duAEhvc3QgaXMgdW5yZWFjaGFibGUAQWRkcmVzcyBpbiB1c2UAQnJva2VuIHBpcGUASS9PIGVycm9yAE5vIHN1Y2ggZGV2aWNlIG9yIGFkZHJlc3MAQmxvY2sgZGV2aWNlIHJlcXVpcmVkAE5vIHN1Y2ggZGV2aWNlAE5vdCBhIGRpcmVjdG9yeQBJcyBhIGRpcmVjdG9yeQBUZXh0IGZpbGUgYnVzeQBFeGVjIGZvcm1hdCBlcnJvcgBJbnZhbGlkIGFyZ3VtZW50AEFyZ3VtZW50IGxpc3QgdG9vIGxvbmcAU3ltYm9saWMgbGluayBsb29wAEZpbGVuYW1lIHRvbyBsb25nAFRvbyBtYW55IG9wZW4gZmlsZXMgaW4gc3lzdGVtAE5vIGZpbGUgZGVzY3JpcHRvcnMgYXZhaWxhYmxlAEJhZCBmaWxlIGRlc2NyaXB0b3IATm8gY2hpbGQgcHJvY2VzcwBCYWQgYWRkcmVzcwBGaWxlIHRvbyBsYXJnZQBUb28gbWFueSBsaW5rcwBObyBsb2NrcyBhdmFpbGFibGUAUmVzb3VyY2UgZGVhZGxvY2sgd291bGQgb2NjdXIAU3RhdGUgbm90IHJlY292ZXJhYmxlAE93bmVyIGRpZWQAT3BlcmF0aW9uIGNhbmNlbGVkAEZ1bmN0aW9uIG5vdCBpbXBsZW1lbnRlZABObyBtZXNzYWdlIG9mIGRlc2lyZWQgdHlwZQBJZGVudGlmaWVyIHJlbW92ZWQARGV2aWNlIG5vdCBhIHN0cmVhbQBObyBkYXRhIGF2YWlsYWJsZQBEZXZpY2UgdGltZW91dABPdXQgb2Ygc3RyZWFtcyByZXNvdXJjZXMATGluayBoYXMgYmVlbiBzZXZlcmVkAFByb3RvY29sIGVycm9yAEJhZCBtZXNzYWdlAEZpbGUgZGVzY3JpcHRvciBpbiBiYWQgc3RhdGUATm90IGEgc29ja2V0AERlc3RpbmF0aW9uIGFkZHJlc3MgcmVxdWlyZWQATWVzc2FnZSB0b28gbGFyZ2UAUHJvdG9jb2wgd3JvbmcgdHlwZSBmb3Igc29ja2V0AFByb3RvY29sIG5vdCBhdmFpbGFibGUAUHJvdG9jb2wgbm90IHN1cHBvcnRlZABTb2NrZXQgdHlwZSBub3Qgc3VwcG9ydGVkAE5vdCBzdXBwb3J0ZWQAUHJvdG9jb2wgZmFtaWx5IG5vdCBzdXBwb3J0ZWQAQWRkcmVzcyBmYW1pbHkgbm90IHN1cHBvcnRlZCBieSBwcm90b2NvbABBZGRyZXNzIG5vdCBhdmFpbGFibGUATmV0d29yayBpcyBkb3duAE5ldHdvcmsgdW5yZWFjaGFibGUAQ29ubmVjdGlvbiByZXNldCBieSBuZXR3b3JrAENvbm5lY3Rpb24gYWJvcnRlZABObyBidWZmZXIgc3BhY2UgYXZhaWxhYmxlAFNvY2tldCBpcyBjb25uZWN0ZWQAU29ja2V0IG5vdCBjb25uZWN0ZWQAQ2Fubm90IHNlbmQgYWZ0ZXIgc29ja2V0IHNodXRkb3duAE9wZXJhdGlvbiBhbHJlYWR5IGluIHByb2dyZXNzAE9wZXJhdGlvbiBpbiBwcm9ncmVzcwBTdGFsZSBmaWxlIGhhbmRsZQBSZW1vdGUgSS9PIGVycm9yAFF1b3RhIGV4Y2VlZGVkAE5vIG1lZGl1bSBmb3VuZABXcm9uZyBtZWRpdW0gdHlwZQBNdWx0aWhvcCBhdHRlbXB0ZWQAUmVxdWlyZWQga2V5IG5vdCBhdmFpbGFibGUAS2V5IGhhcyBleHBpcmVkAEtleSBoYXMgYmVlbiByZXZva2VkAEtleSB3YXMgcmVqZWN0ZWQgYnkgc2VydmljZQAAAAAAAAAAAAAAoAJOAOsBpwV+BSABdQYYA4YE+gC5AywD/QW3AYoBegO8BB4AzAaiAD0DSQPXAQAECACTBggBjwIGAioGXwK3AvoCWAPZBP0GygK9BeEFzQXcAhAGQAJ4AH0CZwNhBOwA5QMKBdQAzAM+Bk8CdgGYA68EAABEABACrgCuA2AA+gF3BCEF6wQrAGABQQGSAKkGowFuAk4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEwQAAAAAAAAAACoCAAAAAAAAAAAAAAAAAAAAAAAAAAAnBDkESAQAAAAAAAAAAAAAAAAAAAAAkgQAAAAAAAAAAAAAAAAAAAAAAAA4BVIFYAVTBgAAygEAAAAAAAAAALsG2wbrBhAHKwc7B1AHAEHonAQLoAEAIAAAAAAAAAUAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAHAAAATBABAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAOAQBAEgEAAJQBD3RhcmdldF9mZWF0dXJlcwgrC2J1bGstbWVtb3J5Kw9idWxrLW1lbW9yeS1vcHQrFmNhbGwtaW5kaXJlY3Qtb3ZlcmxvbmcrCm11bHRpdmFsdWUrD211dGFibGUtZ2xvYmFscysTbm9udHJhcHBpbmctZnB0b2ludCsPcmVmZXJlbmNlLXR5cGVzKwhzaWduLWV4dA==');
}

function getBinarySync(file) {
  if (ArrayBuffer.isView(file)) {
    return file;
  }
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
    return readBinary(file);
  }
  // Throwing a plain string here, even though it not normally adviables since
  // this gets turning into an `abort` in instantiateArrayBuffer.
  throw 'both async and sync fetching of the wasm failed';
}

async function getWasmBinary(binaryFile) {

  // Otherwise, getBinarySync should be able to get it synchronously
  return getBinarySync(binaryFile);
}

async function instantiateArrayBuffer(binaryFile, imports) {
  try {
    var binary = await getWasmBinary(binaryFile);
    var instance = await WebAssembly.instantiate(binary, imports);
    return instance;
  } catch (reason) {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    // Warn on some common problems.
    if (isFileURI(binaryFile)) {
      err(`warning: Loading from a file URI (${binaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  }
}

async function instantiateAsync(binary, binaryFile, imports) {
  return instantiateArrayBuffer(binaryFile, imports);
}

function getWasmImports() {
  // prepare imports
  var imports = {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  };
  return imports;
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
async function createWasm() {
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    assignWasmExports(wasmExports);

    updateMemoryViews();

    return wasmExports;
  }

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    return receiveInstance(result['instance']);
  }

  var info = getWasmImports();

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {
    return new Promise((resolve, reject) => {
      try {
        Module['instantiateWasm'](info, (inst, mod) => {
          resolve(receiveInstance(inst, mod));
        });
      } catch(e) {
        err(`Module.instantiateWasm callback failed with error: ${e}`);
        reject(e);
      }
    });
  }

  wasmBinaryFile ??= findWasmBinary();
  var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
  var exports = receiveInstantiationResult(result);
  return exports;
}

// end include: preamble.js

// Begin JS library code


  class ExitStatus {
      name = 'ExitStatus';
      constructor(status) {
        this.message = `Program terminated with exit(${status})`;
        this.status = status;
      }
    }

  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };
  var onPostRuns = [];
  var addOnPostRun = (cb) => onPostRuns.push(cb);

  var onPreRuns = [];
  var addOnPreRun = (cb) => onPreRuns.push(cb);

  /** @noinline */
  var base64Decode = (b64) => {
  
      assert(b64.length % 4 == 0);
      var b1, b2, i = 0, j = 0, bLength = b64.length;
      var output = new Uint8Array((bLength*3>>2) - (b64[bLength-2] == '=') - (b64[bLength-1] == '='));
      for (; i < bLength; i += 4, j += 3) {
        b1 = base64ReverseLookup[b64.charCodeAt(i+1)];
        b2 = base64ReverseLookup[b64.charCodeAt(i+2)];
        output[j] = base64ReverseLookup[b64.charCodeAt(i)] << 2 | b1 >> 4;
        output[j+1] = b1 << 4 | b2 >> 2;
        output[j+2] = b2 << 6 | base64ReverseLookup[b64.charCodeAt(i+3)];
      }
      return output;
    };


  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP64[((ptr)>>3)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var noExitRuntime = true;

  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number', `ptrToString expects a number, got ${typeof ptr}`);
      // Convert to 32-bit unsigned value
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': HEAP64[((ptr)>>3)] = BigInt(value); break;
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }

  var stackRestore = (val) => __emscripten_stack_restore(val);

  var stackSave = () => _emscripten_stack_get_current();

  var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        err(text);
      }
    };

  

  var __abort_js = () =>
      abort('native code called abort()');

  var isLeapYear = (year) => year%4 === 0 && (year%100 !== 0 || year%400 === 0);
  
  var MONTH_DAYS_LEAP_CUMULATIVE = [0,31,60,91,121,152,182,213,244,274,305,335];
  
  var MONTH_DAYS_REGULAR_CUMULATIVE = [0,31,59,90,120,151,181,212,243,273,304,334];
  var ydayFromDate = (date) => {
      var leap = isLeapYear(date.getFullYear());
      var monthDaysCumulative = (leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE);
      var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1; // -1 since it's days since Jan 1
  
      return yday;
    };
  
  var INT53_MAX = 9007199254740992;
  
  var INT53_MIN = -9007199254740992;
  var bigintToI53Checked = (num) => (num < INT53_MIN || num > INT53_MAX) ? NaN : Number(num);
  var __mktime_js = function(tmPtr) {
  
  var ret = (() => { 
      var date = new Date(HEAP32[(((tmPtr)+(20))>>2)] + 1900,
                          HEAP32[(((tmPtr)+(16))>>2)],
                          HEAP32[(((tmPtr)+(12))>>2)],
                          HEAP32[(((tmPtr)+(8))>>2)],
                          HEAP32[(((tmPtr)+(4))>>2)],
                          HEAP32[((tmPtr)>>2)],
                          0);
  
      // There's an ambiguous hour when the time goes back; the tm_isdst field is
      // used to disambiguate it.  Date() basically guesses, so we fix it up if it
      // guessed wrong, or fill in tm_isdst with the guess if it's -1.
      var dst = HEAP32[(((tmPtr)+(32))>>2)];
      var guessedOffset = date.getTimezoneOffset();
      var start = new Date(date.getFullYear(), 0, 1);
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dstOffset = Math.min(winterOffset, summerOffset); // DST is in December in South
      if (dst < 0) {
        // Attention: some regions don't have DST at all.
        HEAP32[(((tmPtr)+(32))>>2)] = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
      } else if ((dst > 0) != (dstOffset == guessedOffset)) {
        var nonDstOffset = Math.max(winterOffset, summerOffset);
        var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
        // Don't try setMinutes(date.getMinutes() + ...) -- it's messed up.
        date.setTime(date.getTime() + (trueOffset - guessedOffset)*60000);
      }
  
      HEAP32[(((tmPtr)+(24))>>2)] = date.getDay();
      var yday = ydayFromDate(date)|0;
      HEAP32[(((tmPtr)+(28))>>2)] = yday;
      // To match expected behavior, update fields from date
      HEAP32[((tmPtr)>>2)] = date.getSeconds();
      HEAP32[(((tmPtr)+(4))>>2)] = date.getMinutes();
      HEAP32[(((tmPtr)+(8))>>2)] = date.getHours();
      HEAP32[(((tmPtr)+(12))>>2)] = date.getDate();
      HEAP32[(((tmPtr)+(16))>>2)] = date.getMonth();
      HEAP32[(((tmPtr)+(20))>>2)] = date.getYear();
  
      var timeMs = date.getTime();
      if (isNaN(timeMs)) {
        return -1;
      }
      // Return time in microseconds
      return timeMs / 1000;
     })();
  return BigInt(ret);
  };

  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string', `stringToUTF8Array expects a string (got ${typeof str})`);
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.codePointAt(i);
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
          // Gotcha: if codePoint is over 0xFFFF, it is represented as a surrogate pair in UTF-16.
          // We need to manually skip over the second code unit for correct iteration.
          i++;
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  var __tzset_js = (timezone, daylight, std_name, dst_name) => {
      // TODO: Use (malleable) environment variables instead of system settings.
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
  
      // Local standard timezone offset. Local standard time is not adjusted for
      // daylight savings.  This code uses the fact that getTimezoneOffset returns
      // a greater value during Standard Time versus Daylight Saving Time (DST).
      // Thus it determines the expected output during Standard Time, and it
      // compares whether the output of the given date the same (Standard) or less
      // (DST).
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
  
      // timezone is specified as seconds west of UTC ("The external variable
      // `timezone` shall be set to the difference, in seconds, between
      // Coordinated Universal Time (UTC) and local standard time."), the same
      // as returned by stdTimezoneOffset.
      // See http://pubs.opengroup.org/onlinepubs/009695399/functions/tzset.html
      HEAPU32[((timezone)>>2)] = stdTimezoneOffset * 60;
  
      HEAP32[((daylight)>>2)] = Number(winterOffset != summerOffset);
  
      var extractZone = (timezoneOffset) => {
        // Why inverse sign?
        // Read here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
        var sign = timezoneOffset >= 0 ? "-" : "+";
  
        var absOffset = Math.abs(timezoneOffset)
        var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
        var minutes = String(absOffset % 60).padStart(2, "0");
  
        return `UTC${sign}${hours}${minutes}`;
      }
  
      var winterName = extractZone(winterOffset);
      var summerName = extractZone(summerOffset);
      assert(winterName);
      assert(summerName);
      assert(lengthBytesUTF8(winterName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${winterName})`);
      assert(lengthBytesUTF8(summerName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${summerName})`);
      if (summerOffset < winterOffset) {
        // Northern hemisphere
        stringToUTF8(winterName, std_name, 17);
        stringToUTF8(summerName, dst_name, 17);
      } else {
        stringToUTF8(winterName, dst_name, 17);
        stringToUTF8(summerName, std_name, 17);
      }
    };

  var _emscripten_date_now = () => Date.now();

  var abortOnCannotGrowMemory = (requestedSize) => {
      abort(`Cannot enlarge memory arrays to size ${requestedSize} bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value ${HEAP8.length}, (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0`);
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      abortOnCannotGrowMemory(requestedSize);
    };

  var UTF8Decoder = globalThis.TextDecoder && new TextDecoder();
  
  var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
      var maxIdx = idx + maxBytesToRead;
      if (ignoreNul) return maxIdx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.
      // As a tiny code save trick, compare idx against maxIdx using a negation,
      // so that maxBytesToRead=undefined/NaN means Infinity.
      while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
      return idx;
    };
  
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number=} idx
     * @param {number=} maxBytesToRead
     * @param {boolean=} ignoreNul - If true, the function will not stop on a NUL character.
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
  
      var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
  
      // When using conditional TextDecoder, skip it for short strings as the overhead of the native call is not worth it.
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index.
     * @param {boolean=} ignoreNul - If true, the function will not stop on a NUL character.
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) => {
      assert(typeof ptr == 'number', `UTF8ToString expects a number (got ${typeof ptr})`);
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : '';
    };
  var SYSCALLS = {
  varargs:undefined,
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  };
  var _fd_close = (fd) => {
      abort('fd_close called without SYSCALLS_REQUIRE_FILESYSTEM');
    };

  function _fd_seek(fd, offset, whence, newOffset) {
    offset = bigintToI53Checked(offset);
  
  
      return 70;
    ;
  }

  var printCharBuffers = [null,[],[]];
  
  var printChar = (stream, curr) => {
      var buffer = printCharBuffers[stream];
      assert(buffer);
      if (curr === 0 || curr === 10) {
        (stream === 1 ? out : err)(UTF8ArrayToString(buffer));
        buffer.length = 0;
      } else {
        buffer.push(curr);
      }
    };
  
  var flush_NO_FILESYSTEM = () => {
      // flush anything remaining in the buffers during shutdown
      _fflush(0);
      if (printCharBuffers[1].length) printChar(1, 10);
      if (printCharBuffers[2].length) printChar(2, 10);
    };
  
  
  var _fd_write = (fd, iov, iovcnt, pnum) => {
      // hack to support printf in SYSCALLS_REQUIRE_FILESYSTEM=0
      var num = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        for (var j = 0; j < len; j++) {
          printChar(fd, HEAPU8[ptr+j]);
        }
        num += len;
      }
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    };

  var getCFunc = (ident) => {
      var func = Module['_' + ident]; // closure exported function
      assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
      return func;
    };
  
  var writeArrayToMemory = (array, buffer) => {
      assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
      HEAP8.set(array, buffer);
    };
  
  
  
  var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
  var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };
  
  
  
  
  
    /**
     * @param {string|null=} returnType
     * @param {Array=} argTypes
     * @param {Array=} args
     * @param {Object=} opts
     */
  var ccall = (ident, returnType, argTypes, args, opts) => {
      // For fast lookup of conversion functions
      var toC = {
        'string': (str) => {
          var ret = 0;
          if (str !== null && str !== undefined && str !== 0) { // null string
            ret = stringToUTF8OnStack(str);
          }
          return ret;
        },
        'array': (arr) => {
          var ret = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret);
          return ret;
        }
      };
  
      function convertReturnValue(ret) {
        if (returnType === 'string') {
          return UTF8ToString(ret);
        }
        if (returnType === 'boolean') return Boolean(ret);
        return ret;
      }
  
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      assert(returnType !== 'array', 'Return type should not be "array".');
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func(...cArgs);
      function onDone(ret) {
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret);
      }
  
      ret = onDone(ret);
      return ret;
    };

  
    /**
     * @param {string=} returnType
     * @param {Array=} argTypes
     * @param {Object=} opts
     */
  var cwrap = (ident, returnType, argTypes, opts) => {
      return (...args) => ccall(ident, returnType, argTypes, args, opts);
    };





    // Precreate a reverse lookup table from chars
    // "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" back to
    // bytes to make decoding fast.
    for (var base64ReverseLookup = new Uint8Array(123/*'z'+1*/), i = 25; i >= 0; --i) {
      base64ReverseLookup[48+i] = 52+i; // '0-9'
      base64ReverseLookup[65+i] = i; // 'A-Z'
      base64ReverseLookup[97+i] = 26+i; // 'a-z'
    }
    base64ReverseLookup[43] = 62; // '+'
    base64ReverseLookup[47] = 63; // '/'
  ;
// End JS library code

// include: postlibrary.js
// This file is included after the automatically-generated JS library code
// but before the wasm module is created.

{

  // Begin ATMODULES hooks
  if (Module['noExitRuntime']) noExitRuntime = Module['noExitRuntime'];
if (Module['print']) out = Module['print'];
if (Module['printErr']) err = Module['printErr'];
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];

Module['FS_createDataFile'] = FS.createDataFile;
Module['FS_createPreloadedFile'] = FS.createPreloadedFile;

  // End ATMODULES hooks

  checkIncomingModuleAPI();

  if (Module['arguments']) arguments_ = Module['arguments'];
  if (Module['thisProgram']) thisProgram = Module['thisProgram'];

  // Assertions on removed incoming Module JS APIs.
  assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['read'] == 'undefined', 'Module.read option was removed');
  assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
  assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
  assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)');
  assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
  assert(typeof Module['ENVIRONMENT'] == 'undefined', 'Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
  assert(typeof Module['STACK_SIZE'] == 'undefined', 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')
  // If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
  assert(typeof Module['wasmMemory'] == 'undefined', 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
  assert(typeof Module['INITIAL_MEMORY'] == 'undefined', 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

  if (Module['preInit']) {
    if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
    while (Module['preInit'].length > 0) {
      Module['preInit'].shift()();
    }
  }
  consumedModuleProp('preInit');
}

// Begin runtime exports
  Module['stackSave'] = stackSave;
  Module['stackRestore'] = stackRestore;
  Module['stackAlloc'] = stackAlloc;
  Module['ccall'] = ccall;
  Module['cwrap'] = cwrap;
  Module['UTF8ToString'] = UTF8ToString;
  var missingLibrarySymbols = [
  'writeI53ToI64',
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'readI53FromI64',
  'readI53FromU64',
  'convertI32PairToI53',
  'convertI32PairToI53Checked',
  'convertU32PairToI53',
  'getTempRet0',
  'setTempRet0',
  'createNamedFunction',
  'zeroMemory',
  'exitJS',
  'getHeapMax',
  'growMemory',
  'withStackSave',
  'strError',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'readEmAsmArgs',
  'jstoi_q',
  'getExecutableName',
  'autoResumeAudioContext',
  'getDynCaller',
  'dynCall',
  'handleException',
  'keepRuntimeAlive',
  'runtimeKeepalivePush',
  'runtimeKeepalivePop',
  'callUserCallback',
  'maybeExit',
  'asyncLoad',
  'asmjsMangle',
  'alignMemory',
  'mmapAlloc',
  'HandleAllocator',
  'getUniqueRunDependency',
  'addRunDependency',
  'removeRunDependency',
  'addOnInit',
  'addOnPostCtor',
  'addOnPreMain',
  'addOnExit',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'intArrayFromString',
  'intArrayToString',
  'AsciiToString',
  'stringToAscii',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'UTF32ToString',
  'stringToUTF32',
  'lengthBytesUTF32',
  'stringToNewUTF8',
  'registerKeyEventCallback',
  'maybeCStringToJsString',
  'findEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'setLetterbox',
  'softFullscreenResizeWebGLRenderTarget',
  'doRequestFullscreen',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'registerPointerlockErrorEventCallback',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'registerTouchEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'fillBatteryEventData',
  'registerBatteryEventCallback',
  'setCanvasElementSize',
  'getCanvasElementSize',
  'jsStackTrace',
  'getCallstack',
  'convertPCtoSourceLocation',
  'getEnvStrings',
  'checkWasiClock',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'initRandomFill',
  'randomFill',
  'safeSetTimeout',
  'setImmediateWrapped',
  'safeRequestAnimationFrame',
  'clearImmediateWrapped',
  'registerPostMainLoop',
  'registerPreMainLoop',
  'getPromise',
  'makePromise',
  'idsToPromises',
  'makePromiseCallback',
  'ExceptionInfo',
  'findMatchingCatch',
  'Browser_asyncPrepareDataCounter',
  'arraySum',
  'addDays',
  'getSocketFromFD',
  'getSocketAddress',
  'FS_createPreloadedFile',
  'FS_preloadFile',
  'FS_modeStringToFlags',
  'FS_getMode',
  'FS_stdin_getChar',
  'FS_mkdirTree',
  '_setNetworkCallback',
  'heapObjectForWebGLType',
  'toTypedArrayIndex',
  'webgl_enable_ANGLE_instanced_arrays',
  'webgl_enable_OES_vertex_array_object',
  'webgl_enable_WEBGL_draw_buffers',
  'webgl_enable_WEBGL_multi_draw',
  'webgl_enable_EXT_polygon_offset_clamp',
  'webgl_enable_EXT_clip_control',
  'webgl_enable_WEBGL_polygon_mode',
  'emscriptenWebGLGet',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  'emscriptenWebGLGetUniform',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  'emscriptenWebGLGetVertexAttrib',
  '__glGetActiveAttribOrUniform',
  'writeGLArray',
  'registerWebGlEventCallback',
  'runAndAbortIfError',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
  'allocateUTF8',
  'allocateUTF8OnStack',
  'demangle',
  'stackTrace',
  'getNativeTypeSize',
];
missingLibrarySymbols.forEach(missingLibrarySymbol)

  var unexportedSymbols = [
  'run',
  'out',
  'err',
  'callMain',
  'abort',
  'wasmExports',
  'HEAPF32',
  'HEAPF64',
  'HEAP8',
  'HEAPU8',
  'HEAP16',
  'HEAPU16',
  'HEAP32',
  'HEAPU32',
  'HEAP64',
  'HEAPU64',
  'writeStackCookie',
  'checkStackCookie',
  'INT53_MAX',
  'INT53_MIN',
  'bigintToI53Checked',
  'ptrToString',
  'abortOnCannotGrowMemory',
  'ENV',
  'ERRNO_CODES',
  'DNS',
  'Protocols',
  'Sockets',
  'timers',
  'warnOnce',
  'readEmAsmArgsArray',
  'wasmTable',
  'wasmMemory',
  'noExitRuntime',
  'addOnPreRun',
  'addOnPostRun',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'stringToUTF8Array',
  'stringToUTF8',
  'lengthBytesUTF8',
  'UTF16Decoder',
  'stringToUTF8OnStack',
  'writeArrayToMemory',
  'JSEvents',
  'specialHTMLTargets',
  'findCanvasEventTarget',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'UNWIND_CACHE',
  'ExitStatus',
  'flush_NO_FILESYSTEM',
  'emSetImmediate',
  'emClearImmediate_deps',
  'emClearImmediate',
  'promiseMap',
  'uncaughtExceptionCount',
  'exceptionLast',
  'exceptionCaught',
  'Browser',
  'requestFullscreen',
  'requestFullScreen',
  'setCanvasSize',
  'getUserMedia',
  'createContext',
  'getPreloadedImageData__data',
  'wget',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'isLeapYear',
  'ydayFromDate',
  'base64Decode',
  'SYSCALLS',
  'preloadPlugins',
  'FS_stdin_getChar_buffer',
  'FS_unlink',
  'FS_createPath',
  'FS_createDevice',
  'FS_readFile',
  'FS',
  'FS_root',
  'FS_mounts',
  'FS_devices',
  'FS_streams',
  'FS_nextInode',
  'FS_nameTable',
  'FS_currentPath',
  'FS_initialized',
  'FS_ignorePermissions',
  'FS_filesystems',
  'FS_syncFSRequests',
  'FS_readFiles',
  'FS_lookupPath',
  'FS_getPath',
  'FS_hashName',
  'FS_hashAddNode',
  'FS_hashRemoveNode',
  'FS_lookupNode',
  'FS_createNode',
  'FS_destroyNode',
  'FS_isRoot',
  'FS_isMountpoint',
  'FS_isFile',
  'FS_isDir',
  'FS_isLink',
  'FS_isChrdev',
  'FS_isBlkdev',
  'FS_isFIFO',
  'FS_isSocket',
  'FS_flagsToPermissionString',
  'FS_nodePermissions',
  'FS_mayLookup',
  'FS_mayCreate',
  'FS_mayDelete',
  'FS_mayOpen',
  'FS_checkOpExists',
  'FS_nextfd',
  'FS_getStreamChecked',
  'FS_getStream',
  'FS_createStream',
  'FS_closeStream',
  'FS_dupStream',
  'FS_doSetAttr',
  'FS_chrdev_stream_ops',
  'FS_major',
  'FS_minor',
  'FS_makedev',
  'FS_registerDevice',
  'FS_getDevice',
  'FS_getMounts',
  'FS_syncfs',
  'FS_mount',
  'FS_unmount',
  'FS_lookup',
  'FS_mknod',
  'FS_statfs',
  'FS_statfsStream',
  'FS_statfsNode',
  'FS_create',
  'FS_mkdir',
  'FS_mkdev',
  'FS_symlink',
  'FS_rename',
  'FS_rmdir',
  'FS_readdir',
  'FS_readlink',
  'FS_stat',
  'FS_fstat',
  'FS_lstat',
  'FS_doChmod',
  'FS_chmod',
  'FS_lchmod',
  'FS_fchmod',
  'FS_doChown',
  'FS_chown',
  'FS_lchown',
  'FS_fchown',
  'FS_doTruncate',
  'FS_truncate',
  'FS_ftruncate',
  'FS_utime',
  'FS_open',
  'FS_close',
  'FS_isClosed',
  'FS_llseek',
  'FS_read',
  'FS_write',
  'FS_mmap',
  'FS_msync',
  'FS_ioctl',
  'FS_writeFile',
  'FS_cwd',
  'FS_chdir',
  'FS_createDefaultDirectories',
  'FS_createDefaultDevices',
  'FS_createSpecialDirectories',
  'FS_createStandardStreams',
  'FS_staticInit',
  'FS_init',
  'FS_quit',
  'FS_findObject',
  'FS_analyzePath',
  'FS_createFile',
  'FS_createDataFile',
  'FS_forceLoadFile',
  'FS_createLazyFile',
  'FS_absolutePath',
  'FS_createFolder',
  'FS_createLink',
  'FS_joinPath',
  'FS_mmapAlloc',
  'FS_standardizePath',
  'MEMFS',
  'TTY',
  'PIPEFS',
  'SOCKFS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'GL',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'SDL',
  'SDL_gfx',
  'print',
  'printErr',
  'jstoi_s',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);

  // End runtime exports
  // Begin JS library exports
  // End JS library exports

// end include: postlibrary.js

function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}

// Imports from the Wasm binary.
var _naegeles_compute_edd = Module['_naegeles_compute_edd'] = makeInvalidEarlyAccess('_naegeles_compute_edd');
var _naegeles_compute_woa = Module['_naegeles_compute_woa'] = makeInvalidEarlyAccess('_naegeles_compute_woa');
var _naegeles_compute = Module['_naegeles_compute'] = makeInvalidEarlyAccess('_naegeles_compute');
var _naegeles_error_string = Module['_naegeles_error_string'] = makeInvalidEarlyAccess('_naegeles_error_string');
var _fflush = makeInvalidEarlyAccess('_fflush');
var _strerror = makeInvalidEarlyAccess('_strerror');
var _emscripten_stack_get_end = makeInvalidEarlyAccess('_emscripten_stack_get_end');
var _emscripten_stack_get_base = makeInvalidEarlyAccess('_emscripten_stack_get_base');
var _emscripten_stack_init = makeInvalidEarlyAccess('_emscripten_stack_init');
var _emscripten_stack_get_free = makeInvalidEarlyAccess('_emscripten_stack_get_free');
var __emscripten_stack_restore = makeInvalidEarlyAccess('__emscripten_stack_restore');
var __emscripten_stack_alloc = makeInvalidEarlyAccess('__emscripten_stack_alloc');
var _emscripten_stack_get_current = makeInvalidEarlyAccess('_emscripten_stack_get_current');
var memory = makeInvalidEarlyAccess('memory');
var __indirect_function_table = makeInvalidEarlyAccess('__indirect_function_table');
var wasmMemory = makeInvalidEarlyAccess('wasmMemory');

function assignWasmExports(wasmExports) {
  assert(wasmExports['naegeles_compute_edd'], 'missing Wasm export: naegeles_compute_edd');
  _naegeles_compute_edd = Module['_naegeles_compute_edd'] = createExportWrapper('naegeles_compute_edd', 3);
  assert(wasmExports['naegeles_compute_woa'], 'missing Wasm export: naegeles_compute_woa');
  _naegeles_compute_woa = Module['_naegeles_compute_woa'] = createExportWrapper('naegeles_compute_woa', 3);
  assert(wasmExports['naegeles_compute'], 'missing Wasm export: naegeles_compute');
  _naegeles_compute = Module['_naegeles_compute'] = createExportWrapper('naegeles_compute', 5);
  assert(wasmExports['naegeles_error_string'], 'missing Wasm export: naegeles_error_string');
  _naegeles_error_string = Module['_naegeles_error_string'] = createExportWrapper('naegeles_error_string', 1);
  assert(wasmExports['fflush'], 'missing Wasm export: fflush');
  _fflush = createExportWrapper('fflush', 1);
  assert(wasmExports['strerror'], 'missing Wasm export: strerror');
  _strerror = createExportWrapper('strerror', 1);
  assert(wasmExports['emscripten_stack_get_end'], 'missing Wasm export: emscripten_stack_get_end');
  _emscripten_stack_get_end = wasmExports['emscripten_stack_get_end'];
  assert(wasmExports['emscripten_stack_get_base'], 'missing Wasm export: emscripten_stack_get_base');
  _emscripten_stack_get_base = wasmExports['emscripten_stack_get_base'];
  assert(wasmExports['emscripten_stack_init'], 'missing Wasm export: emscripten_stack_init');
  _emscripten_stack_init = wasmExports['emscripten_stack_init'];
  assert(wasmExports['emscripten_stack_get_free'], 'missing Wasm export: emscripten_stack_get_free');
  _emscripten_stack_get_free = wasmExports['emscripten_stack_get_free'];
  assert(wasmExports['_emscripten_stack_restore'], 'missing Wasm export: _emscripten_stack_restore');
  __emscripten_stack_restore = wasmExports['_emscripten_stack_restore'];
  assert(wasmExports['_emscripten_stack_alloc'], 'missing Wasm export: _emscripten_stack_alloc');
  __emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'];
  assert(wasmExports['emscripten_stack_get_current'], 'missing Wasm export: emscripten_stack_get_current');
  _emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'];
  assert(wasmExports['memory'], 'missing Wasm export: memory');
  memory = wasmMemory = wasmExports['memory'];
  assert(wasmExports['__indirect_function_table'], 'missing Wasm export: __indirect_function_table');
  __indirect_function_table = wasmExports['__indirect_function_table'];
}

var wasmImports = {
  /** @export */
  _abort_js: __abort_js,
  /** @export */
  _mktime_js: __mktime_js,
  /** @export */
  _tzset_js: __tzset_js,
  /** @export */
  emscripten_date_now: _emscripten_date_now,
  /** @export */
  emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */
  fd_close: _fd_close,
  /** @export */
  fd_seek: _fd_seek,
  /** @export */
  fd_write: _fd_write
};


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

var calledRun;

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run() {

  stackCheckInit();

  preRun();

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    assert(!calledRun);
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    readyPromiseResolve?.(Module);
    Module['onRuntimeInitialized']?.();
    consumedModuleProp('onRuntimeInitialized');

    assert(!Module['_main'], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(() => {
      setTimeout(() => Module['setStatus'](''), 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    flush_NO_FILESYSTEM();
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
    warnOnce('(this may also be due to not including full filesystem support - try building with -sFORCE_FILESYSTEM)');
  }
}

var wasmExports;

// In modularize mode the generated code is within a factory function so we
// can use await here (since it's not top-level-await).
wasmExports = await (createWasm());

run();

// end include: postamble.js

// include: postamble_modularize.js
// In MODULARIZE mode we wrap the generated code in a factory function
// and return either the Module itself, or a promise of the module.
//
// We assign to the `moduleRtn` global here and configure closure to see
// this as and extern so it won't get minified.

if (runtimeInitialized)  {
  moduleRtn = Module;
} else {
  // Set up the promise that indicates the Module is initialized
  moduleRtn = new Promise((resolve, reject) => {
    readyPromiseResolve = resolve;
    readyPromiseReject = reject;
  });
}

// Assertion for attempting to access module properties on the incoming
// moduleArg.  In the past we used this object as the prototype of the module
// and assigned properties to it, but now we return a distinct object.  This
// keeps the instance private until it is ready (i.e the promise has been
// resolved).
for (const prop of Object.keys(Module)) {
  if (!(prop in moduleArg)) {
    Object.defineProperty(moduleArg, prop, {
      configurable: true,
      get() {
        abort(`Access to module property ('${prop}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`)
      }
    });
  }
}
// end include: postamble_modularize.js



    return moduleRtn;
  };
})();

// Export using a UMD style export, or ES6 exports if selected
if (typeof exports === 'object' && typeof module === 'object') {
  module.exports = createNaegelesModule;
  // This default export looks redundant, but it allows TS to import this
  // commonjs style module.
  module.exports.default = createNaegelesModule;
} else if (typeof define === 'function' && define['amd'])
  define([], () => createNaegelesModule);

