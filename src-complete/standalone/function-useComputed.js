/* Standalone Function: useComputed */

function useComputed(d) {
    collectMotionValues.current = [],
    d();
    const o = useCombineMotionValues(collectMotionValues.current, d);
    return collectMotionValues.current = void 0,
    o
}

export default useComputed;
