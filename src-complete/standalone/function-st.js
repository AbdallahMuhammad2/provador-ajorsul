/* Standalone Function: St */

function St(At, Et=!0) {
        var Pt;
        _t = At,
        pt && (pt.enabled = !0),
        ht && (["Plugins"].includes(_t.title) ? ht.enable("modesUi") : ht.disable("modesUi")),
        vt = [];
        for (const It of bt) {
            const Dt = d.getPlugin(It);
            if (!(Dt != null && Dt.uiConfig))
                continue;
            const Gt = At.plugins.includes(It);
            S$2(Dt.uiConfig, "hidden", !Gt, !0),
            Gt && vt.push(Dt)
        }
        for (const It of c)
            (Pt = It.div) === null || Pt === void 0 || Pt.classList[_t !== It ? "remove" : "add"]("mode-button-selected", "button-bar-selected");
        d.getPlugin(TweakpaneUiPlugin).refreshPluginsEnabled(),
        Et && window.dispatchEvent(new CustomEvent("webgi_editorModeChanged",{
            detail: {
                mode: At
            }
        }))
    }
    for (const At of c) {
        const Et = ee$1({
            innerHTML: At.title,
            classList: ["mode-button", "button-bar-button"]
        });
        Et.onclick = () => {
            St(At)
        }
        ,
        At.div = Et,
        b.appendChild(Et)
    }
    St(c[0]),
    window.webgi_setEditorMode = St,
    window.webgi_editorModes = c,
    pt == null || pt.addEventListener("selectedObjectChanged", () => {
        pt != null && pt.getSelectedObject() && !["Picking", "Modifiers", "Configurators"].includes(_t.title) && St(c.find(At => At.plugins.includes(PickingPlugin)))
    }
    )
}

export default St;
