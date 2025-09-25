/* Standalone Function: generateUiConfig */

function generateUiConfig(d) {
    let o = d == null ? void 0 : d.constructor;
    if (!d || !o)
        return [];
    const c = []
      , h = [];
    for (; o && o !== Object; )
        h.push(o),
        o = Object.getPrototypeOf(o);
    if (!h.length || Array.isArray(d)) {
        const _ = typeof d == "object" ? Object.keys(d) : Array.isArray(d) ? d.map( (b, _e) => _e) : [];
        for (const b of _) {
            const _e = d[b];
            if (_e == null)
                continue;
            const nt = _e == null ? void 0 : _e.uiConfig;
            if (nt)
                c.push(nt);
            else {
                const it = valueToUiType(_e);
                it === "folder" ? c.push(generateUiFolder(b + "", _e, void 0, "folder", !0)) : it && c.push({
                    type: it,
                    label: b + "",
                    property: [d, b]
                })
            }
        }
    }
    return h.reverse().forEach(_ => {
        var b;
        (b = uiConfigDecorators_typeMap.get(_)) === null || b === void 0 || b.forEach( ({params: _e, propKey: nt, uiType: it}) => {
            let at;
            if (!it) {
                const ut = d[nt];
                at = ut == null ? void 0 : ut.uiConfig,
                at ? c.push(at) : ut != null && ((it = valueToUiType(ut)) === "folder" ? at = generateUiFolder(nt + "", ut, void 0, "folder", !0) : it && (at = {
                    type: it,
                    label: nt + "",
                    property: [d, nt]
                }))
            }
            if (at || (at = {
                property: [d, nt],
                type: it || "input"
            }),
            _e) {
                const ut = typeof _e.params == "function" ? _e.params(d) : _e.params || {};
                delete _e.params,
                Object.assign(at, {
                    ..._e,
                    ...ut
                })
            }
            c.push(at)
        }
        )
    }
    ),
    c
}

export default generateUiConfig;
