/* Standalone Function: detectMixerFactory */

function detectMixerFactory(d) {
    return typeof d == "number" ? mixNumber$2 : typeof d == "string" ? color$1.test(d) ? mixColor$1 : mixComplex$1 : Array.isArray(d) ? mixArray$1 : typeof d == "object" ? mixObject$1 : void 0
}

export default detectMixerFactory;
