/* Standalone Function: addPrimitiveAttributes */

function addPrimitiveAttributes(d, o, c) {
    const h = o.attributes
      , _ = [];
    function b(_e, nt) {
        return c.getDependency("accessor", _e).then(function(it) {
            d.setAttribute(nt, it)
        })
    }
    for (const _e in h) {
        const nt = ATTRIBUTES[_e] || _e.toLowerCase();
        nt in d.attributes || _.push(b(h[_e], nt))
    }
    if (o.indices !== void 0 && !d.index) {
        const _e = c.getDependency("accessor", o.indices).then(function(nt) {
            d.setIndex(nt)
        });
        _.push(_e)
    }
    return three_module.ppV.workingColorSpace !== three_module.Zr2 && "COLOR_0"in h && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${three_module.ppV.workingColorSpace}" not supported.`),
    assignExtrasToUserData(d, o),
    computeBounds(d, o, c),
    Promise.all(_).then(function() {
        return o.targets !== void 0 ? addMorphTargets(d, o.targets, c) : d
    })
}

export default addPrimitiveAttributes;
