/* Standalone Class: TorusGeometryGenerator */

class TorusGeometryGenerator extends AGeometryGenerator {
    constructor() {
        super(...arguments),
        this.defaultParams = {
            radius: 1,
            tube: .4,
            radialSegments: 12,
            tubularSegments: 48,
            arc: 2 * Math.PI
        }
    }
    _generateData(o) {
        const {radius: c, tube: h, arc: _} = o;
        let {radialSegments: b, tubularSegments: _e} = o;
        b = Math.floor(b),
        _e = Math.floor(_e);
        const nt = []
          , it = []
          , at = []
          , ut = []
          , pt = new three_module.Pq0
          , ht = new three_module.Pq0
          , _t = new three_module.Pq0;
        for (let vt = 0; vt <= b; vt++)
            for (let bt = 0; bt <= _e; bt++) {
                const St = bt / _e * _
                  , At = vt / b * Math.PI * 2;
                ht.x = (c + h * Math.cos(At)) * Math.cos(St),
                ht.y = (c + h * Math.cos(At)) * Math.sin(St),
                ht.z = h * Math.sin(At),
                it.push(ht.x, ht.y, ht.z),
                pt.x = c * Math.cos(St),
                pt.y = c * Math.sin(St),
                _t.subVectors(ht, pt).normalize(),
                at.push(_t.x, _t.y, _t.z),
                ut.push(bt / _e),
                ut.push(vt / b)
            }
        for (let vt = 1; vt <= b; vt++)
            for (let bt = 1; bt <= _e; bt++) {
                const St = (_e + 1) * vt + bt - 1
                  , At = (_e + 1) * (vt - 1) + bt - 1
                  , Et = (_e + 1) * (vt - 1) + bt
                  , Pt = (_e + 1) * vt + bt;
                nt.push(St, At, Pt),
                nt.push(At, Et, Pt)
            }
        return {
            indices: nt,
            vertices: it,
            normals: at,
            uvs: ut
        }
    }
}

export default TorusGeometryGenerator;
