/* Standalone Class: CustomAnimationHelper */

class CustomAnimationHelper {
    constructor() {
        this._animations = [],
        this._playingAnimations = new Set,
        this._clock = new three_module.zD7
    }
    loadModel(o) {
        this._model = o,
        this.mixer = new three_module.Iw4(o),
        o && (this._animations = [...o.animations])
    }
    get getMixer() {
        return this.mixer
    }
    get getAnimationClips() {
        return this._animations
    }
    async playAllAnimations(o) {
        var c;
        const h = [];
        (c = this._animations) === null || c === void 0 || c.forEach(_ => {
            h.push(this.playClip(_, o))
        }
        ),
        await Promise.all(h)
    }
    async reverseAllAnimation(o) {
        var c;
        const h = [];
        (c = this._animations) === null || c === void 0 || c.forEach(_ => {
            h.push(this.playClip(_, o, 1, !0))
        }
        ),
        await Promise.all(h)
    }
    async playClip(o, c, h=1, _=!1, b=!1) {
        if (!this.mixer)
            return;
        const _e = this.mixer.clipAction(o);
        return this._playingAnimations.has(_e) && this.mixer.dispatchEvent({
            type: "canceled",
            action: _e
        }),
        b && (this.mixer.setTime(0),
        this.mixer.stopAllAction()),
        _ ? (_e.paused = !1,
        _e.timeScale = -h) : (_e.reset(),
        _e.timeScale = h),
        _e.loop = c ? three_module.aMy : three_module.G3T,
        _e.clampWhenFinished = !0,
        new Promise(nt => {
            const it = async at => {
                at.action === _e && (this.mixer.removeEventListener("finished", it),
                this.mixer.removeEventListener("canceled", it),
                this._playingAnimations.delete(_e),
                nt())
            }
            ;
            this.mixer.addEventListener("finished", it),
            this.mixer.addEventListener("canceled", it),
            this._playingAnimations.add(_e),
            _e.play()
        }
        )
    }
    playClipByName(o, c, h=1, _=!1) {
        let b;
        this._animations.forEach(_e => {
            _e.name === o && (b = _e)
        }
        ),
        b && this.playClip(b, c, h, _)
    }
    update() {
        const o = this._clock.getDelta();
        return this._playingAnimations.size > 0 && (this.mixer.update(o),
        !0)
    }
}

export default CustomAnimationHelper;
