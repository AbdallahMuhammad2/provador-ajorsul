/* Standalone Function: mergeGroups */

function mergeGroups(d) {
    if (d.groups.length === 0)
        return console.warn("THREE.BufferGeometryUtils.mergeGroups(): No groups are defined. Nothing to merge."),
        d;
    let o = d.groups;
    if (o = o.sort( (_e, nt) => _e.materialIndex !== nt.materialIndex ? _e.materialIndex - nt.materialIndex : _e.start - nt.start),
    d.getIndex() === null) {
        const _e = d.getAttribute("position")
          , nt = [];
        for (let it = 0; it < _e.count; it += 3)
            nt.push(it, it + 1, it + 2);
        d.setIndex(nt)
    }
    const c = d.getIndex()
      , h = [];
    for (let _e = 0; _e < o.length; _e++) {
        const nt = o[_e]
          , it = nt.start
          , at = it + nt.count;
        for (let ut = it; ut < at; ut++)
            h.push(c.getX(ut))
    }
    d.dispose(),
    d.setIndex(h);
    let _ = 0;
    for (let _e = 0; _e < o.length; _e++) {
        const nt = o[_e];
        nt.start = _,
        _ += nt.count
    }
    let b = o[0];
    d.groups = [b];
    for (let _e = 1; _e < o.length; _e++) {
        const nt = o[_e];
        b.materialIndex === nt.materialIndex ? b.count += nt.count : (b = nt,
        d.groups.push(b))
    }
    return d
}

export default mergeGroups;
