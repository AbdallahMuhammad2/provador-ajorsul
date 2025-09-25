/* Standalone Function: rl */

function rl(d, o, c, h, _) {
    var b = c._reactRootContainer;
    if (b) {
        var _e = b;
        if (typeof _ == "function") {
            var nt = _;
            _ = function() {
                var it = gl(_e);
                nt.call(it)
            }
        }
        fl(o, _e, d, _)
    } else
        _e = ql(c, o, d, _, h);
    return gl(_e)
}

export default rl;
