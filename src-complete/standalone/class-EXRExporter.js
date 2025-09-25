/* Standalone Class: EXRExporter */

class EXRExporter {
    parse(o, c, h) {
        if (!o || !o.isWebGLRenderer && !o.isDataTexture)
            throw Error("EXRExporter.parse: Unsupported first parameter, expected instance of WebGLRenderer or DataTexture.");
        if (o.isWebGLRenderer) {
            const _ = o
              , b = c
              , _e = h;
            supportedRTT(b);
            const nt = buildInfoRTT(b, _e);
            return fillData(compressData(reorganizeDataBuffer(getPixelData(_, b, nt), nt), nt), nt)
        }
        if (o.isDataTexture) {
            const _ = o
              , b = c;
            supportedDT(_);
            const _e = buildInfoDT(_, b);
            return fillData(compressData(reorganizeDataBuffer(_.image.data, _e), _e), _e)
        }
    }
}

export default EXRExporter;
