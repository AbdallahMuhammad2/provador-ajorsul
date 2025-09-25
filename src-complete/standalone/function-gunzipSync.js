/* Standalone Function: gunzipSync */

function gunzipSync(d, o) {
    return inflt(d.subarray(gzs(d), -8), o || new u8(gzl(d)))
}

export default gunzipSync;
