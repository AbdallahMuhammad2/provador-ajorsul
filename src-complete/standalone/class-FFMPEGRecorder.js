/* Standalone Class: FFMPEGRecorder */

class FFMPEGRecorder extends ACanvasRecorder {
    constructor(o, c) {
        super(o, c),
        this._workerRunning = !1,
        this.ffmpegOptions = {
            imageType: "jpeg",
            bitrate: "10M",
            crf: 17,
            pixFmt: "yuv420p",
            preset: "ultrafast",
            colorTrc: "bt709",
            colorSpace: "bt709"
        },
        this.worker = new Worker(ct(FFMPEGRecorder.LIBRARY_PATH + "ffmpeg-worker-mp4.js", FFMPEGRecorder.LIBRARY_PATH + "ffmpeg-worker-mp4.wasm")),
        this.worker.onmessage = h => {
            var _;
            const b = h.data;
            switch (b.type) {
            case "stdout":
            case "stderr":
                if (b.data.indexOf("frame=") === 0) {
                    const _e = parseInt(b.data.split("frame=")[1].split("fps")[0].trim())
                      , nt = this._frameCount
                      , it = Math.round(_e / nt * 100);
                    this.dispatchEvent({
                        type: "encode-progress",
                        progress: it,
                        frame: _e,
                        totalFrames: nt
                    })
                }
                console.log(b.data + `
`);
                break;
            case "exit":
                console.log("Process exited with code " + b.data),
                parseInt(b.data);
                break;
            case "done":
                if (b.data.MEMFS[0].data === void 0)
                    return void console.log("video processing failed");
                this._workerRunning = !1,
                (_ = this._recordingCallback) === null || _ === void 0 || _.call(this, new Blob([b.data.MEMFS[0].data],{
                    type: "video/mp4"
                })),
                console.timeEnd("ffmpeg-record"),
                this.setState("stopped")
            }
        }
    }
    start() {
        this.state !== "recording" ? (this.state === "error" && console.warn("Resetting from error state."),
        this.state !== "paused" && (this._frameCount = 0),
        this.setState("starting"),
        this.setState("recording")) : console.log("Already recording canvas")
    }
    stop(o) {
        this.state !== "stopped" && (this.state !== "error" ? (this._recordingCallback = o,
        this.setState("stopping"),
        this._lastCanvasCapturePromise ? this._lastCanvasCapturePromise.then( () => this._onStop()) : this._onStop()) : console.error("FFMPEGRecorder: Recorder in error state, cannot stop, call start again."))
    }
    _onStop() {
        var o, c, h, _;
        const b = this._canvas.width % 2 == 0 ? this._canvas.width : this._canvas.width - 1;
        this._workerRunning = !0,
        console.time("ffmpeg-record");
        const _e = this.options.frameRate.toString()
          , nt = this.options.frameRate.toString()
          , it = ["-r", _e, "-an", "-i", `img%06d.${this._mime}`, "-frames:v", this._frameCount.toString(), "-c:v", "libx264", "-crf", Math.min(28, Math.max(1, (o = this.ffmpegOptions.crf) !== null && o !== void 0 ? o : 17)).toString(), "-filter:v", `scale=${b}:-2`, "-pix_fmt", (c = this.ffmpegOptions.pixFmt) !== null && c !== void 0 ? c : "yuv420p", "-b:v", (h = this.ffmpegOptions.bitrate) !== null && h !== void 0 ? h : "10M", "-preset", (_ = this.ffmpegOptions.preset) !== null && _ !== void 0 ? _ : "ultrafast", "-r", nt];
        this.ffmpegOptions.colorSpace && it.push("-colorspace", this.ffmpegOptions.colorSpace),
        this.ffmpegOptions.colorTrc && it.push("-color_trc", this.ffmpegOptions.colorTrc),
        it.push("out.mp4"),
        console.log(it),
        this.worker.postMessage({
            type: "run",
            arguments: it
        })
    }
    requestFrame() {
        return !!super.requestFrame() && (this.sendBlobToWorker(this._frameCount - 1),
        !0)
    }
    get _mime() {
        var o;
        let c = (o = this.ffmpegOptions.imageType) !== null && o !== void 0 ? o : "jpeg";
        return c && ["png", "jpeg", "webp"].includes(c) || (console.warn("FFMPEGRecorder: Unsupported mime type", this.ffmpegOptions.imageType),
        c = "jpeg"),
        c
    }
    sendBlobToWorker(o) {
        this._lastCanvasCapturePromise && console.warn("FFMPEGRecorder: Previous frame capture not complete", o - 1);
        const c = this._mime;
        this._lastCanvasCapturePromise = new Promise(h => {
            this._canvas.toBlob(_ => {
                this.worker.postMessage({
                    type: "image",
                    file: {
                        name: `img${o.toString().padStart(6, "0")}.${c}`,
                        data: _
                    }
                }),
                this._lastCanvasCapturePromise = void 0,
                h()
            }
            , `image/${c}`, 90)
        }
        )
    }
    pad(o, c) {
        return (o += "").length >= c ? o : new Array(c - o.length + 1).join("0") + o
    }
    pause() {
        this.state !== "paused" && this.state !== "stopped" && this.setState("paused")
    }
    setOptions(o) {
        super.setOptions(o)
    }
}

export default FFMPEGRecorder;
