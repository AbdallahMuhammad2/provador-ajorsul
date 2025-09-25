/* Standalone Function: partition_indirect */

function partition_indirect(d, o, c, h, _, b) {
    let _e = h
      , nt = h + _ - 1;
    const it = b.pos
      , at = 2 * b.axis;
    for (; ; ) {
        for (; _e <= nt && c[6 * _e + at] < it; )
            _e++;
        for (; _e <= nt && c[6 * nt + at] >= it; )
            nt--;
        if (!(_e < nt))
            return _e;
        {
            let ut = d[_e];
            d[_e] = d[nt],
            d[nt] = ut;
            for (let pt = 0; pt < 6; pt++) {
                let ht = c[6 * _e + pt];
                c[6 * _e + pt] = c[6 * nt + pt],
                c[6 * nt + pt] = ht
            }
            _e++,
            nt--
        }
    }
}

export default partition_indirect;
