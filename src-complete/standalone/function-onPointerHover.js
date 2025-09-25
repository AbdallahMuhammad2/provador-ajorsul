/* Standalone Function: onPointerHover */

function onPointerHover(d) {
    if (this.enabled)
        switch (d.pointerType) {
        case "mouse":
        case "pen":
            this.pointerHover(this._getPointer(d))
        }
}

export default onPointerHover;
