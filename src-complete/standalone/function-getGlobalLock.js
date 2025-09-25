/* Standalone Function: getGlobalLock */

function getGlobalLock(d) {
    let o = !1;
    if (d === "y")
        o = globalVerticalLock();
    else if (d === "x")
        o = globalHorizontalLock();
    else {
        const c = globalHorizontalLock()
          , h = globalVerticalLock();
        c && h ? o = () => {
            c(),
            h()
        }
        : (c && c(),
        h && h())
    }
    return o
}

export default getGlobalLock;
