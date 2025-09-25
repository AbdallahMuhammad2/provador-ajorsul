/* Standalone Function: shapecastTraverse */

function shapecastTraverse(d, o, c, h, _=null, b=0, _e=0) {
    const {float32Array: nt, uint16Array: it, uint32Array: at} = BufferStack;
    let ut = 2 * d;
    if (IS_LEAF(ut, it)) {
        const pt = OFFSET(d, at)
          , ht = COUNT(ut, it);
        return arrayToBox(d, nt, _box1),
        h(pt, ht, !1, _e, b + d, _box1)
    }
    {
        let Bt = function(Ut) {
            const {uint16Array: Ht, uint32Array: Kt} = BufferStack;
            let Jt = 2 * Ut;
            for (; !IS_LEAF(Jt, Ht); )
                Jt = 2 * (Ut = LEFT_NODE(Ut));
            return OFFSET(Ut, Kt)
        }
          , kt = function(Ut) {
            const {uint16Array: Ht, uint32Array: Kt} = BufferStack;
            let Jt = 2 * Ut;
            for (; !IS_LEAF(Jt, Ht); )
                Jt = 2 * (Ut = RIGHT_NODE(Ut, Kt));
            return OFFSET(Ut, Kt) + COUNT(Jt, Ht)
        };
        const pt = LEFT_NODE(d)
          , ht = RIGHT_NODE(d, at);
        let _t, vt, bt, St, At = pt, Et = ht;
        if (_ && (bt = _box1,
        St = _box2,
        arrayToBox(At, nt, bt),
        arrayToBox(Et, nt, St),
        _t = _(bt),
        vt = _(St),
        vt < _t)) {
            At = ht,
            Et = pt;
            const Ut = _t;
            _t = vt,
            vt = Ut,
            bt = St
        }
        bt || (bt = _box1,
        arrayToBox(At, nt, bt));
        const Pt = c(bt, IS_LEAF(2 * At, it), _t, _e + 1, b + At);
        let It;
        if (Pt === CONTAINED) {
            const Ut = Bt(At);
            It = h(Ut, kt(At) - Ut, !0, _e + 1, b + At, bt)
        } else
            It = Pt && shapecastTraverse(At, o, c, h, _, b, _e + 1);
        if (It)
            return !0;
        St = _box2,
        arrayToBox(Et, nt, St);
        const Dt = c(St, IS_LEAF(2 * Et, it), vt, _e + 1, b + Et);
        let Gt;
        if (Dt === CONTAINED) {
            const Ut = Bt(Et);
            Gt = h(Ut, kt(Et) - Ut, !0, _e + 1, b + Et, St)
        } else
            Gt = Dt && shapecastTraverse(Et, o, c, h, _, b, _e + 1);
        return !!Gt
    }
}

export default shapecastTraverse;
