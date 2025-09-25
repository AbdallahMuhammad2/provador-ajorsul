/* Standalone Function: pi */

function pi(d, o) {
    if (typeof o == "function")
        return d = d(),
        o(d),
        function() {
            o(null)
        }
        ;
    if (o != null)
        return d = d(),
        o.current = d,
        function() {
            o.current = null
        }
}

export default pi;
