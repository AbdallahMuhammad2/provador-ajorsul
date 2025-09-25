/* Standalone Function: onPointerUp */

function onPointerUp(d) {
    this.enabled && (this.domElement.releasePointerCapture(d.pointerId),
    this.domElement.removeEventListener("pointermove", this._onPointerMove),
    this.pointerUp(this._getPointer(d)))
}

export default onPointerUp;
