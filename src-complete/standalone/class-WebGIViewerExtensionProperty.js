/* Standalone Class: WebGIViewerExtensionProperty */

class WebGIViewerExtensionProperty extends index_modern_ExtensionProperty {
    constructor() {
        super(...arguments),
        this.extensionName = viewerGLTFExtension,
        this.parentTypes = [index_modern_PropertyType.SCENE],
        this.propertyType = "ViewerJSON"
    }
    init() {}
}

export default WebGIViewerExtensionProperty;
