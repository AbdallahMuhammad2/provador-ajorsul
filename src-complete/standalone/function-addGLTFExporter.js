/* Standalone Function: addGLTFExporter */

function addGLTFExporter(d, o, c=GLTFExporter2, h) {
    var _;
    if (!o)
        return;
    const b = d.Exporters.findIndex(nt => nt.ext.includes("gltf") || nt.ext.includes("glb"))
      , _e = [];
    b >= 0 ? (_e.push(...(_ = d.Exporters[b].extensions) !== null && _ !== void 0 ? _ : []),
    d.Exporters.splice(b, 1)) : (_e.push(gltfMaterialExtrasWriter),
    _e.push(gltfObject3DExtrasWriter),
    _e.push(gltfLightExtrasWriter),
    _e.push(nt => new GLTFMeshGpuInstancingExporter(nt)),
    _e.push(nt => new GLTFMaterialsBumpMapExtensionExport(nt)),
    _e.push(nt => new GLTFMaterialsDisplacementMapExtensionExport(nt)),
    _e.push(nt => new GLTFMaterialsLightMapExtensionExport(nt)),
    _e.push(nt => new GLTFMaterialsAlphaMapExtensionExport(nt))),
    d.Exporters.push({
        ctor: () => {
            const nt = new c;
            return _e.forEach(it => nt.register(it)),
            nt.register(it => ({
                afterParse: at => {
                    var ut, pt;
                    if (!(!((ut = (at = Array.isArray(at) ? at[0] : at) == null ? void 0 : at.userData) === null || ut === void 0) && ut.rootSceneModelRoot) || ((pt = at == null ? void 0 : at.userData) === null || pt === void 0 ? void 0 : pt.__exportViewerConfig) === !1)
                        return;
                    const ht = it.json.scenes[it.json.scene || 0];
                    ht.extensions || (ht.extensions = {}),
                    ht.extensions[viewerGLTFExtension] = processViewer(o, it),
                    it.extensionsUsed[viewerGLTFExtension] = !0
                }
            })),
            h == null || h(nt),
            nt
        }
        ,
        ext: ["gltf", "glb"],
        extensions: _e
    })
}

export default addGLTFExporter;
