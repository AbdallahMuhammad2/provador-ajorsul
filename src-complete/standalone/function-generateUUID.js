/* Standalone Function: generateUUID */

function generateUUID() {
    const d = 4294967295 * Math.random() | 0
      , o = 4294967295 * Math.random() | 0
      , c = 4294967295 * Math.random() | 0
      , h = 4294967295 * Math.random() | 0;
    return (_lut[255 & d] + _lut[d >> 8 & 255] + _lut[d >> 16 & 255] + _lut[d >> 24 & 255] + "-" + _lut[255 & o] + _lut[o >> 8 & 255] + "-" + _lut[o >> 16 & 15 | 64] + _lut[o >> 24 & 255] + "-" + _lut[63 & c | 128] + _lut[c >> 8 & 255] + "-" + _lut[c >> 16 & 255] + _lut[c >> 24 & 255] + _lut[255 & h] + _lut[h >> 8 & 255] + _lut[h >> 16 & 255] + _lut[h >> 24 & 255]).toLowerCase()
}

export default generateUUID;
