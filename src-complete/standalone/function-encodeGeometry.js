/* Standalone Function: encodeGeometry */

function encodeGeometry(d, o=DEFAULT_ENCODER_OPTIONS) {
    const c = dist_index_modern_extends({}, DEFAULT_ENCODER_OPTIONS, o);
    c.quantizationBits = dist_index_modern_extends({}, DEFAULT_QUANTIZATION_BITS, o.quantizationBits);
    const h = new encoderModule.MeshBuilder
      , _ = new encoderModule.Mesh
      , b = new encoderModule.ExpertEncoder(_)
      , _e = {}
      , nt = new encoderModule.DracoInt8Array
      , it = d.listTargets().length > 0;
    let at = !1;
    for (const bt of d.listSemantics()) {
        const St = d.getAttribute(bt);
        if (St.getSparse()) {
            at = !0;
            continue
        }
        const At = getAttributeEnum(bt)
          , Et = addAttribute(h, St.getComponentType(), _, encoderModule[At], St.getCount(), St.getElementSize(), St.getArray());
        if (Et === -1)
            throw new Error(`Error compressing "${bt}" attribute.`);
        if (_e[bt] = Et,
        c.quantizationVolume === "mesh" || bt !== "POSITION")
            b.SetAttributeQuantization(Et, c.quantizationBits[At]);
        else {
            if (typeof c.quantizationVolume != "object")
                throw new Error("Invalid quantization volume state.");
            {
                const {quantizationVolume: Pt} = c
                  , It = Math.max(Pt.max[0] - Pt.min[0], Pt.max[1] - Pt.min[1], Pt.max[2] - Pt.min[2]);
                b.SetAttributeExplicitQuantization(Et, c.quantizationBits[At], St.getElementSize(), Pt.min, It)
            }
        }
    }
    const ut = d.getIndices();
    if (!ut)
        throw new EncodingError("Primitive must have indices.");
    h.AddFacesToMesh(_, ut.getCount() / 3, ut.getArray()),
    b.SetSpeedOptions(c.encodeSpeed, c.decodeSpeed),
    b.SetTrackEncodedProperties(!0),
    c.method === index_modern_EncoderMethod.SEQUENTIAL || it || at ? b.SetEncodingMethod(encoderModule.MESH_SEQUENTIAL_ENCODING) : b.SetEncodingMethod(encoderModule.MESH_EDGEBREAKER_ENCODING);
    const pt = b.EncodeToDracoBuffer(!(it || at), nt);
    if (pt <= 0)
        throw new EncodingError("Error applying Draco compression.");
    const ht = new Uint8Array(pt);
    for (let bt = 0; bt < pt; ++bt)
        ht[bt] = nt.GetValue(bt);
    const _t = b.GetNumberOfEncodedPoints()
      , vt = 3 * b.GetNumberOfEncodedFaces();
    return encoderModule.destroy(nt),
    encoderModule.destroy(_),
    encoderModule.destroy(h),
    encoderModule.destroy(b),
    {
        numVertices: _t,
        numIndices: vt,
        data: ht,
        attributeIDs: _e
    }
}

export default encodeGeometry;
