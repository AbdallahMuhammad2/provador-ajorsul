/* Standalone Function: checkDCE */

function checkDCE() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE)
        } catch (d) {
            console.error(d)
        }
}

export default checkDCE;
