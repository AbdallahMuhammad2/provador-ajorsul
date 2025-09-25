/* Standalone Class: MaterialPreviewGenerator */

class MaterialPreviewGenerator {
    constructor(o) {
        this.viewer = o,
        this._lights = [],
        this.shapes = {
            sphere: new three_module.eaF(new three_module.Gu$(1)),
            cube: new three_module.eaF(new three_module.iNn(1,1,1)),
            cylinder: new three_module.eaF(new three_module.Ho_(.5,.5,1))
        };
        const c = new three_module.Z58;
        this._channel = 7;
        const h = new three_module.dth(16777215,4473924,1);
        h.position.set(0, 10, 0),
        h.layers.set(this._channel),
        c.add(h),
        this._lights.push(h),
        this._scene = c
    }
    dispose() {
        [...this._lights].forEach(o => o.dispose()),
        Object.values(this.shapes).forEach(o => {
            o.geometry && o.geometry.dispose()
        }
        )
    }
    generate(o, c="sphere") {
        const h = this.shapes[c] || new three_module.eaF(new three_module.Gu$(1));
        h.material = o.materialObject,
        h.geometry.attributes.tangent || h.geometry.computeTangents(),
        this._scene.add(h),
        this._scene.environment = this.viewer.scene.environment;
        const _ = h.material.envMapIntensity;
        typeof _ == "number" && (h.material.envMapIntensity = Math.max(_, 2));
        const b = snapObject(this.viewer, h, this._scene, this._channel, new three_module.Pq0(0,0,1.5));
        return typeof _ == "number" && (h.material.envMapIntensity = _),
        this._scene.remove(h),
        h.material = void 0,
        b
    }
}

export default MaterialPreviewGenerator;
