/* Standalone Function: useIsMounted */

function useIsMounted() {
    const d = reactExports.useRef(!1);
    return useIsomorphicLayoutEffect( () => (d.current = !0,
    () => {
        d.current = !1
    }
    ), []),
    d
}

export default useIsMounted;
