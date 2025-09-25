/* Standalone Function: decompressSync */

function decompressSync(d, o) {
    return d[0] == 31 && d[1] == 139 && d[2] == 8 ? gunzipSync(d, o) : (15 & d[0]) != 8 || d[0] >> 4 > 7 || (d[0] << 8 | d[1]) % 31 ? inflateSync(d, o) : unzlibSync(d, o)
}

export default decompressSync;
