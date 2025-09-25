/* Standalone Function: getCanvas */

function getCanvas() {
    return typeof document > "u" && typeof OffscreenCanvas < "u" ? new OffscreenCanvas(1,1) : document.createElement("canvas")
}

export default getCanvas;
