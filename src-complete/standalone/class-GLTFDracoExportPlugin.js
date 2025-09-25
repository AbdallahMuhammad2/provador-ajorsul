/* Standalone Class: GLTFDracoExportPlugin */

class GLTFDracoExportPlugin extends AViewerPlugin {
    constructor() {
        super(...arguments),
        this.enabled = !0,
        this.dependencies = [AssetManagerPlugin, AssetExporterPlugin]
    }
    async onAdded(o) {
        await super.onAdded(o);
        const c = o.getManager().importer
          , h = o.getManager().exporter;
        if (!c)
            throw new Error("GLTFDracoExportPlugin: AssetImporter not found");
        addGLTFDracoExporter(h, o, c)
    }
}

export default GLTFDracoExportPlugin;
