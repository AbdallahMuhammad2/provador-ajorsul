/* Standalone Function: useUnmountEffect */

function useUnmountEffect(d) {
    return reactExports.useEffect( () => () => d(), [])
}

export default useUnmountEffect;
