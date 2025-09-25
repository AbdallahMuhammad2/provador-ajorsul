/* Standalone Function: decay */

function decay(d) {
    var o = d.velocity
      , c = o === void 0 ? 0 : o
      , h = d.from
      , _ = h === void 0 ? 0 : h
      , b = d.power
      , _e = b === void 0 ? .8 : b
      , nt = d.timeConstant
      , it = nt === void 0 ? 350 : nt
      , at = d.restDelta
      , ut = at === void 0 ? .5 : at
      , pt = d.modifyTarget
      , ht = {
        done: !1,
        value: _
    }
      , _t = _e * c
      , vt = _ + _t
      , bt = pt === void 0 ? vt : pt(vt);
    return bt !== vt && (_t = bt - _),
    {
        next: function(St) {
            var At = -_t * Math.exp(-St / it);
            return ht.done = !(At > ut || At < -ut),
            ht.value = ht.done ? bt : bt + At,
            ht
        },
        flipTarget: function() {}
    }
}

export default decay;
