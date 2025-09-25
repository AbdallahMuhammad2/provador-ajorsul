/* Standalone Class: DeviceOrientationControlsPlugin */

class DeviceOrientationControlsPlugin extends ACameraControlsPlugin {
    constructor() {
        super(...arguments),
        this.controlsKey = "deviceOrientation",
        this._controlsCtor = (o, c) => new DeviceOrientationControls2(o)
    }
}

export default DeviceOrientationControlsPlugin;
