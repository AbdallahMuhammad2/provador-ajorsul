/* Standalone Function: delay */

function delay(d, o) {
    const c = time.now()
      , h = ({timestamp: _}) => {
        const b = _ - c;
        b >= o && (cancelFrame(h),
        d(b - o))
    }
    ;
    return frame.read(h, !0),
    () => cancelFrame(h)
}

export default delay;
