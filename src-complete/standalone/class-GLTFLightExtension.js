/* Standalone Class: GLTFLightExtension */

class GLTFLightExtension {
    constructor(o) {
        this.writer = o,
        this.name = "KHR_lights_punctual"
    }
    writeNode(o, c) {
        if (!o.isLight)
            return;
        if (!o.isDirectionalLight && !o.isPointLight && !o.isSpotLight)
            return void console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.", o);
        const h = this.writer
          , _ = h.json
          , b = h.extensionsUsed
          , _e = {};
        o.name && (_e.name = o.name),
        _e.color = o.color.toArray(),
        _e.intensity = o.intensity,
        o.isDirectionalLight ? _e.type = "directional" : o.isPointLight ? (_e.type = "point",
        o.distance > 0 && (_e.range = o.distance)) : o.isSpotLight && (_e.type = "spot",
        o.distance > 0 && (_e.range = o.distance),
        _e.spot = {},
        _e.spot.innerConeAngle = (1 - o.penumbra) * o.angle,
        _e.spot.outerConeAngle = o.angle),
        o.decay !== void 0 && o.decay !== 2 && console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),
        !o.target || o.target.parent === o && o.target.position.x === 0 && o.target.position.y === 0 && o.target.position.z === -1 || console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),
        b[this.name] || (_.extensions = _.extensions || {},
        _.extensions[this.name] = {
            lights: []
        },
        b[this.name] = !0);
        const nt = _.extensions[this.name].lights;
        nt.push(_e),
        c.extensions = c.extensions || {},
        c.extensions[this.name] = {
            light: nt.length - 1
        }
    }
}

export default GLTFLightExtension;
