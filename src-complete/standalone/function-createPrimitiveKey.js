/* Standalone Function: createPrimitiveKey */

function createPrimitiveKey(d) {
    let o;
    const c = d.extensions && d.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION];
    if (o = c ? "draco:" + c.bufferView + ":" + c.indices + ":" + createAttributesKey(c.attributes) : d.indices + ":" + createAttributesKey(d.attributes) + ":" + d.mode,
    d.targets !== void 0)
        for (let h = 0, _ = d.targets.length; h < _; h++)
            o += ":" + createAttributesKey(d.targets[h]);
    return o
}

export default createPrimitiveKey;
