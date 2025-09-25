/* Standalone Function: isSafari */

function isSafari() {
    return navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")
}

export default isSafari;
