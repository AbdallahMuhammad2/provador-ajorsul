/* Standalone Function: useCreateMotionContext */

function useCreateMotionContext(d) {
    const {initial: o, animate: c} = getCurrentTreeVariants(d, reactExports.useContext(MotionContext));
    return reactExports.useMemo( () => ({
        initial: o,
        animate: c
    }), [variantLabelsAsDependency(o), variantLabelsAsDependency(c)])
}

export default useCreateMotionContext;
