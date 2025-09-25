/*
 * Module 827 (Pattern 0)
 * Params: d
 * Size: 303 chars
 */

// === MODULE CONTENT ===
function module827(d) {
d.exports = function(o, c) {
            if (c.styleSheet)
                c.styleSheet.cssText = o;
            else {
                for (; c.firstChild; )
                    c.removeChild(c.firstChild);
                c.appendChild(document.createTextNode(o))
            }
        }
}

export default module827;
