/* Standalone Function: getBounds */

function getBounds(d) {
    const o = createBounds()
      , c = d.propertyType === index_modern_PropertyType.NODE ? [d] : d.listChildren();
    for (const h of c)
        h.traverse(_ => {
            const b = _.getMesh();
            if (!b)
                return;
            const _e = getMeshBounds(b, _.getWorldMatrix());
            _e.min.every(isFinite) && _e.max.every(isFinite) && (expandBounds(_e.min, o),
            expandBounds(_e.max, o))
        }
        );
    return o
}

export default getBounds;
