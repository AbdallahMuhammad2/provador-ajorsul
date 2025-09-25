/* Standalone Class: PointerLockControlsPlugin */

class PointerLockControlsPlugin extends ACameraControlsPlugin {
    constructor() {
        super(...arguments),
        this.controlsKey = "pointerLock",
        this._controlsCtor = (o, c) => new PointerLockControls2(o,c.ownerDocument ? c : c.documentElement)
    }
}

export default PointerLockControlsPlugin;
