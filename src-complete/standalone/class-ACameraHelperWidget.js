/* Standalone Class: ACameraHelperWidget */

class ACameraHelperWidget extends AHelperWidget {
    constructor(o) {
        super(o),
        this.camera = o,
        this.traverse(c => {
            c.userData.__keepShadowDef = !0,
            c.castShadow = !1,
            c.receiveShadow = !1
        }
        )
    }
}

export default ACameraHelperWidget;
