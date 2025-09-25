/* Standalone Class: GLTFLightsExtension */

class GLTFLightsExtension {
    constructor(o) {
        this.parser = o,
        this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL,
        this.cache = {
            refs: {},
            uses: {}
        }
    }
    _markDefs() {
        const o = this.parser
          , c = this.parser.json.nodes || [];
        for (let h = 0, _ = c.length; h < _; h++) {
            const b = c[h];
            b.extensions && b.extensions[this.name] && b.extensions[this.name].light !== void 0 && o._addNodeRef(this.cache, b.extensions[this.name].light)
        }
    }
    _loadLight(o) {
        const c = this.parser
          , h = "light:" + o;
        let _ = c.cache.get(h);
        if (_)
            return _;
        const b = c.json
          , _e = ((b.extensions && b.extensions[this.name] || {}).lights || [])[o];
        let nt;
        const it = new three_module.Q1f(16777215);
        _e.color !== void 0 && it.setRGB(_e.color[0], _e.color[1], _e.color[2], three_module.Zr2);
        const at = _e.range !== void 0 ? _e.range : 0;
        switch (_e.type) {
        case "directional":
            nt = new GLTFLoader.ObjectConstructors.DirectionalLight(it),
            nt.target.position.set(0, 0, -1),
            nt.add(nt.target);
            break;
        case "point":
            nt = new GLTFLoader.ObjectConstructors.PointLight(it),
            nt.distance = at;
            break;
        case "spot":
            nt = new GLTFLoader.ObjectConstructors.SpotLight(it),
            nt.distance = at,
            _e.spot = _e.spot || {},
            _e.spot.innerConeAngle = _e.spot.innerConeAngle !== void 0 ? _e.spot.innerConeAngle : 0,
            _e.spot.outerConeAngle = _e.spot.outerConeAngle !== void 0 ? _e.spot.outerConeAngle : Math.PI / 4,
            nt.angle = _e.spot.outerConeAngle,
            nt.penumbra = 1 - _e.spot.innerConeAngle / _e.spot.outerConeAngle,
            nt.target.position.set(0, 0, -1),
            nt.add(nt.target);
            break;
        default:
            throw new Error("THREE.GLTFLoader: Unexpected light type: " + _e.type)
        }
        return nt.position.set(0, 0, 0),
        nt.decay = 2,
        assignExtrasToUserData(nt, _e),
        _e.intensity !== void 0 && (nt.intensity = _e.intensity),
        nt.name = c.createUniqueName(_e.name || "light_" + o),
        _ = Promise.resolve(nt),
        c.cache.add(h, _),
        _
    }
    getDependency(o, c) {
        if (o === "light")
            return this._loadLight(c)
    }
    createNodeAttachment(o) {
        const c = this
          , h = this.parser
          , _ = h.json.nodes[o]
          , b = (_.extensions && _.extensions[this.name] || {}).light;
        return b === void 0 ? null : this._loadLight(b).then(function(_e) {
            return h._getNodeRef(c.cache, b, _e)
        })
    }
}

export default GLTFLightsExtension;
