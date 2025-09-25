/* Standalone Function: useConstant */

function useConstant(d) {
    const o = reactExports.useRef(null);
    return o.current === null && (o.current = d()),
    o.current
}

export default useConstant;
