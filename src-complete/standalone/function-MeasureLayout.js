/* Standalone Function: MeasureLayout */

function MeasureLayout(d) {
    const [o,c] = usePresence()
      , h = reactExports.useContext(LayoutGroupContext);
    return jsxRuntimeExports.jsx(MeasureLayoutWithContext, {
        ...d,
        layoutGroup: h,
        switchLayoutGroup: reactExports.useContext(SwitchLayoutGroupContext),
        isPresent: o,
        safeToRemove: c
    })
}

export default MeasureLayout;
