/* Standalone Class: CoreViewerApp */

class CoreViewerApp extends ViewerApp {
    constructor(o) {
        super(o),
        this.licenseKey = o.licenseKey
    }
    async initialize({caching: o=!0, ground: c=!0, bloom: h=!0, depthTonemap: _=!0, enableDrop: b=!1, importPopup: _e=!0, debug: nt=!1, interactionPrompt: it=!0}={}) {
        nt && await this.addPlugin(DebugPlugin),
        this.getPlugin(AssetManagerPlugin) || this.addPluginSync(AssetManagerPlugin, void 0, void 0, {
            storage: o && window.caches ? await caches.open("webgi-cache-storage") : void 0
        }),
        await addBasePlugins(this, {
            ground: c,
            bloom: h,
            depthTonemap: _,
            enableDrop: b,
            importPopup: _e,
            interactionPrompt: it
        }),
        await this.getOrAddPlugin(PresetLibraryPlugin);
        const at = await this.getOrAddPlugin(DiamondPlugin);
        return this.licenseKey && at.setKey(this.licenseKey),
        await this.addPlugin(MaterialConfiguratorPlugin),
        await this.addPlugin(SwitchNodePlugin),
        await this.addPlugin(MaterialLibraryPlugin),
        this
    }
}

export default CoreViewerApp;
