/* Standalone Class: LicenseVerification */

class LicenseVerification {
    constructor(o, c) {
        this.PRODUCT_ID = "IJewel3D_WebGi_V0",
        this.KEY_TYPE_ID = "online-v1",
        this.TOKEN_FILE = "0.txt",
        this.PUBLIC_KEY_FILE = "1.json",
        this.KEY_SERVER = "https://license.ijewel3d.com",
        this.KEY_SERVER_VERIFY = "/api/v1/verify",
        this.KEY_SERVER_CERTS = "/api/v1/certs/" + this.KEY_TYPE_ID,
        this.id = "",
        this.idHash = "",
        this.appVersion = "",
        this.appName = "",
        this._storage = {
            getItem: async h => localStorage.getItem(h),
            setItem: async (h, _) => (localStorage.setItem(h, _),
            _)
        },
        this.silent = !0,
        this.appVersion = c,
        this.appName = o
    }
    _getOriginId() {
        const o = getCurrentDomain(window);
        if (!o || !(o != null && o[0]))
            throw new Error("Failed to get id");
        return "\\\\" + o.map(c => btoa(c)).join("\\\\")
    }
    _getStorage() {
        return this._storage
    }
    async init() {
        var o, c;
        if (this.id = this.id || this._getOriginId(),
        !this.id)
            throw new Error("Failed to get machine id");
        this.idHash = await hash(this.id);
        const h = this._getStorage()
          , _ = this.idHash + this.TOKEN_FILE;
        let b = (o = await h.getItem(_)) !== null && o !== void 0 ? o : await h.setItem(_, "");
        const _e = this.idHash + this.PUBLIC_KEY_FILE
          , nt = (c = await h.getItem(_e)) !== null && c !== void 0 ? c : null;
        let it = await this.getPublicKey().catch( () => null);
        return !it && nt && (it = JSON.parse(nt)),
        it !== nt && await h.setItem(_e, JSON.stringify(it)),
        it || this._throw(new Error("Failed to get public key")),
        {
            token: b,
            publicKey: it
        }
    }
    async verify(o, c) {
        var h;
        try {
            let _, b = (c = c ?? await this.init()).token;
            b && !await jwt.verify(b, c.publicKey, {
                algorithm: "RS512",
                throwError: !1
            }) && (b = ""),
            b && (_ = jwt.decode(b),
            ((h = _.payload) === null || h === void 0 ? void 0 : h.key) !== o && (b = "")),
            b && b.length || (b = await this.setLicenseKey(o)),
            _ = b ? jwt.decode(b) : void 0;
            let _e = !1;
            return _e = _e || b && await jwt.verify(b, c.publicKey, {
                algorithm: "RS512",
                throwError: !1
            }),
            _e = _e || !!_ && await this.verifyData(_),
            _e
        } catch (_) {
            return this.silent || console.error(_),
            !1
        }
    }
    async writeToken(o) {
        const c = this.idHash + this.TOKEN_FILE;
        await this._getStorage().setItem(c, o)
    }
    async verifyData(o) {
        var c, h, _;
        return ((c = o.payload) === null || c === void 0 ? void 0 : c.sub) === this.id && ((h = o.payload) === null || h === void 0 ? void 0 : h.app) === this.appName + "_" + this.appVersion && ((_ = o.payload) === null || _ === void 0 ? void 0 : _.pid) === this.PRODUCT_ID
    }
    async _getPublicKeyFromServer() {
        return fetch(this.KEY_SERVER + this.KEY_SERVER_CERTS).then(o => o.json()).catch(o => ({
            status: o == null ? void 0 : o.status,
            error: o
        }))
    }
    async _validateKeyFromServer(o) {
        return await fetch(this.KEY_SERVER + this.KEY_SERVER_VERIFY, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                key: o,
                id: this.id,
                app: {
                    name: this.appName,
                    version: this.appVersion
                },
                pid: this.PRODUCT_ID
            })
        }).then(c => c.json()).catch(c => ({
            status: c == null ? void 0 : c.status,
            error: c
        }))
    }
    _throw(o) {
        if (!this.silent)
            throw o;
        return null
    }
    async setLicenseKey(o) {
        const c = await this._validateKeyFromServer(o);
        if (c.error)
            return this._throw((c.status ? c.status + ": " : "") + +c.error);
        const h = c.token;
        return h ? (await this.writeToken(h),
        h) : this._throw(new Error("Invalid license key, no token"))
    }
    async getPublicKey() {
        const o = await this._getPublicKeyFromServer();
        return o.error ? this._throw(o.error) : o.jwk || this._throw(new Error("Invalid public key"))
    }
}

export default LicenseVerification;
