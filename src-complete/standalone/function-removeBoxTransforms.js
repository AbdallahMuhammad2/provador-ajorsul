/* Standalone Function: removeBoxTransforms */

function removeBoxTransforms(d, o, c, h) {
    removeAxisTransforms(d.x, o, xKeys, c ? c.x : void 0, h ? h.x : void 0),
    removeAxisTransforms(d.y, o, yKeys, c ? c.y : void 0, h ? h.y : void 0)
}

export default removeBoxTransforms;
