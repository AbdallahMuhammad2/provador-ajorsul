/* Standalone Function: addThinFilmLayer */

function addThinFilmLayer(d) {
    const o = d == null ? void 0 : d.userData;
    if (!o)
        return !1;
    o._thinFilmLayer || (o._thinFilmLayer = {});
    const c = o._thinFilmLayer;
    return c.hasThinFilm = !0,
    c.baseLayerFactors === void 0 && (c.baseLayerFactors = [.3, .6, 1, .9]),
    c.noiseLayerFactors === void 0 && (c.noiseLayerFactors = [.7, .5, .9, .7]),
    c.colorNoiseParams === void 0 && (c.colorNoiseParams = [.5, .5, .5, .7]),
    c.filmFactor === void 0 && (c.filmFactor = .3),
    d.isMaterial && (d.needsUpdate = !0),
    !0
}

export default addThinFilmLayer;
