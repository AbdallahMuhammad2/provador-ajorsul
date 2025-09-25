/* Standalone Function: createRenderStep */

function createRenderStep(d) {
    let o = new Queue
      , c = new Queue
      , h = 0
      , _ = !1
      , b = !1;
    const _e = new WeakSet
      , nt = {
        schedule: (it, at=!1, ut=!1) => {
            const pt = ut && _
              , ht = pt ? o : c;
            return at && _e.add(it),
            ht.add(it) && pt && _ && (h = o.order.length),
            it
        }
        ,
        cancel: it => {
            c.remove(it),
            _e.delete(it)
        }
        ,
        process: it => {
            if (_) {
                b = !0;
                return
            }
            if (_ = !0,
            [o,c] = [c, o],
            c.clear(),
            h = o.order.length,
            h)
                for (let at = 0; at < h; at++) {
                    const ut = o.order[at];
                    _e.has(ut) && (nt.schedule(ut),
                    d()),
                    ut(it)
                }
            _ = !1,
            b && (b = !1,
            nt.process(it))
        }
    };
    return nt
}

export default createRenderStep;
