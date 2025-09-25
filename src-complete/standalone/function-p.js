/* Standalone Function: p */

function p(d) {
    for (var o = "https://reactjs.org/docs/error-decoder.html?invariant=" + d, c = 1; c < arguments.length; c++)
        o += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + d + "; visit " + o + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}

export default p;
