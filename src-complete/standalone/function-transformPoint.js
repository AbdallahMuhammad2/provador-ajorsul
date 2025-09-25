/* Standalone Function: transformPoint */

function transformPoint(d, o) {
    return o ? {
        point: o(d.point)
    } : d
}

export default transformPoint;
