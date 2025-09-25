/* Standalone Function: readAllKeyframes */

function readAllKeyframes() {
    toResolve.forEach(d => {
        d.readKeyframes(),
        d.needsMeasurement && (anyNeedsMeasurement = !0)
    }
    )
}

export default readAllKeyframes;
