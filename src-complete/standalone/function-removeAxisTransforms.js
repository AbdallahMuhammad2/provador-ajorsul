/* Standalone Function: removeAxisTransforms */

function removeAxisTransforms(d, o, [c,h,_], b, _e) {
    removeAxisDelta(d, o[c], o[h], o[_], o.scale, b, _e)
}

export default removeAxisTransforms;
