/* Standalone Class: MouseInputDevice */

class MouseInputDevice {
    constructor() {
        this._mousePos = new three_module.I9Y(0,0),
        this._isConnected = !1
    }
    getOffsetFromCenter() {
        return new three_module.I9Y(this._mousePos.x / window.innerWidth * 2 - 1,-(this._mousePos.y / window.innerHeight * 2 - 1))
    }
    connect() {
        this._isConnected || (this._isConnected = !0,
        window.addEventListener("mousemove", this._onMouseMove.bind(this)))
    }
    disconnect() {
        this._isConnected && (this._isConnected = !1,
        window.removeEventListener("mousemove", this._onMouseMove.bind(this)))
    }
    _onMouseMove(o) {
        this._mousePos.set(o.clientX, o.clientY)
    }
}

export default MouseInputDevice;
