/* Standalone Function: getData */

function getData(d, o, c, h) {
    let _;
    switch (h.mappingType) {
    case "ByPolygonVertex":
        _ = d;
        break;
    case "ByPolygon":
        _ = o;
        break;
    case "ByVertice":
        _ = c;
        break;
    case "AllSame":
        _ = h.indices[0];
        break;
    default:
        console.warn("THREE.FBXLoader: unknown attribute mapping type " + h.mappingType)
    }
    h.referenceType === "IndexToDirect" && (_ = h.indices[_]);
    const b = _ * h.dataSize
      , _e = b + h.dataSize;
    return slice(dataArray, h.buffer, b, _e)
}

export default getData;
