/* Standalone Class: AnisotropyMaterialExtension */

class AnisotropyMaterialExtension extends GenericExtension {
    constructor() {
        super(...arguments),
        this.extensionName = AnisotropyMaterialExtension.EXTENSION_NAME,
        this.textureChannels = {
            anisotropyDirection: index_modern_TextureChannel.R | index_modern_TextureChannel.G | index_modern_TextureChannel.B
        }
    }
}

export default AnisotropyMaterialExtension;
