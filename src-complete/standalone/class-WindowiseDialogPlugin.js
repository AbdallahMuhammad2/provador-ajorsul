/* Standalone Class: WindowiseDialogPlugin */

class WindowiseDialogPlugin extends AViewerPlugin {
    constructor() {
        super(...arguments),
        this.enabled = !0,
        this.toJSON = void 0,
        this._previousMappings = {}
    }
    async onAdded(o) {
        await super.onAdded(o),
        this._previousMappings = {
            alert: o.alert,
            confirm: o.confirm,
            prompt: o.prompt
        },
        utility.appendToBody = c => {
            c.style.zIndex = "350",
            o.container.appendChild(c)
        }
        ,
        utility.makeIconHTML = c => "",
        ui_windowise.use({
            target: o.container
        }),
        o.alert = async c => {
            const h = c == null ? void 0 : c.split(":")[0]
              , _ = new js_modal({
                type: "info",
                title: h ?? "&ndsp;",
                text: (c == null ? void 0 : c.replace(h + ":", "").replace(/(\r?\n)/gm, "<br>")) || "",
                buttons: [{
                    key: 13,
                    text: "OK",
                    type: "main",
                    id: "ok"
                }],
                animation: "overlay"
            });
            return _.open(),
            _.getPromise()
        }
        ,
        o.confirm = async c => {
            const h = c == null ? void 0 : c.split(":")[0]
              , _ = new js_modal({
                type: "info",
                title: h ?? "&ndsp;",
                text: (c == null ? void 0 : c.replace(h || "", "").replace(":", "")) || "",
                buttons: [{
                    id: "no",
                    key: 27,
                    text: "No",
                    normal: !0
                }, {
                    id: "yes",
                    key: 13,
                    text: "Yes"
                }],
                animation: "overlay"
            });
            return _.open(),
            await _.getPromise() === "yes"
        }
        ,
        o.prompt = async (c, h, _=!0) => {
            const b = c == null ? void 0 : c.split(":")[0]
              , _e = new input({
                type: "info",
                title: b ?? "&ndsp;",
                placeholder: h ?? "",
                showCancel: _,
                animation: "overlay",
                text: (c == null ? void 0 : c.replace(b || "", "").replace(":", "")) || ""
            });
            return _e.open(),
            await _e.getPromise().catch(async () => null)
        }
    }
    async onRemove(o) {
        return o.alert = this._previousMappings.alert,
        o.confirm = this._previousMappings.confirm,
        o.prompt = this._previousMappings.prompt,
        super.onRemove(o)
    }
}

export default WindowiseDialogPlugin;
