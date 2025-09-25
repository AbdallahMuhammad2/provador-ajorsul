/* Standalone Function: PopChild */

function PopChild({children: d, isPresent: o}) {
    const c = reactExports.useId()
      , h = reactExports.useRef(null)
      , _ = reactExports.useRef({
        width: 0,
        height: 0,
        top: 0,
        left: 0
    })
      , {nonce: b} = reactExports.useContext(MotionConfigContext);
    return reactExports.useInsertionEffect( () => {
        const {width: _e, height: nt, top: it, left: at} = _.current;
        if (o || !h.current || !_e || !nt)
            return;
        h.current.dataset.motionPopId = c;
        const ut = document.createElement("style");
        return b && (ut.nonce = b),
        document.head.appendChild(ut),
        ut.sheet && ut.sheet.insertRule(`
          [data-motion-pop-id="${c}"] {
            position: absolute !important;
            width: ${_e}px !important;
            height: ${nt}px !important;
            top: ${it}px !important;
            left: ${at}px !important;
          }
        `),
        () => {
            document.head.removeChild(ut)
        }
    }
    , [o]),
    jsxRuntimeExports.jsx(PopChildMeasure, {
        isPresent: o,
        childRef: h,
        sizeRef: _,
        children: reactExports.cloneElement(d, {
            ref: h
        })
    })
}

export default PopChild;
