/* Standalone Class: PlaneGeometryGenerator */

class PlaneGeometryGenerator extends AGeometryGenerator {
    constructor() {
        super(...arguments),
        this.defaultParams = {
            width: 1,
            height: 1,
            widthSegments: 2,
            heightSegments: 2
        }
    }
    _generateData(o) {
        const c = o.width / 2
          , h = o.height / 2
          , _ = Math.floor(o.widthSegments)
          , b = Math.floor(o.heightSegments)
          , _e = _ + 1
          , nt = b + 1
          , it = o.width / _
          , at = o.height / b
          , ut = []
          , pt = []
          , ht = []
          , _t = [];
        for (let vt = 0; vt < nt; vt++) {
            const bt = vt * at - h;
            for (let St = 0; St < _e; St++) {
                const At = St * it - c;
                pt.push(At, -bt, 0),
                ht.push(0, 0, 1),
                _t.push(St / _),
                _t.push(1 - vt / b)
            }
        }
        for (let vt = 0; vt < b; vt++)
            for (let bt = 0; bt < _; bt++) {
                const St = bt + _e * vt
                  , At = bt + _e * (vt + 1)
                  , Et = bt + 1 + _e * (vt + 1)
                  , Pt = bt + 1 + _e * vt;
                ut.push(St, At, Pt),
                ut.push(At, Et, Pt)
            }
        return {
            indices: ut,
            vertices: pt,
            normals: ht,
            uvs: _t
        }
    }
}

export default PlaneGeometryGenerator;
