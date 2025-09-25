/* Standalone Function: unzlibSync */

function unzlibSync(d, o) {
    return inflt((zlv(d),
    d.subarray(2, -4)), o)
}

export default unzlibSync;
