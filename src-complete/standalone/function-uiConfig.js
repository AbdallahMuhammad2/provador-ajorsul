/* Standalone Function: uiConfig */

function uiConfig(d, o) {
    return (c, h) => {
        const _ = c.constructor;
        if (_ === Object)
            throw new Error("All properties in an object are serialized by default");
        uiConfigDecorators_typeMap.has(_) || uiConfigDecorators_typeMap.set(_, []);
        const b = uiConfigDecorators_typeMap.get(_);
        if (!(b.findIndex(_e => _e.propKey === h) < 0))
            throw new Error(`Property ${h} already has a uiConfig decorator`);
        b.push({
            params: o || {},
            propKey: h,
            uiType: d
        })
    }
}

export default uiConfig;
