/* Standalone Class: GammaCorrectionPlugin */

class GammaCorrectionPlugin extends GenericExtensionPlugin {
    generateExtension(o) {
        return new GammaCorrectionExtension
    }
}

export default GammaCorrectionPlugin;
