/* Standalone Class: CSG */

class CSG {
    constructor() {
        this.polygons = new Array
    }
    static fromPolygons(o) {
        const c = new CSG;
        return c.polygons = o,
        c
    }
    static fromGeometry(o, c) {
        let h = [];
        const _ = o.attributes.position
          , b = o.attributes.normal
          , _e = o.attributes.uv
          , nt = o.attributes.color
          , it = o.groups;
        let at;
        if (o.index)
            at = o.index.array;
        else {
            at = new Array(_.array.length / _.itemSize | 0);
            for (let pt = 0; pt < at.length; pt++)
                at[pt] = pt
        }
        const ut = at.length / 3 | 0;
        h = new Array(ut);
        for (let pt = 0, ht = 0, _t = at.length; pt < _t; pt += 3,
        ht++) {
            const vt = new Array(3);
            for (let bt = 0; bt < 3; bt++) {
                const St = at[pt + bt]
                  , At = 3 * St
                  , Et = 2 * St
                  , Pt = _.array[At]
                  , It = _.array[At + 1]
                  , Dt = _.array[At + 2]
                  , Gt = b.array[At]
                  , Bt = b.array[At + 1]
                  , kt = b.array[At + 2]
                  , Ut = _e == null ? void 0 : _e.array[Et]
                  , Ht = _e == null ? void 0 : _e.array[Et + 1];
                vt[bt] = new Vertex(new Vector(Pt,It,Dt),new Vector(Gt,Bt,kt),new Vector(Ut,Ht,0),nt && new Vector(nt.array[Et],nt.array[Et + 1],nt.array[Et + 2]))
            }
            if (c === void 0 && it && it.length > 0)
                for (const bt of it)
                    pt >= bt.start && pt < bt.start + bt.count && (h[ht] = new Polygon(vt,bt.materialIndex));
            else
                h[ht] = new Polygon(vt,c)
        }
        return CSG.fromPolygons(h.filter(pt => !isNaN(pt.plane.normal.x)))
    }
    static toGeometry(o, c) {
        let h = 0;
        const _ = o.polygons;
        for (const _t of _)
            h += _t.vertices.length - 2;
        const b = new three_module.LoY
          , _e = new NBuf3(3 * h * 3)
          , nt = new NBuf3(3 * h * 3)
          , it = new NBuf2(2 * h * 3);
        let at;
        const ut = []
          , pt = [];
        for (const _t of _) {
            const vt = _t.vertices
              , bt = vt.length;
            _t.shared !== void 0 && (ut[_t.shared] || (ut[_t.shared] = [])),
            bt && vt[0].color !== void 0 && (at || (at = new NBuf3(3 * h * 3)));
            for (let St = 3; St <= bt; St++)
                (_t.shared === void 0 ? pt : ut[_t.shared]).push(_e.top / 3, _e.top / 3 + 1, _e.top / 3 + 2),
                _e.write(vt[0].pos),
                _e.write(vt[St - 2].pos),
                _e.write(vt[St - 1].pos),
                nt.write(vt[0].normal),
                nt.write(vt[St - 2].normal),
                nt.write(vt[St - 1].normal),
                it && (it.write(vt[0].uv),
                it.write(vt[St - 2].uv),
                it.write(vt[St - 1].uv)),
                at && (at.write(vt[0].color),
                at.write(vt[St - 2].color),
                at.write(vt[St - 1].color))
        }
        b.setAttribute("position", new three_module.THS(_e.array,3)),
        b.setAttribute("normal", new three_module.THS(nt.array,3)),
        it && b.setAttribute("uv", new three_module.THS(it.array,2)),
        at && b.setAttribute("color", new three_module.THS(at.array,3));
        for (let _t = 0; _t < ut.length; _t++)
            ut[_t] === void 0 && (ut[_t] = []);
        if (ut.length) {
            let _t = []
              , vt = 0;
            for (let bt = 0; bt < ut.length; bt++)
                b.addGroup(vt, ut[bt].length, bt),
                vt += ut[bt].length,
                _t = _t.concat(ut[bt]);
            b.addGroup(vt, pt.length, ut.length),
            _t = _t.concat(pt),
            b.setIndex(_t)
        }
        const ht = new three_module.kn4().copy(c).invert();
        return b.applyMatrix4(ht),
        b.computeBoundingSphere(),
        b.computeBoundingBox(),
        b
    }
    static fromMesh(o, c) {
        const h = CSG.fromGeometry(o.geometry, c)
          , _ = new three_module.Pq0
          , b = new three_module.dwI;
        b.getNormalMatrix(o.matrix);
        for (let _e = 0; _e < h.polygons.length; _e++) {
            const nt = h.polygons[_e];
            for (let it = 0; it < nt.vertices.length; it++) {
                const at = nt.vertices[it];
                at.pos.copy(_.copy(at.pos.toVector3()).applyMatrix4(o.matrix)),
                at.normal.copy(_.copy(at.normal.toVector3()).applyMatrix3(b))
            }
        }
        return h
    }
    static toMesh(o, c, h) {
        const _ = CSG.toGeometry(o, c)
          , b = new three_module.eaF(_,h);
        return b.matrix.copy(c),
        b.matrix.decompose(b.position, b.quaternion, b.scale),
        b.rotation.setFromQuaternion(b.quaternion),
        b.updateMatrixWorld(),
        b.castShadow = b.receiveShadow = !0,
        b
    }
    static union(o, c) {
        const h = CSG.fromMesh(o)
          , _ = CSG.fromMesh(c);
        return CSG.toMesh(h.union(_), o.matrix, o.material)
    }
    static subtract(o, c) {
        const h = CSG.fromMesh(o)
          , _ = CSG.fromMesh(c);
        return CSG.toMesh(h.subtract(_), o.matrix, o.material)
    }
    static intersect(o, c) {
        const h = CSG.fromMesh(o)
          , _ = CSG.fromMesh(c);
        return CSG.toMesh(h.intersect(_), o.matrix, o.material)
    }
    clone() {
        const o = new CSG;
        return o.polygons = this.polygons.map(c => c.clone()).filter(c => Number.isFinite(c.plane.w)),
        o
    }
    toPolygons() {
        return this.polygons
    }
    union(o) {
        const c = new Node_Node(this.clone().polygons)
          , h = new Node_Node(o.clone().polygons);
        return c.clipTo(h),
        h.clipTo(c),
        h.invert(),
        h.clipTo(c),
        h.invert(),
        c.build(h.allPolygons()),
        CSG.fromPolygons(c.allPolygons())
    }
    subtract(o) {
        const c = new Node_Node(this.clone().polygons)
          , h = new Node_Node(o.clone().polygons);
        return c.invert(),
        c.clipTo(h),
        h.clipTo(c),
        h.invert(),
        h.clipTo(c),
        h.invert(),
        c.build(h.allPolygons()),
        c.invert(),
        CSG.fromPolygons(c.allPolygons())
    }
    intersect(o) {
        const c = new Node_Node(this.clone().polygons)
          , h = new Node_Node(o.clone().polygons);
        return c.invert(),
        h.clipTo(c),
        h.invert(),
        c.clipTo(h),
        h.clipTo(c),
        c.build(h.allPolygons()),
        c.invert(),
        CSG.fromPolygons(c.allPolygons())
    }
    inverse() {
        const o = this.clone();
        for (const c of o.polygons)
            c.flip();
        return o
    }
    toMesh(o, c) {
        return CSG.toMesh(this, o, c)
    }
    toGeometry(o) {
        return CSG.toGeometry(this, o)
    }
}

export default CSG;
