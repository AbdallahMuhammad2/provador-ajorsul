/* Standalone Function: getPanInfo */

function getPanInfo({point: d}, o) {
    return {
        point: d,
        delta: subtractPoint(d, lastDevicePoint(o)),
        offset: subtractPoint(d, startDevicePoint(o)),
        velocity: getVelocity(o, .1)
    }
}

export default getPanInfo;
