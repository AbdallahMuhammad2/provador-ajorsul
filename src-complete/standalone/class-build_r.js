/* Standalone Class: build_r */

class build_r {
    constructor(o, c={
        resolution: 2048
    }, h={}, _=!1, b=!1, _e=!1) {
        this.THREE = o,
        this.packOptions = c,
        this.chartOptions = h,
        this.useNormals = _,
        this.timeUnwrap = b,
        this.logProgress = _e,
        this._libraryLoaded = !1,
        this._isUnwrapping = !1,
        this.xAtlas = this._createXAtlas()
    }
    loadLibrary(o, c, h) {
        return build_n(this, void 0, void 0, function*() {
            if (!this._libraryLoaded) {
                for (yield new Promise( (_, b) => {
                    try {
                        this.xAtlas.init(_, o, c, h)
                    } catch (_e) {
                        b(_e)
                    }
                }
                ); !this.xAtlas.api || !(yield this.xAtlas.api.loaded); )
                    yield new Promise(_ => setTimeout(_, 100));
                this._libraryLoaded = !0
            }
        })
    }
    packAtlas(o, c="uv2", h="uv") {
        return build_n(this, void 0, void 0, function*() {
            if (!this._libraryLoaded)
                throw new Error("xatlas-three: library not loaded");
            if (!o)
                throw new Error("xatlas-three: nodeList argument not provided");
            if (o.length < 1)
                throw new Error("xatlas-three: nodeList must have non-zero length");
            const _ = this.chartOptions.useInputMeshUvs;
            for (; this._isUnwrapping; )
                console.log("xatlas-three: unwrapping another mesh, waiting 100 ms"),
                yield new Promise(at => setTimeout(at, 100));
            this._isUnwrapping = !0,
            yield this.xAtlas.api.setProgressLogging(this.logProgress),
            yield this.xAtlas.api.createAtlas();
            let b = []
              , _e = "";
            for (let at of o) {
                let {uuid: ut, index: pt, attributes: ht} = at;
                const _t = at.userData.worldScale || 1;
                b.push(ut),
                pt && ht.position && ht.position.itemSize === 3 ? (_e = "Mesh" + b.length + " added to atlas: " + ut,
                this.timeUnwrap && console.time(_e),
                yield this.xAtlas.api.addMesh(pt.array, ht.position.array, ht.normal ? ht.normal.array : void 0, ht.uv ? ht.uv.array : void 0, ut, this.useNormals, _, _t),
                this.timeUnwrap && console.timeEnd(_e)) : console.warn("xatlas-three: Geometry not supported: ", at)
            }
            _e = "Generated atlas with " + b.length + " meshes",
            this.timeUnwrap && console.time(_e);
            const nt = yield this.xAtlas.api.generateAtlas(this.chartOptions, this.packOptions, !0);
            this.timeUnwrap && console.timeEnd(_e);
            let it = [];
            for (let at of nt.meshes) {
                let ut = o.find(_t => _t.uuid === at.mesh);
                if (!ut) {
                    console.error("xatlas-three: Geometry not found: ", at.mesh);
                    continue
                }
                at.vertex.vertices && ut.setAttribute("position", new this.THREE.BufferAttribute(at.vertex.vertices,3,!1)),
                at.vertex.normals && ut.setAttribute("normal", new this.THREE.BufferAttribute(at.vertex.normals,3,!0)),
                at.vertex.coords1 && ut.setAttribute(c, new this.THREE.BufferAttribute(at.vertex.coords1,2,!1)),
                at.vertex.coords && c !== h && ut.setAttribute(h, new this.THREE.BufferAttribute(at.vertex.coords,2,!1)),
                at.index && ut.setIndex(new this.THREE.BufferAttribute(at.index,1,!1)),
                at.subMeshes && (ut.userData.xAtlasSubMeshes = structuredClone(at.subMeshes));
                const pt = at.oldIndexes
                  , ht = ut.attributes;
                for (const _t in ht) {
                    if (_t === "position" || _t === "normal" || _t === c || _t === h)
                        continue;
                    const vt = ht[_t]
                      , bt = vt.array.constructor
                      , St = vt.itemSize
                      , At = vt.array
                      , Et = new bt(pt.length * St)
                      , Pt = new this.THREE.BufferAttribute(Et,St,vt.normalized);
                    Pt.gpuType = vt.gpuType;
                    for (let It = 0, Dt = pt.length; It < Dt; It++) {
                        const Gt = pt[It];
                        for (let Bt = 0; Bt < St; Bt++)
                            Et[It * St + Bt] = At[Gt * St + Bt]
                    }
                    ut.setAttribute(_t, Pt)
                }
                it.push(ut)
            }
            return yield this.xAtlas.api.destroyAtlas(),
            this._isUnwrapping = !1,
            {
                width: nt.width,
                height: nt.height,
                atlasCount: nt.atlasCount,
                meshCount: nt.meshCount,
                texelsPerUnit: nt.texelsPerUnit,
                geometries: it,
                meshes: nt.meshes
            }
        })
    }
    unwrapGeometry(o, c="uv", h="uv2") {
        return build_n(this, void 0, void 0, function*() {
            return this.packAtlas([o], c, h)
        })
    }
}

export default build_r;
