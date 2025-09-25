/* Standalone Class: GLTFMeshGpuInstancingExporter */

class GLTFMeshGpuInstancingExporter {
    constructor(o) {
        this.writer = o,
        this.name = "EXT_mesh_gpu_instancing"
    }
    writeNode(o, c) {
        if (!o.isInstancedMesh)
            return;
        const h = this.writer
          , _ = o;
        let b = _.sourceTrs;
        if (!b) {
            const _e = new Float32Array(3 * _.count)
              , nt = new Float32Array(4 * _.count)
              , it = new Float32Array(3 * _.count)
              , at = new three_module.kn4
              , ut = new three_module.Pq0
              , pt = new three_module.PTz
              , ht = new three_module.Pq0;
            for (let _t = 0; _t < _.count; _t++)
                _.getMatrixAt(_t, at),
                at.decompose(ut, pt, ht),
                ut.toArray(_e, 3 * _t),
                pt.toArray(nt, 4 * _t),
                ht.toArray(it, 3 * _t);
            b = {
                TRANSLATION: new three_module.THS(_e,3),
                ROTATION: new three_module.THS(nt,4),
                SCALE: new three_module.THS(it,3)
            }
        }
        b = {
            TRANSLATION: h.processAccessor(b.TRANSLATION),
            ROTATION: h.processAccessor(b.ROTATION),
            SCALE: h.processAccessor(b.SCALE)
        },
        _.instanceColor && (b._COLOR_0 = h.processAccessor(_.instanceColor)),
        h.extensionsUsed[this.name] = !0,
        h.extensionsRequired[this.name] = !0,
        c.extensions = c.extensions || {},
        c.extensions[this.name] = {
            attributes: b
        }
    }
}

export default GLTFMeshGpuInstancingExporter;
