/* Standalone Function: useMotionValue */

function useMotionValue(d) {
    const o = useConstant( () => motionValue(d))
      , {isStatic: c} = reactExports.useContext(MotionConfigContext);
    if (c) {
        const [,h] = reactExports.useState(d);
        reactExports.useEffect( () => o.on("change", h), [])
    }
    return o
}

export default useMotionValue;
