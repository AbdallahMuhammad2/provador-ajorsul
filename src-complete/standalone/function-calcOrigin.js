/* Standalone Function: calcOrigin */

function calcOrigin(d, o) {
    let c = .5;
    const h = calcLength(d)
      , _ = calcLength(o);
    return _ > h ? c = progress(o.min, o.max - h, d.min) : h > _ && (c = progress(d.min, d.max - _, o.min)),
    clamp(0, 1, c)
}

export default calcOrigin;
