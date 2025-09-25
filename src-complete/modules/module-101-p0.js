/*
 * Module 101 (Pattern 0)
 * Params: d, o, c
 * Size: 3930 chars
 */

// === MODULE CONTENT ===
function module101(d, o, c) {
var h = c(986);
        function _() {
            this.argTypes = [],
            this.shimArgs = [],
            this.arrayArgs = [],
            this.arrayBlockIndices = [],
            this.scalarArgs = [],
            this.offsetArgs = [],
            this.offsetArgIndex = [],
            this.indexArgs = [],
            this.shapeArgs = [],
            this.funcName = "",
            this.pre = null,
            this.body = null,
            this.post = null,
            this.debug = !1
        }
        d.exports = function(b) {
            var _e = new _;
            _e.pre = b.pre,
            _e.body = b.body,
            _e.post = b.post;
            var nt = b.args.slice(0);
            _e.argTypes = nt;
            for (var it = 0; it < nt.length; ++it) {
                var at = nt[it];
                if (at === "array" || typeof at == "object" && at.blockIndices) {
                    if (_e.argTypes[it] = "array",
                    _e.arrayArgs.push(it),
                    _e.arrayBlockIndices.push(at.blockIndices ? at.blockIndices : 0),
                    _e.shimArgs.push("array" + it),
                    it < _e.pre.args.length && _e.pre.args[it].count > 0)
                        throw new Error("cwise: pre() block may not reference array args");
                    if (it < _e.post.args.length && _e.post.args[it].count > 0)
                        throw new Error("cwise: post() block may not reference array args")
                } else if (at === "scalar")
                    _e.scalarArgs.push(it),
                    _e.shimArgs.push("scalar" + it);
                else if (at === "index") {
                    if (_e.indexArgs.push(it),
                    it < _e.pre.args.length && _e.pre.args[it].count > 0)
                        throw new Error("cwise: pre() block may not reference array index");
                    if (it < _e.body.args.length && _e.body.args[it].lvalue)
                        throw new Error("cwise: body() block may not write to array index");
                    if (it < _e.post.args.length && _e.post.args[it].count > 0)
                        throw new Error("cwise: post() block may not reference array index")
                } else if (at === "shape") {
                    if (_e.shapeArgs.push(it),
                    it < _e.pre.args.length && _e.pre.args[it].lvalue)
                        throw new Error("cwise: pre() block may not write to array shape");
                    if (it < _e.body.args.length && _e.body.args[it].lvalue)
                        throw new Error("cwise: body() block may not write to array shape");
                    if (it < _e.post.args.length && _e.post.args[it].lvalue)
                        throw new Error("cwise: post() block may not write to array shape")
                } else {
                    if (typeof at != "object" || !at.offset)
                        throw new Error("cwise: Unknown argument type " + nt[it]);
                    _e.argTypes[it] = "offset",
                    _e.offsetArgs.push({
                        array: at.array,
                        offset: at.offset
                    }),
                    _e.offsetArgIndex.push(it)
                }
            }
            if (_e.arrayArgs.length <= 0)
                throw new Error("cwise: No array arguments specified");
            if (_e.pre.args.length > nt.length)
                throw new Error("cwise: Too many arguments in pre() block");
            if (_e.body.args.length > nt.length)
                throw new Error("cwise: Too many arguments in body() block");
            if (_e.post.args.length > nt.length)
                throw new Error("cwise: Too many arguments in post() block");
            return _e.debug = !!b.printCode || !!b.debug,
            _e.funcName = b.funcName || "cwise",
            _e.blockSize = b.blockSize || 64,
            h(_e)
        }
}

export default module101;
