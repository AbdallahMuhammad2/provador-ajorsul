/* Standalone Class: DisplacementMapMaterialExtension */

class DisplacementMapMaterialExtension extends GenericExtension {
    constructor() {
        super(...arguments),
        this.extensionName = DisplacementMapMaterialExtension.EXTENSION_NAME,
        this.textureChannels = {
            displacementTexture: index_modern_TextureChannel.R
        }
    }
}

export default DisplacementMapMaterialExtension;
