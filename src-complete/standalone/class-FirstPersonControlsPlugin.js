/* Standalone Class: FirstPersonControlsPlugin */

class FirstPersonControlsPlugin extends ACameraControlsPlugin {
    constructor() {
        super(...arguments),
        this.controlsKey = "firstPerson",
        this._controlsCtor = (o, c) => new FirstPersonControls2(o,c)
    }
}

export default FirstPersonControlsPlugin;
