/* Standalone Function: decompress */

function decompress(d, o, c) {
    if (c || (c = o,
    o = {}),
    typeof c != "function")
        throw "no callback";
    return d[0] == 31 && d[1] == 139 && d[2] == 8 ? gunzip(d, o, c) : (15 & d[0]) != 8 || d[0] >> 4 > 7 || (d[0] << 8 | d[1]) % 31 ? inflate(d, o, c) : unzlib(d, o, c)
}

export default decompress;
