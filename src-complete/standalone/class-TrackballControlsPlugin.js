/* Standalone Class: TrackballControlsPlugin */

class TrackballControlsPlugin extends ACameraControlsPlugin {
    constructor() {
        super(...arguments),
        this.controlsKey = "trackball",
        this._controlsCtor = (o, c) => new TrackballControls2(o,c.ownerDocument ? c : c.documentElement)
    }
}

export default TrackballControlsPlugin;
