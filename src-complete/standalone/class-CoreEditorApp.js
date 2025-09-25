/* Standalone Class: CoreEditorApp */

class CoreEditorApp extends ViewerApp {
    get editorInitialized() {
        return this._editorInitialized
    }
    constructor(o) {
        super(o),
        this._editorInitialized = !1,
        this.defaultModes = [{
            title: "Viewer",
            plugins: [RendererUiPlugin, CameraUiPlugin, PresetLibraryPlugin, DropzonePlugin]
        }, {
            title: "Picking",
            plugins: [HierarchyUiPlugin, PickingPlugin, TransformControlsPlugin, DiamondPlugin, MaterialLibraryPlugin, XAtlasPlugin, Object3DWidgetsPlugin]
        }, {
            title: "Scene",
            plugins: [SimpleBackgroundEnvUiPlugin, GroundPlugin, SimpleViewerUi, LightsUiPlugin, SceneCamerasUiPlugin, RandomizedDirectionalLightPlugin, HDRiGroundPlugin, ContactShadowGroundPlugin, GeometryGeneratorPlugin, GradientSvgPlugin]
        }, {
            title: "Anti-aliasing",
            plugins: [ProgressivePlugin, TemporalAAPlugin, VelocityBufferPlugin]
        }, {
            title: "Post Processing",
            plugins: [TonemapPlugin, OutlinePlugin, LUTPlugin, ChromaticAberrationPlugin, FilmicGrainPlugin, VignettePlugin, SSRPlugin, SSAOPlugin, BloomPlugin, DepthOfFieldPlugin, SSGIPlugin, SSContactShadows, SSBevelPlugin]
        }, {
            title: "Export",
            plugins: [AssetExporterPlugin, CanvasSnipperPlugin, CanvasRecorderPlugin, AWSClientPlugin, TransfrSharePlugin]
        }, {
            title: "Animations",
            plugins: [GLTFAnimationPlugin, CameraViewPlugin, AnimationObjectPlugin, ScrollableCameraViewPreviewPlugin, CannonPhysicsPlugin, PosePlugin]
        }, {
            title: "Modifiers",
            plugins: [ObjectRotationPlugin, ShapeTubeExtrudePlugin, SimpleTextPlugin, ParallaxMappingPlugin, CSGPluginBSP, CSGPluginBVH, ParallaxCameraControllerPlugin, MeshOptSimplifyModifierPlugin]
        }, {
            title: "Configurators",
            plugins: [SwitchNodePlugin, MaterialConfiguratorPlugin, GLTFKHRMaterialVariantsPlugin, VariationConfiguratorEditorUiPlugin]
        }, {
            title: "Plugins",
            plugins: [InteractionPromptPlugin, AnisotropyPlugin, FullScreenPlugin, CustomBumpMapPlugin, FrameFadePlugin, ClearcoatTintPlugin, ThinFilmLayerPlugin, FragmentClippingExtensionPlugin, NormalBufferPlugin, NoiseBumpMaterialPlugin, LoadingScreenPlugin, CSS3DRendererPlugin, Rhino3dmLoadPlugin, ModelStagePlugin, WatchHandsPlugin]
        }, {
            title: "Extras",
            plugins: [ExtrasUiPlugin, SnowFallPlugin, WaveGroundPlugin, VRPluginBasic, VirtualCamerasPlugin, RainbowDiamondPlugin, BeringRingAnimation]
        }],
        setupModesStyles();
        const c = this.scene.activeCamera.controls;
        c && (c.autoPushTarget2 = !0)
    }
    async setupUi(o, c) {
        await setupModesUi(this, o, c ?? this.defaultModes),
        this._editorInitialized = !0
    }
}

export default CoreEditorApp;
