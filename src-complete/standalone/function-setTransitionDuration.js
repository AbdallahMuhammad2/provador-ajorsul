/* Standalone Function: setTransitionDuration */

function setTransitionDuration(d, o) {
    d.forEach(function(c) {
        c && (c.style.transitionDuration = o + "ms")
    })
}

export default setTransitionDuration;
