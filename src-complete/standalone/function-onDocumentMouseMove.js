/* Standalone Function: onDocumentMouseMove */

function onDocumentMouseMove() {
    var d = performance.now();
    d - lastMouseMoveTime < 20 && (currentInput.isTouch = !1,
    document.removeEventListener("mousemove", onDocumentMouseMove)),
    lastMouseMoveTime = d
}

export default onDocumentMouseMove;
