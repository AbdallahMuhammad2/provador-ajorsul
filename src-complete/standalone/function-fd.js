/* Standalone Function: fd */

function fd(d, o, c, h) {
    if (dd) {
        var _ = Yc(d, o, c, h);
        if (_ === null)
            hd(d, o, h, id$2, c),
            Sc(d, h);
        else if (Uc(_, d, o, c, h))
            h.stopPropagation();
        else if (Sc(d, h),
        o & 4 && -1 < Rc.indexOf(d)) {
            for (; _ !== null; ) {
                var b = Cb(_);
                if (b !== null && Ec(b),
                b = Yc(d, o, c, h),
                b === null && hd(d, o, h, id$2, c),
                b === _)
                    break;
                _ = b
            }
            _ !== null && h.stopPropagation()
        } else
            hd(d, o, h, null, c)
    }
}

export default fd;
