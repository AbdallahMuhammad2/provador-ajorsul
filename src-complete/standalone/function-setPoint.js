/* Standalone Function: setPoint */

function setPoint(d, o, c, h, _, b, _e, nt) {
    nt.set(_, b, _e).unproject(h);
    const it = o[d];
    if (it !== void 0) {
        const at = c.getAttribute("instanceStart")
          , ut = c.getAttribute("instanceEnd");
        for (let pt = 0, ht = it.length; pt < ht; pt++) {
            const _t = Math.floor(it[pt] / 2);
            (it[pt] % 2 == 0 ? at : ut).setXYZ(_t, nt.x, nt.y, nt.z)
        }
    }
}

export default setPoint;
