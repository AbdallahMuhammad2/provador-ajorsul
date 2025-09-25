/* Standalone Class: CircleGeometryGenerator */

class CircleGeometryGenerator extends AGeometryGenerator {
    constructor() {
        super(...arguments),
        this.defaultParams = {
            radius: 1,
            segments: 32,
            thetaStart: 0,
            thetaLength: 2 * Math.PI
        }
    }
    _generateData(o) {
        const {radius: c, thetaStart: h, thetaLength: _} = o
          , b = Math.max(3, o.segments)
          , _e = []
          , nt = []
          , it = []
          , at = []
          , ut = new three_module.Pq0
          , pt = new three_module.I9Y;
        nt.push(0, 0, 0),
        it.push(0, 0, 1),
        at.push(.5, .5);
        for (let ht = 0, _t = 3; ht <= b; ht++,
        _t += 3) {
            const vt = h + ht / b * _;
            ut.x = c * Math.cos(vt),
            ut.y = c * Math.sin(vt),
            nt.push(ut.x, ut.y, ut.z),
            it.push(0, 0, 1),
            pt.x = (nt[_t] / c + 1) / 2,
            pt.y = (nt[_t + 1] / c + 1) / 2,
            at.push(pt.x, pt.y)
        }
        for (let ht = 1; ht <= b; ht++)
            _e.push(ht, ht + 1, 0);
        return {
            indices: _e,
            vertices: nt,
            normals: it,
            uvs: at
        }
    }
}

export default CircleGeometryGenerator;
