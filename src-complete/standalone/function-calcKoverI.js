/* Standalone Function: calcKoverI */

function calcKoverI(d, o) {
    let c = 1;
    for (let _ = 2; _ <= d; ++_)
        c *= _;
    let h = 1;
    for (let _ = 2; _ <= o; ++_)
        h *= _;
    for (let _ = 2; _ <= d - o; ++_)
        h *= _;
    return c / h
}

export default calcKoverI;
