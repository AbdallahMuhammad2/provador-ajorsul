/*
 * Module 872 (Pattern 0)
 * Params: d
 * Size: 394 chars
 */

// === MODULE CONTENT ===
function module872(d) {
function o(c) {
            return !!c.constructor && typeof c.constructor.isBuffer == "function" && c.constructor.isBuffer(c)
        }
        d.exports = function(c) {
            return c != null && (o(c) || function(h) {
                return typeof h.readFloatLE == "function" && typeof h.slice == "function" && o(h.slice(0, 0))
            }(c) || !!c._isBuffer)
        }
}

export default module872;
