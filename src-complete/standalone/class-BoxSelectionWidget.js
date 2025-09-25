/* Standalone Class: BoxSelectionWidget */

class BoxSelectionWidget extends SelectionWidget {
    constructor() {
        super(),
        this.boundingScaleMultiplier = 1 / 1.7,
        this._initGeometry(new three_module.iNn(2,2,2,1,1,1))
    }
    _updater() {
        super._updater();
        const o = this.object;
        o && (new Box3B().expandByObject(o, !1).getSize(this.scale).multiplyScalar(this.boundingScaleMultiplier).clampScalar(.1, 100),
        this.setVisible(!0))
    }
}

export default BoxSelectionWidget;
