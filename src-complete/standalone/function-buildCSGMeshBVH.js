/* Standalone Function: buildCSGMeshBVH */

function buildCSGMeshBVH(d, o) {
    const c = new Evaluator;
    c.useGroups = !0,
    c.attributes = ["position", "normal", "uv"],
    d.forEach(b => {
        for (const _e of [...c.attributes])
            b[0].geometry.getAttribute(_e) || c.attributes.splice(c.attributes.indexOf(_e), 1)
    }
    );
    let h = new Brush(new three_module.bdM(.01,.01,2,2));
    d.forEach( ([b,_e]) => {
        if (!Object.keys(operations).includes(_e))
            return void console.error(`Unknown operation ${_e}`);
        b.updateMatrix(),
        b.updateMatrixWorld();
        const nt = new Brush;
        nt.geometry = b.geometry,
        nt.material = b.material,
        b.matrixWorld.decompose(nt.position, nt.quaternion, nt.scale),
        nt.updateMatrix(),
        nt.updateMatrixWorld(),
        h = c.evaluate(h, nt, operations[_e])
    }
    );
    const _ = h;
    return _.userData._isCSGMesh = !0,
    _
}

export default buildCSGMeshBVH;
