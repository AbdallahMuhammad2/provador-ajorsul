/* Standalone Class: SphereGeometryGenerator */

class SphereGeometryGenerator extends AGeometryGenerator {
    constructor() {
        super(...arguments),
        this.defaultParams = {
            radius: 1,
            widthSegments: 32,
            heightSegments: 16,
            phiStart: 0,
            phiLength: 2 * Math.PI,
            thetaStart: 0,
            thetaLength: Math.PI
        }
    }
    _generateData(o) {
        const {radius: c, phiStart: h, phiLength: _, thetaStart: b, thetaLength: _e} = o;
        let {widthSegments: nt, heightSegments: it} = o;
        nt = Math.max(3, Math.floor(nt)),
        it = Math.max(2, Math.floor(it));
        const at = Math.min(b + _e, Math.PI);
        let ut = 0;
        const pt = []
          , ht = new three_module.Pq0
          , _t = new three_module.Pq0
          , vt = []
          , bt = []
          , St = []
          , At = [];
        for (let Et = 0; Et <= it; Et++) {
            const Pt = []
              , It = Et / it;
            let Dt = 0;
            Et === 0 && b === 0 ? Dt = .5 / nt : Et === it && at === Math.PI && (Dt = -.5 / nt);
            for (let Gt = 0; Gt <= nt; Gt++) {
                const Bt = Gt / nt;
                ht.x = -c * Math.cos(h + Bt * _) * Math.sin(b + It * _e),
                ht.y = c * Math.cos(b + It * _e),
                ht.z = c * Math.sin(h + Bt * _) * Math.sin(b + It * _e),
                bt.push(ht.x, ht.y, ht.z),
                _t.copy(ht).normalize(),
                St.push(_t.x, _t.y, _t.z),
                At.push(Bt + Dt, 1 - It),
                Pt.push(ut++)
            }
            pt.push(Pt)
        }
        for (let Et = 0; Et < it; Et++)
            for (let Pt = 0; Pt < nt; Pt++) {
                const It = pt[Et][Pt + 1]
                  , Dt = pt[Et][Pt]
                  , Gt = pt[Et + 1][Pt]
                  , Bt = pt[Et + 1][Pt + 1];
                (Et !== 0 || b > 0) && vt.push(It, Dt, Bt),
                (Et !== it - 1 || at < Math.PI) && vt.push(Dt, Gt, Bt)
            }
        return {
            indices: vt,
            vertices: bt,
            normals: St,
            uvs: At
        }
    }
}

export default SphereGeometryGenerator;
