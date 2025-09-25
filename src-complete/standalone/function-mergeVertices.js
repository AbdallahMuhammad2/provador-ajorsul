/* Standalone Function: mergeVertices */

function mergeVertices(d, o=1e-4) {
    const c = o > 0;
    o = Math.max(o, Number.EPSILON);
    const h = {}
      , _ = d.getIndex()
      , b = d.getAttribute("position")
      , _e = _ ? _.count : b.count;
    let nt = 0;
    const it = Object.keys(d.attributes)
      , at = {}
      , ut = {}
      , pt = []
      , ht = ["getX", "getY", "getZ", "getW"]
      , _t = ["setX", "setY", "setZ", "setW"];
    for (let Pt = 0, It = it.length; Pt < It; Pt++) {
        const Dt = it[Pt]
          , Gt = d.attributes[Dt];
        at[Dt] = new three_module.THS(new Gt.array.constructor(Gt.count * Gt.itemSize),Gt.itemSize,Gt.normalized);
        const Bt = d.morphAttributes[Dt];
        Bt && (ut[Dt] = new three_module.THS(new Bt.array.constructor(Bt.count * Bt.itemSize),Bt.itemSize,Bt.normalized))
    }
    const vt = .5 * o
      , bt = Math.log10(1 / o)
      , St = Math.pow(10, bt)
      , At = vt * St;
    for (let Pt = 0; Pt < _e; Pt++) {
        const It = _ ? _.getX(Pt) : Pt;
        let Dt = "";
        for (let Gt = 0, Bt = it.length; Gt < Bt && c; Gt++) {
            const kt = it[Gt]
              , Ut = d.getAttribute(kt)
              , Ht = Ut.itemSize;
            for (let Kt = 0; Kt < Ht; Kt++)
                Dt += ~~(Ut[ht[Kt]](It) * St + At) + ","
        }
        if (c && Dt in h)
            pt.push(h[Dt]);
        else {
            for (let Gt = 0, Bt = it.length; Gt < Bt; Gt++) {
                const kt = it[Gt]
                  , Ut = d.getAttribute(kt)
                  , Ht = d.morphAttributes[kt]
                  , Kt = Ut.itemSize
                  , Jt = at[kt]
                  , or = ut[kt];
                for (let ir = 0; ir < Kt; ir++) {
                    const lr = ht[ir]
                      , ar = _t[ir];
                    if (Jt[ar](nt, Ut[lr](It)),
                    Ht)
                        for (let hr = 0, gr = Ht.length; hr < gr; hr++)
                            or[hr][ar](nt, Ht[hr][lr](It))
                }
            }
            c && (h[Dt] = nt),
            pt.push(nt),
            nt++
        }
    }
    const Et = d.clone();
    for (const Pt in d.attributes) {
        const It = at[Pt];
        if (Et.setAttribute(Pt, new three_module.THS(It.array.slice(0, nt * It.itemSize),It.itemSize,It.normalized)),
        Pt in ut)
            for (let Dt = 0; Dt < ut[Pt].length; Dt++) {
                const Gt = ut[Pt][Dt];
                Et.morphAttributes[Pt][Dt] = new three_module.THS(Gt.array.slice(0, nt * Gt.itemSize),Gt.itemSize,Gt.normalized)
            }
    }
    return Et.setIndex(pt),
    Et
}

export default mergeVertices;
