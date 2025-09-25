/* Standalone Function: tippy */

function tippy(d, o) {
    o === void 0 && (o = {});
    var c = defaultProps$1.plugins.concat(o.plugins || []);
    bindGlobalEventListeners();
    var h = Object.assign({}, o, {
        plugins: c
    })
      , _ = getArrayOfElements(d).reduce(function(b, _e) {
        var nt = _e && createTippy(_e, h);
        return nt && b.push(nt),
        b
    }, []);
    return tippy_esm_isElement(d) ? _[0] : _
}

export default tippy;
