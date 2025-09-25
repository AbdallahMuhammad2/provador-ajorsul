/* Standalone Function: useInitialMotionValues */

function useInitialMotionValues({transformTemplate: d}, o, c) {
    return reactExports.useMemo( () => {
        const h = createHtmlRenderState();
        return buildHTMLStyles(h, o, {
            enableHardwareAcceleration: !c
        }, d),
        Object.assign({}, h.vars, h.style)
    }
    , [o])
}

export default useInitialMotionValues;
