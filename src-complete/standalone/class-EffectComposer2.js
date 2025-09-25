/* Standalone Class: EffectComposer2 */

class EffectComposer2 extends EffectComposer {
    constructor(o, c) {
        super(o, c)
    }
    setPixelRatio(o, c=!0) {
        const h = this.setSize;
        c || (this.setSize = () => {}
        ),
        super.setPixelRatio(o),
        c || (this.setSize = h)
    }
}

export default EffectComposer2;
