/* Standalone Class: PopmotionPlugin */

class PopmotionPlugin extends AViewerPlugin {
    constructor(o=!0) {
        super(),
        this.enabled = !0,
        this.toJSON = void 0,
        this.fromJSON = void 0,
        this._lastFrameTime = 0,
        this._updaters = [],
        this.dependencies = [],
        this._fadeDisabled = !1,
        this.disableFrameFade = !0,
        this._postFrame = () => {
            var c, h;
            if (!this._viewer)
                return;
            if (!this.enabled || Object.keys(this.animations).length < 1)
                return this._lastFrameTime = 0,
                void (this._fadeDisabled && ((c = this._viewer.getPluginByType("FrameFade")) === null || c === void 0 || c.enable(PopmotionPlugin.PluginType),
                this._fadeDisabled = !1));
            const _ = g() / 1e3;
            this._lastFrameTime < 1 && (this._lastFrameTime = _ - 1 / 60);
            let b = _ - this._lastFrameTime;
            this._lastFrameTime = _;
            const _e = (h = this._viewer.getPluginByType("Progressive")) === null || h === void 0 ? void 0 : h.postFrameConvergedRecordingDelta();
            if (_e && _e > 0 && (b = _e),
            _e !== 0 && (b *= 1e3,
            !(b <= .001) && (this._updaters.forEach(nt => {
                let it = b;
                nt.time + it < 0 && (it = -nt.time),
                nt.time += it,
                Math.abs(it) > .001 && nt.u(it)
            }
            ),
            !this._fadeDisabled && this.disableFrameFade))) {
                const nt = this._viewer.getPluginByType("FrameFade");
                nt && (nt.disable(PopmotionPlugin.PluginType),
                this._fadeDisabled = !0)
            }
        }
        ,
        this.defaultDriver = c => ({
            start: () => this._updaters.push({
                u: c,
                time: 0
            }),
            stop: () => this._updaters.splice(this._updaters.findIndex(h => h.u === c), 1)
        }),
        this.animations = {},
        this.enabled = o,
        this._postFrame = this._postFrame.bind(this)
    }
    async onAdded(o) {
        await super.onAdded(o),
        o.addEventListener("postFrame", this._postFrame)
    }
    async onRemove(o) {
        return o.removeEventListener("postFrame", this._postFrame),
        super.onRemove(o)
    }
    animate(o) {
        const c = esm_browser_v4()
          , h = {
            id: c,
            options: o,
            stop: () => {
                var _, b, _e;
                !((_ = this.animations[c]) === null || _ === void 0) && _._stop ? (_e = (b = this.animations[c]) === null || b === void 0 ? void 0 : b._stop) === null || _e === void 0 || _e.call(b) : console.warn("Animation not started")
            }
        };
        return this.animations[c] = h,
        h.promise = new Promise( (_, b) => {
            const _e = {
                driver: this.defaultDriver,
                ...o,
                onComplete: async () => {
                    var it;
                    try {
                        await ((it = o.onComplete) === null || it === void 0 ? void 0 : it.call(o))
                    } catch (at) {
                        return void b(at)
                    }
                    _()
                }
                ,
                onStop: async () => {
                    var it;
                    try {
                        await ((it = o.onStop) === null || it === void 0 ? void 0 : it.call(o))
                    } catch (at) {
                        return void b(at)
                    }
                    _()
                }
            }
              , nt = animate(_e);
            this.animations[c]._stop = nt.stop,
            this.animations[c].options = _e
        }
        ).then( () => (delete this.animations[c],
        c)),
        this.animations[c]
    }
    async animateAsync(o) {
        return this.animate(o).promise
    }
}

export default PopmotionPlugin;
