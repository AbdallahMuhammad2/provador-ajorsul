/* Standalone Function: getOwnerDocument */

function getOwnerDocument(d) {
    var o, c = normalizeToArray(d)[0];
    return c != null && (o = c.ownerDocument) != null && o.body ? c.ownerDocument : document
}

export default getOwnerDocument;
