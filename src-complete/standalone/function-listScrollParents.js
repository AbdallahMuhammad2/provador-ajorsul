/* Standalone Function: listScrollParents */

function listScrollParents(d, o) {
    var c;
    o === void 0 && (o = []);
    var h = getScrollParent(d)
      , _ = h === ((c = d.ownerDocument) == null ? void 0 : c.body)
      , b = getWindow(h)
      , _e = _ ? [b].concat(b.visualViewport || [], isScrollParent(h) ? h : []) : h
      , nt = o.concat(_e);
    return _ ? nt : nt.concat(listScrollParents(getParentNode(_e)))
}

export default listScrollParents;
