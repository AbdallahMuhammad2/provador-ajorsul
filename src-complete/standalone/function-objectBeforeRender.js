/* Standalone Function: objectBeforeRender */

function objectBeforeRender(d, o) {
    var c;
    o && (!((c = o.map) === null || c === void 0) && c.isTexture) && (o.extraUniformsToUpload || (o.extraUniformsToUpload = {}),
    o.extraUniformsToUpload.uvTransform || (o.extraUniformsToUpload.uvTransform = {
        value: new three_module.dwI
    }),
    o.extraUniformsToUpload.uvTransform.value.setUvTransform(o.map.offset.x * o.map.repeat.x * d.userData.cloneRotI / (d.userData.rotationCount || 1), o.map.offset.y * o.map.repeat.y * d.userData.cloneRotI / (d.userData.rotationCount || 1), o.map.repeat.x, o.map.repeat.y, o.map.rotation, o.map.center.x, o.map.center.y))
}

export default objectBeforeRender;
