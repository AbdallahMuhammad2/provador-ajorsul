/* Standalone Class: VJSONPresetGroup */

class VJSONPresetGroup extends PresetGroup {
    constructor() {
        super(...arguments),
        this.name = "VJSON",
        this.usePresetCamera = !1,
        this.usePresetLoadingPlugin = !1,
        this.usePresetInteractionPlugin = !1,
        this.usePresetParallaxMappingPlugin = !1,
        this.usePresetRendererUiPlugin = !1,
        this.usePresetCameraViewPlugin = !1,
        this.usePresetMaterialConfiguratorPlugin = !1,
        this.usePresetSwitchNodePlugin = !1
    }
    async apply(o, c) {
        const h = o.scene.activeCamera.toJSON()
          , _ = o.serializePluginsIgnored;
        o.serializePluginsIgnored = [..._, this.usePresetLoadingPlugin ? null : "LoadingScreenPlugin", this.usePresetInteractionPlugin ? null : "InteractionPromptPlugin", this.usePresetParallaxMappingPlugin ? null : "ReliefParallaxMapping", this.usePresetRendererUiPlugin ? null : "RendererParamsUiPlugin", this.usePresetCameraViewPlugin ? null : "CameraViews", this.usePresetMaterialConfiguratorPlugin ? null : "MaterialConfiguratorPlugin", this.usePresetSwitchNodePlugin ? null : "SwitchNodePlugin", "FrameFade", "GLTFAnimationPlugin", "ModelStagePlugin", "AssetExporterPlugin"].filter(_e => _e);
        const b = await super.apply(o, c);
        return o.serializePluginsIgnored = _,
        this.usePresetCamera || o.scene.activeCamera.fromJSON(h),
        b
    }
}

export default VJSONPresetGroup;
