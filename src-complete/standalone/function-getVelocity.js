/* Standalone Function: getVelocity */

function getVelocity(d, o) {
    if (d.length < 2)
        return {
            x: 0,
            y: 0
        };
    let c = d.length - 1
      , h = null;
    const _ = lastDevicePoint(d);
    for (; c >= 0 && (h = d[c],
    !(_.timestamp - h.timestamp > secondsToMilliseconds(o))); )
        c--;
    if (!h)
        return {
            x: 0,
            y: 0
        };
    const b = millisecondsToSeconds(_.timestamp - h.timestamp);
    if (b === 0)
        return {
            x: 0,
            y: 0
        };
    const _e = {
        x: (_.x - h.x) / b,
        y: (_.y - h.y) / b
    };
    return _e.x === 1 / 0 && (_e.x = 0),
    _e.y === 1 / 0 && (_e.y = 0),
    _e
}

export default getVelocity;
