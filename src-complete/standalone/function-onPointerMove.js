/* Standalone Function: onPointerMove */

function onPointerMove(d) {
    this.enabled && this.pointerMove(this._getPointer(d))
}

export default onPointerMove;
