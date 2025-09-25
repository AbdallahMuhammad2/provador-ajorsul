/* Standalone Function: Ki */

function Ki(d, o, c) {
    return {
        value: d,
        source: null,
        stack: c ?? null,
        digest: o ?? null
    }
}

export default Ki;
