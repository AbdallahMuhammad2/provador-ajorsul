/* Standalone Function: applyStyles_effect */

function applyStyles_effect(d) {
    var o = d.state
      , c = {
        popper: {
            position: o.options.strategy,
            left: "0",
            top: "0",
            margin: "0"
        },
        arrow: {
            position: "absolute"
        },
        reference: {}
    };
    return Object.assign(o.elements.popper.style, c.popper),
    o.styles = c,
    o.elements.arrow && Object.assign(o.elements.arrow.style, c.arrow),
    function() {
        Object.keys(o.elements).forEach(function(h) {
            var _ = o.elements[h]
              , b = o.attributes[h] || {}
              , _e = Object.keys(o.styles.hasOwnProperty(h) ? o.styles[h] : c[h]).reduce(function(nt, it) {
                return nt[it] = "",
                nt
            }, {});
            isHTMLElement(_) && getNodeName(_) && (Object.assign(_.style, _e),
            Object.keys(b).forEach(function(nt) {
                _.removeAttribute(nt)
            }))
        })
    }
}

export default applyStyles_effect;
