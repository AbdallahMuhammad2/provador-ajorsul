/* Standalone Function: assignBufferData */

function assignBufferData(d, o, c) {
    let h = !1
      , _ = -1;
    const b = d.attributes
      , _e = o.groupAttributes[0];
    for (const it in _e) {
        const at = o.getTotalLength(it)
          , ut = o.getType(it)
          , pt = o.getItemSize(it)
          , ht = o.getNormalized(it);
        let _t = b[it];
        (!_t || _t.array.length < at) && (_t = new three_module.THS(new ut(at),pt,ht),
        d.setAttribute(it, _t),
        h = !0);
        let vt = 0;
        for (let bt = 0, St = Math.min(c.length, o.groupCount); bt < St; bt++) {
            const At = c[bt].index
              , {array: Et, type: Pt, length: It} = o.groupAttributes[At][it]
              , Dt = new Pt(Et.buffer,0,It);
            _t.array.set(Dt, vt),
            vt += Dt.length
        }
        _t.needsUpdate = !0,
        _ = at / _t.itemSize
    }
    if (d.index) {
        const it = d.index.array;
        if (it.length < _)
            d.index = null,
            h = !0;
        else
            for (let at = 0, ut = it.length; at < ut; at++)
                it[at] = at
    }
    let nt = 0;
    d.clearGroups();
    for (let it = 0, at = Math.min(c.length, o.groupCount); it < at; it++) {
        const {index: ut, materialIndex: pt} = c[it]
          , ht = o.getCount(ut);
        ht !== 0 && (d.addGroup(nt, ht, pt),
        nt += ht)
    }
    d.setDrawRange(0, _),
    d.boundsTree = null,
    h && d.dispose()
}

export default assignBufferData;
