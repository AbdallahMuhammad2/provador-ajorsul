/* Standalone Function: textureToDataUrl */

function textureToDataUrl(d, o, c, h, _) {
    return textureToCanvas(d, o, c).toDataURL(h, _)
}

export default textureToDataUrl;
