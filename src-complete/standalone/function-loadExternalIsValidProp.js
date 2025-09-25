/* Standalone Function: loadExternalIsValidProp */

function loadExternalIsValidProp(d) {
    d && (shouldForward = o => o.startsWith("on") ? !isValidMotionProp(o) : d(o))
}

export default loadExternalIsValidProp;
