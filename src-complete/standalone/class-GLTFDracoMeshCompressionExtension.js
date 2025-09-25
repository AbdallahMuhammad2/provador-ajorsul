/* Standalone Class: GLTFDracoMeshCompressionExtension */

class GLTFDracoMeshCompressionExtension {
    constructor(o, c) {
        if (!c)
            throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
        this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION,
        this.json = o,
        this.dracoLoader = c,
        this.dracoLoader.preload()
    }
    decodePrimitive(o, c) {
        const h = this.json
          , _ = this.dracoLoader
          , b = o.extensions[this.name].bufferView
          , _e = o.extensions[this.name].attributes
          , nt = {}
          , it = {}
          , at = {};
        for (const ut in _e) {
            const pt = ATTRIBUTES[ut] || ut.toLowerCase();
            nt[pt] = _e[ut]
        }
        for (const ut in o.attributes) {
            const pt = ATTRIBUTES[ut] || ut.toLowerCase();
            if (_e[ut] !== void 0) {
                const ht = h.accessors[o.attributes[ut]]
                  , _t = WEBGL_COMPONENT_TYPES[ht.componentType];
                at[pt] = _t.name,
                it[pt] = ht.normalized === !0
            }
        }
        return c.getDependency("bufferView", b).then(function(ut) {
            return new Promise(function(pt) {
                _.decodeDracoFile(ut, function(ht) {
                    for (const _t in ht.attributes) {
                        const vt = ht.attributes[_t]
                          , bt = it[_t];
                        bt !== void 0 && (vt.normalized = bt)
                    }
                    pt(ht)
                }, nt, at)
            }
            )
        })
    }
}

export default GLTFDracoMeshCompressionExtension;
