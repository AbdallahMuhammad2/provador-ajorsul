/* Standalone Class: GenericExtensionProperty */

class GenericExtensionProperty extends index_modern_ExtensionProperty {
    addTexture(o, c, h, _=4369) {
        this.setRef(o, h, {
            channels: _
        }),
        this.textures[o] = [c, h]
    }
    constructor(o, c, h) {
        super(o, c),
        this.parentTypes = [index_modern_PropertyType.MATERIAL, index_modern_PropertyType.MESH, index_modern_PropertyType.NODE, index_modern_PropertyType.SCENE],
        this.propertyType = "GenericExtension",
        this.textures = {},
        this.extensionName = h
    }
    init() {}
}

export default GenericExtensionProperty;
