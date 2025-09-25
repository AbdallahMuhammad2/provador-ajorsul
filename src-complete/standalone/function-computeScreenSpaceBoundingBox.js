/* Standalone Function: computeScreenSpaceBoundingBox */

function computeScreenSpaceBoundingBox(d, o) {
    let c, h;
    if (Array.isArray(d))
        for (const b of d) {
            const _e = computeScreenSpaceBoundingBox(b, o);
            c === void 0 || h === void 0 ? (c = _e.min.clone(),
            h = _e.max.clone()) : (c.min(_e.min),
            h.max(_e.max))
        }
    const _ = d;
    if (_.geometry !== void 0) {
        const b = _.geometry.vertices;
        if (b === void 0 && _.geometry.attributes !== void 0 && "position"in _.geometry.attributes) {
            const _e = new three_module.Pq0
              , nt = _.geometry.attributes.position;
            for (let it = 0; it < nt.count * nt.itemSize; it += nt.itemSize) {
                _e.set(nt.array[it], nt.array[it + 1], nt.array[3]);
                const at = _e.applyMatrix4(d.matrixWorld).project(o)
                  , ut = new three_module.I9Y(at.x,at.y);
                c === void 0 || h === void 0 ? (c = ut.clone(),
                h = ut.clone()) : (c.min(ut),
                h.max(ut))
            }
        } else
            for (const _e of b) {
                const nt = _e.clone().applyMatrix4(d.matrixWorld).project(o)
                  , it = new three_module.I9Y(nt.x,nt.y);
                c === void 0 || h === void 0 ? (c = it.clone(),
                h = it.clone()) : (c.min(it),
                h.max(it))
            }
    }
    if (d.children !== void 0)
        for (const b of d.children) {
            const _e = computeScreenSpaceBoundingBox(b, o);
            c === void 0 || h === void 0 ? (c = _e.min.clone(),
            h = _e.max.clone()) : (c.min(_e.min),
            h.max(_e.max))
        }
    return new three_module.UtB(c,h)
}

export default computeScreenSpaceBoundingBox;
