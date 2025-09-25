/* Standalone Constant: serializers */

const serializers = {
    obj: (d, o) => Object.fromEntries(Object.entries(d).map( ([c,h]) => [c, serializeObject(h, !1, o)])),
    vec4: d => ({
        x: d.x,
        y: d.y,
        z: d.z,
        w: d.w,
        isVector4: !0
    }),
    vec3: d => ({
        x: d.x,
        y: d.y,
        z: d.z,
        isVector3: !0
    }),
    vec2: d => ({
        x: d.x,
        y: d.y,
        isVector2: !0
    }),
    color: d => ({
        r: d.r,
        g: d.g,
        b: d.b,
        isColor: !0
    }),
    quat: d => ({
        x: d.x,
        y: d.y,
        z: d.z,
        w: d.w,
        isQuaternion: !0
    }),
    texture: (d, o) => {
        var c;
        if (!(d != null && d.isTexture))
            throw new Error("Expected a texture");
        if (o != null && o.textures[d.uuid])
            return {
                uuid: d.uuid,
                resource: "textures"
            };

export default serializers;
