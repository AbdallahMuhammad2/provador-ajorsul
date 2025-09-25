/* Standalone Function: RingsWrapper */

function RingsWrapper() {
    const d = reactExports.useRef(null)
      , o = reactExports.useRef(null)
      , c = useMotionValue(0)
      , [h,_] = reactExports.useState(!1)
      , {rings: b} = useUi()
      , [_e,nt] = reactExports.useState(0)
      , [it,at] = reactExports.useState(0)
      , [ut,pt] = reactExports.useState(Math.floor(b.length / 2));
    reactExports.useEffect( () => {
        !d.current || !o.current || (nt(d.current.clientWidth),
        at(o.current.clientWidth))
    }
    , [d.current, o.current]),
    reactExports.useEffect( () => {
        console.log(_e)
    }
    , [_e]);
    const ht = reactExports.useCallback(_t => {
        if (!d.current || h)
            return;
        const vt = d.current.getBoundingClientRect()
          , St = vt.left + vt.width / 2 - _t.clientX;
        let At = c.get() + St;
        At = Math.round(St / it) * it,
        c.set(At),
        console.log(At, "clicked");
        let Et = -Math.round(At / it) + Math.floor(b.length / 2);
        Et < 0 && (Et = 0),
        Et >= b.length && (Et = b.length - 1),
        pt(Et)
    }
    , [c, h, it, d.current]);
    return jsxRuntimeExports.jsxs("div", {
        className: "w-full flex justify-center items-center relative",
        children: [jsxRuntimeExports.jsx("div", {
            className: "absolute left-1/2 top-1/2 border-4 pointer-events-none border-primary rounded-full w-20 h-20 -translate-x-1/2 -translate-y-1/2 z-10"
        }), jsxRuntimeExports.jsx(motion.div, {
            onClick: ht,
            ref: d,
            drag: "x",
            _dragX: c,
            style: {
                x: c
            },
            dragConstraints: {
                left: -_e / 2 + it / 2,
                right: _e / 2 - it / 2
            },
            onDragTransitionEnd: () => {
                _(!1)
            }
            ,
            onDragStart: () => {
                _(!0)
            }
            ,
            dragTransition: {
                power: .1,
                timeConstant: 200,
                modifyTarget: _t => {
                    const vt = Math.round(_t / it) * it;
                    let bt = -Math.round(vt / it) + Math.floor(b.length / 2);
                    return bt < 0 && (bt = 0),
                    bt >= b.length && (bt = b.length - 1),
                    pt(bt),
                    vt
                }
            },
            className: "flex w-fit justify-center items-center p-3 px-0",
            children: b.map( (_t, vt) => jsxRuntimeExports.jsx(RingOption, {
                active: vt === ut,
                refrence: vt === 0 ? o : void 0,
                ringUrl: _t.ringUrl,
                configUrl: _t.configUrl,
                icon: _t.icon
            }, vt))
        })]
    })
}

export default RingsWrapper;
