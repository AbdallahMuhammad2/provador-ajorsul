/* Standalone Function: o */

function o(gr, dr) {
        var cr = gr.length;
        gr.push(dr);
        e: for (; 0 < cr; ) {
            var Ar = cr - 1 >>> 1
              , wr = gr[Ar];
            if (0 < _(wr, dr))
                gr[Ar] = dr,
                gr[cr] = wr,
                cr = Ar;
            else
                break e
        }
    }
    function c(gr) {
        return gr.length === 0 ? null : gr[0]
    }
    function h(gr) {
        if (gr.length === 0)
            return null;
        var dr = gr[0]
          , cr = gr.pop();
        if (cr !== dr) {
            gr[0] = cr;
            e: for (var Ar = 0, wr = gr.length, Rr = wr >>> 1; Ar < Rr; ) {
                var Cr = 2 * (Ar + 1) - 1
                  , tr = gr[Cr]
                  , fr = Cr + 1
                  , vr = gr[fr];
                if (0 > _(tr, cr))
                    fr < wr && 0 > _(vr, tr) ? (gr[Ar] = vr,
                    gr[fr] = cr,
                    Ar = fr) : (gr[Ar] = tr,
                    gr[Cr] = cr,
                    Ar = Cr);
                else if (fr < wr && 0 > _(vr, cr))
                    gr[Ar] = vr,
                    gr[fr] = cr,
                    Ar = fr;
                else
                    break e
            }
        }
        return dr
    }
    function _(gr, dr) {
        var cr = gr.sortIndex - dr.sortIndex;
        return cr !== 0 ? cr : gr.id - dr.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var b = performance;
        d.unstable_now = function() {
            return b.now()
        }
    } else {
        var _e = Date
          , nt = _e.now();
        d.unstable_now = function() {
            return _e.now() - nt
        }
    }
    var it = []
      , at = []
      , ut = 1
      , pt = null
      , ht = 3
      , _t = !1
      , vt = !1
      , bt = !1
      , St = typeof setTimeout == "function" ? setTimeout : null
      , At = typeof clearTimeout == "function" ? clearTimeout : null
      , Et = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Pt(gr) {
        for (var dr = c(at); dr !== null; ) {
            if (dr.callback === null)
                h(at);
            else if (dr.startTime <= gr)
                h(at),
                dr.sortIndex = dr.expirationTime,
                o(it, dr);
            else
                break;
            dr = c(at)
        }
    }
    function It(gr) {
        if (bt = !1,
        Pt(gr),
        !vt)
            if (c(it) !== null)
                vt = !0,
                ar(Dt);
            else {
                var dr = c(at);
                dr !== null && hr(It, dr.startTime - gr)
            }
    }
    function Dt(gr, dr) {
        vt = !1,
        bt && (bt = !1,
        At(kt),
        kt = -1),
        _t = !0;
        var cr = ht;
        try {
            for (Pt(dr),
            pt = c(it); pt !== null && (!(pt.expirationTime > dr) || gr && !Kt()); ) {
                var Ar = pt.callback;
                if (typeof Ar == "function") {
                    pt.callback = null,
                    ht = pt.priorityLevel;
                    var wr = Ar(pt.expirationTime <= dr);
                    dr = d.unstable_now(),
                    typeof wr == "function" ? pt.callback = wr : pt === c(it) && h(it),
                    Pt(dr)
                } else
                    h(it);
                pt = c(it)
            }
            if (pt !== null)
                var Rr = !0;
            else {
                var Cr = c(at);
                Cr !== null && hr(It, Cr.startTime - dr),
                Rr = !1
            }
            return Rr
        } finally {
            pt = null,
            ht = cr,
            _t = !1
        }
    }
    var Gt = !1
      , Bt = null
      , kt = -1
      , Ut = 5
      , Ht = -1;
    function Kt() {
        return !(d.unstable_now() - Ht < Ut)
    }
    function Jt() {
        if (Bt !== null) {
            var gr = d.unstable_now();
            Ht = gr;
            var dr = !0;
            try {
                dr = Bt(!0, gr)
            } finally {
                dr ? or() : (Gt = !1,
                Bt = null)
            }
        } else
            Gt = !1
    }
    var or;
    if (typeof Et == "function")
        or = function() {
            Et(Jt)
        }
        ;
    else if (typeof MessageChannel < "u") {
        var ir = new MessageChannel
          , lr = ir.port2;
        ir.port1.onmessage = Jt,
        or = function() {
            lr.postMessage(null)
        }
    } else
        or = function() {
            St(Jt, 0)
        }
        ;
    function ar(gr) {
        Bt = gr,
        Gt || (Gt = !0,
        or())
    }
    function hr(gr, dr) {
        kt = St(function() {
            gr(d.unstable_now())
        }, dr)
    }
    d.unstable_IdlePriority = 5,
    d.unstable_ImmediatePriority = 1,
    d.unstable_LowPriority = 4,
    d.unstable_NormalPriority = 3,
    d.unstable_Profiling = null,
    d.unstable_UserBlockingPriority = 2,
    d.unstable_cancelCallback = function(gr) {
        gr.callback = null
    }
    ,
    d.unstable_continueExecution = function() {
        vt || _t || (vt = !0,
        ar(Dt))
    }
    ,
    d.unstable_forceFrameRate = function(gr) {
        0 > gr || 125 < gr ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Ut = 0 < gr ? Math.floor(1e3 / gr) : 5
    }
    ,
    d.unstable_getCurrentPriorityLevel = function() {
        return ht
    }
    ,
    d.unstable_getFirstCallbackNode = function() {
        return c(it)
    }
    ,
    d.unstable_next = function(gr) {
        switch (ht) {
        case 1:
        case 2:
        case 3:
            var dr = 3;
            break;
        default:
            dr = ht
        }
        var cr = ht;
        ht = dr;
        try {
            return gr()
        } finally {
            ht = cr
        }
    }
    ,
    d.unstable_pauseExecution = function() {}
    ,
    d.unstable_requestPaint = function() {}
    ,
    d.unstable_runWithPriority = function(gr, dr) {
        switch (gr) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            gr = 3
        }
        var cr = ht;
        ht = gr;
        try {
            return dr()
        } finally {
            ht = cr
        }
    }
    ,
    d.unstable_scheduleCallback = function(gr, dr, cr) {
        var Ar = d.unstable_now();
        switch (typeof cr == "object" && cr !== null ? (cr = cr.delay,
        cr = typeof cr == "number" && 0 < cr ? Ar + cr : Ar) : cr = Ar,
        gr) {
        case 1:
            var wr = -1;
            break;
        case 2:
            wr = 250;
            break;
        case 5:
            wr = 1073741823;
            break;
        case 4:
            wr = 1e4;
            break;
        default:
            wr = 5e3
        }
        return wr = cr + wr,
        gr = {
            id: ut++,
            callback: dr,
            priorityLevel: gr,
            startTime: cr,
            expirationTime: wr,
            sortIndex: -1
        },
        cr > Ar ? (gr.sortIndex = cr,
        o(at, gr),
        c(it) === null && gr === c(at) && (bt ? (At(kt),
        kt = -1) : bt = !0,
        hr(It, cr - Ar))) : (gr.sortIndex = wr,
        o(it, gr),
        vt || _t || (vt = !0,
        ar(Dt))),
        gr
    }
    ,
    d.unstable_shouldYield = Kt,
    d.unstable_wrapCallback = function(gr) {
        var dr = ht;
        return function() {
            var cr = ht;
            ht = dr;
            try {
                return gr.apply(this, arguments)
            } finally {
                ht = cr
            }
        }
    }
}

export default o;
