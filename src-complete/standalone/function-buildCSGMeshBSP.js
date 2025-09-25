/* Standalone Function: buildCSGMeshBSP */

function buildCSGMeshBSP(d, o) {
    let c = new CSG;
    const h = d.map(b => b[0].material).flatMap(b => b);
    d.forEach( ([b,_e]) => {
        if (!csgOperations.includes(_e))
            return void console.error(`Unknown operation ${_e}`);
        b.updateMatrix(),
        b.updateMatrixWorld();
        const nt = b.matrix;
        b.matrix = b.matrixWorld;
        let it = 0;
        it = Array.isArray(b.material) ? void 0 : h.indexOf(b.material),
        c = c[_e](CSG.fromMesh(b, it)),
        b.matrix = nt
    }
    );
    const _ = c.toMesh(o ?? new three_module.kn4().identity(), h);
    return _.userData._isCSGMesh = !0,
    _.geometry.groups = _.geometry.groups.filter(b => b.count > 0),
    _
}

export default buildCSGMeshBSP;
