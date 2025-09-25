/* Standalone Function: makeSamplerUi */

function makeSamplerUi(d, o, c, h, _) {
    return _ = _ ?? ( () => d.setDirty && d.setDirty()),
    {
        type: "folder",
        label: c ?? o + " Sampler",
        hidden: () => !d[o] || h && h(),
        children: [ () => ({
            type: "vec2",
            label: "Repeat",
            bounds: [-100, 100],
            stepSize: .001,
            property: [d[o], "repeat"],
            onChange: _
        }), () => ({
            type: "vec2",
            label: "Offset",
            bounds: [-2, 2],
            stepSize: .001,
            property: [d[o], "offset"],
            onChange: _
        }), () => ({
            type: "vec2",
            label: "Center",
            bounds: [-2, 2],
            stepSize: .001,
            property: [d[o], "center"],
            onChange: _
        }), () => ({
            type: "input",
            label: "Rotation",
            stepSize: .001,
            bounds: [-Math.PI, Math.PI],
            property: [d[o], "rotation"],
            onChange: _
        }), () => ({
            type: "dropdown",
            label: "Color Space",
            property: [d[o], "colorSpace"],
            children: [["Linear", three_module.Zr2], ["sRGB", three_module.er$]].map(b => ({
                label: b[0],
                value: b[1]
            })),
            onChange: [ () => {
                const b = d[o];
                b && (b.needsUpdate = !0)
            }
            , _]
        }), () => ({
            type: "checkbox",
            label: "Flip Y",
            getValue: () => {
                var b, _e;
                return (_e = (b = d[o]) === null || b === void 0 ? void 0 : b.flipY) !== null && _e !== void 0 && _e
            }
            ,
            setValue: b => {
                const _e = d[o];
                if (_e && _e.flipY !== b)
                    if (_e.image && ImageBitmap && _e.image instanceof ImageBitmap) {
                        const nt = _e
                          , it = _e.source.data;
                        createImageBitmap(it, {
                            imageOrientation: "flipY"
                        }).then(at => {
                            it.close && it.close(),
                            nt.flipY = b,
                            nt.source.data = at,
                            nt.source.needsUpdate = !0,
                            nt.needsUpdate = !0,
                            _ && _()
                        }
                        )
                    } else
                        _e.flipY = b,
                        _e.needsUpdate = !0,
                        _ && _()
            }
        }), () => ({
            type: "dropdown",
            label: "Wrap S",
            property: [d[o], "wrapS"],
            children: [["ClampToEdge", three_module.ghU], ["MirroredRepeat", three_module.kTW], ["Repeat", three_module.GJx]].map(b => ({
                label: b[0],
                value: b[1]
            })),
            onChange: [ () => {
                d[o] && (d[o].needsUpdate = !0)
            }
            , _]
        }), () => ({
            type: "dropdown",
            label: "Wrap T",
            property: [d[o], "wrapT"],
            children: [["ClampToEdge", three_module.ghU], ["MirroredRepeat", three_module.kTW], ["Repeat", three_module.GJx]].map(b => ({
                label: b[0],
                value: b[1]
            })),
            onChange: [ () => {
                d[o] && (d[o].needsUpdate = !0)
            }
            , _]
        }), () => ({
            type: "input",
            label: "Anisotropy",
            bounds: [1, 6],
            stepSize: 1,
            property: [d[o], "anisotropy"],
            onChange: [ () => {
                d[o] && (d[o].needsUpdate = !0),
                d.needsUpdate = !0
            }
            , _]
        }), () => ({
            type: "dropdown",
            label: "Min Filter",
            property: [d[o], "minFilter"],
            children: [["Linear", three_module.k6q], ["Nearest", three_module.hxR], ["NearestMipmapNearest", three_module.pHI], ["NearestMipmapLinear", three_module.a$r], ["LinearMipmapNearest", three_module.kRr], ["LinearMipmapLinear", three_module.$_I]].map(b => ({
                label: b[0],
                value: b[1]
            })),
            onChange: [ () => {
                d[o] && (d[o].needsUpdate = !0)
            }
            , _]
        }), () => ({
            type: "dropdown",
            label: "Mag Filter",
            property: [d[o], "magFilter"],
            children: [["Linear", three_module.k6q], ["Nearest", three_module.hxR]].map(b => ({
                label: b[0],
                value: b[1]
            })),
            onChange: [ () => {
                d[o] && (d[o].needsUpdate = !0)
            }
            , _]
        })]
    }
}

export default makeSamplerUi;
