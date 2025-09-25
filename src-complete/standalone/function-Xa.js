/* Standalone Function: Xa */

function Xa(d) {
    if (d = d || (typeof document < "u" ? document : void 0),
    typeof d > "u")
        return null;
    try {
        return d.activeElement || d.body
    } catch {
        return d.body
    }
}

export default Xa;
