/* Standalone Function: decodeFloat16 */

function decodeFloat16(d) {
    const o = (31744 & d) >> 10
      , c = 1023 & d;
    return (d >> 15 ? -1 : 1) * (o ? o === 31 ? c ? NaN : 1 / 0 : Math.pow(2, o - 15) * (1 + c / 1024) : c / 1024 * 6103515625e-14)
}

export default decodeFloat16;
