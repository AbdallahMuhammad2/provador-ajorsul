/* Standalone Function: evaluateProps */

function evaluateProps(d, o) {
    var c = Object.assign({}, o, {
        content: invokeWithArgsOrReturn(o.content, [d])
    }, o.ignoreAttributes ? {} : getDataAttributeProps(d, o.plugins));
    return c.aria = Object.assign({}, defaultProps$1.aria, c.aria),
    c.aria = {
        expanded: c.aria.expanded === "auto" ? o.interactive : c.aria.expanded,
        content: c.aria.content === "auto" ? o.interactive ? null : "describedby" : c.aria.content
    },
    c
}

export default evaluateProps;
