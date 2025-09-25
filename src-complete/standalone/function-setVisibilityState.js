/* Standalone Function: setVisibilityState */

function setVisibilityState(d, o) {
    d.forEach(function(c) {
        c && c.setAttribute("data-state", o)
    })
}

export default setVisibilityState;
