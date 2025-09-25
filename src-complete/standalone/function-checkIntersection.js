/* Standalone Function: checkIntersection */

function checkIntersection(d, o, c, h, _, b) {
    let _e;
    return _e = b === three_module.hsX ? d.intersectTriangle(h, c, o, !0, _) : d.intersectTriangle(o, c, h, b !== three_module.$EB, _),
    _e === null ? null : {
        distance: d.origin.distanceTo(_),
        point: _.clone()
    }
}

export default checkIntersection;
