/* Standalone Function: setThreeRendererMode */

function setThreeRendererMode(d, o, c) {
    const h = d.userData
      , {backgroundRender: _, transparentRender: b, shadowMapRender: _e, mainRenderPass: nt, opaqueRender: it, transmissionRender: at, sceneRender: ut, screenSpaceRendering: pt} = h;
    o.backgroundRender !== void 0 && (h.backgroundRender = o.backgroundRender),
    o.transparentRender !== void 0 && (h.transparentRender = o.transparentRender),
    o.shadowMapRender !== void 0 && (h.shadowMapRender = o.shadowMapRender),
    o.mainRenderPass !== void 0 && (h.mainRenderPass = o.mainRenderPass),
    o.opaqueRender !== void 0 && (h.opaqueRender = o.opaqueRender),
    o.sceneRender !== void 0 && (h.sceneRender = o.sceneRender),
    o.transmissionRender !== void 0 && (h.transmissionRender = o.transmissionRender),
    o.screenSpaceRendering !== void 0 && (h.screenSpaceRendering = o.screenSpaceRendering),
    c(),
    h.backgroundRender = _,
    h.transparentRender = b,
    h.shadowMapRender = _e,
    h.mainRenderPass = nt,
    h.opaqueRender = it,
    h.sceneRender = ut,
    h.transmissionRender = at,
    h.screenSpaceRendering = pt
}

export default setThreeRendererMode;
