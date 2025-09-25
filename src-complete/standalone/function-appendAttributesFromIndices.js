/* Standalone Function: appendAttributesFromIndices */

function appendAttributesFromIndices(d, o, c, h, _, b, _e, nt=!1) {
    appendAttributeFromIndex(d, h, _, b, _e, nt),
    appendAttributeFromIndex(nt ? c : o, h, _, b, _e, nt),
    appendAttributeFromIndex(nt ? o : c, h, _, b, _e, nt)
}

export default appendAttributesFromIndices;
