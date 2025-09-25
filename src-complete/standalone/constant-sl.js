/* Standalone Constant: sl */

var sl = {
    usingClientEntryPoint: !1,
    Events: [Cb, ue, Db, Eb, Fb, Qk]
}
  , tl = {
    findFiberByHostInstance: Wc,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom"
}
  , ul = {
    bundleType: tl.bundleType,
    version: tl.version,
    rendererPackageName: tl.rendererPackageName,
    rendererConfig: tl.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: ua.ReactCurrentDispatcher,
    findHostInstanceByFiber: function(d) {
        return d = Zb(d),
        d === null ? null : d.stateNode
    },
    findFiberByHostInstance: tl.findFiberByHostInstance || jl,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
};

export default sl;
