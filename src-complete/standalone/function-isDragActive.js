/* Standalone Function: isDragActive */

function isDragActive() {
    const d = getGlobalLock(!0);
    return d ? (d(),
    !1) : !0
}

export default isDragActive;
