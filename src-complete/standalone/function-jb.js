/* Standalone Function: jb */

function jb(d) {
    var o = d.textContent;
    o === d._wrapperState.initialValue && o !== "" && o !== null && (d.value = o)
}

export default jb;
