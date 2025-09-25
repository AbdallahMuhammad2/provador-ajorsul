/* Standalone Function: useForceUpdate */

function useForceUpdate() {
    const d = useIsMounted()
      , [o,c] = reactExports.useState(0)
      , h = reactExports.useCallback( () => {
        d.current && c(o + 1)
    }
    , [o]);
    return [reactExports.useCallback( () => frame.postRender(h), [h]), o]
}

export default useForceUpdate;
