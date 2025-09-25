/* Standalone Function: resetTransformStyle */

function resetTransformStyle(d) {
    const {visualElement: o} = d.options;
    o && o.getProps().onBeforeLayoutMeasure && o.notify("BeforeLayoutMeasure"),
    d.resetTransform()
}

export default resetTransformStyle;
