/* Standalone Class: LightExtrasExtension */

class LightExtrasExtension extends GenericExtension {
    constructor() {
        super(...arguments),
        this.extensionName = LightExtrasExtension.EXTENSION_NAME
    }
}

export default LightExtrasExtension;
