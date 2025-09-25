/* Standalone Function: getPixelsInternal */

function getPixelsInternal(d, o) {
    if (!(d instanceof Uint8Array))
        throw new Error("[ndarray-pixels] Input must be Uint8Array or Buffer.");
    const c = new Blob([d],{
        type: o
    })
      , h = URL.createObjectURL(c);
    return new Promise( (_, b) => {
        const _e = new Image;
        _e.crossOrigin = "anonymous",
        _e.onload = function() {
            URL.revokeObjectURL(h);
            const nt = new OffscreenCanvas(_e.width,_e.height).getContext("2d");
            nt.drawImage(_e, 0, 0);
            const it = nt.getImageData(0, 0, _e.width, _e.height);
            _(ndarray_ndarray(new Uint8Array(it.data), [_e.width, _e.height, 4], [4, 4 * _e.width, 1], 0))
        }
        ,
        _e.onerror = nt => {
            URL.revokeObjectURL(h),
            b(nt)
        }
        ,
        _e.src = h
    }
    )
}

export default getPixelsInternal;
