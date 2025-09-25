/* Standalone Function: Pt */

function Pt(It) {
            _t = c.getPointAt(It / _, _t);
            const Dt = it.normals[It]
              , Gt = it.binormals[It];
            for (let Bt = 0; Bt <= h; Bt++) {
                const kt = At[Bt % h];
                ut.set(0, 0, 0).addScaledVector(Dt, kt.x).addScaledVector(Gt, kt.y),
                at.copy(_t).add(ut),
                vt.push(at.x, at.y, at.z)
            }
        }
        (function() {
            for (let Dt = 1; Dt < h; Dt++) {
                const Gt = Dt + _ * (h + 1);
                ut.fromBufferAttribute(Et, Dt),
                pt.fromBufferAttribute(Et, Gt),
                ut.add(pt).normalize(),
                Et.setXYZ(Dt, ut.x, ut.y, ut.z),
                Et.setXYZ(Gt, ut.x, ut.y, ut.z)
            }
            for (let Dt = 1; Dt < _; Dt++) {
                const Gt = Dt * (h + 1)
                  , Bt = Gt + h;
                ut.fromBufferAttribute(Et, Gt),
                pt.fromBufferAttribute(Et, Bt),
                ut.add(pt).normalize(),
                Et.setXYZ(Gt, ut.x, ut.y, ut.z),
                Et.setXYZ(Bt, ut.x, ut.y, ut.z)
            }
            ut.fromBufferAttribute(Et, 0),
            pt.fromBufferAttribute(Et, h),
            ut.add(pt);
            const It = _ * (h + 1);
            pt.fromBufferAttribute(Et, It),
            ut.add(pt),
            pt.fromBufferAttribute(Et, It + h),
            ut.add(pt),
            ut.normalize(),
            Et.setXYZ(0, ut.x, ut.y, ut.z),
            Et.setXYZ(h, ut.x, ut.y, ut.z),
            Et.setXYZ(It, ut.x, ut.y, ut.z),
            Et.setXYZ(It + h, ut.x, ut.y, ut.z),
            Et.needsUpdate = !0
        }
        )()
    }
    createSplits(o) {
        this.clearGroups();
        const c = this.parameters.primary === "shape" ? this.parameters.shapeSegments : this.parameters.tubularSegments
          , h = this.index.count
          , _ = [...o, 1].sort( (nt, it) => nt - it);
        let b = 0
          , _e = 0;
        for (const nt of _) {
            const it = Math.round(c * nt) * h / c;
            this.addGroup(b, it - b, _e++),
            b = it
        }
        return this.groups.length
    }
    toJSON() {
        const o = super.toJSON();
        return o.path = this.parameters.path.toJSON(),
        o.shape = this.parameters.shape.toJSON(),
        o
    }
}

export default Pt;
