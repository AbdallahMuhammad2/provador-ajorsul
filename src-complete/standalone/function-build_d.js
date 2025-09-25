/* Standalone Function: build_d */

function build_d(d) {
    (function(o) {
        return o.constructor.name === "MessagePort"
    }
    )(d) && d.close()
}

export default build_d;
