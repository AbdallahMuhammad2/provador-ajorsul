/* Standalone Class: HTMLVisualElement */

class HTMLVisualElement extends DOMVisualElement {
    constructor() {
        super(...arguments),
        this.type = "html"
    }
    readValueFromInstance(o, c) {
        if (transformProps.has(c)) {
            const h = getDefaultValueType(c);
            return h && h.default || 0
        } else {
            const h = getComputedStyle(o)
              , _ = (isCSSVariableName(c) ? h.getPropertyValue(c) : h[c]) || 0;
            return typeof _ == "string" ? _.trim() : _
        }
    }
    measureInstanceViewportBox(o, {transformPagePoint: c}) {
        return measureViewportBox(o, c)
    }
    build(o, c, h, _) {
        buildHTMLStyles(o, c, h, _.transformTemplate)
    }
    scrapeMotionValuesFromProps(o, c, h) {
        return scrapeMotionValuesFromProps$1(o, c, h)
    }
    handleChildMotionValue() {
        this.childSubscription && (this.childSubscription(),
        delete this.childSubscription);
        const {children: o} = this.props;
        isMotionValue(o) && (this.childSubscription = o.on("change", c => {
            this.current && (this.current.textContent = `${c}`)
        }
        ))
    }
    renderInstance(o, c, h, _) {
        renderHTML(o, c, h, _)
    }
}

export default HTMLVisualElement;
