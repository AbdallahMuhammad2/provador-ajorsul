/* Standalone Function: generateVertices */

function generateVertices() {
    const d = []
      , o = []
      , c = {};
    function h(b, _e) {
        _(b),
        _(_e)
    }
    function _(b) {
        d.push(0, 0, 0),
        o.push(0, 0, 0),
        c[b] === void 0 && (c[b] = []),
        c[b].push(d.length / 3 - 1)
    }
    return h("n1", "n2"),
    h("n2", "n4"),
    h("n4", "n3"),
    h("n3", "n1"),
    h("f1", "f2"),
    h("f2", "f4"),
    h("f4", "f3"),
    h("f3", "f1"),
    h("n1", "f1"),
    h("n2", "f2"),
    h("n3", "f3"),
    h("n4", "f4"),
    h("p", "n1"),
    h("p", "n2"),
    h("p", "n3"),
    h("p", "n4"),
    h("u1", "u2"),
    h("u2", "u3"),
    h("u3", "u1"),
    h("c", "t"),
    h("p", "c"),
    h("cn1", "cn2"),
    h("cn3", "cn4"),
    h("cf1", "cf2"),
    h("cf3", "cf4"),
    {
        vertices: d,
        colors: o,
        pointMap: c
    }
}

export default generateVertices;
