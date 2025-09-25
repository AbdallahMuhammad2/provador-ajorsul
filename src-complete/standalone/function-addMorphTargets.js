/* Standalone Function: addMorphTargets */

function addMorphTargets(d, o, c) {
    let h = !1
      , _ = !1
      , b = !1;
    for (let at = 0, ut = o.length; at < ut; at++) {
        const pt = o[at];
        if (pt.POSITION !== void 0 && (h = !0),
        pt.NORMAL !== void 0 && (_ = !0),
        pt.COLOR_0 !== void 0 && (b = !0),
        h && _ && b)
            break
    }
    if (!h && !_ && !b)
        return Promise.resolve(d);
    const _e = []
      , nt = []
      , it = [];
    for (let at = 0, ut = o.length; at < ut; at++) {
        const pt = o[at];
        if (h) {
            const ht = pt.POSITION !== void 0 ? c.getDependency("accessor", pt.POSITION) : d.attributes.position;
            _e.push(ht)
        }
        if (_) {
            const ht = pt.NORMAL !== void 0 ? c.getDependency("accessor", pt.NORMAL) : d.attributes.normal;
            nt.push(ht)
        }
        if (b) {
            const ht = pt.COLOR_0 !== void 0 ? c.getDependency("accessor", pt.COLOR_0) : d.attributes.color;
            it.push(ht)
        }
    }
    return Promise.all([Promise.all(_e), Promise.all(nt), Promise.all(it)]).then(function(at) {
        const ut = at[0]
          , pt = at[1]
          , ht = at[2];
        return h && (d.morphAttributes.position = ut),
        _ && (d.morphAttributes.normal = pt),
        b && (d.morphAttributes.color = ht),
        d.morphTargetsRelative = !0,
        d
    })
}

export default addMorphTargets;
