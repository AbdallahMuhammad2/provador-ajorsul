/* Standalone Function: Ma */

function Ma(d) {
    if (La === void 0)
        try {
            throw Error()
        } catch (c) {
            var o = c.stack.trim().match(/\n( *(at )?)/);
            La = o && o[1] || ""
        }
    return `
` + La + d
}

export default Ma;
