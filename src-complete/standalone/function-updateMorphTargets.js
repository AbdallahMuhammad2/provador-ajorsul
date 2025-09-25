/* Standalone Function: updateMorphTargets */

function updateMorphTargets(d, o) {
    if (d.updateMorphTargets(),
    o.weights !== void 0)
        for (let c = 0, h = o.weights.length; c < h; c++)
            d.morphTargetInfluences[c] = o.weights[c];
    if (o.extras && Array.isArray(o.extras.targetNames)) {
        const c = o.extras.targetNames;
        if (d.morphTargetInfluences.length === c.length) {
            d.morphTargetDictionary = {};
            for (let h = 0, _ = c.length; h < _; h++)
                d.morphTargetDictionary[c[h]] = h
        } else
            console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")
    }
}

export default updateMorphTargets;
