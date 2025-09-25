/* Standalone Class: AGeometryGenerator */

class AGeometryGenerator {
    constructor(o) {
        this.type = o
    }
    createUiConfig(o) {
        const c = generateUiConfig(o.userData.generationParams).filter(h => {
            var _;
            return ((_ = Ee$1(h.property)) === null || _ === void 0 ? void 0 : _[1]) !== "type"
        }
        );
        return c.forEach(h => {
            h.onChange = () => this.generate(o)
        }
        ),
        c
    }
    generate(o, c={}) {
        const h = o ?? new three_module.LoY;
        if (h.userData.generationParams || (h.userData.generationParams = {
            type: this.type
        }),
        h.userData.generationParams.type = this.type,
        c.type)
            return console.error("Cannot set type parameter here, use the plugin instead"),
            h;
        const _ = {
            ...this.defaultParams,
            ...h.userData.generationParams,
            ...c
        }
          , {indices: b, vertices: _e, normals: nt, uvs: it, groups: at} = this._generateData(_);
        if (updateIndices(h, b),
        updateAttribute(h, "position", 3, _e),
        updateAttribute(h, "normal", 3, nt),
        updateAttribute(h, "uv", 2, it),
        at) {
            h.clearGroups();
            for (const ut of at)
                h.addGroup(ut.start, ut.count, ut.materialIndex)
        }
        return h.computeBoundingBox(),
        h.computeBoundingSphere(),
        Object.assign(h.userData.generationParams, _),
        updateUi(h, () => this.createUiConfig(h)),
        h.dispatchEvent({
            type: "geometryUpdate"
        }),
        h
    }
}

export default AGeometryGenerator;
