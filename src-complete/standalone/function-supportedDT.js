/* Standalone Function: supportedDT */

function supportedDT(d) {
    if (d.type !== three_module.RQf && d.type !== three_module.ix0)
        throw Error("EXRExporter.parse: Unsupported DataTexture texture type.");
    if (d.format !== three_module.GWd)
        throw Error("EXRExporter.parse: Unsupported DataTexture texture format, expected RGBAFormat.");
    if (!d.image.data)
        throw Error("EXRExporter.parse: Invalid DataTexture image data.");
    if (d.type === three_module.RQf && d.image.data.constructor.name !== "Float32Array")
        throw Error("EXRExporter.parse: DataTexture image data doesn't match type, expected 'Float32Array'.");
    if (d.type === three_module.ix0 && d.image.data.constructor.name !== "Uint16Array")
        throw Error("EXRExporter.parse: DataTexture image data doesn't match type, expected 'Uint16Array'.")
}

export default supportedDT;
