/* Standalone Function: materialAfterRender */

function materialAfterRender(d, {object: o, renderer: c}) {
    var h;
    if (d.materialExtensions)
        for (const _ of d.materialExtensions)
            (h = _.onAfterRender) === null || h === void 0 || h.call(_, o, d, c)
}

export default materialAfterRender;
