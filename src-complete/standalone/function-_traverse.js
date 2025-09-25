/* Standalone Function: _traverse */

function _traverse(d, o, c, h, _, b=0, _e=0, nt=0, it=0, at=null, ut=!1) {
    let pt, ht;
    ut ? (pt = _bufferStack2,
    ht = _bufferStack1) : (pt = _bufferStack1,
    ht = _bufferStack2);
    const _t = pt.float32Array
      , vt = pt.uint32Array
      , bt = pt.uint16Array
      , St = ht.float32Array
      , At = ht.uint32Array
      , Et = ht.uint16Array
      , Pt = 2 * o
      , It = IS_LEAF(2 * d, bt)
      , Dt = IS_LEAF(Pt, Et);
    let Gt = !1;
    if (Dt && It)
        Gt = ut ? _(OFFSET(o, At), COUNT(2 * o, Et), OFFSET(d, vt), COUNT(2 * d, bt), it, _e + o, nt, b + d) : _(OFFSET(d, vt), COUNT(2 * d, bt), OFFSET(o, At), COUNT(2 * o, Et), nt, b + d, it, _e + o);
    else if (Dt) {
        const Bt = _boxPool.getPrimitive();
        arrayToBox(o, St, Bt),
        Bt.applyMatrix4(c);
        const kt = LEFT_NODE(d)
          , Ut = RIGHT_NODE(d, vt);
        arrayToBox(kt, _t, _leftBox1),
        arrayToBox(Ut, _t, _rightBox1);
        const Ht = Bt.intersectsBox(_leftBox1)
          , Kt = Bt.intersectsBox(_rightBox1);
        Gt = Ht && _traverse(o, kt, h, c, _, _e, b, it, nt + 1, Bt, !ut) || Kt && _traverse(o, Ut, h, c, _, _e, b, it, nt + 1, Bt, !ut),
        _boxPool.releasePrimitive(Bt)
    } else {
        const Bt = LEFT_NODE(o)
          , kt = RIGHT_NODE(o, At);
        arrayToBox(Bt, St, _leftBox2),
        arrayToBox(kt, St, _rightBox2);
        const Ut = at.intersectsBox(_leftBox2)
          , Ht = at.intersectsBox(_rightBox2);
        if (Ut && Ht)
            Gt = _traverse(d, Bt, c, h, _, b, _e, nt, it + 1, at, ut) || _traverse(d, kt, c, h, _, b, _e, nt, it + 1, at, ut);
        else if (Ut)
            if (It)
                Gt = _traverse(d, Bt, c, h, _, b, _e, nt, it + 1, at, ut);
            else {
                const Kt = _boxPool.getPrimitive();
                Kt.copy(_leftBox2).applyMatrix4(c);
                const Jt = LEFT_NODE(d)
                  , or = RIGHT_NODE(d, vt);
                arrayToBox(Jt, _t, _leftBox1),
                arrayToBox(or, _t, _rightBox1);
                const ir = Kt.intersectsBox(_leftBox1)
                  , lr = Kt.intersectsBox(_rightBox1);
                Gt = ir && _traverse(Bt, Jt, h, c, _, _e, b, it, nt + 1, Kt, !ut) || lr && _traverse(Bt, or, h, c, _, _e, b, it, nt + 1, Kt, !ut),
                _boxPool.releasePrimitive(Kt)
            }
        else if (Ht)
            if (It)
                Gt = _traverse(d, kt, c, h, _, b, _e, nt, it + 1, at, ut);
            else {
                const Kt = _boxPool.getPrimitive();
                Kt.copy(_rightBox2).applyMatrix4(c);
                const Jt = LEFT_NODE(d)
                  , or = RIGHT_NODE(d, vt);
                arrayToBox(Jt, _t, _leftBox1),
                arrayToBox(or, _t, _rightBox1);
                const ir = Kt.intersectsBox(_leftBox1)
                  , lr = Kt.intersectsBox(_rightBox1);
                Gt = ir && _traverse(kt, Jt, h, c, _, _e, b, it, nt + 1, Kt, !ut) || lr && _traverse(kt, or, h, c, _, _e, b, it, nt + 1, Kt, !ut),
                _boxPool.releasePrimitive(Kt)
            }
    }
    return Gt
}

export default _traverse;
