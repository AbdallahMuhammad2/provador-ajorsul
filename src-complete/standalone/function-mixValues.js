/* Standalone Function: mixValues */

function mixValues(d, o, c, h, _, b) {
    _ ? (d.opacity = mixNumber$1(0, c.opacity !== void 0 ? c.opacity : 1, easeCrossfadeIn(h)),
    d.opacityExit = mixNumber$1(o.opacity !== void 0 ? o.opacity : 1, 0, easeCrossfadeOut(h))) : b && (d.opacity = mixNumber$1(o.opacity !== void 0 ? o.opacity : 1, c.opacity !== void 0 ? c.opacity : 1, h));
    for (let _e = 0; _e < numBorders; _e++) {
        const nt = `border${borders[_e]}Radius`;
        let it = getRadius(o, nt)
          , at = getRadius(c, nt);
        if (it === void 0 && at === void 0)
            continue;
        it || (it = 0),
        at || (at = 0),
        it === 0 || at === 0 || isPx(it) === isPx(at) ? (d[nt] = Math.max(mixNumber$1(asNumber(it), asNumber(at), h), 0),
        (percent.test(at) || percent.test(it)) && (d[nt] += "%")) : d[nt] = at
    }
    (o.rotate || c.rotate) && (d.rotate = mixNumber$1(o.rotate || 0, c.rotate || 0, h))
}

export default mixValues;
