/* Standalone Class: ImageSequenceRecorder */

class ImageSequenceRecorder extends ACanvasRecorder {
    constructor() {
        super(...arguments),
        this._currentImages = [],
        this._onstop = o => {
            this._currentImages.length > 0 && (this._writeImages([...this._currentImages]),
            this._currentImages = []),
            this.setState("stopped")
        }
        ,
        this._onerror = o => {
            this.setState("error", {
                error: o
            }),
            this._console.error(o)
        }
    }
    start() {
        if (this.state !== "recording") {
            if (this.state === "error" && this._console.warn("Resetting from error state."),
            this.state === "paused")
                return this.setState("starting"),
                void this.setState("recording");
            this._currentRecording = [],
            this._currentImages = [],
            this._frameCount = 0,
            this.setState("starting"),
            window && window.showDirectoryPicker && window.showDirectoryPicker().then(async o => {
                const c = await (o == null ? void 0 : o.getDirectoryHandle("i-" + Math.floor(Date.now()), {
                    create: !0
                }));
                this._imgDirectory = c,
                this._frameCount = 0,
                this.setState("recording")
            }
            ).catch(o => {
                this._onerror({
                    detail: o
                })
            }
            )
        } else
            this._console.log("Already recording canvas")
    }
    requestFrame() {
        if (!super.requestFrame())
            return !1;
        const o = this.options.mimeType;
        return this._canvas.toBlob(c => {
            this._currentImages.push(["frame_" + String(this._frameCount).padStart(5, "0") + (o.includes("png") ? ".png" : ".jpg"), c])
        }
        , o, 90),
        this._currentImages.length > 60 && (this._writeImages([...this._currentImages]),
        this._currentImages = []),
        !0
    }
    pause() {
        this.state !== "paused" && this.state !== "stopped" && this.setState("paused")
    }
    stop(o) {
        this.state !== "stopped" && (this.state !== "error" ? (this._recordingCallback = o,
        this.setState("stopping"),
        this._onstop({})) : this._console.error("Recorder in error state, cannot stop, call start again."))
    }
    async _writeImages(o) {
        if (!this._imgDirectory)
            return;
        const c = [];
        for (const h of o) {
            const _ = await this._imgDirectory.getFileHandle(h[0], {
                create: !0
            });
            c.push($e$1(_, h[1]))
        }
        await Promise.all(c)
    }
}

export default ImageSequenceRecorder;
