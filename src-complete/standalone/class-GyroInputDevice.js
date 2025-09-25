/* Standalone Class: GyroInputDevice */

class GyroInputDevice {
    constructor(o) {
        this._zee = new three_module.Pq0(0,0,1),
        this._euler = new three_module.O9p,
        this._q0 = new three_module.PTz,
        this._q1 = new three_module.PTz(-Math.sqrt(.5),0,0,Math.sqrt(.5)),
        this._q2 = new three_module.PTz,
        this._initQuaternionDest = new three_module.PTz,
        this.onScreenOrientationChangeEvent = () => {
            this.screenOrientation = screen.orientation
        }
        ,
        this.onDeviceOrientationChangeEvent = c => {
            this.deviceOrientation = c
        }
        ,
        this._isConnected = !1,
        this._viewer = o
    }
    getOffsetFromCenter(o=!0) {
        if (!this.deviceOrientation)
            return new three_module.I9Y;
        this.getQuaternion(o, this._q2);
        const c = new three_module.Pq0(0,0,1);
        return c.applyQuaternion(this._q2),
        new three_module.I9Y(c.x,c.y)
    }
    getQuaternion(o, c) {
        if (c || (c = new three_module.PTz),
        !this.deviceOrientation)
            return c.identity();
        const h = this.deviceOrientation
          , _ = h.alpha !== null ? three_module.cj9.degToRad(h.alpha) : 0
          , b = h.beta !== null ? three_module.cj9.degToRad(h.beta) : 0
          , _e = h.gamma !== null ? three_module.cj9.degToRad(h.gamma) : 0
          , nt = this.screenOrientation ? three_module.cj9.degToRad(this.screenOrientation.angle) : 0;
        return this._toQuaternion(c, _, b, _e, nt, o),
        c
    }
    _toQuaternion(o, c, h, _, b, _e) {
        this._euler.set(h, c, -_, "YXZ"),
        o.setFromEuler(this._euler),
        o.multiply(this._q1);
        const nt = document.getElementById("debug");
        return nt && (nt.textContent = b + ""),
        o.multiply(this._q0.setFromAxisAngle(this._zee, -b)),
        this._initQuaternionDest.__init || (this._initQuaternionDest.copy(o).invert(),
        this._initQuaternionDest.__init = !0),
        _e && o.premultiply(this._initQuaternionDest),
        o
    }
    static IsCompatible() {
        return window.DeviceOrientationEvent !== void 0 && "ontouchstart"in window
    }
    addPermissionMessage() {
        this.permissionMessage = document.createElement("div"),
        this.permissionMessage.innerHTML = "Tap on the screen to allow gyroscope",
        this.permissionMessage.style.visibility = "visible",
        this.permissionMessage.style.width = "100%",
        this.permissionMessage.style.height = "40px",
        this.permissionMessage.style.color = "black",
        this.permissionMessage.style.position = "absolute",
        this.permissionMessage.style.textAlign = "center",
        this.permissionMessage.style.fontSize = "12px",
        this.permissionMessage.style.bottom = "20%",
        this._viewer.container.appendChild(this.permissionMessage)
    }
    connect() {
        var o;
        if (!this._isConnected)
            return this._isConnected = !0,
            this.onScreenOrientationChangeEvent(),
            !!window.DeviceOrientationEvent && (this.askPermission(),
            (o = this._viewer) === null || o === void 0 || o.renderer.rendererObject.domElement.addEventListener("click", this.askPermission.bind(this)),
            window.addEventListener("orientationchange", this.onScreenOrientationChangeEvent),
            window.addEventListener("deviceorientation", this.onDeviceOrientationChangeEvent),
            !0)
    }
    askPermission() {
        this.onScreenOrientationChangeEvent(),
        typeof DeviceMotionEvent.requestPermission == "function" && (this.addPermissionMessage(),
        DeviceOrientationEvent.requestPermission().then(o => {
            o == "granted" && (window.addEventListener("orientationchange", this.onScreenOrientationChangeEvent),
            window.addEventListener("deviceorientation", this.onDeviceOrientationChangeEvent),
            this._viewer.container.removeChild(this.permissionMessage))
        }
        ).catch(o => {
            console.error("DeviceOrientationControls2: Unable to use DeviceOrientation API:", o)
        }
        ))
    }
    disconnect() {
        this._isConnected && (this._isConnected = !1,
        window.removeEventListener("orientationchange", this.onScreenOrientationChangeEvent),
        window.removeEventListener("deviceorientation", this.onDeviceOrientationChangeEvent),
        this._initQuaternionDest = new three_module.PTz)
    }
}

export default GyroInputDevice;
