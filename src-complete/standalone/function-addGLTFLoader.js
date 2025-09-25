/* Standalone Function: addGLTFLoader */

function addGLTFLoader(d) {
    return new Importer(GLTFLoader2,["gltf", "glb", "data:model/gltf"],!0, (o, c) => {
        if (!o)
            return o;
        const h = o
          , _ = new ObjectLoader2(c.loadingManager);
        return h.register(gltfMaterialExtrasParser(_, d)),
        h.register(gltfObject3DExtrasParser()),
        h.register(gltfLightExtrasParser(_)),
        h.register(b => new GLTFMaterialsBumpMapExtension(b)),
        h.register(b => new GLTFMaterialsDisplacementMapExtension(b)),
        h.register(b => new GLTFMaterialsLightMapExtension(b)),
        h.register(b => new GLTFMaterialsAlphaMapExtension(b)),
        h.register(b => {
            var _e, nt, it, at, ut, pt, ht, _t, vt;
            const bt = b.getDependency;
            b.getDependency = async (Dt, Gt) => {
                const Bt = await bt.call(b, Dt, Gt);
                if (Bt && Bt.userData) {
                    const kt = Bt.userData.gltfExtensions;
                    delete Bt.userData.gltfExtensions,
                    Bt.userData = deserializeObject(Bt.userData, {}, !1, {}),
                    Bt.userData.gltfExtensions = kt
                }
                return Bt
            }
            ;
            const St = esm_browser_v4() + ".drc"
              , At = esm_browser_v4() + ".ktx2"
              , Et = (it = (nt = (_e = b.json) === null || _e === void 0 ? void 0 : _e.extensionsRequired) === null || nt === void 0 ? void 0 : nt.includes) === null || it === void 0 ? void 0 : it.call(nt, "KHR_draco_mesh_compression");
            if (Et) {
                const Dt = c.registerFile(St);
                Dt && h.setDRACOLoader(Dt)
            }
            !((pt = (ut = (at = b.json) === null || at === void 0 ? void 0 : at.extensionsUsed) === null || ut === void 0 ? void 0 : ut.includes) === null || pt === void 0) && pt.call(ut, "EXT_meshopt_compression") && (window.MeshoptDecoder ? (h.setMeshoptDecoder(window.MeshoptDecoder),
            b.options.meshoptDecoder = window.MeshoptDecoder) : console.error("Add GLTFMeshOptPlugin to viewer to enable EXT_meshopt_compression decode"));
            const Pt = c.registerFile(At)
              , It = supportedEmbeddedFiles.map(Dt => esm_browser_v4() + "." + Dt);
            return It.forEach(Dt => c.registerFile(Dt)),
            !((vt = (_t = (ht = b.json) === null || ht === void 0 ? void 0 : ht.extensionsUsed) === null || _t === void 0 ? void 0 : _t.includes) === null || vt === void 0) && vt.call(_t, "KHR_texture_basisu") && Pt && (h.setKTX2Loader(Pt),
            b.options.ktx2Loader = Pt),
            {
                name: "GLTF2_HELPER_PLUGIN",
                afterRoot: async Dt => {
                    Et && c.unregisterFile(St),
                    Pt && c.unregisterFile(At),
                    It.forEach(Bt => c.unregisterFile(Bt));
                    const Gt = await importViewer(b, d, _);
                    Dt.scene && (Dt.scene.__importedViewerConfig = Gt)
                }
            }
        }
        ),
        h
    }
    )
}

export default addGLTFLoader;
