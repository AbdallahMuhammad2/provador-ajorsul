/* Standalone Function: sb */

function sb(d, o) {
    d = d.style;
    for (var c in o)
        if (o.hasOwnProperty(c)) {
            var h = c.indexOf("--") === 0
              , _ = rb(c, o[c], h);
            c === "float" && (c = "cssFloat"),
            h ? d.setProperty(c, _) : d[c] = _
        }
}

export default sb;
