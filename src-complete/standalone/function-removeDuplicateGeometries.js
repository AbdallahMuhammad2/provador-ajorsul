/* Standalone Function: removeDuplicateGeometries */

function removeDuplicateGeometries(d) {
    const o = [];
    d.traverse(_ => {
        _.geometry && o.push(_)
    }
    );
    const c = {}
      , h = {};
    o.forEach(_ => {
        var b;
        if (!c[_.geometry.uuid]) {
            const it = _.geometry.toJSON().data
              , at = it ? object_hash_default()({
                a: it.attributes || {},
                b: it.index || []
            }) : "";
            c[_.geometry.uuid] = at
        }
        const _e = c[_.geometry.uuid]
          , nt = (b = h[_e]) !== null && b !== void 0 ? b : h[_e] = [];
        nt.includes(_) || nt.push(_)
    }
    ),
    Object.values(h).forEach(_ => {
        if (_.length < 2)
            return;
        const b = _[0].geometry;
        _.forEach( (_e, nt) => {
            nt < 1 || (_e.geometry.dispose(),
            _e.geometry = b)
        }
        )
    }
    )
}

export default removeDuplicateGeometries;
