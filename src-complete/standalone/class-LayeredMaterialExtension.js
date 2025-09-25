/* Standalone Class: LayeredMaterialExtension */

class LayeredMaterialExtension extends GenericExtension {
    constructor() {
        super(...arguments),
        this.extensionName = LayeredMaterialExtension.EXTENSION_NAME
    }
}

export default LayeredMaterialExtension;
