/* Standalone Function: setMotionValue */

function setMotionValue(d, o, c) {
    d.hasValue(o) ? d.getValue(o).set(c) : d.addValue(o, motionValue(c))
}

export default setMotionValue;
