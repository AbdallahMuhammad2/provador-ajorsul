/* Standalone Function: reorganizeDataBuffer */

function reorganizeDataBuffer(d, o) {
    const c = o.width
      , h = o.height
      , _ = {
        r: 0,
        g: 0,
        b: 0,
        a: 0
    }
      , b = {
        value: 0
    }
      , _e = o.numOutputChannels == 4 ? 1 : 0
      , nt = o.type == three_module.RQf ? getFloat32 : getFloat16
      , it = o.dataType == 1 ? setFloat16 : setFloat32
      , at = new Uint8Array(o.width * o.height * o.numOutputChannels * o.dataSize)
      , ut = new DataView(at.buffer);
    for (let pt = 0; pt < h; ++pt)
        for (let ht = 0; ht < c; ++ht) {
            const _t = pt * c * 4 + 4 * ht
              , vt = nt(d, _t)
              , bt = nt(d, _t + 1)
              , St = nt(d, _t + 2)
              , At = nt(d, _t + 3)
              , Et = (o.flipY ? pt : h - pt - 1) * c * (3 + _e) * o.dataSize;
            decodeLinear(_, vt, bt, St, At),
            b.value = Et + ht * o.dataSize,
            it(ut, _.a, b),
            b.value = Et + _e * c * o.dataSize + ht * o.dataSize,
            it(ut, _.b, b),
            b.value = Et + (1 + _e) * c * o.dataSize + ht * o.dataSize,
            it(ut, _.g, b),
            b.value = Et + (2 + _e) * c * o.dataSize + ht * o.dataSize,
            it(ut, _.r, b)
        }
    return at
}

export default reorganizeDataBuffer;
