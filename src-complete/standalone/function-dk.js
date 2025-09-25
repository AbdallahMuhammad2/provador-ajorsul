/* Standalone Function: Dk */

function Dk(d, o) {
    var c = d.callbackNode;
    wc(d, o);
    var h = uc(d, d === Q ? Z : 0);
    if (h === 0)
        c !== null && bc(c),
        d.callbackNode = null,
        d.callbackPriority = 0;
    else if (o = h & -h,
    d.callbackPriority !== o) {
        if (c != null && bc(c),
        o === 1)
            d.tag === 0 ? ig(Ek.bind(null, d)) : hg(Ek.bind(null, d)),
            Jf(function() {
                !(K & 6) && jg()
            }),
            c = null;
        else {
            switch (Dc(h)) {
            case 1:
                c = fc;
                break;
            case 4:
                c = gc;
                break;
            case 16:
                c = hc;
                break;
            case 536870912:
                c = jc;
                break;
            default:
                c = hc
            }
            c = Fk(c, Gk.bind(null, d))
        }
        d.callbackPriority = o,
        d.callbackNode = c
    }
}

export default Dk;
