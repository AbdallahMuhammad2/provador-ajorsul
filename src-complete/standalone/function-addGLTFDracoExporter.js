/* Standalone Function: addGLTFDracoExporter */

function addGLTFDracoExporter(d, o, c) {
    return addGLTFExporter(d, o, GLTFDracoExporter, h => {
        const _ = esm_browser_v4() + ".drc"
          , b = h;
        b.loader = c.registerFile(_),
        b.loader.setDecoderConfig({
            type: "js"
        }),
        b.loader.preload(!0, !0)
    }
    )
}

export default addGLTFDracoExporter;
