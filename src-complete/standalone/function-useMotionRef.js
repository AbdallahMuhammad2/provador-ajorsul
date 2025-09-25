/* Standalone Function: useMotionRef */

function useMotionRef(d, o, c) {
    return reactExports.useCallback(h => {
        h && d.mount && d.mount(h),
        o && (h ? o.mount(h) : o.unmount()),
        c && (typeof c == "function" ? c(h) : isRefObject(c) && (c.current = h))
    }
    , [o])
}

export default useMotionRef;
