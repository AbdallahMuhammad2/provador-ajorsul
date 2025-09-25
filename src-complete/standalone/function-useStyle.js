/* Standalone Function: useStyle */

function useStyle(d, o, c) {
    const h = d.style || {}
      , _ = {};
    return copyRawValuesOnly(_, h, d),
    Object.assign(_, useInitialMotionValues(d, o, c)),
    _
}

export default useStyle;
