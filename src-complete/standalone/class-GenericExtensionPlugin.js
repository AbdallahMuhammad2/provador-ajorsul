/* Standalone Class: GenericExtensionPlugin */

class GenericExtensionPlugin extends AViewerPlugin {
    constructor() {
        super(...arguments),
        this.enabled = !0,
        this.dependencies = [CombinedPostPlugin]
    }
    get uiConfig() {
        var o;
        return (o = this._extension) === null || o === void 0 ? void 0 : o.uiConfig
    }
    get config() {
        return this._extension
    }
    disposeExtension() {}
    async onAdded(o) {
        var c;
        await super.onAdded(o),
        this._extension = this.generateExtension(o),
        (c = o.getPlugin(CombinedPostPlugin)) === null || c === void 0 || c.addExtension(this._extension)
    }
    async onRemove(o) {
        this.disposeExtension(),
        this._extension = void 0,
        await super.onRemove(o)
    }
}

export default GenericExtensionPlugin;
