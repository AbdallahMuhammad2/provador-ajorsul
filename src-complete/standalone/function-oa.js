/* Standalone Function: Oa */

function Oa(d, o) {
    if (!d || Na)
        return "";
    Na = !0;
    var c = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (o)
            if (o = function() {
                throw Error()
            }
            ,
            Object.defineProperty(o.prototype, "props", {
                set: function() {
                    throw Error()
                }
            }),
            typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(o, [])
                } catch (at) {
                    var h = at
                }
                Reflect.construct(d, [], o)
            } else {
                try {
                    o.call()
                } catch (at) {
                    h = at
                }
                d.call(o.prototype)
            }
        else {
            try {
                throw Error()
            } catch (at) {
                h = at
            }
            d()
        }
    } catch (at) {
        if (at && h && typeof at.stack == "string") {
            for (var _ = at.stack.split(`
`), b = h.stack.split(`
`), _e = _.length - 1, nt = b.length - 1; 1 <= _e && 0 <= nt && _[_e] !== b[nt]; )
                nt--;
            for (; 1 <= _e && 0 <= nt; _e--,
            nt--)
                if (_[_e] !== b[nt]) {
                    if (_e !== 1 || nt !== 1)
                        do
                            if (_e--,
                            nt--,
                            0 > nt || _[_e] !== b[nt]) {
                                var it = `
` + _[_e].replace(" at new ", " at ");
                                return d.displayName && it.includes("<anonymous>") && (it = it.replace("<anonymous>", d.displayName)),
                                it
                            }
                        while (1 <= _e && 0 <= nt);
                    break
                }
        }
    } finally {
        Na = !1,
        Error.prepareStackTrace = c
    }
    return (d = d ? d.displayName || d.name : "") ? Ma(d) : ""
}

export default Oa;
