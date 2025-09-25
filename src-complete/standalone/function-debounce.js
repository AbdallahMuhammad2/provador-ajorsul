/* Standalone Function: debounce */

function debounce(d) {
    var o;
    return function() {
        return o || (o = new Promise(function(c) {
            Promise.resolve().then(function() {
                o = void 0,
                c(d())
            })
        }
        )),
        o
    }
}

export default debounce;
