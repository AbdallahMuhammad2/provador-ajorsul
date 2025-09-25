/* Standalone Function: snapToDefault */

function snapToDefault(d) {
    return Number.isInteger(d) || d > 1.0000000000001 || d < .999999999999 ? d : 1
}

export default snapToDefault;
