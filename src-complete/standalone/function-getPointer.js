/* Standalone Function: getPointer */

function getPointer(d) {
    if (this.domElement.ownerDocument.pointerLockElement)
        return {
            x: 0,
            y: 0,
            button: d.button,
            buttons: d.buttons
        };
    {
        const o = this.domElement.getBoundingClientRect();
        return {
            x: (d.clientX - o.left) / o.width * 2 - 1,
            y: -(d.clientY - o.top) / o.height * 2 + 1,
            button: d.button,
            buttons: d.buttons
        }
    }
}

export default getPointer;
