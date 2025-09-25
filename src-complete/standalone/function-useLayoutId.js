/* Standalone Function: useLayoutId */

function useLayoutId({layoutId: d}) {
    const o = reactExports.useContext(LayoutGroupContext).id;
    return o && d !== void 0 ? o + "-" + d : d
}

export default useLayoutId;
