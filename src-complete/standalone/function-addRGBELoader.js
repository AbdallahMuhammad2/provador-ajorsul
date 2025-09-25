/* Standalone Function: addRGBELoader */

function addRGBELoader(d) {
    return new Importer(class extends RGBELoader {
        constructor(o) {
            super(o),
            this.setDataType(getTextureDataType(d.renderer.rendererObject))
        }
    }
    ,["hdr"],!1)
}

export default addRGBELoader;
