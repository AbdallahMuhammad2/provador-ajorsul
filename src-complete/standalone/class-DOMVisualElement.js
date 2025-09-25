/* Standalone Class: DOMVisualElement */

class DOMVisualElement extends VisualElement {
    constructor() {
        super(...arguments),
        this.KeyframeResolver = DOMKeyframesResolver
    }
    sortInstanceNodePosition(o, c) {
        return o.compareDocumentPosition(c) & 2 ? 1 : -1
    }
    getBaseTargetFromProps(o, c) {
        return o.style ? o.style[c] : void 0
    }
    removeValueFromRenderState(o, {vars: c, style: h}) {
        delete c[o],
        delete h[o]
    }
}

export default DOMVisualElement;
