/* Standalone Function: updateTransitionEndListener */

function updateTransitionEndListener(d, o, c) {
    var h = o + "EventListener";
    ["transitionend", "webkitTransitionEnd"].forEach(function(_) {
        d[h](_, c)
    })
}

export default updateTransitionEndListener;
