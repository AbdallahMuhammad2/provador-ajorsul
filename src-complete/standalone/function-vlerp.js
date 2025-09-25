/* Standalone Function: vlerp */

function vlerp(d, o, c, h) {
    for (let _ = 0; _ < o.length; _++)
        d[_] = lerp(o[_], c[_], h);
    return d
}

export default vlerp;
