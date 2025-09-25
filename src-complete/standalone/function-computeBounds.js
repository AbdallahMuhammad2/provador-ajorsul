/* Standalone Function: computeBounds */

function computeBounds(d, o, c) {
    const h = o.attributes
      , _ = new three_module.NRn;
    if (h.POSITION === void 0)
        return;
    {
        const nt = c.json.accessors[h.POSITION]
          , it = nt.min
          , at = nt.max;
        if (it === void 0 || at === void 0)
            return void console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
        if (_.set(new three_module.Pq0(it[0],it[1],it[2]), new three_module.Pq0(at[0],at[1],at[2])),
        nt.normalized) {
            const ut = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[nt.componentType]);
            _.min.multiplyScalar(ut),
            _.max.multiplyScalar(ut)
        }
    }
    const b = o.targets;
    if (b !== void 0) {
        const nt = new three_module.Pq0
          , it = new three_module.Pq0;
        for (let at = 0, ut = b.length; at < ut; at++) {
            const pt = b[at];
            if (pt.POSITION !== void 0) {
                const ht = c.json.accessors[pt.POSITION]
                  , _t = ht.min
                  , vt = ht.max;
                if (_t !== void 0 && vt !== void 0) {
                    if (it.setX(Math.max(Math.abs(_t[0]), Math.abs(vt[0]))),
                    it.setY(Math.max(Math.abs(_t[1]), Math.abs(vt[1]))),
                    it.setZ(Math.max(Math.abs(_t[2]), Math.abs(vt[2]))),
                    ht.normalized) {
                        const bt = getNormalizedComponentScale(WEBGL_COMPONENT_TYPES[ht.componentType]);
                        it.multiplyScalar(bt)
                    }
                    nt.max(it)
                } else
                    console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")
            }
        }
        _.expandByVector(nt)
    }
    d.boundingBox = _;
    const _e = new three_module.iyt;
    _.getCenter(_e.center),
    _e.radius = _.min.distanceTo(_.max) / 2,
    d.boundingSphere = _e
}

export default computeBounds;
