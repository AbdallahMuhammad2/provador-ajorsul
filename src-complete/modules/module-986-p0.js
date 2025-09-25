/*
 * Module 986 (Pattern 0)
 * Params: d, o, c
 * Size: 2412 chars
 */

// === MODULE CONTENT ===
function module986(d, o, c) {
var h = c(151);
        d.exports = function(_) {
            var b = ["'use strict'", "var CACHED={}"]
              , _e = []
              , nt = _.funcName + "_cwise_thunk";
            b.push(["return function ", nt, "(", _.shimArgs.join(","), "){"].join(""));
            for (var it = [], at = [], ut = [["array", _.arrayArgs[0], ".shape.slice(", Math.max(0, _.arrayBlockIndices[0]), _.arrayBlockIndices[0] < 0 ? "," + _.arrayBlockIndices[0] + ")" : ")"].join("")], pt = [], ht = [], _t = 0; _t < _.arrayArgs.length; ++_t) {
                var vt = _.arrayArgs[_t];
                _e.push(["t", vt, "=array", vt, ".dtype,", "r", vt, "=array", vt, ".order"].join("")),
                it.push("t" + vt),
                it.push("r" + vt),
                at.push("t" + vt),
                at.push("r" + vt + ".join()"),
                ut.push("array" + vt + ".data"),
                ut.push("array" + vt + ".stride"),
                ut.push("array" + vt + ".offset|0"),
                _t > 0 && (pt.push("array" + _.arrayArgs[0] + ".shape.length===array" + vt + ".shape.length+" + (Math.abs(_.arrayBlockIndices[0]) - Math.abs(_.arrayBlockIndices[_t]))),
                ht.push("array" + _.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0, _.arrayBlockIndices[0]) + "]===array" + vt + ".shape[shapeIndex+" + Math.max(0, _.arrayBlockIndices[_t]) + "]"))
            }
            for (_.arrayArgs.length > 1 && (b.push("if (!(" + pt.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"),
            b.push("for(var shapeIndex=array" + _.arrayArgs[0] + ".shape.length-" + Math.abs(_.arrayBlockIndices[0]) + "; shapeIndex-->0;) {"),
            b.push("if (!(" + ht.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')"),
            b.push("}")),
            _t = 0; _t < _.scalarArgs.length; ++_t)
                ut.push("scalar" + _.scalarArgs[_t]);
            return _e.push(["type=[", at.join(","), "].join()"].join("")),
            _e.push("proc=CACHED[type]"),
            b.push("var " + _e.join(",")),
            b.push(["if(!proc){", "CACHED[type]=proc=compile([", it.join(","), "])}", "return proc(", ut.join(","), ")}"].join("")),
            _.debug && console.log(`-----Generated thunk:
` + b.join(`
`) + `
----------`),
            new Function("compile",b.join(`
`))(h.bind(void 0, _))
        }
}

export default module986;
