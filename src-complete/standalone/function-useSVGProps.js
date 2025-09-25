/* Standalone Function: useSVGProps */

function useSVGProps(d, o, c, h) {
    const _ = reactExports.useMemo( () => {
        const b = createSvgRenderState();
        return buildSVGAttrs(b, o, {
            enableHardwareAcceleration: !1
        }, isSVGTag(h), d.transformTemplate),
        {
            ...b.attrs,
            style: {
                ...b.style
            }
        }
    }
    , [o]);
    if (d.style) {
        const b = {};
        copyRawValuesOnly(b, d.style, d),
        _.style = {
            ...b,
            ..._.style
        }
    }
    return _
}

export default useSVGProps;
