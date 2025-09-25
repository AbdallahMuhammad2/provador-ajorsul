/* Standalone Class: BumpMapMaterialExtension */

class BumpMapMaterialExtension extends GenericExtension {
    constructor() {
        super(...arguments),
        this.extensionName = BumpMapMaterialExtension.EXTENSION_NAME,
        this.textureChannels = {
            bumpTexture: index_modern_TextureChannel.R
        }
    }
}

export default BumpMapMaterialExtension;
