/* Standalone Class: GLTFMaterialsVariantsExtensionImport */

class GLTFMaterialsVariantsExtensionImport {
    constructor(o) {
        this.parser = o,
        this.name = khrMaterialsVariantsGLTF
    }
    async afterRoot(o) {
        const c = this.parser
          , h = c.json;
        if (!h.extensions || !h.extensions[this.name])
            return;
        const _ = h.extensions[this.name].variants || []
          , b = ensureUniqueNames(_.map(_e => _e.name));
        for (const _e of o.scenes)
            _e.traverse(nt => {
                const it = c.associations.get(nt);
                if (!it || it.meshes === void 0 || it.primitives === void 0)
                    return;
                const at = h.meshes[it.meshes].primitives[it.primitives].extensions;
                at && at[this.name] && (nt.userData._variantMaterials = mappingsArrayToTable(at[this.name], b))
            }
            );
        await Promise.all(o.scenes.map(async _e => {
            const nt = [];
            return _e.traverse(it => compatibleObject(it) && nt.push((async at => {
                const ut = at.material
                  , pt = at.userData._variantMaterials
                  , ht = [];
                for (const _t in pt) {
                    const vt = pt[_t];
                    if (vt.material)
                        continue;
                    const bt = vt.gltfMaterialIndex;
                    ht.push(c.getDependency("material", bt).then(St => {
                        at.material = St,
                        c.assignFinalMaterial(at),
                        pt[_t].material = at.material
                    }
                    ))
                }
                return Promise.all(ht).then( () => {
                    at.material = ut
                }
                )
            }
            )(it))),
            _e.userData.__importData || (_e.userData.__importData = {}),
            _e.userData.__importData[khrMaterialsVariantsGLTF] = {
                names: b
            },
            Promise.all(nt)
        }
        ))
    }
}

export default GLTFMaterialsVariantsExtensionImport;
