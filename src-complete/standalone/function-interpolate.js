/* Standalone Function: interpolate */

function interpolate(d, o, {clamp: c=!0, ease: h, mixer: _}={}) {
    const b = d.length;
    if (invariant(b === o.length),
    b === 1)
        return () => o[0];
    if (b === 2 && d[0] === d[1])
        return () => o[1];
    d[0] > d[b - 1] && (d = [...d].reverse(),
    o = [...o].reverse());
    const _e = createMixers(o, h, _)
      , nt = _e.length
      , it = at => {
        let ut = 0;
        if (nt > 1)
            for (; ut < d.length - 2 && !(at < d[ut + 1]); ut++)
                ;
        const pt = progress(d[ut], d[ut + 1], at);
        return _e[ut](pt)
    }
    ;
    return c ? at => it(clamp(d[0], d[b - 1], at)) : it
}

export default interpolate;
