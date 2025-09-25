/* Standalone Class: BoxGeometryGenerator */

class BoxGeometryGenerator extends AGeometryGenerator {
    constructor() {
        super(...arguments),
        this.defaultParams = {
            width: 1,
            height: 1,
            depth: 1,
            widthSegments: 1,
            heightSegments: 1,
            depthSegments: 1
        }
    }
    _buildPlane(o, c, h, _, b, _e, nt, it, at, ut, pt, ht) {
        const {indices: _t, vertices: vt, normals: bt, uvs: St, numberOfVertices: At, groupStart: Et, groups: Pt} = o
          , It = nt / ut
          , Dt = it / pt
          , Gt = nt / 2
          , Bt = it / 2
          , kt = at / 2
          , Ut = ut + 1
          , Ht = pt + 1;
        let Kt = 0
          , Jt = 0;
        const or = new three_module.Pq0;
        for (let ir = 0; ir < Ht; ir++) {
            const lr = ir * Dt - Bt;
            for (let ar = 0; ar < Ut; ar++) {
                const hr = ar * It - Gt;
                or[c] = hr * b,
                or[h] = lr * _e,
                or[_] = kt,
                vt.push(or.x, or.y, or.z),
                or[c] = 0,
                or[h] = 0,
                or[_] = at > 0 ? 1 : -1,
                bt.push(or.x, or.y, or.z),
                St.push(ar / ut),
                St.push(1 - ir / pt),
                Kt += 1
            }
        }
        for (let ir = 0; ir < pt; ir++)
            for (let lr = 0; lr < ut; lr++) {
                const ar = At + lr + Ut * ir
                  , hr = At + lr + Ut * (ir + 1)
                  , gr = At + (lr + 1) + Ut * (ir + 1)
                  , dr = At + (lr + 1) + Ut * ir;
                _t.push(ar, hr, dr),
                _t.push(hr, gr, dr),
                Jt += 6
            }
        Pt.push({
            start: Et,
            count: Jt,
            materialIndex: ht
        }),
        o.groupStart += Jt,
        o.numberOfVertices += Kt
    }
    _generateData(o) {
        const {width: c, height: h, depth: _} = o;
        let {widthSegments: b, heightSegments: _e, depthSegments: nt} = o;
        b = Math.floor(b),
        _e = Math.floor(_e),
        nt = Math.floor(nt);
        const it = {
            indices: [],
            vertices: [],
            normals: [],
            uvs: [],
            numberOfVertices: 0,
            groupStart: 0,
            groups: []
        };
        return this._buildPlane(it, "z", "y", "x", -1, -1, _, h, c, nt, _e, 0),
        this._buildPlane(it, "z", "y", "x", 1, -1, _, h, -c, nt, _e, 1),
        this._buildPlane(it, "x", "z", "y", 1, 1, c, _, h, b, nt, 2),
        this._buildPlane(it, "x", "z", "y", 1, -1, c, _, -h, b, nt, 3),
        this._buildPlane(it, "x", "y", "z", 1, -1, c, h, _, b, _e, 4),
        this._buildPlane(it, "x", "y", "z", -1, -1, c, h, -_, b, _e, 5),
        it
    }
}

export default BoxGeometryGenerator;
