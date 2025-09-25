/* Standalone Class: CylinderGeometryGenerator */

class CylinderGeometryGenerator extends AGeometryGenerator {
    constructor() {
        super(...arguments),
        this.defaultParams = {
            radiusTop: 1,
            radiusBottom: 1,
            height: 1,
            radialSegments: 32,
            heightSegments: 1,
            openEnded: !1,
            thetaStart: 0,
            thetaLength: 2 * Math.PI
        }
    }
    _generateTorso(o) {
        const {radiusTop: c, radiusBottom: h, height: _, radialSegments: b, heightSegments: _e, thetaStart: nt, thetaLength: it, indexArray: at, indices: ut, groups: pt, vertices: ht, normals: _t, uvs: vt, groupStart: bt, halfHeight: St} = o
          , At = new three_module.Pq0
          , Et = new three_module.Pq0;
        let Pt = 0;
        const It = (h - c) / _;
        for (let Dt = 0; Dt <= _e; Dt++) {
            const Gt = []
              , Bt = Dt / _e
              , kt = Bt * (h - c) + c;
            for (let Ut = 0; Ut <= b; Ut++) {
                const Ht = Ut / b
                  , Kt = Ht * it + nt
                  , Jt = Math.sin(Kt)
                  , or = Math.cos(Kt);
                Et.x = kt * Jt,
                Et.y = -Bt * _ + St,
                Et.z = kt * or,
                ht.push(Et.x, Et.y, Et.z),
                At.set(Jt, It, or).normalize(),
                _t.push(At.x, At.y, At.z),
                vt.push(Ht, 1 - Bt),
                Gt.push(o.index++)
            }
            at.push(Gt)
        }
        for (let Dt = 0; Dt < b; Dt++)
            for (let Gt = 0; Gt < _e; Gt++) {
                const Bt = at[Gt][Dt]
                  , kt = at[Gt + 1][Dt]
                  , Ut = at[Gt + 1][Dt + 1]
                  , Ht = at[Gt][Dt + 1];
                ut.push(Bt, kt, Ht),
                ut.push(kt, Ut, Ht),
                Pt += 6
            }
        pt.push({
            start: bt,
            count: Pt,
            materialIndex: 0
        }),
        o.groupStart += Pt
    }
    _generateCap(o, c) {
        const {radiusTop: h, radiusBottom: _, radialSegments: b, thetaStart: _e, thetaLength: nt, indices: it, groups: at, vertices: ut, normals: pt, uvs: ht, groupStart: _t, halfHeight: vt} = o
          , bt = o.index
          , St = new three_module.I9Y
          , At = new three_module.Pq0;
        let Et = 0;
        const Pt = c === !0 ? h : _
          , It = c === !0 ? 1 : -1;
        for (let Gt = 1; Gt <= b; Gt++)
            ut.push(0, vt * It, 0),
            pt.push(0, It, 0),
            ht.push(.5, .5),
            o.index++;
        const Dt = o.index;
        for (let Gt = 0; Gt <= b; Gt++) {
            const Bt = Gt / b * nt + _e
              , kt = Math.cos(Bt)
              , Ut = Math.sin(Bt);
            At.x = Pt * Ut,
            At.y = vt * It,
            At.z = Pt * kt,
            ut.push(At.x, At.y, At.z),
            pt.push(0, It, 0),
            St.x = .5 * kt + .5,
            St.y = .5 * Ut * It + .5,
            ht.push(St.x, St.y),
            o.index++
        }
        for (let Gt = 0; Gt < b; Gt++) {
            const Bt = bt + Gt
              , kt = Dt + Gt;
            c === !0 ? it.push(kt, kt + 1, Bt) : it.push(kt + 1, kt, Bt),
            Et += 3
        }
        at.push({
            start: _t,
            count: Et,
            materialIndex: c === !0 ? 1 : 2
        }),
        o.groupStart += Et
    }
    _generateData(o) {
        let {radialSegments: c, heightSegments: h} = o;
        c = Math.floor(c),
        h = Math.floor(h);
        const _ = {
            indices: [],
            vertices: [],
            normals: [],
            uvs: [],
            numberOfVertices: 0,
            groupStart: 0,
            groups: [],
            index: 0,
            indexArray: [],
            halfHeight: o.height / 2,
            ...o,
            radialSegments: c,
            heightSegments: h
        };
        return this._generateTorso(_),
        o.openEnded === !1 && (o.radiusTop > 0 && this._generateCap(_, !0),
        o.radiusBottom > 0 && this._generateCap(_, !1)),
        _
    }
}

export default CylinderGeometryGenerator;
