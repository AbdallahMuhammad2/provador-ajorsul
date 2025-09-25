/* Standalone Class: Cylinder */

class Cylinder extends ConvexPolyhedron {
    constructor(o, c, h, _) {
        if (o === void 0 && (o = 1),
        c === void 0 && (c = 1),
        h === void 0 && (h = 1),
        _ === void 0 && (_ = 8),
        o < 0)
            throw new Error("The cylinder radiusTop cannot be negative.");
        if (c < 0)
            throw new Error("The cylinder radiusBottom cannot be negative.");
        const b = _
          , _e = []
          , nt = []
          , it = []
          , at = []
          , ut = []
          , pt = Math.cos
          , ht = Math.sin;
        _e.push(new Vec3(-c * ht(0),.5 * -h,c * pt(0))),
        at.push(0),
        _e.push(new Vec3(-o * ht(0),.5 * h,o * pt(0))),
        ut.push(1);
        for (let vt = 0; vt < b; vt++) {
            const bt = 2 * Math.PI / b * (vt + 1)
              , St = 2 * Math.PI / b * (vt + .5);
            vt < b - 1 ? (_e.push(new Vec3(-c * ht(bt),.5 * -h,c * pt(bt))),
            at.push(2 * vt + 2),
            _e.push(new Vec3(-o * ht(bt),.5 * h,o * pt(bt))),
            ut.push(2 * vt + 3),
            it.push([2 * vt, 2 * vt + 1, 2 * vt + 3, 2 * vt + 2])) : it.push([2 * vt, 2 * vt + 1, 1, 0]),
            (b % 2 == 1 || vt < b / 2) && nt.push(new Vec3(-ht(St),0,pt(St)))
        }
        it.push(at),
        nt.push(new Vec3(0,1,0));
        const _t = [];
        for (let vt = 0; vt < ut.length; vt++)
            _t.push(ut[ut.length - vt - 1]);
        it.push(_t),
        super({
            vertices: _e,
            faces: it,
            axes: nt
        }),
        this.type = Shape.types.CYLINDER,
        this.radiusTop = o,
        this.radiusBottom = c,
        this.height = h,
        this.numSegments = _
    }
}

export default Cylinder;
