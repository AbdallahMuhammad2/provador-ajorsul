/* Standalone Constant: _ */

const _ = {}
      , b = h(d, {});
    for (const ht in b)
        _[ht] = resolveMotionValue(b[ht]);
    let {initial: _e, animate: nt} = d;
    const it = isControllingVariants(d)
      , at = isVariantNode(d);
    o && at && !it && d.inherit !== !1 && (_e === void 0 && (_e = o.initial),
    nt === void 0 && (nt = o.animate));
    let ut = c ? c.initial === !1 : !1;
    ut = ut || _e === !1;
    const pt = ut ? nt : _e;
    return pt && typeof pt != "boolean" && !isAnimationControls(pt) && (Array.isArray(pt) ? pt : [pt]).forEach(_t => {
        const vt = resolveVariantFromProps(d, _t);
        if (!vt)
            return;
        const {transitionEnd: bt, transition: St, ...At} = vt;
        for (const Et in At) {
            let Pt = At[Et];
            if (Array.isArray(Pt)) {
                const It = ut ? Pt.length - 1 : 0;
                Pt = Pt[It]
            }
            Pt !== null && (_[Et] = Pt)
        }
        for (const Et in bt)
            _[Et] = bt[Et]
    }
    ),
    _
}
const noop = d => d
  , {schedule: frame, cancel: cancelFrame, state: frameData, steps} = createRenderBatcher(typeof requestAnimationFrame < "u" ? requestAnimationFrame : noop, !0)
  , svgMotionConfig = {
    useVisualState: makeUseVisualState({
        scrapeMotionValuesFromProps,
        createRenderState: createSvgRenderState,
        onMount: (d, o, {renderState: c, latestValues: h}) => {
            frame.read( () => {
                try {
                    c.dimensions = typeof o.getBBox == "function" ? o.getBBox() : o.getBoundingClientRect()
                } catch {
                    c.dimensions = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    }
                }
            }
            ),
            frame.render( () => {
                buildSVGAttrs(c, h, {
                    enableHardwareAcceleration: !1
                }, isSVGTag(o.tagName), d.transformTemplate),
                renderSVG(o, c)
            }
            )
        }
    })
}
  , htmlMotionConfig = {
    useVisualState: makeUseVisualState({
        scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
        createRenderState: createHtmlRenderState
    })
};

export default _;
