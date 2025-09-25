/* Standalone Function: createUseRender */

function createUseRender(d=!1) {
    return (c, h, _, {latestValues: b}, _e) => {
        const it = (isSVGComponent(c) ? useSVGProps : useHTMLProps)(h, b, _e, c)
          , at = filterProps(h, typeof c == "string", d)
          , ut = c !== reactExports.Fragment ? {
            ...at,
            ...it,
            ref: _
        } : {}
          , {children: pt} = h
          , ht = reactExports.useMemo( () => isMotionValue(pt) ? pt.get() : pt, [pt]);
        return reactExports.createElement(c, {
            ...ut,
            children: ht
        })
    }
}

export default createUseRender;
