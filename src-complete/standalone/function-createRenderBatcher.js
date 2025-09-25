/* Standalone Function: createRenderBatcher */

function createRenderBatcher(d, o) {
    let c = !1
      , h = !0;
    const _ = {
        delta: 0,
        timestamp: 0,
        isProcessing: !1
    }
      , b = stepsOrder.reduce( (pt, ht) => (pt[ht] = createRenderStep( () => c = !0),
    pt), {})
      , _e = pt => {
        b[pt].process(_)
    }
      , nt = () => {
        const pt = performance.now();
        c = !1,
        _.delta = h ? 1e3 / 60 : Math.max(Math.min(pt - _.timestamp, maxElapsed), 1),
        _.timestamp = pt,
        _.isProcessing = !0,
        stepsOrder.forEach(_e),
        _.isProcessing = !1,
        c && o && (h = !1,
        d(nt))
    }
      , it = () => {
        c = !0,
        h = !0,
        _.isProcessing || d(nt)
    }
    ;
    return {
        schedule: stepsOrder.reduce( (pt, ht) => {
            const _t = b[ht];
            return pt[ht] = (vt, bt=!1, St=!1) => (c || it(),
            _t.schedule(vt, bt, St)),
            pt
        }
        , {}),
        cancel: pt => stepsOrder.forEach(ht => b[ht].cancel(pt)),
        state: _,
        steps: b
    }
}

export default createRenderBatcher;
