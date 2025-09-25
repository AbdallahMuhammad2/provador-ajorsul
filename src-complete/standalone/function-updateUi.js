/* Standalone Function: updateUi */

function updateUi(d, o) {
    var c, h, _;
    if (!d.uiConfig)
        return;
    let b = (c = d.uiConfig.children) === null || c === void 0 ? void 0 : c.find(_e => {
        var nt;
        return (nt = _e.tags) === null || nt === void 0 ? void 0 : nt.includes("generatedGeometry")
    }
    );
    b || (b = {
        type: "folder",
        label: "Generation Params",
        tags: ["generatedGeometry"],
        children: []
    },
    (h = d.uiConfig.children) === null || h === void 0 || h.push(b)),
    d.userData.__generationParamsUiType !== d.userData.generationParams.type && (b.children = o(),
    d.userData.__generationParamsUiType = d.userData.generationParams.type,
    (_ = b.uiRefresh) === null || _ === void 0 || _.call(b, "postFrame", !0))
}

export default updateUi;
