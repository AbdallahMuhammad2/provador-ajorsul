/* Standalone Class: Plane */

class Plane {
    constructor(o, c) {
        this.normal = o,
        this.w = c,
        this.normal = o,
        this.w = c
    }
    clone() {
        return new Plane(this.normal.clone(),this.w)
    }
    flip() {
        this.normal.negate(),
        this.w = -this.w
    }
    splitPolygon(o, c, h, _, b) {
        let _e = 0;
        const nt = [];
        for (let it = 0; it < o.vertices.length; it++) {
            const at = this.normal.dot(o.vertices[it].pos) - this.w
              , ut = at < -Plane.EPSILON ? 2 : at > Plane.EPSILON ? 1 : 0;
            _e |= ut,
            nt.push(ut)
        }
        switch (_e) {
        case 0:
            (this.normal.dot(o.plane.normal) > 0 ? c : h).push(o);
            break;
        case 1:
            _.push(o);
            break;
        case 2:
            b.push(o);
            break;
        case 3:
            {
                const it = []
                  , at = [];
                for (let ut = 0; ut < o.vertices.length; ut++) {
                    const pt = (ut + 1) % o.vertices.length
                      , ht = nt[ut]
                      , _t = nt[pt]
                      , vt = o.vertices[ut]
                      , bt = o.vertices[pt];
                    if (ht != 2 && it.push(vt),
                    ht != 1 && at.push(ht != 2 ? vt.clone() : vt),
                    (ht | _t) == 3) {
                        const St = (this.w - this.normal.dot(vt.pos)) / this.normal.dot(new Vector().copy(bt.pos).sub(vt.pos))
                          , At = vt.interpolate(bt, St);
                        it.push(At),
                        at.push(At.clone())
                    }
                }
                it.length >= 3 && _.push(new Polygon(it,o.shared)),
                at.length >= 3 && b.push(new Polygon(at,o.shared));
                break
            }
        }
    }
    static fromPoints(o, c, h) {
        const _ = new Vector().copy(c).sub(o).cross(new Vector().copy(h).sub(o)).normalize();
        return new Plane(_.clone(),_.dot(o))
    }
}

export default Plane;
