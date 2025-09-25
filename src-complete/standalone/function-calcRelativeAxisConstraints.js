/* Standalone Function: calcRelativeAxisConstraints */

function calcRelativeAxisConstraints(d, o, c) {
    return {
        min: o !== void 0 ? d.min + o : void 0,
        max: c !== void 0 ? d.max + c - (d.max - d.min) : void 0
    }
}

export default calcRelativeAxisConstraints;
