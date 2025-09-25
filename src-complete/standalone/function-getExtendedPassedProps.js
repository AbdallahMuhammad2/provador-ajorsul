/* Standalone Function: getExtendedPassedProps */

function getExtendedPassedProps(d) {
    var o = (d.plugins || []).reduce(function(c, h) {
        var _, b = h.name, _e = h.defaultValue;
        return b && (c[b] = d[b] !== void 0 ? d[b] : (_ = defaultProps$1[b]) != null ? _ : _e),
        c
    }, {});
    return Object.assign({}, d, o)
}

export default getExtendedPassedProps;
