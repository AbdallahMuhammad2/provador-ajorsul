/* Standalone Function: onDocumentTouchStart */

function onDocumentTouchStart() {
    currentInput.isTouch || (currentInput.isTouch = !0,
    window.performance && document.addEventListener("mousemove", onDocumentMouseMove))
}

export default onDocumentTouchStart;
