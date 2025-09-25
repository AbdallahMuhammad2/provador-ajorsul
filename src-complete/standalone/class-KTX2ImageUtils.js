/* Standalone Class: KTX2ImageUtils */

class KTX2ImageUtils {
    match(o) {
        return o[0] === 171 && o[1] === 75 && o[2] === 84 && o[3] === 88 && o[4] === 32 && o[5] === 50 && o[6] === 48 && o[7] === 187 && o[8] === 13 && o[9] === 10 && o[10] === 26 && o[11] === 10
    }
    getSize(o) {
        const c = ktx_parse_modern_read(o);
        return [c.pixelWidth, c.pixelHeight]
    }
    getChannels(o) {
        const c = ktx_parse_modern_read(o).dataFormatDescriptor[0];
        if (c.colorModel === ktx_parse_modern_KHR_DF_MODEL_ETC1S)
            return c.samples.length !== 2 || 15 & ~c.samples[1].channelType ? 3 : 4;
        if (c.colorModel === ktx_parse_modern_KHR_DF_MODEL_UASTC)
            return (15 & c.samples[0].channelType) == 3 ? 4 : 3;
        throw new Error(`Unexpected KTX2 colorModel, "${c.colorModel}".`)
    }
    getVRAMByteLength(o) {
        const c = ktx_parse_modern_read(o)
          , h = this.getChannels(o) > 3;
        let _ = 0;
        for (let b = 0; b < c.levels.length; b++) {
            const _e = c.levels[b];
            _e.uncompressedByteLength ? _ += _e.uncompressedByteLength : _ += Math.max(1, Math.floor(c.pixelWidth / Math.pow(2, b))) / 4 * (Math.max(1, Math.floor(c.pixelHeight / Math.pow(2, b))) / 4) * (h ? 16 : 8)
        }
        return _
    }
}

export default KTX2ImageUtils;
