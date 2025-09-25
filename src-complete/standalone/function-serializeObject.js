/* Standalone Function: serializeObject */

function serializeObject(d, o, c) {
    var h, _;
    if (typeof d == "function")
        return;
    if (Array.isArray(d))
        return d.map(nt => serializeObject(nt, !1, c));
    if (typeof d != "object") {
        if (typeof d == "number") {
            if (d === 1 / 0)
                return "Infinity";
            if (d === -1 / 0)
                return "-Infinity";
            if (isNaN(d))
                return "NaN"
        }
        return d
    }
    if (!d)
        return d;
    let b = (h = d.constructor) !== null && h !== void 0 ? h : Object;
    if (b === Object)
        return serializers.obj(d, c);
    if (d.isVector2)
        return serializers.vec2(d);
    if (d.isVector3)
        return serializers.vec3(d);
    if (d.isVector4)
        return serializers.vec4(d);
    if (d.isColor)
        return serializers.color(d);
    if (d.isQuaternion)
        return serializers.quat(d);
    if (d.isTexture)
        return serializers.texture(d, c);
    if (d.isMaterial)
        return serializers.material(d, c);
    if (!o && typeof d.toJSON == "function") {
        const nt = d.toJSON(c);
        return d.serializableClassId && nt && (nt.serializableClassId = d.serializableClassId),
        nt
    }
    const _e = {};
    for (; b && b !== Object; )
        (_ = typeMap.get(b)) === null || _ === void 0 || _.forEach( ([nt,it]) => {
            const at = d[it];
            _e[nt] = serializeObject(at, !1, c)
        }
        ),
        b = Object.getPrototypeOf(b);
    return d.serializableClassId && (_e.serializableClassId = d.serializableClassId),
    _e
}

export default serializeObject;
