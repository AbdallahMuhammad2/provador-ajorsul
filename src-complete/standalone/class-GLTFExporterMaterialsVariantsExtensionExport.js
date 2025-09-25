/* Standalone Class: GLTFExporterMaterialsVariantsExtensionExport */

class GLTFExporterMaterialsVariantsExtensionExport {
    constructor(o) {
        this.writer = o,
        this.name = khrMaterialsVariantsGLTF,
        this.variantNames = []
    }
    beforeParse(o) {
        const c = new Set;
        for (const h of o)
            h.traverse(_ => {
                if (!GLTFMaterialsVariantsExtensionExport_compatibleObject(_))
                    return;
                const b = _.userData._variantMaterials;
                for (const _e in b) {
                    const nt = b[_e];
                    compatibleMaterial(nt.material) && c.add(_e)
                }
            }
            );
        c.forEach(h => this.variantNames.push(h))
    }
    writeMesh(o, c) {
        var h;
        if (!GLTFMaterialsVariantsExtensionExport_compatibleObject(o))
            return;
        const _ = o.userData
          , b = _._variantMaterials
          , _e = {};
        for (const at in b) {
            const ut = b[at].material;
            if (!compatibleMaterial(ut))
                continue;
            const pt = this.variantNames.indexOf(at)
              , ht = this.writer.processMaterial(ut);
            _e[ht] || (_e[ht] = {
                material: ht,
                variants: []
            }),
            _e[ht].variants.push(pt)
        }
        const nt = Object.values(_e).map(at => at.variants.sort( (ut, pt) => ut - pt) && at).sort( (at, ut) => at.material - ut.material);
        if (nt.length === 0)
            return;
        const it = compatibleMaterial(_._originalMaterial) && (h = this.writer.processMaterial(_._originalMaterial)) !== null && h !== void 0 ? h : -1;
        for (const at of c.primitives)
            it >= 0 && (at.material = it),
            at.extensions = at.extensions || {},
            at.extensions[this.name] = {
                mappings: nt
            }
    }
    afterParse(o) {
        if (this.variantNames.length === 0)
            return;
        const c = this.writer.json;
        c.extensions = c.extensions || {};
        const h = this.variantNames.map(_ => ({
            name: _
        }));
        c.extensions[this.name] = {
            variants: h
        },
        this.writer.extensionsUsed[this.name] = !0
    }
}

export default GLTFExporterMaterialsVariantsExtensionExport;
