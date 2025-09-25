/* Standalone Class: BaseIJewel3DKeyPlugin */

class BaseIJewel3DKeyPlugin extends AViewerPlugin {
    setKey(o) {
        this._checking || this._checkPromise || (this._checking = Date.now(),
        this._checkPromise = this._check(o),
        this._checkPromise.then( () => this._checkPromise = void 0))
    }
    async _check(o) {
        await new LicenseVerification(APP_NAME,APP_VERSION).verify(o) || (console1.error(this._errMessage),
        this._logoContainer = this._createContainerLogo())
    }
    _createContainerLogo() {
        const o = document.createElement("div");
        o.innerHTML = logoSvg,
        o.style.position = "absolute",
        o.style.padding = "1rem",
        o.style.left = "0",
        o.style.bottom = "0",
        o.style.width = "100%",
        o.style.height = "auto",
        o.style.display = "flex",
        o.style.alignItems = "center",
        o.style.backgroundColor = "rgba(0, 0, 0, 0)",
        o.style.zIndex = "9999",
        o.style.pointerEvents = "none";
        const c = o.children[0];
        c.style.width = "calc(min(20%, 150px))",
        c.style.height = "auto",
        c.onclick = () => {
            window.open("https://ijewel3d.com/", "_top")
        }
        ,
        this._logoContainer = o;
        const h = document.getElementById("webgi-logo");
        return h && h.remove(),
        o
    }
    constructor() {
        super(),
        this._errMessage = `iJewel3D ${APP_NAME} ${APP_VERSION}. FOR EVALUATION PURPOSES ONLY. For more information visit: https://ijewel3d.com/`,
        this._checking = 0,
        this._licenseInUse = !1,
        this._autoKey = !0,
        setInterval( () => {
            var o;
            if (this._checkPromise && Date.now() - this._checking > 15e3 && (console1.error(this._errMessage),
            this._logoContainer = this._createContainerLogo(),
            typeof this._checkPromise.cancel == "function" && this._checkPromise.cancel(),
            this._checkPromise = void 0),
            this._logoContainer && !this._logoContainer.parentElement && this._viewer && this._licenseInUse) {
                this._lContainer.appendChild(this._logoContainer);
                const c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(LoadingScreenPlugin);
                c && (c.logoImage = logoSvgUrl,
                LoadingScreenPlugin.LS_DEFAULT_LOGO = logoSvgUrl)
            }
        }
        , 5e3)
    }
    get _lContainer() {
        var o;
        const c = (o = this._viewer) === null || o === void 0 ? void 0 : o.container;
        if (!c)
            return document.body;
        const h = window.getComputedStyle(c).position;
        return h !== "absolute" && h !== "relative" && h !== "fixed" ? document.body : c
    }
    use() {
        var o;
        if (!this._licenseInUse && (this._licenseInUse = !0,
        !this._checking))
            if (this._autoKey)
                this.setKey("auto");
            else {
                console1.error(this._errMessage),
                this._logoContainer = this._createContainerLogo(),
                this._lContainer.appendChild(this._logoContainer);
                const c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(LoadingScreenPlugin);
                c && (LoadingScreenPlugin.LS_DEFAULT_LOGO = logoSvgUrl,
                c.logoImage = logoSvgUrl)
            }
    }
    unuse() {}
    async onAdded(o) {
        await super.onAdded(o)
    }
}

export default BaseIJewel3DKeyPlugin;
