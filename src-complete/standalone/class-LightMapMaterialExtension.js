/* Standalone Class: LightMapMaterialExtension */

class LightMapMaterialExtension extends GenericExtension {
    constructor() {
        super(...arguments),
        this.extensionName = LightMapMaterialExtension.EXTENSION_NAME,
        this.textureChannels = {
            lightMapTexture: index_modern_TextureChannel.R | index_modern_TextureChannel.G | index_modern_TextureChannel.B
        }
    }
}

export default LightMapMaterialExtension;
