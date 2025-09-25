/* Standalone Function: metalRough */

function metalRough(d=METALROUGH_DEFAULTS) {
    return createTransform(functions_modern_NAME$d, async o => {
        const c = o.getLogger();
        if (!o.getRoot().listExtensionsUsed().map(nt => nt.extensionName).includes("KHR_materials_pbrSpecularGlossiness"))
            return void c.warn(`${functions_modern_NAME$d}: KHR_materials_pbrSpecularGlossiness not found on document.`);
        const h = o.createExtension(KHRMaterialsIOR)
          , _ = o.createExtension(KHRMaterialsSpecular)
          , b = o.createExtension(KHRMaterialsPBRSpecularGlossiness)
          , _e = new Set;
        for (const nt of o.getRoot().listMaterials()) {
            const it = nt.getExtension("KHR_materials_pbrSpecularGlossiness");
            if (!it)
                continue;
            const at = _.createSpecular().setSpecularFactor(1).setSpecularColorFactor(it.getSpecularFactor());
            _e.add(it.getSpecularGlossinessTexture()),
            _e.add(nt.getBaseColorTexture()),
            _e.add(nt.getMetallicRoughnessTexture()),
            nt.setBaseColorFactor(it.getDiffuseFactor()).setMetallicFactor(0).setRoughnessFactor(1).setExtension("KHR_materials_ior", h.createIOR().setIOR(1e3)).setExtension("KHR_materials_specular", at);
            const ut = it.getDiffuseTexture();
            ut && (nt.setBaseColorTexture(ut),
            nt.getBaseColorTextureInfo().copy(it.getDiffuseTextureInfo()));
            const pt = it.getSpecularGlossinessTexture();
            if (pt) {
                const ht = it.getSpecularGlossinessTextureInfo()
                  , _t = o.createTexture();
                await rewriteTexture(pt, _t, (St, At, Et) => {
                    St.set(At, Et, 3, 255)
                }
                ),
                at.setSpecularTexture(_t),
                at.setSpecularColorTexture(_t),
                at.getSpecularTextureInfo().copy(ht),
                at.getSpecularColorTextureInfo().copy(ht);
                const vt = it.getGlossinessFactor()
                  , bt = o.createTexture();
                await rewriteTexture(pt, bt, (St, At, Et) => {
                    const Pt = 255 - Math.round(St.get(At, Et, 3) * vt);
                    St.set(At, Et, 0, 0),
                    St.set(At, Et, 1, Pt),
                    St.set(At, Et, 2, 0),
                    St.set(At, Et, 3, 255)
                }
                ),
                nt.setMetallicRoughnessTexture(bt),
                nt.getMetallicRoughnessTextureInfo().copy(ht)
            } else
                at.setSpecularColorFactor(it.getSpecularFactor()),
                nt.setRoughnessFactor(1 - it.getGlossinessFactor());
            nt.setExtension("KHR_materials_pbrSpecularGlossiness", null)
        }
        b.dispose();
        for (const nt of _e)
            nt && nt.listParents().length === 1 && nt.dispose();
        c.debug(`${functions_modern_NAME$d}: Complete.`)
    }
    )
}

export default metalRough;
