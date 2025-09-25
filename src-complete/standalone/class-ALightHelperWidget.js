/* Standalone Class: ALightHelperWidget */

class ALightHelperWidget extends AHelperWidget {
    constructor(o) {
        super(o),
        this.light = o,
        this.traverse(c => {
            c.userData.__keepShadowDef = !0,
            c.castShadow = !1,
            c.receiveShadow = !1
        }
        )
    }
}

export default ALightHelperWidget;
