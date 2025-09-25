/* Standalone Function: vt */

function vt(bt, St, At) {
        const Et = bt.points;
        let Pt = 0
          , It = -1;
        for (let Dt = 0; Dt < 3; Dt++) {
            const {start: Gt, end: Bt} = ut;
            Gt.copy(Et[Dt]),
            Bt.copy(Et[(Dt + 1) % 3]),
            ut.delta(_e);
            const kt = isNearZero(St.distanceToPoint(Gt));
            if (isNearZero(St.normal.dot(_e)) && kt) {
                At.copy(ut),
                Pt = 2;
                break
            }
            const Ut = St.intersectLine(ut, _t);
            if (!Ut && kt && _t.copy(Gt),
            (Ut || kt) && !isNearZero(_t.distanceTo(Bt))) {
                if (Pt <= 1)
                    (Pt === 1 ? At.start : At.end).copy(_t),
                    kt && (It = Pt);
                else if (Pt >= 2) {
                    (It === 1 ? At.start : At.end).copy(_t),
                    Pt = 2;
                    break
                }
                if (Pt++,
                Pt === 2 && It === -1)
                    break
            }
        }
        return Pt
    }
    return function(bt, St=null, At=!1) {
        this.needsUpdate && this.update(),
        bt.isExtendedTriangle ? bt.needsUpdate && bt.update() : (d.copy(bt),
        d.update(),
        bt = d);
        const Et = this.plane
          , Pt = bt.plane;
        if (Math.abs(Et.normal.dot(Pt.normal)) > 1 - 1e-10) {
            const It = this.satBounds
              , Dt = this.satAxes;
            c[0] = bt.a,
            c[1] = bt.b,
            c[2] = bt.c;
            for (let kt = 0; kt < 4; kt++) {
                const Ut = It[kt]
                  , Ht = Dt[kt];
                if (h.setFromPoints(Ht, c),
                Ut.isSeparated(h))
                    return !1
            }
            const Gt = bt.satBounds
              , Bt = bt.satAxes;
            o[0] = this.a,
            o[1] = this.b,
            o[2] = this.c;
            for (let kt = 0; kt < 4; kt++) {
                const Ut = Gt[kt]
                  , Ht = Bt[kt];
                if (h.setFromPoints(Ht, o),
                Ut.isSeparated(h))
                    return !1
            }
            for (let kt = 0; kt < 4; kt++) {
                const Ut = Dt[kt];
                for (let Ht = 0; Ht < 4; Ht++) {
                    const Kt = Bt[Ht];
                    if (b.crossVectors(Ut, Kt),
                    h.setFromPoints(b, o),
                    _.setFromPoints(b, c),
                    h.isSeparated(_))
                        return !1
                }
            }
            return St && (At || console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),
            St.start.set(0, 0, 0),
            St.end.set(0, 0, 0)),
            !0
        }
        {
            const It = vt(this, Pt, pt);
            if (It === 1 && bt.containsPoint(pt.end))
                return St && (St.start.copy(pt.end),
                St.end.copy(pt.end)),
                !0;
            if (It !== 2)
                return !1;
            const Dt = vt(bt, Et, ht);
            if (Dt === 1 && this.containsPoint(ht.end))
                return St && (St.start.copy(ht.end),
                St.end.copy(ht.end)),
                !0;
            if (Dt !== 2)
                return !1;
            if (pt.delta(nt),
            ht.delta(it),
            nt.dot(it) < 0) {
                let Ht = ht.start;
                ht.start = ht.end,
                ht.end = Ht
            }
            const Gt = pt.start.dot(nt)
              , Bt = pt.end.dot(nt)
              , kt = ht.start.dot(nt)
              , Ut = ht.end.dot(nt);
            return (Gt === Ut || kt === Bt || Bt < kt != Gt < Ut) && (St && (at.subVectors(pt.start, ht.start),
            at.dot(nt) > 0 ? St.start.copy(pt.start) : St.start.copy(ht.start),
            at.subVectors(pt.end, ht.end),
            at.dot(nt) < 0 ? St.end.copy(pt.end) : St.end.copy(ht.end)),
            !0)
        }
    }
}

export default vt;
