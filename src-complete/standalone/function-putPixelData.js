/* Standalone Function: putPixelData */

function putPixelData(d, o, c=-1) {
    if (d.shape.length === 4)
        return putPixelData(d.pick(c), o, 0);
    if (d.shape.length === 3)
        if (d.shape[2] === 3)
            ndarray_ops.assign(ndarray_ndarray(o, [d.shape[0], d.shape[1], 3], [4, 4 * d.shape[0], 1]), d),
            ndarray_ops.assigns(ndarray_ndarray(o, [d.shape[0] * d.shape[1]], [4], 3), 255);
        else if (d.shape[2] === 4)
            ndarray_ops.assign(ndarray_ndarray(o, [d.shape[0], d.shape[1], 4], [4, 4 * d.shape[0], 1]), d);
        else {
            if (d.shape[2] !== 1)
                throw new Error("[ndarray-pixels] Incompatible array shape.");
            ndarray_ops.assign(ndarray_ndarray(o, [d.shape[0], d.shape[1], 3], [4, 4 * d.shape[0], 1]), ndarray_ndarray(d.data, [d.shape[0], d.shape[1], 3], [d.stride[0], d.stride[1], 0], d.offset)),
            ndarray_ops.assigns(ndarray_ndarray(o, [d.shape[0] * d.shape[1]], [4], 3), 255)
        }
    else {
        if (d.shape.length !== 2)
            throw new Error("[ndarray-pixels] Incompatible array shape.");
        ndarray_ops.assign(ndarray_ndarray(o, [d.shape[0], d.shape[1], 3], [4, 4 * d.shape[0], 1]), ndarray_ndarray(d.data, [d.shape[0], d.shape[1], 3], [d.stride[0], d.stride[1], 0], d.offset)),
        ndarray_ops.assigns(ndarray_ndarray(o, [d.shape[0] * d.shape[1]], [4], 3), 255)
    }
    return o
}

export default putPixelData;
