/* Standalone Function: makeObject3DUiConfig */

function makeObject3DUiConfig(d, o) {
    if (d.uiConfig)
        return d.uiConfig;
    const c = {
        type: "folder",
        label: () => d.name || "unnamed",
        expanded: !0,
        limitedUi: !0,
        children: [{
            type: "checkbox",
            label: "Visible",
            property: [d, "visible"],
            limitedUi: !0
        }, {
            type: "button",
            label: "Pick/Focus",
            value: () => {
                d.dispatchEvent({
                    type: "select",
                    ui: !0,
                    value: d,
                    focusCamera: !0
                })
            }
        }, {
            type: "button",
            label: "Pick Parent",
            hidden: () => !d.parent,
            value: () => {
                const _ = d.parent;
                _ && _.dispatchEvent({
                    type: "select",
                    ui: !0,
                    value: _
                })
            }
        }, {
            type: "input",
            label: "Name",
            property: [d, "name"],
            onChange: _ => {
                var b;
                _.last && ((b = d.setDirty) === null || b === void 0 || b.call(d, {
                    sceneUpdate: !0,
                    refreshUi: !0
                }))
            }
        }, {
            type: "checkbox",
            label: "Casts Shadow",
            hidden: () => !d.isMesh,
            property: [d, "castShadow"]
        }, {
            type: "checkbox",
            label: "Receive Shadow",
            hidden: () => !d.isMesh,
            property: [d, "receiveShadow"]
        }, {
            type: "checkbox",
            label: "Frustum culled",
            property: [d, "frustumCulled"]
        }, {
            type: "vec3",
            label: "Position",
            property: [d, "position"],
            limitedUi: !0
        }, {
            type: "vec3",
            label: "Rotation",
            property: [d, "rotation"],
            limitedUi: !0
        }, {
            type: "vec3",
            label: "Scale",
            property: [d, "scale"]
        }, {
            type: "input",
            label: "Render Order",
            property: [d, "renderOrder"]
        }, {
            type: "button",
            label: "Auto Scale",
            prompt: ["Auto Scale Radius: Object will be scaled to the given radius", d.userData.autoScaleRadius || "2", !0],
            value: _ => {
                if (!_)
                    return;
                const b = parseFloat(_);
                return Math.abs(b) > 0 ? (autoScaleObject3D(d, b),
                () => autoScaleObject3D(d, b, void 0, !0)) : void 0
            }
        }, {
            type: "button",
            label: "Auto Center",
            value: () => {
                if (confirm("Auto Center: Object will be centered, are you sure you want to proceed?"))
                    return autoCenterObject3D(d),
                    () => autoCenterObject3D(d, !0)
            }
        }, {
            type: "button",
            label: "Pivot to Node Center",
            value: () => {
                if (confirm("Pivot to Center: Adjust the pivot to bounding box center. The object will rotate around the new pivot, are you sure you want to proceed?"))
                    return pivotToBBoxCenter(d)
            }
        }, {
            type: "folder",
            label: "Rotate model",
            children: ["X +", "X -", "Y +", "Y -", "Z +", "Z -"].map(_ => ({
                type: "button",
                label: "Rotate " + _ + "90",
                value: () => {
                    var b;
                    d.rotateOnAxis(new three_module.Pq0(_.includes("X") ? 1 : 0,_.includes("Y") ? 1 : 0,_.includes("Z") ? 1 : 0), Math.PI / 2 * (_.includes("-") ? -1 : 1)),
                    (b = d.setDirty) === null || b === void 0 || b.call(d, {
                        sceneUpdate: !0,
                        refreshUi: !1
                    })
                }
            }))
        }, d.userData.license !== void 0 ? {
            type: "input",
            label: "License/Credits",
            property: [d.userData, "license"],
            limitedUi: !0
        } : {}]
    }
      , h = d;
    if (h != null && h.isMesh && o !== !1) {
        const _ = [ () => {
            const b = Object.entries(h.morphTargetDictionary || {});
            return b.length ? {
                label: "Morph Targets",
                type: "folder",
                children: b.map( ([_e,nt]) => ({
                    type: "slider",
                    label: _e,
                    bounds: [0, 1],
                    stepSize: 1e-4,
                    property: [h.morphTargetInfluences, nt],
                    onChange: it => {
                        var at;
                        (at = d.setDirty) === null || at === void 0 || at.call(d, {
                            sceneUpdate: it.last,
                            frameFade: !1,
                            refreshUi: !1
                        })
                    }
                }))
            } : void 0
        }
        , () => {
            var b;
            return (b = h.geometry) === null || b === void 0 ? void 0 : b.uiConfig
        }
        , () => {
            var b;
            return Array.isArray(h.material) ? h.material.length < 1 ? void 0 : {
                label: "Materials",
                type: "folder",
                children: h.material.map(_e => _e == null ? void 0 : _e.uiConfig).filter(_e => _e)
            } : (b = h.material) === null || b === void 0 ? void 0 : b.uiConfig
        }
        ];
        c.children.push(..._)
    }
    if (d != null && d.isCamera) {
        const _ = [{
            type: "button",
            label: "Set View",
            value: () => {
                var b;
                d.dispatchEvent({
                    type: "setView",
                    ui: !0,
                    camera: d
                }),
                (b = c.uiRefresh) === null || b === void 0 || b.call(c, "postFrame", !0)
            }
        }, {
            type: "button",
            label: "Activate main",
            hidden: () => {
                var b;
                return (b = d.userData.iCamera) === null || b === void 0 ? void 0 : b.isActiveCamera
            }
            ,
            value: () => {
                var b;
                d.dispatchEvent({
                    type: "activateMain",
                    ui: !0,
                    camera: d
                }),
                (b = c.uiRefresh) === null || b === void 0 || b.call(c, "postFrame", !0)
            }
        }, {
            type: "button",
            label: "Deactivate main",
            hidden: () => {
                var b;
                return !(!((b = d.userData.iCamera) === null || b === void 0) && b.isActiveCamera)
            }
            ,
            value: () => {
                var b;
                d.dispatchEvent({
                    type: "activateMain",
                    ui: !0,
                    camera: void 0
                }),
                (b = c.uiRefresh) === null || b === void 0 || b.call(c, "postFrame", !0)
            }
        }, {
            type: "checkbox",
            label: "Auto LookAt Target",
            getValue: () => {
                var b;
                return (b = d.userData.autoLookAtTarget) !== null && b !== void 0 && b
            }
            ,
            setValue: b => {
                var _e;
                d.userData.autoLookAtTarget = b,
                (_e = c.uiRefresh) === null || _e === void 0 || _e.call(c, "postFrame", !0)
            }
        }];
        c.children.push(..._)
    }
    return d.uiConfig = c,
    c
}

export default makeObject3DUiConfig;
