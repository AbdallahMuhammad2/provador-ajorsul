/* Standalone Function: useListTransform */

function useListTransform(d, o) {
    const c = useConstant( () => []);
    return useCombineMotionValues(d, () => {
        c.length = 0;
        const h = d.length;
        for (let _ = 0; _ < h; _++)
            c[_] = d[_].get();
        return o(c)
    }
    )
}

export default useListTransform;
