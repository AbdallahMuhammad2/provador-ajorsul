/* Standalone Function: partition */

function partition(d, o, c, h, _, b) {
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
        for (let ut = 0; ut < 3; ut++) {
            let pt = o[3 * _e + ut];
            o[3 * _e + ut] = o[3 * nt + ut],
            o[3 * nt + ut] = pt
        }
        for (let ut = 0; ut < 6; ut++) {
            let pt = c[6 * _e + ut];
            c[6 * _e + ut] = c[6 * nt + ut],
            c[6 * nt + ut] = pt
        }
        _e++,
        nt--
    }
}

export default partition;
