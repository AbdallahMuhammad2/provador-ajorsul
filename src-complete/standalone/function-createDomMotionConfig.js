/* Standalone Function: createDomMotionConfig */

function createDomMotionConfig(d, {forwardMotionProps: o=!1}, c, h) {
    return {
        ...isSVGComponent(d) ? svgMotionConfig : htmlMotionConfig,
        preloadedFeatures: c,
        useRender: createUseRender(o),
        createVisualElement: h,
        Component: d
    }
}

export default createDomMotionConfig;
