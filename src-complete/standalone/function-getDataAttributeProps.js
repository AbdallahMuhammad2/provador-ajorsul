/* Standalone Function: getDataAttributeProps */

function getDataAttributeProps(d, o) {
    return (o ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps$1, {
        plugins: o
    }))) : defaultKeys).reduce(function(c, h) {
        var _ = (d.getAttribute("data-tippy-" + h) || "").trim();
        if (!_)
            return c;
        if (h === "content")
            c[h] = _;
        else
            try {
                c[h] = JSON.parse(_)
            } catch {
                c[h] = _
            }
        return c
    }, {})
}

export default getDataAttributeProps;
