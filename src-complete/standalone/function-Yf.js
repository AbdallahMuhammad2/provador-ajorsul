/* Standalone Function: Yf */

function Yf(d, o) {
    var c = d.type.contextTypes;
    if (!c)
        return Vf;
    var h = d.stateNode;
    if (h && h.__reactInternalMemoizedUnmaskedChildContext === o)
        return h.__reactInternalMemoizedMaskedChildContext;
    var _ = {}, b;
    for (b in c)
        _[b] = o[b];
    return h && (d = d.stateNode,
    d.__reactInternalMemoizedUnmaskedChildContext = o,
    d.__reactInternalMemoizedMaskedChildContext = _),
    _
}

export default Yf;
