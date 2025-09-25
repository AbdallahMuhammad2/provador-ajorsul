/* Standalone Function: getMeshoptFilter */

function getMeshoptFilter(d, o) {
    const c = o.getGraph().listParentEdges(d).filter(h => !(h.getParent()instanceof index_modern_Root));
    for (const h of c) {
        const _ = h.getName()
          , b = h.getAttributes().key || ""
          , _e = h.getParent().propertyType === index_modern_PropertyType.PRIMITIVE_TARGET;
        if (_ === "indices")
            return {
                filter: MeshoptFilter.NONE
            };
        if (_ === "attributes") {
            if (b === "POSITION")
                return {
                    filter: MeshoptFilter.NONE
                };
            if (b === "TEXCOORD_0")
                return {
                    filter: MeshoptFilter.NONE
                };
            if (b.startsWith("JOINTS_"))
                return {
                    filter: MeshoptFilter.NONE
                };
            if (b.startsWith("WEIGHTS_"))
                return {
                    filter: MeshoptFilter.NONE
                };
            if (b === "NORMAL" || b === "TANGENT")
                return _e ? {
                    filter: MeshoptFilter.NONE
                } : {
                    filter: MeshoptFilter.OCTAHEDRAL,
                    bits: 8
                }
        }
        if (_ === "output") {
            const nt = getTargetPath(d);
            return nt === "rotation" ? {
                filter: MeshoptFilter.QUATERNION,
                bits: 16
            } : nt === "translation" || nt === "scale" ? {
                filter: MeshoptFilter.EXPONENTIAL,
                bits: 12
            } : {
                filter: MeshoptFilter.NONE
            }
        }
        if (_ === "input")
            return {
                filter: MeshoptFilter.NONE
            };
        if (_ === "inverseBindMatrices")
            return {
                filter: MeshoptFilter.NONE
            }
    }
    return {
        filter: MeshoptFilter.NONE
    }
}

export default getMeshoptFilter;
