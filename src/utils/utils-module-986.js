/**
 * Module 986 - Type: utils
 * Extracted from webpack bundle
 * Dependencies: none
 * Exports: none
 */

// Original parameters: d, o, c
export default function module986(d, o, c) {

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

// Auto-generated exports

