/* Standalone Class: AlphaMapMaterialExtension */

class AlphaMapMaterialExtension extends GenericExtension {
    constructor() {
        super(...arguments),
        this.extensionName = AlphaMapMaterialExtension.EXTENSION_NAME,
        this.textureChannels = {
            alphaTexture: index_modern_TextureChannel.G
        }
    }
}

export default AlphaMapMaterialExtension;
