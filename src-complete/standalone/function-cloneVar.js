/* Standalone Function: cloneVar */

function cloneVar(d) {
    return typeof d == "object" && d ? Array.isArray(d) ? [...d] : d.isObject3D || d.isMaterial ? d : typeof d.clone == "function" ? d.clone() : d : d
}

export default cloneVar;
