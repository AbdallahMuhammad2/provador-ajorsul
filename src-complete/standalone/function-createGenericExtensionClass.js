/* Standalone Function: createGenericExtensionClass */

function createGenericExtensionClass(d, o) {
    var c;
    return c = class extends GenericExtension {
        constructor() {
            super(...arguments),
            this.extensionName = d,
            this.textureChannels = o ? Object.fromEntries(Object.entries(o).map( ([h,_]) => [h, typeof _ == "number" ? _ : stringToChannel(_)])) : {}
        }
    }
    ,
    c.EXTENSION_NAME = d,
    c
}

export default createGenericExtensionClass;
