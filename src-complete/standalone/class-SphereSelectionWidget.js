/* Standalone Class: SphereSelectionWidget */

class SphereSelectionWidget extends SelectionWidget {
    constructor() {
        super(),
        this.boundingScaleMultiplier = 1.2,
        this._initGeometry(new three_module.WBB(1,0))
    }
}

export default SphereSelectionWidget;
