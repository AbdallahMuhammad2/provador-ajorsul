/* Standalone Function: onPointerDown */

function onPointerDown(d) {
    this.enabled && (document.pointerLockElement || this.domElement.setPointerCapture(d.pointerId),
    this.domElement.addEventListener("pointermove", this._onPointerMove),
    this.pointerHover(this._getPointer(d)),
    this.pointerDown(this._getPointer(d)))
}

export default onPointerDown;
