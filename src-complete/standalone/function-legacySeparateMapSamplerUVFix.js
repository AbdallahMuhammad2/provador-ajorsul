/* Standalone Function: legacySeparateMapSamplerUVFix */

function legacySeparateMapSamplerUVFix(d, o) {
    const c = (d.version ? d.version : "0.0.0").split(".").map(_ => parseInt(_));
    if (d.type !== "ViewerApp" || c[0] !== 0 || !(c[1] < 7 || c[1] === 7 && c[2].toString()[0] < "6"))
        return;
    const h = new Set;
    o.forEach(_ => _.traverse(b => {
        b.material && h.add(b.material)
    }
    )),
    h.forEach(_ => {
        const b = _.map;
        if (!b)
            return;
        const _e = b.repeat
          , nt = b.offset
          , it = b.center
          , at = b.rotation;
        ["alphaMap", "aoMap", "bumpMap", "displacementMap", "emissiveMap", "lightMap", "metalnessMap", "normalMap", "roughnessMap", "transmissionMap"].forEach(ut => {
            const pt = _[ut];
            pt && (pt.repeat.copy(_e),
            pt.offset.copy(nt),
            pt.center.copy(it),
            pt.rotation = at,
            pt.needsUpdate = !0)
        }
        ),
        _.needsUpdate = !0
    }
    )
}

export default legacySeparateMapSamplerUVFix;
