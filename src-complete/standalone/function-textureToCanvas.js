/* Standalone Function: textureToCanvas */

function textureToCanvas(d, o, c=!1) {
    let h;
    return h = d.isDataTexture ? textureDataToImageData(d.image, d.colorSpace) : d.image,
    texImageToCanvas(h, o, c)
}

export default textureToCanvas;
