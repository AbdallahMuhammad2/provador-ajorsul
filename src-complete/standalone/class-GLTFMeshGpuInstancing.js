/* Standalone Class: GLTFMeshGpuInstancing */

class GLTFMeshGpuInstancing {
    constructor(o) {
        this.name = EXTENSIONS.EXT_MESH_GPU_INSTANCING,
        this.parser = o
    }
    createNodeMesh(o) {
        const c = this.parser.json
          , h = c.nodes[o];
        if (!h.extensions || !h.extensions[this.name] || h.mesh === void 0)
            return null;
        const _ = c.meshes[h.mesh];
        for (const it of _.primitives)
            if (it.mode !== WEBGL_CONSTANTS.TRIANGLES && it.mode !== WEBGL_CONSTANTS.TRIANGLE_STRIP && it.mode !== WEBGL_CONSTANTS.TRIANGLE_FAN && it.mode !== void 0)
                return null;
        const b = h.extensions[this.name].attributes
          , _e = []
          , nt = {};
        for (const it in b)
            _e.push(this.parser.getDependency("accessor", b[it]).then(at => (nt[it] = at,
            nt[it])));
        return _e.length < 1 ? null : (_e.push(this.parser.createNodeMesh(o)),
        Promise.all(_e).then(it => {
            const at = it.pop()
              , ut = at.isGroup ? at.children : [at]
              , pt = it[0].count
              , ht = [];
            for (const _t of ut) {
                const vt = new three_module.kn4
                  , bt = new three_module.Pq0
                  , St = new three_module.PTz
                  , At = new three_module.Pq0(1,1,1)
                  , Et = new three_module.ZLX(_t.geometry,_t.material,pt);
                for (let Pt = 0; Pt < pt; Pt++)
                    nt.TRANSLATION && bt.fromBufferAttribute(nt.TRANSLATION, Pt),
                    nt.ROTATION && St.fromBufferAttribute(nt.ROTATION, Pt),
                    nt.SCALE && At.fromBufferAttribute(nt.SCALE, Pt),
                    Et.setMatrixAt(Pt, vt.compose(bt, St, At));
                Et.sourceTrs = nt;
                for (const Pt in nt)
                    Pt !== "TRANSLATION" && Pt !== "ROTATION" && Pt !== "SCALE" && _t.geometry.setAttribute(Pt, nt[Pt]);
                three_module.B69.prototype.copy.call(Et, _t),
                this.parser.assignFinalMaterial(Et),
                ht.push(Et)
            }
            return at.isGroup ? (at.clear(),
            at.add(...ht),
            at) : ht[0]
        }
        ))
    }
}

export default GLTFMeshGpuInstancing;
