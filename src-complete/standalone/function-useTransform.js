/* Standalone Function: useTransform */

function useTransform(d, o, c, h) {
    if (typeof d == "function")
        return useComputed(d);
    const _ = typeof o == "function" ? o : transform(o, c, h);
    return Array.isArray(d) ? useListTransform(d, _) : useListTransform([d], ([b]) => _(b))
}

export default useTransform;
