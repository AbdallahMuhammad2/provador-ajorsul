/* Standalone Class: CustomBumpMapMaterialExtension */

class CustomBumpMapMaterialExtension extends GenericExtension {
    constructor() {
        super(...arguments),
        this.extensionName = CustomBumpMapMaterialExtension.EXTENSION_NAME,
        this.textureChannels = {
            customBumpMap: index_modern_TextureChannel.R | index_modern_TextureChannel.G | index_modern_TextureChannel.B
        }
    }
}

export default CustomBumpMapMaterialExtension;
