/* Standalone Class: CanvasMediaRecorder */

class CanvasMediaRecorder extends ACanvasRecorder {
    _setOptions(o) {
        var c, h;
        super._setOptions(o),
        this.options.mimeType && this.options.mimeType !== "auto" || (this.options.mimeType = (c = CanvasMediaRecorder.GetSupportedMimeTypes([], ["h264"], !0)) !== null && c !== void 0 ? c : CanvasMediaRecorder.GetSupportedMimeTypes(void 0, void 0, !0)),
        this.options.mimeType && !(!((h = this.options.mimeType) === null || h === void 0) && h.startsWith("video/")) || window.MediaRecorder || (this._console.warn("MediaRecorder is not supported, switching to png"),
        this.options.mimeType = "image/png"),
        this.options.mimeType || console.warn(new Error("No supported mimetype found"))
    }
    setOptions(o) {
        this._setOptions(o)
    }
    constructor(o, c) {
        super(o, c),
        this._resumeSyncTime = 0,
        this._onstop = h => {
            var _;
            if (this._recorder && this._currentRecording.length > 0) {
                const b = new Blob(this._currentRecording,{
                    type: this.options.mimeType
                });
                (_ = this._recordingCallback) === null || _ === void 0 || _.call(this, b)
            }
            this._recorder = void 0,
            this.setState("stopped")
        }
        ,
        this._onstart = h => {
            var _;
            this._frameCount = 0,
            this.options.stepMode && ((_ = this._recorder) === null || _ === void 0 || _.pause()),
            this.setState("recording")
        }
        ,
        this._onresume = h => {
            if (this.state !== "paused" && this.state !== "starting" && this.state !== "stopped" || this.setState("recording"),
            !this.options.stepMode)
                return;
            const _ = () => {
                var _e;
                this.state === "recording" && ((_e = this._recorder) === null || _e === void 0 || _e.pause())
            }
              , b = Math.min(this._resumeSyncTime - g(), 0) + 1e3 / this.options.frameRate;
            b > 0 ? X$2(b).then(_) : _()
        }
        ,
        this._onerror = h => {
            this.setState("error", {
                error: h
            }),
            this._console.error(h),
            this._recorder = void 0
        }
    }
    start() {
        var o, c, h;
        if (this.state === "recording")
            return void this._console.log("Already recording canvas");
        if (this.state === "error" && (this._recorder = void 0,
        this._console.warn("Resetting from error state.")),
        this._recorder)
            return this.state === "paused" ? (this.setState("starting"),
            void this._recorder.resume()) : void this._console.warn("Canvas recorder unknown state", this.state);
        const _ = {
            mimeType: this.options.mimeType,
            videoBitsPerSecond: this.options.videoBitsPerSecond
        };
        if (this._currentRecording = [],
        this._frameCount = 0,
        (o = _.mimeType) === null || o === void 0 ? void 0 : o.startsWith("video")) {
            if (!window.MediaRecorder)
                return this._console.error("MediaRecorder not supported, use image sequence"),
                void this.setState("error", {
                    error: new Error("MediaRecorder not supported")
                });
            {
                const b = this._canvas.captureStream(this.options.stepMode ? 0 : this.options.frameRate)
                  , _e = (c = b.getVideoTracks()) === null || c === void 0 ? void 0 : c[0];
                this._track = _e,
                this._recorder = new window.MediaRecorder(b,_),
                this._recorder.onstop = this._onstop,
                this._recorder.ondataavailable = this._ondataavailable,
                this._recorder.onerror = this._onerror,
                this._recorder.onresume = this._onresume,
                this._recorder.onstart = this._onstart
            }
        }
        this.setState("starting"),
        this._recorder && ((h = this._recorder) === null || h === void 0 || h.start())
    }
    requestFrame() {
        return !(!this._recorder || !super.requestFrame() || this._track && this.options.stepMode && (this._resumeSyncTime = g(),
        this._track.requestFrame(),
        this._recorder.resume(),
        0))
    }
    pause() {
        this.state !== "paused" && this.state !== "stopped" && (this.options.stepMode ? console.error("Pause not supported in stepMode") : this._recorder && (this._recorder.pause(),
        this.setState("paused")))
    }
    stop(o) {
        this.state !== "stopped" && (this.state !== "error" ? (this._recordingCallback = o,
        this.setState("stopping"),
        this._recorder && this._recorder.stop()) : this._console.error("Recorder in error state, cannot stop, call start again."))
    }
    dispose() {
        this._recorder && (super.dispose(),
        this._recorder = void 0)
    }
    static GetSupportedMimeTypes(o, c, h=!1) {
        if (!window.MediaRecorder)
            return h ? void 0 : [];
        const _ = ["webm", "ogg", "mp4", "x-matroska"].filter(nt => !o || o.length < 1 || o.includes(nt))
          , b = ["vp9", "vp9.0", "vp8", "vp8.0", "avc1", "av1", "h265", "h.265", "h264", "h.264", "opus"].filter(nt => !c || c.length < 1 || c.includes(nt))
          , _e = [];
        return _.forEach(nt => {
            const it = `video/${nt}`;
            b.forEach(at => {
                [`${it};codecs=${at}`, `${it};codecs:${at}`, `${it};codecs=${at.toUpperCase()}`, `${it};codecs:${at.toUpperCase()}`, `${it}`].forEach(ut => {
                    MediaRecorder.isTypeSupported(ut) && _e.push(ut)
                }
                )
            }
            )
        }
        ),
        h ? _e.length > 0 ? _e[0] : void 0 : _e
    }
}

export default CanvasMediaRecorder;
