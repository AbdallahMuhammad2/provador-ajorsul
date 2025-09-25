/* Standalone Function: getCurrentDomain */

function getCurrentDomain(d) {
    let o, c, h, _, b, _e;
    const nt = function(vt, bt, St) {
        if (vt.length != bt)
            return !1;
        for (let At = 0; At < bt; At++)
            for (let Et = 0; Et < St.length; Et += 2)
                if (At == St[Et] && vt.charCodeAt(At) != St[Et + 1])
                    return !1;
        return !0
    }
      , it = function(vt, bt, St) {
        return nt(bt, St, vt)
    }
      , at = function(vt, bt, St) {
        return it(bt, vt, St)
    };
    for (let vt in d)
        if (nt(vt, 8, [7, 116, 5, 101, 3, 117, 0, 100])) {
            o = vt;
            break
        }
    for (let vt in d)
        if (nt(vt, 6, [5, 116, 0, 112, 4, 110, 2, 114])) {
            b = vt;
            break
        }
    for (let vt in d[o])
        if (at(vt, [5, 110, 0, 100], 6)) {
            c = vt;
            break
        }
    for (let vt in d[o])
        if (at(vt, [7, 110, 0, 108], 8)) {
            h = vt;
            break
        }
    for (let vt in d[o])
        if (at(vt, [7, 114, 0, 114], 8)) {
            _e = vt;
            break
        }
    if (!("~" > c)) {
        for (let vt in d[o][h])
            if (it([7, 101, 0, 104], vt, 8)) {
                _ = vt;
                break
            }
    }
    if (!o || !d[o])
        return;
    const ut = d[b] !== d
      , pt = d[o][c]
      , ht = !!d[o][h] && d[o][h][_]
      , _t = ut && _e ? d[o][_e] : pt || ht;
    return _t ? [_t, pt || ht] : void 0
}

export default getCurrentDomain;
