/* Standalone Function: Qi */

function Qi(d, o, c) {
    c = mh(-1, c),
    c.tag = 3;
    var h = d.type.getDerivedStateFromError;
    if (typeof h == "function") {
        var _ = o.value;
        c.payload = function() {
            return h(_)
        }
        ,
        c.callback = function() {
            Li(d, o)
        }
    }
    var b = d.stateNode;
    return b !== null && typeof b.componentDidCatch == "function" && (c.callback = function() {
        Li(d, o),
        typeof h != "function" && (Ri === null ? Ri = new Set([this]) : Ri.add(this));
        var _e = o.stack;
        this.componentDidCatch(o.value, {
            componentStack: _e !== null ? _e : ""
        })
    }
    ),
    c
}

export default Qi;
