/* Standalone Function: isFallbackBuffer */

function isFallbackBuffer(d) {
    return !(!d.extensions || !d.extensions[EXT_MESHOPT_COMPRESSION]) && !!d.extensions[EXT_MESHOPT_COMPRESSION].fallback
}

export default isFallbackBuffer;
