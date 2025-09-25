/* Standalone Function: toTrianglesDrawMode */

function toTrianglesDrawMode(d, o) {
    if (o === three_module.RJ4)
        return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),
        d;
    if (o === three_module.rYR || o === three_module.O49) {
        let c = d.getIndex();
        if (c === null) {
            const _e = []
              , nt = d.getAttribute("position");
            if (nt === void 0)
                return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),
                d;
            for (let it = 0; it < nt.count; it++)
                _e.push(it);
            d.setIndex(_e),
            c = d.getIndex()
        }
        const h = c.count - 2
          , _ = [];
        if (o === three_module.rYR)
            for (let _e = 1; _e <= h; _e++)
                _.push(c.getX(0)),
                _.push(c.getX(_e)),
                _.push(c.getX(_e + 1));
        else
            for (let _e = 0; _e < h; _e++)
                _e % 2 == 0 ? (_.push(c.getX(_e)),
                _.push(c.getX(_e + 1)),
                _.push(c.getX(_e + 2))) : (_.push(c.getX(_e + 2)),
                _.push(c.getX(_e + 1)),
                _.push(c.getX(_e)));
        _.length / 3 !== h && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
        const b = d.clone();
        return b.setIndex(_),
        b.clearGroups(),
        b
    }
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", o),
    d
}

export default toTrianglesDrawMode;
