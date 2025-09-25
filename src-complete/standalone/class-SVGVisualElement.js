/* Standalone Class: SVGVisualElement */

class SVGVisualElement extends DOMVisualElement {
    constructor() {
        super(...arguments),
        this.type = "svg",
        this.isSVGTag = !1
    }
    getBaseTargetFromProps(o, c) {
        return o[c]
    }
    readValueFromInstance(o, c) {
        if (transformProps.has(c)) {
            const h = getDefaultValueType(c);
            return h && h.default || 0
        }
        return c = camelCaseAttributes.has(c) ? c : camelToDash(c),
        o.getAttribute(c)
    }
    measureInstanceViewportBox() {
        return createBox()
    }
    scrapeMotionValuesFromProps(o, c, h) {
        return scrapeMotionValuesFromProps(o, c, h)
    }
    build(o, c, h, _) {
        buildSVGAttrs(o, c, h, this.isSVGTag, _.transformTemplate)
    }
    renderInstance(o, c, h, _) {
        renderSVG(o, c, h, _)
    }
    mount(o) {
        this.isSVGTag = isSVGTag(o.tagName),
        super.mount(o)
    }
}

export default SVGVisualElement;
