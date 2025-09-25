/* Standalone Class: CustomAnimationHelperPlugin */

class CustomAnimationHelperPlugin extends AViewerPlugin {
    constructor() {
        super(),
        this.helperIdentities = new Map
    }
    async onAdded(o) {
        var c;
        await super.onAdded(o),
        (c = this._viewer) === null || c === void 0 || c.addEventListener("postFrame", () => {
            this.helperIdentities.forEach(h => {
                var _;
                h.update() && ((_ = this._viewer) === null || _ === void 0 || _.setDirty())
            }
            )
        }
        )
    }
    createHelper(o, c) {
        var h;
        if (this.helperIdentities.has(o))
            (h = this._viewer) === null || h === void 0 || h.console.warn("Helper with this id already exists");
        else {
            const _ = new CustomAnimationHelper;
            _.loadModel(c),
            this.helperIdentities.set(o, _)
        }
    }
    getAnimationClips(o) {
        if (this.helperIdentities.has(o))
            return this.helperIdentities.get(o).getAnimationClips
    }
    async playClip(o, c, h, _=1, b=!1, _e=!1) {
        this.helperIdentities.has(o) && await this.helperIdentities.get(o).playClip(c, h, _, b, _e)
    }
    async playAllAnimations(o, c) {
        this.helperIdentities.has(o) && await this.helperIdentities.get(o).playAllAnimations(c)
    }
    async playAllAnimationsInReverse(o, c) {
        this.helperIdentities.has(o) && await this.helperIdentities.get(o).reverseAllAnimation(c)
    }
    async playAnimationByName(o, c, h, _=1, b=!1) {
        this.helperIdentities.has(o) && await this.helperIdentities.get(o).playClipByName(c, h, _, b)
    }
}

export default CustomAnimationHelperPlugin;
