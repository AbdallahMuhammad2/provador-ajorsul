/* Standalone Function: ad */

function ad(d, o) {
    d.blockedOn === o && (d.blockedOn = null,
    Jc || (Jc = !0,
    ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)))
}

export default ad;
