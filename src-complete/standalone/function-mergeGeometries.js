/* Standalone Function: mergeGeometries */

function mergeGeometries(d, o=!1) {
    const c = d[0].index !== null
      , h = new Set(Object.keys(d[0].attributes))
      , _ = new Set(Object.keys(d[0].morphAttributes))
      , b = {}
      , _e = {}
      , nt = d[0].morphTargetsRelative
      , it = new three_module.LoY;
    let at = 0;
    for (let ut = 0; ut < d.length; ++ut) {
        const pt = d[ut];
        let ht = 0;
        if (c !== (pt.index !== null))
            return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + ut + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),
            null;
        for (const _t in pt.attributes) {
            if (!h.has(_t))
                return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + ut + '. All geometries must have compatible attributes; make sure "' + _t + '" attribute exists among all geometries, or in none of them.'),
                null;
            b[_t] === void 0 && (b[_t] = []),
            b[_t].push(pt.attributes[_t]),
            ht++
        }
        if (ht !== h.size)
            return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + ut + ". Make sure all geometries have the same number of attributes."),
            null;
        if (nt !== pt.morphTargetsRelative)
            return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + ut + ". .morphTargetsRelative must be consistent throughout all geometries."),
            null;
        for (const _t in pt.morphAttributes) {
            if (!_.has(_t))
                return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + ut + ".  .morphAttributes must be consistent throughout all geometries."),
                null;
            _e[_t] === void 0 && (_e[_t] = []),
            _e[_t].push(pt.morphAttributes[_t])
        }
        if (o) {
            let _t;
            if (c)
                _t = pt.index.count;
            else {
                if (pt.attributes.position === void 0)
                    return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + ut + ". The geometry must have either an index or a position attribute"),
                    null;
                _t = pt.attributes.position.count
            }
            it.addGroup(at, _t, ut),
            at += _t
        }
    }
    if (c) {
        let ut = 0;
        const pt = [];
        for (let ht = 0; ht < d.length; ++ht) {
            const _t = d[ht].index;
            for (let vt = 0; vt < _t.count; ++vt)
                pt.push(_t.getX(vt) + ut);
            ut += d[ht].attributes.position.count
        }
        it.setIndex(pt)
    }
    for (const ut in b) {
        const pt = mergeAttributes(b[ut]);
        if (!pt)
            return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + ut + " attribute."),
            null;
        it.setAttribute(ut, pt)
    }
    for (const ut in _e) {
        const pt = _e[ut][0].length;
        if (pt === 0)
            break;
        it.morphAttributes = it.morphAttributes || {},
        it.morphAttributes[ut] = [];
        for (let ht = 0; ht < pt; ++ht) {
            const _t = [];
            for (let bt = 0; bt < _e[ut].length; ++bt)
                _t.push(_e[ut][bt][ht]);
            const vt = mergeAttributes(_t);
            if (!vt)
                return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + ut + " morphAttribute."),
                null;
            it.morphAttributes[ut].push(vt)
        }
    }
    return it
}

export default mergeGeometries;
