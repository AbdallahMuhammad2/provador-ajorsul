/* Standalone Function: build_A */

function build_A(d) {
    for (const [o,c] of build_h)
        if (c.canHandle(d)) {
            const [h,_] = c.serialize(d);
            return [{
                type: "HANDLER",
                name: o,
                value: h
            }, _]
        }
    return [{
        type: "RAW",
        value: d
    }, build_E.get(d) || []]
}

export default build_A;
