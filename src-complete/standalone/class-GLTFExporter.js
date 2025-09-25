/* Standalone Class: GLTFExporter */

class GLTFExporter {
    constructor() {
        this.pluginCallbacks = [],
        this.register(function(o) {
            return new GLTFLightExtension(o)
        }),
        this.register(function(o) {
            return new GLTFExporter_GLTFMaterialsUnlitExtension(o)
        }),
        this.register(function(o) {
            return new GLTFExporter_GLTFMaterialsTransmissionExtension(o)
        }),
        this.register(function(o) {
            return new GLTFExporter_GLTFMaterialsVolumeExtension(o)
        }),
        this.register(function(o) {
            return new GLTFExporter_GLTFMaterialsIorExtension(o)
        }),
        this.register(function(o) {
            return new GLTFExporter_GLTFMaterialsSpecularExtension(o)
        }),
        this.register(function(o) {
            return new GLTFExporter_GLTFMaterialsClearcoatExtension(o)
        }),
        this.register(function(o) {
            return new GLTFExporter_GLTFMaterialsIridescenceExtension(o)
        }),
        this.register(function(o) {
            return new GLTFExporter_GLTFMaterialsSheenExtension(o)
        }),
        this.register(function(o) {
            return new GLTFExporter_GLTFMaterialsAnisotropyExtension(o)
        }),
        this.register(function(o) {
            return new GLTFExporter_GLTFMaterialsEmissiveStrengthExtension(o)
        })
    }
    register(o) {
        return this.pluginCallbacks.indexOf(o) === -1 && this.pluginCallbacks.push(o),
        this
    }
    unregister(o) {
        return this.pluginCallbacks.indexOf(o) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(o), 1),
        this
    }
    parse(o, c, h, _, b) {
        const _e = b || new GLTFWriter
          , nt = [];
        for (let it = 0, at = this.pluginCallbacks.length; it < at; it++)
            nt.push(this.pluginCallbacks[it](_e));
        _e.setPlugins(nt),
        _e.write(o, c, _).catch(h)
    }
    parseAsync(o, c) {
        const h = this;
        return new Promise(function(_, b) {
            h.parse(o, _, b, c)
        }
        )
    }
}

export default GLTFExporter;
