/* Standalone Function: deserializeObject */

function deserializeObject(d, o, c, h={}) {
    var _, b, _e;
    let nt = o;
    if (d === void 0)
        return nt;
    if (typeof o == "number") {
        if (d === "Infinity")
            return 1 / 0;
        if (d === "-Infinity")
            return -1 / 0;
        if (d === "NaN")
            return NaN;
        if (typeof d == "number" || !d)
            return d
    }
    if (Array.isArray(d)) {
        const ut = d.length;
        Array.isArray(nt) || (nt = []);
        for (let pt = 0; pt < ut; pt++) {
            const ht = d[pt]
              , _t = nt.length > pt ? deserializeObject(ht, nt[pt], !1, h) : deserializeObject(ht, void 0, !1, h);
            nt.length <= pt ? nt.push(_t) : nt[pt] = _t
        }
        return nt
    }
    let it = !1;
    if (d && d.resource && typeof d.resource == "string" && (d = (_ = h[d.resource]) === null || _ === void 0 ? void 0 : _[d.uuid],
    it = !0),
    !nt && d && !it)
        if (d.serializableClassId) {
            const ut = serializableClasses.get(d.serializableClassId);
            ut && (nt = ut.DataInConstructor ? new ut(d) : new ut)
        } else
            typeof d != "object" || d.constructor && d.constructor !== Object || (nt = {});
    if (typeof nt == "function")
        return console.error("cannot deserialize over function", nt, d),
        nt;
    if (d && typeof d == "object" && !it) {
        if (d.isVector2)
            return deserializers.vec2(d, nt);
        if (d.isVector3)
            return deserializers.vec3(d, nt);
        if (d.isVector4)
            return deserializers.vec4(d, nt);
        if (d.isColor)
            return deserializers.color(d, nt);
        if (d.isQuaternion)
            return deserializers.quat(d, nt)
    }
    if (d == null || nt == null || typeof nt != "object" || nt.isTexture)
        return it && (d ? d.__useCount = d.__useCount ? d.__useCount + 1 : 1 : console.warn("probable error deserialize: resource not found.")),
        d;
    let at = (b = nt.constructor) !== null && b !== void 0 ? b : Object;
    if (at === Object)
        return deserializers.obj(d, nt, h);
    if (!c && typeof nt.fromJSON == "function")
        return nt.isMaterial && (Object.entries(d).forEach( ([ut,pt]) => {
            var ht;
            if (!pt || !pt.resource || typeof pt.resource != "string")
                return;
            const _t = (ht = h[pt.resource]) === null || ht === void 0 ? void 0 : ht[pt.uuid];
            d[ut] = _t || null
        }
        ),
        d.userData && (d.userData = deserializeObject(d.userData, void 0, !1, h))),
        nt.fromJSON(d, h),
        nt;
    for (; at && at !== Object; )
        (_e = typeMap.get(at)) === null || _e === void 0 || _e.forEach( ([ut,pt]) => {
            const ht = nt[pt]
              , _t = deserializeObject(d[ut], ht, !1, h);
            _t !== ht && S$2(nt, pt, _t, !0)
        }
        ),
        at = Object.getPrototypeOf(at);
    return nt
}

export default deserializeObject;
