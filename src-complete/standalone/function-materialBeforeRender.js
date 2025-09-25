/* Standalone Function: materialBeforeRender */

function materialBeforeRender(d, {object: o, renderer: c}) {
    var h;
    if (d.materialExtensions)
        for (const _ of d.materialExtensions) {
            if ((h = _.onObjectRender) === null || h === void 0 || h.call(_, o, d, c),
            d.lastShader) {
                const b = Ee$1(_.updaters) || [];
                for (const _e of b)
                    _e && _e.updateShaderProperties(d.lastShader)
            }
            _.updateVersion !== d.materialObject.userData["_" + _.uuid + "_version"] && (d.materialObject.userData["_" + _.uuid + "_version"] = _.updateVersion,
            d.materialObject.needsUpdate = !0)
        }
}

export default materialBeforeRender;
