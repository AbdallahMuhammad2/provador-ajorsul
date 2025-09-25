/* Standalone Function: three_to_cannon_modern_mergeBufferGeometries */

function three_to_cannon_modern_mergeBufferGeometries(d) {
    let o = 0;
    for (let _ = 0; _ < d.length; _++) {
        const b = d[_].attributes.position;
        b && b.itemSize === 3 && (o += b.count)
    }
    const c = new Float32Array(3 * o);
    let h = 0;
    for (let _ = 0; _ < d.length; _++) {
        const b = d[_].attributes.position;
        if (b && b.itemSize === 3)
            for (let _e = 0; _e < b.count; _e++)
                c[h++] = b.getX(_e),
                c[h++] = b.getY(_e),
                c[h++] = b.getZ(_e)
    }
    return new three_module.LoY().setAttribute("position", new three_module.THS(c,3))
}

export default three_to_cannon_modern_mergeBufferGeometries;
