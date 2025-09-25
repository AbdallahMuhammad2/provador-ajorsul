/* Standalone Class: GeometryGeneratorPlugin */

class GeometryGeneratorPlugin extends AViewerPlugin {
    constructor() {
        super(...arguments),
        this.enabled = !0,
        this.toJSON = void 0,
        this.generators = {
            plane: new PlaneGeometryGenerator("plane"),
            sphere: new SphereGeometryGenerator("sphere"),
            box: new BoxGeometryGenerator("box"),
            circle: new CircleGeometryGenerator("circle"),
            torus: new TorusGeometryGenerator("torus"),
            cylinder: new CylinderGeometryGenerator("cylinder")
        },
        this._sceneUpdate = o => {
            var c;
            if (o.hierarchyChanged) {
                const h = o.object || ((c = this._viewer) === null || c === void 0 ? void 0 : c.scene.modelRoot);
                h && h.traverse(_ => {
                    var b, _e, nt;
                    const it = (nt = (_e = (b = _.geometry) === null || b === void 0 ? void 0 : b.userData) === null || _e === void 0 ? void 0 : _e.generationParams) === null || nt === void 0 ? void 0 : nt.type;
                    it && updateUi(_.geometry, () => {
                        var at;
                        const ut = this.generators[it];
                        return ut != null && ut.createUiConfig && (at = ut.createUiConfig(_.geometry)) !== null && at !== void 0 ? at : []
                    }
                    )
                }
                )
            }
        }
        ,
        this.uiConfig = {
            type: "folder",
            label: "Generate Geometry",
            children: [ () => Object.keys(this.generators).map(o => ({
                type: "button",
                label: "Generate " + o,
                value: async () => {
                    (await this.generateObject(o)).name = o
                }
            }))]
        }
    }
    async generateObject(o) {
        var c, h;
        const _ = this.generators[o];
        if (!_)
            throw new Error("Unknown generator type: " + o);
        const b = await ((h = (c = this._viewer) === null || c === void 0 ? void 0 : c.getManager()) === null || h === void 0 ? void 0 : h.addImportedSingle(new three_module.eaF(new three_module.LoY,new MeshStandardMaterial2({
            color: 16711680
        })), {
            autoScale: !1,
            autoCenter: !1
        }));
        return _.generate(b.modelObject.geometry),
        b.name = o,
        b.geometry.name = "Generated " + o,
        b.modelObject
    }
    async onAdded(o) {
        await super.onAdded(o),
        o.scene.addEventListener("sceneUpdate", this._sceneUpdate)
    }
}

export default GeometryGeneratorPlugin;
