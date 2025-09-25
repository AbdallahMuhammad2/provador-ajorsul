/* Standalone Function: reverseElapsed */

function reverseElapsed(d, o, c, h) {
    return c === void 0 && (c = 0),
    h === void 0 && (h = !0),
    h ? loopElapsed(o + -d, o, c) : o - (d - o) + c
}

export default reverseElapsed;
