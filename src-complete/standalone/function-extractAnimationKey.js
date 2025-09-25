/* Standalone Function: extractAnimationKey */

function extractAnimationKey(d, o, c) {
    var h, _;
    let b = Array.from(((h = d.access) !== null && h !== void 0 ? h : "").split("."))
      , _e = (_ = d.targetObject) !== null && _ !== void 0 ? _ : o;
    const nt = b.pop();
    if (!nt || nt.length === 0)
        return {
            key: void 0,
            tar: _e
        };
    if ((c = c ?? (o == null ? void 0 : o._animGetters)) && b[0]in c) {
        const it = c[b[0]](b);
        it ? (_e = it.tar,
        b = b.slice(it.i + 1)) : _e = it
    }
    return _e = deepAccessObject(b, _e),
    _e && !(nt in _e) ? (console.error("invalid key", nt, _e, o, d),
    {
        key: void 0,
        tar: _e
    }) : {
        key: nt,
        tar: _e
    }
}

export default extractAnimationKey;
