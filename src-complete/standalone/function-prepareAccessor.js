/* Standalone Function: prepareAccessor */

function prepareAccessor(d, o, c, h) {
    const {filter: _, bits: b} = h
      , _e = {
        array: d.getArray(),
        byteStride: d.getElementSize() * d.getComponentSize(),
        componentType: d.getComponentType(),
        normalized: d.getNormalized()
    };
    if (c !== MeshoptMode.ATTRIBUTES)
        return _e;
    if (_ !== MeshoptFilter.NONE) {
        let nt = d.getNormalized() ? decodeNormalizedIntArray(d) : new Float32Array(_e.array);
        switch (_) {
        case MeshoptFilter.EXPONENTIAL:
            _e.byteStride = 4 * d.getElementSize(),
            _e.componentType = FLOAT,
            _e.normalized = !1,
            _e.array = o.encodeFilterExp(nt, d.getCount(), _e.byteStride, b);
            break;
        case MeshoptFilter.OCTAHEDRAL:
            _e.byteStride = b > 8 ? 8 : 4,
            _e.componentType = b > 8 ? SHORT : BYTE,
            _e.normalized = !0,
            nt = d.getElementSize() === 3 ? padNormals(nt) : nt,
            _e.array = o.encodeFilterOct(nt, d.getCount(), _e.byteStride, b);
            break;
        case MeshoptFilter.QUATERNION:
            _e.byteStride = 8,
            _e.componentType = SHORT,
            _e.normalized = !0,
            _e.array = o.encodeFilterQuat(nt, d.getCount(), _e.byteStride, b);
            break;
        default:
            throw new Error("Invalid filter.")
        }
        _e.min = d.getMin([]),
        _e.max = d.getMax([]),
        d.getNormalized() && (_e.min = _e.min.map(it => decodeNormalizedInt(it, d.getComponentType())),
        _e.max = _e.max.map(it => decodeNormalizedInt(it, d.getComponentType()))),
        _e.normalized && (_e.min = _e.min.map(it => encodeNormalizedInt(it, _e.componentType)),
        _e.max = _e.max.map(it => encodeNormalizedInt(it, _e.componentType)))
    } else
        _e.byteStride % 4 && (_e.array = padArrayElements(_e.array, d.getElementSize()),
        _e.byteStride = _e.array.byteLength / d.getCount());
    return _e
}

export default prepareAccessor;
