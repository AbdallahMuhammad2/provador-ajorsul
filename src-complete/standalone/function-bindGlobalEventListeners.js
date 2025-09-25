/* Standalone Function: bindGlobalEventListeners */

function bindGlobalEventListeners() {
    document.addEventListener("touchstart", onDocumentTouchStart, TOUCH_OPTIONS),
    window.addEventListener("blur", onWindowBlur)
}

export default bindGlobalEventListeners;
