(function(R, l) {
    typeof exports == "object" && typeof module < "u" ? l(exports, require("webgi")) : typeof define == "function" && define.amd ? define(["exports", "webgi"], l) : (R = typeof globalThis < "u" ? globalThis : R || self,
    l(R.ij_vto = {}, R.webgi))
}
)(this, function(R, l) {
    "use strict";
    /**
 * @license
 * iJewel3D Ring Virtual TryOn (Web)
 * Copyright 2024 Palash Bansal (palash@ijewel3d.com)
 * https:
 * 
 */
    var Li;
    const tc = {
        ES256: {
            name: "ECDSA",
            namedCurve: "P-256",
            hash: {
                name: "SHA-256"
            }
        },
        ES384: {
            name: "ECDSA",
            namedCurve: "P-384",
            hash: {
                name: "SHA-384"
            }
        },
        ES512: {
            name: "ECDSA",
            namedCurve: "P-521",
            hash: {
                name: "SHA-512"
            }
        },
        HS256: {
            name: "HMAC",
            hash: {
                name: "SHA-256"
            }
        },
        HS384: {
            name: "HMAC",
            hash: {
                name: "SHA-384"
            }
        },
        HS512: {
            name: "HMAC",
            hash: {
                name: "SHA-512"
            }
        },
        RS256: {
            name: "RSASSA-PKCS1-v1_5",
            hash: {
                name: "SHA-256"
            }
        },
        RS384: {
            name: "RSASSA-PKCS1-v1_5",
            hash: {
                name: "SHA-384"
            }
        },
        RS512: {
            name: "RSASSA-PKCS1-v1_5",
            hash: {
                name: "SHA-512"
            }
        }
    };
    function ic(t) {
        return JSON.parse(atob(t.split(".")[1]))
    }
    async function sc(t, e, i) {
        const s = tc[i.algorithm || "RS512"]
          , n = await crypto.subtle.importKey("jwk", e, s, !0, ["verify"])
          , r = t.split(".")
          , a = new Uint8Array(atob(r[2]).split("").map(h => h.charCodeAt(0)))
          , o = new Uint8Array(atob(r[0] + "." + r[1]).split("").map(h => h.charCodeAt(0)));
        return await crypto.subtle.verify(s, n, a, o)
    }
    const nc = {
        decode: ic,
        verify: sc
    };
    class rc {
        constructor(e, i) {
            this.PRODUCT_ID = "IJewel3D_WebTryOn_1",
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
                getItem: async s => localStorage.getItem(s),
                setItem: async (s, n) => (localStorage.setItem(s, n),
                n)
            },
            this.silent = !1,
            this.appVersion = i,
            this.appName = e
        }
        _getOriginId() {
            const e = oc(window);
            if (!e)
                throw new Error("Failed to get origin");
            return e
        }
        _getStorage() {
            return this._storage
        }
        async init() {
            if (this.id = this.id ?? this._getOriginId(),
            !this.id)
                throw new Error("Failed to get machine id");
            this.idHash = await ac(this.id);
            const e = this._getStorage()
              , i = this.idHash + this.TOKEN_FILE;
            return {
                token: await e.getItem(i) ?? await e.setItem(i, "")
            }
        }
        async verify(e, i) {
            try {
                i = i ?? await this.init();
                let s, n = i.token;
                (!n || !n.length) && (n = await this.setLicenseKey(e)),
                s = nc.decode(n);
                let r = !1;
                return r = r || await this.verifyData(s),
                r
            } catch {
                return !1
            }
        }
        async writeToken(e) {
            const i = this.idHash + this.TOKEN_FILE;
            await this._getStorage().setItem(i, e)
        }
        async verifyData(e) {
            var i, s, n;
            return ((i = e.payload) == null ? void 0 : i.sub) === this.id && ((s = e.payload) == null ? void 0 : s.app) === this.appName + "_" + this.appVersion && ((n = e.payload) == null ? void 0 : n.pid) === this.PRODUCT_ID
        }
        async _getPublicKeyFromServer() {
            return fetch(this.KEY_SERVER + this.KEY_SERVER_CERTS).then(e => e.json()).catch(e => ({
                error: e
            }))
        }
        async _validateKeyFromServer(e) {
            return await fetch(this.KEY_SERVER + this.KEY_SERVER_VERIFY, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    key: e,
                    id: this.id,
                    app: {
                        name: this.appName,
                        version: this.appVersion
                    },
                    pid: this.PRODUCT_ID
                })
            }).then(i => i.json()).catch(i => ({
                error: i
            }))
        }
        _throw(e) {
            if (!this.silent)
                throw e;
            return null
        }
        async setLicenseKey(e) {
            const i = await this._validateKeyFromServer(e);
            if (i.error)
                return this._throw(i.error);
            const s = i.token;
            return s ? (await this.writeToken(s),
            s) : this._throw(new Error("Invalid license key, no token"))
        }
    }
    async function ac(t) {
        const e = new TextEncoder().encode(t)
          , i = await crypto.subtle.digest("SHA-256", e);
        return Array.from(new Uint8Array(i)).map(n => n.toString(16).padStart(2, "0")).join("")
    }
    function oc(t) {
        let e, i, s, n;
        const r = function(f, g, y) {
            if (f.length != g)
                return !1;
            for (let b = 0; b < g; b++)
                for (let w = 0; w < y.length; w += 2)
                    if (b == y[w] && f.charCodeAt(b) != y[w + 1])
                        return !1;
            return !0
        }
          , a = function(f, g, y) {
            return r(g, y, f)
        }
          , o = function(f, g, y) {
            return a(g, f, y)
        }
          , h = function(f, g, y) {
            return o(g, y, f)
        };
        for (let f in t)
            if (r(f, 8, [7, 116, 5, 101, 3, 117, 0, 100])) {
                e = f;
                break
            }
        for (let f in t[e])
            if (h(6, f, [5, 110, 0, 100])) {
                i = f;
                break
            }
        for (let f in t[e])
            if (o(f, [7, 110, 0, 108], 8)) {
                s = f;
                break
            }
        if (!("~" > i)) {
            for (let f in t[e][s])
                if (a([7, 101, 0, 104], f, 8)) {
                    n = f;
                    break
                }
        }
        if (!e || !t[e])
            return;
        const c = t[e][i]
          , d = !!t[e][s] && t[e][s][n]
          , u = c || d;
        if (u)
            return u
    }
    const ba = "RingTryon"
      , xa = "0.0.1";
    class lc extends l.AViewerPlugin {
        constructor() {
            super(),
            this._errMessage = `iJewel3D ${ba} ${xa}. FOR EVALUATION PURPOSES ONLY. For more information visit: https://ijewel3d.com/`,
            this._checking = 0,
            this._licenseInUse = !1,
            setInterval( () => {
                this._checkPromise && Date.now() - this._checking > 15e3 && (console.error(this._errMessage),
                this._logoContainer = this._createContainerLogo(),
                typeof this._checkPromise.cancel == "function" && this._checkPromise.cancel(),
                this._checkPromise = void 0),
                this._logoContainer && !this._logoContainer.parentElement && this._viewer && this._licenseInUse && this._lContainer.appendChild(this._logoContainer)
            }
            , 1500)
        }
        async setKey(e) {
            this._checking || this._checkPromise || (this._checking = Date.now(),
            this._checkPromise = this._check(e),
            await this._checkPromise,
            this._checkPromise = void 0)
        }
        async _check(e) {
            await new rc(ba,xa).verify(e) || (console.error(this._errMessage),
            this._logoContainer = this._createContainerLogo())
        }
        _createContainerLogo() {
            const e = document.createElement("div");
            e.innerHTML = hc,
            e.style.position = "absolute",
            e.style.padding = "1rem",
            e.style.left = "0",
            e.style.bottom = "0",
            e.style.width = "100%",
            e.style.height = "auto",
            e.style.display = "flex",
            e.style.alignItems = "center",
            e.style.backgroundColor = "rgba(0, 0, 0, 0)",
            e.style.zIndex = "9999",
            e.style.pointerEvents = "none";
            const i = e.children[0];
            return i.style.width = "calc(min(20%, 150px))",
            i.style.height = "auto",
            i.onclick = () => {
                window.open("https://ijewel3d.com/", "_top")
            }
            ,
            this._logoContainer = e,
            e.style.display = "none",
            e
        }
        get _lContainer() {
            var s;
            const e = (s = this._viewer) == null ? void 0 : s.container;
            if (!e)
                return document.body;
            const i = window.getComputedStyle(e).position;
            return i !== "absolute" && i !== "relative" ? document.body : e
        }
        use() {
            this._licenseInUse || (this._checking || (console.error(this._errMessage),
            this._logoContainer = this._createContainerLogo(),
            this._lContainer.appendChild(this._logoContainer)),
            this._licenseInUse = !0)
        }
        unuse() {}
        async onAdded(e) {
            await super.onAdded(e)
        }
    }
    const hc = `
<svg width="412" height="300" viewBox="0 0 206 150" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_224_112)">
<path d="M152.296 9.56293L152.198 9.48712H152.524L152.296 9.56293Z" fill="white"/>
<path d="M152.198 9.48712H130.909L135.536 6H147.67L152.198 9.48712Z" fill="white"/>
<path d="M50.0633 13.05V27.7566C49.9117 23.8146 48.4707 20.4791 45.7404 17.7501C43.0102 15.0968 39.749 13.7323 35.8053 13.7323H31.5583V61.7181C31.5583 62.2488 31.7099 62.6278 32.0891 63.0068C32.3925 63.3859 32.8475 63.6133 33.3026 63.6133H22.8366C23.3675 63.6133 23.7467 63.3859 24.05 63.0068C24.3534 62.6278 24.5809 62.2488 24.5809 61.7181V13.7323H20.4097C16.5418 13.7323 13.2048 15.0968 10.4746 17.7501C7.66849 20.4033 6.15168 23.7388 6 27.7566V13.05H50.0633Z" fill="white"/>
<path d="M63.4871 35.4889L63.9421 35.0341C65.3831 33.5179 66.9758 32.2292 68.6443 31.1679C70.3127 30.1066 72.2846 29.7276 74.484 30.1066H74.7873C74.8632 30.1066 74.939 30.1824 75.0149 30.2582C74.3323 31.4711 73.7256 32.5324 73.2705 33.2905C73.0915 33.6186 72.8889 33.9702 72.6675 34.3546L72.6668 34.3558L72.6662 34.3568C72.3253 34.9486 71.9397 35.618 71.5262 36.3986C71.5262 36.3986 71.4503 36.3986 71.3745 36.3228C71.3745 36.3228 71.2228 36.1712 71.2228 36.0954C71.2228 36.0196 71.147 35.8679 71.0712 35.7921V35.7163C70.1611 34.4276 68.9476 33.897 67.5066 34.2002C66.0657 34.5034 64.8522 35.1099 63.8663 36.0196C63.3354 36.5502 62.8045 37.1567 62.2737 37.7631V61.7181C62.2737 62.2488 62.4253 62.6278 62.8045 63.0068C63.1079 63.3859 63.5629 63.6133 64.0938 63.6891H53.552C54.0829 63.6891 54.4621 63.3859 54.7654 63.0068C55.0688 62.6278 55.2963 62.173 55.2963 61.7181V35.3373C55.2963 34.8066 55.1446 34.3518 54.7654 33.9728C54.4621 33.5937 54.007 33.3663 53.552 33.2905L62.3495 29.7276V36.5502L63.4871 35.4131V35.4889Z" fill="white"/>
<path d="M112.404 30.4098C112.632 30.7889 112.708 31.1679 112.556 31.5469L112.48 31.3953L100.497 62.4762L88.5903 31.4711C88.4386 31.0921 88.4386 30.7131 88.6662 30.334C88.8937 29.955 89.197 29.7276 89.6521 29.7276H78.5794C79.7928 29.8792 80.6271 30.4856 81.0821 31.5469L93.3683 63.4617H100.118C100.042 63.6133 100.042 63.6891 100.042 63.7649C99.2838 65.8117 98.5254 67.8585 97.6912 69.8295C96.8569 71.952 95.7952 74.0746 94.5817 76.0456C94.5059 76.1214 94.5059 76.1972 94.5059 76.1972C94.2025 76.7279 93.8233 77.2585 93.2924 77.865C92.7615 78.4715 92.2307 78.7747 91.6239 78.7747C90.9414 78.6989 90.4863 78.244 90.3346 77.4101C90.183 76.5763 90.1071 75.6666 90.183 74.6811C90.2588 73.6956 90.3346 72.7859 90.4105 72.1037C90.4863 71.8762 90.4863 71.6488 90.4863 71.4972C90.5353 71.3993 90.521 71.333 90.5048 71.2575C90.4958 71.2161 90.4863 71.1719 90.4863 71.1182L83.5848 72.5585C83.5848 72.7859 83.6607 72.9375 83.7365 73.0891C83.7618 73.1397 83.7955 73.1902 83.8292 73.2408C83.8966 73.3419 83.964 73.4429 83.964 73.544L84.0124 73.6337C84.5317 74.5981 85.127 75.7034 85.9359 76.8795C86.7701 78.0924 87.6802 79.1537 88.742 79.836C89.7279 80.594 90.8655 80.594 92.0031 79.9876C93.2924 79.0779 94.3542 77.9408 95.1884 76.5763C96.4019 74.5295 97.4637 72.4069 98.3737 70.2085C99.208 68.1617 99.9664 66.1907 100.725 64.1439C100.725 64.0681 100.763 63.9734 100.801 63.8786C100.839 63.7839 100.876 63.6891 100.876 63.6133L113.238 31.6227C113.694 30.5615 114.528 29.955 115.665 29.8792H111.418C111.873 29.8792 112.177 30.1066 112.404 30.4098Z" fill="white"/>
<path d="M198.18 61.7181C198.18 62.2488 198.332 62.7036 198.711 63.0068C199.014 63.3859 199.469 63.5375 200 63.6133H189.458C189.989 63.6133 190.368 63.3101 190.672 63.0068C190.975 62.6278 191.202 62.2488 191.202 61.7181V41.2502C191.202 40.3405 191.202 39.2793 191.051 38.0663C190.899 36.8534 190.52 35.7163 189.913 34.655C188.776 32.9115 187.335 31.8502 185.514 31.6228C183.694 31.3195 181.95 31.6986 180.206 32.7599C178.613 33.8212 177.172 35.1099 176.11 36.7018V61.7181C176.11 62.2488 176.262 62.6278 176.641 63.0068C176.944 63.3859 177.4 63.6133 177.93 63.6891H167.389C167.919 63.6891 168.299 63.3859 168.602 63.0068C168.905 62.6278 169.133 62.173 169.133 61.7181V35.3373C169.133 34.8066 168.981 34.3518 168.602 33.9728C168.299 33.5937 167.844 33.3663 167.389 33.2905L176.186 29.7276V35.4131C177.248 34.1244 178.461 32.9873 179.902 32.0018C182.253 30.5615 184.756 29.8034 187.562 29.6518C191.127 29.8034 194.084 31.1679 196.36 33.897C197.194 34.9583 197.725 36.0196 197.952 37.0809C198.18 38.1422 198.256 39.5825 198.256 41.4777V61.6423L198.18 61.7181Z" fill="white"/>
<path d="M160.108 24.7247C160.866 26.0891 161.625 27.4535 162.156 28.9695H162.004C163.142 32.0018 163.672 35.1099 163.672 38.2938C163.672 41.4777 163.142 44.5857 162.004 47.618C161.473 49.0583 160.79 50.4987 159.956 51.8632C159.122 53.1519 158.212 54.4406 157.226 55.6536C156.164 56.8665 155.027 57.9278 153.813 58.8374C152.6 59.8229 151.386 60.6568 150.021 61.3391C147.291 62.7036 144.409 63.4617 141.451 63.4617C138.493 63.4617 135.611 62.7794 132.881 61.3391C131.592 60.6568 130.303 59.8229 129.089 58.8374C127.876 57.9278 126.738 56.8665 125.676 55.6536C124.69 54.4406 123.78 53.2277 122.946 51.8632C122.188 50.4987 121.429 49.1341 120.898 47.618C119.761 44.6615 119.23 41.4777 119.23 38.2938C119.23 35.1099 119.761 32.0018 120.898 28.9695C121.429 27.5292 122.112 26.0888 122.946 24.7243C123.78 23.3598 124.69 22.1469 125.676 20.934C126.738 19.7969 127.876 18.7356 129.089 17.7501C130.303 16.8404 131.516 16.0065 132.881 15.3243L134.095 16.3856C134.057 16.4235 134 16.4614 133.943 16.4993C133.886 16.5372 133.829 16.5751 133.791 16.613C132.729 17.4469 131.819 18.4323 130.985 19.5694C130.227 20.7065 129.544 21.9195 129.013 23.1324C128.482 24.3453 128.027 25.634 127.648 26.9227C127.269 28.1356 127.041 29.4243 126.814 30.7131C126.435 33.2905 126.207 35.8679 126.207 38.4454C126.207 41.0228 126.435 43.6003 126.814 46.1777C127.041 47.3906 127.345 48.6793 127.648 49.968C128.027 51.2567 128.482 52.5455 129.013 53.7584C129.544 54.9713 130.227 56.1084 130.985 57.2455C131.744 58.3826 132.729 59.3681 133.791 60.2778C136.066 62.0213 138.645 63.0068 141.527 63.0068C144.409 62.931 146.987 62.0213 149.263 60.2778C150.324 59.3681 151.235 58.3826 152.069 57.2455C152.827 56.1842 153.51 54.9713 154.041 53.7584C154.572 52.5455 155.027 51.2568 155.406 49.968C155.785 48.7551 156.013 47.4664 156.24 46.1777C156.619 43.6003 156.847 41.0228 156.847 38.4454C156.847 35.8679 156.619 33.2905 156.24 30.7131C156.013 29.5006 155.709 28.2123 155.406 26.9241L155.406 26.9227C155.027 25.634 154.572 24.3453 154.041 23.1324C153.51 21.8437 152.827 20.7065 152.069 19.5694C151.31 18.5081 150.324 17.4469 149.263 16.613C149.225 16.5751 149.168 16.5372 149.111 16.4993C149.054 16.4614 148.997 16.4235 148.959 16.3856L150.173 15.3243C151.538 16.0065 152.751 16.7646 153.965 17.7501C155.178 18.6598 156.316 19.7211 157.378 20.934C158.364 22.0711 159.274 23.3601 160.108 24.7247Z" fill="white"/>
<path d="M137.887 17.1436L130.909 11.0033L130.606 10.9275H151.841L141.375 20.2517L137.887 17.1436Z" fill="white"/>
<path d="M70.7033 93.33C70.7033 93.0241 70.6061 92.755 70.4119 92.5225C70.2177 92.29 69.9689 92.1432 69.6654 92.0698L74.8122 89.9348V114.074C74.8122 115.677 74.4055 117.109 73.5862 118.363C72.7729 119.617 71.5408 120.265 69.89 120.308C68.0328 120.198 66.7097 119.25 65.9024 117.463C65.5868 116.723 65.423 115.965 65.423 115.182H65.8357C65.8357 115.922 65.9813 116.619 66.2727 117.274C66.5883 117.843 67.086 118.216 67.7536 118.381C68.4273 118.546 69.0281 118.485 69.5683 118.191C69.9446 117.953 70.2056 117.555 70.3694 116.999C70.5272 116.442 70.6244 115.885 70.6486 115.322C70.679 114.766 70.6911 114.368 70.6911 114.129L70.7033 93.33Z" fill="white"/>
<path d="M63.888 93.7646C63.888 93.4587 63.7908 93.1895 63.5966 92.9571C63.4024 92.7246 63.1536 92.5778 62.8501 92.5044L67.9969 90.3694V107.284L63.888 109.419V93.7646Z" fill="white"/>
<path d="M92.6617 100.084H80.517C80.4745 101.717 80.8387 103.338 81.6095 104.947C82.3742 106.556 83.6488 107.572 85.421 107.994C87.606 108.275 89.5724 107.731 91.3143 106.36C91.6178 106.079 91.8969 105.773 92.1458 105.437C92.1761 105.394 92.2126 105.369 92.2732 105.351C92.3279 105.339 92.3825 105.351 92.4371 105.394C92.4796 105.424 92.5039 105.461 92.5221 105.516C92.5342 105.571 92.5221 105.626 92.4796 105.681C92.2186 106.018 91.9334 106.336 91.6299 106.642C89.9851 108.483 87.9155 109.584 85.4271 109.945C82.6291 110.043 80.4381 109.058 78.8358 106.984C77.2396 104.917 76.3838 102.622 76.2746 100.114C76.1896 98.1078 76.5963 96.2236 77.5006 94.474C78.3988 92.7244 79.8069 91.452 81.7127 90.6567C83.2786 90.0694 84.8748 89.8981 86.5074 90.1306C88.8016 90.62 90.4707 91.9108 91.5085 94.003C92.3157 95.7954 92.7042 97.6551 92.6617 99.6066V100.084ZM80.517 99.6677H88.3646C88.3768 99.6372 88.3828 99.6188 88.3828 99.6066C89.0322 97.8753 89.3782 96.193 89.4207 94.5413C89.3539 92.5348 88.3464 91.2195 86.4103 90.6078C84.1283 90.1612 82.4349 90.9626 81.3242 93.0119C80.6748 94.8105 80.4017 96.6824 80.517 98.6217V99.6677Z" fill="white"/>
<path d="M123.609 90.9869C123.694 90.7483 123.67 90.5281 123.548 90.3262C123.421 90.1243 123.233 90.0142 122.966 90.002H125.478C124.799 90.057 124.325 90.3996 124.046 91.0297L116.902 109.731L117.006 110.006H112.587L108.393 98.9824L104.284 109.731L104.388 110.006H99.9691L92.7648 91.0909C92.4857 90.4485 92.0062 90.0876 91.3143 90.002H97.7902C97.5414 90.0325 97.3532 90.1427 97.2197 90.3445C97.0862 90.5464 97.0619 90.7728 97.1469 91.0236L104.078 109.144L108.169 98.4135L105.389 91.0909C105.11 90.4485 104.63 90.0876 103.938 90.002H110.396C110.202 90.0325 110.044 90.1182 109.917 90.265C109.789 90.4118 109.729 90.577 109.729 90.7544C109.729 90.9318 109.741 90.9257 109.771 91.0236L110.396 92.6141L110.602 93.2014L116.702 109.144L123.609 90.9869Z" fill="white"/>
<path d="M140.463 100.084H128.319C128.276 101.717 128.64 103.338 129.405 104.947C130.176 106.556 131.444 107.572 133.217 107.994C135.402 108.275 137.368 107.731 139.11 106.36C139.413 106.079 139.693 105.773 139.941 105.437C139.966 105.394 140.008 105.369 140.069 105.351C140.124 105.339 140.178 105.351 140.233 105.394C140.275 105.424 140.3 105.461 140.318 105.516C140.33 105.571 140.318 105.626 140.275 105.681C140.014 106.018 139.729 106.336 139.426 106.642C137.781 108.483 135.711 109.584 133.223 109.945C130.425 110.043 128.234 109.058 126.632 106.984C125.035 104.917 124.18 102.622 124.07 100.114C123.985 98.1078 124.398 96.2236 125.296 94.474C126.195 92.7244 127.603 91.452 129.508 90.6567C131.074 90.0694 132.67 89.8981 134.303 90.1306C136.597 90.62 138.266 91.9108 139.304 94.003C140.117 95.7954 140.506 97.6551 140.463 99.6066V100.084ZM128.319 99.6677H136.166C136.179 99.6372 136.185 99.6188 136.185 99.6066C136.834 97.8753 137.18 96.193 137.222 94.5413C137.156 92.5348 136.148 91.2195 134.212 90.6078C131.93 90.1612 130.231 90.9626 129.126 93.0119C128.477 94.8105 128.203 96.6824 128.319 98.6217V99.6677Z" fill="white"/>
<path d="M146.338 108.899C146.338 109.193 146.435 109.443 146.63 109.651C146.824 109.859 147.067 109.982 147.358 110.006H141.191C141.483 109.976 141.726 109.865 141.92 109.664C142.114 109.462 142.211 109.217 142.211 108.923V83.2239C142.211 82.9303 142.114 82.6794 141.92 82.4592C141.726 82.2451 141.483 82.1166 141.191 82.0738L146.338 80V108.899Z" fill="white"/>
<path d="M69.289 82.2635L67.7717 81.1011C67.7656 81.095 67.7595 81.095 67.7535 81.0889C67.7474 81.0828 67.7352 81.0828 67.7292 81.0828H63.7477C63.7356 81.0828 63.7295 81.0828 63.7234 81.0889C63.7174 81.095 63.7113 81.095 63.7052 81.1011L62.1879 82.2635H69.289Z" fill="white"/>
<path d="M62.2369 82.5022L65.6843 85.5793H65.6904C65.6964 85.5854 65.7025 85.5854 65.7086 85.5915C65.7146 85.5915 65.7268 85.5976 65.7329 85.5976C65.7389 85.5976 65.7511 85.5977 65.7571 85.5915C65.7632 85.5915 65.7693 85.5854 65.7753 85.5793H65.7814L69.2288 82.4961H62.2369V82.5022Z" fill="white"/>
<path d="M158.028 102.304C157.834 102.304 157.779 102.23 157.779 102.084C157.779 101.876 157.876 101.71 158.028 101.71C158.18 101.71 158.58 101.821 159.096 101.821C159.994 101.821 160.656 101.105 160.656 99.9364C160.656 98.7679 160.547 98.6945 159.661 98.6945C158.774 98.6945 158.58 99.239 158.295 99.9608C158.198 100.181 158.101 100.248 157.949 100.248C157.797 100.248 157.482 100.077 157.482 99.7528C157.482 99.1227 158.416 98.3764 159.697 98.3764C160.978 98.3764 161.821 98.7496 161.821 100.065C161.821 101.38 160.656 101.876 159.794 101.949V101.998C160.547 102.133 161.427 102.665 161.427 103.735C161.427 105.509 159.988 106.225 158.501 106.225C157.014 106.225 156.201 105.369 156.201 104.812C156.201 104.255 156.498 104.182 156.766 104.182C157.033 104.182 157.027 104.304 157.087 104.531C157.336 105.448 157.737 105.907 158.55 105.907C159.363 105.907 160.201 105.289 160.201 103.588C160.201 101.888 159.964 102.2 158.993 102.2C158.532 102.2 158.186 102.304 158.028 102.304Z" fill="white"/>
<path d="M168.74 97.4587L168.789 97.4954L166.944 105.057C166.846 105.418 166.834 105.687 167.041 105.687C167.35 105.687 167.854 104.879 168.06 104.469L168.297 104.641C167.915 105.509 167.302 106.25 166.488 106.25C165.675 106.25 165.815 105.754 166.021 104.947C166.13 104.549 166.24 104.139 166.331 103.735H166.306C165.645 104.953 164.686 106.25 163.381 106.25C162.076 106.25 162.288 105.491 162.288 104.739C162.288 103.362 163.448 100.389 166.1 100.389C168.752 100.389 166.84 100.511 167.035 100.634L167.551 98.4498C167.635 98.0888 167.623 98.0154 167.344 97.991L166.683 97.9175L166.731 97.7096L168.74 97.4587ZM163.933 105.675C164.989 105.675 166.318 103.393 166.677 102.004C166.749 101.68 166.883 101.258 166.95 100.964C166.816 100.878 166.519 100.756 166.173 100.756C164.376 100.756 163.381 103.607 163.381 104.836C163.381 105.405 163.575 105.668 163.933 105.675Z" fill="white"/>
<path d="M168.019 110.006H156.973C152.512 110.006 148.882 106.348 148.882 101.851C148.882 97.355 152.512 93.6968 156.973 93.6968H168.019C172.48 93.6968 176.109 97.355 176.109 101.851C176.109 106.348 172.48 110.006 168.019 110.006ZM156.973 94.1923C152.779 94.1923 149.368 97.6303 149.368 101.857C149.368 106.085 152.779 109.523 156.973 109.523H168.019C172.213 109.523 175.623 106.085 175.623 101.857C175.623 97.6303 172.213 94.1923 168.019 94.1923H156.973Z" fill="white"/>
<path d="M39.3516 104.947H38.2716V91.8245H39.5136V97.9265C40.1256 96.6485 41.3136 96.0005 42.7896 96.0005C45.3276 96.0005 46.8036 97.9805 46.8036 100.609C46.8036 103.219 45.2916 105.163 42.7536 105.163C41.2956 105.163 40.0896 104.515 39.4776 103.165L39.3516 104.947ZM39.5316 100.573C39.5316 102.589 40.6476 104.029 42.5556 104.029C44.4456 104.029 45.5436 102.589 45.5436 100.573C45.5436 98.5745 44.4456 97.1165 42.5556 97.1165C40.6476 97.1165 39.5316 98.5745 39.5316 100.573Z" fill="white"/>
<path d="M47.6201 108.745V107.719H48.5741C49.3301 107.719 50.0861 107.665 50.5181 106.495L50.8961 105.469L47.3681 96.2345H48.6821L51.4901 103.831L54.2441 96.2345H55.5221L51.5261 106.945C51.0221 108.313 50.1761 108.871 48.9341 108.871C48.4121 108.871 48.0161 108.835 47.6201 108.745Z" fill="white"/>
<path d="M31.8097 144.198H30.9277C29.7517 142.588 28.9817 140.208 28.9817 137.8C28.9817 135.49 29.7237 133.082 30.9277 131.416H31.8097C30.7317 132.928 29.9757 135.28 29.9757 137.8C29.9757 140.264 30.7037 142.658 31.8097 144.198Z" fill="white"/>
<path d="M39.0323 142H33.0263V131.976H39.0183V132.9H34.0343V136.512H38.5563V137.422H34.0343V141.076H39.0323V142Z" fill="white"/>
<path d="M43.8371 142L40.0011 131.976H41.0791L43.7531 138.948C43.9631 139.494 44.1591 140.04 44.3831 140.74C44.5931 140.012 44.8451 139.312 44.9991 138.934L47.6591 131.976H48.6951L44.8871 142H43.8371Z" fill="white"/>
<path d="M48.7763 142H47.7543L51.4363 131.976H52.6823L56.4063 142H55.3563L54.3763 139.34H49.7563L48.7763 142ZM51.9263 133.39L50.0643 138.458H54.0543L52.1783 133.39C52.1363 133.25 52.0663 133.082 52.0523 132.984C52.0383 133.068 51.9823 133.25 51.9263 133.39Z" fill="white"/>
<path d="M58.8078 131.976V141.076H63.4138V142H57.7998V131.976H58.8078Z" fill="white"/>
<path d="M64.429 138.514V131.976H65.437V138.472C65.437 140.236 66.403 141.188 68.153 141.188C69.861 141.188 70.827 140.208 70.827 138.472V131.976H71.835V138.514C71.835 140.782 70.435 142.168 68.153 142.168C65.829 142.168 64.429 140.796 64.429 138.514Z" fill="white"/>
<path d="M73.7822 142H72.7602L76.4422 131.976H77.6882L81.4122 142H80.3622L79.3822 139.34H74.7622L73.7822 142ZM76.9322 133.39L75.0702 138.458H79.0602L77.1842 133.39C77.1422 133.25 77.0722 133.082 77.0582 132.984C77.0442 133.068 76.9882 133.25 76.9322 133.39Z" fill="white"/>
<path d="M80.8396 132.9V131.976H88.0216V132.9H84.9276V142H83.9196V132.9H80.8396Z" fill="white"/>
<path d="M90.4172 131.976V142H89.4091V131.976H90.4172Z" fill="white"/>
<path d="M101.786 136.988C101.786 140.026 99.8125 142.168 97.0125 142.168C94.1985 142.168 92.2385 140.026 92.2385 136.988C92.2385 133.95 94.2125 131.794 97.0125 131.794C99.8265 131.794 101.786 133.936 101.786 136.988ZM100.75 136.988C100.75 134.482 99.2245 132.774 97.0125 132.774C94.8005 132.774 93.2885 134.482 93.2885 136.988C93.2885 139.494 94.8005 141.202 97.0125 141.202C99.2245 141.202 100.75 139.48 100.75 136.988Z" fill="white"/>
<path d="M104.622 142H103.614V131.976H104.636L110.152 140.32V131.976H111.146V142H110.152L104.622 133.656V142Z" fill="white"/>
<path d="M120.236 142L116.4 131.976H117.478L120.152 138.948C120.362 139.494 120.558 140.04 120.782 140.74C120.992 140.012 121.244 139.312 121.398 138.934L124.058 131.976H125.094L121.286 142H120.236Z" fill="white"/>
<path d="M132.452 142H126.446V131.976H132.438V132.9H127.454V136.512H131.976V137.422H127.454V141.076H132.452V142Z" fill="white"/>
<path d="M135.507 142H134.499V131.976H138.237C140.267 131.976 141.499 133.096 141.499 134.874C141.499 136.316 140.743 137.324 139.455 137.674L141.597 142H140.477L138.433 137.842H135.507V142ZM135.507 132.886V136.932H138.265C139.651 136.932 140.463 136.176 140.463 134.902C140.463 133.6 139.609 132.886 138.237 132.886H135.507Z" fill="white"/>
<path d="M142.852 134.58C142.852 132.9 144.196 131.794 146.212 131.794C148.018 131.794 149.208 132.802 149.362 134.482H148.34C148.228 133.348 147.458 132.704 146.198 132.704C144.784 132.704 143.86 133.432 143.86 134.566C143.86 135.448 144.378 136.008 145.428 136.274L147.15 136.694C148.718 137.072 149.53 137.968 149.53 139.326C149.53 141.062 148.186 142.168 146.114 142.168C144.168 142.168 142.852 141.146 142.726 139.508H143.762C143.818 140.558 144.742 141.244 146.114 141.244C147.584 141.244 148.522 140.53 148.522 139.382C148.522 138.486 148.018 137.898 146.94 137.646L145.246 137.226C143.678 136.848 142.852 135.952 142.852 134.58Z" fill="white"/>
<path d="M152.351 131.976V142H151.343V131.976H152.351Z" fill="white"/>
<path d="M163.72 136.988C163.72 140.026 161.746 142.168 158.946 142.168C156.132 142.168 154.172 140.026 154.172 136.988C154.172 133.95 156.146 131.794 158.946 131.794C161.76 131.794 163.72 133.936 163.72 136.988ZM162.684 136.988C162.684 134.482 161.158 132.774 158.946 132.774C156.734 132.774 155.222 134.482 155.222 136.988C155.222 139.494 156.734 141.202 158.946 141.202C161.158 141.202 162.684 139.48 162.684 136.988Z" fill="white"/>
<path d="M166.556 142H165.548V131.976H166.57L172.086 140.32V131.976H173.08V142H172.086L166.556 133.656V142Z" fill="white"/>
<path d="M175.192 144.198H174.31C175.416 142.658 176.158 140.264 176.158 137.8C176.158 135.28 175.388 132.928 174.31 131.416H175.192C176.41 133.082 177.138 135.49 177.138 137.8C177.138 140.208 176.368 142.588 175.192 144.198Z" fill="white"/>
</g>
<defs>
<filter id="filter0_d_224_112" x="0.4" y="0.4" width="205.2" height="149.398" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="2.8"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0772917 0 0 0 0 0.08505 0 0 0 0 0.0875 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_224_112"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_224_112" result="shape"/>
</filter>
</defs>
</svg>
`;
    function cc(t) {
        const e = t
          , i = e.requestVideoFrameCallback;
        return typeof i != "function" ? (console.warn("requestVideoFrameCallback not found on video element"),
        e) : (e._requestHandles = new Set,
        e._cancelAllVideoFrameCallbacks = () => {
            e._requestHandles.forEach(s => e.cancelVideoFrameCallback(s)),
            e._requestHandles.clear()
        }
        ,
        e.requestVideoFrameCallback = s => {
            const n = i.call(e, (...r) => {
                s(...r),
                e._requestHandles.delete(n)
            }
            );
            return e._requestHandles.add(n),
            n
        }
        ,
        e)
    }
    function Ca(t) {
        const e = new OffscreenCanvas(t.videoWidth,t.videoHeight)
          , i = e.getContext("2d");
        return i == null || i.drawImage(t, 0, 0),
        e
    }
    const Sa = () => {
        const t = navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2;
        return /iPhone|iPod/.test(navigator.userAgent) || t
    }
    ;
    var dc = Object.defineProperty
      , uc = Object.getOwnPropertyDescriptor
      , ka = (t, e, i, s) => {
        for (var n = s > 1 ? void 0 : s ? uc(e, i) : e, r = t.length - 1, a; r >= 0; r--)
            (a = t[r]) && (n = (s ? a(e, i, n) : a(n)) || n);
        return s && n && dc(e, i, n),
        n
    }
    ;
    const rs = (Li = class extends l.AViewerPlugin {
        constructor(e=!1) {
            super(),
            this.enabled = !1,
            this.toJSON = null,
            this.enableLog = !0,
            this.streams = {},
            this.devicesData = [],
            this.supportedConstraints = {},
            this.initDeviceList = !0,
            this._initialized = !1,
            this._initializing = void 0,
            this._refreshDeviceList = void 0,
            this.uiConfig = {
                type: "folder",
                label: "Web Camera",
                children: [{
                    type: "folder",
                    label: "Devices",
                    children: [ () => this.devicesData.map(i => {
                        const s = this.videos[i.deviceId];
                        return {
                            type: "folder",
                            children: [...l.generateUiConfig(i), {
                                type: "button",
                                label: s ? "Stop Video" : "Start Video",
                                value: s ? () => this.stopVideo(i.label) : () => this.startVideo(i.label, {
                                    deviceId: i.deviceId
                                })
                            }],
                            label: i.label
                        }
                    }
                    )]
                }, {
                    type: "folder",
                    label: "Videos",
                    children: [ () => Object.values(this.videos).map(i => {
                        const s = l.generateUiConfig(i.settings);
                        return s.forEach(n => n.onChange = async () => this.setVideoSettings(i.id)),
                        {
                            type: "folder",
                            children: [...s, {
                                type: "button",
                                label: "Stop Video",
                                value: () => this.stopVideo(i.id)
                            }],
                            label: i.deviceInfo.label || i.id
                        }
                    }
                    )]
                }, ...l.generateUiConfig(this)]
            },
            this.videos = {},
            this.enabled = e
        }
        _enabledChange() {
            this.enabled && this.initialise()
        }
        _checkSupport() {
            var e;
            return !!((e = navigator == null ? void 0 : navigator.mediaDevices) != null && e.getUserMedia)
        }
        async onAdded(e) {
            await super.onAdded(e),
            this.enabled && await this.initialise()
        }
        _consoleLog(...e) {
            var i;
            this.enableLog && ((i = this._viewer) == null || i.console.log(...e))
        }
        async initialise(e=!0) {
            var s;
            if (this._initialized)
                return !0;
            if (this._initializing)
                return this._initializing;
            if (this._initializing = new Promise(async n => {
                var a;
                if (!this._checkSupport())
                    return (a = this._viewer) == null || a.console.error("getUserMedia not supported"),
                    this.dispatchEvent({
                        type: "noCameraSupport",
                        error: new Error("getUserMedia not supported on device")
                    }),
                    n(!1);
                if (!this.initDeviceList)
                    return n(!0);
                const r = await navigator.mediaDevices.getUserMedia({
                    video: !0
                }).catch(o => {
                    var h;
                    return o.name === "NotAllowedError" ? this.dispatchEvent({
                        type: "permissionDenied",
                        error: o
                    }) : ((h = this._viewer) == null || h.console.error("Failed to get user media", o),
                    this.dispatchEvent({
                        type: "mediaDevicesError",
                        error: o
                    })),
                    null
                }
                );
                if (r == null || r.getTracks().forEach(o => o.stop()),
                !r || !this.devicesData.length && !await this.refreshDeviceList(!0))
                    return n(!1);
                n(!0)
            }
            ),
            !this.enabled)
                if (e)
                    this.enabled = !0;
                else
                    return (s = this._viewer) == null || s.console.warn("WebCameraPlugin not enabled"),
                    !1;
            const i = await this._initializing;
            return this._initializing = void 0,
            i ? (this._initialized = !0,
            this.dispatchEvent({
                type: "initialized"
            }),
            this.refreshUi(),
            !0) : !1
        }
        async refreshDeviceList(e=!1) {
            var i;
            return !this._initialized && !e ? ((i = this._viewer) == null || i.console.warn("WebCameraPlugin not initialized"),
            this.initialise()) : this._refreshDeviceList ? await this._refreshDeviceList : (this._refreshDeviceList = new Promise(async s => {
                const r = (await navigator.mediaDevices.enumerateDevices()).filter(h => h.kind === "videoinput")
                  , a = await navigator.mediaDevices.getSupportedConstraints()
                  , o = r.map(h => ({
                    deviceId: h.deviceId,
                    label: h.label,
                    groupId: h.groupId,
                    capabilities: {},
                    constraints: {},
                    settings: {}
                }));
                this.devicesData = o,
                this.supportedConstraints = a,
                s(!0)
            }
            ).catch(s => {
                var n;
                return (n = this._viewer) == null || n.console.error("Failed to refresh device list", s),
                this.dispatchEvent({
                    type: "mediaDevicesError",
                    error: s
                }),
                !1
            }
            ),
            await this._refreshDeviceList)
        }
        async startStream(e, i, s=!0) {
            var h, c;
            if (this.streams[e])
                return this.streams[e];
            const n = {
                facingMode: "environment"
            }
              , r = {
                video: e != null && e.length ? {
                    ...i,
                    deviceId: {
                        exact: e
                    }
                } : i ?? n
            }
              , a = await navigator.mediaDevices.getUserMedia(r).catch(d => {
                var u;
                return (u = this._viewer) == null || u.console.error("Failed to get user media", d),
                this.dispatchEvent({
                    type: "mediaDevicesError",
                    error: d
                }),
                null
            }
            );
            if (!a)
                return null;
            const o = a.getVideoTracks()[0].getSettings().deviceId;
            if (o && e && o !== e && ((h = this._viewer) == null || h.console.error("Stream deviceId mismatch:", o, e),
            e = o),
            !(e != null && e.length))
                if (o)
                    e = o;
                else
                    throw (c = this._viewer) == null || c.console.error("Failed to get deviceId from stream:", o),
                    new Error("Failed to get deviceId from stream");
            return this.streams[e] = a,
            s && this.refreshUi(),
            a
        }
        async stopStream(e, i=!0) {
            this.streams[e] && (this.streams[e].getTracks().forEach(s => s.stop()),
            delete this.streams[e],
            i && this.refreshUi())
        }
        refreshUi() {
            var e, i;
            (i = (e = this.uiConfig) == null ? void 0 : e.uiRefresh) == null || i.call(e, "postFrame", !0, 1)
        }
        async setVideoSettings(e, i) {
            var n, r, a, o;
            const s = this.videos[e];
            if (!s)
                return (n = this._viewer) == null || n.console.error("Video feed not found:", e),
                null;
            if (i || (i = s.settings),
            i) {
                i = {
                    ...i
                };
                const h = Object.keys(i);
                for (const c of h) {
                    if (c === "deviceId")
                        continue;
                    const u = s.deviceInfo.capabilities[c];
                    if (u)
                        u.min && i[c] && i[c] < u.min && (i[c] = u.min),
                        u.max && i[c] && i[c] > u.max && (i[c] = u.max);
                    else {
                        delete i[c];
                        continue
                    }
                }
                i.width && i.height && delete i.aspectRatio
            }
            if (s.usable = !1,
            i && (i.deviceId && i.deviceId !== s.deviceId || i.facingMode && i.facingMode !== s.settings.facingMode)) {
                s.video.pause(),
                s.texture.dispose(),
                s.video._cancelAllVideoFrameCallbacks();
                const h = i.deviceId || "";
                await this.stopStream(s.deviceId, !1);
                const c = await this._createVideo(e, h, i);
                if (!c)
                    return c;
                Object.assign(s, c)
            } else {
                const h = /iPhone|iPad/i.test(navigator.userAgent)
                  , c = ((a = (r = window.screen) == null ? void 0 : r.orientation) == null ? void 0 : a.angle) ?? window.orientation
                  , d = h && c !== 90 && c !== -90 && c !== 270 && c !== -270
                  , u = i.width && i.height;
                if (u && d) {
                    i = {
                        ...i
                    };
                    const g = i.width;
                    i.width = i.height,
                    i.height = g
                }
                await s.track.applyConstraints({
                    advanced: [i]
                });
                const f = s.track.getSettings();
                if (u) {
                    const g = f.width === i.width && f.height === i.height
                      , y = f.width === i.height && f.height === i.width;
                    if (!(g && !d || y && d)) {
                        const b = d ? `${i.height}x${i.width}` : `${i.width}x${i.height}`;
                        (o = this._viewer) == null || o.console.error(`Size changed: ${i.width}x${i.height} -> ${f.width}x${f.height}, expected: ${b}`)
                    }
                }
                Object.assign(s.settings, f)
            }
            return s.usable = !0,
            s.settings.width && (s.video.width = s.settings.width),
            s.settings.height && (s.video.height = s.settings.height),
            this.refreshVideoTexture(e),
            s.settings
        }
        async startVideo(e, i, s="viewer", n=!0) {
            var D, V, ee, ce;
            if (this._initialized || await this.initialise(n),
            !this._initialized)
                return (D = this._viewer) == null || D.console.error("WebCameraPlugin not initialized"),
                null;
            let {deviceId: r} = i;
            r = r ?? "";
            const a = (r == null ? void 0 : r.length) === 0
              , o = (V = this.devicesData.find(M => M.deviceId === r)) == null ? void 0 : V.settings
              , h = {
                ...o,
                ...i
            }
              , c = 3;
            let d = null;
            for (let M = 0; M < c && !d; M++)
                M && ((ee = this._viewer) == null || ee.console.log("Create Webcam Video retry:", M, e, r, o)),
                d = await this._createVideo(e, r, h),
                a && (r = "");
            if (!d)
                return d;
            r = d.deviceId;
            const {stream: u, video: f, track: g, settings: y, texture: b, deviceInfo: w} = d;
            this.videos[e] = {
                id: e,
                deviceId: r,
                video: f,
                stream: u,
                track: g,
                settings: y,
                texture: b,
                deviceInfo: w,
                usable: !0,
                view: {
                    mode: s,
                    width: f.width,
                    height: f.height,
                    scale: 1
                },
                textureScale: [1, 1]
            },
            this.refreshVideoTexture(e);
            const p = () => {
                const M = this.videos[e];
                !M || !M.texture || M.view.mode === "manual" || this.refreshVideoTexture(e)
            }
            ;
            (ce = this._viewer) == null || ce.renderManager.addEventListener("resize", p);
            const v = M => {
                var L;
                M.id === e && ((L = this._viewer) == null || L.renderManager.removeEventListener("resize", p),
                this.removeEventListener("stopVideo", v))
            }
            ;
            return this.addEventListener("stopVideo", v),
            this.dispatchEvent({
                type: "startVideo",
                id: e,
                video: this.videos[e]
            }),
            this.refreshUi(),
            f.style.position = "absolute",
            f.style.top = "0",
            f.style.left = "0",
            this.videos[e]
        }
        async _createVideo(e, i, s) {
            var y, b;
            const n = ["Back Telephoto Camera", "Back Triple Camera", "Back Dual Wide Camera"]
              , r = ["Telephoto", "Ultra Wide"];
            if (console.log("WebcamPlugin: Creating video:", e, i, s),
            i.length === 0)
                for (const w of this.devicesData) {
                    if (w.deviceId === i)
                        break;
                    const p = (s == null ? void 0 : s.facingMode) ?? ""
                      , v = w.label.toLowerCase();
                    if (p === "environment" && v.split(/\s+/).includes("back") && !(Sa() && n.includes(w.label)) && !r.some(V => w.label.split(/\s+/).includes(V))) {
                        i = w.deviceId,
                        console.log("WebcamPlugin: Found suitable camera:", w.label);
                        break
                    }
                    if (p === "user" && v.split(/\s+/).includes("front")) {
                        i = w.deviceId,
                        console.log("WebcamPlugin: Found suitable front camera:", w.label);
                        break
                    }
                }
            const a = await this.startStream(i, s, !1);
            if (!a)
                return null;
            const o = cc(document.createElement("video"));
            o.id = "webcam-" + e,
            o.autoplay = !0,
            o.muted = !0,
            o.playsInline = !0,
            o.loop = !0,
            o.srcObject = a,
            o.style.boxSizing = "border-box",
            await l.timeout(100);
            const h = a.getVideoTracks();
            if (!await o.play().then( () => !0).catch(w => {
                var p;
                return (p = this._viewer) == null || p.console.error("Failed to play video", w),
                this.dispatchEvent({
                    type: "mediaDevicesError",
                    error: w
                }),
                !1
            }
            ))
                return await this.stopStream(i, !1),
                null;
            if (!h.length)
                return (y = this._viewer) == null || y.console.error("Failed to get video track"),
                this.dispatchEvent({
                    type: "mediaDevicesError",
                    error: new Error("Failed to get video track")
                }),
                null;
            const d = h[0]
              , u = d.getSettings();
            u.width && (o.width = u.width),
            u.height && (o.height = u.height);
            const f = new l.VideoTexture(o);
            f.needsUpdate = !0,
            u.deviceId && u.deviceId !== i && (i && ((b = this._viewer) == null || b.console.error("Stream deviceId mismatch:", u.deviceId, i)),
            i = u.deviceId);
            let g = this.devicesData.find(w => w.deviceId === i);
            return g ? (g.capabilities = typeof d.getCapabilities == "function" ? d.getCapabilities() : {},
            g.constraints = typeof d.getConstraints == "function" ? d.getConstraints() : {},
            g.settings = u) : (this.devicesData.push({
                deviceId: i,
                label: `Unnamed device ${this.devicesData.length + 1}`,
                groupId: "",
                capabilities: typeof d.getCapabilities == "function" ? d.getCapabilities() : {},
                constraints: typeof d.getConstraints == "function" ? d.getConstraints() : {},
                settings: u
            }),
            g = this.devicesData[this.devicesData.length - 1]),
            {
                deviceId: i,
                deviceInfo: g,
                stream: a,
                video: o,
                track: d,
                settings: u,
                texture: f
            }
        }
        async stopVideo(e) {
            var s;
            const i = this.videos[e];
            return i ? (i.video.pause(),
            i.video.srcObject = null,
            i.video.remove(),
            i.texture.dispose(),
            await this.stopStream(i.deviceId, !1),
            delete this.videos[e],
            this.dispatchEvent({
                type: "stopVideo",
                id: e
            }),
            this.refreshUi(),
            !0) : ((s = this._viewer) == null || s.console.error("Video feed not found:", e),
            null)
        }
        refreshVideoTexture(e) {
            var s, n, r;
            const i = this.videos[e];
            return !i || !i.texture ? ((s = this._viewer) == null || s.console.error("Video feed or texture not found:", e),
            null) : (i.view.mode === "screen" ? (i.view.width = window.innerWidth,
            i.view.height = window.innerHeight) : i.view.mode === "viewer" ? (i.view.width = ((n = this._viewer) == null ? void 0 : n.canvas.clientWidth) || window.innerWidth,
            i.view.height = ((r = this._viewer) == null ? void 0 : r.canvas.clientHeight) || window.innerHeight) : i.view.mode === "auto" ? (i.view.width = i.video.width,
            i.view.height = i.video.height) : i.view.mode,
            i.textureScale = this._updateTextureTransform(i.texture, i.view),
            i.texture)
        }
        _updateTextureTransform(e, i) {
            const s = Math.floor(e.image.height)
              , n = Math.floor(e.image.width)
              , r = Math.floor(i.width)
              , a = Math.floor(i.height)
              , o = n / s
              , h = r / a;
            let c = r
              , d = a;
            o > h ? c = Math.floor(a * o) : d = Math.floor(r / o);
            const u = 1 / (c / r) / (i.scale || 1)
              , f = 1 / (d / a) / (i.scale || 1)
              , g = (1 - u) / 2
              , y = (1 - f) / 2;
            return e.repeat.set(u, f),
            e.offset.set(g, y),
            e.updateMatrix(),
            [u, f]
        }
    }
    ,
    Li.PluginType = "WebCameraPlugin",
    Li);
    ka([l.onChange2(rs.prototype._enabledChange)], rs.prototype, "enabled", 2),
    ka([l.uiButton("Refresh Device List")], rs.prototype, "refreshDeviceList", 1);
    let dt = rs;
    const fc = location.search.includes("debug")
      , Ai = class Ai extends l.AViewerPlugin {
        constructor() {
            super(...arguments),
            this.enabled = !0,
            this.dependencies = [dt],
            this._lastBackground = null,
            this._lastBackgroundColor = null,
            this._lastCanvasScale = null,
            this._paused = !1,
            this.videoFeed = null,
            this.state = {
                cameraFacing: "",
                camera: "",
                width: 0,
                height: 0,
                scale: 1,
                zoom: 1
            },
            this._refreshingState = !1,
            this.refreshState = async () => {
                var n;
                if (!this._viewer || !this.videoFeed || this._refreshingState)
                    return;
                this._refreshingState = !0;
                const e = this._viewer.getPlugin(dt);
                let i = !1;
                const s = (n = e.devicesData.find(r => r.label === this.state.camera || r.deviceId === this.state.camera)) == null ? void 0 : n.deviceId;
                return s ? this.videoFeed.deviceId !== s && (console.log(`Device changed: ${this.videoFeed.deviceId} -> ${s}`),
                await e.setVideoSettings(this.videoFeed.id, {
                    deviceId: s
                }),
                i = !0) : this.state.cameraFacing && this.videoFeed.settings.facingMode !== this.state.cameraFacing && (console.log(`Facing mode changed: ${this.videoFeed.settings.facingMode} -> ${this.state.cameraFacing}`),
                await e.setVideoSettings(this.videoFeed.id, {
                    facingMode: this.state.cameraFacing
                }),
                i = !0),
                (Math.abs(this.state.width - this.videoFeed.video.width) > 1 || Math.abs(this.state.height - this.videoFeed.video.height) > 1) && (console.log(`Size changed: ${this.videoFeed.video.width}x${this.videoFeed.video.height} -> ${this.state.width}x${this.state.height}`),
                await e.setVideoSettings(this.videoFeed.id, {
                    width: this.state.width,
                    height: this.state.height
                }),
                i = !0),
                Math.abs(this.state.scale - this.videoFeed.view.scale) > .01 && (console.log(`Scale changed: ${this.videoFeed.view.scale} -> ${this.state.scale}`),
                this.videoFeed.view.scale = this.state.scale,
                e.refreshVideoTexture(Ai.PluginType),
                i = !0),
                Math.abs(this.state.zoom - (this.videoFeed.settings.zoom || 1)) > .01 && (console.log(`Zoom changed: ${this.videoFeed.settings.zoom} -> ${this.state.zoom}`),
                this.videoFeed.deviceInfo.capabilities.zoom ? (await e.setVideoSettings(this.videoFeed.id, {
                    zoom: this.state.zoom
                }),
                i = !0) : console.error(`Zoom not supported on device ${this.videoFeed.deviceInfo.label}`)),
                i && this._refreshStateValues(),
                this._refreshingState = !1,
                i
            }
            ,
            this._refreshStateValues = () => {
                if (!this.videoFeed) {
                    console.error("Video feed not found");
                    return
                }
                this.state.camera = this.videoFeed.deviceInfo.label || this.videoFeed.deviceInfo.deviceId,
                this.state.cameraFacing = this.videoFeed.settings.facingMode || "",
                fc && (this.state.cameraFacing = "environment"),
                this.state.width = this.videoFeed.settings.width || this.videoFeed.video.width,
                this.state.height = this.videoFeed.settings.height || this.videoFeed.video.height,
                this.state.scale = this.videoFeed.view.scale,
                this.state.zoom = this.videoFeed.settings.zoom || 1,
                this.videoFeed.texture.userData.flipX = !0,
                this.videoFeed.texture.colorSpace = l.LinearSRGBColorSpace,
                this.videoFeed.texture.needsUpdate = !0,
                this._viewer && (this._viewer.scene.background = this.videoFeed.texture,
                this._viewer.scene.backgroundColor = null,
                this._viewer.scene.setDirty({
                    sceneUpdate: !1
                }),
                this._viewer.canvas.style.scale = this.videoFeed.settings.facingMode === "environment" ? "-1 1" : "1 1"),
                this.dispatchEvent({
                    type: "refreshState"
                }),
                this.refreshUi()
            }
            ,
            this.uiConfig = {
                type: "folder",
                label: "Web Camera Background",
                children: [{
                    type: "dropdown",
                    label: "Camera",
                    property: [this.state, "camera"],
                    children: [ () => this.getCameraDevices().map(e => ({
                        label: e.label,
                        value: e.label
                    })) || []],
                    onChange: this.refreshState
                }, {
                    type: "slider",
                    bounds: [100, 1920],
                    stepSize: 10,
                    label: "Width",
                    property: [this.state, "width"],
                    onChange: this.refreshState
                }, {
                    type: "slider",
                    bounds: [100, 1920],
                    stepSize: 10,
                    label: "Height",
                    property: [this.state, "height"],
                    onChange: this.refreshState
                }, {
                    type: "slider",
                    bounds: [.5, 4],
                    stepSize: .01,
                    label: "Scale",
                    property: [this.state, "scale"],
                    onChange: this.refreshState
                }, {
                    type: "slider",
                    bounds: [.5, 4],
                    label: "Camera Zoom",
                    property: [this.state, "zoom"],
                    onChange: this.refreshState
                }, {
                    type: "button",
                    label: () => this.videoFeed ? "Stop Video" : "Start Video",
                    value: () => this.videoFeed ? this.stop() : this.start()
                }]
            }
        }
        get dirty() {
            var e;
            return !!((e = this.videoFeed) != null && e.video.readyState)
        }
        async start(e=!0, i) {
            var o;
            if (!this._viewer) {
                console.error("WebCameraBackgroundPlugin not added to viewer");
                return
            }
            if (this._paused) {
                if (!this.videoFeed)
                    throw new Error("Video feed not set");
                this._paused = !1,
                await this.videoFeed.video.play();
                return
            }
            if (this.videoFeed) {
                console.warn("Video already started");
                return
            }
            this.refreshState();
            const s = this._viewer.getPlugin(dt);
            await s.initialise();
            const n = (i == null ? void 0 : i.label) ?? ""
              , r = n.length === 0 ? "" : ((o = s.devicesData.find(h => h.label.startsWith(n))) == null ? void 0 : o.deviceId) ?? ""
              , a = await s.startVideo(Ai.PluginType, {
                ...i,
                deviceId: r
            }, "viewer");
            if (!a) {
                console.error("Failed to start video");
                return
            }
            return this.videoFeed = a,
            this._lastBackground = this._viewer.scene.background,
            this._lastBackgroundColor = this._viewer.scene.backgroundColor,
            this._lastCanvasScale = this._viewer.canvas.style.scale,
            this._refreshStateValues(),
            e && this.refreshUi(),
            this.videoFeed
        }
        get paused() {
            return this._paused
        }
        async pause() {
            this.videoFeed && (this._paused || (this._paused = !0,
            this.videoFeed.video.pause()))
        }
        async stop(e=!0) {
            if (!this._viewer) {
                console.error("WebCameraBackgroundPlugin not added to viewer");
                return
            }
            if (!this.videoFeed) {
                console.warn("Video already stopped or not running");
                return
            }
            await this._viewer.getPlugin(dt).stopVideo(Ai.PluginType),
            this.videoFeed = null,
            this._viewer.scene.background = this._lastBackground ?? null,
            this._viewer.scene.backgroundColor = this._lastBackgroundColor ?? null,
            this._viewer.canvas.style.scale = this._lastCanvasScale ?? "1 1",
            this._viewer.scene.setDirty({
                sceneUpdate: !1
            }),
            e && this.refreshUi()
        }
        refreshUi() {
            var e, i;
            (i = (e = this.uiConfig) == null ? void 0 : e.uiRefresh) == null || i.call(e, "postFrame", !0, 1)
        }
        async setState(e) {
            return Object.assign(this.state, e),
            this.refreshState()
        }
        getCameraDevices() {
            var e, i;
            return ((i = (e = this._viewer) == null ? void 0 : e.getPlugin(dt)) == null ? void 0 : i.devicesData) ?? []
        }
    }
    ;
    Ai.PluginType = "WebCameraBackgroundPlugin";
    let Di = Ai;
    var pc = Object.defineProperty
      , mc = Object.getOwnPropertyDescriptor
      , Pt = (t, e, i, s) => {
        for (var n = s > 1 ? void 0 : s ? mc(e, i) : e, r = t.length - 1, a; r >= 0; r--)
            (a = t[r]) && (n = (s ? a(e, i, n) : a(n)) || n);
        return s && n && pc(e, i, n),
        n
    }
    ;
    const Ie = class extends lc {
        constructor() {
            super(),
            this.enabled = !0,
            this.dependencies = [Di],
            this.videoScale = 1,
            this.cameraZoom = 1,
            this.videoSize = new l.Vector2,
            this.wakeLock = null,
            this.pluginStateSettings = {
                ground: !1,
                frameFade: !1,
                interactionPrompt: !1,
                outline: !1,
                dof: !1,
                tonemapBackground: !1,
                clipBackground: !1,
                lut: !1,
                ssgi: !1,
                ssao: {
                    enabled: !0,
                    intensity: .25,
                    radius: 1
                },
                sscs: !1,
                parallaxCamera: !1,
                velocityBuffer: !0,
                ssr: {
                    enabled: !0,
                    objectRadius: 2,
                    autoRadius: !1,
                    maskFrontFactor: 1,
                    intensity: 1
                },
                bloom: !0
            },
            this.cameraSettings = {
                interactionsEnabled: !1,
                position: [0, 0, 5],
                target: [0, 0, 0],
                autoNearFar: !1,
                minNear: .5,
                maxFar: 50,
                fov: 25
            },
            this._running = !1,
            this._starting = !1,
            this.inSetupMode = !1,
            this._webCameraPluginErrorListeners = [],
            this.webCameraPluginErrors = ["noCameraSupport", "permissionDenied", "mediaDevicesError"],
            this._lastResultTime = 0,
            this.delta = 1 / 60,
            this.visible = !1,
            this.hideImmediatelyFlag = !1,
            this._refreshWebcamState = () => {
                var i;
                const e = (i = this._cameraBackgroundPlugin) == null ? void 0 : i.state;
                e && (this.videoSize.set(e.width, e.height),
                this.cameraZoom = e.zoom,
                this.videoScale = e.scale)
            }
            ,
            this._pluginStateSet = !1,
            this._lastPluginsState = JSON.parse(JSON.stringify(this.pluginStateSettings)),
            this._lastCameraParams = JSON.parse(JSON.stringify(this.cameraSettings)),
            this._modelParamsSet = !1,
            this._cameraParamsSet = !1,
            this._lastModelState = {
                position: [0, 0, 0],
                rotation: [0, 0, 0, 1],
                scale: [1, 1, 1],
                visible: !0,
                children: [{
                    position: [0, 0, 0],
                    rotation: [0, 0, 0, 1],
                    scale: [1, 1, 1],
                    visible: !0
                }]
            },
            this._preFrame = this._preFrame.bind(this),
            this._postFrame = this._postFrame.bind(this)
        }
        get mediaSettings() {
            return {}
        }
        get modelRoot() {
            var e;
            return (e = this._viewer) == null ? void 0 : e.scene.modelRoot
        }
        async onAdded(e) {
            await super.onAdded(e),
            this._cameraBackgroundPlugin = e.getPlugin(Di),
            this._hideAll(!1),
            this._flipAndTransparentHack(),
            this._refreshWebcamState(),
            this._cameraBackgroundPlugin.addEventListener("refreshState", this._refreshWebcamState),
            e.addEventListener("preFrame", this._preFrame),
            e.addEventListener("postFrame", this._postFrame)
        }
        async onRemove(e) {
            var i;
            return (i = this._cameraBackgroundPlugin) == null || i.removeEventListener("refreshState", this._refreshWebcamState),
            this._cameraBackgroundPlugin = void 0,
            e.removeEventListener("preFrame", this._preFrame),
            e.removeEventListener("postFrame", this._postFrame),
            super.onRemove(e)
        }
        _registerCameraErrorListeners() {
            const e = this._viewer.getPlugin(dt);
            for (const i of this.webCameraPluginErrors) {
                const s = n => {
                    console.error("BaseTryonPlugin: Camera error", n),
                    this.dispatchEvent({
                        type: "error",
                        detail: {
                            reason: i,
                            error: n.error
                        }
                    })
                }
                ;
                e.addEventListener(i, s),
                this._webCameraPluginErrorListeners.push(s)
            }
        }
        _unregisterCameraErrorListeners() {
            const e = this._viewer.getPlugin(dt);
            for (const i of this.webCameraPluginErrors) {
                const s = this._webCameraPluginErrorListeners.shift();
                e.removeEventListener(i, s)
            }
        }
        canStart() {
            var e;
            return !(!this.enabled || this._running || this._starting || (e = this._cameraBackgroundPlugin) != null && e.paused)
        }
        async start() {
            var e, i, s;
            if (this.enabled && !this._running) {
                if (this._starting) {
                    console.warn("BaseTryonPlugin: Already starting");
                    return
                }
                if ((e = this._cameraBackgroundPlugin) != null && e.paused) {
                    await this._cameraBackgroundPlugin.start(!0, this.mediaSettings);
                    return
                }
                this.dispatchEvent({
                    type: "start",
                    detail: {}
                }),
                this._starting = !0,
                console.time("BaseTryonPlugin: start"),
                this.dispatchEvent({
                    type: "start",
                    detail: {}
                }),
                this._registerCameraErrorListeners(),
                this._viewer.renderEnabled = !1,
                this._videoFeed && (console.error("BaseTryonPlugin: Video feed already set, ignoring..."),
                (i = this._cameraBackgroundPlugin) != null && i.videoFeed && await ((s = this._cameraBackgroundPlugin) == null ? void 0 : s.stop()),
                this._videoFeed = void 0);
                try {
                    if (this._initPluginsState(),
                    this._initCameraSettings(),
                    this._setCameraSettings(this._viewer.scene.activeCamera, this.cameraSettings),
                    this._saveModelRootState(),
                    console.time("Create video feed"),
                    this._videoFeed = await this._cameraBackgroundPlugin.start(!0, this.mediaSettings),
                    console.timeEnd("Create video feed"),
                    this._refreshWebcamState(),
                    await this._setInitialVideoSize(),
                    "wakeLock"in navigator)
                        try {
                            this.wakeLock = await navigator.wakeLock.request("screen"),
                            console.log("Wake lock is active")
                        } catch (n) {
                            console.warn("Wake lock request failed:", n)
                        }
                    await this._start(),
                    this._running = !0,
                    this._hideAll(!0),
                    super.use()
                } catch (n) {
                    console.error("BaseTryonPlugin: Startup failed", n),
                    this.dispatchEvent({
                        type: "error",
                        detail: {
                            reason: "startupFailed",
                            error: n
                        }
                    }),
                    await this.stop(!0)
                } finally {
                    this._unregisterCameraErrorListeners(),
                    this._viewer.renderEnabled = !0,
                    this._starting = !1,
                    console.timeEnd("BaseTryonPlugin: start")
                }
                this.dispatchEvent({
                    type: "initialized",
                    detail: {}
                })
            }
        }
        async pause() {
            this._running && (this._starting || this._cameraBackgroundPlugin && await this._cameraBackgroundPlugin.pause())
        }
        async stop(e=!1) {
            var s, n;
            if (!this._running && !e)
                return;
            if (this._starting && !e) {
                console.warn("RingTryonPlugin: Startup in progress, cannot stop yet");
                return
            }
            const i = [];
            return await this._stop(),
            this._videoFeed = void 0,
            this._running = !1,
            this._resetModelRootState(),
            this._resetCamera(),
            this._restorePluginsState(),
            (s = this._cameraBackgroundPlugin) != null && s.videoFeed && i.push(this._cameraBackgroundPlugin.stop()),
            await ((n = this.wakeLock) == null ? void 0 : n.release()),
            this.wakeLock = null,
            this._hideAll(!1),
            super.unuse(),
            this._starting = !1,
            this._running = !1,
            this.dispatchEvent({
                type: "stop",
                detail: {}
            }),
            Promise.allSettled(i)
        }
        get running() {
            return this._running
        }
        _preFrame() {
            var i;
            if (!this._running || !this._viewer || document.hidden)
                return;
            if (!((i = this.modelRoot) != null && i.children.length)) {
                console.warn("BaseTryonPlugin: No object in scene");
                return
            }
            const e = l.now();
            this.delta = e - this._lastResultTime,
            this._lastResultTime = e,
            this.delta = l.MathUtils.clamp(this.delta, .001, 1e3),
            this.visible = !0,
            this.hideImmediatelyFlag = !1,
            this._sync3DWithResult(e),
            this._postSync3DWithResult()
        }
        _postFrame() {}
        _postSync3DWithResult() {}
        _hideAll(e=!1) {
            this.running && (this.visible = !1,
            this.hideImmediatelyFlag || (this.hideImmediatelyFlag = e))
        }
        _showAll() {
            this.visible = !0
        }
        async setVideoSize(e, i) {
            return this.videoSize.set(e, i),
            this._setWebcamState()
        }
        async _setWebcamState() {
            var e;
            return (e = this._cameraBackgroundPlugin) == null ? void 0 : e.setState({
                width: this.videoSize.x,
                height: this.videoSize.y,
                zoom: this.cameraZoom,
                scale: this.videoScale
            })
        }
        _initPluginsState() {
            !this.enabled || !this._viewer || (this._savePluginSettings(),
            this._setPluginSettings(this.pluginStateSettings),
            this._pluginStateSet = !0)
        }
        _restorePluginsState() {
            this._viewer && this._pluginStateSet && (this._setPluginSettings(this._lastPluginsState),
            this._pluginStateSet = !1)
        }
        _initCameraSettings() {
            if (!this.enabled)
                return;
            const e = this._viewer.scene.activeCamera;
            this._lastCameraParams.interactionsEnabled = e.interactionsEnabled,
            this._lastCameraParams.position = e.position.toArray(),
            this._lastCameraParams.target = e.target.toArray(),
            this._lastCameraParams.autoNearFar = e.cameraObject.userData.autoNearFar,
            this._lastCameraParams.minNear = e.cameraObject.userData.minNearPlane,
            this._lastCameraParams.maxFar = e.cameraObject.userData.maxFarPlane,
            this._lastCameraParams.fov = e.cameraObject.fov,
            this._cameraParamsSet = !0
        }
        _resetCamera() {
            if (!this.enabled || !this._cameraParamsSet)
                return;
            const e = this._viewer.scene.activeCamera;
            this._setCameraSettings(e, this._lastCameraParams),
            this._cameraParamsSet = !1
        }
        _setCameraSettings(e, i) {
            var n;
            e.interactionsEnabled = i.interactionsEnabled,
            e.position.fromArray(i.position),
            e.target.fromArray(i.target),
            e.positionUpdated(!0);
            const s = e.cameraObject;
            s.userData.autoNearFar = i.autoNearFar,
            this._setCameraNearFar(e, i.minNear, i.maxFar),
            s.fov = i.fov,
            e.setCameraOptions({
                fov: i.fov
            }),
            s.updateProjectionMatrix(),
            (n = e.controls) == null || n.update()
        }
        _setCameraNearFar(e, i, s) {
            e.cameraObject.userData.minNearPlane = i,
            e.cameraObject.userData.maxFarPlane = s,
            e.near = i,
            e.far = s,
            e.cameraObject.near = i,
            e.cameraObject.far = s,
            e.cameraObject.updateProjectionMatrix()
        }
        _saveModelRootState() {
            if (!this.enabled)
                return;
            const e = this.modelRoot;
            if (!e) {
                console.warn("BaseTryonPlugin: Model root not set");
                return
            }
            this._lastModelState.position = e.position.toArray(),
            this._lastModelState.rotation = e.quaternion.toArray(),
            this._lastModelState.scale = e.scale.toArray(),
            this._lastModelState.visible = e.visible,
            this._lastModelState.children = e.children.map(i => ({
                position: i.position.toArray(),
                rotation: i.quaternion.toArray(),
                scale: i.scale.toArray(),
                visible: i.visible
            })),
            this._modelParamsSet = !0
        }
        _resetModelRootState() {
            var i;
            if (!this.enabled || !this._modelParamsSet)
                return;
            const e = this.modelRoot;
            if (!e) {
                console.warn("BaseTryonPlugin: Model root not set");
                return
            }
            e.position.fromArray(this._lastModelState.position),
            e.quaternion.fromArray(this._lastModelState.rotation),
            e.scale.fromArray(this._lastModelState.scale),
            e.visible = this._lastModelState.visible;
            for (let s = 0; s < e.children.length; s++) {
                const n = e.children[s];
                if (s >= this._lastModelState.children.length)
                    break;
                const r = this._lastModelState.children[s];
                n.position.fromArray(r.position),
                n.quaternion.fromArray(r.rotation),
                n.scale.fromArray(r.scale),
                n.visible = r.visible
            }
            (i = e.setDirty) == null || i.call(e, {
                sceneUpdate: !0
            }),
            this._modelParamsSet = !1
        }
        _savePluginSettings() {
            var p, v;
            const e = this._viewer;
            if (!e)
                throw new Error("RingTryonPlugin: Viewer not set");
            const i = e.getPlugin(l.GroundPlugin)
              , s = e.getPlugin(l.FrameFadePlugin)
              , n = e.getPlugin(l.InteractionPromptPlugin)
              , r = e.getPlugin(l.OutlinePlugin)
              , a = e.getPlugin(l.DepthOfFieldPlugin)
              , o = e.getPlugin(l.TonemapPlugin)
              , h = e.getPlugin(l.LUTPlugin)
              , c = e.getPlugin(l.SSGIPlugin)
              , d = e.getPlugin(l.SSAOPlugin)
              , u = e.getPlugin(l.SSContactShadows)
              , f = e.getPlugin(l.ParallaxCameraControllerPlugin)
              , g = e.getPlugin(l.VelocityBufferPlugin)
              , y = e.getPlugin(l.SSRPlugin)
              , b = e.getPlugin(l.BloomPlugin);
            this._lastPluginsState.ground = (i == null ? void 0 : i.visible) ?? !1,
            this._lastPluginsState.frameFade = (s == null ? void 0 : s.enabled) ?? !1,
            this._lastPluginsState.interactionPrompt = (n == null ? void 0 : n.enabled) ?? !1,
            this._lastPluginsState.outline = (r == null ? void 0 : r.enabled) ?? !1,
            this._lastPluginsState.dof = (a == null ? void 0 : a.enabled) ?? !1,
            this._lastPluginsState.tonemapBackground = ((p = o == null ? void 0 : o.config) == null ? void 0 : p.tonemapBackground) ?? !1,
            this._lastPluginsState.clipBackground = ((v = o == null ? void 0 : o.config) == null ? void 0 : v.clipBackground) ?? !1,
            this._lastPluginsState.lut = (h == null ? void 0 : h.enabled) ?? !1,
            this._lastPluginsState.ssgi = (c == null ? void 0 : c.enabled) ?? !1,
            this._lastPluginsState.ssao.enabled = (d == null ? void 0 : d.enabled) ?? !1,
            this._lastPluginsState.ssao.intensity = (d == null ? void 0 : d.passes.ssao.passObject.parameters.intensity) ?? .25,
            this._lastPluginsState.ssao.radius = (d == null ? void 0 : d.passes.ssao.passObject.parameters.occlusionWorldRadius) ?? 1,
            this._lastPluginsState.sscs = (u == null ? void 0 : u.enabled) ?? !1,
            this._lastPluginsState.parallaxCamera = (f == null ? void 0 : f.enabled) ?? !1,
            this._lastPluginsState.velocityBuffer = (g == null ? void 0 : g.enabled) ?? !1;
            const w = y == null ? void 0 : y.passes.ssr.passObject;
            this._lastPluginsState.ssr = {
                enabled: (y == null ? void 0 : y.enabled) ?? !1,
                intensity: (w == null ? void 0 : w.intensity) ?? 1,
                objectRadius: (w == null ? void 0 : w.objectRadius) ?? 1,
                autoRadius: (w == null ? void 0 : w.autoRadius) ?? !1,
                maskFrontFactor: (w == null ? void 0 : w.maskFrontFactor) ?? 1
            },
            this._lastPluginsState.bloom = (b == null ? void 0 : b.enabled) ?? !1
        }
        _setPluginSettings(e) {
            const i = this._viewer;
            if (!i)
                throw new Error("RingTryonPlugin: Viewer not set");
            const s = i.getPlugin(l.GroundPlugin)
              , n = i.getPlugin(l.FrameFadePlugin)
              , r = i.getPlugin(l.InteractionPromptPlugin)
              , a = i.getPlugin(l.OutlinePlugin)
              , o = i.getPlugin(l.DepthOfFieldPlugin)
              , h = i.getPlugin(l.TonemapPlugin)
              , c = i.getPlugin(l.LUTPlugin)
              , d = i.getPlugin(l.SSGIPlugin)
              , u = i.getPlugin(l.SSAOPlugin)
              , f = i.getPlugin(l.SSContactShadows)
              , g = i.getPlugin(l.ParallaxCameraControllerPlugin)
              , y = i.getPlugin(l.VelocityBufferPlugin)
              , b = i.getPlugin(l.SSRPlugin)
              , w = i.getPlugin(l.BloomPlugin)
              , p = i.getPlugin(l.PickingPlugin);
            if (s && (s.visible = e.ground,
            s.mesh && (s.mesh.visible = e.ground)),
            n && (n.enabled = e.frameFade),
            r && (r.enabled = e.interactionPrompt,
            r.enabled || r.stopAnimation({
                reset: !1
            })),
            a && (a.enabled = e.outline),
            o && (o.enabled = e.dof),
            h && (h.config.tonemapBackground = e.tonemapBackground,
            h.config.clipBackground = e.clipBackground),
            c && (c.enabled = e.lut),
            d && (d.enabled = e.ssgi),
            u && (u.enabled = e.ssao.enabled,
            u.passes.ssao.passObject.parameters.intensity = e.ssao.intensity,
            u.passes.ssao.passObject.parameters.occlusionWorldRadius = e.ssao.radius),
            f && (f.enabled = e.sscs),
            g && (g.enabled = e.parallaxCamera),
            y && (y.enabled = e.velocityBuffer),
            b) {
                b.enabled = e.ssr.enabled;
                const v = b.passes.ssr.passObject;
                v.intensity = e.ssr.intensity,
                v.objectRadius = e.ssr.objectRadius,
                v.autoRadius = e.ssr.autoRadius,
                v.maskFrontFactor = e.ssr.maskFrontFactor,
                v.material.needsUpdate = !0
            }
            w && (w.enabled = e.bloom),
            p && p.picker && (p.picker.selectedObject = null)
        }
        _flipAndTransparentHack() {
            var n;
            const e = {
                isCompatible: () => !0,
                extraUniforms: {
                    flip: {
                        value: !1
                    }
                },
                parsVertexSnippet: `
            uniform bool flip;
            `,
                shaderExtender: r => {
                    r.vertexShader = l.shaderReplaceString(r.vertexShader, "vUv = uv;", "vUv = flip ? vec2(1.-uv.x, uv.y) : uv;"),
                    r.fragmentShader = l.shaderReplaceString(r.fragmentShader, "bool isBackground=depth>0.99&&transparentCol.a<0.001", "bool isBackground=depth>0.99")
                }
            }
              , i = (n = this._viewer.renderer.rendererObject.background.getPlaneMesh()) == null ? void 0 : n.material;
            i && (i.fragmentShader = l.shaderReplaceString(i.fragmentShader, "gl_FragColor = texColor;", "gl_FragColor = sRGBToLinear(texColor);"),
            i.needsUpdate = !0),
            l.ShaderLib.background.fragmentShader = l.shaderReplaceString(l.ShaderLib.background.fragmentShader, "gl_FragColor = texColor;", "gl_FragColor = sRGBToLinear(texColor);"),
            this._viewer.getPlugin(l.CombinedPostPlugin).pass.passObject.material.registerMaterialExtensions([e])
        }
        selectNextCamera() {
            var r;
            if (!this._cameraBackgroundPlugin)
                return;
            const e = ((r = this._cameraBackgroundPlugin) == null ? void 0 : r.getCameraDevices()) ?? []
              , i = this._cameraBackgroundPlugin.state.camera
              , s = e.findIndex(a => a.label === i || a.deviceId === i);
            if (s === -1) {
                this.flipCamera();
                return
            }
            const n = e[(s + 1) % e.length];
            if (n.label === i || n.deviceId === i) {
                this.flipCamera();
                return
            }
            return this._cameraBackgroundPlugin.state.camera = n.label,
            this._cameraBackgroundPlugin.refreshState()
        }
        flipCamera() {
            if (this._cameraBackgroundPlugin && this._cameraBackgroundPlugin.state.cameraFacing)
                return this._cameraBackgroundPlugin.state.camera = "",
                this._cameraBackgroundPlugin.state.cameraFacing = this._cameraBackgroundPlugin.state.cameraFacing === "user" ? "environment" : "user",
                this._cameraBackgroundPlugin.refreshState()
        }
        _setInitialVideoSize() {
            if (!this._viewer)
                throw new Error("Viewer not set");
            const e = 1
              , i = new l.Vector2(this._viewer.canvas.clientWidth,this._viewer.canvas.clientHeight)
              , s = this._viewer.renderer.displayCanvasScaling;
            i.multiplyScalar(s * e);
            const n = 1;
            return i.x / i.y > n ? i.y = i.x / n : i.x = i.y * n,
            this.setVideoSize(i.x, i.y)
        }
        getImage() {
            var e;
            return (e = this._viewer) == null ? void 0 : e.canvas.toDataURL("image/png")
        }
        async saveImage(e="ijewel3d_tryon.png") {
            const i = this.getImage();
            if (!i)
                return i;
            const s = await fetch(i).then(n => n.blob());
            l.downloadBlob(s, e)
        }
    }
    ;
    Pt([l.uiSlider("videoScale", [.5, 4], .01), l.onChange2(Ie.prototype._setWebcamState)], Ie.prototype, "videoScale", 2),
    Pt([l.uiSlider("cameraZoom", [.5, 4], .01), l.onChange2(Ie.prototype._setWebcamState)], Ie.prototype, "cameraZoom", 2),
    Pt([l.uiVector("videoSize", [100, 4096], 1, t => ({
        onChange: () => t._setWebcamState()
    })), l.onChange2(Ie.prototype._setWebcamState)], Ie.prototype, "videoSize", 2),
    Pt([l.uiButton()], Ie.prototype, "start", 1),
    Pt([l.uiButton()], Ie.prototype, "pause", 1),
    Pt([l.uiButton()], Ie.prototype, "stop", 1),
    Pt([l.uiButton()], Ie.prototype, "selectNextCamera", 1),
    Pt([l.uiButton()], Ie.prototype, "flipCamera", 1);
    let gc = Ie;
    class Fa {
        constructor(e) {
            var i;
            this.debugCanvas = e.canvas.cloneNode(),
            this.debugCanvas.id = "debug-canvas",
            this.debugCanvas.style.transform = "scale(-1, 1)",
            this.debugCanvas.style.pointerEvents = "none",
            this.debugCanvas.style.position = "absolute",
            this.debugCanvas.style.top = "0",
            (i = e.canvas.parentNode) == null || i.insertBefore(this.debugCanvas, e.canvas.nextSibling),
            this.debugSpheres = Array.from({
                length: 21
            }, () => {
                const s = new l.SphereGeometry(.25)
                  , n = new l.MeshStandardMaterial({
                    color: 16711680,
                    depthTest: !1,
                    depthWrite: !1
                });
                n.userData.pluginsDisabled = !0;
                const r = new l.Mesh(s,n);
                return r.renderOrder = 1e3,
                e.scene.add(r),
                r
            }
            ),
            this.segmenterEdgeSpheres = Array.from({
                length: 2
            }, () => {
                const s = new l.SphereGeometry(.1)
                  , n = new l.MeshStandardMaterial({
                    color: 16776960,
                    depthTest: !1,
                    depthWrite: !1
                });
                n.userData.pluginsDisabled = !0;
                const r = new l.Mesh(s,n);
                return r.position.set(0, 0, 100),
                e.scene.add(r),
                r
            }
            )
        }
        update(e, i, s) {
            const n = this.debugCanvas.getContext("2d");
            if (n && (n.clearRect(0, 0, this.debugCanvas.width, this.debugCanvas.height),
            i.length !== 0)) {
                for (let r = 0; r < e.length; r++) {
                    const a = e[r]
                      , o = i[r]
                      , h = Math.abs(o.z) - s;
                    let c = l.MathUtils.mapLinear(h, 3, -3, 0, 255);
                    c = l.MathUtils.clamp(c, 0, 255),
                    n.beginPath(),
                    n.fillStyle = `rgb(${c}, ${c}, 0)`,
                    n.arc(a.x * this.debugCanvas.width, a.y * this.debugCanvas.height, 15, 0, 2 * Math.PI),
                    n.fill()
                }
                this.debugSpheres.forEach( (r, a) => {
                    r.position.copy(i[a])
                }
                )
            }
        }
        drawSegmenter(e) {
            const i = this.debugCanvas.getContext("2d");
            if (!i)
                return;
            const s = e.getDebugSegmentationImageData();
            if (s) {
                const r = (this.debugCanvas.width - s.width) / 2;
                i.putImageData(s, r, 0)
            }
            const n = [e.edgeLeft, e.edgeRight];
            n.some(r => r === null) || (i.beginPath(),
            i.strokeStyle = "red",
            i.lineWidth = 5,
            n[0] && i.moveTo(n[0].x * this.debugCanvas.width, n[0].y * this.debugCanvas.height),
            n[1] && i.lineTo(n[1].x * this.debugCanvas.width, n[1].y * this.debugCanvas.height),
            i.stroke())
        }
        drawDot(e, i, s=!1) {
            const n = this.debugCanvas.getContext("2d");
            n && (n.beginPath(),
            n.fillStyle = i,
            s && (e = e.clone().setX(1 - e.x)),
            n.arc(e.x * this.debugCanvas.width, e.y * this.debugCanvas.height, 10, 0, 2 * Math.PI),
            n.fill())
        }
        drawLine(e, i, {color: s="orange", mirror: n=!1}={}) {
            const r = this.debugCanvas.getContext("2d");
            r && (r.beginPath(),
            r.strokeStyle = s,
            r.lineWidth = 5,
            n && (e = e.clone().setX(1 - e.x),
            i = i.clone().setX(1 - i.x)),
            r.moveTo(e.x * this.debugCanvas.width, e.y * this.debugCanvas.height),
            r.lineTo(i.x * this.debugCanvas.width, i.y * this.debugCanvas.height),
            r.stroke())
        }
        drawEdgeDetectionResult(e, i, s, n) {
            const r = this.debugCanvas.getContext("2d");
            if (r) {
                if (e && (e = e.clone().setX(1 - e.x)),
                i && (i = i.clone().setX(1 - i.x)),
                e && i) {
                    r.beginPath(),
                    r.strokeStyle = "red",
                    r.lineWidth = 5,
                    r.moveTo(e.x * this.debugCanvas.width, e.y * this.debugCanvas.height),
                    r.lineTo(i.x * this.debugCanvas.width, i.y * this.debugCanvas.height),
                    r.stroke();
                    const a = e.clone().multiply(new l.Vector2(this.debugCanvas.width,this.debugCanvas.height))
                      , o = i.clone().multiply(new l.Vector2(this.debugCanvas.width,this.debugCanvas.height))
                      , h = Math.atan2(a.y - o.y, a.x - o.x) + Math.PI / 2
                      , c = a.clone().lerp(o, .5)
                      , d = c.clone().add(new l.Vector2(Math.cos(h),Math.sin(h)).multiplyScalar(50))
                      , u = c.clone().add(new l.Vector2(Math.cos(h),Math.sin(h)).multiplyScalar(-50));
                    r.beginPath(),
                    r.strokeStyle = "orange",
                    r.lineWidth = 5,
                    r.moveTo(d.x, d.y),
                    r.lineTo(u.x, u.y),
                    r.stroke()
                }
                for (const a of [e, i])
                    a && (r.beginPath(),
                    r.fillStyle = "red",
                    r.arc(a.x * this.debugCanvas.width, a.y * this.debugCanvas.height, 5, 0, 2 * Math.PI),
                    r.fill());
                r.beginPath(),
                r.strokeStyle = "green",
                r.lineWidth = 5,
                r.moveTo(s.x * this.debugCanvas.width, s.y * this.debugCanvas.height),
                r.lineTo(n.x * this.debugCanvas.width, n.y * this.debugCanvas.height),
                r.stroke();
                for (const a of [s, n])
                    r.beginPath(),
                    r.fillStyle = "green",
                    r.arc(a.x * this.debugCanvas.width, a.y * this.debugCanvas.height, 5, 0, 2 * Math.PI),
                    r.fill()
            }
        }
        getContext() {
            return this.debugCanvas.getContext("2d")
        }
        hide() {
            this.debugCanvas.style.display = "none",
            this.debugSpheres.forEach(e => e.visible = !1),
            this.segmenterEdgeSpheres.forEach(e => e.visible = !1)
        }
        show() {
            this.debugCanvas.style.display = "block",
            this.debugSpheres.forEach(e => e.visible = !0),
            this.segmenterEdgeSpheres.forEach(e => e.visible = !0)
        }
        dispose() {
            this.debugSpheres.forEach(e => {
                var i;
                e.material.dispose(),
                e.geometry.dispose(),
                (i = e.parent) == null || i.remove(e)
            }
            ),
            this.segmenterEdgeSpheres.forEach(e => {
                var i;
                e.material.dispose(),
                e.geometry.dispose(),
                (i = e.parent) == null || i.remove(e)
            }
            ),
            this.debugSpheres.length = 0,
            this.segmenterEdgeSpheres.length = 0,
            this.debugCanvas.remove()
        }
    }
    const vc = document.location.search.includes("debug");
    let Qt = null;
    if (vc) {
        Qt = document.createElement("div"),
        Qt.id = "debug",
        Qt.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 10px;
        font-size: 10px;
        z-index: 10000;
        font-family: monospace;
        line-height: 1.75;
        letter-spacing: 1px;
        width: 380px;
        pointer-events: none;
    `;
        const t = document.createElement("style");
        t.innerHTML = `
    @media (max-width: 600px) {
        #debug {
            font-size: 8px !important;
        }
    }
`,
        document.head.appendChild(t),
        document.body.appendChild(Qt)
    }
    const as = new Map
      , A = (t, e) => {
        if (!Qt)
            return;
        if (e == null || !Number.isFinite(Number(e)))
            typeof e != "string" && typeof e != "boolean" && (e = "N/A");
        else if (typeof e == "number" && !Number.isInteger(e)) {
            if (as.has(t)) {
                const s = as.get(t);
                let n = l.MathUtils.mapLinear(Math.abs(e - s), 0, .5, .01, .1);
                n = l.MathUtils.clamp(n, 0, 1),
                e = (1 - n) * s + n * Number(e),
                as.set(t, e)
            } else
                as.set(t, Number(e));
            Math.abs(e) > .01 ? e = e.toFixed(2) : e = e.toFixed(4)
        }
        let i = document.getElementById("debug-" + t);
        if (!i) {
            i = document.createElement("span"),
            i.style.color = "#00ff00",
            i.id = "debug-" + t;
            const s = document.createElement("div");
            s.innerHTML = t + ": ",
            s.appendChild(i),
            Qt.appendChild(s)
        }
        typeof e == "boolean" && (i.style.color = e ? "#00ff00" : "#ff0000"),
        i.textContent = e.toString()
    }
    ;
    class Pa {
        constructor(e, i=1) {
            if (this.rtIndex = 0,
            i < 1)
                throw new Error("Delay must be at least 1");
            this.srcTexture = e,
            this.scene = new l.Scene,
            this.camera = new l.OrthographicCamera(-1,1,1,-1,0,1);
            const s = this.srcTexture.image.width
              , n = this.srcTexture.image.height;
            this.renderTargets = Array.from({
                length: i
            }, () => new l.WebGLRenderTarget(s,n,{
                depthBuffer: !1
            })),
            i === 1 ? this.outputRenderTarget = this.renderTargets[0] : this.outputRenderTarget = new l.WebGLRenderTarget(s,n,{
                depthBuffer: !1
            });
            const r = {
                uniforms: {
                    tDiffuse: {
                        value: null
                    },
                    mirrorX: {
                        value: !1
                    }
                },
                vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
                fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform bool mirrorX;
                varying vec2 vUv;
                
                void main() {
                    gl_FragColor = textureLod(tDiffuse, vec2(mirrorX ? 1. - vUv.x : vUv.x, vUv.y), 0.);
                }
            `
            };
            this.material = new l.ShaderMaterial({
                uniforms: l.UniformsUtils.clone(r.uniforms),
                vertexShader: r.vertexShader,
                fragmentShader: r.fragmentShader
            }),
            this.quad = new l.Mesh(new l.PlaneGeometry(2,2),this.material),
            this.scene.add(this.quad)
        }
        render(e) {
            for (const s of [this.outputRenderTarget, ...this.renderTargets])
                s.texture.repeat.copy(this.srcTexture.repeat),
                s.texture.offset.copy(this.srcTexture.offset);
            const i = this.renderTargets[this.rtIndex];
            this.material.uniforms.tDiffuse.value = this.srcTexture,
            this.material.uniforms.mirrorX.value = !0,
            e.setRenderTarget(i),
            e.render(this.scene, this.camera),
            this.rtIndex = (this.rtIndex + 1) % this.renderTargets.length,
            this.renderTargets.length > 1 && (this.material.uniforms.tDiffuse.value = this.renderTargets[this.rtIndex].texture,
            this.material.uniforms.mirrorX.value = !1,
            e.setRenderTarget(this.outputRenderTarget),
            e.render(this.scene, this.camera),
            this.outputRenderTarget.texture.repeat.copy(this.srcTexture.repeat),
            this.outputRenderTarget.texture.offset.copy(this.srcTexture.offset))
        }
        setTexture(e) {
            this.srcTexture = e
        }
        dispose() {
            this.outputRenderTarget.dispose();
            for (const e of this.renderTargets)
                e.dispose();
            this.outputRenderTarget.dispose(),
            this.material.dispose(),
            this.quad.geometry.dispose()
        }
        get texture() {
            return this.outputRenderTarget.texture
        }
    }
    const yc = "data:image/png;base64,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"
      , wc = `
uniform sampler2D blueNoiseTexture;
uniform vec2 blueNoiseSize;
uniform int blueNoiseIndex;

// internal RNG state
uvec4 s1;
ivec2 pixel;

void rng_initialize(vec2 p, int index) {
  pixel = ivec2(p);

  // blue noise seed
  s1 = uvec4(index, index * 15843, index * 31 + 4566, index * 2345 + 58585);
}

// https://www.pcg-random.org/
void pcg4d(inout uvec4 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y * v.w;
  v.y += v.z * v.x;
  v.z += v.x * v.y;
  v.w += v.y * v.z;
  v = v ^ (v >> 16u);
  v.x += v.y * v.w;
  v.y += v.z * v.x;
  v.z += v.x * v.y;
  v.w += v.y * v.z;
}

// random blue noise sampling pos
ivec2 shift2(ivec2 size) {
  pcg4d(s1);
  return (pixel + ivec2(s1.xy % 0x0fffffffu)) % size;
}

// needs a uniform called "resolution" with the size of the render target
vec4 blueNoise(vec2 uv, int index) {
  if (index == 0)
    return textureLod(blueNoiseTexture, uv * resolution / blueNoiseSize, 0.0);

  rng_initialize(uv * resolution, index);
  vec4 blueNoise = texelFetch(blueNoiseTexture, shift2(ivec2(blueNoiseSize)), 0);

  return blueNoise;
}

vec4 blueNoise(vec2 uv) { return blueNoise(uv, int(blueNoiseIndex)); }
`
      , Ea = 128
      , Ma = 2147483647
      , $t = new l.TextureLoader().load(yc, () => {
        $t.minFilter = l.NearestFilter,
        $t.magFilter = l.NearestFilter,
        $t.wrapS = l.RepeatWrapping,
        $t.wrapT = l.RepeatWrapping,
        $t.colorSpace = l.NoColorSpace
    }
    )
      , bc = t => {
        let e = 0;
        const i = Math.floor(Math.random() * Ma)
          , s = {
            blueNoiseTexture: {
                value: $t
            },
            blueNoiseSize: {
                value: new l.Vector2(Ea,Ea)
            },
            blueNoiseIndex: {
                get value() {
                    return e = (i + e + 1) % Ma,
                    e
                },
                set value(n) {
                    e = n
                }
            }
        };
        return t = t.replace("uniform vec2 resolution;", `uniform vec2 resolution;
` + wc),
        {
            uniforms: s,
            fragmentShader: t
        }
    }
      , xc = `
    uniform sampler2D tDiffuse;
    uniform float motionBlurIntensity;
    uniform float motionBlurJitter;
    uniform vec2 manualVelocity;
    uniform vec2 motionBlurCenter;
    uniform float motionBlurRadius;
    uniform vec2 resolution;
    uniform int frame;

    varying vec2 vUv;

    vec4 sampleColor(vec2 uv){
        return texture2D(tDiffuse, uv);
    }

    vec4 motionBlur(vec4 color) {
        vec2 velocity = manualVelocity;

        vec2 aspectVec = vec2(resolution.x / resolution.y, 1.0);
        float d = distance(vUv * aspectVec, vec2(motionBlurCenter.x, 1. - motionBlurCenter.y) * aspectVec);


        if(d > motionBlurRadius) {
            return color;
        }

        d = smoothstep(motionBlurRadius * 0.25, motionBlurRadius, d);
        d = sqrt(d);
        // return vec4(vec3(d), 1.);
        float centerIntensity = 1.0 - d;

        velocity *= motionBlurIntensity * centerIntensity;

        vec4 r = blueNoise(vUv, frame);
        vec2 motionBlurJitterOffset = motionBlurJitter * velocity * r.xy;

        vec2 startUv = vUv;
        vec2 endUv = vUv - (motionBlurJitterOffset - velocity);

        startUv = max(vec2(0.), startUv);
        endUv = min(vec2(1.), endUv);

        vec3 motionBlurredColor = color.rgb;
        for (float i = 1.0; i <= 16.0; i++) {
            vec2 reprojectedUv = mix(startUv, endUv, i / 16.0);
            vec3 neighborColor = sampleColor(reprojectedUv).rgb;
            motionBlurredColor += neighborColor;
        }

        motionBlurredColor /= 17.0;

        return vec4(motionBlurredColor, color.a);
    }

    void main() {
        vec4 baseColor = texture2D(tDiffuse, vUv);
        if(length(manualVelocity) < 0.000001) {
            gl_FragColor = baseColor;
        } else {
            gl_FragColor = motionBlur(baseColor);
        }
    }
`
      , Cc = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
    class Sc extends l.ShaderPass2 {
        constructor() {
            const {fragmentShader: e, uniforms: i} = bc(xc);
            super({
                fragmentShader: e,
                vertexShader: Cc,
                uniforms: {
                    ...i,
                    tDiffuse: {
                        value: null
                    },
                    motionBlurIntensity: {
                        value: 1
                    },
                    motionBlurJitter: {
                        value: 1
                    },
                    manualVelocity: {
                        value: new l.Vector2(0,0)
                    },
                    motionBlurCenter: {
                        value: new l.Vector2(.5,.5)
                    },
                    motionBlurRadius: {
                        value: .5
                    },
                    resolution: {
                        value: new l.Vector2(1,1)
                    },
                    frame: {
                        value: 0
                    }
                }
            }),
            this._lastFrameTime = performance.now()
        }
        setIntensity(e) {
            this.material.uniforms.motionBlurIntensity.value = e
        }
        setManualVelocity(e) {
            if (e.length() < 1e-6) {
                e = e.clone();
                const i = e.clone().multiply(e);
                e.lerp(i, e.length() / 1e-6)
            }
            this.material.uniforms.manualVelocity.value.copy(e)
        }
        setMotionBlurCenterAndRadius(e, i) {
            this.material.uniforms.motionBlurCenter.value.copy(e),
            this.material.uniforms.motionBlurRadius.value = i
        }
        setResolution(e, i) {
            this.material.uniforms.resolution.value.set(e, i)
        }
        incrementFrame() {
            this.material.uniforms.frame.value++
        }
        render(e, i, s) {
            const n = e.getSize(new l.Vector2);
            this.setResolution(n.width, n.height),
            this.material.uniforms.tDiffuse.value = i.texture,
            this.incrementFrame(),
            super.render(e, i, s)
        }
    }
    var ei = typeof self < "u" ? self : {};
    function Wt() {
        throw Error("Invalid UTF8")
    }
    function Ta(t, e) {
        return e = String.fromCharCode.apply(null, e),
        t == null ? e : t + e
    }
    let os, pn;
    const kc = typeof TextDecoder < "u";
    let Fc;
    const Pc = typeof TextEncoder < "u";
    function La(t) {
        if (Pc)
            t = (Fc || (Fc = new TextEncoder)).encode(t);
        else {
            let i = 0;
            const s = new Uint8Array(3 * t.length);
            for (let n = 0; n < t.length; n++) {
                var e = t.charCodeAt(n);
                if (e < 128)
                    s[i++] = e;
                else {
                    if (e < 2048)
                        s[i++] = e >> 6 | 192;
                    else {
                        if (e >= 55296 && e <= 57343) {
                            if (e <= 56319 && n < t.length) {
                                const r = t.charCodeAt(++n);
                                if (r >= 56320 && r <= 57343) {
                                    e = 1024 * (e - 55296) + r - 56320 + 65536,
                                    s[i++] = e >> 18 | 240,
                                    s[i++] = e >> 12 & 63 | 128,
                                    s[i++] = e >> 6 & 63 | 128,
                                    s[i++] = 63 & e | 128;
                                    continue
                                }
                                n--
                            }
                            e = 65533
                        }
                        s[i++] = e >> 12 | 224,
                        s[i++] = e >> 6 & 63 | 128
                    }
                    s[i++] = 63 & e | 128
                }
            }
            t = i === s.length ? s : s.subarray(0, i)
        }
        return t
    }
    var mn, ls;
    e: {
        for (var Aa = ["CLOSURE_FLAGS"], gn = ei, vn = 0; vn < Aa.length; vn++)
            if ((gn = gn[Aa[vn]]) == null) {
                ls = null;
                break e
            }
        ls = gn
    }
    var Oi, Ra = ls && ls[610401301];
    mn = Ra != null && Ra;
    const Da = ei.navigator;
    function yn(t) {
        return !!mn && !!Oi && Oi.brands.some( ({brand: e}) => e && e.indexOf(t) != -1)
    }
    function ze(t) {
        var e;
        return (e = ei.navigator) && (e = e.userAgent) || (e = ""),
        e.indexOf(t) != -1
    }
    function Et() {
        return !!mn && !!Oi && Oi.brands.length > 0
    }
    function wn() {
        return Et() ? yn("Chromium") : (ze("Chrome") || ze("CriOS")) && !(!Et() && ze("Edge")) || ze("Silk")
    }
    function hs(t) {
        return hs[" "](t),
        t
    }
    Oi = Da && Da.userAgentData || null,
    hs[" "] = function() {}
    ;
    var Ec = !Et() && (ze("Trident") || ze("MSIE"));
    !ze("Android") || wn(),
    wn(),
    ze("Safari") && (wn() || !Et() && ze("Coast") || !Et() && ze("Opera") || !Et() && ze("Edge") || (Et() ? yn("Microsoft Edge") : ze("Edg/")) || Et() && yn("Opera"));
    var Oa = {}
      , Hi = null;
    function Mc(t) {
        const e = t.length;
        let i = 3 * e / 4;
        i % 3 ? i = Math.floor(i) : "=.".indexOf(t[e - 1]) != -1 && (i = "=.".indexOf(t[e - 2]) != -1 ? i - 2 : i - 1);
        const s = new Uint8Array(i);
        let n = 0;
        return function(r, a) {
            function o(c) {
                for (; h < r.length; ) {
                    const d = r.charAt(h++)
                      , u = Hi[d];
                    if (u != null)
                        return u;
                    if (!/^[\s\xa0]*$/.test(d))
                        throw Error("Unknown base64 encoding at char: " + d)
                }
                return c
            }
            Ha();
            let h = 0;
            for (; ; ) {
                const c = o(-1)
                  , d = o(0)
                  , u = o(64)
                  , f = o(64);
                if (f === 64 && c === -1)
                    break;
                a(c << 2 | d >> 4),
                u != 64 && (a(d << 4 & 240 | u >> 2),
                f != 64 && a(u << 6 & 192 | f))
            }
        }(t, function(r) {
            s[n++] = r
        }),
        n !== i ? s.subarray(0, n) : s
    }
    function Ha() {
        if (!Hi) {
            Hi = {};
            var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("")
              , e = ["+/=", "+/", "-_=", "-_.", "-_"];
            for (let i = 0; i < 5; i++) {
                const s = t.concat(e[i].split(""));
                Oa[i] = s;
                for (let n = 0; n < s.length; n++) {
                    const r = s[n];
                    Hi[r] === void 0 && (Hi[r] = n)
                }
            }
        }
    }
    var Va = typeof Uint8Array < "u"
      , Ia = !Ec && typeof btoa == "function";
    function za(t) {
        if (!Ia) {
            var e;
            e === void 0 && (e = 0),
            Ha(),
            e = Oa[e];
            var i = Array(Math.floor(t.length / 3))
              , s = e[64] || "";
            let h = 0
              , c = 0;
            for (; h < t.length - 2; h += 3) {
                var n = t[h]
                  , r = t[h + 1]
                  , a = t[h + 2]
                  , o = e[n >> 2];
                n = e[(3 & n) << 4 | r >> 4],
                r = e[(15 & r) << 2 | a >> 6],
                a = e[63 & a],
                i[c++] = o + n + r + a
            }
            switch (o = 0,
            a = s,
            t.length - h) {
            case 2:
                a = e[(15 & (o = t[h + 1])) << 2] || s;
            case 1:
                t = t[h],
                i[c] = e[t >> 2] + e[(3 & t) << 4 | o >> 4] + a + s
            }
            return i.join("")
        }
        for (e = "",
        i = 0,
        s = t.length - 10240; i < s; )
            e += String.fromCharCode.apply(null, t.subarray(i, i += 10240));
        return e += String.fromCharCode.apply(null, i ? t.subarray(i) : t),
        btoa(e)
    }
    const Ba = /[-_.]/g
      , Tc = {
        "-": "+",
        _: "/",
        ".": "="
    };
    function Lc(t) {
        return Tc[t] || ""
    }
    function Wa(t) {
        if (!Ia)
            return Mc(t);
        Ba.test(t) && (t = t.replace(Ba, Lc)),
        t = atob(t);
        const e = new Uint8Array(t.length);
        for (let i = 0; i < t.length; i++)
            e[i] = t.charCodeAt(i);
        return e
    }
    function Ut(t) {
        return Va && t != null && t instanceof Uint8Array
    }
    var ti = {};
    function jt() {
        return Ac || (Ac = new ut(null,ti))
    }
    function bn(t) {
        Ua(ti);
        var e = t.g;
        return (e = e == null || Ut(e) ? e : typeof e == "string" ? Wa(e) : null) == null ? e : t.g = e
    }
    var ut = class {
        h() {
            return new Uint8Array(bn(this) || 0)
        }
        constructor(t, e) {
            if (Ua(e),
            this.g = t,
            t != null && t.length === 0)
                throw Error("ByteString should be constructed with non-empty values")
        }
    }
    ;
    let Ac, Rc;
    function Ua(t) {
        if (t !== ti)
            throw Error("illegal external caller")
    }
    function ja(t, e) {
        t.__closure__error__context__984382 || (t.__closure__error__context__984382 = {}),
        t.__closure__error__context__984382.severity = e
    }
    function xn(t) {
        return ja(t = Error(t), "warning"),
        t
    }
    function Cn(t) {
        if (t != null) {
            var e = Rc ?? (Rc = {})
              , i = e[t] || 0;
            i >= 5 || (e[t] = i + 1,
            ja(t = Error(), "incident"),
            function(s) {
                ei.setTimeout( () => {
                    throw s
                }
                , 0)
            }(t))
        }
    }
    var cs = typeof Symbol == "function" && typeof Symbol() == "symbol";
    function ii(t, e, i=!1) {
        return typeof Symbol == "function" && typeof Symbol() == "symbol" ? i && Symbol.for && t ? Symbol.for(t) : t != null ? Symbol(t) : Symbol() : e
    }
    var Dc = ii("jas", void 0, !0)
      , Na = ii(void 0, "0di")
      , Vi = ii(void 0, "1oa")
      , si = ii(void 0, Symbol())
      , Oc = ii(void 0, "0actk")
      , Xa = ii(void 0, "8utk");
    const F = cs ? Dc : "Ea"
      , Za = {
        Ea: {
            value: 0,
            configurable: !0,
            writable: !0,
            enumerable: !1
        }
    }
      , qa = Object.defineProperties;
    function ds(t, e) {
        cs || F in t || qa(t, Za),
        t[F] |= e
    }
    function ne(t, e) {
        cs || F in t || qa(t, Za),
        t[F] = e
    }
    function ni(t) {
        return ds(t, 34),
        t
    }
    function Hc(t, e) {
        ne(e, -15615 & (0 | t))
    }
    function Sn(t, e) {
        ne(e, -15581 & (34 | t))
    }
    function us() {
        return typeof BigInt == "function"
    }
    function Ce(t) {
        return Array.prototype.slice.call(t)
    }
    var kn, Ii = {};
    function fs(t) {
        return t !== null && typeof t == "object" && !Array.isArray(t) && t.constructor === Object
    }
    function Fn(t, e) {
        if (t != null) {
            if (typeof t == "string")
                t = t ? new ut(t,ti) : jt();
            else if (t.constructor !== ut)
                if (Ut(t))
                    t = t.length ? new ut(new Uint8Array(t),ti) : jt();
                else {
                    if (!e)
                        throw Error();
                    t = void 0
                }
        }
        return t
    }
    const Ga = [];
    function Mt(t) {
        if (2 & t)
            throw Error()
    }
    ne(Ga, 55),
    kn = Object.freeze(Ga);
    class Ya {
        constructor(e, i, s) {
            this.g = e,
            this.h = i,
            this.l = s
        }
        next() {
            const e = this.g.next();
            return e.done || (e.value = this.h.call(this.l, e.value)),
            e
        }
        [Symbol.iterator]() {
            return this
        }
    }
    function Pn(t) {
        return si ? t[si] : void 0
    }
    var Vc = Object.freeze({});
    function ps(t) {
        return t.Na = !0,
        t
    }
    var Ic = ps(t => typeof t == "number")
      , Ka = ps(t => typeof t == "string")
      , zc = ps(t => typeof t == "boolean")
      , ms = typeof ei.BigInt == "function" && typeof ei.BigInt(0) == "bigint";
    function Tt(t) {
        var e = t;
        if (Ka(e)) {
            if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(e))
                throw Error(String(e))
        } else if (Ic(e) && !Number.isSafeInteger(e))
            throw Error(String(e));
        return ms ? BigInt(t) : t = zc(t) ? t ? "1" : "0" : Ka(t) ? t.trim() || "0" : String(t)
    }
    var En = ps(t => ms ? t >= Wc && t <= jc : t[0] === "-" ? Ja(t, Bc) : Ja(t, Uc));
    const Bc = Number.MIN_SAFE_INTEGER.toString()
      , Wc = ms ? BigInt(Number.MIN_SAFE_INTEGER) : void 0
      , Uc = Number.MAX_SAFE_INTEGER.toString()
      , jc = ms ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;
    function Ja(t, e) {
        if (t.length > e.length)
            return !1;
        if (t.length < e.length || t === e)
            return !0;
        for (let i = 0; i < t.length; i++) {
            const s = t[i]
              , n = e[i];
            if (s > n)
                return !1;
            if (s < n)
                return !0
        }
    }
    const Nc = typeof Uint8Array.prototype.slice == "function";
    let _a, j = 0, _ = 0;
    function Qa(t) {
        const e = t >>> 0;
        j = e,
        _ = (t - e) / 4294967296 >>> 0
    }
    function Nt(t) {
        if (t < 0) {
            Qa(-t);
            const [e,i] = An(j, _);
            j = e >>> 0,
            _ = i >>> 0
        } else
            Qa(t)
    }
    function Mn(t) {
        const e = _a || (_a = new DataView(new ArrayBuffer(8)));
        e.setFloat32(0, +t, !0),
        _ = 0,
        j = e.getUint32(0, !0)
    }
    function Tn(t, e) {
        const i = 4294967296 * e + (t >>> 0);
        return Number.isSafeInteger(i) ? i : zi(t, e)
    }
    function Ln(t, e) {
        const i = 2147483648 & e;
        return i && (e = ~e >>> 0,
        (t = 1 + ~t >>> 0) == 0 && (e = e + 1 >>> 0)),
        typeof (t = Tn(t, e)) == "number" ? i ? -t : t : i ? "-" + t : t
    }
    function zi(t, e) {
        if (t >>>= 0,
        (e >>>= 0) <= 2097151)
            var i = "" + (4294967296 * e + t);
        else
            us() ? i = "" + (BigInt(e) << BigInt(32) | BigInt(t)) : (t = (16777215 & t) + 6777216 * (i = 16777215 & (t >>> 24 | e << 8)) + 6710656 * (e = e >> 16 & 65535),
            i += 8147497 * e,
            e *= 2,
            t >= 1e7 && (i += t / 1e7 >>> 0,
            t %= 1e7),
            i >= 1e7 && (e += i / 1e7 >>> 0,
            i %= 1e7),
            i = e + $a(i) + $a(t));
        return i
    }
    function $a(t) {
        return t = String(t),
        "0000000".slice(t.length) + t
    }
    function eo() {
        var t = j
          , e = _;
        if (2147483648 & e)
            if (us())
                t = "" + (BigInt(0 | e) << BigInt(32) | BigInt(t >>> 0));
            else {
                const [i,s] = An(t, e);
                t = "-" + zi(i, s)
            }
        else
            t = zi(t, e);
        return t
    }
    function gs(t) {
        if (t.length < 16)
            Nt(Number(t));
        else if (us())
            t = BigInt(t),
            j = Number(t & BigInt(4294967295)) >>> 0,
            _ = Number(t >> BigInt(32) & BigInt(4294967295));
        else {
            const e = +(t[0] === "-");
            _ = j = 0;
            const i = t.length;
            for (let s = e, n = (i - e) % 6 + e; n <= i; s = n,
            n += 6) {
                const r = Number(t.slice(s, n));
                _ *= 1e6,
                j = 1e6 * j + r,
                j >= 4294967296 && (_ += Math.trunc(j / 4294967296),
                _ >>>= 0,
                j >>>= 0)
            }
            if (e) {
                const [s,n] = An(j, _);
                j = s,
                _ = n
            }
        }
    }
    function An(t, e) {
        return e = ~e,
        t ? t = 1 + ~t : e += 1,
        [t, e]
    }
    const Bi = typeof BigInt == "function" ? BigInt.asIntN : void 0
      , Xc = typeof BigInt == "function" ? BigInt.asUintN : void 0
      , Lt = Number.isSafeInteger
      , vs = Number.isFinite
      , ri = Math.trunc
      , Zc = Tt(0);
    function At(t) {
        return t == null || typeof t == "number" ? t : t === "NaN" || t === "Infinity" || t === "-Infinity" ? Number(t) : void 0
    }
    function to(t) {
        return t == null || typeof t == "boolean" ? t : typeof t == "number" ? !!t : void 0
    }
    const qc = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
    function Wi(t) {
        switch (typeof t) {
        case "bigint":
            return !0;
        case "number":
            return vs(t);
        case "string":
            return qc.test(t);
        default:
            return !1
        }
    }
    function ai(t) {
        if (t == null)
            return t;
        if (typeof t == "string" && t)
            t = +t;
        else if (typeof t != "number")
            return;
        return vs(t) ? 0 | t : void 0
    }
    function io(t) {
        if (t == null)
            return t;
        if (typeof t == "string" && t)
            t = +t;
        else if (typeof t != "number")
            return;
        return vs(t) ? t >>> 0 : void 0
    }
    function so(t) {
        if (t[0] === "-")
            return !1;
        const e = t.length;
        return e < 20 || e === 20 && Number(t.substring(0, 6)) < 184467
    }
    function no(t) {
        const e = t.length;
        return t[0] === "-" ? e < 20 || e === 20 && Number(t.substring(0, 7)) > -922337 : e < 19 || e === 19 && Number(t.substring(0, 6)) < 922337
    }
    function ro(t) {
        return no(t) ? t : (gs(t),
        eo())
    }
    function Rn(t) {
        return t = ri(t),
        Lt(t) || (Nt(t),
        t = Ln(j, _)),
        t
    }
    function ao(t) {
        var e = ri(Number(t));
        return Lt(e) ? String(e) : ((e = t.indexOf(".")) !== -1 && (t = t.substring(0, e)),
        ro(t))
    }
    function oo(t) {
        var e = ri(Number(t));
        return Lt(e) ? Tt(e) : ((e = t.indexOf(".")) !== -1 && (t = t.substring(0, e)),
        us() ? Tt(Bi(64, BigInt(t))) : Tt(ro(t)))
    }
    function lo(t) {
        if (Lt(t))
            t = Tt(Rn(t));
        else {
            if (t = ri(t),
            Lt(t))
                t = String(t);
            else {
                const e = String(t);
                no(e) ? t = e : (Nt(t),
                t = eo())
            }
            t = Tt(t)
        }
        return t
    }
    function Dn(t) {
        return t == null ? t : typeof t == "bigint" ? (En(t) ? t = Number(t) : (t = Bi(64, t),
        t = En(t) ? Number(t) : String(t)),
        t) : Wi(t) ? typeof t == "number" ? Rn(t) : ao(t) : void 0
    }
    function Gc(t) {
        if (t == null)
            return t;
        var e = typeof t;
        if (e === "bigint")
            return String(Xc(64, t));
        if (Wi(t)) {
            if (e === "string")
                return e = ri(Number(t)),
                Lt(e) && e >= 0 ? t = String(e) : ((e = t.indexOf(".")) !== -1 && (t = t.substring(0, e)),
                so(t) || (gs(t),
                t = zi(j, _))),
                t;
            if (e === "number")
                return (t = ri(t)) >= 0 && Lt(t) ? t : function(i) {
                    if (i < 0) {
                        Nt(i);
                        var s = zi(j, _);
                        return i = Number(s),
                        Lt(i) ? i : s
                    }
                    return so(s = String(i)) ? s : (Nt(i),
                    Tn(j, _))
                }(t)
        }
    }
    function ho(t) {
        if (typeof t != "string")
            throw Error();
        return t
    }
    function oi(t) {
        if (t != null && typeof t != "string")
            throw Error();
        return t
    }
    function li(t) {
        return t == null || typeof t == "string" ? t : void 0
    }
    function On(t, e, i, s) {
        if (t != null && typeof t == "object" && t.W === Ii)
            return t;
        if (!Array.isArray(t))
            return i ? 2 & s ? ((t = e[Na]) || (ni((t = new e).u),
            t = e[Na] = t),
            e = t) : e = new e : e = void 0,
            e;
        let n = i = 0 | t[F];
        return n === 0 && (n |= 32 & s),
        n |= 2 & s,
        n !== i && ne(t, n),
        new e(t)
    }
    function Yc(t, e, i) {
        if (e)
            e: {
                if (!Wi(e = t))
                    throw xn("int64");
                switch (typeof e) {
                case "string":
                    e = oo(e);
                    break e;
                case "bigint":
                    e = Tt(Bi(64, e));
                    break e;
                default:
                    e = lo(e)
                }
            }
        else
            t = typeof (e = t),
            e = e == null ? e : t === "bigint" ? Tt(Bi(64, e)) : Wi(e) ? t === "string" ? oo(e) : lo(e) : void 0;
        return (t = e) == null ? i ? Zc : void 0 : t
    }
    function Kc(t) {
        return t
    }
    const Jc = {};
    let _c = function() {
        try {
            return hs(new class extends Map {
                constructor() {
                    super()
                }
            }
            ),
            !1
        } catch {
            return !0
        }
    }();
    class Hn {
        constructor() {
            this.g = new Map
        }
        get(e) {
            return this.g.get(e)
        }
        set(e, i) {
            return this.g.set(e, i),
            this.size = this.g.size,
            this
        }
        delete(e) {
            return e = this.g.delete(e),
            this.size = this.g.size,
            e
        }
        clear() {
            this.g.clear(),
            this.size = this.g.size
        }
        has(e) {
            return this.g.has(e)
        }
        entries() {
            return this.g.entries()
        }
        keys() {
            return this.g.keys()
        }
        values() {
            return this.g.values()
        }
        forEach(e, i) {
            return this.g.forEach(e, i)
        }
        [Symbol.iterator]() {
            return this.entries()
        }
    }
    const Qc = _c ? (Object.setPrototypeOf(Hn.prototype, Map.prototype),
    Object.defineProperties(Hn.prototype, {
        size: {
            value: 0,
            configurable: !0,
            enumerable: !0,
            writable: !0
        }
    }),
    Hn) : class extends Map {
        constructor() {
            super()
        }
    }
    ;
    function co(t) {
        return t
    }
    function Vn(t) {
        if (2 & t.M)
            throw Error("Cannot mutate an immutable Map")
    }
    var _e = class extends Qc {
        constructor(t, e, i=co, s=co) {
            super();
            let n = 0 | t[F];
            n |= 64,
            ne(t, n),
            this.M = n,
            this.I = e,
            this.S = i,
            this.X = this.I ? $c : s;
            for (let r = 0; r < t.length; r++) {
                const a = t[r]
                  , o = i(a[0], !1, !0);
                let h = a[1];
                e ? h === void 0 && (h = null) : h = s(a[1], !1, !0, void 0, void 0, n),
                super.set(o, h)
            }
        }
        La() {
            var t = nd;
            if (this.size !== 0)
                return Array.from(super.entries(), e => (e[0] = t(e[0]),
                e[1] = t(e[1]),
                e))
        }
        da(t=ed) {
            const e = []
              , i = super.entries();
            for (var s; !(s = i.next()).done; )
                (s = s.value)[0] = t(s[0]),
                s[1] = t(s[1]),
                e.push(s);
            return e
        }
        clear() {
            Vn(this),
            super.clear()
        }
        delete(t) {
            return Vn(this),
            super.delete(this.S(t, !0, !1))
        }
        entries() {
            if (this.I) {
                var t = super.keys();
                t = new Ya(t,td,this)
            } else
                t = super.entries();
            return t
        }
        values() {
            if (this.I) {
                var t = super.keys();
                t = new Ya(t,_e.prototype.get,this)
            } else
                t = super.values();
            return t
        }
        forEach(t, e) {
            this.I ? super.forEach( (i, s, n) => {
                t.call(e, n.get(s), s, n)
            }
            ) : super.forEach(t, e)
        }
        set(t, e) {
            return Vn(this),
            (t = this.S(t, !0, !1)) == null ? this : e == null ? (super.delete(t),
            this) : super.set(t, this.X(e, !0, !0, this.I, !1, this.M))
        }
        Ja(t) {
            const e = this.S(t[0], !1, !0);
            t = t[1],
            t = this.I ? t === void 0 ? null : t : this.X(t, !1, !0, void 0, !1, this.M),
            super.set(e, t)
        }
        has(t) {
            return super.has(this.S(t, !1, !1))
        }
        get(t) {
            t = this.S(t, !1, !1);
            const e = super.get(t);
            if (e !== void 0) {
                var i = this.I;
                return i ? ((i = this.X(e, !1, !0, i, this.pa, this.M)) !== e && super.set(t, i),
                i) : e
            }
        }
        [Symbol.iterator]() {
            return this.entries()
        }
    }
    ;
    function $c(t, e, i, s, n, r) {
        return t = On(t, s, i, r),
        n && (t = bs(t)),
        t
    }
    function ed(t) {
        return t
    }
    function td(t) {
        return [t, this.get(t)]
    }
    let id, uo, fo, sd;
    function po() {
        return id || (id = new _e(ni([]),void 0,void 0,void 0,Jc))
    }
    function In(t, e, i, s, n) {
        if (t != null) {
            if (Array.isArray(t)) {
                const r = 0 | t[F];
                return t.length === 0 && 1 & r ? void 0 : n && 2 & r ? t : ys(t, e, i, s !== void 0, n)
            }
            return e(t, s)
        }
    }
    function ys(t, e, i, s, n) {
        const r = s || i ? 0 | t[F] : 0
          , a = s ? !!(32 & r) : void 0;
        let o = 0;
        const h = (s = Ce(t)).length;
        for (let y = 0; y < h; y++) {
            var c = s[y];
            if (y === h - 1 && fs(c)) {
                var d = e
                  , u = i
                  , f = a
                  , g = n;
                let b;
                for (let w in c) {
                    const p = In(c[w], d, u, f, g);
                    p != null && ((b ?? (b = {}))[w] = p)
                }
                c = b
            } else
                c = In(s[y], e, i, a, n);
            s[y] = c,
            c != null && (o = y + 1)
        }
        return o < h && (s.length = o),
        i && ((t = Pn(t)) && (s[si] = Ce(t)),
        i(r, s)),
        s
    }
    function nd(t) {
        return In(t, zn, void 0, void 0, !1)
    }
    function zn(t) {
        switch (typeof t) {
        case "number":
            return Number.isFinite(t) ? t : "" + t;
        case "bigint":
            return En(t) ? Number(t) : "" + t;
        case "boolean":
            return t ? 1 : 0;
        case "object":
            if (Ut(t))
                return Ut(t) && Cn(Xa),
                za(t);
            if (t.W === Ii)
                return mo(t);
            if (t instanceof ut) {
                const e = t.g;
                return e == null ? "" : typeof e == "string" ? e : t.g = za(e)
            }
            return t instanceof _e ? t.La() : void 0
        }
        return t
    }
    function mo(t) {
        var e = t.u;
        t = ys(e, zn, void 0, void 0, !1);
        var i = 0 | e[F];
        if ((e = t.length) && !(512 & i)) {
            var s = t[e - 1]
              , n = !1;
            fs(s) ? (e--,
            n = !0) : s = void 0;
            var r = e - (i = 512 & i ? 0 : -1)
              , a = (uo ?? Kc)(r, i, t, s);
            if (s && (t[e] = void 0),
            r < a && s) {
                for (var o in r = !0,
                s) {
                    const h = +o;
                    h <= a ? (t[n = h + i] = s[o],
                    e = Math.max(n + 1, e),
                    n = !1,
                    delete s[o]) : r = !1
                }
                r && (s = void 0)
            }
            for (r = e - 1; e > 0; r = e - 1)
                if ((o = t[r]) == null)
                    e--,
                    n = !0;
                else {
                    if (!((r -= i) >= a))
                        break;
                    (s ?? (s = {}))[r] = o,
                    e--,
                    n = !0
                }
            n && (t.length = e),
            s && t.push(s)
        }
        return t
    }
    function Rt(t, e, i) {
        return t = go(t, e[0], e[1], i ? 1 : 2),
        e !== fo && i && ds(t, 8192),
        t
    }
    function go(t, e, i, s) {
        if (t == null) {
            var n = 96;
            i ? (t = [i],
            n |= 512) : t = [],
            e && (n = -16760833 & n | (1023 & e) << 14)
        } else {
            if (!Array.isArray(t))
                throw Error("narr");
            if (8192 & (n = 0 | t[F]) || !(64 & n) || 2 & n || Cn(Oc),
            1024 & n)
                throw Error("farr");
            if (64 & n)
                return t;
            if (s === 1 || s === 2 || (n |= 64),
            i && (n |= 512,
            i !== t[0]))
                throw Error("mid");
            e: {
                var r = (i = t).length;
                if (r) {
                    var a = r - 1;
                    if (fs(s = i[a])) {
                        if ((a -= e = 512 & (n |= 256) ? 0 : -1) >= 1024)
                            throw Error("pvtlmt");
                        for (var o in s)
                            (r = +o) < a && (i[r + e] = s[o],
                            delete s[o]);
                        n = -16760833 & n | (1023 & a) << 14;
                        break e
                    }
                }
                if (e) {
                    if ((o = Math.max(e, r - (512 & n ? 0 : -1))) > 1024)
                        throw Error("spvt");
                    n = -16760833 & n | (1023 & o) << 14
                }
            }
        }
        return ne(t, n),
        t
    }
    function Bn(t, e, i=Sn) {
        if (t != null) {
            if (Va && t instanceof Uint8Array)
                return e ? t : new Uint8Array(t);
            if (Array.isArray(t)) {
                var s = 0 | t[F];
                return 2 & s ? t : (e && (e = s === 0 || !!(32 & s) && !(64 & s || !(16 & s))),
                e ? (ne(t, 34 | s),
                4 & s && Object.freeze(t),
                t) : ys(t, Bn, 4 & s ? Sn : i, !0, !0))
            }
            return t.W === Ii ? t = 2 & (s = 0 | (i = t.u)[F]) ? t : new t.constructor(ws(i, s, !0)) : t instanceof _e && !(2 & t.M) && (i = ni(t.da(Bn)),
            t = new _e(i,t.I,t.S,t.X)),
            t
        }
    }
    function ws(t, e, i) {
        const s = i || 2 & e ? Sn : Hc
          , n = !!(32 & e);
        return t = function(r, a, o) {
            const h = Ce(r);
            var c = h.length;
            const d = 256 & a ? h[c - 1] : void 0;
            for (c += d ? -1 : 0,
            a = 512 & a ? 1 : 0; a < c; a++)
                h[a] = o(h[a]);
            if (d) {
                a = h[a] = {};
                for (const u in d)
                    a[u] = o(d[u])
            }
            return (r = Pn(r)) && (h[si] = Ce(r)),
            h
        }(t, e, r => Bn(r, n, s)),
        ds(t, 32 | (i ? 2 : 0)),
        t
    }
    function bs(t) {
        const e = t.u
          , i = 0 | e[F];
        return 2 & i ? new t.constructor(ws(e, i, !1)) : t
    }
    function hi(t, e) {
        return ft(t = t.u, 0 | t[F], e)
    }
    function ft(t, e, i) {
        if (i === -1)
            return null;
        const s = i + (512 & e ? 0 : -1)
          , n = t.length - 1;
        return s >= n && 256 & e ? t[n][i] : s <= n ? t[s] : void 0
    }
    function N(t, e, i) {
        const s = t.u;
        let n = 0 | s[F];
        return Mt(n),
        J(s, n, e, i),
        t
    }
    function J(t, e, i, s) {
        const n = 512 & e ? 0 : -1
          , r = i + n;
        var a = t.length - 1;
        return r >= a && 256 & e ? (t[a][i] = s,
        e) : r <= a ? (t[r] = s,
        e) : (s !== void 0 && (i >= (a = e >> 14 & 1023 || 536870912) ? s != null && (t[a + n] = {
            [i]: s
        },
        ne(t, e |= 256)) : t[r] = s),
        e)
    }
    function xs(t, e) {
        let i = 0 | (t = t.u)[F];
        const s = ft(t, i, e)
          , n = At(s);
        return n != null && n !== s && J(t, i, e, n),
        n
    }
    function vo(t) {
        let e = 0 | (t = t.u)[F];
        const i = ft(t, e, 1)
          , s = Fn(i, !0);
        return s != null && s !== i && J(t, e, 1, s),
        s
    }
    function Xt() {
        return Vc === void 0 ? 2 : 4
    }
    function Zt(t, e, i, s, n) {
        const r = t.u
          , a = 2 & (t = 0 | r[F]) ? 1 : s;
        n = !!n;
        let o = 0 | (s = Wn(r, t, e))[F];
        if (!(4 & o)) {
            4 & o && (s = Ce(s),
            o = gt(o, t),
            t = J(r, t, e, s));
            let h = 0
              , c = 0;
            for (; h < s.length; h++) {
                const d = i(s[h]);
                d != null && (s[c++] = d)
            }
            c < h && (s.length = c),
            o = Un(o, t),
            i = -2049 & (20 | o),
            o = i &= -4097,
            ne(s, o),
            2 & o && Object.freeze(s)
        }
        return a === 1 || a === 4 && 32 & o ? pt(o) || (n = o,
        o |= 2,
        o !== n && ne(s, o),
        Object.freeze(s)) : (a === 2 && pt(o) && (s = Ce(s),
        o = gt(o, t),
        o = Dt(o, t, n),
        ne(s, o),
        t = J(r, t, e, s)),
        pt(o) || (e = o,
        o = Dt(o, t, n),
        o !== e && ne(s, o))),
        s
    }
    function Wn(t, e, i) {
        return t = ft(t, e, i),
        Array.isArray(t) ? t : kn
    }
    function Un(t, e) {
        return t === 0 && (t = gt(t, e)),
        1 | t
    }
    function pt(t) {
        return !!(2 & t) && !!(4 & t) || !!(1024 & t)
    }
    function yo(t) {
        t = Ce(t);
        for (let e = 0; e < t.length; e++) {
            const i = t[e] = Ce(t[e]);
            Array.isArray(i[1]) && (i[1] = ni(i[1]))
        }
        return t
    }
    function jn(t, e, i, s) {
        let n = 0 | (t = t.u)[F];
        Mt(n),
        J(t, n, e, (s === "0" ? Number(i) === 0 : i === s) ? void 0 : i)
    }
    function ci(t, e, i, s) {
        Mt(e);
        let n = Wn(t, e, i);
        const r = n !== kn;
        if (64 & e || !(8192 & e) || !r) {
            const a = r ? 0 | n[F] : 0;
            let o = a;
            (!r || 2 & o || pt(o) || 4 & o && !(32 & o)) && (n = Ce(n),
            o = gt(o, e),
            e = J(t, e, i, n)),
            o = -13 & Un(o, e),
            o = Dt(s ? -17 & o : 16 | o, e, !0),
            o !== a && ne(n, o)
        }
        return n
    }
    function Nn(t, e) {
        var i = yl;
        return Zn(Xn(t = t.u), t, 0 | t[F], i) === e ? e : -1
    }
    function Xn(t) {
        if (cs)
            return t[Vi] ?? (t[Vi] = new Map);
        if (Vi in t)
            return t[Vi];
        const e = new Map;
        return Object.defineProperty(t, Vi, {
            value: e
        }),
        e
    }
    function wo(t, e, i, s) {
        const n = Xn(t)
          , r = Zn(n, t, e, i);
        return r !== s && (r && (e = J(t, e, r)),
        n.set(i, s)),
        e
    }
    function Zn(t, e, i, s) {
        let n = t.get(s);
        if (n != null)
            return n;
        n = 0;
        for (let r = 0; r < s.length; r++) {
            const a = s[r];
            ft(e, i, a) != null && (n !== 0 && (i = J(e, i, n)),
            n = a)
        }
        return t.set(s, n),
        n
    }
    function qn(t, e, i) {
        let s = 0 | t[F];
        const n = ft(t, s, i);
        let r;
        if (n != null && n.W === Ii)
            return (e = bs(n)) !== n && J(t, s, i, e),
            e.u;
        if (Array.isArray(n)) {
            const a = 0 | n[F];
            r = 2 & a ? Rt(ws(n, a, !1), e, !0) : 64 & a ? n : Rt(r, e, !0)
        } else
            r = Rt(void 0, e, !0);
        return r !== n && J(t, s, i, r),
        r
    }
    function bo(t, e, i) {
        let s = 0 | (t = t.u)[F];
        const n = ft(t, s, i);
        return (e = On(n, e, !1, s)) !== n && e != null && J(t, s, i, e),
        e
    }
    function I(t, e, i) {
        if ((e = bo(t, e, i)) == null)
            return e;
        let s = 0 | (t = t.u)[F];
        if (!(2 & s)) {
            const n = bs(e);
            n !== e && J(t, s, i, e = n)
        }
        return e
    }
    function xo(t, e, i, s, n, r, a) {
        t = t.u;
        var o = !!(2 & e);
        const h = o ? 1 : n;
        r = !!r,
        a && (a = !o);
        var c = 0 | (n = Wn(t, e, s))[F];
        if (!(o = !!(4 & c))) {
            var d = n
              , u = e;
            const f = !!(2 & (c = Un(c, e)));
            f && (u |= 2);
            let g = !f
              , y = !0
              , b = 0
              , w = 0;
            for (; b < d.length; b++) {
                const p = On(d[b], i, !1, u);
                if (p instanceof i) {
                    if (!f) {
                        const v = !!(2 & (0 | p.u[F]));
                        g && (g = !v),
                        y && (y = v)
                    }
                    d[w++] = p
                }
            }
            w < b && (d.length = w),
            c |= 4,
            c = y ? 16 | c : -17 & c,
            ne(d, c = g ? 8 | c : -9 & c),
            f && Object.freeze(d)
        }
        if (a && !(8 & c || !n.length && (h === 1 || h === 4 && 32 & c))) {
            for (pt(c) && (n = Ce(n),
            c = gt(c, e),
            e = J(t, e, s, n)),
            i = n,
            a = c,
            d = 0; d < i.length; d++)
                (c = i[d]) !== (u = bs(c)) && (i[d] = u);
            a |= 8,
            ne(i, a = i.length ? -17 & a : 16 | a),
            c = a
        }
        return h === 1 || h === 4 && 32 & c ? pt(c) || (e = c,
        (c |= !n.length || 16 & c && (!o || 32 & c) ? 2 : 1024) !== e && ne(n, c),
        Object.freeze(n)) : (h === 2 && pt(c) && (ne(n = Ce(n), c = Dt(c = gt(c, e), e, r)),
        e = J(t, e, s, n)),
        pt(c) || (s = c,
        (c = Dt(c, e, r)) !== s && ne(n, c))),
        n
    }
    function mt(t, e, i) {
        const s = 0 | t.u[F];
        return xo(t, s, e, i, Xt(), !1, !(2 & s))
    }
    function E(t, e, i, s) {
        return s == null && (s = void 0),
        N(t, i, s)
    }
    function Ui(t, e, i, s) {
        s == null && (s = void 0);
        e: {
            let n = 0 | (t = t.u)[F];
            if (Mt(n),
            s == null) {
                const r = Xn(t);
                if (Zn(r, t, n, i) !== e)
                    break e;
                r.set(i, 0)
            } else
                n = wo(t, n, i, e);
            J(t, n, e, s)
        }
    }
    function gt(t, e) {
        return -1025 & (t = 32 | (2 & e ? 2 | t : -3 & t))
    }
    function Dt(t, e, i) {
        return 32 & e && i || (t &= -33),
        t
    }
    function Cs(t, e, i) {
        Mt(0 | t.u[F]),
        Zt(t, e, li, 2, !0).push(ho(i))
    }
    function Ss(t, e, i, s) {
        const n = 0 | t.u[F];
        Mt(n),
        t = xo(t, n, i, e, 2, !0),
        s = s ?? new i,
        t.push(s),
        t[F] = 2 & (0 | s.u[F]) ? -9 & t[F] : -17 & t[F]
    }
    function Be(t, e) {
        return ai(hi(t, e))
    }
    function We(t, e) {
        return li(hi(t, e))
    }
    function te(t, e) {
        return xs(t, e) ?? 0
    }
    function ji(t, e, i) {
        if (i != null && typeof i != "boolean")
            throw t = typeof i,
            Error(`Expected boolean but got ${t != "object" ? t : i ? Array.isArray(i) ? "array" : t : "null"}: ${i}`);
        N(t, e, i)
    }
    function Qe(t, e, i) {
        if (i != null) {
            if (typeof i != "number" || !vs(i))
                throw xn("int32");
            i |= 0
        }
        N(t, e, i)
    }
    function S(t, e, i) {
        if (i != null && typeof i != "number")
            throw Error(`Value of float/double field must be a number, found ${typeof i}: ${i}`);
        N(t, e, i)
    }
    function ks(t, e, i) {
        {
            const a = t.u;
            let o = 0 | a[F];
            if (Mt(o),
            i == null)
                J(a, o, e);
            else {
                var s = t = 0 | i[F]
                  , n = pt(t)
                  , r = n || Object.isFrozen(i);
                for (n || (t = 0),
                r || (i = Ce(i),
                s = 0,
                t = Dt(t = gt(t, o), o, !0),
                r = !1),
                t |= 21,
                n = 0; n < i.length; n++) {
                    const h = i[n]
                      , c = ho(h);
                    Object.is(h, c) || (r && (i = Ce(i),
                    s = 0,
                    t = Dt(t = gt(t, o), o, !0),
                    r = !1),
                    i[n] = c)
                }
                t !== s && (r && (i = Ce(i),
                t = Dt(t = gt(t, o), o, !0)),
                ne(i, t)),
                J(a, o, e, i)
            }
        }
    }
    function Co(t, e) {
        return Error(`Invalid wire type: ${t} (at position ${e})`)
    }
    function Gn() {
        return Error("Failed to read varint, encoding is invalid.")
    }
    function So(t, e) {
        return Error(`Tried to read past the end of the data ${e} > ${t}`)
    }
    function Yn(t) {
        if (typeof t == "string")
            return {
                buffer: Wa(t),
                O: !1
            };
        if (Array.isArray(t))
            return {
                buffer: new Uint8Array(t),
                O: !1
            };
        if (t.constructor === Uint8Array)
            return {
                buffer: t,
                O: !1
            };
        if (t.constructor === ArrayBuffer)
            return {
                buffer: new Uint8Array(t),
                O: !1
            };
        if (t.constructor === ut)
            return {
                buffer: bn(t) || new Uint8Array(0),
                O: !0
            };
        if (t instanceof Uint8Array)
            return {
                buffer: new Uint8Array(t.buffer,t.byteOffset,t.byteLength),
                O: !1
            };
        throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers")
    }
    function Kn(t, e) {
        let i, s = 0, n = 0, r = 0;
        const a = t.h;
        let o = t.g;
        do
            i = a[o++],
            s |= (127 & i) << r,
            r += 7;
        while (r < 32 && 128 & i);
        for (r > 32 && (n |= (127 & i) >> 4),
        r = 3; r < 32 && 128 & i; r += 7)
            i = a[o++],
            n |= (127 & i) << r;
        if (qt(t, o),
        i < 128)
            return e(s >>> 0, n >>> 0);
        throw Gn()
    }
    function Jn(t) {
        let e = 0
          , i = t.g;
        const s = i + 10
          , n = t.h;
        for (; i < s; ) {
            const r = n[i++];
            if (e |= r,
            (128 & r) == 0)
                return qt(t, i),
                !!(127 & e)
        }
        throw Gn()
    }
    function Ot(t) {
        const e = t.h;
        let i = t.g
          , s = e[i++]
          , n = 127 & s;
        if (128 & s && (s = e[i++],
        n |= (127 & s) << 7,
        128 & s && (s = e[i++],
        n |= (127 & s) << 14,
        128 & s && (s = e[i++],
        n |= (127 & s) << 21,
        128 & s && (s = e[i++],
        n |= s << 28,
        128 & s && 128 & e[i++] && 128 & e[i++] && 128 & e[i++] && 128 & e[i++] && 128 & e[i++])))))
            throw Gn();
        return qt(t, i),
        n
    }
    function vt(t) {
        return Ot(t) >>> 0
    }
    function _n(t) {
        var e = t.h;
        const i = t.g
          , s = e[i]
          , n = e[i + 1]
          , r = e[i + 2];
        return e = e[i + 3],
        qt(t, t.g + 4),
        (s << 0 | n << 8 | r << 16 | e << 24) >>> 0
    }
    function Qn(t) {
        var e = _n(t);
        t = 2 * (e >> 31) + 1;
        const i = e >>> 23 & 255;
        return e &= 8388607,
        i == 255 ? e ? NaN : t * (1 / 0) : i == 0 ? 1401298464324817e-60 * t * e : t * Math.pow(2, i - 150) * (e + 8388608)
    }
    function rd(t) {
        return Ot(t)
    }
    function $n(t, e, {aa: i=!1}={}) {
        t.aa = i,
        e && (e = Yn(e),
        t.h = e.buffer,
        t.m = e.O,
        t.j = 0,
        t.l = t.h.length,
        t.g = t.j)
    }
    function qt(t, e) {
        if (t.g = e,
        e > t.l)
            throw So(t.l, e)
    }
    function ko(t, e) {
        if (e < 0)
            throw Error(`Tried to read a negative byte length: ${e}`);
        const i = t.g
          , s = i + e;
        if (s > t.l)
            throw So(e, t.l - i);
        return t.g = s,
        i
    }
    function Fo(t, e) {
        if (e == 0)
            return jt();
        var i = ko(t, e);
        return t.aa && t.m ? i = t.h.subarray(i, i + e) : (t = t.h,
        i = i === (e = i + e) ? new Uint8Array(0) : Nc ? t.slice(i, e) : new Uint8Array(t.subarray(i, e))),
        i.length == 0 ? jt() : new ut(i,ti)
    }
    _e.prototype.toJSON = void 0;
    var Po = [];
    function Eo(t) {
        var e = t.g;
        if (e.g == e.l)
            return !1;
        t.l = t.g.g;
        var i = vt(t.g);
        if (e = i >>> 3,
        !((i &= 7) >= 0 && i <= 5))
            throw Co(i, t.l);
        if (e < 1)
            throw Error(`Invalid field number: ${e} (at position ${t.l})`);
        return t.m = e,
        t.h = i,
        !0
    }
    function Fs(t) {
        switch (t.h) {
        case 0:
            t.h != 0 ? Fs(t) : Jn(t.g);
            break;
        case 1:
            qt(t = t.g, t.g + 8);
            break;
        case 2:
            if (t.h != 2)
                Fs(t);
            else {
                var e = vt(t.g);
                qt(t = t.g, t.g + e)
            }
            break;
        case 5:
            qt(t = t.g, t.g + 4);
            break;
        case 3:
            for (e = t.m; ; ) {
                if (!Eo(t))
                    throw Error("Unmatched start-group tag: stream EOF");
                if (t.h == 4) {
                    if (t.m != e)
                        throw Error("Unmatched end-group tag");
                    break
                }
                Fs(t)
            }
            break;
        default:
            throw Co(t.h, t.l)
        }
    }
    function Ni(t, e, i) {
        const s = t.g.l
          , n = vt(t.g)
          , r = t.g.g + n;
        let a = r - s;
        if (a <= 0 && (t.g.l = r,
        i(e, t, void 0, void 0, void 0),
        a = r - t.g.g),
        a)
            throw Error(`Message parsing ended unexpectedly. Expected to read ${n} bytes, instead read ${n - a} bytes, either the data ended unexpectedly or the message misreported its own length`);
        return t.g.g = r,
        t.g.l = s,
        e
    }
    function er(t) {
        var e = vt(t.g)
          , i = ko(t = t.g, e);
        if (t = t.h,
        kc) {
            var s, n = t;
            (s = pn) || (s = pn = new TextDecoder("utf-8",{
                fatal: !0
            })),
            e = i + e,
            n = i === 0 && e === n.length ? n : n.subarray(i, e);
            try {
                var r = s.decode(n)
            } catch (o) {
                if (os === void 0) {
                    try {
                        s.decode(new Uint8Array([128]))
                    } catch {}
                    try {
                        s.decode(new Uint8Array([97])),
                        os = !0
                    } catch {
                        os = !1
                    }
                }
                throw !os && (pn = void 0),
                o
            }
        } else {
            e = (r = i) + e,
            i = [];
            let o, h = null;
            for (; r < e; ) {
                var a = t[r++];
                a < 128 ? i.push(a) : a < 224 ? r >= e ? Wt() : (o = t[r++],
                a < 194 || (192 & o) != 128 ? (r--,
                Wt()) : i.push((31 & a) << 6 | 63 & o)) : a < 240 ? r >= e - 1 ? Wt() : (o = t[r++],
                (192 & o) != 128 || a === 224 && o < 160 || a === 237 && o >= 160 || (192 & (s = t[r++])) != 128 ? (r--,
                Wt()) : i.push((15 & a) << 12 | (63 & o) << 6 | 63 & s)) : a <= 244 ? r >= e - 2 ? Wt() : (o = t[r++],
                (192 & o) != 128 || o - 144 + (a << 28) >> 30 != 0 || (192 & (s = t[r++])) != 128 || (192 & (n = t[r++])) != 128 ? (r--,
                Wt()) : (a = (7 & a) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & n,
                a -= 65536,
                i.push(55296 + (a >> 10 & 1023), 56320 + (1023 & a)))) : Wt(),
                i.length >= 8192 && (h = Ta(h, i),
                i.length = 0)
            }
            r = Ta(h, i)
        }
        return r
    }
    function Mo(t) {
        const e = vt(t.g);
        return Fo(t.g, e)
    }
    function Ps(t, e, i) {
        var s = vt(t.g);
        for (s = t.g.g + s; t.g.g < s; )
            i.push(e(t.g))
    }
    var Es = [];
    function Ge(t, e, i) {
        e.g ? e.m(t, e.g, e.h, i) : e.m(t, e.h, i)
    }
    var C = class {
        constructor(t, e) {
            this.u = go(t, e)
        }
        toJSON() {
            try {
                var t = mo(this)
            } finally {
                uo = void 0
            }
            return t
        }
        l() {
            var t = Wd;
            return t.g ? t.l(this, t.g, t.h) : t.l(this, t.h, t.defaultValue)
        }
        clone() {
            const t = this.u;
            return new this.constructor(ws(t, 0 | t[F], !1))
        }
        O() {
            return !!(2 & (0 | this.u[F]))
        }
    }
    ;
    function To(t) {
        return t ? /^\d+$/.test(t) ? (gs(t),
        new tr(j,_)) : null : ad || (ad = new tr(0,0))
    }
    C.prototype.W = Ii,
    C.prototype.toString = function() {
        return this.u.toString()
    }
    ;
    var tr = class {
        constructor(t, e) {
            this.h = t >>> 0,
            this.g = e >>> 0
        }
    }
    ;
    let ad;
    function Lo(t) {
        return t ? /^-?\d+$/.test(t) ? (gs(t),
        new ir(j,_)) : null : od || (od = new ir(0,0))
    }
    var ir = class {
        constructor(t, e) {
            this.h = t >>> 0,
            this.g = e >>> 0
        }
    }
    ;
    let od;
    function di(t, e, i) {
        for (; i > 0 || e > 127; )
            t.g.push(127 & e | 128),
            e = (e >>> 7 | i << 25) >>> 0,
            i >>>= 7;
        t.g.push(e)
    }
    function ui(t, e) {
        for (; e > 127; )
            t.g.push(127 & e | 128),
            e >>>= 7;
        t.g.push(e)
    }
    function Ms(t, e) {
        if (e >= 0)
            ui(t, e);
        else {
            for (let i = 0; i < 9; i++)
                t.g.push(127 & e | 128),
                e >>= 7;
            t.g.push(1)
        }
    }
    function Xi(t, e) {
        t.g.push(e >>> 0 & 255),
        t.g.push(e >>> 8 & 255),
        t.g.push(e >>> 16 & 255),
        t.g.push(e >>> 24 & 255)
    }
    function fi(t, e) {
        e.length !== 0 && (t.l.push(e),
        t.h += e.length)
    }
    function Me(t, e, i) {
        ui(t.g, 8 * e + i)
    }
    function sr(t, e) {
        return Me(t, e, 2),
        e = t.g.end(),
        fi(t, e),
        e.push(t.h),
        e
    }
    function nr(t, e) {
        var i = e.pop();
        for (i = t.h + t.g.length() - i; i > 127; )
            e.push(127 & i | 128),
            i >>>= 7,
            t.h++;
        e.push(i),
        t.h++
    }
    function Ts(t, e, i) {
        Me(t, e, 2),
        ui(t.g, i.length),
        fi(t, t.g.end()),
        fi(t, i)
    }
    function Ls(t, e, i, s) {
        i != null && (e = sr(t, e),
        s(i, t),
        nr(t, e))
    }
    function Ye() {
        const t = class {
            constructor() {
                throw Error()
            }
        }
        ;
        return Object.setPrototypeOf(t, t.prototype),
        t
    }
    var rr = Ye()
      , Ao = Ye()
      , ar = Ye()
      , or = Ye()
      , Ro = Ye()
      , Do = Ye()
      , lr = Ye()
      , Oo = Ye()
      , Ho = Ye()
      , pi = class {
        constructor(t, e, i) {
            this.g = t,
            this.h = e,
            t = rr,
            this.l = !!t && i === t || !1
        }
    }
    ;
    function As(t, e) {
        return new pi(t,e,rr)
    }
    function Vo(t, e, i, s, n) {
        Ls(t, i, jo(e, s), n)
    }
    const ld = As(function(t, e, i, s, n) {
        return t.h === 2 && (Ni(t, qn(e, s, i), n),
        !0)
    }, Vo)
      , hd = As(function(t, e, i, s, n) {
        return t.h === 2 && (Ni(t, qn(e, s, i), n),
        !0)
    }, Vo);
    var Rs = Symbol()
      , hr = Symbol()
      , Io = Symbol()
      , zo = Symbol();
    let Bo, Wo;
    function Gt(t, e, i, s) {
        var n = s[t];
        if (n)
            return n;
        (n = {}).Ma = s,
        n.T = function(u) {
            switch (typeof u) {
            case "boolean":
                return fo || (fo = [0, void 0, !0]);
            case "number":
                return u > 0 ? void 0 : u === 0 ? sd || (sd = [0, void 0]) : [-u, void 0];
            case "string":
                return [0, u];
            case "object":
                return u
            }
        }(s[0]);
        var r = s[1];
        let a = 1;
        r && r.constructor === Object && (n.ga = r,
        typeof (r = s[++a]) == "function" && (n.la = !0,
        Bo ?? (Bo = r),
        Wo ?? (Wo = s[a + 1]),
        r = s[a += 2]));
        const o = {};
        for (; r && Array.isArray(r) && r.length && typeof r[0] == "number" && r[0] > 0; ) {
            for (var h = 0; h < r.length; h++)
                o[r[h]] = r;
            r = s[++a]
        }
        for (h = 1; r !== void 0; ) {
            let u;
            typeof r == "number" && (h += r,
            r = s[++a]);
            var c = void 0;
            if (r instanceof pi ? u = r : (u = ld,
            a--),
            u == null ? void 0 : u.l) {
                r = s[++a],
                c = s;
                var d = a;
                typeof r == "function" && (r = r(),
                c[d] = r),
                c = r
            }
            for (d = h + 1,
            typeof (r = s[++a]) == "number" && r < 0 && (d -= r,
            r = s[++a]); h < d; h++) {
                const f = o[h];
                c ? i(n, h, u, c, f) : e(n, h, u, f)
            }
        }
        return s[t] = n
    }
    function Uo(t) {
        return Array.isArray(t) ? t[0]instanceof pi ? t : [hd, t] : [t, void 0]
    }
    function jo(t, e) {
        return t instanceof C ? t.u : Array.isArray(t) ? Rt(t, e, !1) : void 0
    }
    function cr(t, e, i, s) {
        const n = i.g;
        t[e] = s ? (r, a, o) => n(r, a, o, s) : n
    }
    function dr(t, e, i, s, n) {
        const r = i.g;
        let a, o;
        t[e] = (h, c, d) => r(h, c, d, o || (o = Gt(hr, cr, dr, s).T), a || (a = ur(s)), n)
    }
    function ur(t) {
        let e = t[Io];
        if (e != null)
            return e;
        const i = Gt(hr, cr, dr, t);
        return e = i.la ? (s, n) => Bo(s, n, i) : (s, n) => {
            const r = 0 | s[F];
            for (; Eo(n) && n.h != 4; ) {
                var a = n.m
                  , o = i[a];
                if (o == null) {
                    var h = i.ga;
                    h && (h = h[a]) && (h = cd(h)) != null && (o = i[a] = h)
                }
                o != null && o(n, s, a) || (a = (o = n).l,
                Fs(o),
                o.fa ? o = void 0 : (h = o.g.g - a,
                o.g.g = a,
                o = Fo(o.g, h)),
                a = s,
                o && ((h = a[si]) ? h.push(o) : a[si] = [o]))
            }
            return 8192 & r && ni(s),
            !0
        }
        ,
        t[Io] = e
    }
    function cd(t) {
        const e = (t = Uo(t))[0].g;
        if (t = t[1]) {
            const i = ur(t)
              , s = Gt(hr, cr, dr, t).T;
            return (n, r, a) => e(n, r, a, s, i)
        }
        return e
    }
    function Ds(t, e, i) {
        t[e] = i.h
    }
    function Os(t, e, i, s) {
        let n, r;
        const a = i.h;
        t[e] = (o, h, c) => a(o, h, c, r || (r = Gt(Rs, Ds, Os, s).T), n || (n = No(s)))
    }
    function No(t) {
        let e = t[zo];
        if (!e) {
            const i = Gt(Rs, Ds, Os, t);
            e = (s, n) => Xo(s, n, i),
            t[zo] = e
        }
        return e
    }
    function Xo(t, e, i) {
        (function(s, n, r) {
            const a = 512 & n ? 0 : -1
              , o = s.length
              , h = o + ((n = 64 & n ? 256 & n : !!o && fs(s[o - 1])) ? -1 : 0);
            for (let c = 0; c < h; c++)
                r(c - a, s[c]);
            if (n) {
                s = s[o - 1];
                for (const c in s)
                    !isNaN(c) && r(+c, s[c])
            }
        }
        )(t, 0 | t[F] | (i.T[1] ? 512 : 0), (s, n) => {
            if (n != null) {
                var r = function(a, o) {
                    var h = a[o];
                    if (h)
                        return h;
                    if ((h = a.ga) && (h = h[o])) {
                        var c = (h = Uo(h))[0].h;
                        if (h = h[1]) {
                            const d = No(h)
                              , u = Gt(Rs, Ds, Os, h).T;
                            h = a.la ? Wo(u, d) : (f, g, y) => c(f, g, y, u, d)
                        } else
                            h = c;
                        return a[o] = h
                    }
                }(i, s);
                r && r(e, n, s)
            }
        }
        ),
        (t = Pn(t)) && function(s, n) {
            fi(s, s.g.end());
            for (let r = 0; r < n.length; r++)
                fi(s, bn(n[r]) || new Uint8Array(0))
        }(e, t)
    }
    function mi(t, e) {
        if (Array.isArray(e)) {
            var i = 0 | e[F];
            if (4 & i)
                return e;
            for (var s = 0, n = 0; s < e.length; s++) {
                const r = t(e[s]);
                r != null && (e[n++] = r)
            }
            return n < s && (e.length = n),
            ne(e, -6145 & (5 | i)),
            2 & i && Object.freeze(e),
            e
        }
    }
    function ve(t, e, i) {
        return new pi(t,e,i)
    }
    function gi(t, e, i) {
        return new pi(t,e,i)
    }
    function ye(t, e, i) {
        J(t, 0 | t[F], e, i)
    }
    var dd = As(function(t, e, i, s, n) {
        return t.h === 2 && (t = Ni(t, Rt([void 0, void 0], s, !0), n),
        Mt(s = 0 | e[F]),
        (n = ft(e, s, i))instanceof _e ? (2 & n.M) != 0 ? ((n = n.da()).push(t),
        J(e, s, i, n)) : n.Ja(t) : Array.isArray(n) ? (2 & (0 | n[F]) && J(e, s, i, n = yo(n)),
        n.push(t)) : J(e, s, i, [t]),
        !0)
    }, function(t, e, i, s, n) {
        if (e instanceof _e)
            e.forEach( (r, a) => {
                Ls(t, i, Rt([a, r], s, !1), n)
            }
            );
        else if (Array.isArray(e))
            for (let r = 0; r < e.length; r++) {
                const a = e[r];
                Array.isArray(a) && Ls(t, i, Rt(a, s, !1), n)
            }
    });
    function Zo(t, e, i) {
        if (e = function(s) {
            if (s == null)
                return s;
            const n = typeof s;
            if (n === "bigint")
                return String(Bi(64, s));
            if (Wi(s)) {
                if (n === "string")
                    return ao(s);
                if (n === "number")
                    return Rn(s)
            }
        }(e),
        e != null && (typeof e == "string" && Lo(e),
        e != null))
            switch (Me(t, i, 0),
            typeof e) {
            case "number":
                t = t.g,
                Nt(e),
                di(t, j, _);
                break;
            case "bigint":
                i = BigInt.asUintN(64, e),
                i = new ir(Number(i & BigInt(4294967295)),Number(i >> BigInt(32))),
                di(t.g, i.h, i.g);
                break;
            default:
                i = Lo(e),
                di(t.g, i.h, i.g)
            }
    }
    function qo(t, e, i) {
        (e = ai(e)) != null && e != null && (Me(t, i, 0),
        Ms(t.g, e))
    }
    function Go(t, e, i) {
        (e = to(e)) != null && (Me(t, i, 0),
        t.g.g.push(e ? 1 : 0))
    }
    function Yo(t, e, i) {
        (e = li(e)) != null && Ts(t, i, La(e))
    }
    function Ko(t, e, i, s, n) {
        Ls(t, i, jo(e, s), n)
    }
    function Jo(t, e, i) {
        e == null || typeof e == "string" || e instanceof ut || (Ut(e) ? Ut(e) && Cn(Xa) : e = void 0),
        e != null && Ts(t, i, Yn(e).buffer)
    }
    function _o(t, e, i) {
        return (t.h === 5 || t.h === 2) && (e = ci(e, 0 | e[F], i, !1),
        t.h == 2 ? Ps(t, Qn, e) : e.push(Qn(t.g)),
        !0)
    }
    var yt = ve(function(t, e, i) {
        if (t.h !== 1)
            return !1;
        var s = t.g;
        t = _n(s);
        const n = _n(s);
        s = 2 * (n >> 31) + 1;
        const r = n >>> 20 & 2047;
        return t = 4294967296 * (1048575 & n) + t,
        ye(e, i, r == 2047 ? t ? NaN : s * (1 / 0) : r == 0 ? 5e-324 * s * t : s * Math.pow(2, r - 1075) * (t + 4503599627370496)),
        !0
    }, function(t, e, i) {
        (e = At(e)) != null && (Me(t, i, 1),
        t = t.g,
        (i = _a || (_a = new DataView(new ArrayBuffer(8)))).setFloat64(0, +e, !0),
        j = i.getUint32(0, !0),
        _ = i.getUint32(4, !0),
        Xi(t, j),
        Xi(t, _))
    }, Ye())
      , re = ve(function(t, e, i) {
        return t.h === 5 && (ye(e, i, Qn(t.g)),
        !0)
    }, function(t, e, i) {
        (e = At(e)) != null && (Me(t, i, 5),
        t = t.g,
        Mn(e),
        Xi(t, j))
    }, lr)
      , ud = gi(_o, function(t, e, i) {
        if ((e = mi(At, e)) != null)
            for (let a = 0; a < e.length; a++) {
                var s = t
                  , n = i
                  , r = e[a];
                r != null && (Me(s, n, 5),
                s = s.g,
                Mn(r),
                Xi(s, j))
            }
    }, lr)
      , fr = gi(_o, function(t, e, i) {
        if ((e = mi(At, e)) != null && e.length) {
            Me(t, i, 2),
            ui(t.g, 4 * e.length);
            for (let s = 0; s < e.length; s++)
                i = t.g,
                Mn(e[s]),
                Xi(i, j)
        }
    }, lr)
      , Ht = ve(function(t, e, i) {
        return t.h === 0 && (ye(e, i, Kn(t.g, Ln)),
        !0)
    }, Zo, Do)
      , pr = ve(function(t, e, i) {
        return t.h === 0 && (ye(e, i, (t = Kn(t.g, Ln)) === 0 ? void 0 : t),
        !0)
    }, Zo, Do)
      , fd = ve(function(t, e, i) {
        return t.h === 0 && (ye(e, i, Kn(t.g, Tn)),
        !0)
    }, function(t, e, i) {
        if ((e = Gc(e)) != null && (typeof e == "string" && To(e),
        e != null))
            switch (Me(t, i, 0),
            typeof e) {
            case "number":
                t = t.g,
                Nt(e),
                di(t, j, _);
                break;
            case "bigint":
                i = BigInt.asUintN(64, e),
                i = new tr(Number(i & BigInt(4294967295)),Number(i >> BigInt(32))),
                di(t.g, i.h, i.g);
                break;
            default:
                i = To(e),
                di(t.g, i.h, i.g)
            }
    }, Ye())
      , Q = ve(function(t, e, i) {
        return t.h === 0 && (ye(e, i, Ot(t.g)),
        !0)
    }, qo, or)
      , Hs = gi(function(t, e, i) {
        return (t.h === 0 || t.h === 2) && (e = ci(e, 0 | e[F], i, !1),
        t.h == 2 ? Ps(t, Ot, e) : e.push(Ot(t.g)),
        !0)
    }, function(t, e, i) {
        if ((e = mi(ai, e)) != null && e.length) {
            i = sr(t, i);
            for (let s = 0; s < e.length; s++)
                Ms(t.g, e[s]);
            nr(t, i)
        }
    }, or)
      , vi = ve(function(t, e, i) {
        return t.h === 0 && (ye(e, i, (t = Ot(t.g)) === 0 ? void 0 : t),
        !0)
    }, qo, or)
      , q = ve(function(t, e, i) {
        return t.h === 0 && (ye(e, i, Jn(t.g)),
        !0)
    }, Go, Ao)
      , yi = ve(function(t, e, i) {
        return t.h === 0 && (ye(e, i, (t = Jn(t.g)) === !1 ? void 0 : t),
        !0)
    }, Go, Ao)
      , me = gi(function(t, e, i) {
        return t.h === 2 && (t = er(t),
        ci(e, 0 | e[F], i, !1).push(t),
        !0)
    }, function(t, e, i) {
        if ((e = mi(li, e)) != null)
            for (let a = 0; a < e.length; a++) {
                var s = t
                  , n = i
                  , r = e[a];
                r != null && Ts(s, n, La(r))
            }
    }, ar)
      , Vt = ve(function(t, e, i) {
        return t.h === 2 && (ye(e, i, (t = er(t)) === "" ? void 0 : t),
        !0)
    }, Yo, ar)
      , W = ve(function(t, e, i) {
        return t.h === 2 && (ye(e, i, er(t)),
        !0)
    }, Yo, ar)
      , he = function(t, e, i=rr) {
        return new pi(t,e,i)
    }(function(t, e, i, s, n) {
        return t.h === 2 && (s = Rt(void 0, s, !0),
        ci(e, 0 | e[F], i, !0).push(s),
        Ni(t, s, n),
        !0)
    }, function(t, e, i, s, n) {
        if (Array.isArray(e))
            for (let r = 0; r < e.length; r++)
                Ko(t, e[r], i, s, n)
    })
      , U = As(function(t, e, i, s, n, r) {
        return t.h === 2 && (wo(e, 0 | e[F], r, i),
        Ni(t, e = qn(e, s, i), n),
        !0)
    }, Ko)
      , Qo = ve(function(t, e, i) {
        return t.h === 2 && (ye(e, i, Mo(t)),
        !0)
    }, Jo, Oo)
      , pd = gi(function(t, e, i) {
        return (t.h === 0 || t.h === 2) && (e = ci(e, 0 | e[F], i, !1),
        t.h == 2 ? Ps(t, vt, e) : e.push(vt(t.g)),
        !0)
    }, function(t, e, i) {
        if ((e = mi(io, e)) != null)
            for (let a = 0; a < e.length; a++) {
                var s = t
                  , n = i
                  , r = e[a];
                r != null && (Me(s, n, 0),
                ui(s.g, r))
            }
    }, Ro)
      , md = ve(function(t, e, i) {
        return t.h === 0 && (ye(e, i, (t = vt(t.g)) === 0 ? void 0 : t),
        !0)
    }, function(t, e, i) {
        (e = io(e)) != null && e != null && (Me(t, i, 0),
        ui(t.g, e))
    }, Ro)
      , Te = ve(function(t, e, i) {
        return t.h === 0 && (ye(e, i, Ot(t.g)),
        !0)
    }, function(t, e, i) {
        (e = ai(e)) != null && (e = parseInt(e, 10),
        Me(t, i, 0),
        Ms(t.g, e))
    }, Ho);
    class gd {
        constructor(e, i) {
            this.h = e,
            this.g = i,
            this.l = I,
            this.m = E,
            this.defaultValue = void 0
        }
        register() {
            hs(this)
        }
    }
    function Ke(t, e) {
        return new gd(t,e)
    }
    function It(t, e) {
        return (i, s) => {
            if (Es.length) {
                const r = Es.pop();
                r.o(s),
                $n(r.g, i, s),
                i = r
            } else
                i = new class {
                    constructor(r, a) {
                        if (Po.length) {
                            const o = Po.pop();
                            $n(o, r, a),
                            r = o
                        } else
                            r = new class {
                                constructor(o, h) {
                                    this.h = null,
                                    this.m = !1,
                                    this.g = this.l = this.j = 0,
                                    $n(this, o, h)
                                }
                                clear() {
                                    this.h = null,
                                    this.m = !1,
                                    this.g = this.l = this.j = 0,
                                    this.aa = !1
                                }
                            }
                            (r,a);
                        this.g = r,
                        this.l = this.g.g,
                        this.h = this.m = -1,
                        this.o(a)
                    }
                    o({fa: r=!1}={}) {
                        this.fa = r
                    }
                }
                (i,s);
            try {
                const r = new t
                  , a = r.u;
                ur(e)(a, i);
                var n = r
            } finally {
                i.g.clear(),
                i.m = -1,
                i.h = -1,
                Es.length < 100 && Es.push(i)
            }
            return n
        }
    }
    function Vs(t) {
        return function() {
            const e = new class {
                constructor() {
                    this.l = [],
                    this.h = 0,
                    this.g = new class {
                        constructor() {
                            this.g = []
                        }
                        length() {
                            return this.g.length
                        }
                        end() {
                            const a = this.g;
                            return this.g = [],
                            a
                        }
                    }
                }
            }
            ;
            Xo(this.u, e, Gt(Rs, Ds, Os, t)),
            fi(e, e.g.end());
            const i = new Uint8Array(e.h)
              , s = e.l
              , n = s.length;
            let r = 0;
            for (let a = 0; a < n; a++) {
                const o = s[a];
                i.set(o, r),
                r += o.length
            }
            return e.l = [i],
            i
        }
    }
    var $o = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , el = [0, Vt, ve(function(t, e, i) {
        return t.h === 2 && (ye(e, i, (t = Mo(t)) === jt() ? void 0 : t),
        !0)
    }, function(t, e, i) {
        if (e != null) {
            if (e instanceof C) {
                const s = e.Oa;
                return void (s && (e = s(e),
                e != null && Ts(t, i, Yn(e).buffer)))
            }
            if (Array.isArray(e))
                return
        }
        Jo(t, e, i)
    }, Oo)]
      , tl = [0, Q, Te, q, -1, Hs, Te, -1]
      , vd = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , il = [0, q, W, q, Te, -1, gi(function(t, e, i) {
        return (t.h === 0 || t.h === 2) && (e = ci(e, 0 | e[F], i, !1),
        t.h == 2 ? Ps(t, rd, e) : e.push(Ot(t.g)),
        !0)
    }, function(t, e, i) {
        if ((e = mi(ai, e)) != null && e.length) {
            i = sr(t, i);
            for (let s = 0; s < e.length; s++)
                Ms(t.g, e[s]);
            nr(t, i)
        }
    }, Ho), W, -1, [0, q, -1], Te, q, -1]
      , sl = [0, W, -2]
      , nl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , rl = [0]
      , al = [0, Q, q, 1, q, -3]
      , Le = class extends C {
        constructor(t) {
            super(t, 2)
        }
    }
      , ae = {};
    ae[336783863] = [0, W, q, -1, Q, [0, [1, 2, 3, 4, 5, 6, 7, 8, 9], U, rl, U, il, U, sl, U, al, U, tl, U, [0, W, -2], U, [0, W, Te], U, [0, Te, W, -1], U, [0, Te, -1]], [0, W], q, [0, [1, 3], [2, 4], U, [0, Hs], -1, U, [0, me], -1, he, [0, W, -1]], W];
    var ol = [0, pr, -1, yi, -3, pr, Hs, Vt, vi, pr, -1, yi, vi, yi, -2, Vt];
    function Ae(t, e) {
        jn(t, 2, oi(e), "")
    }
    function X(t, e) {
        Cs(t, 3, e)
    }
    function H(t, e) {
        Cs(t, 4, e)
    }
    var we = class extends C {
        constructor(t) {
            super(t, 500)
        }
        o(t) {
            return E(this, 0, 7, t)
        }
    }
      , Zi = [-1, {}]
      , ll = [0, W, 1, Zi]
      , hl = [0, W, me, Zi];
    function Re(t, e) {
        Ss(t, 1, we, e)
    }
    function Z(t, e) {
        Cs(t, 10, e)
    }
    function B(t, e) {
        Cs(t, 15, e)
    }
    var Se = class extends C {
        constructor(t) {
            super(t, 500)
        }
        o(t) {
            return E(this, 0, 1001, t)
        }
    }
      , cl = [-500, he, [-500, Vt, -1, me, -3, [-2, ae, q], he, el, vi, -1, ll, hl, he, [0, Vt, yi], Vt, ol, vi, me, 987, me], 4, he, [-500, W, -1, [-1, {}], 998, W], he, [-500, W, me, -1, [-2, {}, q], 997, me, -1], vi, he, [-500, W, me, Zi, 998, me], me, vi, ll, hl, he, [0, Vt, -1, Zi], me, -2, ol, Vt, -1, yi, [0, yi, md], 978, Zi, he, el];
    Se.prototype.g = Vs(cl);
    var yd = It(Se, cl)
      , wd = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , dl = class extends C {
        constructor(t) {
            super(t)
        }
        g() {
            return mt(this, wd, 1)
        }
    }
      , ul = [0, he, [0, Q, re, W, -1]]
      , Is = It(dl, ul)
      , bd = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , xd = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , mr = class extends C {
        constructor(t) {
            super(t)
        }
        h() {
            return I(this, bd, 2)
        }
        g() {
            return mt(this, xd, 5)
        }
    }
      , fl = It(class extends C {
        constructor(t) {
            super(t)
        }
    }
    , [0, me, Hs, fr, [0, Te, [0, Q, -3], [0, re, -3], [0, Q, -1, [0, he, [0, Q, -2]]], he, [0, re, -1, W, re]], W, -1, Ht, he, [0, Q, re], me, Ht])
      , pl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , wi = It(class extends C {
        constructor(t) {
            super(t)
        }
    }
    , [0, he, [0, re, -4]])
      , ml = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , qi = It(class extends C {
        constructor(t) {
            super(t)
        }
    }
    , [0, he, [0, re, -4]])
      , Cd = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Sd = [0, Q, -1, fr, Te]
      , gl = class extends C {
        constructor(t) {
            super(t)
        }
    }
    ;
    gl.prototype.g = Vs([0, re, -4, Ht]);
    var kd = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Fd = It(class extends C {
        constructor(t) {
            super(t)
        }
    }
    , [0, he, [0, 1, Q, W, ul], Ht])
      , vl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Pd = class extends C {
        constructor(t) {
            super(t)
        }
        ma() {
            const t = vo(this);
            return t ?? jt()
        }
    }
      , Ed = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , yl = [1, 2]
      , Md = It(class extends C {
        constructor(t) {
            super(t)
        }
    }
    , [0, he, [0, yl, U, [0, fr], U, [0, Qo], Q, W], Ht])
      , gr = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , wl = [0, W, Q, re, me, -1]
      , bl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Td = [0, q, -1]
      , xl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , zs = [1, 2, 3, 4, 5]
      , Bs = class extends C {
        constructor(t) {
            super(t)
        }
        g() {
            return vo(this) != null
        }
        h() {
            return We(this, 2) != null
        }
    }
      , G = class extends C {
        constructor(t) {
            super(t)
        }
        g() {
            return to(hi(this, 2)) ?? !1
        }
    }
      , Cl = [0, Qo, W, [0, Q, Ht, -1], [0, fd, Ht]]
      , ie = [0, Cl, q, [0, zs, U, al, U, il, U, tl, U, rl, U, sl], Te]
      , Ws = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , vr = [0, ie, re, -1, Q]
      , Ld = Ke(502141897, Ws);
    ae[502141897] = vr;
    var Ad = It(class extends C {
        constructor(t) {
            super(t)
        }
    }
    , [0, [0, Te, -1, ud, pd], Sd])
      , Sl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , kl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , yr = [0, ie, re, [0, ie], q]
      , Fl = [0, ie, vr, yr, re, [0, [0, Cl]]]
      , Rd = Ke(508968150, kl);
    ae[508968150] = Fl,
    ae[508968149] = yr;
    var Pl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Dd = Ke(513916220, Pl);
    ae[513916220] = [0, ie, Fl, Q];
    var bi = class extends C {
        constructor(t) {
            super(t)
        }
        h() {
            return I(this, gr, 2)
        }
        g() {
            N(this, 2)
        }
    }
      , El = [0, ie, wl];
    ae[478825465] = El;
    var Od = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Ml = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , wr = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , br = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Tl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Ll = [0, ie, [0, ie], El, -1]
      , Al = [0, ie, re, Q]
      , xr = [0, ie, re]
      , Rl = [0, ie, Al, xr, re]
      , Hd = Ke(479097054, Tl);
    ae[479097054] = [0, ie, Rl, Ll],
    ae[463370452] = Ll,
    ae[464864288] = Al;
    var Vd = Ke(462713202, br);
    ae[462713202] = Rl,
    ae[474472470] = xr;
    var Id = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Dl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Ol = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Hl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Cr = [0, ie, re, -1, Q]
      , Sr = [0, ie, re, q];
    Hl.prototype.g = Vs([0, ie, xr, [0, ie], vr, yr, Cr, Sr]);
    var Vl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , zd = Ke(456383383, Vl);
    ae[456383383] = [0, ie, wl];
    var Il = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Bd = Ke(476348187, Il);
    ae[476348187] = [0, ie, Td];
    var zl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Bl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Wl = [0, Te, -1]
      , Wd = Ke(458105876, class extends C {
        constructor(t) {
            super(t)
        }
        g() {
            var t = this.u;
            const e = 0 | t[F]
              , i = 2 & e;
            return t = function(s, n, r) {
                var a = Bl;
                const o = 2 & n;
                let h = !1;
                if (r == null) {
                    if (o)
                        return po();
                    r = []
                } else if (r.constructor === _e) {
                    if ((2 & r.M) == 0 || o)
                        return r;
                    r = r.da()
                } else
                    Array.isArray(r) ? h = !!(2 & (0 | r[F])) : r = [];
                if (o) {
                    if (!r.length)
                        return po();
                    h || (h = !0,
                    ni(r))
                } else
                    h && (h = !1,
                    r = yo(r));
                return h || (64 & (0 | r[F]) ? r[F] &= -33 : 32 & n && ds(r, 32)),
                J(s, n, 2, a = new _e(r,a,Yc,void 0)),
                a
            }(t, e, ft(t, e, 2)),
            !i && Bl && (t.pa = !0),
            t
        }
    }
    );
    ae[458105876] = [0, Wl, dd, [!0, Ht, [0, W, -1, me]]];
    var kr = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Ul = Ke(458105758, kr);
    ae[458105758] = [0, ie, W, Wl];
    var jl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Ud = Ke(443442058, jl);
    ae[443442058] = [0, ie, W, Q, re, me, -1, q, re],
    ae[514774813] = Cr;
    var Nl = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , jd = Ke(516587230, Nl);
    function Fr(t, e) {
        return e = e ? e.clone() : new gr,
        t.displayNamesLocale !== void 0 ? N(e, 1, oi(t.displayNamesLocale)) : t.displayNamesLocale === void 0 && N(e, 1),
        t.maxResults !== void 0 ? Qe(e, 2, t.maxResults) : "maxResults"in t && N(e, 2),
        t.scoreThreshold !== void 0 ? S(e, 3, t.scoreThreshold) : "scoreThreshold"in t && N(e, 3),
        t.categoryAllowlist !== void 0 ? ks(e, 4, t.categoryAllowlist) : "categoryAllowlist"in t && N(e, 4),
        t.categoryDenylist !== void 0 ? ks(e, 5, t.categoryDenylist) : "categoryDenylist"in t && N(e, 5),
        e
    }
    function Pr(t, e=-1, i="") {
        return {
            categories: t.map(s => ({
                index: Be(s, 1) ?? 0 ?? -1,
                score: te(s, 2) ?? 0,
                categoryName: We(s, 3) ?? "" ?? "",
                displayName: We(s, 4) ?? "" ?? ""
            })),
            headIndex: e,
            headName: i
        }
    }
    function Xl(t) {
        var a, o;
        var e = Zt(t, 3, At, Xt())
          , i = Zt(t, 2, ai, Xt())
          , s = Zt(t, 1, li, Xt())
          , n = Zt(t, 9, li, Xt());
        const r = {
            categories: [],
            keypoints: []
        };
        for (let h = 0; h < e.length; h++)
            r.categories.push({
                score: e[h],
                index: i[h] ?? -1,
                categoryName: s[h] ?? "",
                displayName: n[h] ?? ""
            });
        if ((e = (a = I(t, mr, 4)) == null ? void 0 : a.h()) && (r.boundingBox = {
            originX: Be(e, 1) ?? 0,
            originY: Be(e, 2) ?? 0,
            width: Be(e, 3) ?? 0,
            height: Be(e, 4) ?? 0,
            angle: 0
        }),
        (o = I(t, mr, 4)) == null ? void 0 : o.g().length)
            for (const h of I(t, mr, 4).g())
                r.keypoints.push({
                    x: xs(h, 1) ?? 0,
                    y: xs(h, 2) ?? 0,
                    score: xs(h, 4) ?? 0,
                    label: We(h, 3) ?? ""
                });
        return r
    }
    function Us(t) {
        const e = [];
        for (const i of mt(t, ml, 1))
            e.push({
                x: te(i, 1) ?? 0,
                y: te(i, 2) ?? 0,
                z: te(i, 3) ?? 0,
                visibility: te(i, 4) ?? 0
            });
        return e
    }
    function Gi(t) {
        const e = [];
        for (const i of mt(t, pl, 1))
            e.push({
                x: te(i, 1) ?? 0,
                y: te(i, 2) ?? 0,
                z: te(i, 3) ?? 0,
                visibility: te(i, 4) ?? 0
            });
        return e
    }
    function Zl(t) {
        return Array.from(t, e => e > 127 ? e - 256 : e)
    }
    function ql(t, e) {
        if (t.length !== e.length)
            throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t.length} vs. ${e.length}).`);
        let i = 0
          , s = 0
          , n = 0;
        for (let r = 0; r < t.length; r++)
            i += t[r] * e[r],
            s += t[r] * t[r],
            n += e[r] * e[r];
        if (s <= 0 || n <= 0)
            throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
        return i / Math.sqrt(s * n)
    }
    ae[516587230] = [0, ie, Cr, Sr, re],
    ae[518928384] = Sr;
    function Gl() {
        var t = navigator;
        return typeof OffscreenCanvas < "u" && (!function(e=navigator) {
            return (e = e.userAgent).includes("Safari") && !e.includes("Chrome")
        }(t) || !!((t = t.userAgent.match(/Version\/([\d]+).*Safari/)) && t.length >= 1 && Number(t[1]) >= 17))
    }
    async function Yl(t) {
        if (typeof importScripts != "function") {
            const e = document.createElement("script");
            return e.src = t.toString(),
            e.crossOrigin = "anonymous",
            new Promise( (i, s) => {
                e.addEventListener("load", () => {
                    i()
                }
                , !1),
                e.addEventListener("error", n => {
                    s(n)
                }
                , !1),
                document.body.appendChild(e)
            }
            )
        }
        importScripts(t.toString())
    }
    function Kl(t) {
        return t.videoWidth !== void 0 ? [t.videoWidth, t.videoHeight] : t.naturalWidth !== void 0 ? [t.naturalWidth, t.naturalHeight] : t.displayWidth !== void 0 ? [t.displayWidth, t.displayHeight] : [t.width, t.height]
    }
    function P(t, e, i) {
        t.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),
        i(e = t.i.stringToNewUTF8(e)),
        t.i._free(e)
    }
    function Jl(t, e, i) {
        if (!t.i.canvas)
            throw Error("No OpenGL canvas configured.");
        if (i ? t.i._bindTextureToStream(i) : t.i._bindTextureToCanvas(),
        !(i = t.i.canvas.getContext("webgl2") || t.i.canvas.getContext("webgl")))
            throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
        t.i.gpuOriginForWebTexturesIsBottomLeft && i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, !0),
        i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, e),
        t.i.gpuOriginForWebTexturesIsBottomLeft && i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, !1);
        const [s,n] = Kl(e);
        return !t.l || s === t.i.canvas.width && n === t.i.canvas.height || (t.i.canvas.width = s,
        t.i.canvas.height = n),
        [s, n]
    }
    function _l(t, e, i) {
        t.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
        const s = new Uint32Array(e.length);
        for (let n = 0; n < e.length; n++)
            s[n] = t.i.stringToNewUTF8(e[n]);
        e = t.i._malloc(4 * s.length),
        t.i.HEAPU32.set(s, e >> 2),
        i(e);
        for (const n of s)
            t.i._free(n);
        t.i._free(e)
    }
    function $e(t, e, i) {
        t.i.simpleListeners = t.i.simpleListeners || {},
        t.i.simpleListeners[e] = i
    }
    function zt(t, e, i) {
        let s = [];
        t.i.simpleListeners = t.i.simpleListeners || {},
        t.i.simpleListeners[e] = (n, r, a) => {
            r ? (i(s, a),
            s = []) : s.push(n)
        }
    }
    async function Nd(t, e, i, s) {
        return t = await (async (n, r, a, o, h) => {
            if (r && await Yl(r),
            !self.ModuleFactory || a && (await Yl(a),
            !self.ModuleFactory))
                throw Error("ModuleFactory not set.");
            return self.Module && h && ((r = self.Module).locateFile = h.locateFile,
            h.mainScriptUrlOrBlob && (r.mainScriptUrlOrBlob = h.mainScriptUrlOrBlob)),
            h = await self.ModuleFactory(self.Module || h),
            self.ModuleFactory = self.Module = void 0,
            new n(h,o)
        }
        )(t, i.wasmLoaderPath, i.assetLoaderPath, e, {
            locateFile: n => n.endsWith(".wasm") ? i.wasmBinaryPath.toString() : i.assetBinaryPath && n.endsWith(".data") ? i.assetBinaryPath.toString() : n
        }),
        await t.o(s),
        t
    }
    function Er(t, e) {
        const i = I(t.baseOptions, Bs, 1) || new Bs;
        typeof e == "string" ? (N(i, 2, oi(e)),
        N(i, 1)) : e instanceof Uint8Array && (N(i, 1, Fn(e, !1)),
        N(i, 2)),
        E(t.baseOptions, 0, 1, i)
    }
    function Ql(t) {
        try {
            const e = t.G.length;
            if (e === 1)
                throw Error(t.G[0].message);
            if (e > 1)
                throw Error("Encountered multiple errors: " + t.G.map(i => i.message).join(", "))
        } finally {
            t.G = []
        }
    }
    function x(t, e) {
        t.B = Math.max(t.B, e)
    }
    function js(t, e) {
        t.A = new we,
        Ae(t.A, "PassThroughCalculator"),
        X(t.A, "free_memory"),
        H(t.A, "free_memory_unused_out"),
        Z(e, "free_memory"),
        Re(e, t.A)
    }
    function xi(t, e) {
        X(t.A, e),
        H(t.A, e + "_unused_out")
    }
    function Ns(t) {
        t.g.addBoolToStream(!0, "free_memory", t.B)
    }
    var Mr = class {
        constructor(t) {
            this.g = t,
            this.G = [],
            this.B = 0,
            this.g.setAutoRenderToScreen(!1)
        }
        l(t, e=!0) {
            var i, s, n, r, a, o;
            if (e) {
                const h = t.baseOptions || {};
                if ((i = t.baseOptions) != null && i.modelAssetBuffer && ((s = t.baseOptions) != null && s.modelAssetPath))
                    throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
                if (!((n = I(this.baseOptions, Bs, 1)) != null && n.g() || (r = I(this.baseOptions, Bs, 1)) != null && r.h() || (a = t.baseOptions) != null && a.modelAssetBuffer || (o = t.baseOptions) != null && o.modelAssetPath))
                    throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
                if (function(c, d) {
                    let u = I(c.baseOptions, xl, 3);
                    if (!u) {
                        var f = u = new xl
                          , g = new nl;
                        Ui(f, 4, zs, g)
                    }
                    "delegate"in d && (d.delegate === "GPU" ? (d = u,
                    f = new vd,
                    Ui(d, 2, zs, f)) : (d = u,
                    f = new nl,
                    Ui(d, 4, zs, f))),
                    E(c.baseOptions, 0, 3, u)
                }(this, h),
                h.modelAssetPath)
                    return fetch(h.modelAssetPath.toString()).then(c => {
                        if (c.ok)
                            return c.arrayBuffer();
                        throw Error(`Failed to fetch model: ${h.modelAssetPath} (${c.status})`)
                    }
                    ).then(c => {
                        try {
                            this.g.i.FS_unlink("/model.dat")
                        } catch {}
                        this.g.i.FS_createDataFile("/", "model.dat", new Uint8Array(c), !0, !1, !1),
                        Er(this, "/model.dat"),
                        this.m(),
                        this.J()
                    }
                    );
                if (h.modelAssetBuffer instanceof Uint8Array)
                    Er(this, h.modelAssetBuffer);
                else if (h.modelAssetBuffer)
                    return async function(c) {
                        const d = [];
                        for (var u = 0; ; ) {
                            const {done: f, value: g} = await c.read();
                            if (f)
                                break;
                            d.push(g),
                            u += g.length
                        }
                        if (d.length === 0)
                            return new Uint8Array(0);
                        if (d.length === 1)
                            return d[0];
                        c = new Uint8Array(u),
                        u = 0;
                        for (const f of d)
                            c.set(f, u),
                            u += f.length;
                        return c
                    }(h.modelAssetBuffer).then(c => {
                        Er(this, c),
                        this.m(),
                        this.J()
                    }
                    )
            }
            return this.m(),
            this.J(),
            Promise.resolve()
        }
        J() {}
        ca() {
            let t;
            if (this.g.ca(e => {
                t = yd(e)
            }
            ),
            !t)
                throw Error("Failed to retrieve CalculatorGraphConfig");
            return t
        }
        setGraph(t, e) {
            this.g.attachErrorListener( (i, s) => {
                this.G.push(Error(s))
            }
            ),
            this.g.Ha(),
            this.g.setGraph(t, e),
            this.A = void 0,
            Ql(this)
        }
        finishProcessing() {
            this.g.finishProcessing(),
            Ql(this)
        }
        close() {
            this.A = void 0,
            this.g.closeGraph()
        }
    }
    ;
    function wt(t, e) {
        if (!t)
            throw Error(`Unable to obtain required WebGL resource: ${e}`);
        return t
    }
    Mr.prototype.close = Mr.prototype.close;
    class Xd {
        constructor(e, i, s, n) {
            this.g = e,
            this.h = i,
            this.m = s,
            this.l = n
        }
        bind() {
            this.g.bindVertexArray(this.h)
        }
        close() {
            this.g.deleteVertexArray(this.h),
            this.g.deleteBuffer(this.m),
            this.g.deleteBuffer(this.l)
        }
    }
    function $l(t, e, i) {
        const s = t.g;
        if (i = wt(s.createShader(i), "Failed to create WebGL shader"),
        s.shaderSource(i, e),
        s.compileShader(i),
        !s.getShaderParameter(i, s.COMPILE_STATUS))
            throw Error(`Could not compile WebGL shader: ${s.getShaderInfoLog(i)}`);
        return s.attachShader(t.h, i),
        i
    }
    function eh(t, e) {
        const i = t.g
          , s = wt(i.createVertexArray(), "Failed to create vertex array");
        i.bindVertexArray(s);
        const n = wt(i.createBuffer(), "Failed to create buffer");
        i.bindBuffer(i.ARRAY_BUFFER, n),
        i.enableVertexAttribArray(t.P),
        i.vertexAttribPointer(t.P, 2, i.FLOAT, !1, 0, 0),
        i.bufferData(i.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), i.STATIC_DRAW);
        const r = wt(i.createBuffer(), "Failed to create buffer");
        return i.bindBuffer(i.ARRAY_BUFFER, r),
        i.enableVertexAttribArray(t.J),
        i.vertexAttribPointer(t.J, 2, i.FLOAT, !1, 0, 0),
        i.bufferData(i.ARRAY_BUFFER, new Float32Array(e ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]), i.STATIC_DRAW),
        i.bindBuffer(i.ARRAY_BUFFER, null),
        i.bindVertexArray(null),
        new Xd(i,s,n,r)
    }
    function Tr(t, e) {
        if (t.g) {
            if (e !== t.g)
                throw Error("Cannot change GL context once initialized")
        } else
            t.g = e
    }
    function Lr(t, e, i, s) {
        return Tr(t, e),
        t.h || (t.m(),
        t.C()),
        i ? (t.s || (t.s = eh(t, !0)),
        i = t.s) : (t.v || (t.v = eh(t, !1)),
        i = t.v),
        e.useProgram(t.h),
        i.bind(),
        t.l(),
        t = s(),
        i.g.bindVertexArray(null),
        t
    }
    function Xs(t, e, i) {
        return Tr(t, e),
        t = wt(e.createTexture(), "Failed to create texture"),
        e.bindTexture(e.TEXTURE_2D, t),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, i ?? e.LINEAR),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, i ?? e.LINEAR),
        e.bindTexture(e.TEXTURE_2D, null),
        t
    }
    function Zs(t, e, i) {
        Tr(t, e),
        t.A || (t.A = wt(e.createFramebuffer(), "Failed to create framebuffe.")),
        e.bindFramebuffer(e.FRAMEBUFFER, t.A),
        e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, i, 0)
    }
    function Ar(t) {
        var e;
        (e = t.g) == null || e.bindFramebuffer(t.g.FRAMEBUFFER, null)
    }
    var Rr = class {
        G() {
            return `
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `
        }
        m() {
            const t = this.g;
            if (this.h = wt(t.createProgram(), "Failed to create WebGL program"),
            this.Z = $l(this, `
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`, t.VERTEX_SHADER),
            this.Y = $l(this, this.G(), t.FRAGMENT_SHADER),
            t.linkProgram(this.h),
            !t.getProgramParameter(this.h, t.LINK_STATUS))
                throw Error(`Error during program linking: ${t.getProgramInfoLog(this.h)}`);
            this.P = t.getAttribLocation(this.h, "aVertex"),
            this.J = t.getAttribLocation(this.h, "aTex")
        }
        C() {}
        l() {}
        close() {
            if (this.h) {
                const t = this.g;
                t.deleteProgram(this.h),
                t.deleteShader(this.Z),
                t.deleteShader(this.Y)
            }
            this.A && this.g.deleteFramebuffer(this.A),
            this.v && this.v.close(),
            this.s && this.s.close()
        }
    }
    ;
    function bt(t, e) {
        switch (e) {
        case 0:
            return t.g.find(i => i instanceof Uint8Array);
        case 1:
            return t.g.find(i => i instanceof Float32Array);
        case 2:
            return t.g.find(i => typeof WebGLTexture < "u" && i instanceof WebGLTexture);
        default:
            throw Error(`Type is not supported: ${e}`)
        }
    }
    function Dr(t) {
        var e = bt(t, 1);
        if (!e) {
            if (e = bt(t, 0))
                e = new Float32Array(e).map(s => s / 255);
            else {
                e = new Float32Array(t.width * t.height);
                const s = Ci(t);
                var i = Or(t);
                if (Zs(i, s, th(t)),
                "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "document"in self && "ontouchend"in self.document) {
                    i = new Float32Array(t.width * t.height * 4),
                    s.readPixels(0, 0, t.width, t.height, s.RGBA, s.FLOAT, i);
                    for (let n = 0, r = 0; n < e.length; ++n,
                    r += 4)
                        e[n] = i[r]
                } else
                    s.readPixels(0, 0, t.width, t.height, s.RED, s.FLOAT, e)
            }
            t.g.push(e)
        }
        return e
    }
    function th(t) {
        let e = bt(t, 2);
        if (!e) {
            const i = Ci(t);
            e = sh(t);
            const s = Dr(t)
              , n = ih(t);
            i.texImage2D(i.TEXTURE_2D, 0, n, t.width, t.height, 0, i.RED, i.FLOAT, s),
            Hr(t)
        }
        return e
    }
    function Ci(t) {
        if (!t.canvas)
            throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
        return t.h || (t.h = wt(t.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")),
        t.h
    }
    function ih(t) {
        if (t = Ci(t),
        !qs)
            if (t.getExtension("EXT_color_buffer_float") && t.getExtension("OES_texture_float_linear") && t.getExtension("EXT_float_blend"))
                qs = t.R32F;
            else {
                if (!t.getExtension("EXT_color_buffer_half_float"))
                    throw Error("GPU does not fully support 4-channel float32 or float16 formats");
                qs = t.R16F
            }
        return qs
    }
    function Or(t) {
        return t.l || (t.l = new Rr),
        t.l
    }
    function sh(t) {
        const e = Ci(t);
        e.viewport(0, 0, t.width, t.height),
        e.activeTexture(e.TEXTURE0);
        let i = bt(t, 2);
        return i || (i = Xs(Or(t), e, t.m ? e.LINEAR : e.NEAREST),
        t.g.push(i),
        t.j = !0),
        e.bindTexture(e.TEXTURE_2D, i),
        i
    }
    function Hr(t) {
        t.h.bindTexture(t.h.TEXTURE_2D, null)
    }
    var qs, ue = class {
        constructor(t, e, i, s, n, r, a) {
            this.g = t,
            this.m = e,
            this.j = i,
            this.canvas = s,
            this.l = n,
            this.width = r,
            this.height = a,
            this.j && --nh === 0 && console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.")
        }
        Da() {
            return !!bt(this, 0)
        }
        ja() {
            return !!bt(this, 1)
        }
        R() {
            return !!bt(this, 2)
        }
        ia() {
            return (e = bt(t = this, 0)) || (e = Dr(t),
            e = new Uint8Array(e.map(i => 255 * i)),
            t.g.push(e)),
            e;
            var t, e
        }
        ha() {
            return Dr(this)
        }
        N() {
            return th(this)
        }
        clone() {
            const t = [];
            for (const e of this.g) {
                let i;
                if (e instanceof Uint8Array)
                    i = new Uint8Array(e);
                else if (e instanceof Float32Array)
                    i = new Float32Array(e);
                else {
                    if (!(e instanceof WebGLTexture))
                        throw Error(`Type is not supported: ${e}`);
                    {
                        const s = Ci(this)
                          , n = Or(this);
                        s.activeTexture(s.TEXTURE1),
                        i = Xs(n, s, this.m ? s.LINEAR : s.NEAREST),
                        s.bindTexture(s.TEXTURE_2D, i);
                        const r = ih(this);
                        s.texImage2D(s.TEXTURE_2D, 0, r, this.width, this.height, 0, s.RED, s.FLOAT, null),
                        s.bindTexture(s.TEXTURE_2D, null),
                        Zs(n, s, i),
                        Lr(n, s, !1, () => {
                            sh(this),
                            s.clearColor(0, 0, 0, 0),
                            s.clear(s.COLOR_BUFFER_BIT),
                            s.drawArrays(s.TRIANGLE_FAN, 0, 4),
                            Hr(this)
                        }
                        ),
                        Ar(n),
                        Hr(this)
                    }
                }
                t.push(i)
            }
            return new ue(t,this.m,this.R(),this.canvas,this.l,this.width,this.height)
        }
        close() {
            this.j && Ci(this).deleteTexture(bt(this, 2)),
            nh = -1
        }
    }
    ;
    ue.prototype.close = ue.prototype.close,
    ue.prototype.clone = ue.prototype.clone,
    ue.prototype.getAsWebGLTexture = ue.prototype.N,
    ue.prototype.getAsFloat32Array = ue.prototype.ha,
    ue.prototype.getAsUint8Array = ue.prototype.ia,
    ue.prototype.hasWebGLTexture = ue.prototype.R,
    ue.prototype.hasFloat32Array = ue.prototype.ja,
    ue.prototype.hasUint8Array = ue.prototype.Da;
    var nh = 250;
    function et(t, e) {
        switch (e) {
        case 0:
            return t.g.find(i => i instanceof ImageData);
        case 1:
            return t.g.find(i => typeof ImageBitmap < "u" && i instanceof ImageBitmap);
        case 2:
            return t.g.find(i => typeof WebGLTexture < "u" && i instanceof WebGLTexture);
        default:
            throw Error(`Type is not supported: ${e}`)
        }
    }
    function rh(t) {
        var e = et(t, 0);
        if (!e) {
            e = Si(t);
            const i = Ys(t)
              , s = new Uint8Array(t.width * t.height * 4);
            Zs(i, e, Gs(t)),
            e.readPixels(0, 0, t.width, t.height, e.RGBA, e.UNSIGNED_BYTE, s),
            Ar(i),
            e = new ImageData(new Uint8ClampedArray(s.buffer),t.width,t.height),
            t.g.push(e)
        }
        return e
    }
    function Gs(t) {
        let e = et(t, 2);
        if (!e) {
            const i = Si(t);
            e = Ks(t);
            const s = et(t, 1) || rh(t);
            i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, s),
            Yi(t)
        }
        return e
    }
    function Si(t) {
        if (!t.canvas)
            throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
        return t.h || (t.h = wt(t.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")),
        t.h
    }
    function Ys(t) {
        return t.l || (t.l = new Rr),
        t.l
    }
    function Ks(t) {
        const e = Si(t);
        e.viewport(0, 0, t.width, t.height),
        e.activeTexture(e.TEXTURE0);
        let i = et(t, 2);
        return i || (i = Xs(Ys(t), e),
        t.g.push(i),
        t.m = !0),
        e.bindTexture(e.TEXTURE_2D, i),
        i
    }
    function Yi(t) {
        t.h.bindTexture(t.h.TEXTURE_2D, null)
    }
    function ah(t) {
        const e = Si(t);
        return Lr(Ys(t), e, !0, () => function(i, s) {
            const n = i.canvas;
            if (n.width === i.width && n.height === i.height)
                return s();
            const r = n.width
              , a = n.height;
            return n.width = i.width,
            n.height = i.height,
            i = s(),
            n.width = r,
            n.height = a,
            i
        }(t, () => {
            if (e.bindFramebuffer(e.FRAMEBUFFER, null),
            e.clearColor(0, 0, 0, 0),
            e.clear(e.COLOR_BUFFER_BIT),
            e.drawArrays(e.TRIANGLE_FAN, 0, 4),
            !(t.canvas instanceof OffscreenCanvas))
                throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");
            return t.canvas.transferToImageBitmap()
        }
        ))
    }
    var fe = class {
        constructor(t, e, i, s, n, r, a) {
            this.g = t,
            this.j = e,
            this.m = i,
            this.canvas = s,
            this.l = n,
            this.width = r,
            this.height = a,
            (this.j || this.m) && --oh === 0 && console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources.")
        }
        Ca() {
            return !!et(this, 0)
        }
        ka() {
            return !!et(this, 1)
        }
        R() {
            return !!et(this, 2)
        }
        Aa() {
            return rh(this)
        }
        za() {
            var t = et(this, 1);
            return t || (Gs(this),
            Ks(this),
            t = ah(this),
            Yi(this),
            this.g.push(t),
            this.j = !0),
            t
        }
        N() {
            return Gs(this)
        }
        clone() {
            const t = [];
            for (const e of this.g) {
                let i;
                if (e instanceof ImageData)
                    i = new ImageData(e.data,this.width,this.height);
                else if (e instanceof WebGLTexture) {
                    const s = Si(this)
                      , n = Ys(this);
                    s.activeTexture(s.TEXTURE1),
                    i = Xs(n, s),
                    s.bindTexture(s.TEXTURE_2D, i),
                    s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, this.width, this.height, 0, s.RGBA, s.UNSIGNED_BYTE, null),
                    s.bindTexture(s.TEXTURE_2D, null),
                    Zs(n, s, i),
                    Lr(n, s, !1, () => {
                        Ks(this),
                        s.clearColor(0, 0, 0, 0),
                        s.clear(s.COLOR_BUFFER_BIT),
                        s.drawArrays(s.TRIANGLE_FAN, 0, 4),
                        Yi(this)
                    }
                    ),
                    Ar(n),
                    Yi(this)
                } else {
                    if (!(e instanceof ImageBitmap))
                        throw Error(`Type is not supported: ${e}`);
                    Gs(this),
                    Ks(this),
                    i = ah(this),
                    Yi(this)
                }
                t.push(i)
            }
            return new fe(t,this.ka(),this.R(),this.canvas,this.l,this.width,this.height)
        }
        close() {
            this.j && et(this, 1).close(),
            this.m && Si(this).deleteTexture(et(this, 2)),
            oh = -1
        }
    }
    ;
    fe.prototype.close = fe.prototype.close,
    fe.prototype.clone = fe.prototype.clone,
    fe.prototype.getAsWebGLTexture = fe.prototype.N,
    fe.prototype.getAsImageBitmap = fe.prototype.za,
    fe.prototype.getAsImageData = fe.prototype.Aa,
    fe.prototype.hasWebGLTexture = fe.prototype.R,
    fe.prototype.hasImageBitmap = fe.prototype.ka,
    fe.prototype.hasImageData = fe.prototype.Ca;
    var oh = 250;
    function Je(...t) {
        return t.map( ([e,i]) => ({
            start: e,
            end: i
        }))
    }
    const Zd = function(t) {
        return class extends t {
            Ha() {
                this.i._registerModelResourcesGraphService()
            }
        }
    }((lh = class {
        constructor(t, e) {
            this.l = !0,
            this.i = t,
            this.g = null,
            this.h = 0,
            this.m = typeof this.i._addIntToInputStream == "function",
            e !== void 0 ? this.i.canvas = e : Gl() ? this.i.canvas = new OffscreenCanvas(1,1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),
            this.i.canvas = document.createElement("canvas"))
        }
        async initializeGraph(t) {
            const e = await (await fetch(t)).arrayBuffer();
            t = !(t.endsWith(".pbtxt") || t.endsWith(".textproto")),
            this.setGraph(new Uint8Array(e), t)
        }
        setGraphFromString(t) {
            this.setGraph(new TextEncoder().encode(t), !1)
        }
        setGraph(t, e) {
            const i = t.length
              , s = this.i._malloc(i);
            this.i.HEAPU8.set(t, s),
            e ? this.i._changeBinaryGraph(i, s) : this.i._changeTextGraph(i, s),
            this.i._free(s)
        }
        configureAudio(t, e, i, s, n) {
            this.i._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),
            P(this, s || "input_audio", r => {
                P(this, n = n || "audio_header", a => {
                    this.i._configureAudio(r, a, t, e ?? 0, i)
                }
                )
            }
            )
        }
        setAutoResizeCanvas(t) {
            this.l = t
        }
        setAutoRenderToScreen(t) {
            this.i._setAutoRenderToScreen(t)
        }
        setGpuBufferVerticalFlip(t) {
            this.i.gpuOriginForWebTexturesIsBottomLeft = t
        }
        ca(t) {
            $e(this, "__graph_config__", e => {
                t(e)
            }
            ),
            P(this, "__graph_config__", e => {
                this.i._getGraphConfig(e, void 0)
            }
            ),
            delete this.i.simpleListeners.__graph_config__
        }
        attachErrorListener(t) {
            this.i.errorListener = t
        }
        attachEmptyPacketListener(t, e) {
            this.i.emptyPacketListeners = this.i.emptyPacketListeners || {},
            this.i.emptyPacketListeners[t] = e
        }
        addAudioToStream(t, e, i) {
            this.addAudioToStreamWithShape(t, 0, 0, e, i)
        }
        addAudioToStreamWithShape(t, e, i, s, n) {
            const r = 4 * t.length;
            this.h !== r && (this.g && this.i._free(this.g),
            this.g = this.i._malloc(r),
            this.h = r),
            this.i.HEAPF32.set(t, this.g / 4),
            P(this, s, a => {
                this.i._addAudioToInputStream(this.g, e, i, a, n)
            }
            )
        }
        addGpuBufferToStream(t, e, i) {
            P(this, e, s => {
                const [n,r] = Jl(this, t, s);
                this.i._addBoundTextureToStream(s, n, r, i)
            }
            )
        }
        addBoolToStream(t, e, i) {
            P(this, e, s => {
                this.i._addBoolToInputStream(t, s, i)
            }
            )
        }
        addDoubleToStream(t, e, i) {
            P(this, e, s => {
                this.i._addDoubleToInputStream(t, s, i)
            }
            )
        }
        addFloatToStream(t, e, i) {
            P(this, e, s => {
                this.i._addFloatToInputStream(t, s, i)
            }
            )
        }
        addIntToStream(t, e, i) {
            P(this, e, s => {
                this.i._addIntToInputStream(t, s, i)
            }
            )
        }
        addUintToStream(t, e, i) {
            P(this, e, s => {
                this.i._addUintToInputStream(t, s, i)
            }
            )
        }
        addStringToStream(t, e, i) {
            P(this, e, s => {
                P(this, t, n => {
                    this.i._addStringToInputStream(n, s, i)
                }
                )
            }
            )
        }
        addStringRecordToStream(t, e, i) {
            P(this, e, s => {
                _l(this, Object.keys(t), n => {
                    _l(this, Object.values(t), r => {
                        this.i._addFlatHashMapToInputStream(n, r, Object.keys(t).length, s, i)
                    }
                    )
                }
                )
            }
            )
        }
        addProtoToStream(t, e, i, s) {
            P(this, i, n => {
                P(this, e, r => {
                    const a = this.i._malloc(t.length);
                    this.i.HEAPU8.set(t, a),
                    this.i._addProtoToInputStream(a, t.length, r, n, s),
                    this.i._free(a)
                }
                )
            }
            )
        }
        addEmptyPacketToStream(t, e) {
            P(this, t, i => {
                this.i._addEmptyPacketToInputStream(i, e)
            }
            )
        }
        addBoolVectorToStream(t, e, i) {
            P(this, e, s => {
                const n = this.i._allocateBoolVector(t.length);
                if (!n)
                    throw Error("Unable to allocate new bool vector on heap.");
                for (const r of t)
                    this.i._addBoolVectorEntry(n, r);
                this.i._addBoolVectorToInputStream(n, s, i)
            }
            )
        }
        addDoubleVectorToStream(t, e, i) {
            P(this, e, s => {
                const n = this.i._allocateDoubleVector(t.length);
                if (!n)
                    throw Error("Unable to allocate new double vector on heap.");
                for (const r of t)
                    this.i._addDoubleVectorEntry(n, r);
                this.i._addDoubleVectorToInputStream(n, s, i)
            }
            )
        }
        addFloatVectorToStream(t, e, i) {
            P(this, e, s => {
                const n = this.i._allocateFloatVector(t.length);
                if (!n)
                    throw Error("Unable to allocate new float vector on heap.");
                for (const r of t)
                    this.i._addFloatVectorEntry(n, r);
                this.i._addFloatVectorToInputStream(n, s, i)
            }
            )
        }
        addIntVectorToStream(t, e, i) {
            P(this, e, s => {
                const n = this.i._allocateIntVector(t.length);
                if (!n)
                    throw Error("Unable to allocate new int vector on heap.");
                for (const r of t)
                    this.i._addIntVectorEntry(n, r);
                this.i._addIntVectorToInputStream(n, s, i)
            }
            )
        }
        addUintVectorToStream(t, e, i) {
            P(this, e, s => {
                const n = this.i._allocateUintVector(t.length);
                if (!n)
                    throw Error("Unable to allocate new unsigned int vector on heap.");
                for (const r of t)
                    this.i._addUintVectorEntry(n, r);
                this.i._addUintVectorToInputStream(n, s, i)
            }
            )
        }
        addStringVectorToStream(t, e, i) {
            P(this, e, s => {
                const n = this.i._allocateStringVector(t.length);
                if (!n)
                    throw Error("Unable to allocate new string vector on heap.");
                for (const r of t)
                    P(this, r, a => {
                        this.i._addStringVectorEntry(n, a)
                    }
                    );
                this.i._addStringVectorToInputStream(n, s, i)
            }
            )
        }
        addBoolToInputSidePacket(t, e) {
            P(this, e, i => {
                this.i._addBoolToInputSidePacket(t, i)
            }
            )
        }
        addDoubleToInputSidePacket(t, e) {
            P(this, e, i => {
                this.i._addDoubleToInputSidePacket(t, i)
            }
            )
        }
        addFloatToInputSidePacket(t, e) {
            P(this, e, i => {
                this.i._addFloatToInputSidePacket(t, i)
            }
            )
        }
        addIntToInputSidePacket(t, e) {
            P(this, e, i => {
                this.i._addIntToInputSidePacket(t, i)
            }
            )
        }
        addUintToInputSidePacket(t, e) {
            P(this, e, i => {
                this.i._addUintToInputSidePacket(t, i)
            }
            )
        }
        addStringToInputSidePacket(t, e) {
            P(this, e, i => {
                P(this, t, s => {
                    this.i._addStringToInputSidePacket(s, i)
                }
                )
            }
            )
        }
        addProtoToInputSidePacket(t, e, i) {
            P(this, i, s => {
                P(this, e, n => {
                    const r = this.i._malloc(t.length);
                    this.i.HEAPU8.set(t, r),
                    this.i._addProtoToInputSidePacket(r, t.length, n, s),
                    this.i._free(r)
                }
                )
            }
            )
        }
        addBoolVectorToInputSidePacket(t, e) {
            P(this, e, i => {
                const s = this.i._allocateBoolVector(t.length);
                if (!s)
                    throw Error("Unable to allocate new bool vector on heap.");
                for (const n of t)
                    this.i._addBoolVectorEntry(s, n);
                this.i._addBoolVectorToInputSidePacket(s, i)
            }
            )
        }
        addDoubleVectorToInputSidePacket(t, e) {
            P(this, e, i => {
                const s = this.i._allocateDoubleVector(t.length);
                if (!s)
                    throw Error("Unable to allocate new double vector on heap.");
                for (const n of t)
                    this.i._addDoubleVectorEntry(s, n);
                this.i._addDoubleVectorToInputSidePacket(s, i)
            }
            )
        }
        addFloatVectorToInputSidePacket(t, e) {
            P(this, e, i => {
                const s = this.i._allocateFloatVector(t.length);
                if (!s)
                    throw Error("Unable to allocate new float vector on heap.");
                for (const n of t)
                    this.i._addFloatVectorEntry(s, n);
                this.i._addFloatVectorToInputSidePacket(s, i)
            }
            )
        }
        addIntVectorToInputSidePacket(t, e) {
            P(this, e, i => {
                const s = this.i._allocateIntVector(t.length);
                if (!s)
                    throw Error("Unable to allocate new int vector on heap.");
                for (const n of t)
                    this.i._addIntVectorEntry(s, n);
                this.i._addIntVectorToInputSidePacket(s, i)
            }
            )
        }
        addUintVectorToInputSidePacket(t, e) {
            P(this, e, i => {
                const s = this.i._allocateUintVector(t.length);
                if (!s)
                    throw Error("Unable to allocate new unsigned int vector on heap.");
                for (const n of t)
                    this.i._addUintVectorEntry(s, n);
                this.i._addUintVectorToInputSidePacket(s, i)
            }
            )
        }
        addStringVectorToInputSidePacket(t, e) {
            P(this, e, i => {
                const s = this.i._allocateStringVector(t.length);
                if (!s)
                    throw Error("Unable to allocate new string vector on heap.");
                for (const n of t)
                    P(this, n, r => {
                        this.i._addStringVectorEntry(s, r)
                    }
                    );
                this.i._addStringVectorToInputSidePacket(s, i)
            }
            )
        }
        attachBoolListener(t, e) {
            $e(this, t, e),
            P(this, t, i => {
                this.i._attachBoolListener(i)
            }
            )
        }
        attachBoolVectorListener(t, e) {
            zt(this, t, e),
            P(this, t, i => {
                this.i._attachBoolVectorListener(i)
            }
            )
        }
        attachIntListener(t, e) {
            $e(this, t, e),
            P(this, t, i => {
                this.i._attachIntListener(i)
            }
            )
        }
        attachIntVectorListener(t, e) {
            zt(this, t, e),
            P(this, t, i => {
                this.i._attachIntVectorListener(i)
            }
            )
        }
        attachUintListener(t, e) {
            $e(this, t, e),
            P(this, t, i => {
                this.i._attachUintListener(i)
            }
            )
        }
        attachUintVectorListener(t, e) {
            zt(this, t, e),
            P(this, t, i => {
                this.i._attachUintVectorListener(i)
            }
            )
        }
        attachDoubleListener(t, e) {
            $e(this, t, e),
            P(this, t, i => {
                this.i._attachDoubleListener(i)
            }
            )
        }
        attachDoubleVectorListener(t, e) {
            zt(this, t, e),
            P(this, t, i => {
                this.i._attachDoubleVectorListener(i)
            }
            )
        }
        attachFloatListener(t, e) {
            $e(this, t, e),
            P(this, t, i => {
                this.i._attachFloatListener(i)
            }
            )
        }
        attachFloatVectorListener(t, e) {
            zt(this, t, e),
            P(this, t, i => {
                this.i._attachFloatVectorListener(i)
            }
            )
        }
        attachStringListener(t, e) {
            $e(this, t, e),
            P(this, t, i => {
                this.i._attachStringListener(i)
            }
            )
        }
        attachStringVectorListener(t, e) {
            zt(this, t, e),
            P(this, t, i => {
                this.i._attachStringVectorListener(i)
            }
            )
        }
        attachProtoListener(t, e, i) {
            $e(this, t, e),
            P(this, t, s => {
                this.i._attachProtoListener(s, i || !1)
            }
            )
        }
        attachProtoVectorListener(t, e, i) {
            zt(this, t, e),
            P(this, t, s => {
                this.i._attachProtoVectorListener(s, i || !1)
            }
            )
        }
        attachAudioListener(t, e, i) {
            this.i._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),
            $e(this, t, (s, n) => {
                s = new Float32Array(s.buffer,s.byteOffset,s.length / 4),
                e(s, n)
            }
            ),
            P(this, t, s => {
                this.i._attachAudioListener(s, i || !1)
            }
            )
        }
        finishProcessing() {
            this.i._waitUntilIdle()
        }
        closeGraph() {
            this.i._closeGraph(),
            this.i.simpleListeners = void 0,
            this.i.emptyPacketListeners = void 0
        }
    }
    ,
    class extends lh {
        get ea() {
            return this.i
        }
        oa(t, e, i) {
            P(this, e, s => {
                const [n,r] = Jl(this, t, s);
                this.ea._addBoundTextureAsImageToStream(s, n, r, i)
            }
            )
        }
        V(t, e) {
            $e(this, t, e),
            P(this, t, i => {
                this.ea._attachImageListener(i)
            }
            )
        }
        ba(t, e) {
            zt(this, t, e),
            P(this, t, i => {
                this.ea._attachImageVectorListener(i)
            }
            )
        }
    }
    ));
    var lh, Ue = class extends Zd {
    }
    ;
    async function O(t, e, i) {
        return async function(s, n, r, a) {
            return Nd(s, n, r, a)
        }(t, i.canvas ?? (Gl() ? void 0 : document.createElement("canvas")), e, i)
    }
    function hh(t, e, i, s) {
        if (t.U) {
            const r = new gl;
            if (i != null && i.regionOfInterest) {
                if (!t.na)
                    throw Error("This task doesn't support region-of-interest.");
                var n = i.regionOfInterest;
                if (n.left >= n.right || n.top >= n.bottom)
                    throw Error("Expected RectF with left < right and top < bottom.");
                if (n.left < 0 || n.top < 0 || n.right > 1 || n.bottom > 1)
                    throw Error("Expected RectF values to be in [0,1].");
                S(r, 1, (n.left + n.right) / 2),
                S(r, 2, (n.top + n.bottom) / 2),
                S(r, 4, n.right - n.left),
                S(r, 3, n.bottom - n.top)
            } else
                S(r, 1, .5),
                S(r, 2, .5),
                S(r, 4, 1),
                S(r, 3, 1);
            if (i != null && i.rotationDegrees) {
                if ((i == null ? void 0 : i.rotationDegrees) % 90 != 0)
                    throw Error("Expected rotation to be a multiple of 90°.");
                if (S(r, 5, -Math.PI * i.rotationDegrees / 180),
                (i == null ? void 0 : i.rotationDegrees) % 180 != 0) {
                    const [a,o] = Kl(e);
                    i = te(r, 3) * o / a,
                    n = te(r, 4) * a / o,
                    S(r, 4, i),
                    S(r, 3, n)
                }
            }
            t.g.addProtoToStream(r.g(), "mediapipe.NormalizedRect", t.U, s)
        }
        t.g.oa(e, t.Z, s ?? performance.now()),
        t.finishProcessing()
    }
    function je(t, e, i) {
        var s;
        if ((s = t.baseOptions) != null && s.g())
            throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");
        hh(t, e, i, t.B + 1)
    }
    function tt(t, e, i, s) {
        var n;
        if (!((n = t.baseOptions) != null && n.g()))
            throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");
        hh(t, e, i, s)
    }
    function ki(t, e, i, s) {
        var n = e.data;
        const r = e.width
          , a = r * (e = e.height);
        if ((n instanceof Uint8Array || n instanceof Float32Array) && n.length !== a)
            throw Error("Unsupported channel count: " + n.length / a);
        return t = new ue([n],i,!1,t.g.i.canvas,t.P,r,e),
        s ? t.clone() : t
    }
    var ke = class extends Mr {
        constructor(t, e, i, s) {
            super(t),
            this.g = t,
            this.Z = e,
            this.U = i,
            this.na = s,
            this.P = new Rr
        }
        l(t, e=!0) {
            if ("runningMode"in t && ji(this.baseOptions, 2, !!t.runningMode && t.runningMode !== "IMAGE"),
            t.canvas !== void 0 && this.g.i.canvas !== t.canvas)
                throw Error("You must create a new task to reset the canvas.");
            return super.l(t, e)
        }
        close() {
            this.P.close(),
            super.close()
        }
    }
    ;
    ke.prototype.close = ke.prototype.close;
    var Ne = class extends ke {
        constructor(t, e) {
            super(new Ue(t,e), "image_in", "norm_rect_in", !1),
            this.j = {
                detections: []
            },
            E(t = this.h = new Ws, 0, 1, e = new G),
            S(this.h, 2, .5),
            S(this.h, 3, .3)
        }
        get baseOptions() {
            return I(this.h, G, 1)
        }
        set baseOptions(t) {
            E(this.h, 0, 1, t)
        }
        o(t) {
            return "minDetectionConfidence"in t && S(this.h, 2, t.minDetectionConfidence ?? .5),
            "minSuppressionThreshold"in t && S(this.h, 3, t.minSuppressionThreshold ?? .3),
            this.l(t)
        }
        D(t, e) {
            return this.j = {
                detections: []
            },
            je(this, t, e),
            this.j
        }
        F(t, e, i) {
            return this.j = {
                detections: []
            },
            tt(this, t, i, e),
            this.j
        }
        m() {
            var t = new Se;
            Z(t, "image_in"),
            Z(t, "norm_rect_in"),
            B(t, "detections");
            const e = new Le;
            Ge(e, Ld, this.h);
            const i = new we;
            Ae(i, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),
            X(i, "IMAGE:image_in"),
            X(i, "NORM_RECT:norm_rect_in"),
            H(i, "DETECTIONS:detections"),
            i.o(e),
            Re(t, i),
            this.g.attachProtoVectorListener("detections", (s, n) => {
                for (const r of s)
                    s = fl(r),
                    this.j.detections.push(Xl(s));
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("detections", s => {
                x(this, s)
            }
            ),
            t = t.g(),
            this.setGraph(new Uint8Array(t), !0)
        }
    }
    ;
    Ne.prototype.detectForVideo = Ne.prototype.F,
    Ne.prototype.detect = Ne.prototype.D,
    Ne.prototype.setOptions = Ne.prototype.o,
    Ne.createFromModelPath = async function(t, e) {
        return O(Ne, t, {
            baseOptions: {
                modelAssetPath: e
            }
        })
    }
    ,
    Ne.createFromModelBuffer = function(t, e) {
        return O(Ne, t, {
            baseOptions: {
                modelAssetBuffer: e
            }
        })
    }
    ,
    Ne.createFromOptions = function(t, e) {
        return O(Ne, t, e)
    }
    ;
    var Vr = Je([61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308])
      , Ir = Je([263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362])
      , zr = Je([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336])
      , ch = Je([474, 475], [475, 476], [476, 477], [477, 474])
      , Br = Je([33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133])
      , Wr = Je([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107])
      , dh = Je([469, 470], [470, 471], [471, 472], [472, 469])
      , Ur = Je([10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10])
      , uh = [...Vr, ...Ir, ...zr, ...Br, ...Wr, ...Ur]
      , fh = Je([127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]);
    function ph(t) {
        t.j = {
            faceLandmarks: [],
            faceBlendshapes: [],
            facialTransformationMatrixes: []
        }
    }
    var $ = class extends ke {
        constructor(t, e) {
            super(new Ue(t,e), "image_in", "norm_rect", !1),
            this.j = {
                faceLandmarks: [],
                faceBlendshapes: [],
                facialTransformationMatrixes: []
            },
            this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = !1,
            E(t = this.h = new kl, 0, 1, e = new G),
            this.v = new Sl,
            E(this.h, 0, 3, this.v),
            this.s = new Ws,
            E(this.h, 0, 2, this.s),
            Qe(this.s, 4, 1),
            S(this.s, 2, .5),
            S(this.v, 2, .5),
            S(this.h, 4, .5)
        }
        get baseOptions() {
            return I(this.h, G, 1)
        }
        set baseOptions(t) {
            E(this.h, 0, 1, t)
        }
        o(t) {
            return "numFaces"in t && Qe(this.s, 4, t.numFaces ?? 1),
            "minFaceDetectionConfidence"in t && S(this.s, 2, t.minFaceDetectionConfidence ?? .5),
            "minTrackingConfidence"in t && S(this.h, 4, t.minTrackingConfidence ?? .5),
            "minFacePresenceConfidence"in t && S(this.v, 2, t.minFacePresenceConfidence ?? .5),
            "outputFaceBlendshapes"in t && (this.outputFaceBlendshapes = !!t.outputFaceBlendshapes),
            "outputFacialTransformationMatrixes"in t && (this.outputFacialTransformationMatrixes = !!t.outputFacialTransformationMatrixes),
            this.l(t)
        }
        D(t, e) {
            return ph(this),
            je(this, t, e),
            this.j
        }
        F(t, e, i) {
            return ph(this),
            tt(this, t, i, e),
            this.j
        }
        m() {
            var t = new Se;
            Z(t, "image_in"),
            Z(t, "norm_rect"),
            B(t, "face_landmarks");
            const e = new Le;
            Ge(e, Rd, this.h);
            const i = new we;
            Ae(i, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),
            X(i, "IMAGE:image_in"),
            X(i, "NORM_RECT:norm_rect"),
            H(i, "NORM_LANDMARKS:face_landmarks"),
            i.o(e),
            Re(t, i),
            this.g.attachProtoVectorListener("face_landmarks", (s, n) => {
                for (const r of s)
                    s = qi(r),
                    this.j.faceLandmarks.push(Us(s));
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("face_landmarks", s => {
                x(this, s)
            }
            ),
            this.outputFaceBlendshapes && (B(t, "blendshapes"),
            H(i, "BLENDSHAPES:blendshapes"),
            this.g.attachProtoVectorListener("blendshapes", (s, n) => {
                if (this.outputFaceBlendshapes)
                    for (const r of s)
                        s = Is(r),
                        this.j.faceBlendshapes.push(Pr(s.g() ?? []));
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("blendshapes", s => {
                x(this, s)
            }
            )),
            this.outputFacialTransformationMatrixes && (B(t, "face_geometry"),
            H(i, "FACE_GEOMETRY:face_geometry"),
            this.g.attachProtoVectorListener("face_geometry", (s, n) => {
                if (this.outputFacialTransformationMatrixes)
                    for (const r of s)
                        (s = I(Ad(r), Cd, 2)) && this.j.facialTransformationMatrixes.push({
                            rows: Be(s, 1) ?? 0 ?? 0,
                            columns: Be(s, 2) ?? 0 ?? 0,
                            data: Zt(s, 3, At, Xt()).slice() ?? []
                        });
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("face_geometry", s => {
                x(this, s)
            }
            )),
            t = t.g(),
            this.setGraph(new Uint8Array(t), !0)
        }
    }
    ;
    $.prototype.detectForVideo = $.prototype.F,
    $.prototype.detect = $.prototype.D,
    $.prototype.setOptions = $.prototype.o,
    $.createFromModelPath = function(t, e) {
        return O($, t, {
            baseOptions: {
                modelAssetPath: e
            }
        })
    }
    ,
    $.createFromModelBuffer = function(t, e) {
        return O($, t, {
            baseOptions: {
                modelAssetBuffer: e
            }
        })
    }
    ,
    $.createFromOptions = function(t, e) {
        return O($, t, e)
    }
    ,
    $.FACE_LANDMARKS_LIPS = Vr,
    $.FACE_LANDMARKS_LEFT_EYE = Ir,
    $.FACE_LANDMARKS_LEFT_EYEBROW = zr,
    $.FACE_LANDMARKS_LEFT_IRIS = ch,
    $.FACE_LANDMARKS_RIGHT_EYE = Br,
    $.FACE_LANDMARKS_RIGHT_EYEBROW = Wr,
    $.FACE_LANDMARKS_RIGHT_IRIS = dh,
    $.FACE_LANDMARKS_FACE_OVAL = Ur,
    $.FACE_LANDMARKS_CONTOURS = uh,
    $.FACE_LANDMARKS_TESSELATION = fh;
    var it = class extends ke {
        constructor(t, e) {
            super(new Ue(t,e), "image_in", "norm_rect", !0),
            E(t = this.j = new Pl, 0, 1, e = new G)
        }
        get baseOptions() {
            return I(this.j, G, 1)
        }
        set baseOptions(t) {
            E(this.j, 0, 1, t)
        }
        o(t) {
            return super.l(t)
        }
        Ka(t, e, i) {
            const s = typeof e != "function" ? e : {};
            if (this.h = typeof e == "function" ? e : i,
            je(this, t, s ?? {}),
            !this.h)
                return this.s
        }
        m() {
            var t = new Se;
            Z(t, "image_in"),
            Z(t, "norm_rect"),
            B(t, "stylized_image");
            const e = new Le;
            Ge(e, Dd, this.j);
            const i = new we;
            Ae(i, "mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"),
            X(i, "IMAGE:image_in"),
            X(i, "NORM_RECT:norm_rect"),
            H(i, "STYLIZED_IMAGE:stylized_image"),
            i.o(e),
            Re(t, i),
            this.g.V("stylized_image", (s, n) => {
                var r = !this.h
                  , a = s.data
                  , o = s.width;
                const h = o * (s = s.height);
                if (a instanceof Uint8Array)
                    if (a.length === 3 * h) {
                        const c = new Uint8ClampedArray(4 * h);
                        for (let d = 0; d < h; ++d)
                            c[4 * d] = a[3 * d],
                            c[4 * d + 1] = a[3 * d + 1],
                            c[4 * d + 2] = a[3 * d + 2],
                            c[4 * d + 3] = 255;
                        a = new ImageData(c,o,s)
                    } else {
                        if (a.length !== 4 * h)
                            throw Error("Unsupported channel count: " + a.length / h);
                        a = new ImageData(new Uint8ClampedArray(a.buffer,a.byteOffset,a.length),o,s)
                    }
                else if (!(a instanceof WebGLTexture))
                    throw Error(`Unsupported format: ${a.constructor.name}`);
                o = new fe([a],!1,!1,this.g.i.canvas,this.P,o,s),
                this.s = r = r ? o.clone() : o,
                this.h && this.h(r),
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("stylized_image", s => {
                this.s = null,
                this.h && this.h(null),
                x(this, s)
            }
            ),
            t = t.g(),
            this.setGraph(new Uint8Array(t), !0)
        }
    }
    ;
    it.prototype.stylize = it.prototype.Ka,
    it.prototype.setOptions = it.prototype.o,
    it.createFromModelPath = function(t, e) {
        return O(it, t, {
            baseOptions: {
                modelAssetPath: e
            }
        })
    }
    ,
    it.createFromModelBuffer = function(t, e) {
        return O(it, t, {
            baseOptions: {
                modelAssetBuffer: e
            }
        })
    }
    ,
    it.createFromOptions = function(t, e) {
        return O(it, t, e)
    }
    ;
    var jr = Je([0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]);
    function mh(t) {
        t.gestures = [],
        t.landmarks = [],
        t.worldLandmarks = [],
        t.handedness = []
    }
    function gh(t) {
        return t.gestures.length === 0 ? {
            gestures: [],
            landmarks: [],
            worldLandmarks: [],
            handedness: [],
            handednesses: []
        } : {
            gestures: t.gestures,
            landmarks: t.landmarks,
            worldLandmarks: t.worldLandmarks,
            handedness: t.handedness,
            handednesses: t.handedness
        }
    }
    function vh(t, e=!0) {
        const i = [];
        for (const n of t) {
            var s = Is(n);
            t = [];
            for (const r of s.g())
                s = e && Be(r, 1) != null ? Be(r, 1) ?? 0 : -1,
                t.push({
                    score: te(r, 2) ?? 0,
                    index: s,
                    categoryName: We(r, 3) ?? "" ?? "",
                    displayName: We(r, 4) ?? "" ?? ""
                });
            i.push(t)
        }
        return i
    }
    var De = class extends ke {
        constructor(t, e) {
            super(new Ue(t,e), "image_in", "norm_rect", !1),
            this.gestures = [],
            this.landmarks = [],
            this.worldLandmarks = [],
            this.handedness = [],
            E(t = this.j = new Tl, 0, 1, e = new G),
            this.s = new br,
            E(this.j, 0, 2, this.s),
            this.C = new wr,
            E(this.s, 0, 3, this.C),
            this.v = new Ml,
            E(this.s, 0, 2, this.v),
            this.h = new Od,
            E(this.j, 0, 3, this.h),
            S(this.v, 2, .5),
            S(this.s, 4, .5),
            S(this.C, 2, .5)
        }
        get baseOptions() {
            return I(this.j, G, 1)
        }
        set baseOptions(t) {
            E(this.j, 0, 1, t)
        }
        o(t) {
            var n, r, a, o;
            if (Qe(this.v, 3, t.numHands ?? 1),
            "minHandDetectionConfidence"in t && S(this.v, 2, t.minHandDetectionConfidence ?? .5),
            "minTrackingConfidence"in t && S(this.s, 4, t.minTrackingConfidence ?? .5),
            "minHandPresenceConfidence"in t && S(this.C, 2, t.minHandPresenceConfidence ?? .5),
            t.cannedGesturesClassifierOptions) {
                var e = new bi
                  , i = e
                  , s = Fr(t.cannedGesturesClassifierOptions, (n = I(this.h, bi, 3)) == null ? void 0 : n.h());
                E(i, 0, 2, s),
                E(this.h, 0, 3, e)
            } else
                t.cannedGesturesClassifierOptions === void 0 && ((r = I(this.h, bi, 3)) == null || r.g());
            return t.customGesturesClassifierOptions ? (E(i = e = new bi, 0, 2, s = Fr(t.customGesturesClassifierOptions, (a = I(this.h, bi, 4)) == null ? void 0 : a.h())),
            E(this.h, 0, 4, e)) : t.customGesturesClassifierOptions === void 0 && ((o = I(this.h, bi, 4)) == null || o.g()),
            this.l(t)
        }
        Fa(t, e) {
            return mh(this),
            je(this, t, e),
            gh(this)
        }
        Ga(t, e, i) {
            return mh(this),
            tt(this, t, i, e),
            gh(this)
        }
        m() {
            var t = new Se;
            Z(t, "image_in"),
            Z(t, "norm_rect"),
            B(t, "hand_gestures"),
            B(t, "hand_landmarks"),
            B(t, "world_hand_landmarks"),
            B(t, "handedness");
            const e = new Le;
            Ge(e, Hd, this.j);
            const i = new we;
            Ae(i, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),
            X(i, "IMAGE:image_in"),
            X(i, "NORM_RECT:norm_rect"),
            H(i, "HAND_GESTURES:hand_gestures"),
            H(i, "LANDMARKS:hand_landmarks"),
            H(i, "WORLD_LANDMARKS:world_hand_landmarks"),
            H(i, "HANDEDNESS:handedness"),
            i.o(e),
            Re(t, i),
            this.g.attachProtoVectorListener("hand_landmarks", (s, n) => {
                for (const r of s) {
                    s = qi(r);
                    const a = [];
                    for (const o of mt(s, ml, 1))
                        a.push({
                            x: te(o, 1) ?? 0,
                            y: te(o, 2) ?? 0,
                            z: te(o, 3) ?? 0,
                            visibility: te(o, 4) ?? 0
                        });
                    this.landmarks.push(a)
                }
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("hand_landmarks", s => {
                x(this, s)
            }
            ),
            this.g.attachProtoVectorListener("world_hand_landmarks", (s, n) => {
                for (const r of s) {
                    s = wi(r);
                    const a = [];
                    for (const o of mt(s, pl, 1))
                        a.push({
                            x: te(o, 1) ?? 0,
                            y: te(o, 2) ?? 0,
                            z: te(o, 3) ?? 0,
                            visibility: te(o, 4) ?? 0
                        });
                    this.worldLandmarks.push(a)
                }
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("world_hand_landmarks", s => {
                x(this, s)
            }
            ),
            this.g.attachProtoVectorListener("hand_gestures", (s, n) => {
                this.gestures.push(...vh(s, !1)),
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("hand_gestures", s => {
                x(this, s)
            }
            ),
            this.g.attachProtoVectorListener("handedness", (s, n) => {
                this.handedness.push(...vh(s)),
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("handedness", s => {
                x(this, s)
            }
            ),
            t = t.g(),
            this.setGraph(new Uint8Array(t), !0)
        }
    }
    ;
    function yh(t) {
        return {
            landmarks: t.landmarks,
            worldLandmarks: t.worldLandmarks,
            handednesses: t.handedness,
            handedness: t.handedness
        }
    }
    De.prototype.recognizeForVideo = De.prototype.Ga,
    De.prototype.recognize = De.prototype.Fa,
    De.prototype.setOptions = De.prototype.o,
    De.createFromModelPath = function(t, e) {
        return O(De, t, {
            baseOptions: {
                modelAssetPath: e
            }
        })
    }
    ,
    De.createFromModelBuffer = function(t, e) {
        return O(De, t, {
            baseOptions: {
                modelAssetBuffer: e
            }
        })
    }
    ,
    De.createFromOptions = function(t, e) {
        return O(De, t, e)
    }
    ,
    De.HAND_CONNECTIONS = jr;
    var Fe = class extends ke {
        constructor(t, e) {
            super(new Ue(t,e), "image_in", "norm_rect", !1),
            this.landmarks = [],
            this.worldLandmarks = [],
            this.handedness = [],
            E(t = this.h = new br, 0, 1, e = new G),
            this.s = new wr,
            E(this.h, 0, 3, this.s),
            this.j = new Ml,
            E(this.h, 0, 2, this.j),
            Qe(this.j, 3, 1),
            S(this.j, 2, .5),
            S(this.s, 2, .5),
            S(this.h, 4, .5)
        }
        get baseOptions() {
            return I(this.h, G, 1)
        }
        set baseOptions(t) {
            E(this.h, 0, 1, t)
        }
        o(t) {
            return "numHands"in t && Qe(this.j, 3, t.numHands ?? 1),
            "minHandDetectionConfidence"in t && S(this.j, 2, t.minHandDetectionConfidence ?? .5),
            "minTrackingConfidence"in t && S(this.h, 4, t.minTrackingConfidence ?? .5),
            "minHandPresenceConfidence"in t && S(this.s, 2, t.minHandPresenceConfidence ?? .5),
            this.l(t)
        }
        D(t, e) {
            return this.landmarks = [],
            this.worldLandmarks = [],
            this.handedness = [],
            je(this, t, e),
            yh(this)
        }
        F(t, e, i) {
            return this.landmarks = [],
            this.worldLandmarks = [],
            this.handedness = [],
            tt(this, t, i, e),
            yh(this)
        }
        m() {
            var t = new Se;
            Z(t, "image_in"),
            Z(t, "norm_rect"),
            B(t, "hand_landmarks"),
            B(t, "world_hand_landmarks"),
            B(t, "handedness");
            const e = new Le;
            Ge(e, Vd, this.h);
            const i = new we;
            Ae(i, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),
            X(i, "IMAGE:image_in"),
            X(i, "NORM_RECT:norm_rect"),
            H(i, "LANDMARKS:hand_landmarks"),
            H(i, "WORLD_LANDMARKS:world_hand_landmarks"),
            H(i, "HANDEDNESS:handedness"),
            i.o(e),
            Re(t, i),
            this.g.attachProtoVectorListener("hand_landmarks", (s, n) => {
                for (const r of s)
                    s = qi(r),
                    this.landmarks.push(Us(s));
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("hand_landmarks", s => {
                x(this, s)
            }
            ),
            this.g.attachProtoVectorListener("world_hand_landmarks", (s, n) => {
                for (const r of s)
                    s = wi(r),
                    this.worldLandmarks.push(Gi(s));
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("world_hand_landmarks", s => {
                x(this, s)
            }
            ),
            this.g.attachProtoVectorListener("handedness", (s, n) => {
                var r = this.handedness
                  , a = r.push;
                const o = [];
                for (const h of s) {
                    s = Is(h);
                    const c = [];
                    for (const d of s.g())
                        c.push({
                            score: te(d, 2) ?? 0,
                            index: Be(d, 1) ?? 0 ?? -1,
                            categoryName: We(d, 3) ?? "" ?? "",
                            displayName: We(d, 4) ?? "" ?? ""
                        });
                    o.push(c)
                }
                a.call(r, ...o),
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("handedness", s => {
                x(this, s)
            }
            ),
            t = t.g(),
            this.setGraph(new Uint8Array(t), !0)
        }
    }
    ;
    Fe.prototype.detectForVideo = Fe.prototype.F,
    Fe.prototype.detect = Fe.prototype.D,
    Fe.prototype.setOptions = Fe.prototype.o,
    Fe.createFromModelPath = function(t, e) {
        return O(Fe, t, {
            baseOptions: {
                modelAssetPath: e
            }
        })
    }
    ,
    Fe.createFromModelBuffer = function(t, e) {
        return O(Fe, t, {
            baseOptions: {
                modelAssetBuffer: e
            }
        })
    }
    ,
    Fe.createFromOptions = function(t, e) {
        return O(Fe, t, e)
    }
    ,
    Fe.HAND_CONNECTIONS = jr;
    var wh = Je([0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]);
    function bh(t) {
        t.h = {
            faceLandmarks: [],
            faceBlendshapes: [],
            poseLandmarks: [],
            poseWorldLandmarks: [],
            poseSegmentationMasks: [],
            leftHandLandmarks: [],
            leftHandWorldLandmarks: [],
            rightHandLandmarks: [],
            rightHandWorldLandmarks: []
        }
    }
    function xh(t) {
        try {
            if (!t.C)
                return t.h;
            t.C(t.h)
        } finally {
            Ns(t)
        }
    }
    function Js(t, e) {
        t = qi(t),
        e.push(Us(t))
    }
    var Y = class extends ke {
        constructor(t, e) {
            super(new Ue(t,e), "input_frames_image", null, !1),
            this.h = {
                faceLandmarks: [],
                faceBlendshapes: [],
                poseLandmarks: [],
                poseWorldLandmarks: [],
                poseSegmentationMasks: [],
                leftHandLandmarks: [],
                leftHandWorldLandmarks: [],
                rightHandLandmarks: [],
                rightHandWorldLandmarks: []
            },
            this.outputPoseSegmentationMasks = this.outputFaceBlendshapes = !1,
            E(t = this.j = new Hl, 0, 1, e = new G),
            this.K = new wr,
            E(this.j, 0, 2, this.K),
            this.Y = new Id,
            E(this.j, 0, 3, this.Y),
            this.s = new Ws,
            E(this.j, 0, 4, this.s),
            this.H = new Sl,
            E(this.j, 0, 5, this.H),
            this.v = new Dl,
            E(this.j, 0, 6, this.v),
            this.L = new Ol,
            E(this.j, 0, 7, this.L),
            S(this.s, 2, .5),
            S(this.s, 3, .3),
            S(this.H, 2, .5),
            S(this.v, 2, .5),
            S(this.v, 3, .3),
            S(this.L, 2, .5),
            S(this.K, 2, .5)
        }
        get baseOptions() {
            return I(this.j, G, 1)
        }
        set baseOptions(t) {
            E(this.j, 0, 1, t)
        }
        o(t) {
            return "minFaceDetectionConfidence"in t && S(this.s, 2, t.minFaceDetectionConfidence ?? .5),
            "minFaceSuppressionThreshold"in t && S(this.s, 3, t.minFaceSuppressionThreshold ?? .3),
            "minFacePresenceConfidence"in t && S(this.H, 2, t.minFacePresenceConfidence ?? .5),
            "outputFaceBlendshapes"in t && (this.outputFaceBlendshapes = !!t.outputFaceBlendshapes),
            "minPoseDetectionConfidence"in t && S(this.v, 2, t.minPoseDetectionConfidence ?? .5),
            "minPoseSuppressionThreshold"in t && S(this.v, 3, t.minPoseSuppressionThreshold ?? .3),
            "minPosePresenceConfidence"in t && S(this.L, 2, t.minPosePresenceConfidence ?? .5),
            "outputPoseSegmentationMasks"in t && (this.outputPoseSegmentationMasks = !!t.outputPoseSegmentationMasks),
            "minHandLandmarksConfidence"in t && S(this.K, 2, t.minHandLandmarksConfidence ?? .5),
            this.l(t)
        }
        D(t, e, i) {
            const s = typeof e != "function" ? e : {};
            return this.C = typeof e == "function" ? e : i,
            bh(this),
            je(this, t, s),
            xh(this)
        }
        F(t, e, i, s) {
            const n = typeof i != "function" ? i : {};
            return this.C = typeof i == "function" ? i : s,
            bh(this),
            tt(this, t, n, e),
            xh(this)
        }
        m() {
            var t = new Se;
            Z(t, "input_frames_image"),
            B(t, "pose_landmarks"),
            B(t, "pose_world_landmarks"),
            B(t, "face_landmarks"),
            B(t, "left_hand_landmarks"),
            B(t, "left_hand_world_landmarks"),
            B(t, "right_hand_landmarks"),
            B(t, "right_hand_world_landmarks");
            const e = new Le
              , i = new $o;
            jn(i, 1, oi("type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"), ""),
            function(n, r) {
                if (r != null)
                    if (Array.isArray(r))
                        N(n, 2, ys(r, zn, void 0, void 0, !1));
                    else {
                        if (!(typeof r == "string" || r instanceof ut || Ut(r)))
                            throw Error("invalid value in Any.value field: " + r + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
                        jn(n, 2, Fn(r, !1), jt())
                    }
            }(i, this.j.g());
            const s = new we;
            Ae(s, "mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),
            Ss(s, 8, $o, i),
            X(s, "IMAGE:input_frames_image"),
            H(s, "POSE_LANDMARKS:pose_landmarks"),
            H(s, "POSE_WORLD_LANDMARKS:pose_world_landmarks"),
            H(s, "FACE_LANDMARKS:face_landmarks"),
            H(s, "LEFT_HAND_LANDMARKS:left_hand_landmarks"),
            H(s, "LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),
            H(s, "RIGHT_HAND_LANDMARKS:right_hand_landmarks"),
            H(s, "RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),
            s.o(e),
            Re(t, s),
            js(this, t),
            this.g.attachProtoListener("pose_landmarks", (n, r) => {
                Js(n, this.h.poseLandmarks),
                x(this, r)
            }
            ),
            this.g.attachEmptyPacketListener("pose_landmarks", n => {
                x(this, n)
            }
            ),
            this.g.attachProtoListener("pose_world_landmarks", (n, r) => {
                var a = this.h.poseWorldLandmarks;
                n = wi(n),
                a.push(Gi(n)),
                x(this, r)
            }
            ),
            this.g.attachEmptyPacketListener("pose_world_landmarks", n => {
                x(this, n)
            }
            ),
            this.outputPoseSegmentationMasks && (H(s, "POSE_SEGMENTATION_MASK:pose_segmentation_mask"),
            xi(this, "pose_segmentation_mask"),
            this.g.V("pose_segmentation_mask", (n, r) => {
                this.h.poseSegmentationMasks = [ki(this, n, !0, !this.C)],
                x(this, r)
            }
            ),
            this.g.attachEmptyPacketListener("pose_segmentation_mask", n => {
                this.h.poseSegmentationMasks = [],
                x(this, n)
            }
            )),
            this.g.attachProtoListener("face_landmarks", (n, r) => {
                Js(n, this.h.faceLandmarks),
                x(this, r)
            }
            ),
            this.g.attachEmptyPacketListener("face_landmarks", n => {
                x(this, n)
            }
            ),
            this.outputFaceBlendshapes && (B(t, "extra_blendshapes"),
            H(s, "FACE_BLENDSHAPES:extra_blendshapes"),
            this.g.attachProtoListener("extra_blendshapes", (n, r) => {
                var a = this.h.faceBlendshapes;
                this.outputFaceBlendshapes && (n = Is(n),
                a.push(Pr(n.g() ?? []))),
                x(this, r)
            }
            ),
            this.g.attachEmptyPacketListener("extra_blendshapes", n => {
                x(this, n)
            }
            )),
            this.g.attachProtoListener("left_hand_landmarks", (n, r) => {
                Js(n, this.h.leftHandLandmarks),
                x(this, r)
            }
            ),
            this.g.attachEmptyPacketListener("left_hand_landmarks", n => {
                x(this, n)
            }
            ),
            this.g.attachProtoListener("left_hand_world_landmarks", (n, r) => {
                var a = this.h.leftHandWorldLandmarks;
                n = wi(n),
                a.push(Gi(n)),
                x(this, r)
            }
            ),
            this.g.attachEmptyPacketListener("left_hand_world_landmarks", n => {
                x(this, n)
            }
            ),
            this.g.attachProtoListener("right_hand_landmarks", (n, r) => {
                Js(n, this.h.rightHandLandmarks),
                x(this, r)
            }
            ),
            this.g.attachEmptyPacketListener("right_hand_landmarks", n => {
                x(this, n)
            }
            ),
            this.g.attachProtoListener("right_hand_world_landmarks", (n, r) => {
                var a = this.h.rightHandWorldLandmarks;
                n = wi(n),
                a.push(Gi(n)),
                x(this, r)
            }
            ),
            this.g.attachEmptyPacketListener("right_hand_world_landmarks", n => {
                x(this, n)
            }
            ),
            t = t.g(),
            this.setGraph(new Uint8Array(t), !0)
        }
    }
    ;
    Y.prototype.detectForVideo = Y.prototype.F,
    Y.prototype.detect = Y.prototype.D,
    Y.prototype.setOptions = Y.prototype.o,
    Y.createFromModelPath = function(t, e) {
        return O(Y, t, {
            baseOptions: {
                modelAssetPath: e
            }
        })
    }
    ,
    Y.createFromModelBuffer = function(t, e) {
        return O(Y, t, {
            baseOptions: {
                modelAssetBuffer: e
            }
        })
    }
    ,
    Y.createFromOptions = function(t, e) {
        return O(Y, t, e)
    }
    ,
    Y.HAND_CONNECTIONS = jr,
    Y.POSE_CONNECTIONS = wh,
    Y.FACE_LANDMARKS_LIPS = Vr,
    Y.FACE_LANDMARKS_LEFT_EYE = Ir,
    Y.FACE_LANDMARKS_LEFT_EYEBROW = zr,
    Y.FACE_LANDMARKS_LEFT_IRIS = ch,
    Y.FACE_LANDMARKS_RIGHT_EYE = Br,
    Y.FACE_LANDMARKS_RIGHT_EYEBROW = Wr,
    Y.FACE_LANDMARKS_RIGHT_IRIS = dh,
    Y.FACE_LANDMARKS_FACE_OVAL = Ur,
    Y.FACE_LANDMARKS_CONTOURS = uh,
    Y.FACE_LANDMARKS_TESSELATION = fh;
    var Xe = class extends ke {
        constructor(t, e) {
            super(new Ue(t,e), "input_image", "norm_rect", !0),
            this.j = {
                classifications: []
            },
            E(t = this.h = new Vl, 0, 1, e = new G)
        }
        get baseOptions() {
            return I(this.h, G, 1)
        }
        set baseOptions(t) {
            E(this.h, 0, 1, t)
        }
        o(t) {
            return E(this.h, 0, 2, Fr(t, I(this.h, gr, 2))),
            this.l(t)
        }
        qa(t, e) {
            return this.j = {
                classifications: []
            },
            je(this, t, e),
            this.j
        }
        ra(t, e, i) {
            return this.j = {
                classifications: []
            },
            tt(this, t, i, e),
            this.j
        }
        m() {
            var t = new Se;
            Z(t, "input_image"),
            Z(t, "norm_rect"),
            B(t, "classifications");
            const e = new Le;
            Ge(e, zd, this.h);
            const i = new we;
            Ae(i, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),
            X(i, "IMAGE:input_image"),
            X(i, "NORM_RECT:norm_rect"),
            H(i, "CLASSIFICATIONS:classifications"),
            i.o(e),
            Re(t, i),
            this.g.attachProtoListener("classifications", (s, n) => {
                this.j = function(r) {
                    const a = {
                        classifications: mt(r, kd, 1).map(o => {
                            var h;
                            return Pr(((h = I(o, dl, 4)) == null ? void 0 : h.g()) ?? [], Be(o, 2) ?? 0, We(o, 3) ?? "")
                        }
                        )
                    };
                    return Dn(hi(r, 2)) != null && (a.timestampMs = Dn(hi(r, 2)) ?? 0),
                    a
                }(Fd(s)),
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("classifications", s => {
                x(this, s)
            }
            ),
            t = t.g(),
            this.setGraph(new Uint8Array(t), !0)
        }
    }
    ;
    Xe.prototype.classifyForVideo = Xe.prototype.ra,
    Xe.prototype.classify = Xe.prototype.qa,
    Xe.prototype.setOptions = Xe.prototype.o,
    Xe.createFromModelPath = function(t, e) {
        return O(Xe, t, {
            baseOptions: {
                modelAssetPath: e
            }
        })
    }
    ,
    Xe.createFromModelBuffer = function(t, e) {
        return O(Xe, t, {
            baseOptions: {
                modelAssetBuffer: e
            }
        })
    }
    ,
    Xe.createFromOptions = function(t, e) {
        return O(Xe, t, e)
    }
    ;
    var Oe = class extends ke {
        constructor(t, e) {
            super(new Ue(t,e), "image_in", "norm_rect", !0),
            this.h = new Il,
            this.embeddings = {
                embeddings: []
            },
            E(t = this.h, 0, 1, e = new G)
        }
        get baseOptions() {
            return I(this.h, G, 1)
        }
        set baseOptions(t) {
            E(this.h, 0, 1, t)
        }
        o(t) {
            var e = this.h
              , i = I(this.h, bl, 2);
            return i = i ? i.clone() : new bl,
            t.l2Normalize !== void 0 ? ji(i, 1, t.l2Normalize) : "l2Normalize"in t && N(i, 1),
            t.quantize !== void 0 ? ji(i, 2, t.quantize) : "quantize"in t && N(i, 2),
            E(e, 0, 2, i),
            this.l(t)
        }
        xa(t, e) {
            return je(this, t, e),
            this.embeddings
        }
        ya(t, e, i) {
            return tt(this, t, i, e),
            this.embeddings
        }
        m() {
            var t = new Se;
            Z(t, "image_in"),
            Z(t, "norm_rect"),
            B(t, "embeddings_out");
            const e = new Le;
            Ge(e, Bd, this.h);
            const i = new we;
            Ae(i, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),
            X(i, "IMAGE:image_in"),
            X(i, "NORM_RECT:norm_rect"),
            H(i, "EMBEDDINGS:embeddings_out"),
            i.o(e),
            Re(t, i),
            this.g.attachProtoListener("embeddings_out", (s, n) => {
                s = Md(s),
                this.embeddings = function(r) {
                    return {
                        embeddings: mt(r, Ed, 1).map(a => {
                            var h, c;
                            const o = {
                                headIndex: Be(a, 3) ?? 0 ?? -1,
                                headName: We(a, 4) ?? "" ?? ""
                            };
                            if (bo(a, vl, Nn(a, 1)) !== void 0)
                                a = Zt(a = I(a, vl, Nn(a, 1)), 1, At, Xt()),
                                o.floatEmbedding = a.slice();
                            else {
                                const d = new Uint8Array(0);
                                o.quantizedEmbedding = ((c = (h = I(a, Pd, Nn(a, 2))) == null ? void 0 : h.ma()) == null ? void 0 : c.h()) ?? d
                            }
                            return o
                        }
                        ),
                        timestampMs: Dn(hi(r, 2)) ?? 0
                    }
                }(s),
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("embeddings_out", s => {
                x(this, s)
            }
            ),
            t = t.g(),
            this.setGraph(new Uint8Array(t), !0)
        }
    }
    ;
    Oe.cosineSimilarity = function(t, e) {
        if (t.floatEmbedding && e.floatEmbedding)
            t = ql(t.floatEmbedding, e.floatEmbedding);
        else {
            if (!t.quantizedEmbedding || !e.quantizedEmbedding)
                throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
            t = ql(Zl(t.quantizedEmbedding), Zl(e.quantizedEmbedding))
        }
        return t
    }
    ,
    Oe.prototype.embedForVideo = Oe.prototype.ya,
    Oe.prototype.embed = Oe.prototype.xa,
    Oe.prototype.setOptions = Oe.prototype.o,
    Oe.createFromModelPath = function(t, e) {
        return O(Oe, t, {
            baseOptions: {
                modelAssetPath: e
            }
        })
    }
    ,
    Oe.createFromModelBuffer = function(t, e) {
        return O(Oe, t, {
            baseOptions: {
                modelAssetBuffer: e
            }
        })
    }
    ,
    Oe.createFromOptions = function(t, e) {
        return O(Oe, t, e)
    }
    ;
    var Nr = class {
        constructor(t, e, i) {
            this.confidenceMasks = t,
            this.categoryMask = e,
            this.qualityScores = i
        }
        close() {
            var t, e;
            (t = this.confidenceMasks) == null || t.forEach(i => {
                i.close()
            }
            ),
            (e = this.categoryMask) == null || e.close()
        }
    }
    ;
    function Ch(t) {
        t.categoryMask = void 0,
        t.confidenceMasks = void 0,
        t.qualityScores = void 0
    }
    function Sh(t) {
        try {
            const e = new Nr(t.confidenceMasks,t.categoryMask,t.qualityScores);
            if (!t.j)
                return e;
            t.j(e)
        } finally {
            Ns(t)
        }
    }
    Nr.prototype.close = Nr.prototype.close;
    var be = class extends ke {
        constructor(t, e) {
            super(new Ue(t,e), "image_in", "norm_rect", !1),
            this.s = [],
            this.outputCategoryMask = !1,
            this.outputConfidenceMasks = !0,
            this.h = new kr,
            this.v = new zl,
            E(this.h, 0, 3, this.v),
            E(t = this.h, 0, 1, e = new G)
        }
        get baseOptions() {
            return I(this.h, G, 1)
        }
        set baseOptions(t) {
            E(this.h, 0, 1, t)
        }
        o(t) {
            return t.displayNamesLocale !== void 0 ? N(this.h, 2, oi(t.displayNamesLocale)) : "displayNamesLocale"in t && N(this.h, 2),
            "outputCategoryMask"in t && (this.outputCategoryMask = t.outputCategoryMask ?? !1),
            "outputConfidenceMasks"in t && (this.outputConfidenceMasks = t.outputConfidenceMasks ?? !0),
            super.l(t)
        }
        J() {
            (function(t) {
                var i, s;
                const e = mt(t.ca(), we, 1).filter(n => (We(n, 1) ?? "").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));
                if (t.s = [],
                e.length > 1)
                    throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");
                e.length === 1 && (((s = (i = I(e[0], Le, 7)) == null ? void 0 : i.l()) == null ? void 0 : s.g()) ?? new Map).forEach( (n, r) => {
                    t.s[Number(r)] = We(n, 1) ?? ""
                }
                )
            }
            )(this)
        }
        segment(t, e, i) {
            const s = typeof e != "function" ? e : {};
            return this.j = typeof e == "function" ? e : i,
            Ch(this),
            je(this, t, s),
            Sh(this)
        }
        Ia(t, e, i, s) {
            const n = typeof i != "function" ? i : {};
            return this.j = typeof i == "function" ? i : s,
            Ch(this),
            tt(this, t, n, e),
            Sh(this)
        }
        Ba() {
            return this.s
        }
        m() {
            var t = new Se;
            Z(t, "image_in"),
            Z(t, "norm_rect");
            const e = new Le;
            Ge(e, Ul, this.h);
            const i = new we;
            Ae(i, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),
            X(i, "IMAGE:image_in"),
            X(i, "NORM_RECT:norm_rect"),
            i.o(e),
            Re(t, i),
            js(this, t),
            this.outputConfidenceMasks && (B(t, "confidence_masks"),
            H(i, "CONFIDENCE_MASKS:confidence_masks"),
            xi(this, "confidence_masks"),
            this.g.ba("confidence_masks", (s, n) => {
                this.confidenceMasks = s.map(r => ki(this, r, !0, !this.j)),
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("confidence_masks", s => {
                this.confidenceMasks = [],
                x(this, s)
            }
            )),
            this.outputCategoryMask && (B(t, "category_mask"),
            H(i, "CATEGORY_MASK:category_mask"),
            xi(this, "category_mask"),
            this.g.V("category_mask", (s, n) => {
                this.categoryMask = ki(this, s, !1, !this.j),
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("category_mask", s => {
                this.categoryMask = void 0,
                x(this, s)
            }
            )),
            B(t, "quality_scores"),
            H(i, "QUALITY_SCORES:quality_scores"),
            this.g.attachFloatVectorListener("quality_scores", (s, n) => {
                this.qualityScores = s,
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("quality_scores", s => {
                this.categoryMask = void 0,
                x(this, s)
            }
            ),
            t = t.g(),
            this.setGraph(new Uint8Array(t), !0)
        }
    }
    ;
    be.prototype.getLabels = be.prototype.Ba,
    be.prototype.segmentForVideo = be.prototype.Ia,
    be.prototype.segment = be.prototype.segment,
    be.prototype.setOptions = be.prototype.o,
    be.createFromModelPath = function(t, e) {
        return O(be, t, {
            baseOptions: {
                modelAssetPath: e
            }
        })
    }
    ,
    be.createFromModelBuffer = function(t, e) {
        return O(be, t, {
            baseOptions: {
                modelAssetBuffer: e
            }
        })
    }
    ,
    be.createFromOptions = function(t, e) {
        return O(be, t, e)
    }
    ;
    var Xr = class {
        constructor(t, e, i) {
            this.confidenceMasks = t,
            this.categoryMask = e,
            this.qualityScores = i
        }
        close() {
            var t, e;
            (t = this.confidenceMasks) == null || t.forEach(i => {
                i.close()
            }
            ),
            (e = this.categoryMask) == null || e.close()
        }
    }
    ;
    Xr.prototype.close = Xr.prototype.close;
    var qd = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Fi = [0, Q, -2]
      , _s = [0, yt, -3, q, yt, -1]
      , kh = [0, _s]
      , Fh = [0, _s, Q, -1]
      , Zr = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Ph = [0, yt, -1, q]
      , Gd = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , Eh = class extends C {
        constructor(t) {
            super(t)
        }
    }
      , qr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15]
      , Mh = class extends C {
        constructor(t) {
            super(t)
        }
    }
    ;
    Mh.prototype.g = Vs([0, he, [0, qr, U, _s, U, [0, _s, Fi], U, kh, U, [0, kh, Fi], U, Ph, U, [0, yt, -3, q, Te], U, [0, yt, -3, q], U, [0, W, yt, -2, q, Q, q, -1, 2, yt, Fi], U, Fh, U, [0, Fh, Fi], yt, Fi, W, U, [0, yt, -3, q, Fi, -1], U, [0, he, Ph]], W, [0, W, Q, -1, q]]);
    var st = class extends ke {
        constructor(t, e) {
            super(new Ue(t,e), "image_in", "norm_rect_in", !1),
            this.outputCategoryMask = !1,
            this.outputConfidenceMasks = !0,
            this.h = new kr,
            this.s = new zl,
            E(this.h, 0, 3, this.s),
            E(t = this.h, 0, 1, e = new G)
        }
        get baseOptions() {
            return I(this.h, G, 1)
        }
        set baseOptions(t) {
            E(this.h, 0, 1, t)
        }
        o(t) {
            return "outputCategoryMask"in t && (this.outputCategoryMask = t.outputCategoryMask ?? !1),
            "outputConfidenceMasks"in t && (this.outputConfidenceMasks = t.outputConfidenceMasks ?? !0),
            super.l(t)
        }
        segment(t, e, i, s) {
            const n = typeof i != "function" ? i : {};
            this.j = typeof i == "function" ? i : s,
            this.qualityScores = this.categoryMask = this.confidenceMasks = void 0,
            i = this.B + 1,
            s = new Mh;
            const r = new Eh;
            var a = new qd;
            if (Qe(a, 1, 255),
            E(r, 0, 12, a),
            e.keypoint && e.scribble)
                throw Error("Cannot provide both keypoint and scribble.");
            if (e.keypoint) {
                var o = new Zr;
                ji(o, 3, !0),
                S(o, 1, e.keypoint.x),
                S(o, 2, e.keypoint.y),
                Ui(r, 5, qr, o)
            } else {
                if (!e.scribble)
                    throw Error("Must provide either a keypoint or a scribble.");
                for (o of (a = new Gd,
                e.scribble))
                    ji(e = new Zr, 3, !0),
                    S(e, 1, o.x),
                    S(e, 2, o.y),
                    Ss(a, 1, Zr, e);
                Ui(r, 15, qr, a)
            }
            Ss(s, 1, Eh, r),
            this.g.addProtoToStream(s.g(), "drishti.RenderData", "roi_in", i),
            je(this, t, n);
            e: {
                try {
                    const c = new Xr(this.confidenceMasks,this.categoryMask,this.qualityScores);
                    if (!this.j) {
                        var h = c;
                        break e
                    }
                    this.j(c)
                } finally {
                    Ns(this)
                }
                h = void 0
            }
            return h
        }
        m() {
            var t = new Se;
            Z(t, "image_in"),
            Z(t, "roi_in"),
            Z(t, "norm_rect_in");
            const e = new Le;
            Ge(e, Ul, this.h);
            const i = new we;
            Ae(i, "mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"),
            X(i, "IMAGE:image_in"),
            X(i, "ROI:roi_in"),
            X(i, "NORM_RECT:norm_rect_in"),
            i.o(e),
            Re(t, i),
            js(this, t),
            this.outputConfidenceMasks && (B(t, "confidence_masks"),
            H(i, "CONFIDENCE_MASKS:confidence_masks"),
            xi(this, "confidence_masks"),
            this.g.ba("confidence_masks", (s, n) => {
                this.confidenceMasks = s.map(r => ki(this, r, !0, !this.j)),
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("confidence_masks", s => {
                this.confidenceMasks = [],
                x(this, s)
            }
            )),
            this.outputCategoryMask && (B(t, "category_mask"),
            H(i, "CATEGORY_MASK:category_mask"),
            xi(this, "category_mask"),
            this.g.V("category_mask", (s, n) => {
                this.categoryMask = ki(this, s, !1, !this.j),
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("category_mask", s => {
                this.categoryMask = void 0,
                x(this, s)
            }
            )),
            B(t, "quality_scores"),
            H(i, "QUALITY_SCORES:quality_scores"),
            this.g.attachFloatVectorListener("quality_scores", (s, n) => {
                this.qualityScores = s,
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("quality_scores", s => {
                this.categoryMask = void 0,
                x(this, s)
            }
            ),
            t = t.g(),
            this.setGraph(new Uint8Array(t), !0)
        }
    }
    ;
    st.prototype.segment = st.prototype.segment,
    st.prototype.setOptions = st.prototype.o,
    st.createFromModelPath = function(t, e) {
        return O(st, t, {
            baseOptions: {
                modelAssetPath: e
            }
        })
    }
    ,
    st.createFromModelBuffer = function(t, e) {
        return O(st, t, {
            baseOptions: {
                modelAssetBuffer: e
            }
        })
    }
    ,
    st.createFromOptions = function(t, e) {
        return O(st, t, e)
    }
    ;
    var Ze = class extends ke {
        constructor(t, e) {
            super(new Ue(t,e), "input_frame_gpu", "norm_rect", !1),
            this.j = {
                detections: []
            },
            E(t = this.h = new jl, 0, 1, e = new G)
        }
        get baseOptions() {
            return I(this.h, G, 1)
        }
        set baseOptions(t) {
            E(this.h, 0, 1, t)
        }
        o(t) {
            return t.displayNamesLocale !== void 0 ? N(this.h, 2, oi(t.displayNamesLocale)) : "displayNamesLocale"in t && N(this.h, 2),
            t.maxResults !== void 0 ? Qe(this.h, 3, t.maxResults) : "maxResults"in t && N(this.h, 3),
            t.scoreThreshold !== void 0 ? S(this.h, 4, t.scoreThreshold) : "scoreThreshold"in t && N(this.h, 4),
            t.categoryAllowlist !== void 0 ? ks(this.h, 5, t.categoryAllowlist) : "categoryAllowlist"in t && N(this.h, 5),
            t.categoryDenylist !== void 0 ? ks(this.h, 6, t.categoryDenylist) : "categoryDenylist"in t && N(this.h, 6),
            this.l(t)
        }
        D(t, e) {
            return this.j = {
                detections: []
            },
            je(this, t, e),
            this.j
        }
        F(t, e, i) {
            return this.j = {
                detections: []
            },
            tt(this, t, i, e),
            this.j
        }
        m() {
            var t = new Se;
            Z(t, "input_frame_gpu"),
            Z(t, "norm_rect"),
            B(t, "detections");
            const e = new Le;
            Ge(e, Ud, this.h);
            const i = new we;
            Ae(i, "mediapipe.tasks.vision.ObjectDetectorGraph"),
            X(i, "IMAGE:input_frame_gpu"),
            X(i, "NORM_RECT:norm_rect"),
            H(i, "DETECTIONS:detections"),
            i.o(e),
            Re(t, i),
            this.g.attachProtoVectorListener("detections", (s, n) => {
                for (const r of s)
                    s = fl(r),
                    this.j.detections.push(Xl(s));
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("detections", s => {
                x(this, s)
            }
            ),
            t = t.g(),
            this.setGraph(new Uint8Array(t), !0)
        }
    }
    ;
    Ze.prototype.detectForVideo = Ze.prototype.F,
    Ze.prototype.detect = Ze.prototype.D,
    Ze.prototype.setOptions = Ze.prototype.o,
    Ze.createFromModelPath = async function(t, e) {
        return O(Ze, t, {
            baseOptions: {
                modelAssetPath: e
            }
        })
    }
    ,
    Ze.createFromModelBuffer = function(t, e) {
        return O(Ze, t, {
            baseOptions: {
                modelAssetBuffer: e
            }
        })
    }
    ,
    Ze.createFromOptions = function(t, e) {
        return O(Ze, t, e)
    }
    ;
    var Gr = class {
        constructor(t, e, i) {
            this.landmarks = t,
            this.worldLandmarks = e,
            this.segmentationMasks = i
        }
        close() {
            var t;
            (t = this.segmentationMasks) == null || t.forEach(e => {
                e.close()
            }
            )
        }
    }
    ;
    function Th(t) {
        t.landmarks = [],
        t.worldLandmarks = [],
        t.segmentationMasks = void 0
    }
    function Lh(t) {
        try {
            const e = new Gr(t.landmarks,t.worldLandmarks,t.segmentationMasks);
            if (!t.s)
                return e;
            t.s(e)
        } finally {
            Ns(t)
        }
    }
    Gr.prototype.close = Gr.prototype.close;
    var He = class extends ke {
        constructor(t, e) {
            super(new Ue(t,e), "image_in", "norm_rect", !1),
            this.landmarks = [],
            this.worldLandmarks = [],
            this.outputSegmentationMasks = !1,
            E(t = this.h = new Nl, 0, 1, e = new G),
            this.v = new Ol,
            E(this.h, 0, 3, this.v),
            this.j = new Dl,
            E(this.h, 0, 2, this.j),
            Qe(this.j, 4, 1),
            S(this.j, 2, .5),
            S(this.v, 2, .5),
            S(this.h, 4, .5)
        }
        get baseOptions() {
            return I(this.h, G, 1)
        }
        set baseOptions(t) {
            E(this.h, 0, 1, t)
        }
        o(t) {
            return "numPoses"in t && Qe(this.j, 4, t.numPoses ?? 1),
            "minPoseDetectionConfidence"in t && S(this.j, 2, t.minPoseDetectionConfidence ?? .5),
            "minTrackingConfidence"in t && S(this.h, 4, t.minTrackingConfidence ?? .5),
            "minPosePresenceConfidence"in t && S(this.v, 2, t.minPosePresenceConfidence ?? .5),
            "outputSegmentationMasks"in t && (this.outputSegmentationMasks = t.outputSegmentationMasks ?? !1),
            this.l(t)
        }
        D(t, e, i) {
            const s = typeof e != "function" ? e : {};
            return this.s = typeof e == "function" ? e : i,
            Th(this),
            je(this, t, s),
            Lh(this)
        }
        F(t, e, i, s) {
            const n = typeof i != "function" ? i : {};
            return this.s = typeof i == "function" ? i : s,
            Th(this),
            tt(this, t, n, e),
            Lh(this)
        }
        m() {
            var t = new Se;
            Z(t, "image_in"),
            Z(t, "norm_rect"),
            B(t, "normalized_landmarks"),
            B(t, "world_landmarks"),
            B(t, "segmentation_masks");
            const e = new Le;
            Ge(e, jd, this.h);
            const i = new we;
            Ae(i, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),
            X(i, "IMAGE:image_in"),
            X(i, "NORM_RECT:norm_rect"),
            H(i, "NORM_LANDMARKS:normalized_landmarks"),
            H(i, "WORLD_LANDMARKS:world_landmarks"),
            i.o(e),
            Re(t, i),
            js(this, t),
            this.g.attachProtoVectorListener("normalized_landmarks", (s, n) => {
                this.landmarks = [];
                for (const r of s)
                    s = qi(r),
                    this.landmarks.push(Us(s));
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("normalized_landmarks", s => {
                this.landmarks = [],
                x(this, s)
            }
            ),
            this.g.attachProtoVectorListener("world_landmarks", (s, n) => {
                this.worldLandmarks = [];
                for (const r of s)
                    s = wi(r),
                    this.worldLandmarks.push(Gi(s));
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("world_landmarks", s => {
                this.worldLandmarks = [],
                x(this, s)
            }
            ),
            this.outputSegmentationMasks && (H(i, "SEGMENTATION_MASK:segmentation_masks"),
            xi(this, "segmentation_masks"),
            this.g.ba("segmentation_masks", (s, n) => {
                this.segmentationMasks = s.map(r => ki(this, r, !0, !this.s)),
                x(this, n)
            }
            ),
            this.g.attachEmptyPacketListener("segmentation_masks", s => {
                this.segmentationMasks = [],
                x(this, s)
            }
            )),
            t = t.g(),
            this.setGraph(new Uint8Array(t), !0)
        }
    }
    ;
    He.prototype.detectForVideo = He.prototype.F,
    He.prototype.detect = He.prototype.D,
    He.prototype.setOptions = He.prototype.o,
    He.createFromModelPath = function(t, e) {
        return O(He, t, {
            baseOptions: {
                modelAssetPath: e
            }
        })
    }
    ,
    He.createFromModelBuffer = function(t, e) {
        return O(He, t, {
            baseOptions: {
                modelAssetBuffer: e
            }
        })
    }
    ,
    He.createFromOptions = function(t, e) {
        return O(He, t, e)
    }
    ,
    He.POSE_CONNECTIONS = wh;
    var Yr = {}, Ki = {}, Ah;
    function Yd() {
        if (Ah)
            return Ki;
        Ah = 1,
        Object.defineProperty(Ki, "__esModule", {
            value: !0
        }),
        Ki.OneEuroFilter = void 0;
        class t {
            setAlpha(s) {
                (s <= 0 || s > 1) && console.log("alpha should be in (0.0., 1.0]"),
                this.a = s
            }
            constructor(s, n=0) {
                this.y = this.s = n,
                this.setAlpha(s),
                this.initialized = !1
            }
            filter(s) {
                let n;
                return this.initialized ? n = this.a * s + (1 - this.a) * this.s : (n = s,
                this.initialized = !0),
                this.y = s,
                this.s = n,
                n
            }
            filterWithAlpha(s, n) {
                return this.setAlpha(n),
                this.filter(s)
            }
            hasLastRawValue() {
                return this.initialized
            }
            lastRawValue() {
                return this.y
            }
            lastFilteredValue() {
                return this.s
            }
            reset() {
                this.initialized = !1
            }
        }
        let e = class {
            alpha(s) {
                let n = 1 / this.freq;
                return 1 / (1 + 1 / (2 * Math.PI * s) / n)
            }
            setFrequency(s) {
                s <= 0 && console.log("freq should be >0"),
                this.freq = s
            }
            setMinCutoff(s) {
                s <= 0 && console.log("mincutoff should be >0"),
                this.mincutoff = s
            }
            setBeta(s) {
                this.beta = s
            }
            setDerivateCutoff(s) {
                s <= 0 && console.log("dcutoff should be >0"),
                this.dcutoff = s
            }
            setParameters(s, n, r) {
                this.setFrequency(s),
                this.setMinCutoff(n),
                this.setBeta(r)
            }
            constructor(s, n=1, r=0, a=1) {
                this.setFrequency(s),
                this.setMinCutoff(n),
                this.setBeta(r),
                this.setDerivateCutoff(a),
                this.x = new t(this.alpha(n)),
                this.dx = new t(this.alpha(a)),
                this.lasttime = void 0
            }
            reset() {
                this.x.reset(),
                this.dx.reset(),
                this.lasttime = void 0
            }
            filter(s, n) {
                this.lasttime != null && n != null && (this.freq = 1 / (n - this.lasttime)),
                this.lasttime = n;
                let r = this.x.hasLastRawValue() ? (s - this.x.lastFilteredValue()) * this.freq : 0
                  , a = this.dx.filterWithAlpha(r, this.alpha(this.dcutoff))
                  , o = this.mincutoff + this.beta * Math.abs(a);
                return this.x.filterWithAlpha(s, this.alpha(o))
            }
        }
        ;
        return Ki.OneEuroFilter = e,
        Ki
    }
    var Rh;
    function Kd() {
        return Rh || (Rh = 1,
        function(t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.OneEuroFilter = void 0;
            var e = Yd();
            Object.defineProperty(t, "OneEuroFilter", {
                enumerable: !0,
                get: function() {
                    return e.OneEuroFilter
                }
            })
        }(Yr)),
        Yr
    }
    var oe = Kd();
    function Jd(t, e, i) {
        return Math.sign((i.x - e.x) * (t.y - e.y) - (i.y - e.y) * (t.x - e.x)) > 0
    }
    function Dh(t, e) {
        const i = Jd(t[5], t[13], t[0]);
        return e === "Left" ? i : !i
    }
    function Kr(t, e, i, s, n) {
        const r = new l.Vector3().subVectors(s, i)
          , a = new l.Vector3().subVectors(n, i)
          , o = new l.Vector3().crossVectors(r, a).normalize();
        return e !== "Left" && o.multiplyScalar(-1),
        t.up.copy(r.negate().normalize()),
        t.lookAt(t.position.clone().add(o)),
        t.updateMatrix(),
        o
    }
    function _d(t, e, i) {
        const s = t.z
          , n = t.clone().project(e);
        return n.x = (-n.x + 1) / 2,
        n.y = (-n.y + 1) / 2,
        _i(n, i),
        xt(n, s, e, !0)
    }
    function xt(t, e, i, s=!1) {
        const n = s ? 1 - t.x : t.x
          , a = new l.Vector3(n * 2 - 1,(1 - t.y) * 2 - 1,-1).unproject(i);
        Pe.position.copy(a),
        Pe.lookAt(i.position),
        Pe.updateMatrixWorld();
        const o = new l.Vector3;
        Pe.getWorldDirection(o);
        const h = Pe.position.z
          , d = (e - h) / o.z;
        return Pe.translateZ(d),
        Pe.updateMatrixWorld(),
        Pe.position.clone()
    }
    function Qd(t) {
        return 16.666666666666668 * t
    }
    function Oh(t, e, i) {
        const s = Qd(t.z)
          , n = i + s;
        return xt(t, -n, e, !0)
    }
    const Pe = new l.Object3D;
    function Qs(t, e, i) {
        Pe.position.copy(t),
        Pe.lookAt(i.position);
        const s = new l.Vector3;
        Pe.getWorldDirection(s);
        const a = (Pe.position.z - e) / s.z;
        Pe.translateZ(-a),
        t.copy(Pe.position)
    }
    new l.Raycaster;
    var k = (t => (t[t.Thumb = 0] = "Thumb",
    t[t.Index = 1] = "Index",
    t[t.Middle = 2] = "Middle",
    t[t.Ring = 3] = "Ring",
    t[t.Pinky = 4] = "Pinky",
    t))(k || {});
    const Hh = t => t >= 0 && t <= 4
      , $s = t => {
        if (!("finger"in t))
            return 3;
        if (typeof t.finger == "number") {
            const e = t.finger;
            return e < 0 || e > 4 ? 3 : e
        }
        if (typeof t.finger == "string") {
            const e = t.finger.toLowerCase();
            if (e.includes("thumb"))
                return 0;
            if (e.includes("index"))
                return 1;
            if (e.includes("middle"))
                return 2;
            if (e.includes("ring"))
                return 3;
            if (e.includes("pinky"))
                return 4
        }
        return 3
    }
      , qe = t => {
        switch (t) {
        case 0:
            return [1, 2, 3, 4];
        case 1:
            return [5, 6, 7, 8];
        case 2:
            return [9, 10, 11, 12];
        case 3:
            return [13, 14, 15, 16];
        case 4:
            return [17, 18, 19, 20]
        }
    }
      , Vh = t => t < 5 ? 0 : t < 9 ? 1 : t < 13 ? 2 : t < 17 ? 3 : 4
      , Ih = t => {
        switch (t) {
        case 0:
            return 1.25;
        case 1:
            return 1.15;
        case 2:
            return 1.2;
        case 3:
            return 1.1;
        case 4:
            return .9
        }
    }
      , Jr = t => Ih(t) / Ih(3)
      , Ji = (t, e) => (t = t.clone(),
    t.project(e),
    t.x = (t.x + 1) / 2,
    t.y = 1 - (t.y + 1) / 2,
    new l.Vector2(t.x,t.y));
    function $d(t, e, i) {
        const s = i.x - e.x
          , n = i.y - e.y
          , r = s * s + n * n;
        if (r === 0) {
            const u = t.x - e.x
              , f = t.y - e.y;
            return Math.hypot(u, f)
        }
        let a = ((t.x - e.x) * s + (t.y - e.y) * n) / r;
        a = Math.max(0, Math.min(1, a));
        const o = e.x + a * s
          , h = e.y + a * n
          , c = t.x - o
          , d = t.y - h;
        return Math.hypot(c, d)
    }
    const en = (t, e, i) => {
        const s = new l.Vector2(t.x,t.y)
          , n = new l.Vector2(e.x,e.y)
          , r = new l.Vector2(i.x,i.y)
          , a = new l.Vector2().subVectors(n, s)
          , o = a.length()
          , h = a.normalize()
          , d = new l.Vector2().subVectors(r, s).dot(h)
          , u = l.MathUtils.clamp(d, 0, o)
          , f = u / o;
        return {
            point: new l.Vector2().addVectors(s, h.multiplyScalar(u)),
            t: f
        }
    }
      , _i = (t, e) => {
        const i = 1 / e.textureScale[0]
          , s = 1 / e.textureScale[1]
          , n = (1 - i) / 2
          , r = (1 - s) / 2;
        return t.x = t.x * i + n,
        t.y = t.y * s + r,
        t
    }
      , zh = (t, e) => {
        const i = 1 / e.textureScale[0]
          , s = 1 / e.textureScale[1]
          , n = (1 - i) / 2
          , r = (1 - s) / 2;
        return t.x = (t.x - n) / i,
        t.y = (t.y - r) / s,
        t
    }
      , _r = []
      , Pi = async t => {
        var s, n;
        const e = !!(Blob && Blob.prototype && Blob.prototype.arrayBuffer);
        if ((s = navigator.connection) != null && s.saveData || ((n = navigator.connection) == null ? void 0 : n.effectiveType) === "cellular" || !e)
            return new Promise(r => r(t));
        const i = _r.find(r => r.url === t);
        if (i)
            return i.promise;
        console.info(`Preloading URL: ${t}`);
        try {
            const a = (async () => {
                const o = await fetch(t, {
                    credentials: "same-origin",
                    priority: "low"
                });
                if (!o.ok)
                    throw new Error(`Failed to fetch ${t}: ${o.status} ${o.statusText}`);
                const h = o.headers.get("Content-Type") ?? void 0
                  , c = await o.blob()
                  , d = new Blob([await c.arrayBuffer()],{
                    type: h
                })
                  , u = URL.createObjectURL(d);
                return console.info(`Preloaded URL (${t})`),
                u
            }
            )();
            return _r.push({
                url: t,
                promise: a
            }),
            a
        } catch (r) {
            throw console.error(`Error preloading URL (${t}):`, r),
            r
        }
    }
      , eu = () => _r;
    function Bt(t, e, i, s, n) {
        return l.MathUtils.clamp(l.MathUtils.mapLinear(t, e, i, s, n), s, n)
    }
    function tu(t, e) {
        return Math.atan2(Math.sin(t - e), Math.cos(t - e))
    }
    class Qr {
        constructor(e=60, i=1, s=16) {
            this.lastQuat = null,
            this.min = 1,
            this.max = 1,
            this.min = i,
            this.max = s,
            this.filters = Array(4).fill(null).map( () => new oe.OneEuroFilter(e,1,1,1))
        }
        filter(e, i, s=0) {
            const n = e.clone();
            if (this.lastQuat === null) {
                this.lastQuat = e.clone();
                return
            }
            this.lastQuat.dot(e) < 0 && (e.x = -e.x,
            e.y = -e.y,
            e.z = -e.z,
            e.w = -e.w);
            const r = l.MathUtils.lerp(this.max, this.min, s);
            if (this.filters.forEach(a => {
                a.setMinCutoff(r),
                a.setBeta(.001),
                a.setDerivateCutoff(.001)
            }
            ),
            e.set(this.filters[0].filter(e.x, i), this.filters[1].filter(e.y, i), this.filters[2].filter(e.z, i), this.filters[3].filter(e.w, i)).normalize(),
            isNaN(e.x) || isNaN(e.y) || isNaN(e.z) || isNaN(e.w)) {
                e.copy(n),
                this.lastQuat = n;
                return
            }
            this.lastQuat.copy(e)
        }
        reset() {
            this.filters.forEach(e => e.reset()),
            this.lastQuat = null
        }
    }
    /**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */
    class nt {
        constructor(e, i, s, n, r="div") {
            this.parent = e,
            this.object = i,
            this.property = s,
            this._disabled = !1,
            this._hidden = !1,
            this.initialValue = this.getValue(),
            this.domElement = document.createElement(r),
            this.domElement.classList.add("controller"),
            this.domElement.classList.add(n),
            this.$name = document.createElement("div"),
            this.$name.classList.add("name"),
            nt.nextNameID = nt.nextNameID || 0,
            this.$name.id = `lil-gui-name-${++nt.nextNameID}`,
            this.$widget = document.createElement("div"),
            this.$widget.classList.add("widget"),
            this.$disable = this.$widget,
            this.domElement.appendChild(this.$name),
            this.domElement.appendChild(this.$widget),
            this.domElement.addEventListener("keydown", a => a.stopPropagation()),
            this.domElement.addEventListener("keyup", a => a.stopPropagation()),
            this.parent.children.push(this),
            this.parent.controllers.push(this),
            this.parent.$children.appendChild(this.domElement),
            this._listenCallback = this._listenCallback.bind(this),
            this.name(s)
        }
        name(e) {
            return this._name = e,
            this.$name.textContent = e,
            this
        }
        onChange(e) {
            return this._onChange = e,
            this
        }
        _callOnChange() {
            this.parent._callOnChange(this),
            this._onChange !== void 0 && this._onChange.call(this, this.getValue()),
            this._changed = !0
        }
        onFinishChange(e) {
            return this._onFinishChange = e,
            this
        }
        _callOnFinishChange() {
            this._changed && (this.parent._callOnFinishChange(this),
            this._onFinishChange !== void 0 && this._onFinishChange.call(this, this.getValue())),
            this._changed = !1
        }
        reset() {
            return this.setValue(this.initialValue),
            this._callOnFinishChange(),
            this
        }
        enable(e=!0) {
            return this.disable(!e)
        }
        disable(e=!0) {
            return e === this._disabled ? this : (this._disabled = e,
            this.domElement.classList.toggle("disabled", e),
            this.$disable.toggleAttribute("disabled", e),
            this)
        }
        show(e=!0) {
            return this._hidden = !e,
            this.domElement.style.display = this._hidden ? "none" : "",
            this
        }
        hide() {
            return this.show(!1)
        }
        options(e) {
            const i = this.parent.add(this.object, this.property, e);
            return i.name(this._name),
            this.destroy(),
            i
        }
        min(e) {
            return this
        }
        max(e) {
            return this
        }
        step(e) {
            return this
        }
        decimals(e) {
            return this
        }
        listen(e=!0) {
            return this._listening = e,
            this._listenCallbackID !== void 0 && (cancelAnimationFrame(this._listenCallbackID),
            this._listenCallbackID = void 0),
            this._listening && this._listenCallback(),
            this
        }
        _listenCallback() {
            this._listenCallbackID = requestAnimationFrame(this._listenCallback);
            const e = this.save();
            e !== this._listenPrevValue && this.updateDisplay(),
            this._listenPrevValue = e
        }
        getValue() {
            return this.object[this.property]
        }
        setValue(e) {
            return this.getValue() !== e && (this.object[this.property] = e,
            this._callOnChange(),
            this.updateDisplay()),
            this
        }
        updateDisplay() {
            return this
        }
        load(e) {
            return this.setValue(e),
            this._callOnFinishChange(),
            this
        }
        save() {
            return this.getValue()
        }
        destroy() {
            this.listen(!1),
            this.parent.children.splice(this.parent.children.indexOf(this), 1),
            this.parent.controllers.splice(this.parent.controllers.indexOf(this), 1),
            this.parent.$children.removeChild(this.domElement)
        }
    }
    class iu extends nt {
        constructor(e, i, s) {
            super(e, i, s, "boolean", "label"),
            this.$input = document.createElement("input"),
            this.$input.setAttribute("type", "checkbox"),
            this.$input.setAttribute("aria-labelledby", this.$name.id),
            this.$widget.appendChild(this.$input),
            this.$input.addEventListener("change", () => {
                this.setValue(this.$input.checked),
                this._callOnFinishChange()
            }
            ),
            this.$disable = this.$input,
            this.updateDisplay()
        }
        updateDisplay() {
            return this.$input.checked = this.getValue(),
            this
        }
    }
    function $r(t) {
        let e, i;
        return (e = t.match(/(#|0x)?([a-f0-9]{6})/i)) ? i = e[2] : (e = t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/)) ? i = parseInt(e[1]).toString(16).padStart(2, 0) + parseInt(e[2]).toString(16).padStart(2, 0) + parseInt(e[3]).toString(16).padStart(2, 0) : (e = t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i)) && (i = e[1] + e[1] + e[2] + e[2] + e[3] + e[3]),
        i ? "#" + i : !1
    }
    const su = {
        isPrimitive: !0,
        match: t => typeof t == "string",
        fromHexString: $r,
        toHexString: $r
    }
      , Qi = {
        isPrimitive: !0,
        match: t => typeof t == "number",
        fromHexString: t => parseInt(t.substring(1), 16),
        toHexString: t => "#" + t.toString(16).padStart(6, 0)
    }
      , nu = [su, Qi, {
        isPrimitive: !1,
        match: t => Array.isArray(t),
        fromHexString(t, e, i=1) {
            const s = Qi.fromHexString(t);
            e[0] = (s >> 16 & 255) / 255 * i,
            e[1] = (s >> 8 & 255) / 255 * i,
            e[2] = (s & 255) / 255 * i
        },
        toHexString([t,e,i], s=1) {
            s = 255 / s;
            const n = t * s << 16 ^ e * s << 8 ^ i * s << 0;
            return Qi.toHexString(n)
        }
    }, {
        isPrimitive: !1,
        match: t => Object(t) === t,
        fromHexString(t, e, i=1) {
            const s = Qi.fromHexString(t);
            e.r = (s >> 16 & 255) / 255 * i,
            e.g = (s >> 8 & 255) / 255 * i,
            e.b = (s & 255) / 255 * i
        },
        toHexString({r: t, g: e, b: i}, s=1) {
            s = 255 / s;
            const n = t * s << 16 ^ e * s << 8 ^ i * s << 0;
            return Qi.toHexString(n)
        }
    }];
    function ru(t) {
        return nu.find(e => e.match(t))
    }
    class au extends nt {
        constructor(e, i, s, n) {
            super(e, i, s, "color"),
            this.$input = document.createElement("input"),
            this.$input.setAttribute("type", "color"),
            this.$input.setAttribute("tabindex", -1),
            this.$input.setAttribute("aria-labelledby", this.$name.id),
            this.$text = document.createElement("input"),
            this.$text.setAttribute("type", "text"),
            this.$text.setAttribute("spellcheck", "false"),
            this.$text.setAttribute("aria-labelledby", this.$name.id),
            this.$display = document.createElement("div"),
            this.$display.classList.add("display"),
            this.$display.appendChild(this.$input),
            this.$widget.appendChild(this.$display),
            this.$widget.appendChild(this.$text),
            this._format = ru(this.initialValue),
            this._rgbScale = n,
            this._initialValueHexString = this.save(),
            this._textFocused = !1,
            this.$input.addEventListener("input", () => {
                this._setValueFromHexString(this.$input.value)
            }
            ),
            this.$input.addEventListener("blur", () => {
                this._callOnFinishChange()
            }
            ),
            this.$text.addEventListener("input", () => {
                const r = $r(this.$text.value);
                r && this._setValueFromHexString(r)
            }
            ),
            this.$text.addEventListener("focus", () => {
                this._textFocused = !0,
                this.$text.select()
            }
            ),
            this.$text.addEventListener("blur", () => {
                this._textFocused = !1,
                this.updateDisplay(),
                this._callOnFinishChange()
            }
            ),
            this.$disable = this.$text,
            this.updateDisplay()
        }
        reset() {
            return this._setValueFromHexString(this._initialValueHexString),
            this
        }
        _setValueFromHexString(e) {
            if (this._format.isPrimitive) {
                const i = this._format.fromHexString(e);
                this.setValue(i)
            } else
                this._format.fromHexString(e, this.getValue(), this._rgbScale),
                this._callOnChange(),
                this.updateDisplay()
        }
        save() {
            return this._format.toHexString(this.getValue(), this._rgbScale)
        }
        load(e) {
            return this._setValueFromHexString(e),
            this._callOnFinishChange(),
            this
        }
        updateDisplay() {
            return this.$input.value = this._format.toHexString(this.getValue(), this._rgbScale),
            this._textFocused || (this.$text.value = this.$input.value.substring(1)),
            this.$display.style.backgroundColor = this.$input.value,
            this
        }
    }
    class ea extends nt {
        constructor(e, i, s) {
            super(e, i, s, "function"),
            this.$button = document.createElement("button"),
            this.$button.appendChild(this.$name),
            this.$widget.appendChild(this.$button),
            this.$button.addEventListener("click", n => {
                n.preventDefault(),
                this.getValue().call(this.object),
                this._callOnChange()
            }
            ),
            this.$button.addEventListener("touchstart", () => {}
            , {
                passive: !0
            }),
            this.$disable = this.$button
        }
    }
    class ou extends nt {
        constructor(e, i, s, n, r, a) {
            super(e, i, s, "number"),
            this._initInput(),
            this.min(n),
            this.max(r);
            const o = a !== void 0;
            this.step(o ? a : this._getImplicitStep(), o),
            this.updateDisplay()
        }
        decimals(e) {
            return this._decimals = e,
            this.updateDisplay(),
            this
        }
        min(e) {
            return this._min = e,
            this._onUpdateMinMax(),
            this
        }
        max(e) {
            return this._max = e,
            this._onUpdateMinMax(),
            this
        }
        step(e, i=!0) {
            return this._step = e,
            this._stepExplicit = i,
            this
        }
        updateDisplay() {
            const e = this.getValue();
            if (this._hasSlider) {
                let i = (e - this._min) / (this._max - this._min);
                i = Math.max(0, Math.min(i, 1)),
                this.$fill.style.width = i * 100 + "%"
            }
            return this._inputFocused || (this.$input.value = this._decimals === void 0 ? e : e.toFixed(this._decimals)),
            this
        }
        _initInput() {
            this.$input = document.createElement("input"),
            this.$input.setAttribute("type", "text"),
            this.$input.setAttribute("aria-labelledby", this.$name.id),
            window.matchMedia("(pointer: coarse)").matches && (this.$input.setAttribute("type", "number"),
            this.$input.setAttribute("step", "any")),
            this.$widget.appendChild(this.$input),
            this.$disable = this.$input;
            const i = () => {
                let v = parseFloat(this.$input.value);
                isNaN(v) || (this._stepExplicit && (v = this._snap(v)),
                this.setValue(this._clamp(v)))
            }
              , s = v => {
                const D = parseFloat(this.$input.value);
                isNaN(D) || (this._snapClampSetValue(D + v),
                this.$input.value = this.getValue())
            }
              , n = v => {
                v.key === "Enter" && this.$input.blur(),
                v.code === "ArrowUp" && (v.preventDefault(),
                s(this._step * this._arrowKeyMultiplier(v))),
                v.code === "ArrowDown" && (v.preventDefault(),
                s(this._step * this._arrowKeyMultiplier(v) * -1))
            }
              , r = v => {
                this._inputFocused && (v.preventDefault(),
                s(this._step * this._normalizeMouseWheel(v)))
            }
            ;
            let a = !1, o, h, c, d, u;
            const f = 5
              , g = v => {
                o = v.clientX,
                h = c = v.clientY,
                a = !0,
                d = this.getValue(),
                u = 0,
                window.addEventListener("mousemove", y),
                window.addEventListener("mouseup", b)
            }
              , y = v => {
                if (a) {
                    const D = v.clientX - o
                      , V = v.clientY - h;
                    Math.abs(V) > f ? (v.preventDefault(),
                    this.$input.blur(),
                    a = !1,
                    this._setDraggingStyle(!0, "vertical")) : Math.abs(D) > f && b()
                }
                if (!a) {
                    const D = v.clientY - c;
                    u -= D * this._step * this._arrowKeyMultiplier(v),
                    d + u > this._max ? u = this._max - d : d + u < this._min && (u = this._min - d),
                    this._snapClampSetValue(d + u)
                }
                c = v.clientY
            }
              , b = () => {
                this._setDraggingStyle(!1, "vertical"),
                this._callOnFinishChange(),
                window.removeEventListener("mousemove", y),
                window.removeEventListener("mouseup", b)
            }
              , w = () => {
                this._inputFocused = !0
            }
              , p = () => {
                this._inputFocused = !1,
                this.updateDisplay(),
                this._callOnFinishChange()
            }
            ;
            this.$input.addEventListener("input", i),
            this.$input.addEventListener("keydown", n),
            this.$input.addEventListener("wheel", r, {
                passive: !1
            }),
            this.$input.addEventListener("mousedown", g),
            this.$input.addEventListener("focus", w),
            this.$input.addEventListener("blur", p)
        }
        _initSlider() {
            this._hasSlider = !0,
            this.$slider = document.createElement("div"),
            this.$slider.classList.add("slider"),
            this.$fill = document.createElement("div"),
            this.$fill.classList.add("fill"),
            this.$slider.appendChild(this.$fill),
            this.$widget.insertBefore(this.$slider, this.$input),
            this.domElement.classList.add("hasSlider");
            const e = (p, v, D, V, ee) => (p - v) / (D - v) * (ee - V) + V
              , i = p => {
                const v = this.$slider.getBoundingClientRect();
                let D = e(p, v.left, v.right, this._min, this._max);
                this._snapClampSetValue(D)
            }
              , s = p => {
                this._setDraggingStyle(!0),
                i(p.clientX),
                window.addEventListener("mousemove", n),
                window.addEventListener("mouseup", r)
            }
              , n = p => {
                i(p.clientX)
            }
              , r = () => {
                this._callOnFinishChange(),
                this._setDraggingStyle(!1),
                window.removeEventListener("mousemove", n),
                window.removeEventListener("mouseup", r)
            }
            ;
            let a = !1, o, h;
            const c = p => {
                p.preventDefault(),
                this._setDraggingStyle(!0),
                i(p.touches[0].clientX),
                a = !1
            }
              , d = p => {
                p.touches.length > 1 || (this._hasScrollBar ? (o = p.touches[0].clientX,
                h = p.touches[0].clientY,
                a = !0) : c(p),
                window.addEventListener("touchmove", u, {
                    passive: !1
                }),
                window.addEventListener("touchend", f))
            }
              , u = p => {
                if (a) {
                    const v = p.touches[0].clientX - o
                      , D = p.touches[0].clientY - h;
                    Math.abs(v) > Math.abs(D) ? c(p) : (window.removeEventListener("touchmove", u),
                    window.removeEventListener("touchend", f))
                } else
                    p.preventDefault(),
                    i(p.touches[0].clientX)
            }
              , f = () => {
                this._callOnFinishChange(),
                this._setDraggingStyle(!1),
                window.removeEventListener("touchmove", u),
                window.removeEventListener("touchend", f)
            }
              , g = this._callOnFinishChange.bind(this)
              , y = 400;
            let b;
            const w = p => {
                if (Math.abs(p.deltaX) < Math.abs(p.deltaY) && this._hasScrollBar)
                    return;
                p.preventDefault();
                const D = this._normalizeMouseWheel(p) * this._step;
                this._snapClampSetValue(this.getValue() + D),
                this.$input.value = this.getValue(),
                clearTimeout(b),
                b = setTimeout(g, y)
            }
            ;
            this.$slider.addEventListener("mousedown", s),
            this.$slider.addEventListener("touchstart", d, {
                passive: !1
            }),
            this.$slider.addEventListener("wheel", w, {
                passive: !1
            })
        }
        _setDraggingStyle(e, i="horizontal") {
            this.$slider && this.$slider.classList.toggle("active", e),
            document.body.classList.toggle("lil-gui-dragging", e),
            document.body.classList.toggle(`lil-gui-${i}`, e)
        }
        _getImplicitStep() {
            return this._hasMin && this._hasMax ? (this._max - this._min) / 1e3 : .1
        }
        _onUpdateMinMax() {
            !this._hasSlider && this._hasMin && this._hasMax && (this._stepExplicit || this.step(this._getImplicitStep(), !1),
            this._initSlider(),
            this.updateDisplay())
        }
        _normalizeMouseWheel(e) {
            let {deltaX: i, deltaY: s} = e;
            return Math.floor(e.deltaY) !== e.deltaY && e.wheelDelta && (i = 0,
            s = -e.wheelDelta / 120,
            s *= this._stepExplicit ? 1 : 10),
            i + -s
        }
        _arrowKeyMultiplier(e) {
            let i = this._stepExplicit ? 1 : 10;
            return e.shiftKey ? i *= 10 : e.altKey && (i /= 10),
            i
        }
        _snap(e) {
            let i = 0;
            return this._hasMin ? i = this._min : this._hasMax && (i = this._max),
            e -= i,
            e = Math.round(e / this._step) * this._step,
            e += i,
            e = parseFloat(e.toPrecision(15)),
            e
        }
        _clamp(e) {
            return e < this._min && (e = this._min),
            e > this._max && (e = this._max),
            e
        }
        _snapClampSetValue(e) {
            this.setValue(this._clamp(this._snap(e)))
        }
        get _hasScrollBar() {
            const e = this.parent.root.$children;
            return e.scrollHeight > e.clientHeight
        }
        get _hasMin() {
            return this._min !== void 0
        }
        get _hasMax() {
            return this._max !== void 0
        }
    }
    class lu extends nt {
        constructor(e, i, s, n) {
            super(e, i, s, "option"),
            this.$select = document.createElement("select"),
            this.$select.setAttribute("aria-labelledby", this.$name.id),
            this.$display = document.createElement("div"),
            this.$display.classList.add("display"),
            this.$select.addEventListener("change", () => {
                this.setValue(this._values[this.$select.selectedIndex]),
                this._callOnFinishChange()
            }
            ),
            this.$select.addEventListener("focus", () => {
                this.$display.classList.add("focus")
            }
            ),
            this.$select.addEventListener("blur", () => {
                this.$display.classList.remove("focus")
            }
            ),
            this.$widget.appendChild(this.$select),
            this.$widget.appendChild(this.$display),
            this.$disable = this.$select,
            this.options(n)
        }
        options(e) {
            return this._values = Array.isArray(e) ? e : Object.values(e),
            this._names = Array.isArray(e) ? e : Object.keys(e),
            this.$select.replaceChildren(),
            this._names.forEach(i => {
                const s = document.createElement("option");
                s.textContent = i,
                this.$select.appendChild(s)
            }
            ),
            this.updateDisplay(),
            this
        }
        updateDisplay() {
            const e = this.getValue()
              , i = this._values.indexOf(e);
            return this.$select.selectedIndex = i,
            this.$display.textContent = i === -1 ? e : this._names[i],
            this
        }
    }
    class hu extends nt {
        constructor(e, i, s) {
            super(e, i, s, "string"),
            this.$input = document.createElement("input"),
            this.$input.setAttribute("type", "text"),
            this.$input.setAttribute("spellcheck", "false"),
            this.$input.setAttribute("aria-labelledby", this.$name.id),
            this.$input.addEventListener("input", () => {
                this.setValue(this.$input.value)
            }
            ),
            this.$input.addEventListener("keydown", n => {
                n.code === "Enter" && this.$input.blur()
            }
            ),
            this.$input.addEventListener("blur", () => {
                this._callOnFinishChange()
            }
            ),
            this.$widget.appendChild(this.$input),
            this.$disable = this.$input,
            this.updateDisplay()
        }
        updateDisplay() {
            return this.$input.value = this.getValue(),
            this
        }
    }
    var cu = `.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;
    function du(t) {
        const e = document.createElement("style");
        e.innerHTML = t;
        const i = document.querySelector("head link[rel=stylesheet], head style");
        i ? document.head.insertBefore(e, i) : document.head.appendChild(e)
    }
    let Bh = !1;
    class ta {
        constructor({parent: e, autoPlace: i=e === void 0, container: s, width: n, title: r="Controls", closeFolders: a=!1, injectStyles: o=!0, touchStyles: h=!0}={}) {
            if (this.parent = e,
            this.root = e ? e.root : this,
            this.children = [],
            this.controllers = [],
            this.folders = [],
            this._closed = !1,
            this._hidden = !1,
            this.domElement = document.createElement("div"),
            this.domElement.classList.add("lil-gui"),
            this.$title = document.createElement("button"),
            this.$title.classList.add("title"),
            this.$title.setAttribute("aria-expanded", !0),
            this.$title.addEventListener("click", () => this.openAnimated(this._closed)),
            this.$title.addEventListener("touchstart", () => {}
            , {
                passive: !0
            }),
            this.$children = document.createElement("div"),
            this.$children.classList.add("children"),
            this.domElement.appendChild(this.$title),
            this.domElement.appendChild(this.$children),
            this.title(r),
            this.parent) {
                this.parent.children.push(this),
                this.parent.folders.push(this),
                this.parent.$children.appendChild(this.domElement);
                return
            }
            this.domElement.classList.add("root"),
            h && this.domElement.classList.add("allow-touch-styles"),
            !Bh && o && (du(cu),
            Bh = !0),
            s ? s.appendChild(this.domElement) : i && (this.domElement.classList.add("autoPlace"),
            document.body.appendChild(this.domElement)),
            n && this.domElement.style.setProperty("--width", n + "px"),
            this._closeFolders = a
        }
        add(e, i, s, n, r) {
            if (Object(s) === s)
                return new lu(this,e,i,s);
            const a = e[i];
            switch (typeof a) {
            case "number":
                return new ou(this,e,i,s,n,r);
            case "boolean":
                return new iu(this,e,i);
            case "string":
                return new hu(this,e,i);
            case "function":
                return new ea(this,e,i)
            }
            console.error(`gui.add failed
	property:`, i, `
	object:`, e, `
	value:`, a)
        }
        addColor(e, i, s=1) {
            return new au(this,e,i,s)
        }
        addFolder(e) {
            const i = new ta({
                parent: this,
                title: e
            });
            return this.root._closeFolders && i.close(),
            i
        }
        load(e, i=!0) {
            return e.controllers && this.controllers.forEach(s => {
                s instanceof ea || s._name in e.controllers && s.load(e.controllers[s._name])
            }
            ),
            i && e.folders && this.folders.forEach(s => {
                s._title in e.folders && s.load(e.folders[s._title])
            }
            ),
            this
        }
        save(e=!0) {
            const i = {
                controllers: {},
                folders: {}
            };
            return this.controllers.forEach(s => {
                if (!(s instanceof ea)) {
                    if (s._name in i.controllers)
                        throw new Error(`Cannot save GUI with duplicate property "${s._name}"`);
                    i.controllers[s._name] = s.save()
                }
            }
            ),
            e && this.folders.forEach(s => {
                if (s._title in i.folders)
                    throw new Error(`Cannot save GUI with duplicate folder "${s._title}"`);
                i.folders[s._title] = s.save()
            }
            ),
            i
        }
        open(e=!0) {
            return this._setClosed(!e),
            this.$title.setAttribute("aria-expanded", !this._closed),
            this.domElement.classList.toggle("closed", this._closed),
            this
        }
        close() {
            return this.open(!1)
        }
        _setClosed(e) {
            this._closed !== e && (this._closed = e,
            this._callOnOpenClose(this))
        }
        show(e=!0) {
            return this._hidden = !e,
            this.domElement.style.display = this._hidden ? "none" : "",
            this
        }
        hide() {
            return this.show(!1)
        }
        openAnimated(e=!0) {
            return this._setClosed(!e),
            this.$title.setAttribute("aria-expanded", !this._closed),
            requestAnimationFrame( () => {
                const i = this.$children.clientHeight;
                this.$children.style.height = i + "px",
                this.domElement.classList.add("transition");
                const s = r => {
                    r.target === this.$children && (this.$children.style.height = "",
                    this.domElement.classList.remove("transition"),
                    this.$children.removeEventListener("transitionend", s))
                }
                ;
                this.$children.addEventListener("transitionend", s);
                const n = e ? this.$children.scrollHeight : 0;
                this.domElement.classList.toggle("closed", !e),
                requestAnimationFrame( () => {
                    this.$children.style.height = n + "px"
                }
                )
            }
            ),
            this
        }
        title(e) {
            return this._title = e,
            this.$title.textContent = e,
            this
        }
        reset(e=!0) {
            return (e ? this.controllersRecursive() : this.controllers).forEach(s => s.reset()),
            this
        }
        onChange(e) {
            return this._onChange = e,
            this
        }
        _callOnChange(e) {
            this.parent && this.parent._callOnChange(e),
            this._onChange !== void 0 && this._onChange.call(this, {
                object: e.object,
                property: e.property,
                value: e.getValue(),
                controller: e
            })
        }
        onFinishChange(e) {
            return this._onFinishChange = e,
            this
        }
        _callOnFinishChange(e) {
            this.parent && this.parent._callOnFinishChange(e),
            this._onFinishChange !== void 0 && this._onFinishChange.call(this, {
                object: e.object,
                property: e.property,
                value: e.getValue(),
                controller: e
            })
        }
        onOpenClose(e) {
            return this._onOpenClose = e,
            this
        }
        _callOnOpenClose(e) {
            this.parent && this.parent._callOnOpenClose(e),
            this._onOpenClose !== void 0 && this._onOpenClose.call(this, e)
        }
        destroy() {
            this.parent && (this.parent.children.splice(this.parent.children.indexOf(this), 1),
            this.parent.folders.splice(this.parent.folders.indexOf(this), 1)),
            this.domElement.parentElement && this.domElement.parentElement.removeChild(this.domElement),
            Array.from(this.children).forEach(e => e.destroy())
        }
        controllersRecursive() {
            let e = Array.from(this.controllers);
            return this.folders.forEach(i => {
                e = e.concat(i.controllersRecursive())
            }
            ),
            e
        }
        foldersRecursive() {
            let e = Array.from(this.folders);
            return this.folders.forEach(i => {
                e = e.concat(i.foldersRecursive())
            }
            ),
            e
        }
    }
    const uu = {
        fov: 27.5,
        showHandMask: !1,
        useUltraleap: !0,
        cameraDelay: 30,
        minHandDistance: 8,
        ringOnFingerOffset: .62,
        maskThreshold: .903,
        maskRange: .105,
        mpSnappiness: .2,
        mpZ: -5,
        mpWorldZFactor: 1,
        pitchOffset: -2.3,
        yawOffset: 0,
        rollOffset: 0,
        ulX: -.9,
        ulY: -6.9,
        ulZ: 0,
        ulPitch: -5.58,
        ulZFactor: .75,
        ulRefineRingOffsetPitch: 0,
        ulRefineRingOffsetYaw: -11.43,
        ulRefineRingYawFactor: 1,
        whiteBalance: 2e3,
        autoWhiteBalance: !0,
        focus: 74,
        autoFocus: !1,
        exposureCompensation: 3,
        exposureTime: 14964,
        sensorIso: 512,
        saturation: -1,
        brightness: 0,
        contrast: 0,
        sharpness: 4,
        lumaDenoise: 0,
        chromaDenoise: 0,
        useDepthCamera: !1,
        depthX: .26,
        depthY: 6.2,
        depthZ: 8.6,
        depthPitch: -8,
        depthYaw: 1.45,
        depthRoll: 2,
        depthFov: 10,
        depthFovH: 81,
        depthFovV: 62.46,
        depthFixArtifacts: !0,
        depthCameraDelay: 3,
        depthRingOffsetPitch: 0,
        depthRingOffsetYaw: .9,
        depthZFactor: .48,
        showUltraleapHand: !0,
        ulUseRefinedUltraleapRotation: !0,
        centerRing: !1,
        autoExposure: !1,
        virtualColorTemperature: 7008,
        virtualColorTemperatureStrength: 0,
        mpZFactor: 1,
        debug: !0,
        zoom: 1,
        frequency: 144,
        minCutoff: 1,
        beta: 1,
        derivateCutoff: 1,
        depthMinCutoff: 4,
        depthBeta: 4,
        depthDerivateCutoff: 4,
        scale: .7575,
        mirrorLandmarks: !0,
        fingerWidthSampleCount: 5,
        maxHandMovement: 6.09,
        hueRange: 81.72,
        saturationRange: 39.4,
        valueRange: 28.6,
        maxHandDistance: 50,
        shadowSaturation: .788,
        shadowLightness: 0,
        shadowContrast: 0,
        shadowOffset: .296,
        shadowPower: 5.6,
        mirrorDepth: !1,
        debugX1: -2,
        debugY1: 0,
        debugZ1: 0,
        debugX2: 0,
        debugY2: 0,
        debugZ2: -60,
        debugValue: -148,
        fixedFingerWidth: !1,
        depthPlaneZDisplacement: -4.6,
        effectMode: "OFF",
        sceneMode: "LANDSCAPE",
        camera: "Luxonis UVC Camera (03e7:f63b)",
        depthFovMultiplier: .66,
        ulYaw: 2.8,
        ulFov: 161.6,
        ringOffsetX: 1,
        ringOffsetY: 0,
        yawLerp: 1,
        ringPosY: 0,
        ulRoll: 6.4
    }
      , m = class m {
        static init(e) {
            m.serverManager = e,
            Object.assign(m, uu),
            m.initGui(),
            m.bindEvents()
        }
        static initGui() {
            m.gui = new ta({
                title: "🐞 In-Store Try-On GUI",
                width: 300
            });
            const {gui: e} = m;
            e.domElement.style.right = "0",
            e.add(m, "fov", 10, 100).name("FOV"),
            e.add(m, "minHandDistance", 0, 15, .1).name("Min Hand Distance"),
            e.add(m, "showHandMask").name("Show Hand Mask"),
            e.add(m, "useUltraleap").name("Use Ultraleap"),
            e.add(m, "cameraDelay", 0, 100, 1).name("Camera Delay"),
            e.add(m, "ringOnFingerOffset", 0, 1, .01).name("Ring On Finger Offset");
            const i = e.addFolder("Color Camera");
            i.add(m, "whiteBalance", 2e3, 7e3, 1).name("White Balance"),
            i.add(m, "autoWhiteBalance").name("Auto White Balance"),
            this.focusGui = i.add(m, "focus", 0, 255, 1).name("Focus"),
            i.add(m, "autoFocus").name("Auto Focus from Leap Distance"),
            m.exposureCompensationGui = i.add(m, "exposureCompensation", -9, 9, 1).name("Exposure Compensation"),
            i.add(m, "exposureTime", 1, 33e3, 1).name("Exposure Time"),
            i.add(m, "sensorIso", 100, 1600, 1).name("Sensor ISO"),
            i.add(m, "saturation", -10, 10, 1).name("Saturation"),
            i.add(m, "brightness", -10, 10, 1).name("Brightness"),
            i.add(m, "contrast", -10, 10, 1).name("Contrast"),
            i.add(m, "sharpness", 0, 4, 1).name("Sharpness"),
            i.add(m, "lumaDenoise", 0, 4, 1).name("Luma Denoise"),
            i.add(m, "chromaDenoise", 0, 4, 1).name("Chroma Denoise");
            let s;
            i.onChange( () => {
                clearTimeout(s),
                s = setTimeout(m.sendUpdatedColorCameraSettings, 100)
            }
            );
            const n = e.addFolder("Ultraleap")
              , r = n.addFolder("Ultraleap Calibration").close();
            r.add(m, "ulX", -15, 15).name("UL Position X"),
            r.add(m, "ulY", -15, 15).name("UL Position Y"),
            r.add(m, "ulZ", -15, 15).name("UL Position Z"),
            r.add(m, "ulPitch", -90, 90).name("UL Offset Pitch");
            const a = n.addFolder("Ultraleap Ring Correction").close();
            a.add(m, "ulRefineRingOffsetPitch", -45, 45).name("UL Refine Ring Offset Pitch"),
            a.add(m, "ulRefineRingOffsetYaw", -45, 45).name("UL Refine Ring Offset Yaw"),
            a.add(m, "ulRefineRingYawFactor", 0, 1).name("UL Refine Ring Yaw Factor"),
            a.add(m, "ulZFactor", 0, 5).name("UL Z Factor");
            const o = e.addFolder("Segmentation");
            o.add(m, "maskThreshold", 0, 3).name("Mask Threshold"),
            o.add(m, "maskRange", .001, 1, .001).name("Mask Range");
            const h = e.addFolder("MediaPipe Ring Correction").close();
            h.add(m, "mpSnappiness", 0, 1, .01).name("MP Snappiness"),
            h.add(m, "mpZ", -10, 10, .05).name("MP Z"),
            h.add(m, "mpWorldZFactor", 0, 5).name("World Z Factor"),
            h.add(m, "pitchOffset", -15, 15, .1).name("Pitch Offset"),
            h.add(m, "yawOffset", -15, 15).name("Yaw Offset"),
            h.add(m, "rollOffset", -15, 15).name("Roll Offset"),
            e.onFinishChange( () => {
                const y = e.save();
                localStorage.setItem("guiState", JSON.stringify(y))
            }
            );
            const c = localStorage.getItem("guiState") ?? "{}"
              , d = JSON.parse(c);
            e.load(d);
            const u = () => {
                window.confirm("Are you sure you want to reset the GUI settings?") && (localStorage.removeItem("guiState"),
                e.reset())
            }
              , f = () => {
                const y = {};
                Object.entries(m).filter( ([,b]) => typeof b != "function" && typeof b != "object").forEach( ([b,w]) => {
                    y[b] = w
                }
                ),
                console.log(JSON.stringify(y, null, 2))
            }
            ;
            e.add({
                resetGui: u
            }, "resetGui").name("Reset"),
            e.add({
                dumpConfig: f
            }, "dumpConfig").name("Dump Config");
            const g = m.gui.domElement;
            g.style.overflowY = "auto",
            g.style.display = "none"
        }
        static bindEvents() {
            window.addEventListener("keydown", m.handleKeyEvents)
        }
        static handleKeyEvents(e) {
            if (e.key === "Tab") {
                const i = m.gui.domElement;
                i.style.display = i.style.display === "none" ? "block" : "none",
                e.preventDefault(),
                e.stopPropagation()
            }
        }
        static resetGUI() {
            localStorage.removeItem("guiState"),
            this.gui.reset()
        }
        static dumpConfig() {
            const e = Object.entries(m).filter( ([,i]) => typeof i != "function" && typeof i != "object");
            console.log(JSON.stringify(e, null, 2))
        }
        static saveConfig() {
            const e = m.gui.save();
            localStorage.setItem("guiState", JSON.stringify(e))
        }
        static sendUpdatedColorCameraSettings() {
            var i;
            if (!m.serverManager)
                return;
            const e = {
                type: "colorCameraSettings",
                whiteBalance: m.whiteBalance,
                autoWhiteBalance: m.autoWhiteBalance,
                focus: m.focus,
                autoFocus: m.autoFocus,
                exposureCompensation: m.exposureCompensation,
                exposureTime: m.exposureTime,
                sensorIso: m.sensorIso,
                saturation: m.saturation,
                brightness: m.brightness,
                contrast: m.contrast,
                sharpness: m.sharpness,
                lumaDenoise: m.lumaDenoise,
                chromaDenoise: m.chromaDenoise
            };
            (i = m.serverManager.rtcManager) == null || i.sendMessageToServer(JSON.stringify(e))
        }
    }
    ;
    m.fov = 45,
    m.showHandMask = !1,
    m.useUltraleap = !0,
    m.cameraDelay = 0,
    m.minHandDistance = 7.5,
    m.ringOnFingerOffset = .65,
    m.maskThreshold = .8,
    m.maskRange = .2,
    m.mpSnappiness = .8,
    m.mpZ = 0,
    m.mpWorldZFactor = 1,
    m.pitchOffset = 0,
    m.yawOffset = 0,
    m.rollOffset = 0,
    m.ulX = -14,
    m.ulY = 24,
    m.ulZ = 0,
    m.ulPitch = 3.6,
    m.ulZFactor = 1,
    m.ulRefineRingOffsetPitch = 0,
    m.ulRefineRingOffsetYaw = 0,
    m.ulRefineRingYawFactor = 1,
    m.whiteBalance = 4700,
    m.autoWhiteBalance = !0,
    m.focus = 127,
    m.autoFocus = !0,
    m.exposureCompensation = 0,
    m.exposureTime = 1e4,
    m.sensorIso = 100,
    m.saturation = 0,
    m.brightness = 0,
    m.contrast = 0,
    m.sharpness = 1,
    m.lumaDenoise = 1,
    m.chromaDenoise = 1,
    m.useDepthCamera = !0,
    m.depthX = -.0329,
    m.depthY = .0042,
    m.depthZ = .001,
    m.depthPitch = -4.6,
    m.depthYaw = 2.6,
    m.depthRoll = 0,
    m.depthFov = 10,
    m.depthFovH = 62.5,
    m.depthFovV = 38,
    m.depthFixArtifacts = !0,
    m.depthCameraDelay = 0,
    m.depthRingOffsetPitch = 0,
    m.depthRingOffsetYaw = 0,
    m.depthZFactor = 1;
    let T = m;
    const Ee = new l.Object3D
      , Wh = {
        13: .15,
        14: .15,
        15: .15
    }
      , ln = class ln {
        constructor(e, i) {
            this.filterLandmarks3D = !0,
            this.landmarks = new Array(21).fill(null).map( () => new l.Vector3),
            this.landmarks3D = new Array(21).fill(null).map( () => new l.Vector3),
            this.distance = 0,
            this.worldLandmarks = new Array(21).fill(null).map( () => new l.Vector3),
            this.targetWorldLandmarks = new Array(21).fill(null).map( () => new l.Vector3),
            this.rotationLandmarks3D = new Array(21).fill(null).map( () => new l.Vector3),
            this.targetLandmarks = new Array(21).fill(null).map( () => new l.Vector3),
            this.targetLandmarks3D = new Array(21).fill(null).map( () => new l.Vector3),
            this.handednessValue = .5,
            this.handednessWeight = 1,
            this.samplesPerSecond = 1,
            this.lastSuccessTime = 0,
            this.landmarksFilters = new Array(21 * 3).fill(null).map( () => new oe.OneEuroFilter(60,1,.1,1)),
            this.worldLandmarksFilters = new Array(21 * 3).fill(null).map( () => new oe.OneEuroFilter(60,1,.1,1)),
            this.landmarks3DFilters = new Array(21 * 3).fill(null).map( () => new oe.OneEuroFilter(60,1,4,1)),
            this.distanceFilter = new oe.OneEuroFilter(60,1,1,1),
            this.landmarkMovement = Array(21).fill(0),
            this.landmarkMovementFilters = Array(21).fill(null).map( () => new oe.OneEuroFilter(60,1,3,1)),
            this.movementLandmarks = new Array(21).fill(null).map( () => new l.Vector3(-1,-1,-1)),
            this.lastMovementLandmarks = new Array(21).fill(null).map( () => new l.Vector3),
            this.movementLandmarksFilters = new Array(21 * 3).fill(null).map( () => new oe.OneEuroFilter(60,1,3,1)),
            this.quaternions = Array(5).fill(null).map( () => new l.Quaternion),
            this.quaternionFilters = Array(5).fill(null).map( () => new Qr(60,4,12)),
            this.finger = k.Ring,
            this.currentDebugEntries = [],
            this.camera = e,
            this.videoFeed = i
        }
        getMovementFactorFromLandmarkMovement(e) {
            const i = Math.max(e, 1e-4)
              , s = Bt(this.samplesPerSecond, 10, 100, 2, 1.5);
            let n = Bt(this.samplesPerSecond, 10, 100, 20, 80);
            return n *= T.mpSnappiness,
            Math.exp(-n * i ** s)
        }
        getLandmarkMovementFactor(e) {
            return this.getMovementFactorFromLandmarkMovement(this.landmarkMovement[e])
        }
        getLandmarkMovement(e) {
            return this.landmarkMovement[e]
        }
        processResult(e, i) {
            if (!e || e.landmarks.length === 0) {
                this.reset();
                return
            }
            const {categoryName: s, score: n} = e.handedness[0][0];
            if (n < .5) {
                this.reset();
                return
            }
            this.lastSuccessTime = performance.now(),
            this.samplesPerSecond = i;
            const r = e.landmarks[0].map( ({x: c, y: d, z: u}) => new l.Vector3(c,d,u * ln.zScalingFactor))
              , a = e.worldLandmarks[0].map( ({x: c, y: d, z: u}) => new l.Vector3(c,d,u));
            this.targetLandmarks.forEach( (c, d) => c.copy(r[d])),
            this.targetWorldLandmarks.forEach( (c, d) => c.copy(a[d]));
            const o = s === "Right" ? 1 : 0;
            this.handednessWeight += n,
            A("handedness score", n),
            this.handednessValue = l.MathUtils.lerp(this.handednessValue, o, 1 / this.handednessWeight);
            const h = this.getDistance(this.targetLandmarks);
            this.targetLandmarks3D = this.targetLandmarks.map( (c, d) => {
                const u = Wh[d] ?? 0
                  , f = c.clone();
                return Oh(f, this.camera, h - u)
            }
            ),
            this.refresh()
        }
        setFinger(e) {
            this.finger = e
        }
        reset() {
            this.handednessValue = .5,
            this.handednessWeight = 1,
            this.landmarksFilters.forEach(e => e.reset()),
            this.worldLandmarksFilters.forEach(e => e.reset()),
            this.landmarks3DFilters.forEach(e => e.reset()),
            this.movementLandmarksFilters.forEach(e => e.reset()),
            this.distanceFilter.reset(),
            this.quaternionFilters.forEach(e => e.reset())
        }
        calculateLandmarkMovement() {
            const e = performance.now() / 1e3;
            this.targetLandmarks3D.forEach( (i, s) => {
                const n = this.movementLandmarks[s];
                n.copy(i),
                n.x = this.movementLandmarksFilters[s * 3].filter(i.x, e),
                n.y = this.movementLandmarksFilters[s * 3 + 1].filter(i.y, e),
                n.z = this.movementLandmarksFilters[s * 3 + 2].filter(i.z, e)
            }
            ),
            this.landmarkMovement = this.movementLandmarks.map( (i, s) => {
                let n = i.clone().setZ(0).distanceTo(this.lastMovementLandmarks[s].clone().setZ(0));
                return n *= 3,
                this.landmarkMovementFilters[s].filter(n, e)
            }
            ),
            this.movementLandmarks.forEach( (i, s) => this.lastMovementLandmarks[s].copy(i)),
            A("lm14 movement", this.landmarkMovement[14])
        }
        updateLandmarks() {
            this.landmarks.forEach( (e, i) => {
                const s = this.targetLandmarks[i];
                e.copy(s)
            }
            )
        }
        getDistance(e) {
            const i = e.map( (a, o) => {
                a = a.clone();
                const h = this.worldLandmarks[o].z;
                return a.setZ(h),
                a
            }
            );
            let s = i[5].distanceTo(i[9]) + i[9].distanceTo(i[13]) + i[13].distanceTo(i[17]);
            s *= 2.5,
            s += i[0].distanceTo(i[5]) + i[0].distanceTo(i[17]),
            s = Math.max(s, 1e-5);
            let n = 1 / s * .5;
            n *= 5 / 6;
            const r = n * 1.1;
            return n = l.MathUtils.lerp(n, r, this.getMappedBackHandFactor()),
            n * 100 + T.mpZ
        }
        calculateDistance() {
            const e = performance.now() / 1e3;
            let i = this.landmarkMovement[0] + this.landmarkMovement[5] + this.landmarkMovement[9] + this.landmarkMovement[13] + this.landmarkMovement[17];
            i /= 5;
            const s = this.getMovementFactorFromLandmarkMovement(i);
            this.distanceFilter.setMinCutoff(l.MathUtils.lerp(4, .1, s)),
            this.distanceFilter.setBeta(.001),
            this.distanceFilter.setDerivateCutoff(.001);
            const n = this.getDistance(this.landmarks);
            this.distance = this.distanceFilter.filter(n, e)
        }
        updateLandmarks3D() {
            const e = performance.now() / 1e3
              , i = qe(this.finger);
            this.landmarks3D.forEach( (n, r) => {
                const a = Wh[r] ?? 0
                  , o = Oh(this.targetLandmarks[r], this.camera, this.distance - a).multiplyScalar(.001);
                if (this.filterLandmarks3D) {
                    const h = this.targetWorldLandmarks[r]
                      , c = this.getLandmarkMovementFactor(r);
                    let d = l.MathUtils.lerp(1, .5, T.mpSnappiness)
                      , u = l.MathUtils.lerp(6, 12, T.mpSnappiness);
                    const f = l.MathUtils.lerp(u, d, c);
                    i.includes(r) || (d = l.MathUtils.lerp(2, 4, T.mpSnappiness),
                    u = l.MathUtils.lerp(24, 32, T.mpSnappiness));
                    const g = 1e-4
                      , y = 1e-4
                      , b = l.MathUtils.lerp(6, .25, c)
                      , w = 1e-4
                      , p = 1e-4;
                    [0, 1, 2].forEach(v => {
                        this.landmarks3DFilters[r * 3 + v].setMinCutoff(f),
                        this.landmarks3DFilters[r * 3 + v].setBeta(g),
                        this.landmarks3DFilters[r * 3 + v].setDerivateCutoff(y),
                        this.worldLandmarksFilters[r * 3 + v].setMinCutoff(b),
                        this.worldLandmarksFilters[r * 3 + v].setBeta(w),
                        this.worldLandmarksFilters[r * 3 + v].setDerivateCutoff(p)
                    }
                    ),
                    n.x = this.landmarks3DFilters[r * 3].filter(o.x, e),
                    n.y = this.landmarks3DFilters[r * 3 + 1].filter(o.y, e),
                    n.z = this.landmarks3DFilters[r * 3 + 2].filter(o.z, e),
                    this.worldLandmarks[r].x = this.worldLandmarksFilters[r * 3].filter(h.x, e),
                    this.worldLandmarks[r].y = this.worldLandmarksFilters[r * 3 + 1].filter(h.y, e),
                    this.worldLandmarks[r].z = this.worldLandmarksFilters[r * 3 + 2].filter(h.z, e)
                } else
                    n.copy(o);
                n.multiplyScalar(1e3)
            }
            );
            const s = this.getMappedBackHandFactor();
            this.landmarks3D.forEach( (n, r) => {
                let a = -(this.distance + this.worldLandmarks[r].z * this.worldLandmarksFactor);
                [2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15, 16, 18, 19, 20].includes(r) && (a -= .01 * s * this.worldLandmarksFactor),
                Qs(n, a, this.camera)
            }
            ),
            A("sidewaysFactor", this.getSidewaysFactor())
        }
        getMappedBackHandFactor() {
            const i = this.getCameraLookAtFactor() * .5 + .5
              , s = l.MathUtils.clamp(l.MathUtils.mapLinear(i, .25, .75, 1, 0), 0, 1);
            return A("backwardsHandFactor", s),
            s
        }
        getRotationLandmarksIndicesFromFinger(e) {
            return [[2, 3, 5], [5, 6, 17], [9, 10, 17], [13, 14, 5], [17, 18, 5]][e]
        }
        calculateFingerQuaternions() {
            for (let e = 0; e < 5; e++) {
                const i = this.getRotationLandmarksIndicesFromFinger(e).map(r => this.landmarks3D[r])
                  , s = T.pitchOffset * (1 - this.getMappedBackHandFactor());
                A("adjustedPitchOffset", s);
                const n = e === k.Ring ? [s, T.yawOffset, T.rollOffset].map(l.MathUtils.degToRad) : [0, 0, 0];
                if (this.calculateQuaternion(this.quaternions[e], i, e, this.quaternionFilters[e], n),
                [k.Middle, k.Index, k.Thumb].includes(e)) {
                    const r = new l.Euler().setFromQuaternion(this.quaternions[e]);
                    r.y += Math.PI,
                    r.z *= -1,
                    this.quaternions[e].setFromEuler(r)
                }
            }
        }
        matchLandmarksToLandmarks3D() {
            this.landmarks3D = this.landmarks3D.map(e => _d(e, this.camera, this.videoFeed)),
            this.landmarks = this.landmarks3D.map(e => {
                const i = e.clone().project(this.camera);
                return i.x = (-i.x + 1) / 2,
                i.y = (-i.y + 1) / 2,
                i
            }
            )
        }
        refresh() {
            this.currentDebugEntries = [],
            this.calculateLandmarkMovement(),
            this.updateLandmarks(),
            this.calculateDistance(),
            this.updateLandmarks3D(),
            this.matchLandmarksToLandmarks3D(),
            this.calculateFingerQuaternions()
        }
        calculateQuaternion(e, i, s, n, r) {
            const a = performance.now() / 1e3
              , o = this.handedness === "Right" ? -1 : 1;
            if (Kr(Ee, this.handedness, i[0], i[1], i[2]),
            Ee.rotateOnAxis(new l.Vector3(0,0,1), Math.PI),
            r) {
                const [d,u,f] = r;
                Ee.rotateOnAxis(new l.Vector3(1,0,0), d),
                Ee.rotateOnAxis(new l.Vector3(0,1,0), u),
                Ee.rotateOnAxis(new l.Vector3(0,0,1), f * o)
            }
            e.copy(Ee.quaternion);
            const h = this.getRotationLandmarksIndicesFromFinger(s)[1]
              , c = this.getLandmarkMovementFactor(h);
            n == null || n.filter(e, a, c)
        }
        getCameraLookAtFactor() {
            const e = new l.Vector3;
            e.add(this.landmarks3D[0]),
            e.add(this.landmarks3D[5]),
            e.add(this.landmarks3D[17]),
            e.divideScalar(3),
            Ee.position.copy(e),
            Kr(Ee, this.handedness, this.landmarks3D[0], this.landmarks3D[5], this.landmarks3D[17]);
            const i = Ee.position.clone().sub(this.camera.position).normalize()
              , s = Ee.getWorldDirection(new l.Vector3);
            return i.dot(s)
        }
        getFingerLookAtFactor(e) {
            const i = this.getRotationLandmarksIndicesFromFinger(e)[0]
              , s = this.getRotationLandmarksIndicesFromFinger(e)[1]
              , n = this.landmarks3D[i].clone().lerp(this.landmarks3D[s], .5);
            Ee.position.copy(n);
            const r = this.quaternions[e];
            Ee.quaternion.copy(r);
            const a = Ee.position.clone().sub(this.camera.position).normalize()
              , o = Ee.getWorldDirection(new l.Vector3)
              , h = a.dot(o);
            return Math.abs(h)
        }
        getSidewaysFactor() {
            let e = this.getCameraLookAtFactor();
            e = (e + 1) / 2;
            const i = 1 - Math.abs(e - .5) * 2;
            return l.MathUtils.clamp(i, 0, 1)
        }
        get ringFingerMovementFactor() {
            return this.getMovementFactorFromLandmarkMovement(this.landmarkMovement[14])
        }
        get handedness() {
            return this.handednessValue > .5 ? "Right" : "Left"
        }
        get worldLandmarksFactor() {
            return 75 * T.mpWorldZFactor
        }
        isShowingFrontHand() {
            return Dh(this.landmarks, this.handedness)
        }
        getRingAttachPositionForFinger(e=k.Ring) {
            const i = T.ringOnFingerOffset
              , s = this.landmarks3D;
            switch (e) {
            case k.Thumb:
                return s[2].clone().lerp(s[3], i);
            case k.Index:
                return s[5].clone().lerp(s[6], i);
            case k.Middle:
                return s[9].clone().lerp(s[10], i);
            case k.Ring:
                return s[13].clone().lerp(s[14], i);
            case k.Pinky:
                return s[17].clone().lerp(s[18], i)
            }
        }
        getRingAttachQuaternionForFinger(e=k.Ring) {
            switch (e) {
            case k.Thumb:
                return this.quaternions[0];
            case k.Index:
                return this.quaternions[1];
            case k.Middle:
                return this.quaternions[2];
            case k.Ring:
                return this.quaternions[3];
            case k.Pinky:
                return this.quaternions[4]
            }
        }
    }
    ;
    ln.zScalingFactor = 1.25;
    let tn = ln;
    class Uh extends l.SimpleEventDispatcher {
        constructor(e) {
            super(),
            this.currentVideo = {
                buffer: void 0,
                data: void 0
            },
            this.worker = null,
            this.waitingOnResult = !1,
            this.detectionTimeHistory = [],
            this.lastDetectionTime = 0,
            this.samples = 0,
            this.videoFeed = e
        }
        setVideoFeed(e) {
            this.videoFeed = e
        }
        async waitForWorkerInit() {
            const e = "ontouchend"in self.document
              , i = eu()
              , s = await Promise.all(i.map(async n => [n.url, await n.promise]));
            this.worker.postMessage({
                hasOnTouchEnd: e,
                scriptUrls: s
            }),
            console.log("AsyncDetector: waiting for worker init"),
            await new Promise(n => {
                this.worker.onmessage = r => {
                    r.data === "ready" && n(!0)
                }
            }
            )
        }
        detectAsync() {
            this.lastDetectionTime = performance.now(),
            this.waitingOnResult = !0
        }
        async dryrun() {}
        addSuccessfulSample(e) {
            this.detectionTimeHistory.push({
                detectionTime: e,
                timestamp: performance.now()
            }),
            this.detectionTimeHistory.length > 1024 && this.detectionTimeHistory.shift(),
            this.samples++
        }
        processWorkerMessage(e) {
            this.waitingOnResult = !1;
            const {data: i} = e;
            i !== null && this.processResult(i)
        }
        get averageDetectionTime() {
            return this.detectionTimeHistory.length === 0 ? 0 : this.detectionTimeHistory.reduce( (e, i) => e + i.detectionTime, 0) / this.detectionTimeHistory.length
        }
        get samplesPerSecond() {
            if (this.detectionTimeHistory.length === 0)
                return 0;
            const e = performance.now();
            return this.detectionTimeHistory.filter(s => e - s.timestamp < 1e3).length
        }
    }
    class Ct extends Uh {
        constructor(e, i, s) {
            super(i),
            this.options = {},
            this.needsSendNewFrame = !1,
            this.videoFrameNumber = 0,
            this.options = {
                async: !1,
                ...s
            },
            this.hand = new tn(e,i)
        }
        static preload() {
            const e = {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task",
                wasmBinaryPath: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm/vision_wasm_internal.wasm",
                wasmLoaderPath: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm/vision_wasm_internal.js"
            };
            Ct.modelAssetPromise = Pi(e.modelAssetPath),
            Ct.wasmBinaryPromise = Pi(e.wasmBinaryPath),
            Ct.wasmLoaderPromise = Pi(e.wasmLoaderPath)
        }
        setHand(e) {
            this.hand = e
        }
        async init() {
            if (this.options.async)
                throw new Error("Async Hand Detector is not implemented yet");
            {
                const [e,i,s] = await Promise.all([Ct.wasmBinaryPromise, Ct.wasmLoaderPromise, Ct.modelAssetPromise])
                  , n = {
                    wasmBinaryPath: e,
                    wasmLoaderPath: i
                };
                console.log("Sync HandLandmarker: Initializing HandLandmarker..."),
                this.handLandmarker = await Fe.createFromOptions(n, {
                    baseOptions: {
                        modelAssetPath: s,
                        delegate: "GPU"
                    },
                    runningMode: "VIDEO",
                    numHands: 1,
                    minHandDetectionConfidence: .5,
                    minTrackingConfidence: .5,
                    minHandPresenceConfidence: .5
                }),
                console.log("Sync HandLandmarker fully loaded, ready to process frames")
            }
        }
        async dryrun() {
            return await new Promise(e => setTimeout( () => e(), 1)),
            new Promise(e => {
                if (this.options.async)
                    this.worker.postMessage("dryrun"),
                    this.worker.onmessage = () => {
                        this.worker.onmessage = this.processWorkerMessage.bind(this),
                        e()
                    }
                    ;
                else {
                    const i = new ImageData(1,1);
                    this.handLandmarker.detectForVideo(i, performance.now()),
                    e()
                }
            }
            )
        }
        isAsync() {
            return this.options.async
        }
        detect(e=-1) {
            if (!this.videoFeed)
                throw new Error(this.constructor.name + ": videoFeed is not set. Please call setVideoFeed() before calling this method.");
            if (e === -1 && (e = this.videoFrameNumber++),
            this.lastDetectionTime = performance.now(),
            !this.videoFeed.usable)
                return;
            const i = this.handLandmarker.detectForVideo(this.videoFeed.video, performance.now())
              , s = performance.now() - this.lastDetectionTime;
            this.processResult({
                handLandmarkerResult: i,
                detectionTime: s,
                videoFrameNumber: e
            })
        }
        setNeedsSendNewFrame() {
            this.needsSendNewFrame = !0
        }
        detectAsync() {
            if (!this.videoFeed)
                throw new Error(this.constructor.name + ": videoFeed is not set. Please call setVideoFeed() before calling this method.");
            if (!(this.waitingOnResult || !this.videoFeed.usable))
                if (super.detectAsync(),
                this.needsSendNewFrame) {
                    const i = Ca(this.videoFeed.video).transferToImageBitmap();
                    this.worker.postMessage({
                        imageBitmap: i,
                        videoFrameNumber: this.videoFrameNumber++
                    }, [i]),
                    this.needsSendNewFrame = !1
                } else
                    this.worker.postMessage(null)
        }
        processResult(e) {
            if (!this.videoFeed)
                throw new Error(this.constructor.name + ": videoFeed is not set. Please call setVideoFeed() before calling this method.");
            this.options.async && this.detectAsync(),
            this.addSuccessfulSample(e.detectionTime);
            const i = e.handLandmarkerResult;
            i.landmarks[0] && (i.normalizedLandmarks = [i.landmarks[0].map(n => new l.Vector3(n.x,n.y,n.z))]);
            const s = !e.handLandmarkerResult || e.handLandmarkerResult.landmarks.length === 0;
            s && this.lastResult && this.dispatchEvent({
                type: "trackingFail"
            }),
            !s && !this.lastResult && this.dispatchEvent({
                type: "trackingSuccess"
            }),
            A("success", this.success),
            this.hand.processResult(i, this.samplesPerSecond),
            this.lastResult = s ? void 0 : e.handLandmarkerResult
        }
        get success() {
            return this.lastResult !== void 0
        }
        dispose() {
            var e;
            this.worker && this.worker.terminate(),
            (e = this.handLandmarker) == null || e.close()
        }
    }
    let jh = 0;
    class ia extends l.EventDispatcher {
        constructor(e, i, s, n, r, a=.5, o=.375) {
            super(),
            this.isCompatible = () => !0,
            this.computeCacheKey = () => "FadeShaderExtension" + jh,
            this.visible = !0,
            this.fadeDistance = .375,
            this.fingerWidthMultiplier = .5,
            this.finger = k.Ring,
            this.opacity = 0,
            this.ringPosition = new l.Vector3,
            this.fadeFlag = !0,
            this.mpHand = i,
            this.finger = n,
            this.videoTexture = r,
            this.fadeDistance = o,
            this.fingerWidthMultiplier = a,
            jh++;
            let h = !1
              , c = performance.now();
            const d = this;
            this.extraUniforms = {
                projMatrix: {
                    value: e.projectionMatrix
                },
                projMatrixInverse: {
                    value: e.projectionMatrixInverse
                },
                cameraMatrixWorld: {
                    value: e.matrixWorld
                },
                cameraNear: {
                    get value() {
                        return e.near
                    }
                },
                cameraFar: {
                    get value() {
                        return e.far
                    }
                },
                camPos: {
                    value: e.position
                },
                videoTexture: {
                    value: d.videoTexture
                },
                videoRepeat: {
                    value: d.videoTexture.repeat
                },
                videoOffset: {
                    value: d.videoTexture.offset
                },
                landmarks: {
                    get value() {
                        return d.mpHand.landmarks
                    }
                },
                landmarks3D: {
                    get value() {
                        return d.mpHand.landmarks3D
                    }
                },
                fingerWidth: {
                    get value() {
                        return (Hh(d.finger) ? s.getFingerWidth(d.finger) : 1) * d.fingerWidthMultiplier
                    }
                },
                fingerLandmarkIndex: {
                    get value() {
                        return Hh(d.finger) ? d.finger === k.Thumb ? 3 : qe(d.finger)[1] : -1
                    }
                },
                fadeDistance: {
                    get value() {
                        return d.fadeDistance
                    }
                },
                backHandFactor: {
                    get value() {
                        return d.mpHand.getMappedBackHandFactor()
                    }
                },
                isRightHand: {
                    get value() {
                        return d.mpHand.handedness === "Right"
                    }
                },
                ringPosition: {
                    get value() {
                        return d.ringPosition
                    }
                },
                segmentationMask: {
                    value: null
                },
                hidingOpacity: {
                    get value() {
                        const {visible: u} = d;
                        u !== h && (c = d.fadeFlag ? performance.now() : 0,
                        h = u),
                        d.fadeFlag = !0;
                        const f = performance.now() - c;
                        let g = 1;
                        return u ? g = l.MathUtils.mapLinear(f, 0, 200, 0, 1) : g = l.MathUtils.mapLinear(f, 0, 100, 1, 0),
                        g = l.MathUtils.clamp(g, 0, 1),
                        g === 0 ? d.dispatchEvent({
                            type: "fullyHidden"
                        }) : g === 1 && d.dispatchEvent({
                            type: "fullyVisible"
                        }),
                        g = l.MathUtils.clamp(g, 0, 1) ** 2,
                        u && (g = 1),
                        d.opacity = g,
                        g
                    }
                }
            },
            this.extraDefines = {
                USE_SEGMENTATION: 0
            },
            this.shaderExtender = u => {
                u.fragmentShader = l.shaderReplaceString(u.fragmentShader, "varying vec2 vUv;", `
            varying vec2 vUv;

            #ifndef TONE_MAPPING
                 // TODO: remove this hack to allow for tone mapping before applying motion blur
                 #define TONE_MAPPING 1

                    #include <tonemapping_pars_fragment>
                    vec3 toneMapping(vec3 color) {
                        return ACESFilmicToneMapping(color.rgb);
                    }
                #endif

            uniform mat4 projMatrix;
            uniform mat4 projMatrixInverse;
            uniform mat4 cameraMatrixWorld;
            uniform float cameraNear;
            uniform float cameraFar;
            
            vec3 getViewPosition(float viewZ) {
                float clipW = projMatrix[2][3] * viewZ + projMatrix[3][3];
                vec4 clipPosition = vec4((vec3(vUv, viewZ) - 0.5) * 2.0, 1.0);
                clipPosition *= clipW;
                vec3 p = (projMatrixInverse * clipPosition).xyz;
                p.z = viewZ;
                return p;
            }

            // get world position from depth and projection matrix
            vec3 getWorldPosition(vec2 uv, float depth) {
                vec3 viewPos = getViewPosition(-mix(cameraNear, cameraFar, depth));
                vec4 worldPos = cameraMatrixWorld * vec4(viewPos, 1.0);

                return worldPos.xyz;
            }

            #if USE_SEGMENTATION == 1
                uniform sampler2D segmentationMask;
            #endif

            #ifndef HAS_VIDEO
                uniform sampler2D videoTexture;
                uniform vec2 videoRepeat;
                uniform vec2 videoOffset;
            #endif
                uniform vec3 ringPosition;
                uniform vec3 landmarks[21];
                uniform vec3 landmarks3D[21];
                uniform float fingerWidth;
                uniform float hidingOpacity;
                uniform float fadeDistance;
                uniform int fingerLandmarkIndex;
                uniform float backHandFactor;
                uniform bool isRightHand;
                uniform vec3 camPos;

                const ivec2 landmarksPairs[] = ivec2[](
                    ivec2(0, 1), // 0
                    ivec2(1, 2), // 1
                    ivec2(2, 3), // 2
                    ivec2(3, 4), // 3

                    ivec2(5, 6), // 4
                    ivec2(6, 7), // 5
                    ivec2(7, 8), // 6

                    ivec2(9, 10), // 7
                    ivec2(10, 11), // 8
                    ivec2(11, 12), // 9

                    ivec2(13, 14), // 10
                    ivec2(14, 15), // 11
                    ivec2(15, 16), // 12

                    ivec2(17, 18), // 13
                    ivec2(18, 19), // 14
                    ivec2(19, 20) // 15

                    // ivec2(5, 9), // knuckles 0
                    // ivec2(9, 13), // knuckles 1
                    // ivec2(13, 17) // knuckles 2
                );

                float distanceToLine2D(vec2 p, vec2 start, vec2 end) {
                    // p: the point in 2D space
                    // start: the starting point of the line segment
                    // end: the ending point of the line segment

                    // Vector from start to end
                    vec2 lineVec = end - start;

                    // Vector from start to point
                    vec2 pointVec = p - start;

                    // Project pointVec onto lineVec to find the projection t
                    float t = dot(pointVec, lineVec) / dot(lineVec, lineVec);

                    // Clamp t to the range [0, 1] to restrict it to the line segment
                    t = clamp(t, 0.0, 1.0);

                    // Find the closest point on the line segment
                    vec2 closestPoint = start + t * lineVec;

                    // Return the distance from the point to the closest point on the line segment
                    return length(p - closestPoint);
                }

                // this function checks how far a 2D point is from a 2D convex hull made of 5 points
                // the 5 points are the 5 finger tips (thumb, index, middle, ring, pinky)
                // the function returns 0 if the point is inside the convex hull
                // the function returns a positive distance if the point is outside the convex hull
                // the function returns a negative distance if the point is on the edge of the convex hull
                float distanceToPalm2D(vec2 p, vec2 thumb, vec2 index, vec2 middle, vec2 ring, vec2 pinky) {
                    // calculate the cross product of vectors from the point to the finger tips
                    float crossThumb = cross(vec3(thumb - p, 0), vec3(index - p, 0)).z;
                    float crossIndex = cross(vec3(index - p, 0), vec3(middle - p, 0)).z;
                    float crossMiddle = cross(vec3(middle - p, 0), vec3(ring - p, 0)).z;
                    float crossRing = cross(vec3(ring - p, 0), vec3(pinky - p, 0)).z;
                    float crossPinky = cross(vec3(pinky - p, 0), vec3(thumb - p, 0)).z;

                    // check if the point is inside the convex hull
                    if (crossThumb >= 0. && crossIndex >= 0. && crossMiddle >= 0. && crossRing >= 0. && crossPinky >= 0.) {
                        return 0.0;
                    }

                    // calculate the distance from the point to each line segment
                    float distThumbIndex = distanceToLine2D(p, thumb, index);
                    float distIndexMiddle = distanceToLine2D(p, index, middle);
                    float distMiddleRing = distanceToLine2D(p, middle, ring);
                    float distRingPinky = distanceToLine2D(p, ring, pinky);
                    float distPinkyThumb = distanceToLine2D(p, pinky, thumb);

                    // return the minimum distance as the distance to the convex hull
                    return min(distThumbIndex, min(distIndexMiddle, min(distMiddleRing, min(distRingPinky, distPinkyThumb))));
                }
                
                // GLSL function to compute the closest point on a finite cylinder to point P
                // Function to perform analytical ray-cylinder intersection
                float distanceBetweenSegments(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {
                    vec3 u = p2 - p1, v = p4 - p3, w = p1 - p3;
                    float a = dot(u, u), b = dot(u, v), c = dot(v, v), d = dot(u, w), e = dot(v, w);
                    float denom = a * c - b * b, sN, tN, sD = denom, tD = denom;

                    if (denom < 1e-8) {
                        sN = 0.0; sD = 1.0;
                        tN = e; tD = c;
                    }
                    else {
                        sN = b * e - c * d;
                        tN = a * e - b * d;
                        if (sN < 0.0) { sN = 0.0; tN = e; tD = c; }
                        else if (sN > sD) { sN = sD; tN = e + b; tD = c; }
                    }

                    if (tN < 0.0) {
                        tN = 0.0;
                        sN = (-d < 0.0) ? 0.0 : ((-d > a) ? sD : -d);
                        sD = ((-d > a) || (-d < 0.0)) ? sD : a;
                    }
                    else if (tN > tD) {
                        tN = tD;
                        sN = ((-d + b) < 0.0) ? 0.0 : (((-d + b) > a) ? sD : (-d + b));
                        sD = a;
                    }

                    float sc = (abs(sN) < 1e-8) ? 0.0 : sN / sD;
                    float tc = (abs(tN) < 1e-8) ? 0.0 : tN / tD;

                    vec3 closestPoint1 = p1 + sc * u;
                    vec3 closestPoint2 = p3 + tc * v;

                    return length(closestPoint1 - closestPoint2);
                }

                float distanceToSegment(vec3 p, vec3 a, vec3 b) {
                    vec3 ab = b - a;
                    vec3 ap = p - a;
                    vec3 bp = p - b;

                    float e = dot(ap, ab);

                    if (e <= 0.0) return length(ap);

                    float f = dot(ab, ab);
                    if (e >= f) return length(bp);

                    return length(ap - ab * e / f);
                }

                float getNormalizedFingerWidth(int index) {
                    const float ringWidth = 1.1;
                    const float thumbWidth = 1.25;
                    const float indexWidth = 1.15;
                    const float middleWidth = 1.2;
                    const float pinkyWidth = 0.9;
                    
                    float fingerWidth;
                    
                    if (index < 5) {
                        fingerWidth = thumbWidth;
                    } else if (index < 9) {
                        fingerWidth = indexWidth;
                    } else if (index < 13) {
                        fingerWidth = middleWidth;
                    } else if (index < 17) {
                        fingerWidth = ringWidth;
                    } else {
                        fingerWidth = pinkyWidth;
                    }
                    
                    return fingerWidth / ringWidth;
                }
                `),
                u.fragmentShader = l.shaderReplaceString(u.fragmentShader, "gl_FragColor = ToneMapping(gl_FragColor);", `
            float depth = getDepth(vUv);
            bool colorWrite = getToneMapBit(getGBufferFlags(vUv).b) < 1; // todo: use better method here
            bool doTonemap = getToneMapBit(getGBufferFlags(vUv).a) > 0;
            
            bool isTargetPixel = colorWrite;
            // todo: only tone map geometry pixels
            vec2 videoUv = vUv;
            videoUv = videoUv * videoRepeat + videoOffset;
            vec3 video = texture2D(videoTexture, videoUv).rgb;

            if(isTargetPixel){
                vec3 worldPos = getWorldPosition(vUv, depth);

                float m = 1.0;

                for(int i = 0; i < landmarksPairs.length(); i++) {
                    if(i == 0) continue;
                    ivec2 pair = landmarksPairs[i];
                    vec3 a = landmarks3D[pair.x];
                    vec3 b = landmarks3D[pair.y];
                    bool isSameFinger = pair[1] == fingerLandmarkIndex + 1 || pair[1] == fingerLandmarkIndex + 2;

                    if(pair[1] == fingerLandmarkIndex) continue;

                    float d = distanceBetweenSegments(a, b, worldPos, camPos);
                    d = max(d, 0.);

                    // if(i >= 15) d *= 0.8;
                    float pairWidth = fingerWidth * getNormalizedFingerWidth(pair.x);

                    float stepMin = pairWidth;
                    float stepMax = pairWidth + fadeDistance;

                    if (isSameFinger) {
                        stepMin -= 0.25 * backHandFactor;
                        stepMax -= 0.25 * backHandFactor;
                    }

                    float curM = smoothstep(stepMin, stepMax, d);

                    // this for example prevents the ring from being faded out by the segment from lm 14 to lm 15
                    if(isSameFinger) curM = mix(curM, 1., 1. - backHandFactor);

                    m = min(m, curM);
                }
                // m *= m;

                float a = 1.0;
                
                #if USE_SEGMENTATION == 1
                    float background = 1. - texture2D(segmentationMask, vUv).r;

                    // check what is closer to the camera, the worldPos or the ring position
                    float ringPosDistToCamera = length(ringPosition - camPos);
                    float worldPosDistToCamera = length(worldPos - camPos);
                    a = smoothstep(-0.2, 0.2, ringPosDistToCamera - worldPosDistToCamera);
                    
                    m = mix(m, 1., background * a);
                    m = mix(m, 0., (1. - background) * (1. - a));
                #endif

                m *= hidingOpacity;

                vec2 uv = 1. - vUv;

                // get dist of uv from convex hull
                vec2 thumb = landmarks[0].xy;
                vec2 index = landmarks[5].xy;
                vec2 middle = landmarks[9].xy;
                vec2 ring = landmarks[13].xy;
                vec2 pinky = landmarks[17].xy;

                // scale the 5 landmarks with the pivot at the center of the palm
                vec2 pivot = (thumb + index + middle + ring + pinky) / 5.;
                const float scale = 1.5;
                thumb = (thumb - pivot) * scale + pivot;
                index = (index - pivot) * scale + pivot;
                middle = (middle - pivot) * scale + pivot;
                ring = (ring - pivot) * scale + pivot;
                pinky = (pinky - pivot) * scale + pivot;

                bool isShowingFrontHand = backHandFactor < 0.5;

                float dist = (isRightHand && isShowingFrontHand) || (!isRightHand && !isShowingFrontHand) ?
                    distanceToPalm2D(uv, thumb, index, middle, ring, pinky)
                    :
                    distanceToPalm2D(uv, thumb, pinky, ring, middle, index);


                float palmM = smoothstep(0., 0.01, dist);

                vec3 palmPos = 0.25 * (landmarks3D[5] + landmarks3D[9] + landmarks3D[13] + landmarks3D[17]);
                float palmZDiff = worldPos.z - palmPos.z;

                palmM = mix(palmM, 1., smoothstep(0., 0.05, palmZDiff));
                m = min(m, palmM);

                gl_FragColor = mix(vec4(video, gl_FragColor.a), LinearTosRGB(doTonemap ? ToneMapping(gl_FragColor) : gl_FragColor), m);
                // if(m > 0. && m < 1.) gl_FragColor.rgb = vec3(0., 1., 0.);
                // gl_FragColor.rgb = vec3(0., m, 0.);
                // gl_FragColor.a = 1.;
                // gl_FragColor.rgb = vec3(worldPos);
            }else{
                gl_FragColor = LinearTosRGB(ToneMapping(gl_FragColor));
            }

            // gl_FragColor.rgb = vec3(colorWrite && doTonemap ? 1. : 0., 0., 0.);
            `).replace("gl_FragColor = LinearTosRGB(gl_FragColor);", "")
            }
        }
        setFadeDistance(e) {
            this.fadeDistance = e
        }
        setFingerWidthMultiplier(e) {
            this.fingerWidthMultiplier = e
        }
        setVisible(e, i=!0) {
            this.visible = e,
            this.fadeFlag = i
        }
        setFinger(e) {
            this.finger = e
        }
        unsetFinger() {
            this.finger = -1
        }
        setVideoTexture(e) {
            this.videoTexture = e
        }
        setUseSegmentation(e) {
            this.extraDefines.USE_SEGMENTATION = 1,
            this.extraUniforms.segmentationMask = {
                value: e
            }
        }
        getOpacity() {
            return this.opacity
        }
        setMPHand(e) {
            this.mpHand = e
        }
        updateRingPosition(e) {
            this.ringPosition.copy(e)
        }
    }
    class fu {
        constructor(e) {
            this.occlusionRoot = new l.Object3D,
            this.cylinderMaterial = new l.MeshBasicMaterial2({
                color: "#0000ff"
            }),
            this.resolution = new l.Vector2(1,1),
            this.landmarksSpheres = [],
            this.occluderCylinders = [],
            this.landmarksPairs = [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8], [9, 10], [10, 11], [11, 12], [13, 14], [14, 15], [15, 16], [17, 18], [18, 19], [19, 20]];
            const i = new l.CylinderGeometry(1,1,1,32,32,!0).rotateX(Math.PI / 2);
            this.cylinderMaterial.userData.postTonemap = !1,
            this.cylinderMaterial.userData.renderToDepth = !0,
            this.cylinderMaterial.userData.pluginsDisabled = !0,
            this.cylinderMaterial.userData[l.VelocityBufferPlugin.PluginType] = {
                disabled: !0
            };
            for (let n = 0; n < this.landmarksPairs.length; n++) {
                const r = i
                  , a = this.cylinderMaterial
                  , o = new l.Mesh(r,a);
                o.name = "joint" + n,
                o.userData.landmarksPairIndex = n,
                this.occluderCylinders.push(o),
                this.occlusionRoot.add(o)
            }
            const s = new l.SphereGeometry(1,32,32);
            for (let n = 0; n < 21; n++) {
                const r = new l.Mesh(s,this.cylinderMaterial);
                this.landmarksSpheres.push(r),
                this.occlusionRoot.add(r)
            }
            {
                this.cylinderMaterial.map = e;
                const n = this
                  , r = {
                    uuid: "shadowSSAO",
                    isCompatible: () => !0,
                    computeCacheKey: () => "1",
                    extraUniforms: {
                        resolution: {
                            value: n.resolution
                        },
                        videoRepeat: {
                            get value() {
                                return e.repeat
                            }
                        },
                        videoOffset: {
                            get value() {
                                return e.offset
                            }
                        }
                    },
                    parsFragmentSnippet: `
                    uniform vec2 resolution;
                    uniform vec2 videoRepeat;
                    uniform vec2 videoOffset;

                    // Converts a color from sRGB gamma to linear light gamma
                    vec4 convertToLinear(vec4 sRGB)
                    {
                        bvec3 cutoff = lessThan(sRGB.rgb, vec3(0.04045));
                        vec3 higher = pow((sRGB.rgb + vec3(0.055))/vec3(1.055), vec3(2.4));
                        vec3 lower = sRGB.rgb/vec3(12.92);

                        return vec4(mix(higher, lower, cutoff), sRGB.a);
                    }
                `,
                    shaderExtender: a => {
                        const o = `
                    vec2 videoUv = gl_FragCoord.xy / resolution;
                    // videoUv.x = 1.0 - videoUv.x; // flip x
                    videoUv = videoUv * videoRepeat + videoOffset;

                    diffuseColor.rgb = texture2D(map, videoUv).rgb;
                    diffuseColor = convertToLinear(diffuseColor);
                    `;
                        a.fragmentShader = l.shaderReplaceString(a.fragmentShader, "#include <map_fragment>", o)
                    }
                };
                n.cylinderMaterial.registerMaterialExtensions([r]),
                this.occlusionRoot.children[0].onBeforeRender = a => {
                    const o = a.domElement.width
                      , h = a.domElement.height;
                    this.resolution.set(o, h)
                }
            }
        }
        connectCylinders(e, i=1) {
            for (let s = 0; s < this.landmarksPairs.length; s++) {
                const [n,r] = this.landmarksPairs[s]
                  , a = Vh(n)
                  , h = Jr(a) * i
                  , c = this.occluderCylinders[s];
                c.visible = !0;
                const d = e[n]
                  , u = e[r]
                  , f = new l.Vector3().addVectors(d, u).multiplyScalar(.5);
                c.position.copy(f);
                const g = d.distanceTo(u);
                c.scale.set(h, h, g),
                c.lookAt(d)
            }
            for (let s = 0; s < 21; s++) {
                const n = this.landmarksSpheres[s];
                n.visible = !0;
                const r = Vh(s)
                  , o = Jr(r) * i;
                n.scale.setScalar(o),
                n.position.copy(e[s])
            }
        }
        getCylinders() {
            return this.occluderCylinders
        }
        getCylinderByFinger(e) {
            switch (e) {
            case k.Thumb:
                return this.occluderCylinders[2];
            case k.Index:
                return this.occluderCylinders[4];
            case k.Middle:
                return this.occluderCylinders[7];
            case k.Ring:
                return this.occluderCylinders[10];
            case k.Pinky:
                return this.occluderCylinders[13]
            }
        }
        getCylindersByFinger(e) {
            switch (e) {
            case k.Thumb:
                return [this.occluderCylinders[2], this.occluderCylinders[3]];
            case k.Index:
                return [this.occluderCylinders[4], this.occluderCylinders[5], this.occluderCylinders[6]];
            case k.Middle:
                return [this.occluderCylinders[7], this.occluderCylinders[8], this.occluderCylinders[9]];
            case k.Ring:
                return [this.occluderCylinders[10], this.occluderCylinders[11], this.occluderCylinders[12]];
            case k.Pinky:
                return [this.occluderCylinders[13], this.occluderCylinders[14], this.occluderCylinders[15]]
            }
        }
        getSpheresByFinger(e) {
            return this.landmarksSpheres.filter( (s, n) => {
                if (e === k.Thumb)
                    return n >= 0 && n <= 4;
                if (e === k.Index)
                    return n >= 5 && n <= 8;
                if (e === k.Middle)
                    return n >= 9 && n <= 12;
                if (e === k.Ring)
                    return n >= 13 && n <= 16;
                if (e === k.Pinky)
                    return n >= 17 && n <= 20
            }
            )
        }
        dispose() {
            this.occluderCylinders.forEach(e => {
                e.removeFromParent(),
                e.geometry.dispose()
            }
            ),
            this.occlusionRoot.removeFromParent(),
            this.cylinderMaterial.dispose(),
            this.occluderCylinders = []
        }
    }
    class Nh {
        constructor() {
            this.shadowMaterial = null,
            this.ext = {
                uuid: "shadowSSAO",
                isCompatible: () => !0,
                computeCacheKey: () => "1",
                shaderExtender: e => {
                    if (!e.defines.SSAO_ENABLED)
                        return;
                    const i = `
        gl_FragColor.rgb = vec3(ambientOcclusion) * diffuseColor.rgb;
        gl_FragColor.a = 1.;
        `;
                    e.fragmentShader = l.shaderReplaceString(e.fragmentShader, "#include <output_fragment>", i, {
                        append: !0
                    })
                }
            },
            this.fingerCylinder = new l.CylinderGeometry(1,1,1,32).rotateX(Math.PI / 2),
            this.shadowRoot = new l.Object3D
        }
        init(e) {
            const i = e.createPhysicalMaterial();
            i.userData.renderToDepth = !0,
            i.userData.postTonemap = !1,
            i.userData[l.VelocityBufferPlugin.PluginType] = {
                disabled: !0
            },
            i.userData[l.BloomPlugin.PluginType] = {
                disabled: !0
            },
            i.userData.ssaoCastDisabled = !0,
            i.colorWrite = !0,
            this.shadowMaterial = i,
            this.shadowMaterial.registerMaterialExtensions([this.ext]);
            const s = new l.Mesh(this.fingerCylinder,this.shadowMaterial);
            this.shadowRoot.add(s)
        }
        dispose() {
            var e;
            (e = this.shadowMaterial) == null || e.dispose(),
            this.shadowRoot.children.forEach(i => {
                i instanceof l.Mesh && (i.geometry.dispose(),
                i.material.dispose(),
                i.removeFromParent())
            }
            ),
            this.shadowRoot.removeFromParent(),
            this.fingerCylinder.dispose()
        }
    }
    class pu extends Nh {
        constructor() {
            super(...arguments),
            this.resolution = new l.Vector2(1,1),
            this.videoRepeat = new l.Vector2(1,1),
            this.videoOffset = new l.Vector2(0,0)
        }
        init(e) {
            const i = e.createPhysicalMaterial();
            i.userData.renderToDepth = !0,
            i.userData.postTonemap = !1,
            i.userData[l.VelocityBufferPlugin.PluginType] = {
                disabled: !0
            },
            i.userData.ssaoCastDisabled = !0,
            i.userData.pluginsDisabled = !0,
            i.colorWrite = !0,
            i.map = new l.Texture,
            this.shadowMaterial = i;
            const s = this
              , n = {
                uuid: "shadowSSAO",
                isCompatible: () => !0,
                computeCacheKey: () => "1",
                extraDefines: {
                    HAS_VIDEO: 1
                },
                extraUniforms: {
                    resolution: {
                        value: this.resolution
                    },
                    videoRepeat: {
                        get value() {
                            return s.videoRepeat
                        }
                    },
                    videoOffset: {
                        get value() {
                            return s.videoOffset
                        }
                    }
                },
                parsFragmentSnippet: `
            uniform sampler2D videoTexture;
            uniform vec2 resolution;
            uniform vec2 videoRepeat;
            uniform vec2 videoOffset;

            vec3 rgb2hsv(vec3 c)
            {
                vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
                vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
                vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

                float d = q.x - min(q.w, q.y);
                float e = 1.0e-10;
                return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
            }

            vec3 hsv2rgb(vec3 c)
            {
                vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
                vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
                return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
            }
            
            // Converts a color from sRGB gamma to linear light gamma
            vec4 convertToLinear(vec4 sRGB)
            {
                bvec3 cutoff = lessThan(sRGB.rgb, vec3(0.04045));
                vec3 higher = pow((sRGB.rgb + vec3(0.055))/vec3(1.055), vec3(2.4));
                vec3 lower = sRGB.rgb/vec3(12.92);

                return vec4(mix(higher, lower, cutoff), sRGB.a);
            }
            `,
                shaderExtender: a => {
                    const o = `
                vec2 videoUv = gl_FragCoord.xy / resolution;
                videoUv = videoUv * videoRepeat + videoOffset;
                // videoUv.x = 1. - videoUv.x;

                vec3 video = texture2D(map, videoUv).rgb;
                video = convertToLinear(vec4(video, 1.)).rgb;
                
                #ifdef SSAO_ENABLED
                    #if SSAO_ENABLED == 1
                        float ao = clamp(pow(ambientOcclusion, 2.), 0., 1.);

                        // increase video saturation
                        vec3 hsv = rgb2hsv(video);

                        float o = 1. - ao;

                        float hue = hsv.x;// hsv.x < 0.5 ? mix(0., hsv.x, ao) : mix(1., hsv.x, ao);
                        float saturation = min(1., hsv.y + sqrt(hsv.y) * o * 0.35);
                        float value = hsv.z * ao;

                        vec3 finalColor = hsv2rgb(vec3(hue, saturation, value));

                    gl_FragColor.rgb = finalColor;
                        // float clampAo = step(0.99, ao);
                        // gl_FragColor.rgb = vec3(0., ao, 0.);
                    #else
                        gl_FragColor.rgb = video;
                    #endif
                #else
                    gl_FragColor.rgb = video;
                #endif
                `;
                    if (a.fragmentShader.includes("#include <opaque_fragment>"))
                        a.fragmentShader = l.shaderReplaceString(a.fragmentShader, "#include <opaque_fragment>", o, {
                            append: !0
                        });
                    else if (a.fragmentShader.includes("#include <output_fragment>"))
                        a.fragmentShader = l.shaderReplaceString(a.fragmentShader, "#include <output_fragment>", o, {
                            append: !0
                        });
                    else {
                        console.warn("SSSFingerCylinderShadow: no opaque_fragment or output_fragment found in shader. Disabling SSAO mesh."),
                        this.shadowMaterial && (this.shadowMaterial.visible = !1);
                        return
                    }
                }
            };
            this.shadowMaterial.registerMaterialExtensions([n]);
            const r = new l.Mesh(this.fingerCylinder,this.shadowMaterial);
            r.onBeforeRender = () => {
                const a = e.canvas.width
                  , o = e.canvas.height;
                this.resolution.set(a, o)
            }
            ,
            this.shadowRoot.add(r)
        }
        setVideoTexture(e) {
            this.videoRepeat = e.repeat,
            this.videoOffset = e.offset,
            this.shadowRoot.traverse(i => {
                const s = i;
                s.isMesh && (s.material.map = e)
            }
            )
        }
    }
    class Xh {
        constructor(e=16) {
            this.totalSamples = 0,
            this.measurements = [],
            this.maxWeight = e,
            this.currentWeight = 0
        }
        addMeasurement(e, i) {
            if (e < .5)
                return !1;
            for (this.measurements.push({
                value: e,
                weight: i
            }),
            this.currentWeight += i; this.currentWeight > this.maxWeight; ) {
                const s = this.measurements.shift();
                s && (this.currentWeight -= s.weight)
            }
            return this.totalSamples++,
            !0
        }
        calculateWeightedMedian(e) {
            if (e.length === 0)
                return 0;
            e.sort( (n, r) => n.value - r.value);
            const i = e.reduce( (n, {weight: r}) => n + r, 0);
            let s = 0;
            for (const {value: n, weight: r} of e)
                if (s += r,
                s >= i / 2)
                    return n;
            return 0
        }
        filterOutliersIQR(e) {
            const i = [...e].sort( (d, u) => d.value - u.value)
              , s = Math.floor(i.length / 4)
              , n = Math.floor(i.length * (3 / 4))
              , r = i[s].value
              , a = i[n].value
              , o = a - r
              , h = r - 1.5 * o
              , c = a + 1.5 * o;
            return i.filter( ({value: d}) => d >= h && d <= c)
        }
        getStandardDeviation() {
            if (this.measurements.length === 0)
                return 0;
            const e = this.getAverageFingerWidth()
              , s = this.measurements.map( ({value: n}) => (n - e) ** 2).reduce( (n, r) => n + r, 0) / this.measurements.length;
            return Math.sqrt(s)
        }
        getAverageFingerWidth() {
            if (this.measurements.length === 0)
                return 0;
            const e = this.filterOutliersIQR(this.measurements);
            return this.calculateWeightedMedian(e)
        }
        reset() {
            this.measurements = [],
            this.currentWeight = 0
        }
    }
    function mu(t, e, i) {
        function s(r, a) {
            return (r.x - a.x) ** 2 + (r.y - a.y) ** 2
        }
        function n(r, a, o) {
            const h = s(a, o);
            if (h === 0)
                return s(r, a);
            let c = ((r.x - a.x) * (o.x - a.x) + (r.y - a.y) * (o.y - a.y)) / h;
            return c = Math.max(0, Math.min(1, c)),
            s(r, {
                x: a.x + c * (o.x - a.x),
                y: a.y + c * (o.y - a.y)
            })
        }
        return Math.sqrt(n(t, e, i))
    }
    const gu = t => {
        switch (t) {
        case 0:
            return [1, 2, 3, 4];
        case 1:
            return [5, 6, 7, 8];
        case 2:
            return [9, 10, 11, 12];
        case 3:
            return [13, 14, 15, 16];
        case 4:
            return [17, 18, 19, 20]
        }
    }
      , sn = typeof OffscreenCanvas < "u" ? new OffscreenCanvas(1,1) : document.createElement("canvas")
      , vu = sn.getContext("2d", {
        willReadFrequently: !0
    })
      , yu = (t, e, i, s, n, r, a, o=.375) => {
        var ee, ce;
        const h = performance.now()
          , c = (ee = globalThis.window) == null ? void 0 : ee.location.search.includes("debug")
          , d = r.map(M => ({
            x: Math.round(M.x * s),
            y: Math.round(M.y * n)
        }))
          , u = {
            x: 1 / 0,
            y: 1 / 0
        }
          , f = {
            x: -1 / 0,
            y: -1 / 0
        };
        for (const M of d)
            u.x = Math.min(u.x, M.x),
            u.y = Math.min(u.y, M.y),
            f.x = Math.max(f.x, M.x),
            f.y = Math.max(f.y, M.y);
        let g = ~~(Math.hypot(d[9].x - d[0].x, d[9].y - d[0].y) * 1.25);
        g = Math.max(g, ~~(Math.hypot(d[13].x - d[15].x, d[13].y - d[15].y) * 4)),
        g = Math.ceil(g / 2) * 2;
        const y = .666
          , b = d[13].x * (1 - y) + d[14].x * y
          , w = d[13].y * (1 - y) + d[14].y * y
          , p = {
            x: b - g / 2,
            y: w - g / 2,
            width: g,
            height: g
        };
        for (const M of Object.keys(p))
            p[M] = Math.round(p[M]);
        p.x = p.x - p.x % 2,
        p.y = p.y - p.y % 2;
        const v = d.map(M => ({
            x: M.x - p.x,
            y: M.y - p.y
        }));
        if (p.x < 0 && (v.forEach(M => M.x += p.x),
        p.x = 0),
        p.y < 0 && (v.forEach(M => M.y += p.y),
        p.y = 0),
        p.x > s && (v.forEach(M => M.x -= p.x - s),
        p.x = s),
        p.y > n && (v.forEach(M => M.y -= p.y - n),
        p.y = n),
        p.width = Math.min(p.width, s - p.x),
        p.height = Math.min(p.height, n - p.y),
        p.width < 8 || p.height < 8)
            return null;
        sn.width = p.width,
        sn.height = p.height,
        vu.drawImage(e, p.x, p.y, p.width, p.height, 0, 0, p.width, p.height);
        const D = {
            detectionTime: 0,
            roi: p,
            timestamp: i,
            edgeLeft: null,
            edgeRight: null,
            ringFingerMovementFactor: a,
            overstep: !1
        }
          , V = t.segmentForVideo(sn, performance.now());
        if ("close"in e && e.close(),
        !V || !V.confidenceMasks)
            return V.close(),
            null;
        if (((ce = V == null ? void 0 : V.confidenceMasks) == null ? void 0 : ce.length) > 0) {
            const M = V.confidenceMasks[2]
              , {width: L, height: de} = M
              , se = M.getAsFloat32Array();
            let z = null;
            if (c) {
                z = new Uint8ClampedArray(L * de * 4),
                D.writeBuffer = z;
                for (let K = 0; K < se.length; K++) {
                    const pe = se[K] > o ? 255 : 0;
                    z[K * 4] = pe,
                    z[K * 4 + 1] = pe,
                    z[K * 4 + 2] = pe,
                    z[K * 4 + 3] = 255
                }
                for (const K of v)
                    for (let pe = -2; pe <= 2; pe++)
                        for (let ht = -2; ht <= 2; ht++) {
                            if (K.x + pe < 0 || K.x + pe >= L || K.y + ht < 0 || K.y + ht >= de)
                                continue;
                            const St = ((K.y + ht) * L + (K.x + pe)) * 4;
                            z[St] = 0,
                            z[St + 1] = 0,
                            z[St + 2] = 255
                        }
            }
            const xe = 3
              , Kt = (K, pe) => {
                let ht = -1
                  , St = -1
                  , is = 1 / 0;
                const ma = {
                    x: K,
                    y: pe
                };
                for (let Jt = 0; Jt < 5; Jt++) {
                    const ss = gu(Jt);
                    for (let kt = 0; kt < ss.length; kt++) {
                        const ns = v[ss[kt]]
                          , Ft = v[ss[kt + 1]];
                        if (!Ft)
                            continue;
                        let ct = mu(ma, ns, Ft);
                        Jt === xe && (ct *= .6),
                        ct < is && (is = ct,
                        ht = Jt,
                        St = kt)
                    }
                }
                return [ht, St, is]
            }
              , rt = (K, pe, ht, St, is) => {
                let ma = 0;
                const Jt = Math.cos(St) * K * .5
                  , ss = Math.sin(St) * K * .5;
                let kt = 0
                  , ns = 0;
                for (; ma++ < 500; ) {
                    kt += Jt,
                    ns += ss;
                    const Ft = Math.round(pe + kt)
                      , ct = Math.round(ht + ns)
                      , [ec,qu] = Kt(Ft, ct);
                    if (ec !== xe || qu !== is)
                        return D.overstep = !0,
                        c && console.log("Raymarch overstepped the gap between fingers", ec),
                        null;
                    if (Ft < 0 || Ft >= L || ct < 0 || ct >= de)
                        continue;
                    const Gu = ct * L + Ft;
                    if (se[Gu] < o) {
                        if (c)
                            for (let _t = -3; _t <= 3; _t++)
                                for (let ga = -3; ga <= 3; ga++) {
                                    const va = Ft + ga
                                      , ya = ct + _t;
                                    if (va >= 0 && va < L && ya >= 0 && ya < de) {
                                        const wa = ya * L * 4 + va * 4;
                                        z[wa] = 255,
                                        z[wa + 1] = 0,
                                        z[wa + 2] = 0
                                    }
                                }
                        return {
                            x: kt,
                            y: ns
                        }
                    }
                    if (c) {
                        const _t = ct * L * 4 + Ft * 4;
                        z[_t] = 255,
                        z[_t + 1] = 0,
                        z[_t + 2] = 0
                    }
                }
                return null
            }
            ;
            let Ve = null
              , ge = null;
            const Ri = Math.atan2(d[14].y - d[13].y, d[14].x - d[13].x) + Math.PI / 2;
            let at = 0
              , ot = 0
              , lt = .666;
            const ju = v[13].x * (1 - lt) + v[14].x * lt
              , Nu = v[13].y * (1 - lt) + v[14].y * lt;
            let dn = null
              , fa = {
                x: 0,
                y: 0
            }
              , un = null
              , pa = {
                x: 0,
                y: 0
            };
            for (; lt < 1; ) {
                at = v[13].x * (1 - lt) + v[14].x * lt,
                ot = v[13].y * (1 - lt) + v[14].y * lt;
                const K = rt(-1, at, ot, Ri, 0)
                  , pe = rt(1, at, ot, Ri, 0);
                if (K && pe) {
                    Ve = K,
                    ge = pe;
                    break
                }
                !dn && K && (dn = K,
                fa = {
                    x: at,
                    y: ot
                }),
                !un && pe && (un = pe,
                pa = {
                    x: at,
                    y: ot
                }),
                lt += .05
            }
            !Ve && dn && (Ve = dn,
            at = fa.x,
            ot = fa.y),
            !ge && un && (ge = un,
            at = pa.x,
            ot = pa.y);
            const Qh = at - ju
              , $h = ot - Nu;
            Ve && (Ve.x -= Qh,
            Ve.y -= $h),
            ge && (ge.x -= Qh,
            ge.y -= $h);
            const Xu = Ve ? {
                x: (Ve.x + at + p.x) / s,
                y: (Ve.y + ot + p.y) / n
            } : null
              , Zu = ge ? {
                x: (ge.x + at + p.x) / s,
                y: (ge.y + ot + p.y) / n
            } : null;
            D.edgeLeft = Xu,
            D.edgeRight = Zu,
            D.detectionTime = performance.now() - h
        }
        return V.close(),
        D
    }
      , Zh = {
        async: !1,
        multiClass: !1,
        smoothFingerWidth: !0,
        debug: !1,
        maxWeight: 1 / 0,
        runForever: !1
    };
    class Ei extends Uh {
        constructor(e, i, s, n=Zh) {
            super(s),
            this.segmentationBuffer = null,
            this.imageSegmenter = null,
            this.result = null,
            this.fingerWidthFilter = new oe.OneEuroFilter(60,.5,.5,.5),
            this.edgeMovement = 0,
            this.fingerWidthAnalyzer = null,
            this.edgeLeft = new l.Vector2,
            this.edgeRight = new l.Vector2,
            this.targetPos = new l.Vector3,
            this.confidenceValue = 0,
            this.confidenceFilter = new oe.OneEuroFilter(60,.0375,.0375,.0375),
            this.lastFingerWidth = 0,
            this.lastSuccessfulSampleTime = 0,
            this.nextSampleWaitTime = 100,
            this.currentSamples = 0,
            this.last10Samples = [],
            this.firstSampleTime = -1,
            this.modelMinConfidence = .5,
            console.log("Segmenter initialized with options", n),
            this.mpHand = e,
            this.camera = i,
            this.videoFeed = s,
            n = {
                ...Zh,
                ...n
            },
            this.options = n,
            this.options.smoothFingerWidth && (this.fingerWidthAnalyzer = new Xh)
        }
        static preload() {
            const e = {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite",
                wasmBinaryPath: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm/vision_wasm_internal.wasm",
                wasmLoaderPath: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm/vision_wasm_internal.js"
            };
            this.modelAssetPromise = Pi(e.modelAssetPath),
            this.wasmBinaryPromise = Pi(e.wasmBinaryPath),
            this.wasmLoaderPromise = Pi(e.wasmLoaderPath)
        }
        setHand(e) {
            this.mpHand = e
        }
        setModelMinConfidence(e) {
            this.modelMinConfidence = e
        }
        async init() {
            if (console.log("Segmenter: init()"),
            this.options.async)
                throw new Error("Async mode is not supported yet");
            {
                const [e,i,s] = await Promise.all([Ei.wasmBinaryPromise, Ei.wasmLoaderPromise, Ei.modelAssetPromise])
                  , n = {
                    wasmBinaryPath: e,
                    wasmLoaderPath: i
                };
                console.log("Sync Segmenter: creating from options");
                const r = Sa() ? "CPU" : "GPU";
                this.imageSegmenter = await be.createFromOptions(n, {
                    baseOptions: {
                        modelAssetPath: s,
                        delegate: r
                    },
                    runningMode: "VIDEO",
                    outputCategoryMask: !1,
                    outputConfidenceMasks: !0
                }),
                console.log("Sync Segmenter fully initialized")
            }
        }
        async dryrun() {
            return new Promise(e => {
                if (this.options.async)
                    console.log("Segmenter: doing dry run in async mode"),
                    this.worker.postMessage("dryrun"),
                    this.worker.onmessage = () => {
                        this.worker.onmessage = this.processWorkerMessage.bind(this),
                        e()
                    }
                    ;
                else {
                    const i = new ImageData(1,1);
                    this.imageSegmenter.segmentForVideo(i, performance.now()).close(),
                    e()
                }
            }
            )
        }
        isInitialized() {
            return this.isAsync() || this.imageSegmenter !== null
        }
        canSample() {
            return this.mpHand && this.isInitialized() && (this.options.runForever || !this.isDoneSampling())
        }
        isDoneSampling() {
            return this.getProgress() > .99
        }
        detect({landmarks: e=this.mpHand.landmarks, landmarks3D: i=this.mpHand.landmarks3D}={}) {
            if (!this.videoFeed)
                throw new Error(this.constructor.name + ": videoFeed is not set. Please call setVideoFeed() before calling this method.");
            if (this.options.async)
                throw new Error("This method is not available in async mode");
            if (!this.canSample() || (this.firstSampleTime === -1 && (this.firstSampleTime = performance.now()),
            performance.now() - this.lastSuccessfulSampleTime < this.nextSampleWaitTime))
                return;
            this.currentSamples++,
            this.lastDetectionTime = performance.now();
            const s = yu(this.imageSegmenter, this.videoFeed.video, this.lastDetectionTime, this.videoFeed.video.videoWidth, this.videoFeed.video.videoHeight, e.map( ({x: n, y: r, z: a}) => ({
                x: n,
                y: r,
                z: a
            })), this.getSegmentationMovementConfidence(), this.modelMinConfidence);
            s.landmarks = e.map( ({x: n, y: r}) => ({
                x: n,
                y: r
            })),
            s.landmarks3D = i.map( ({x: n, y: r, z: a}) => ({
                x: n,
                y: r,
                z: a
            })),
            this.processResult(s)
        }
        detectAsync({landmarks: e=this.mpHand.landmarks, landmarks3D: i=this.mpHand.landmarks3D}={}) {
            if (!this.videoFeed)
                throw new Error(this.constructor.name + ": videoFeed is not set. Please call setVideoFeed() before calling this method.");
            if (!this.options.async)
                throw new Error("This method is not available in sync mode");
            if (this.waitingOnResult || !this.canSample() || performance.now() - this.lastSuccessfulSampleTime < 250)
                return;
            this.firstSampleTime === -1 && (this.firstSampleTime = performance.now()),
            this.currentSamples++,
            super.detectAsync();
            const n = Ca(this.videoFeed.video).transferToImageBitmap();
            this.worker.postMessage({
                bitmap: n,
                landmarks: e.map( ({x: r, y: a, z: o}) => ({
                    x: r,
                    y: a,
                    z: o
                })),
                landmarks3D: i.map( ({x: r, y: a, z: o}) => ({
                    x: r,
                    y: a,
                    z: o
                })),
                ringFingerMovementFactor: this.getSegmentationMovementConfidence(),
                modelMinConfidence: this.modelMinConfidence
            }, [n]),
            this.waitingOnResult = !0
        }
        restart() {
            var e;
            this.currentSamples = 0,
            this.last10Samples = [],
            this.confidenceValue = 0,
            this.lastDetectionTime = 0,
            (e = this.fingerWidthAnalyzer) == null || e.reset(),
            this.firstSampleTime = -1,
            this.result = null,
            console.log("Segmenter: restarted")
        }
        getSegmentationMovementConfidence() {
            let e = l.MathUtils.mapLinear(this.mpHand.getLandmarkMovementFactor(14), .05, .25, 0, 1);
            return e = l.MathUtils.clamp(e, 0, 1),
            e
        }
        isAsync() {
            return this.options.async
        }
        processResult(e) {
            if (!this.videoFeed)
                throw new Error(this.constructor.name + ": videoFeed is not set. Please call setVideoFeed() before calling this method.");
            if (e === null)
                return;
            this.lastSuccessfulSampleTime = performance.now(),
            e.edgeLeft && e.edgeRight && this.addSuccessfulSample(e.detectionTime),
            this.last10Samples.push({
                ...e
            }),
            this.last10Samples.length > 10 && this.last10Samples.shift();
            let {edgeLeft: s, edgeRight: n} = e;
            const a = !!(s ?? n) ? 1 : 0;
            if (this.confidenceValue = this.confidenceFilter.filter(a, performance.now() / 1e3),
            this.options.smoothFingerWidth && s && n) {
                const c = new l.Vector2(s.x,s.y)
                  , d = new l.Vector2(n.x,n.y);
                _i(c, this.videoFeed),
                _i(d, this.videoFeed);
                const u = e.distance ?? this.mpHand.distance
                  , f = xt(c, -u, this.camera)
                  , g = xt(d, -u, this.camera)
                  , y = f.distanceTo(g);
                this.lastFingerWidth = y;
                let b = e.ringFingerMovementFactor;
                b /= this.videoFeed.view.scale,
                this.fingerWidthAnalyzer.addMeasurement(y, b) || (e.edgeLeft = null,
                e.edgeRight = null)
            }
            e.edgeLeft ? (this.edgeLeft = new l.Vector2(e.edgeLeft.x,e.edgeLeft.y),
            _i(this.edgeLeft, this.videoFeed)) : this.edgeLeft = null,
            e.edgeRight ? (this.edgeRight = new l.Vector2(e.edgeRight.x,e.edgeRight.y),
            _i(this.edgeRight, this.videoFeed)) : this.edgeRight = null;
            const o = new l.Vector3(e.landmarks3D[13].x,e.landmarks3D[13].y,e.landmarks3D[13].z)
              , h = new l.Vector3(e.landmarks3D[14].x,e.landmarks3D[14].y,e.landmarks3D[14].z);
            this.targetPos = o.clone().lerp(h, .666),
            this.result = e,
            this.options.debug && (this.segmentationBuffer = new Uint8Array(this.result.writeBuffer))
        }
        getFingerWidth(e) {
            if (!this.options.smoothFingerWidth)
                return this.lastFingerWidth;
            const i = this.fingerWidthAnalyzer.getAverageFingerWidth();
            return this.fingerWidthFilter.filter(i, void 0)
        }
        get maxWeight() {
            return this.options.maxWeight
        }
        get confidence() {
            return l.MathUtils.clamp(this.confidenceValue, 0, 1)
        }
        getProgress() {
            var s;
            return (((s = this.fingerWidthAnalyzer) == null ? void 0 : s.currentWeight) ?? 0) / this.options.maxWeight
        }
        getDebugSegmentationImageData() {
            if (!this.options.debug || !this.result)
                return null;
            const e = new ImageData(this.result.roi.width,this.result.roi.height);
            return e.data.set(this.segmentationBuffer.slice(0, this.result.roi.width * this.result.roi.height * 4)),
            e
        }
        reset() {
            var e;
            (e = this.fingerWidthAnalyzer) == null || e.reset()
        }
        dispose() {
            var e, i;
            (e = this.worker) == null || e.terminate(),
            (i = this.imageSegmenter) == null || i.close(),
            this.imageSegmenter = null,
            this.worker = null,
            this.segmentationBuffer = null,
            this.result = null
        }
    }
    class wu extends l.EventDispatcher {
        constructor(e, i, s, n) {
            if (super(),
            this.lastProgress = 0,
            this.lastSegmenterProgress = 0,
            this.done = !1,
            this.minHandDistance = 15,
            this.maxHandDistance = 150,
            this.lastRejectTime = 0,
            this.rejectCooldown = 500,
            this.lastRejectReason = null,
            this.requiredStillTime = 1e3,
            this.movementThreshold = .5,
            this.gracePeriod = 1e3,
            this.minTimeSinceFirstSample = 2e3,
            this.lastUpdateTime = 0,
            this.stillStartTime = -1,
            this.firstSampleTime = -1,
            this.smoothedFingerWidth = 0,
            this.smoothedFingerWidthFilter = new oe.OneEuroFilter(.025,.025,.025),
            this.knucklesFingerWidth = 0,
            this.knucklesFingerWidthFilter = new oe.OneEuroFilter(.025,.025,.025),
            this.knucklesFingerWidthSamples = 0,
            !n && s === "segmenter")
                throw new Error("Error: HandAnalyzer requires segmenter when fingerWidthDetectionMode is 'segmenter'");
            this.mpHand = e,
            this.videoFeed = i,
            this.segmenter = n,
            this.fingerWidthDetectionMode = s,
            this.lastUpdateTime = performance.now()
        }
        canDispatchReject(e) {
            const i = performance.now();
            return i - this.lastRejectTime >= this.rejectCooldown || e === this.lastRejectReason ? (this.lastRejectTime = i,
            this.lastRejectReason = e,
            !0) : !1
        }
        shouldShowWarning() {
            const e = performance.now();
            return e - this.lastUpdateTime > this.gracePeriod && e - this.firstSampleTime > this.minTimeSinceFirstSample
        }
        analyzeHand() {
            if (this.analyzeKnuckles(),
            this.fingerWidthDetectionMode === "segmenter") {
                if (this.done)
                    return;
                this.analyzeSegmenter(),
                this.smoothedFingerWidth = this.segmenter ? this.smoothedFingerWidthFilter.filter(this.segmenter.getFingerWidth(k.Ring), performance.now() / 1e3) : 1
            }
        }
        analyzeKnuckles() {
            let e = .875 * this.mpHand.landmarks3D[9].distanceTo(this.mpHand.landmarks3D[13])
              , i = Bt(this.mpHand.getSidewaysFactor(), .33, 0, 0, 1) ** .5;
            const s = Math.min(this.knucklesFingerWidthSamples / 8, 1);
            i = l.MathUtils.lerp(1, i, s),
            A("knucklesFingerWidth confidence", i),
            e = l.MathUtils.lerp(this.knucklesFingerWidth, e, i),
            this.knucklesFingerWidthSamples++;
            let n = .5 * (this.mpHand.getLandmarkMovementFactor(9) + this.mpHand.getLandmarkMovementFactor(13));
            n *= i,
            n = l.MathUtils.lerp(0, n, s),
            this.knucklesFingerWidthFilter.setMinCutoff(Bt(n, 0, 1, 2, .025)),
            this.knucklesFingerWidth = this.knucklesFingerWidthFilter.filter(e, performance.now() / 1e3),
            A("knucklesFingerWidth", this.knucklesFingerWidth)
        }
        analyzeSegmenter() {
            if (!this.segmenter)
                throw new Error("Error: Segmenter not initialized");
            const e = performance.now();
            if (this.mpHand.distance < this.minHandDistance) {
                this.canDispatchReject("tooClose") && this.dispatchEvent({
                    type: "handAnalysisReject",
                    detail: {
                        reason: "tooClose"
                    }
                }),
                this.stillStartTime = -1,
                this.lastUpdateTime = e;
                return
            }
            if (this.mpHand.distance > this.maxHandDistance) {
                this.canDispatchReject("tooFar") && this.dispatchEvent({
                    type: "handAnalysisReject",
                    detail: {
                        reason: "tooFar"
                    }
                }),
                this.stillStartTime = -1,
                this.lastUpdateTime = e;
                return
            }
            if (this.firstSampleTime === -1 && (this.firstSampleTime = e),
            this.mpHand.ringFingerMovementFactor < this.movementThreshold ? this.stillStartTime = -1 : this.stillStartTime === -1 && (this.stillStartTime = e),
            (this.stillStartTime === -1 ? 0 : e - this.stillStartTime) < this.requiredStillTime && (this.shouldShowWarning() && this.canDispatchReject("moving") && this.dispatchEvent({
                type: "handAnalysisReject",
                detail: {
                    reason: "moving"
                }
            }),
            this.mpHand.ringFingerMovementFactor < this.movementThreshold))
                return;
            const s = this.mpHand.landmarks.map(h => (h = h.clone(),
            zh(h, this.videoFeed),
            h));
            if (this.segmenter.isAsync() ? this.segmenter.detectAsync({
                landmarks: s
            }) : this.segmenter.detect({
                landmarks: s
            }),
            this.segmenter.isDoneSampling()) {
                this.done = !0,
                this.dispatchEvent({
                    type: "handAnalysisComplete",
                    detail: {}
                });
                return
            }
            const n = this.segmenter.getProgress() > this.lastSegmenterProgress;
            let r = this.segmenter.getProgress();
            r = Math.max(this.lastProgress, l.MathUtils.lerp(this.lastProgress, r, .05)),
            n && (this.lastUpdateTime = e),
            this.lastProgress = r,
            this.lastSegmenterProgress = this.segmenter.getProgress();
            const a = this.segmenter.last10Samples.slice(0, 4)
              , o = a.length > 3 && a.every(h => h.overstep);
            if (!n && o) {
                this.shouldShowWarning() && this.canDispatchReject("notSpread") && this.dispatchEvent({
                    type: "handAnalysisReject",
                    detail: {
                        reason: "notSpread"
                    }
                });
                return
            }
            this.dispatchEvent({
                type: "handAnalysisProgress",
                detail: {
                    progress: r
                }
            })
        }
        getFingerWidth(e) {
            let i = this.knucklesFingerWidth;
            if (this.segmenter) {
                const n = this.segmenter.getProgress();
                i = l.MathUtils.lerp(this.knucklesFingerWidth, this.smoothedFingerWidth * this.videoFeed.view.scale, n)
            }
            const s = Jr(e);
            return i * s
        }
        isDone() {
            return this.done
        }
        setHand(e) {
            this.mpHand = e
        }
        restart() {
            var e;
            this.lastProgress = 0,
            this.lastRejectTime = 0,
            this.lastRejectReason = null,
            this.stillStartTime = -1,
            this.lastUpdateTime = performance.now(),
            this.firstSampleTime = -1,
            this.done = !1,
            (e = this.segmenter) == null || e.restart()
        }
    }
    class bu {
        constructor(e) {
            if (this.viewer = e,
            this.setupModeFingerCylinder = null,
            this.gridHelper = null,
            this.axesBoxes = [],
            this.setupMode = !1,
            this.directionArrow = null,
            this.directionMarker = null,
            this.ringTryonPlugin = e.getPlugin(R.RingTryonPlugin),
            !this.ringTryonPlugin)
                throw new Error("RingTryonPlugin not found")
        }
        frontView() {
            const e = this.viewer.scene.activeCamera;
            e.position.set(0, 0, 5),
            e.target.set(0, 0, 0),
            e.positionUpdated(!0),
            e.targetUpdated(!0)
        }
        topView() {
            const e = this.viewer.scene.activeCamera;
            e.position.set(0, 5, 0),
            e.target.set(0, 0, 0),
            e.positionUpdated(!0),
            e.targetUpdated(!0)
        }
        sideView() {
            const e = this.viewer.scene.activeCamera;
            e.position.set(5, 0, 0),
            e.target.set(0, 0, 0),
            e.positionUpdated(!0),
            e.targetUpdated(!0)
        }
        rotateX90() {
            var e;
            (e = this.ringTryonPlugin).modelRotation ?? (e.modelRotation = new l.Vector3),
            this.ringTryonPlugin.modelRotation.x += Math.PI / 2,
            this.ringTryonPlugin.setDirty()
        }
        rotateY90() {
            var e;
            (e = this.ringTryonPlugin).modelRotation ?? (e.modelRotation = new l.Vector3),
            this.ringTryonPlugin.modelRotation.y += Math.PI / 2,
            this.ringTryonPlugin.setDirty()
        }
        rotateZ90() {
            var e;
            (e = this.ringTryonPlugin).modelRotation ?? (e.modelRotation = new l.Vector3),
            this.ringTryonPlugin.modelRotation.z += Math.PI / 2,
            this.ringTryonPlugin.setDirty()
        }
        downloadRingConfig() {
            var h, c, d, u, f, g, y, b;
            const e = {
                x: ((h = this.ringTryonPlugin.modelRotation) == null ? void 0 : h.x) ?? 0,
                y: ((c = this.ringTryonPlugin.modelRotation) == null ? void 0 : c.y) ?? 0,
                z: ((d = this.ringTryonPlugin.modelRotation) == null ? void 0 : d.z) ?? 0,
                isVector3: !0
            }
              , i = {
                x: ((u = this.ringTryonPlugin.modelPosition) == null ? void 0 : u.x) ?? 0,
                y: ((f = this.ringTryonPlugin.modelPosition) == null ? void 0 : f.y) ?? 0,
                z: ((g = this.ringTryonPlugin.modelPosition) == null ? void 0 : g.z) ?? 0,
                isVector3: !0
            }
              , s = {
                modelScaleFactor: this.ringTryonPlugin.modelScaleFactor,
                modelPosition: i,
                modelRotation: e,
                ssr: this.ringTryonPlugin.ssr,
                ssao: this.ringTryonPlugin.ssao,
                type: "RingTryonPlugin",
                resources: {
                    geometries: {},
                    materials: {},
                    textures: {},
                    images: {},
                    shapes: {},
                    skeletons: {},
                    animations: {},
                    extras: {}
                }
            }
              , n = new Blob([JSON.stringify(s, null, 2)],{
                type: "application/json"
            })
              , r = URL.createObjectURL(n)
              , a = document.createElement("a");
            a.href = r;
            const o = ((b = (y = this.ringTryonPlugin.modelRoot) == null ? void 0 : y.children[0]) == null ? void 0 : b.name) ?? "ring";
            a.download = o + ".json",
            a.click(),
            URL.revokeObjectURL(r)
        }
        enterSetupMode() {
            if (this.setupMode)
                return;
            this.setupMode = !0,
            this.setupModeFingerCylinder || (this.setupModeFingerCylinder = new Nh,
            this.setupModeFingerCylinder.shadowRoot = new l.Object3D,
            this.setupModeFingerCylinder.shadowRoot.rotateX(Math.PI / 2),
            this.setupModeFingerCylinder.shadowRoot.scale.set(.5, .5, 2.5),
            this.setupModeFingerCylinder.shadowRoot.add(new l.Mesh(new l.CylinderGeometry(1,1,1,32).rotateX(Math.PI / 2),new l.MeshStandardMaterial({
                color: "#494ca6",
                transparent: !0,
                opacity: .8,
                roughness: .5,
                metalness: .5
            }))),
            this.viewer.scene.add(this.setupModeFingerCylinder.shadowRoot)),
            this.directionArrow = new l.Group;
            const e = new l.CylinderGeometry(.01,.01,.4,32)
              , i = new l.MeshStandardMaterial({
                color: 16711935,
                depthWrite: !1,
                depthTest: !1
            })
              , s = new l.Mesh(e,i);
            s.renderOrder = 1e3,
            this.directionArrow.add(s);
            const n = new l.ConeGeometry(.05,.1,32)
              , r = new l.MeshBasicMaterial2({
                color: 16711935,
                depthWrite: !1,
                depthTest: !1
            })
              , a = new l.Mesh(n,r);
            a.position.y = .2,
            a.renderOrder = 1e3,
            this.directionArrow.add(a),
            this.directionArrow.renderOrder = 1e3,
            this.directionArrow.rotateX(Math.PI / 2),
            this.viewer.scene.add(this.directionArrow);
            const o = 100;
            this.gridHelper = new l.GridHelper(o,o),
            this.viewer.scene.add(this.gridHelper);
            const h = new l.BoxGeometry(.005,.005,100);
            for (let c = 0; c < 3; c++) {
                const d = new l.MeshBasicMaterial2({
                    color: 16711680
                })
                  , u = new l.Mesh(h,d);
                c === 0 ? (u.rotation.x = Math.PI / 2,
                d.color.set(65280)) : c === 1 ? (u.rotation.y = Math.PI / 2,
                d.color.set(16711680)) : (u.rotation.z = Math.PI / 2,
                d.color.set(255)),
                this.viewer.scene.add(u),
                this.axesBoxes.push(u)
            }
            this.ringTryonPlugin.setDirty()
        }
        exitSetupMode() {
            if (this.setupMode) {
                this.setupMode = !1,
                this.setupModeFingerCylinder && (this.viewer.scene.remove(this.setupModeFingerCylinder.shadowRoot),
                this.setupModeFingerCylinder.dispose(),
                this.setupModeFingerCylinder = null),
                this.gridHelper && (this.viewer.scene.remove(this.gridHelper),
                this.gridHelper.geometry.dispose(),
                this.gridHelper.material.dispose(),
                this.gridHelper = null);
                for (const e of this.axesBoxes)
                    this.viewer.scene.remove(e),
                    e.geometry.dispose(),
                    "dispose"in e.material && e.material.dispose();
                this.axesBoxes = [],
                this.directionArrow && (this.viewer.scene.remove(this.directionArrow),
                this.directionArrow.traverse(e => {
                    e instanceof l.Mesh && (e.geometry.dispose(),
                    e.material.dispose())
                }
                ),
                this.directionArrow = null),
                this.directionMarker && (this.viewer.scene.remove(this.directionMarker),
                this.directionMarker.geometry.dispose(),
                this.directionMarker.material.dispose(),
                this.directionMarker = null),
                this.ringTryonPlugin.setDirty()
            }
        }
        dispose() {
            this.exitSetupMode()
        }
    }
    var xu = Object.defineProperty
      , Cu = Object.getOwnPropertyDescriptor
      , le = (t, e, i, s) => {
        for (var n = s > 1 ? void 0 : s ? Cu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
            (a = t[r]) && (n = (s ? a(e, i, n) : a(n)) || n);
        return s && n && xu(e, i, n),
        n
    }
    ;
    const qh = location.search.includes("debug");
    R.RingTryonPlugin = class extends gc {
        constructor() {
            super(...arguments),
            this.modelScaleFactor = 1,
            this.modelRotation = new l.Vector3(0,0,0),
            this.modelPosition = new l.Vector3(0,0,0),
            this.ssr = {
                enabled: !0,
                intensity: 1.5,
                radius: 2
            },
            this.ssao = {
                enabled: !0,
                intensity: .2,
                radius: 1.83,
                falloff: 1.5,
                bias: 1e-5
            },
            this.frontView = () => {
                var e;
                return (e = this.setupMode) == null ? void 0 : e.frontView()
            }
            ,
            this.topView = () => {
                var e;
                return (e = this.setupMode) == null ? void 0 : e.topView()
            }
            ,
            this.sideView = () => {
                var e;
                return (e = this.setupMode) == null ? void 0 : e.sideView()
            }
            ,
            this.rotateX90 = () => {
                var e;
                return (e = this.setupMode) == null ? void 0 : e.rotateX90()
            }
            ,
            this.rotateY90 = () => {
                var e;
                return (e = this.setupMode) == null ? void 0 : e.rotateY90()
            }
            ,
            this.rotateZ90 = () => {
                var e;
                return (e = this.setupMode) == null ? void 0 : e.rotateZ90()
            }
            ,
            this.downloadRingConfig = () => {
                var e;
                return (e = this.setupMode) == null ? void 0 : e.downloadRingConfig()
            }
            ,
            this.setupMode = null,
            this.segmenterModelMinConfidence = .25,
            this.backgroundReflections = !0,
            this.backgroundPlaneScale = 2,
            this.backgroundPlaneStretch = 2,
            this.freeze = !1,
            this.fingerWidthDetectionMode = "landmarks",
            this.frameNumber = 0,
            this.occlusionModule = null,
            this.shadowModule = null,
            this.copyPass = null,
            this.backgroundPlane = null,
            this.lastPosition = new l.Vector3,
            this.lastQuaternion = new l.Quaternion,
            this.frameDelay = 1,
            this.minHandDistance = 15,
            this.useMotionBlur = !1,
            this.motionBlurPass = null,
            this.lastTime = 0
        }
        get mediaSettings() {
            return {
                ...super.mediaSettings,
                facingMode: "user"
            }
        }
        enterSetupMode() {
            return this.inSetupMode || !this._viewer || this.running || this._starting ? !1 : (this.inSetupMode = !0,
            this._savePluginSettings(),
            this._saveModelRootState(),
            this.setupMode = new bu(this._viewer),
            this.setupMode.enterSetupMode(),
            !0)
        }
        exitSetupMode() {
            var e;
            return !this.inSetupMode || !this._viewer || this.running || this._starting ? !1 : (this.inSetupMode = !1,
            (e = this.setupMode) == null || e.exitSetupMode(),
            this.setupMode = null,
            this._resetModelRootState(),
            this._setPluginSettings(this._lastPluginsState),
            !0)
        }
        onAdded(e) {
            return Ct.preload(),
            this.fingerWidthDetectionMode === "segmenter" && Ei.preload(),
            super.onAdded(e)
        }
        async onRemove(e) {
            var s, n, r, a, o, h;
            (s = this._occlusionRoot) == null || s.modelObject.clear(),
            (n = this._occlusionRoot) == null || n.dispose(),
            this._occlusionRoot = void 0,
            (r = this._shadowRoot) == null || r.modelObject.clear();
            const i = e.canvas.parentElement;
            if (!i)
                throw new Error("WebGi-Canvas has no parent node");
            return (a = this.handDetector) == null || a.dispose(),
            (o = this.segmenter) == null || o.dispose(),
            i.removeEventListener("click", this.onCanvasDoubleClickListener),
            window.removeEventListener("resize", this.onCanvasResizeListener),
            (h = this.setupMode) == null || h.dispose(),
            this.setupMode = null,
            super.onRemove(e)
        }
        get delayedVideoTexture() {
            var e;
            return ((e = this.copyPass) == null ? void 0 : e.texture) ?? this._videoFeed.texture
        }
        async start() {
            this.canStart() && this.inSetupMode && this.exitSetupMode(),
            await super.start()
        }
        async _start() {
            let e = 0;
            const i = 5;
            this.dispatchEvent({
                type: "initializationProgress",
                detail: {
                    progress: ++e / i
                }
            }),
            await this.initializeShadowModule(),
            await this.setupEventListeners(),
            await this.initializeBackgroundPlane(),
            await this.initializeHandDetection(e, i),
            await this.initializeOcclusionAndFadeEffects()
        }
        async initializeShadowModule() {
            this.shadowModule = new pu;
            const e = l.ViewerApp.VERSION.split(".").map(i => parseInt(i));
            e[0] > 0 || e[1] > 9 || e[1] === 9 && e[2] >= 9 ? (this._shadowRoot = await this._viewer.createObject3D(void 0, !0),
            this.shadowModule.init(this._viewer),
            this.shadowModule.shadowRoot.visible = !0,
            this._shadowRoot.modelObject.add(this.shadowModule.shadowRoot)) : console.error("WebGi version is too old, update to use shadows in the virtual ring try-on")
        }
        async setupEventListeners() {
            let e = 0;
            this.onCanvasDoubleClickListener = () => {
                var s;
                Date.now() - e < 300 ? (this.segmenter && (this.segmenter.restart(),
                (s = this.handAnalyzer) == null || s.restart(),
                this.dispatchEvent({
                    type: "handAnalysisProgress",
                    detail: {
                        progress: 0
                    }
                })),
                e = 0) : e = Date.now()
            }
            ;
            const i = this._viewer.canvas.parentElement;
            if (!i)
                throw new Error("WebGi-Canvas has no parent node");
            i.addEventListener("click", this.onCanvasDoubleClickListener),
            this.onCanvasResizeListener = () => {
                var s;
                this.segmenter && (this.segmenter.restart(),
                (s = this.handAnalyzer) == null || s.restart(),
                this.dispatchEvent({
                    type: "handAnalysisProgress",
                    detail: {
                        progress: 0
                    }
                }))
            }
            ,
            window.addEventListener("resize", this.onCanvasResizeListener)
        }
        async initializeBackgroundPlane() {
            const e = new l.SphereGeometry(1,32,32,0,Math.PI,0,Math.PI)
              , i = new l.MeshBasicMaterial2({
                color: 65280,
                colorWrite: !1,
                side: l.DoubleSide
            });
            this.backgroundPlane = new l.Mesh(e,i),
            this._viewer.scene.add(this.backgroundPlane),
            this.configureBackgroundMaterial(i)
        }
        configureBackgroundMaterial(e) {
            e.userData.pluginsDisabled = !0,
            e.userData[l.VelocityBufferPlugin.PluginType] = {
                disabled: !0
            },
            e.userData[l.BloomPlugin.PluginType] = {
                disabled: !0
            },
            e.userData.renderToDepth = !0,
            e.userData.ssaoCastDisabled = !0
        }
        async initializeHandDetection(e, i) {
            if (!this._videoFeed)
                throw new Error("Error starting plugin: No video feed");
            const s = this._viewer.scene.activeCamera.cameraObject
              , n = [];
            this.handDetector = new Ct(s,this._videoFeed),
            n.push(this.handDetector.init()),
            Promise.any(n).then( () => {
                this.dispatchEvent({
                    type: "initializationProgress",
                    detail: {
                        progress: ++e / i
                    }
                })
            }
            ),
            await Promise.allSettled(n),
            this.dispatchEvent({
                type: "initializationProgress",
                detail: {
                    progress: ++e / i
                }
            }),
            this.fingerWidthDetectionMode === "segmenter" && await this.initializeSegmenter(s),
            await this.runDryRuns(e, i),
            this.handAnalyzer = new wu(this.mpHand,this._videoFeed,this.fingerWidthDetectionMode,this.segmenter),
            this.fingerWidthDetectionMode === "segmenter" ? (this.handAnalyzer.addEventListener("handAnalysisProgress", r => this.dispatchEvent({
                type: "handAnalysisProgress",
                detail: r.detail
            })),
            this.handAnalyzer.addEventListener("handAnalysisReject", r => this.dispatchEvent({
                type: "handAnalysisReject",
                detail: r.detail
            })),
            this.handAnalyzer.addEventListener("handAnalysisComplete", () => this.dispatchEvent({
                type: "handAnalysisComplete",
                detail: {}
            })),
            this.dispatchEvent({
                type: "handAnalysisProgress",
                detail: {
                    progress: 0
                }
            })) : this.fingerWidthDetectionMode === "landmarks" && this.dispatchEvent({
                type: "handAnalysisComplete",
                detail: {}
            })
        }
        async initializeSegmenter(e) {
            console.log("Loading segmenter..."),
            this.segmenter = new Ei(this.mpHand,e,this._videoFeed,{
                async: !1,
                maxWeight: 6,
                smoothFingerWidth: !0,
                multiClass: !0,
                debug: qh,
                runForever: !0
            }),
            await this.segmenter.init()
        }
        async runDryRuns(e, i) {
            this.segmenter && (console.time("Segmenter dryrun"),
            await this.segmenter.dryrun(),
            console.timeEnd("Segmenter dryrun")),
            this.dispatchEvent({
                type: "initializationProgress",
                detail: {
                    progress: ++e / i
                }
            }),
            console.time("HandDetector dryrun"),
            await this.handDetector.dryrun(),
            console.timeEnd("HandDetector dryrun"),
            this.dispatchEvent({
                type: "initializationProgress",
                detail: {
                    progress: ++e / i
                }
            })
        }
        async initializeOcclusionAndFadeEffects() {
            var e, i;
            this.initDebugHelper(),
            this.copyPass = this.frameDelay > 0 ? new Pa(this._videoFeed.texture,this.frameDelay) : null,
            (e = this.copyPass) == null || e.render(this._viewer.renderer.rendererObject),
            this._viewer.scene.setBackground(this.delayedVideoTexture),
            (i = this.shadowModule) == null || i.setVideoTexture(this.delayedVideoTexture),
            this.occlusionModule = new fu(this.delayedVideoTexture),
            this._occlusionRoot = await this._viewer.createObject3D(void 0, !0),
            this._occlusionRoot.modelObject.add(this.occlusionModule.occlusionRoot),
            await this.patchFadeShader()
        }
        async patchFadeShader() {
            if (this.useMotionBlur) {
                this.motionBlurPass = new Sc;
                const a = this._viewer.renderer.composer;
                a.addPass(this.motionBlurPass),
                a.insertPass(this.motionBlurPass, a.passes.length - 1)
            }
            const e = this._viewer.scene.activeCamera.cameraObject
              , i = this.mpHand
              , s = this.segmenter ?? {
                getFingerWidth: () => this.getFingerWidth(k.Ring)
            }
              , r = this._viewer.getPlugin(l.CombinedPostPlugin).pass.passObject.material;
            this.fadeShaderExtension = new ia(e,i,s,k.Ring,this.delayedVideoTexture,.5,.375),
            r.registerMaterialExtensions([this.fadeShaderExtension]),
            r.needsUpdate = !0,
            r.setDirty()
        }
        get mpHand() {
            return this.handDetector.hand
        }
        initDebugHelper() {
            qh && (this.debugHelper = new Fa(this._viewer))
        }
        async _stop() {
            console.log("Stopping RingTryonPlugin"),
            await this.cleanupHandDetection(),
            await this.cleanupEffects(),
            await this.cleanupEventListeners(),
            await this.cleanupBackground(),
            await this.cleanupDebug(),
            this.frameNumber = 0,
            console.log("Stopped RingTryonPlugin")
        }
        async cleanupHandDetection() {
            var e, i;
            (e = this.handDetector) == null || e.dispose(),
            this.handDetector = void 0,
            (i = this.segmenter) == null || i.dispose(),
            this.segmenter = void 0,
            this.handAnalyzer = void 0
        }
        async cleanupEffects() {
            var r, a, o, h;
            (r = this.shadowModule) == null || r.dispose(),
            this.shadowModule = null,
            (a = this.occlusionModule) == null || a.dispose(),
            (o = this.copyPass) == null || o.dispose();
            const e = this._viewer.renderer.composer;
            this.motionBlurPass && e.removePass(this.motionBlurPass),
            (h = this.motionBlurPass) == null || h.dispose(),
            this.motionBlurPass = null;
            const s = this._viewer.getPlugin(l.CombinedPostPlugin).pass.passObject.material
              , n = s.materialExtensions.find(c => c instanceof ia);
            n && (s.unregisterMaterialExtensions([n]),
            s.materialExtensions = s.materialExtensions.filter(c => !(c instanceof ia)),
            s.needsUpdate = !0,
            s.setDirty(),
            this.fadeShaderExtension = void 0)
        }
        async cleanupEventListeners() {
            window.removeEventListener("dblclick", this.onCanvasDoubleClickListener),
            window.removeEventListener("resize", this.onCanvasResizeListener)
        }
        async cleanupBackground() {
            this.backgroundPlane && (this.backgroundPlane.geometry.dispose(),
            typeof this.backgroundPlane.material.dispose == "function" && this.backgroundPlane.material.dispose(),
            this.backgroundPlane.removeFromParent(),
            this.backgroundPlane = null)
        }
        async cleanupDebug() {
            var e;
            (e = this.debugHelper) == null || e.dispose()
        }
        async flipCamera() {
            const e = super.flipCamera();
            return e && (this._hideAll(!0),
            this._viewer.renderEnabled = !1,
            await e,
            this._viewer.renderEnabled = !0,
            e)
        }
        getFingerWidth(e) {
            return this.handAnalyzer.getFingerWidth(e)
        }
        _sync3DWithResult(e) {
            var n, r;
            if (this._starting || !this.running)
                return;
            if (this.frameNumber++,
            this.updateDebugInfo(),
            this.segmenter && !this.segmenter.isInitialized()) {
                this._hideAll(!0);
                return
            }
            if (this.freeze) {
                this._showAll();
                return
            }
            if (this.handDetector.isAsync() ? (this.handDetector.setNeedsSendNewFrame(),
            this.handDetector.detectAsync()) : this.handDetector.detect(this.frameNumber++),
            !this.handDetector.success) {
                this._hideAll(!0);
                return
            }
            if (!this._viewer.scene.activeCamera.cameraObject.isPerspectiveCamera)
                throw new Error("Camera is not perspective camera");
            const s = this.mpHand.getCameraLookAtFactor();
            if (A("handCameraLookAtFactor", s),
            (n = this.debugHelper) == null || n.update(this.mpHand.landmarks, this.mpHand.landmarks3D, this.mpHand.distance),
            this.mpHand.distance < this.minHandDistance) {
                this._hideAll();
                return
            }
            (r = this.segmenter) == null || r.setModelMinConfidence(this.segmenterModelMinConfidence),
            this.updateHandAnalysis(),
            this.updateRingAndEffects()
        }
        updateHandAnalysis() {
            var e, i;
            this.handDetector.success && ((e = this.handAnalyzer) == null || e.analyzeHand(),
            this.segmenter && ((i = this.debugHelper) == null || i.drawSegmenter(this.segmenter)))
        }
        updateRingAndEffects() {
            var a, o;
            if (!this.modelRoot || this.modelRoot.children.length === 0)
                return;
            const e = .3 + .25 * this.mpHand.getMappedBackHandFactor()
              , i = this.getFingerWidth(this.getCurrentFinger()) * e;
            (a = this.fadeShaderExtension) == null || a.setFingerWidthMultiplier(e),
            this.occlusionModule.connectCylinders(this.mpHand.landmarks3D, i * .9);
            const s = this.modelRoot
              , n = this.getCurrentFinger()
              , r = this.getFingerWidth(n);
            s.position.copy(this.mpHand.getRingAttachPositionForFinger(n)),
            s.scale.setScalar(r),
            s.quaternion.copy(this.mpHand.getRingAttachQuaternionForFinger(n)),
            (o = this.fadeShaderExtension) == null || o.setFinger(n),
            this.updateFingerCylinder(n),
            this.updateCameraNearFar(),
            this.updateBackgroundPlane()
        }
        updateMotionBlur(e) {
            var c, d, u;
            if (!this.motionBlurPass)
                return;
            const i = performance.now();
            let s = i - this.lastTime;
            s < .1 && (s = .1),
            this.lastTime = i;
            const n = this._viewer.scene.activeCamera.cameraObject
              , r = e.position.clone().project(n);
            r.x = (r.x + 1) / 2,
            r.y = (-r.y + 1) / 2;
            const a = this.lastPosition.clone().project(n);
            a.x = (a.x + 1) / 2,
            a.y = (-a.y + 1) / 2;
            const o = r.clone().sub(a);
            this.lastPosition.length() === 0 && o.set(0, 0, 0);
            const h = new l.Vector2(o.x,o.y);
            h.divideScalar(s / 16.666),
            (c = this.motionBlurPass) == null || c.setManualVelocity(h),
            (d = this.motionBlurPass) == null || d.setMotionBlurCenterAndRadius(new l.Vector2(r.x,r.y), 8 / n.position.distanceTo(e.position)),
            this.motionBlurPass.setIntensity(.75 * (((u = this.fadeShaderExtension) == null ? void 0 : u.opacity) ?? 1))
        }
        getCurrentFinger() {
            return this.modelRoot ? "finger"in this.modelRoot.userData ? $s(this.modelRoot.userData) : $s(this.modelRoot.children[0].userData) : k.Ring
        }
        updateFingerCylinder(e) {
            if (this.shadowModule) {
                const i = this.occlusionModule.getCylindersByFinger(e)
                  , s = this.occlusionModule.getSpheresByFinger(e);
                i.forEach(o => o.visible = !1),
                s.forEach(o => o.visible = !1);
                const n = this.shadowModule.shadowRoot;
                n.visible = !0;
                const r = i[0];
                n.position.copy(r.position),
                n.quaternion.copy(r.quaternion);
                const a = this.getFingerWidth(e) * .5 * .975;
                n.scale.copy(r.scale),
                n.scale.x = a,
                n.scale.y = a,
                n.scale.z *= 2
            }
        }
        updateDebugInfo() {
            if (A("lm14 3D", this.mpHand.landmarks3D[14].toArray().map(e => e.toFixed(1)).join(", ")),
            A("lm14 m", this.mpHand.getLandmarkMovementFactor(14)),
            A("handedness", this.mpHand.handedness),
            A("front hand", this.mpHand.isShowingFrontHand()),
            A("hand detector averageDetectionTime", this.handDetector.averageDetectionTime),
            A("hand detector samples", this.handDetector.samples),
            A("hand detector samples per second", this.handDetector.samplesPerSecond),
            A("distance", this.mpHand.distance),
            A("cameraLookAtFactor", this.mpHand.getCameraLookAtFactor()),
            A("fingerWidth", this.getFingerWidth(k.Ring)),
            this.segmenter) {
                A("segmenter detection time", this.segmenter.averageDetectionTime),
                A("segmenter samples", this.segmenter.samples),
                A("fingerWidth weight", this.segmenter.fingerWidthAnalyzer.currentWeight);
                const e = this.segmenter.fingerWidthAnalyzer.getStandardDeviation();
                A("fingerWidth std dev", e)
            }
            for (const [e,i] of this.mpHand.currentDebugEntries)
                A(e, i)
        }
        _postSync3DWithResult() {
            var e, i;
            super._postSync3DWithResult(),
            (e = this.fadeShaderExtension) == null || e.setVisible(this.visible, !this.hideImmediatelyFlag),
            this.modelRoot && ((i = this.fadeShaderExtension) == null || i.updateRingPosition(this.modelRoot.position)),
            this.updateMotionBlur(this.modelRoot),
            A("visible", this.visible)
        }
        updateBackgroundPlane() {
            var e;
            if (!(!this.backgroundPlane || !this.modelRoot)) {
                if (this.backgroundReflections) {
                    this.backgroundPlane.position.copy(this.modelRoot.position);
                    const i = this._viewer.scene.activeCamera.cameraObject;
                    this.backgroundPlane.lookAt(i.position),
                    this.backgroundPlane.scale.setScalar(this.backgroundPlaneScale * this.getFingerWidth(k.Ring)),
                    this.backgroundPlane.scale.z = this.backgroundPlaneStretch * this.getFingerWidth(k.Ring),
                    this.backgroundPlane.translateZ(this.backgroundPlaneStretch * this.getFingerWidth(k.Ring) / 2),
                    this.backgroundPlane.rotateX(Math.PI);
                    const s = this._viewer.getPlugin(l.TonemapPlugin);
                    this.backgroundPlane.material.userData.postTonemap = (e = s == null ? void 0 : s._extension) == null ? void 0 : e.tonemapBackground
                }
                this.backgroundPlane.visible = this.backgroundReflections
            }
        }
        updateCameraNearFar() {
            if (!this.modelRoot)
                return;
            const e = Math.abs(this.modelRoot.position.z)
              , i = 25
              , s = Math.max(e - i, .01)
              , n = e + i;
            this._viewer.scene.activeCamera.near = s,
            this._viewer.scene.activeCamera.far = n,
            this._viewer.scene.activeCamera.cameraObject.near = s,
            this._viewer.scene.activeCamera.cameraObject.far = n,
            this._viewer.scene.activeCamera.cameraObject.updateProjectionMatrix()
        }
        _preFrame() {
            var e, i, s;
            if (super._preFrame(),
            this.running || this.inSetupMode) {
                (e = this.modelRoot) == null || e.children.forEach(a => {
                    this.modelPosition && a.position.copy(this.modelPosition),
                    this.modelRotation && a.rotation.setFromVector3(this.modelRotation),
                    this.modelScaleFactor && a.scale.setScalar(this.modelScaleFactor)
                }
                );
                const n = (i = this._viewer) == null ? void 0 : i.getPlugin(l.SSRPlugin)
                  , r = (s = this._viewer) == null ? void 0 : s.getPlugin(l.SSAOPlugin);
                this.ssr && n && (n.enabled = this.ssr.enabled,
                n.passes.ssr.passObject.intensity = this.ssr.intensity,
                n.passes.ssr.passObject.objectRadius = this.ssr.radius),
                this.ssao && r && (r.enabled = this.ssao.enabled,
                r.passes.ssao.passObject.parameters.intensity = this.ssao.intensity,
                r.passes.ssao.passObject.parameters.occlusionWorldRadius = this.ssao.radius,
                r.passes.ssao.passObject.parameters.falloff = this.ssao.falloff,
                r.passes.ssao.passObject.parameters.bias = this.ssao.bias)
            }
        }
        _postFrame() {
            var s, n, r, a, o, h;
            if (super._postFrame(),
            !this.running)
                return;
            this.copyPass && (this.copyPass.srcTexture !== this._videoFeed.texture && ((s = this.segmenter) == null || s.restart(),
            (n = this.handAnalyzer) == null || n.restart(),
            this.dispatchEvent({
                type: "initialized",
                detail: {}
            }),
            (r = this.copyPass) == null || r.setTexture(this._videoFeed.texture),
            this._viewer.scene.setBackground(this.delayedVideoTexture),
            (a = this.shadowModule) == null || a.setVideoTexture(this.delayedVideoTexture),
            (o = this.fadeShaderExtension) == null || o.setVideoTexture(this.delayedVideoTexture)),
            this._viewer.scene.background !== this.delayedVideoTexture && this._viewer.scene.setBackground(this.delayedVideoTexture)),
            this.freeze || (h = this.copyPass) == null || h.render(this._viewer.renderer.rendererObject);
            const e = !this.fadeShaderExtension || this.fadeShaderExtension.opacity > 0
              , i = this.modelRoot;
            i && (this.lastPosition.copy(e ? i.position : new l.Vector3(0,0,0)),
            this.lastQuaternion.copy(e ? i.quaternion : new l.Quaternion(0,0,0,1)))
        }
        setDirty() {
            var e;
            (e = this._viewer) == null || e.setDirty()
        }
        assignMainRingToFinger(e) {
            if (!this.modelRoot)
                return;
            const i = $s({
                finger: e
            });
            this.mpHand.setFinger(i),
            this.modelRoot.userData.finger = i
        }
    }
    ,
    R.RingTryonPlugin.PluginType = "RingTryonPlugin",
    le([l.uiSlider("modelScaleFactor", [.01, 10], .001), l.onChange2(R.RingTryonPlugin.prototype.setDirty), l.serialize()], R.RingTryonPlugin.prototype, "modelScaleFactor", 2),
    le([l.uiVector("modelRotation", [-Math.PI, Math.PI], .001), l.onChange2(R.RingTryonPlugin.prototype.setDirty), l.serialize()], R.RingTryonPlugin.prototype, "modelRotation", 2),
    le([l.uiVector("modelPosition", [-1e3, 1e3], .001), l.onChange2(R.RingTryonPlugin.prototype.setDirty), l.serialize()], R.RingTryonPlugin.prototype, "modelPosition", 2),
    le([l.serialize()], R.RingTryonPlugin.prototype, "ssr", 2),
    le([l.serialize()], R.RingTryonPlugin.prototype, "ssao", 2),
    le([l.uiButton("Front View")], R.RingTryonPlugin.prototype, "frontView", 2),
    le([l.uiButton("Top View")], R.RingTryonPlugin.prototype, "topView", 2),
    le([l.uiButton("Side View")], R.RingTryonPlugin.prototype, "sideView", 2),
    le([l.uiButton("Rotate X 90°")], R.RingTryonPlugin.prototype, "rotateX90", 2),
    le([l.uiButton("Rotate Y 90°")], R.RingTryonPlugin.prototype, "rotateY90", 2),
    le([l.uiButton("Rotate Z 90°")], R.RingTryonPlugin.prototype, "rotateZ90", 2),
    le([l.uiButton("Download ring config")], R.RingTryonPlugin.prototype, "downloadRingConfig", 2),
    le([l.uiButton("Enter Setup Mode")], R.RingTryonPlugin.prototype, "enterSetupMode", 1),
    le([l.uiButton("Exit Setup Mode")], R.RingTryonPlugin.prototype, "exitSetupMode", 1),
    le([l.uiSlider("segmenterModelMinConfidence", [.01, 1], .01), l.serialize()], R.RingTryonPlugin.prototype, "segmenterModelMinConfidence", 2),
    le([l.uiToggle("Background Reflections")], R.RingTryonPlugin.prototype, "backgroundReflections", 2),
    le([l.uiSlider("backgroundPlaneScale", [.1, 10], .01), l.onChange2(R.RingTryonPlugin.prototype.setDirty), l.serialize()], R.RingTryonPlugin.prototype, "backgroundPlaneScale", 2),
    le([l.uiSlider("backgroundPlaneStretch", [.1, 10], .01), l.onChange2(R.RingTryonPlugin.prototype.setDirty), l.serialize()], R.RingTryonPlugin.prototype, "backgroundPlaneStretch", 2),
    le([l.uiToggle("Freeze")], R.RingTryonPlugin.prototype, "freeze", 2),
    R.RingTryonPlugin = le([l.uiFolder("Ring Try-On")], R.RingTryonPlugin);
    const da = class da extends l.AViewerPlugin {
        constructor() {
            super(),
            this.dependencies = [R.RingTryonPlugin],
            this.enabled = !0,
            this.elements = {
                container: document.createElement("div"),
                text: document.createElement("div"),
                subText: document.createElement("div"),
                progressBar: document.createElement("div"),
                style: document.createElement("style")
            },
            this.messages = {
                initialization: "Loading...",
                initializationSubText: "Loading models... This will take a few seconds.",
                error: {
                    noCameraSupport: "Your browser does not support webcam access. Please try again with a different browser.",
                    permissionDenied: "You have denied access to your webcam. Please allow access and try again.",
                    startupFailed: "There was an error starting the try-on. Please try again.",
                    mediaDevicesError: "There was an error getting your media devices. Please try again.",
                    runtimeError: "The try-on encountered an error during runtime. Please try again.",
                    unknown: "There was an error with the try-on. Please try again."
                }
            },
            this.boundEventHandlers = new Map
        }
        async onAdded(e) {
            await super.onAdded(e),
            this.ringTryonPlugin = e.getPlugin(R.RingTryonPlugin) || ( () => {
                throw new Error("RingTryonPlugin not found")
            }
            )(),
            this.setupEventListeners()
        }
        async onRemove(e) {
            return this.cleanup(),
            super.onRemove(e)
        }
        initializeElements() {
            var r, a, o, h;
            const {container: e, text: i, subText: s, progressBar: n} = this.elements;
            e.id = "ringTryonUIPlugin",
            e.style.display = "none",
            i.id = "ringTryonUIPluginText",
            s.id = "ringTryonUIPluginSubText",
            n.id = "ringTryonUIPluginProgressBar",
            e.append(i, s, n),
            (a = (r = this._viewer) == null ? void 0 : r.canvas.parentNode) == null || a.appendChild(this.elements.style),
            (h = (o = this._viewer) == null ? void 0 : o.canvas.parentNode) == null || h.insertBefore(e, this._viewer.canvas.nextSibling)
        }
        setupStyles() {
            this.elements.style.textContent = `
            #ringTryonUIPlugin {
                position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                padding: 4rem; border-radius: 0.5rem; z-index: 1000; width: calc(min(80vw, 600px));
                font-size: calc(min(2rem, 24px)); text-align: center;
                backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.1);
                color: white; text-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
                border: 1px solid rgba(255, 255, 255, 0.5);
            }
            #ringTryonUIPluginText { margin-bottom: 1rem; font-weight: 600; }
            #ringTryonUIPluginSubText { font-size: 1rem; color: #eee; }
            #ringTryonUIPluginProgressBar {
                width: 100%; height: 1rem; background: #333333;
                border-radius: 0.5rem; margin-top: 2rem;
                box-shadow: 0 0 12px rgba(255, 255, 255, 0.25);
                animation: pulse 2s infinite ease-in-out;
            }
            @keyframes pulse {
                0%, 100% { box-shadow: 0 0 12px rgba(255, 255, 255, 0.25); }
                50% { box-shadow: 0 0 12px rgba(255, 255, 255, 0.75); }
            }
            @media only screen and (max-width: 768px) {
                #ringTryonUIPlugin { width: 95vw; padding: 2rem; font-size: 1.5rem; }
                #ringTryonUIPluginSubText { font-size: 14px; }
            }
        `
        }
        setupEventListeners() {
            const {container: e, text: i, subText: s, progressBar: n} = this.elements
              , r = () => {
                const {container: o, style: h} = this.elements;
                o.remove(),
                h.remove(),
                n.style.background = "linear-gradient(to right, white 0%, #333333 0%)",
                o.classList.remove("fade-out")
            }
            ;
            Object.entries({
                start: () => {
                    this.initializeElements(),
                    this.setupStyles(),
                    e.style.display = "block",
                    i.textContent = this.messages.initialization,
                    s.textContent = this.messages.initializationSubText
                }
                ,
                initializationProgress: o => n.style.background = `linear-gradient(to right, white ${o.detail.progress * 100}%, #333333 0%)`,
                initialized: () => {
                    e.style.display = "none"
                }
                ,
                stop: () => r(),
                error: o => {
                    const h = o.detail.reason
                      , c = this.messages.error[h] ?? this.messages.error.unknown;
                    alert(c),
                    r()
                }
            }).forEach( ([o,h]) => {
                var d;
                const c = h.bind(this);
                this.boundEventHandlers.set(o, c),
                (d = this.ringTryonPlugin) == null || d.addEventListener(o, c)
            }
            )
        }
        cleanup() {
            const {container: e, style: i} = this.elements;
            e.remove(),
            i.remove(),
            this.boundEventHandlers.forEach( (s, n) => {
                var r;
                (r = this.ringTryonPlugin) == null || r.removeEventListener(n, s)
            }
            ),
            this.boundEventHandlers.clear()
        }
    }
    ;
    da.PluginType = "RingTryonUIPlugin";
    let sa = da;
    /**
 * @license
 * ts-browser-helpers v0.16.3
 * Copyright 2022-2025 repalash <palash@shaders.app>
 * MIT License
 * See ./dependencies.txt for bundled third-party dependencies and licenses.
 */
    const Gh = (t, ...e) => String.raw({
        raw: t
    }, ...e);
    function na(t, e) {
        return Object.hasOwn ? Object.hasOwn(t, e) : t.hasOwnProperty(e)
    }
    const Yh = class fn {
        static callFunction(e, i, s=[]) {
            if (!i)
                return e(...s);
            if (e.name && i[e.name] === e)
                return e.call(i, ...s);
            fn.methodMap.has(i) || fn.methodMap.set(i, new WeakMap);
            const n = fn.methodMap.get(i);
            if (!n.has(e)) {
                let r = i;
                for (; r; ) {
                    const a = Object.values(Object.getOwnPropertyDescriptors(r));
                    for (let o of a)
                        if (o.value === e)
                            return n.set(e, !0),
                            e.call(i, ...s);
                    r = Object.getPrototypeOf(r)
                }
                n.set(e, !1)
            }
            return n.get(e) ? e.call(i, ...s) : e(...s)
        }
    }
    ;
    Yh.methodMap = new WeakMap;
    let Su = Yh;
    function ku(t, e="param") {
        if (!t)
            throw new Error("onChange: fnKey is undefined, make sure the function exists or provide a string");
        return (i, s, n) => {
            const r = {
                get() {
                    return this[`_oc_${s}`]
                },
                set(a) {
                    var o;
                    const h = this[`_oc_${s}`];
                    if (h === a)
                        return;
                    this[`_oc_${s}`] = a;
                    const c = e === "param" ? [s, a, h, this] : e === "object" ? [{
                        key: s,
                        value: a,
                        oldValue: h,
                        target: this
                    }] : [];
                    typeof t == "string" ? (o = this[t]) == null || o.call(this, ...c) : typeof t == "function" && Su.callFunction(t, this, c)
                }
            };
            if (n)
                return na(n, "value") && delete n.value,
                na(n, "writable") && delete n.writable,
                na(n, "initializer") && delete n.initializer,
                Object.assign(n, r);
            Object.defineProperty(i, s, r)
        }
    }
    var Fu = Object.defineProperty
      , Pu = Object.getOwnPropertyDescriptor
      , nn = (t, e, i, s) => {
        for (var n = s > 1 ? void 0 : s ? Pu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
            (a = t[r]) && (n = (s ? a(e, i, n) : a(n)) || n);
        return s && n && Fu(e, i, n),
        n
    }
    ;
    let Yt = class {
        constructor(t) {
            this.enabled = !0,
            this.width = .1,
            this.color = new l.Color(0,0,0),
            this.extraUniforms = {
                width: {
                    value: 0
                },
                color: {
                    value: new l.Color(0,0,0)
                }
            },
            this.parsFragmentSnippet = () => this.enabled ? Gh`
            uniform float width;
            uniform vec3 color;
        ` : "",
            this._combinedPostPlugin = t.getPlugin(l.CombinedPostPlugin),
            this._setDirty = this._setDirty.bind(this)
        }
        shaderExtender(t) {
            this.enabled && (t.fragmentShader = l.shaderReplaceString(t.fragmentShader, "#glMarker", Gh`
            gl_FragColor.rgb = mix(
                gl_FragColor.rgb,
                color,
                step(vUv.x, width) + step(1.0 - width, vUv.x)
            );

            #glMarker
        `))
        }
        onObjectRender() {
            this.enabled && (this.extraUniforms.width.value = .5 * this.width,
            this.extraUniforms.color.value.copy(this.color))
        }
        getUiConfig() {
            return this.uiConfig
        }
        computeCacheKey() {
            return this.enabled ? "1" : "0"
        }
        isCompatible() {
            return !0
        }
        _setDirty() {
            this._combinedPostPlugin && (this._combinedPostPlugin.pass.dirty = !0)
        }
        setDirty() {
            var t;
            (t = this.__setDirty) == null || t.call(this),
            this._setDirty()
        }
    }
    ;
    nn([ku(Yt.prototype._setDirty), l.uiToggle("Enable"), l.serialize()], Yt.prototype, "enabled", 2),
    nn([l.uiSlider("Width", [0, 1], .01), l.serialize()], Yt.prototype, "width", 2),
    nn([l.uiColor("Color"), l.serialize()], Yt.prototype, "color", 2),
    Yt = nn([l.uiFolder("Screen Borders")], Yt);
    const ua = class ua extends l.FilmicGrainPlugin {
        generateExtension(e) {
            return new Yt(e)
        }
        onRemove(e) {
            return this._extension && (this._extension.enabled = !1,
            this._extension.setDirty()),
            super.onRemove(e)
        }
        set width(e) {
            this._extension && "width"in this._extension && (this._extension.width = e,
            this._extension.setDirty())
        }
        set color(e) {
            this._extension && "color"in this._extension && (this._extension.color = e,
            this._extension.setDirty())
        }
        get width() {
            var e;
            return ((e = this._extension) == null ? void 0 : e.width) ?? 0
        }
        get color() {
            var e;
            return ((e = this._extension) == null ? void 0 : e.color) ?? new l.Color(0,0,0)
        }
    }
    ;
    ua.PluginType = "ScreenBorders";
    let ra = ua;
    class Eu {
        constructor(e, i, s) {
            this.renderer = e,
            this.scene = new l.Scene,
            this.camera = new l.OrthographicCamera(-1,1,1,-1,0,1),
            this.material = new l.ShaderMaterial({
                uniforms: i,
                vertexShader: `
                varying vec2 vUv;

                void main() {
                    gl_Position = vec4(position, 1.0);

                    vUv = uv;
                }
            `,
                fragmentShader: s
            });
            const n = new l.PlaneGeometry(2,2);
            this.quad = new l.Mesh(n,this.material),
            this.scene.add(this.quad);
            const r = this.renderer.getSize(new l.Vector2);
            this.renderTarget = new l.WebGLRenderTarget(r.x,r.y,{
                minFilter: l.LinearFilter,
                magFilter: l.LinearFilter,
                format: l.RedFormat,
                colorSpace: l.NoColorSpace,
                generateMipmaps: !1,
                type: l.UnsignedByteType,
                depthBuffer: !1
            })
        }
        render() {
            this.renderer.setRenderTarget(this.renderTarget),
            this.renderer.render(this.scene, this.camera),
            this.renderer.setRenderTarget(null)
        }
        setSize(e, i) {
            this.renderTarget.setSize(e, i)
        }
        getTexture() {
            return this.renderTarget.texture
        }
        getMaterial() {
            return this.material
        }
        getRenderTarget() {
            return this.renderTarget
        }
        dispose() {
            this.renderTarget.dispose(),
            this.material.dispose(),
            this.quad.geometry.dispose()
        }
    }
    class Mu extends Eu {
        constructor(e, i, s, n) {
            i = {
                ...i,
                videoTexture: {
                    value: n
                },
                videoRepeat: {
                    value: n.repeat
                },
                videoOffset: {
                    value: n.offset
                },
                resolution: {
                    get value() {
                        return e.getSize(new l.Vector2)
                    }
                },
                maskThreshold: {
                    get value() {
                        return T.maskThreshold
                    }
                },
                maskRange: {
                    get value() {
                        return T.maskRange
                    }
                }
            },
            super(e, i, s),
            this.renderer = e
        }
    }
    const hn = class hn extends Mu {
        constructor(e, i, s=0) {
            const n = {
                refTexture: {
                    value: null
                },
                debug: {
                    get value() {
                        return T.showHandMask
                    }
                }
            };
            super(e, n, hn.fragmentShader, i),
            this.segmentationMode = 0,
            this.copyPass = null,
            this.referenceTexture = null,
            this.segmentationMode = s,
            this.srcTexture = i,
            this.material.defines.segmentationMode = s,
            this.copyPass = new Pa(this.srcTexture,1);
            const r = this.copyPass.texture;
            this.referenceTexture = r,
            this.material.uniforms.refTexture.value = r
        }
        updateReferenceBackground() {
            this.segmentationMode === 0 && this.copyPass.render(this.renderer)
        }
        update() {
            this.referenceTexture && (this.referenceTexture.center = this.srcTexture.center,
            this.referenceTexture.repeat = this.srcTexture.repeat,
            this.referenceTexture.offset = this.srcTexture.offset)
        }
    }
    ;
    hn.fragmentShader = `
    varying vec2 vUv;

    uniform float maskThreshold;
    uniform float maskRange;

    uniform float zoom;
    uniform vec2 landmarksPositions[21];

    uniform sampler2D refTexture;
    uniform sampler2D videoTexture;
    uniform vec2 videoRepeat;
    uniform vec2 videoOffset;
    uniform vec2 resolution;    
    uniform bool debug;
    
    float colorDistance(vec3 a, vec3 b) {
        // Convert to HSV
        float maxA = max(max(a.r, a.g), a.b);
        float minA = min(min(a.r, a.g), a.b);
        float maxB = max(max(b.r, b.g), b.b);
        float minB = min(min(b.r, b.g), b.b);
        
        // Calculate saturation
        float satA = maxA > 0.0 ? (maxA - minA) / maxA : 0.0;
        float satB = maxB > 0.0 ? (maxB - minB) / maxB : 0.0;
        
        // Calculate value (brightness)
        float valA = maxA;
        float valB = maxB;
        
        // Calculate hue difference (simplified)
        vec3 diff = a - b;
        float hueDiff = length(diff);
        
        // Weighted combination of hue, saturation, and value differences
        // Higher weight for saturation difference since hands tend to have higher saturation
        float saturationWeight = 2.0;
        float valueWeight = 0.5;
        float hueWeight = 1.0;
        
        return sqrt(
            hueWeight * hueDiff * hueDiff +
            saturationWeight * (satA - satB) * (satA - satB) +
            valueWeight * (valA - valB) * (valA - valB)
        );
    }

    void main() {
        vec2 uv = vUv;

        // todo use mirror uniform
        uv = uv * videoRepeat + videoOffset;

        vec3 color = textureLod(videoTexture, uv, 0.).rgb;
        vec3 bgColor = textureLod(refTexture, vec2(1. - uv.x, uv.y), 0.).rgb;
        
        float diff = colorDistance(color, bgColor);

        float threshold = maskThreshold * 0.25;

        float mask = smoothstep(threshold - maskRange, threshold + maskRange, diff);

        gl_FragColor = vec4(vec3(mask), 1.0);
    }
`;
    let $i = hn;
    class Tu {
        constructor(e, i, s=null) {
            this.debugHelper = null,
            this.buffer = new Uint8Array,
            this.landmarks = [],
            this.debugHelper = s,
            this.renderer = e.renderer.rendererObject,
            this.fingerWidthPass = new $i(this.renderer,i)
        }
        update(e) {
            const i = performance.now();
            this.landmarks = e;
            const s = this.fingerWidthPass.getRenderTarget()
              , n = 1536
              , r = 1536;
            (this.buffer.length === 0 || s.width !== n || s.height !== r) && (s.setSize(n, r),
            this.buffer = new Uint8Array(n * r)),
            this.fingerWidthPass.update(),
            this.fingerWidthPass.render(),
            this.renderer.readRenderTargetPixels(this.fingerWidthPass.getRenderTarget(), 0, 0, n, r, this.buffer),
            A("EdgeDetector update", performance.now() - i)
        }
        getFirstEdgeDetectionPixel(e, i, {retry: s=!1, finger: n=k.Ring}) {
            var ee, ce, M;
            const r = new l.Vector2;
            this.renderer.getSize(r);
            const a = i.clone().multiply(r).sub(e.clone().multiply(r)).normalize()
              , o = a.clone();
            o.set(a.y, -a.x);
            const h = this.landmarks.map(L => new l.Vector2(L.x,L.y).multiply(r));
            h.forEach(L => L.x = r.x - L.x),
            e = e.clone().multiply(r),
            i = i.clone().multiply(r);
            const c = L => {
                let de = -1
                  , se = -1
                  , z = 1 / 0;
                for (let xe = 0; xe < 5; xe++) {
                    const Kt = qe(xe);
                    for (let rt = 0; rt < Kt.length; rt++) {
                        const Ve = h[Kt[rt]]
                          , ge = h[Kt[rt + 1]];
                        if (!ge)
                            continue;
                        let Ri = $d(L, Ve, ge);
                        xe === n && (Ri *= .6),
                        Ri < z && (z = Ri,
                        de = xe,
                        se = rt)
                    }
                }
                return [de, se, z]
            }
              , d = (ee = this.debugHelper) == null ? void 0 : ee.getContext()
              , u = this.fingerWidthPass.getRenderTarget()
              , f = 256
              , g = 16
              , y = u.width / r.x
              , b = u.height / r.y
              , w = (L, de) => {
                L = L.clone();
                for (let se = 0; se < f; se++) {
                    const z = ~~L.x
                      , xe = ~~L.y
                      , Kt = ~~(z * y)
                      , rt = ~~(xe * b);
                    if (se % g === 0) {
                        const [ge] = c(L);
                        if (n !== ge)
                            return null
                    }
                    d && (d.beginPath(),
                    d.fillStyle = "blue",
                    d.arc((r.x - z) / r.x * this.debugHelper.debugCanvas.width, xe / r.y * this.debugHelper.debugCanvas.height, 2, 0, Math.PI * 2),
                    d.fill());
                    const Ve = Kt + (u.width - rt) * u.width;
                    if (this.buffer[Ve] < 128) {
                        const [ge] = c(L);
                        return n !== ge ? null : new l.Vector2(z,xe)
                    }
                    L.add(de)
                }
                return null
            }
            ;
            let p = null
              , v = null;
            const D = o.clone().negate()
              , V = s ? 12 : 1;
            for (let L = 0; L < V; L++) {
                const de = .875 * L / V
                  , se = e.clone().lerp(i, de)
                  , z = se.clone().sub(e);
                if (p ?? (p = ((ce = w(se, o)) == null ? void 0 : ce.sub(z)) ?? null),
                v ?? (v = ((M = w(se, D)) == null ? void 0 : M.sub(z)) ?? null),
                p && v)
                    break
            }
            return [p, v].forEach(L => L == null ? void 0 : L.divide(r)),
            [p, v]
        }
        getEdgesFrom3DPositions(e, i, s, {retry: n=!1, finger: r=k.Ring}) {
            var f, g, y, b, w, p;
            const a = Ji(e, s)
              , o = Ji(i, s)
              , h = new l.Vector2(a.x,a.y)
              , c = new l.Vector2(o.x,o.y)
              , [d,u] = this.getFirstEdgeDetectionPixel(h, c, {
                retry: n,
                finger: r
            });
            if (n) {
                const v = new l.Vector2;
                this.renderer.getSize(v);
                const D = c.clone().multiply(v).sub(h.clone().multiply(v)).normalize()
                  , V = D.clone();
                V.set(D.y, -D.x);
                const ee = h.clone().multiply(v)
                  , ce = h.clone().multiply(v);
                if (ee.add(V.clone().multiplyScalar(1e3)),
                ce.sub(V.clone().multiplyScalar(1e3)),
                d) {
                    (f = this.debugHelper) == null || f.drawDot(d, "yellow", !0);
                    const M = d.clone().multiply(v)
                      , L = en(ee, ce, M);
                    L.point.divide(v),
                    d.copy(L.point),
                    (g = this.debugHelper) == null || g.drawDot(L.point, "magenta", !0)
                }
                if (u) {
                    (y = this.debugHelper) == null || y.drawDot(u, "yellow", !0);
                    const M = u.clone().multiply(v)
                      , L = en(ee, ce, M);
                    L.point.divide(v),
                    u.copy(L.point),
                    (b = this.debugHelper) == null || b.drawDot(L.point, "magenta", !0)
                }
                (w = this.debugHelper) == null || w.drawDot(ee, "orange"),
                (p = this.debugHelper) == null || p.drawDot(ce, "orange")
            }
            return [d, u]
        }
        dispose() {
            this.fingerWidthPass.dispose()
        }
    }
    const Lu = new l.Vector3
      , Kh = "debug-center-width"
      , Au = `
    position: fixed;
    width: 240px;
    right: 24px;
    bottom: 24px;
    background: white;
    z-index: 9999;
    color: black;
    font-weight: 600;
    text-align: center;
    padding: 8px;
`;
    function Mi(t, e, i) {
        const s = document.getElementById(Kh);
        if (!s)
            return;
        s.style.background = t,
        s.innerText = e,
        i.fingerWidthAnalyzer.currentWeight >= rn.MIN_REQUIRED_SAMPLES ? s.style.border = "2px solid " + t : s.style.border = "2px solid yellow"
    }
    const aa = new l.Object3D
      , oa = new l.Object3D;
    aa.add(oa);
    const es = class es {
        constructor(e, i, s, n=null) {
            this.mpHand = null,
            this.selectedEdge = 1,
            this.alignPos = new l.Vector3,
            this.debugHelper = null,
            this.hasBothEdges = !1,
            this.fingerData = new Map,
            this.didUpdateStaticBackground = !1,
            this.staticBackgroundTimeout = null,
            this.viewer = e,
            this.videoFeed = s,
            this.debugHelper = n,
            this.edgeDetector = new Tu(e,i,n),
            this.camera = e.scene.activeCamera.cameraObject,
            this.initDebugDisplay(),
            this.initFingerData()
        }
        initFingerData() {
            this.fingerData.clear();
            for (let e = 0; e < 5; e++)
                this.fingerData.set(e, {
                    width: 1.5,
                    offset: new l.Vector3,
                    fingerWidthConfidence: 1,
                    offsetFilters: Array(3).fill(0).map( () => new oe.OneEuroFilter(60,1,1,1)),
                    positionFilters: Array(3).fill(0).map( () => new oe.OneEuroFilter(60,1,1,1)),
                    edgeMovementFilter: new oe.OneEuroFilter(60,.5,.1,.1),
                    quaternionFilter: new Qr(60,8,32),
                    fingerWidthFilter: new oe.OneEuroFilter(60,1,1,1),
                    fingerWidthConfidenceFilter: new oe.OneEuroFilter(60,2,2,2),
                    fingerWidthAnalyzer: new Xh(100),
                    lastWorldCenterPos: new l.Vector3,
                    centerConfidence: 1,
                    initialized: !1,
                    handedness: "Left",
                    frontHand: !1
                })
        }
        setMPHand(e) {
            this.mpHand = e
        }
        hasEnoughData() {
            return this.fingerData.get(k.Ring).initialized
        }
        initDebugDisplay() {
            const e = location.search.includes("debug")
              , i = document.createElement("div");
            i.id = Kh,
            i.style.cssText = Au,
            document.body.appendChild(i),
            e || (i.style.display = "none")
        }
        handleBothEdges(e, i, s, n) {
            var w;
            if (Math.abs(s - 2.5) > 2 || s < .001)
                return !1;
            const {fingerWidthConfidence: a, fingerWidthAnalyzer: o} = this.fingerData.get(n)
              , h = o.currentWeight >= es.MIN_REQUIRED_SAMPLES
              , c = Bt(o.currentWeight, 0, es.MIN_REQUIRED_SAMPLES, 0, 1);
            if (!h && a < .9)
                return Mi("#ff0055", "finger width confidence too low", this.fingerData.get(n)),
                !1;
            const d = []
              , u = [[k.Index, 5, 6], [k.Middle, 9, 10], [k.Ring, 13, 14], [k.Pinky, 17, 18]].filter( ([p]) => p !== n);
            for (const [p,v,D] of u) {
                const V = this.mpHand.landmarks3D[v]
                  , ee = this.mpHand.landmarks3D[D]
                  , ce = this.mpHand.landmarks[v]
                  , M = this.mpHand.landmarks[D]
                  , [L,de] = this.edgeDetector.getEdgesFrom3DPositions(ee, V, this.camera, {
                    retry: !1,
                    finger: p
                });
                if (L && de) {
                    const se = this.edgeDetectorPixelsToWidth(L, de, V.z);
                    if (Math.abs(se - 1.5) > 2)
                        continue;
                    d.push(se),
                    (w = this.debugHelper) == null || w.drawEdgeDetectionResult(L, de, ce, M)
                }
            }
            let f = !0;
            if (d.length > 0) {
                const p = Math.min(...d)
                  , v = Math.max(...d);
                A("minFingerWidth", p),
                A("maxFingerWidth", v),
                f = s > p * .5 && s < v * 1.5
            }
            A("currentWidth", s);
            const g = o.getAverageFingerWidth()
              , y = l.MathUtils.lerp(.25, .5, a) + (1 - c) * 1;
            if (g > 0 && Math.abs(g - s) > y && (f = !1,
            console.log("failed range check", g, s, y)),
            f)
                Mi("#55ff55", "success", this.fingerData.get(n));
            else
                return Mi("#ff5555", "failed range check", this.fingerData.get(n)),
                !1;
            const b = this.mpHand.getLandmarkMovementFactor(qe(n)[1]);
            return d.length === u.length && b > .1 && a > .99 && o.addMeasurement(s, 1),
            A("currentWeight", o.currentWeight),
            this.alignPos.copy(xt(i, e.z, this.camera)),
            !0
        }
        edgeDetectorPixelsToWidth(e, i, s) {
            const n = xt(e, s, this.camera)
              , r = xt(i, s, this.camera);
            let a = n.distanceTo(r);
            return a /= this.videoFeed.view.scale,
            a
        }
        detectEdges(e, i, s, n) {
            var h, c;
            let r = null
              , a = null
              , o = e.clone();
            if (n)
                n.edgeRight && (r = (h = n.edgeRight) == null ? void 0 : h.clone()),
                n.edgeLeft && (a = (c = n.edgeLeft) == null ? void 0 : c.clone()),
                r && (r.x = 1 - r.x),
                a && (a.x = 1 - a.x),
                o = n.targetPos;
            else {
                this.edgeDetector.update(this.mpHand.landmarks);
                const d = performance.now();
                [r,a] = this.edgeDetector.getEdgesFrom3DPositions(e, i, this.camera, {
                    retry: !0,
                    finger: s
                }),
                A("find ring finger edges", performance.now() - d)
            }
            return {
                firstPixelLeft: r,
                firstPixelRight: a,
                targetPos: o
            }
        }
        validateFingerPosition(e, i) {
            if (!this.mpHand)
                return !1;
            const s = this.mpHand.getLandmarkMovementFactor(qe(e)[1]);
            return i && s < .01 ? (Mi("#ff5555", "finger moving too much", this.fingerData.get(e)),
            !1) : !0
        }
        calculateFingerWidthConfidence(e) {
            var xe;
            const i = qe(e)
              , s = this.mpHand.targetLandmarks[i[0]]
              , n = this.mpHand.targetLandmarks[i[1]]
              , r = this.mpHand.targetLandmarks[i[2]]
              , a = this.mpHand.targetLandmarks[i[3]]
              , o = n.distanceTo(r) * 100
              , h = n.distanceTo(a) * 100;
            A("distBC", o),
            A("distBD", h);
            const c = new l.Vector3((s.x + n.x) / 2,(s.y + n.y) / 2,0)
              , d = s.clone().sub(c).multiplyScalar(1.5).add(c)
              , u = n.clone().sub(c).multiplyScalar(1.5).add(c)
              , {point: f, t: g} = en(d, u, r)
              , {point: y, t: b} = en(d, u, a)
              , w = Math.min(g, b);
            let p = 1;
            const v = Bt(w, .8, 1, 0, 1);
            (xe = this.debugHelper) == null || xe.drawDot(g < b ? f : y, "#0f0a7f"),
            p *= v;
            const D = this.mpHand.landmarks3D[i[0]]
              , V = this.mpHand.landmarks3D[i[1]]
              , ee = this.mpHand.landmarks3D[i[3]]
              , ce = Math.atan2(V.y - D.y, V.x - D.x) - Math.PI / 2
              , M = Math.atan2(ee.y - V.y, ee.x - V.x) - Math.PI / 2
              , L = tu(ce, M);
            A("angleDiff", l.MathUtils.radToDeg(L));
            const de = Bt(l.MathUtils.degToRad(L), 75, 105, 1, 0);
            p *= de;
            const {fingerWidthConfidenceFilter: se} = this.fingerData.get(e)
              , z = se.filter(p, performance.now() / 1e3);
            this.fingerData.get(e).fingerWidthConfidence = z,
            A("fingerWidthConfidence", z)
        }
        calculateFingerWidth(e, i, s, n) {
            if (!e || !i)
                return {
                    width: 0,
                    isValid: !1
                };
            let r = this.edgeDetectorPixelsToWidth(e, i, s.z);
            const a = this.handleBothEdges(s, e, r, n)
              , o = this.fingerData.get(n);
            if (a) {
                const h = this.mpHand.getLandmarkMovementFactor(qe(n)[1])
                  , c = l.MathUtils.mapLinear(h, 0, 1, 8, .5)
                  , {width: d, fingerWidthFilter: u} = o
                  , {fingerWidthConfidence: f} = o;
                r = l.MathUtils.lerp(d, r, f),
                u.setMinCutoff(c),
                u.setBeta(c),
                u.setDerivateCutoff(c);
                const g = u.filter(r, performance.now() / 1e3);
                return o.width = g,
                o.initialized || (o.handedness = this.mpHand.handedness,
                o.frontHand = this.mpHand.isShowingFrontHand(),
                o.initialized = !0),
                this.hasBothEdges = !0,
                A("current finger width", r),
                {
                    width: g,
                    isValid: !0
                }
            }
            return {
                width: 0,
                isValid: !1
            }
        }
        updateFingerConfidence(e, i, s) {
            let {centerConfidence: n} = this.fingerData.get(e);
            n = Math.min(1, n + .025);
            const r = new l.Vector2(this.viewer.canvas.width,this.viewer.canvas.height)
              , a = Ji(i, this.camera).multiply(r)
              , o = Ji(s, this.camera).multiply(r)
              , h = a.distanceTo(o);
            let c = l.MathUtils.mapLinear(h, 20, 30, 0, 1);
            c = l.MathUtils.clamp(c, 0, 1),
            n *= c,
            this.fingerData.get(e).centerConfidence = n
        }
        validateHandState(e) {
            const {handedness: i, frontHand: s} = this.fingerData.get(e);
            (i !== this.mpHand.handedness || s !== this.mpHand.isShowingFrontHand()) && this.reset(!1)
        }
        alignToFinger(e, i, s, n=k.Ring, r=null) {
            var g;
            if (!this.mpHand)
                throw new Error("FingerCenterWidthCalculator: mpHand is not set, please set it using 'setMPHand()' before calling alignToFinger()");
            this.validateHandState(n),
            this.calculateFingerWidthConfidence(n),
            this.hasBothEdges = !1;
            const a = e.position.clone()
              , {firstPixelLeft: o, firstPixelRight: h, targetPos: c} = this.detectEdges(a, i, n, r);
            let d = this.selectedEdge === 1 ? o : h;
            d || (d = this.selectedEdge === 1 ? h : o,
            this.selectedEdge = this.selectedEdge === 1 ? 2 : 1);
            const u = o && h
              , {offset: f} = this.fingerData.get(n);
            if (d === null)
                return Mi("#ff5555", "edge detection failed", this.fingerData.get(n)),
                e.position.sub(f),
                this.fingerData.get(n).centerConfidence = 0,
                !1;
            if (!this.validateFingerPosition(n, r))
                return e.position.sub(f),
                this.fingerData.get(n).centerConfidence = 0,
                !1;
            if (u) {
                const {isValid: y} = this.calculateFingerWidth(o, h, c, n);
                if (!y)
                    return e.position.sub(f),
                    this.fingerData.get(n).centerConfidence = 0,
                    !1
            } else
                Mi("#98fc03", "only one edge", this.fingerData.get(n));
            return (g = this.debugHelper) == null || g.drawEdgeDetectionResult(o, h, this.mpHand.landmarks[qe(n)[0]], this.mpHand.landmarks[qe(n)[1]]),
            this.updateFingerConfidence(n, c, i),
            this.alignPos.copy(xt(d, c.z, s)),
            this.alignObject(e, n, c),
            !0
        }
        calculateObjectPosition(e) {
            aa.position.copy(this.alignPos);
            const i = this.mpHand.landmarks3D
              , [s,n] = qe(e)
              , r = Math.atan2(i[s].y - i[n].y, i[s].x - i[n].x) + Math.PI / 2;
            aa.rotation.z = r;
            const a = this.getFingerWidth(e) * this.getRingCenteringDisplacementFactor();
            return oa.position.x = a * .5,
            oa.getWorldPosition(Lu)
        }
        alignObject(e, i, s) {
            if (!this.mpHand)
                throw new Error("FingerCenterWidthCalculator: mpHand is not set, please set it using 'setMPHand()' before calling alignObject()");
            const {offset: n, offsetFilters: r, quaternionFilter: a, edgeMovementFilter: o, lastWorldCenterPos: h, fingerWidthConfidence: c} = this.fingerData.get(i);
            let {centerConfidence: d} = this.fingerData.get(i);
            const u = this.calculateObjectPosition(i)
              , f = s.clone().sub(u)
              , g = f.distanceTo(n);
            h.copy(u.clone().setZ(0)),
            A("edgeMovement", g);
            let y = l.MathUtils.mapLinear(g, .005, .025, 1, 0);
            y = l.MathUtils.clamp(y, 0, 1),
            y = o.filter(y, performance.now() / 1e3),
            A("edgeMovementFactor", y);
            const b = performance.now() / 1e3
              , w = .25 + 1.5 * T.mpSnappiness
              , p = 6 + 12 * T.mpSnappiness
              , v = Bt(this.mpHand.getLandmarkMovementFactor(qe(i)[1]), .75, 1, 0, 1)
              , D = l.MathUtils.lerp(y, 1, v)
              , V = l.MathUtils.lerp(p, w, D)
              , ee = .01
              , ce = .01;
            for (const M of r)
                M.setMinCutoff(V),
                M.setBeta(ee),
                M.setDerivateCutoff(ce);
            if (!this.hasBothEdges) {
                const M = e.getWorldDirection(new l.Vector3)
                  , L = l.MathUtils.mapLinear(Math.abs(M.z), 0, .3, 1, 0)
                  , de = l.MathUtils.lerp(.5, 0, L)
                  , se = l.MathUtils.lerp(.65, .125, L)
                  , z = l.MathUtils.clamp(l.MathUtils.mapLinear(f.length(), de, se, 1, 0), 0, 1);
                A("offsetLengthConfidence", z),
                d *= z * c
            }
            A("offsetLength", f.length()),
            this.fingerData.get(i).centerConfidence = d,
            f.x = r[0].filter(f.x, b),
            f.y = r[1].filter(f.y, b),
            f.z = r[2].filter(f.z, b),
            n.lerp(f, d),
            A("centerConfidence", d),
            e.position.sub(n),
            a.filter(e.quaternion, b, y)
        }
        getRingCenteringDisplacementFactor() {
            switch (this.selectedEdge) {
            case 1:
                return 1;
            case 2:
                return -1;
            default:
                return 0
            }
        }
        getEdgeDetectorTexture() {
            return this.edgeDetector.fingerWidthPass.getTexture()
        }
        getFingerWidth(e) {
            const {width: i} = this.fingerData.get(e);
            return i * this.videoFeed.view.scale
        }
        getFingerWidthSamples(e) {
            return this.fingerData.get(e).fingerWidthAnalyzer.totalSamples
        }
        async updateStaticBackgroundIfNeeded() {
            const {lastSuccessTime: e} = this.mpHand;
            if (performance.now() - e < 1e3)
                return !1;
            const {fingerWidthPass: i} = this.edgeDetector;
            return i instanceof $i ? (i.updateReferenceBackground(),
            await new Promise(s => {
                this.staticBackgroundTimeout = setTimeout(s, 1e3)
            }
            ),
            this.mpHand.lastSuccessTime === e ? (console.log("Updated static background"),
            this.didUpdateStaticBackground = !0,
            !0) : !1) : (this.didUpdateStaticBackground = !0,
            !0)
        }
        isReady() {
            return this.edgeDetector.fingerWidthPass instanceof $i ? this.didUpdateStaticBackground : !0
        }
        reset(e=!0) {
            e ? this.initFingerData() : this.fingerData.forEach(i => {
                i.offset.set(0, 0, 0),
                i.offsetFilters.forEach(s => s.reset()),
                i.positionFilters.forEach(s => s.reset()),
                i.edgeMovementFilter.reset(),
                i.quaternionFilter.reset(),
                i.centerConfidence = 1,
                i.initialized = !1
            }
            )
        }
        dispose() {
            this.edgeDetector.dispose(),
            this.staticBackgroundTimeout && clearTimeout(this.staticBackgroundTimeout)
        }
    }
    ;
    es.MIN_REQUIRED_SAMPLES = 8;
    let rn = es;
    class Ru {
        constructor(e, i, s) {
            this.mpLandmarkDistOffset = 0,
            this.mpHand = e,
            this.leapMpHand = i,
            this.camera = s
        }
        processResult(e, i) {
            this.mpHand.processResult(e, i),
            this.leapMpHand.processResult(e, i),
            this.leapMpHand.distance > 0 && this.leapMpHand.confidence > .95 && (this.mpLandmarkDistOffset = this.mpHand.distance - this.leapMpHand.distance),
            A("mpLandmarkDistOffset", this.mpLandmarkDistOffset),
            A("leapConfidence", this.leapMpHand.confidence)
        }
        setFinger(e) {
            this.mpHand.setFinger(e),
            this.leapMpHand.setFinger(e)
        }
        get currentDebugEntries() {
            return [...this.mpHand.currentDebugEntries, ...this.leapMpHand.currentDebugEntries]
        }
        get criticalConfidence() {
            return this.leapMpHand.leapHand ? this.leapMpHand.confidence : 0
        }
        get landmarks() {
            return this.mpHand.landmarks.map( (e, i) => e.clone().lerp(this.leapMpHand.landmarks[i], this.criticalConfidence))
        }
        get landmarks3D() {
            const e = this.mpHand.landmarks3D.map(i => (i = i.clone(),
            Qs(i, i.z + this.mpLandmarkDistOffset, this.camera),
            i));
            return this.leapMpHand.landmarks3D.map( (i, s) => i.clone().lerp(e[s], 1 - this.criticalConfidence))
        }
        get targetLandmarks() {
            const e = this.mpHand.targetLandmarks.map( (i, s) => i.clone().lerp(this.leapMpHand.targetLandmarks[s], this.criticalConfidence));
            return this.leapMpHand.targetLandmarks.map( (i, s) => i.clone().lerp(e[s], 1 - this.criticalConfidence))
        }
        get distance() {
            return l.MathUtils.lerp(this.mpHand.distance - this.mpLandmarkDistOffset, this.leapMpHand.distance, this.leapMpHand.confidence)
        }
        get lastSuccessTime() {
            return Math.max(this.mpHand.lastSuccessTime, this.leapMpHand.lastSuccessTime)
        }
        getRingAttachPositionForFinger(e) {
            const i = T.ringOnFingerOffset
              , s = this.landmarks3D;
            switch (e) {
            case k.Thumb:
                return s[2].clone().lerp(s[3], i);
            case k.Index:
                return s[5].clone().lerp(s[6], i);
            case k.Middle:
                return s[9].clone().lerp(s[10], i);
            case k.Ring:
                return s[13].clone().lerp(s[14], i);
            case k.Pinky:
                return s[17].clone().lerp(s[18], i)
            }
        }
        getRingAttachQuaternionForFinger(e) {
            return this.mpHand.getRingAttachQuaternionForFinger(e).clone().slerp(this.leapMpHand.getRingAttachQuaternionForFinger(e), this.leapMpHand.confidence)
        }
        getCameraLookAtFactor() {
            return l.MathUtils.lerp(this.mpHand.getCameraLookAtFactor(), this.leapMpHand.getCameraLookAtFactor(), this.leapMpHand.confidence)
        }
        getSidewaysFactor() {
            return l.MathUtils.lerp(this.mpHand.getSidewaysFactor(), this.leapMpHand.getSidewaysFactor(), this.leapMpHand.confidence)
        }
        getFingerLookAtFactor(e) {
            const i = this.mpHand.getFingerLookAtFactor(e)
              , s = this.leapMpHand.getFingerLookAtFactor(e);
            return l.MathUtils.lerp(i, s, this.leapMpHand.confidence)
        }
        isShowingFrontHand() {
            return this.leapMpHand.confidence < .5 ? this.mpHand.isShowingFrontHand() : this.leapMpHand.isShowingFrontHand()
        }
        getLandmarkMovementFactor(e) {
            const i = this.mpHand.getLandmarkMovementFactor(e)
              , s = this.leapMpHand.getLandmarkMovementFactor(e);
            return l.MathUtils.lerp(i, s, this.criticalConfidence)
        }
        get handedness() {
            return this.mpHand.handedness
        }
        get ringFingerMovementFactor() {
            return l.MathUtils.lerp(this.mpHand.ringFingerMovementFactor, this.leapMpHand.ringFingerMovementFactor, 0)
        }
        getMappedBackHandFactor() {
            return l.MathUtils.lerp(this.mpHand.getMappedBackHandFactor(), this.leapMpHand.getMappedBackHandFactor(), this.leapMpHand.confidence)
        }
        refresh() {}
    }
    class Du extends Fa {
        constructor(e) {
            super(e),
            this.leapSpheres = Array(21).fill(0).map( () => {
                const i = new l.SphereGeometry(.5,32,32)
                  , s = new l.MeshStandardMaterial({
                    color: 65280
                })
                  , n = new l.Mesh(i,s);
                return e.scene.add(n),
                n
            }
            )
        }
        drawLeap(e) {
            this.leapSpheres.forEach( (i, s) => {
                i.visible = !0;
                const n = e[s];
                i.position.set(n.x, n.y, n.z)
            }
            )
        }
        hide() {
            super.hide(),
            this.leapSpheres.forEach(e => e.visible = !1)
        }
        show() {
            super.show(),
            this.leapSpheres.forEach(e => e.visible = !0)
        }
    }
    var Ou = Object.getOwnPropertyDescriptor
      , Hu = (t, e, i, s) => {
        for (var n = s > 1 ? void 0 : s ? Ou(e, i) : e, r = t.length - 1, a; r >= 0; r--)
            (a = t[r]) && (n = a(n) || n);
        return n
    }
    ;
    const an = new l.Object3D
      , Ti = new l.Object3D
      , Jh = new l.Object3D
      , _h = new l.Object3D;
    let la = class extends tn {
        constructor() {
            super(...arguments),
            this.leapHand = null,
            this.realTimeLeapHand = null,
            this.rawLeapLandmarks3D = Array(21).fill(0).map( () => new l.Vector3),
            this.rawLeapLandmarks3DFilters = Array(21 * 3).fill(0).map( () => new oe.OneEuroFilter(60,3,3,2)),
            this.lastRawLeapLandmarks3D = Array(21).fill(0).map( () => new l.Vector3),
            this.filterLandmarks2D = !1,
            this.realTimeRawLeapLandmarksFilters = Array(21 * 3).fill(0).map( () => new oe.OneEuroFilter(60,1,1,1)),
            this.currentRawLeapLandmarksFilters = Array(21 * 3).fill(0).map( () => new oe.OneEuroFilter(60,1,1,1)),
            this.landmarksMovementFilters = Array(21).fill(0).map( () => new oe.OneEuroFilter(60,1,.5,.5)),
            this.quaternionFilters = Array(5).fill(null).map( () => new Qr(60,2,32)),
            this.confidence = 0,
            this.lastLeapTrackingLostTime = 0,
            this.lastSetLeapHandTime = 0
        }
        refresh() {
            this.leapHand && super.refresh()
        }
        reset() {
            super.reset(),
            this.quaternionFilters.forEach(t => t.reset()),
            this.rawLeapLandmarks3DFilters.forEach(t => t.reset()),
            this.currentRawLeapLandmarksFilters.forEach(t => t.reset()),
            this.landmarksMovementFilters.forEach(t => t.reset()),
            this.realTimeRawLeapLandmarksFilters.forEach(t => t.reset())
        }
        getMovementFactorFromLandmarkMovement(t) {
            return Math.exp(-40 * t ** 1.75)
        }
        setLeapHand(t) {
            this.leapHand = t,
            t || (this.lastLeapTrackingLostTime = performance.now());
            const e = t && performance.now() - this.lastLeapTrackingLostTime > 100 ? 1 : -1;
            let i = performance.now() - this.lastSetLeapHandTime;
            i > 100 && (i = 100),
            this.confidence += .125 * e * i / 1e3,
            this.confidence = l.MathUtils.clamp(this.confidence, 0, 1)
        }
        setRealTimeLeapHand(t) {
            this.realTimeLeapHand = t ?? this.leapHand
        }
        updateLandmarks3D() {
            const t = performance.now() / 1e3;
            this.lastRawLeapLandmarks3D.forEach( (s, n) => s.copy(this.rawLeapLandmarks3D[n])),
            this.rawLeapLandmarks3D.forEach( (s, n) => {
                s.copy(this.leapHand.position[n]),
                s.multiplyScalar(.001),
                s.x = this.rawLeapLandmarks3DFilters[n * 3].filter(s.x, t),
                s.y = this.rawLeapLandmarks3DFilters[n * 3 + 1].filter(s.y, t),
                s.z = this.rawLeapLandmarks3DFilters[n * 3 + 2].filter(s.z, t),
                s.multiplyScalar(1e3)
            }
            );
            const e = Math.abs(this.rawLeapLandmarks3D[13].z)
              , i = qe(this.finger);
            this.landmarks3D.forEach( (s, n) => {
                const r = this.landmarks[n];
                let a = Math.abs(this.rawLeapLandmarks3D[n].z);
                const o = a - e;
                if (a = e + o * T.ulZFactor,
                s.copy(xt(r, -a, this.camera, !0)),
                n === 13 && A("leapPosZ", a),
                this.filterLandmarks3D) {
                    const h = this.getLandmarkMovementFactor(n);
                    let c = l.MathUtils.lerp(1, .5, T.mpSnappiness)
                      , d = l.MathUtils.lerp(2, 8, T.mpSnappiness);
                    i.includes(n) || (c = l.MathUtils.lerp(2, 4, T.mpSnappiness),
                    d = l.MathUtils.lerp(24, 32, T.mpSnappiness));
                    const u = l.MathUtils.lerp(d, c, h)
                      , f = .001
                      , g = .001;
                    n === 14 && (this.currentDebugEntries.push(["lm14 movement", this.landmarkMovement[n]]),
                    this.currentDebugEntries.push(["lm14 m", h]),
                    this.currentDebugEntries.push(["lm14 mincutoff", u]),
                    this.currentDebugEntries.push(["lm14 beta", f]),
                    this.currentDebugEntries.push(["lm14 dcutoff", g])),
                    [0, 1, 2].forEach(y => {
                        this.landmarks3DFilters[n * 3 + y].setMinCutoff(u),
                        this.landmarks3DFilters[n * 3 + y].setBeta(f),
                        this.landmarks3DFilters[n * 3 + y].setDerivateCutoff(g)
                    }
                    ),
                    s.multiplyScalar(.001),
                    s.x = this.landmarks3DFilters[n * 3].filter(s.x, t),
                    s.y = this.landmarks3DFilters[n * 3 + 1].filter(s.y, t),
                    s.z = this.landmarks3DFilters[n * 3 + 2].filter(s.z, t),
                    s.multiplyScalar(1e3)
                } else
                    s.copy(s)
            }
            )
        }
        calculateDistance() {
            this.distance = Math.abs(this.leapHand.position[0].z)
        }
        calculateFingerQuaternions() {
            for (let t = 0; t < 5; t++) {
                const e = this.quaternions[t]
                  , i = new l.Quaternion
                  , s = new l.Quaternion;
                let n = this.getRotationLandmarksIndicesFromFinger(t).map(y => this.landmarks3D[y]);
                const r = this.getRotationLandmarksIndicesFromFinger(t);
                let a = [k.Thumb, k.Index, k.Middle].includes(t) ? 180 : 0;
                this.handedness === "Right" && (a += 180);
                const o = this.leapHand.position[r[0]].z;
                n = n.map( (y, b) => {
                    const w = r[b];
                    y = y.clone();
                    let p = this.leapHand.position[w].z;
                    const v = p - o;
                    return p = o + v * T.ulZFactor,
                    Qs(y, p, this.camera),
                    y
                }
                ),
                Ti.position.copy(n[0]),
                Jh.position.copy(n[0]),
                _h.position.copy(n[1]);
                let h = Math.atan2(n[0].y - n[2].y, n[0].x - n[2].x);
                Dh(this.landmarks, this.handedness) && (h *= -1,
                h += Math.PI),
                this.handedness === "Right" && (h += Math.PI);
                const {palmYaw: d} = this.leapHand;
                Ti.rotation.set(0, d, h);
                const u = n[0].distanceTo(n[1]);
                Ti.translateX(-u);
                const f = T.ulRefineRingOffsetYaw * (this.handedness === "Right" ? -1 : 1)
                  , g = l.MathUtils.lerp(n[0].z, Ti.position.z, T.ulRefineRingYawFactor);
                Qs(Ti.position, g, this.camera),
                this.calculateQuaternion(s, [Jh.position, _h.position, Ti.position], t, this.quaternionFilters[t], [T.ulRefineRingOffsetPitch, f + a, 0].map(l.MathUtils.degToRad)),
                i.copy(s),
                e.copy(i)
            }
        }
        calculateLandmarkMovement() {
            for (let t = 0; t < this.landmarks.length; t++) {
                const e = this.realTimeLeapHand.position[t].clone()
                  , i = this.leapHand.position[t].clone()
                  , s = this.realTimeLeapHand.position[0].clone()
                  , n = this.leapHand.position[0].clone();
                s.z *= .25,
                n.z *= .25,
                s.set(this.realTimeRawLeapLandmarksFilters[t * 3 + 0].filter(s.x, performance.now() / 1e3), this.realTimeRawLeapLandmarksFilters[t * 3 + 1].filter(s.y, performance.now() / 1e3), this.realTimeRawLeapLandmarksFilters[t * 3 + 2].filter(s.z, performance.now() / 1e3)),
                n.set(this.currentRawLeapLandmarksFilters[t * 3 + 0].filter(n.x, performance.now() / 1e3), this.currentRawLeapLandmarksFilters[t * 3 + 1].filter(n.y, performance.now() / 1e3), this.currentRawLeapLandmarksFilters[t * 3 + 2].filter(n.z, performance.now() / 1e3));
                const r = n.distanceTo(s) * .01 * 80
                  , a = s.clone().sub(n);
                i.add(a),
                A("palmDiff", a.toArray().map(c => c.toFixed(2)).join(","));
                const o = i.distanceTo(e) * .01 * 30
                  , h = Math.max(r, o);
                this.landmarkMovement[t] = this.landmarksMovementFilters[t].filter(h, performance.now() / 1e3)
            }
            this.realTimeLeapHand.position.forEach( (t, e) => this.movementLandmarks[e].copy(t))
        }
        getCameraLookAtFactor() {
            const t = new l.Vector3;
            t.add(this.rawLeapLandmarks3D[0]),
            t.add(this.rawLeapLandmarks3D[5]),
            t.add(this.rawLeapLandmarks3D[17]),
            t.divideScalar(3),
            an.position.copy(t),
            Kr(an, this.handedness, this.rawLeapLandmarks3D[0], this.rawLeapLandmarks3D[5], this.rawLeapLandmarks3D[17]);
            const e = an.position.clone().sub(this.camera.position).normalize()
              , i = an.getWorldDirection(new l.Vector3);
            return e.dot(i)
        }
    }
    ;
    la = Hu([l.uiFolder("In-Store Ring Tryon")], la);
    const ts = class ts extends l.EventDispatcher {
        constructor() {
            super(...arguments),
            this.pc = null,
            this.dc = null,
            this.didConnect = !1
        }
        static async pingServer() {
            try {
                const e = await fetch(`${ts.WEBRTC_SERVER_URL}/ping`, {
                    method: "GET"
                });
                return e.ok || e.status >= 200 && e.status < 300
            } catch {
                return !1
            }
        }
        async negotiate() {
            console.log("Creating WebRTC offer...");
            const e = await this.pc.createOffer();
            console.log("WebRTC Offer created. Setting local description..."),
            await this.pc.setLocalDescription(e),
            await new Promise(n => {
                const r = () => {
                    this.pc.iceGatheringState === "complete" && (this.pc.removeEventListener("icegatheringstatechange", r),
                    n())
                }
                ;
                this.pc.addEventListener("icegatheringstatechange", r)
            }
            ),
            console.log("Sending WebRTC offer to server...");
            const i = await fetch(`${ts.WEBRTC_SERVER_URL}/offer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sdp: e.sdp,
                    type: e.type
                })
            });
            if (!i.ok)
                throw console.warn("Failed to send WebRTC offer to server:", i.statusText),
                new Error(`Failed to send WebRTC offer: ${i.statusText}`);
            console.log("Received WebRTC answer from server. Setting remote description...");
            const s = await i.json();
            await this.pc.setRemoteDescription(s),
            console.log("WebRTC negotiation complete.")
        }
        async connectWebRTCServer() {
            if (this.didConnect) {
                console.warn("WebRTC connection already established. Ignoring request to connect again.");
                return
            }
            this.didConnect = !0,
            this.pc = this.createPeerConnection();
            const e = {
                ordered: !1,
                maxRetransmits: 0
            };
            this.dc = this.pc.createDataChannel("chat", e),
            this.dc.onclose = () => this.dispatchEvent({
                type: "close"
            }),
            this.dc.onerror = () => {
                this.dispatchEvent({
                    type: "error"
                }),
                this.dispatchEvent({
                    type: "close"
                })
            }
            ,
            this.dc.onopen = () => this.dispatchEvent({
                type: "open"
            }),
            this.dc.onmessage = i => this.dispatchEvent({
                type: "message",
                detail: i.data
            }),
            console.log("Initiating WebRTC connection. Negotiating..."),
            await this.negotiate(),
            await new Promise( (i, s) => {
                const n = setTimeout( () => {
                    s(new Error("Data channel connection timeout"))
                }
                , 1e4)
                  , r = () => {
                    clearTimeout(n),
                    this.dc.removeEventListener("open", r),
                    i()
                }
                  , a = () => {
                    clearTimeout(n),
                    this.dc.removeEventListener("error", a),
                    s(new Error("Data channel connection failed"))
                }
                ;
                this.dc.addEventListener("open", r),
                this.dc.addEventListener("error", a)
            }
            ),
            console.log("WebRTC connection established.")
        }
        createPeerConnection() {
            try {
                const e = {
                    iceServers: []
                };
                return new RTCPeerConnection(e)
            } catch (e) {
                throw console.warn("Error creating RTCPeerConnection:", e),
                this.dispatchEvent({
                    type: "error",
                    detail: e
                }),
                e
            }
        }
        sendMessageToServer(e) {
            var i, s;
            ((i = this.dc) == null ? void 0 : i.readyState) === "open" && ((s = this.dc) == null || s.send(e))
        }
        dispose() {
            var e, i;
            (e = this.pc) == null || e.close(),
            (i = this.dc) == null || i.close()
        }
    }
    ;
    ts.WEBRTC_SERVER_URL = "http://127.0.0.1:26520";
    let on = ts;
    function Vu(t, e, i, s, n) {
        return {
            palmYaw: t,
            palmPos: e,
            position: i,
            rotation: s,
            outdated: n
        }
    }
    const cn = class cn extends l.EventDispatcher {
        constructor() {
            super(...arguments),
            this.rtcManager = null,
            this.leapHand = null,
            this.realTimeLeapHand = null,
            this.connected = !1,
            this.leapDataOutdated = !1,
            this.serverDataQueue = new Array,
            this.lastHandedness = null
        }
        async connectToServer() {
            try {
                this.rtcManager = new on,
                console.log("Connecting to WebRTC server..."),
                await this.rtcManager.connectWebRTCServer(),
                console.log("WebRTC server connection established"),
                this.connected = !0,
                this.rtcManager.addEventListener("close", () => {
                    this.handleConnectionClosed()
                }
                ),
                this.rtcManager.addEventListener("message", e => {
                    if (e.detail === "") {
                        this.leapDataOutdated = !0;
                        return
                    }
                    this.leapDataOutdated = !1;
                    const i = {
                        timestamp: performance.now(),
                        data: e.detail
                    };
                    this.realTimeLeapHand = this.parse(i.data),
                    this.realTimeLeapHand && (this.serverDataQueue.push(i),
                    this.serverDataQueue.length > 1e3 && this.serverDataQueue.shift())
                }
                )
            } catch (e) {
                throw console.error("Error connecting to WebRTC server", e),
                e
            }
        }
        sendMessageToServer(e) {
            var i;
            (i = this.rtcManager) == null || i.sendMessageToServer(e)
        }
        updateHandedness(e) {
            this.lastHandedness !== e && (this.lastHandedness = e,
            this.sendMessageToServer(JSON.stringify({
                type: "handednessUpdate",
                handedness: e
            })))
        }
        updateFocusFromHandDistance(e) {
            this.sendMessageToServer(JSON.stringify({
                type: "focusHandDistance",
                handDistance: e
            }))
        }
        updateTrackingFail() {
            this.sendMessageToServer(JSON.stringify({
                type: "trackingFail"
            }))
        }
        updateTrackingSuccess() {
            this.sendMessageToServer(JSON.stringify({
                type: "trackingSuccess"
            }))
        }
        triggerFocus() {
            this.sendMessageToServer(JSON.stringify({
                type: "triggerFocus"
            }))
        }
        lockAutoExposure(e) {
            this.sendMessageToServer(JSON.stringify({
                type: "lockAutoExposure",
                autoExposure: e
            }))
        }
        update() {
            var n;
            const e = performance.now() - T.cameraDelay;
            let i = null
              , s = this.serverDataQueue.length - 1;
            for (; s >= 0; s--)
                if (this.serverDataQueue[s].timestamp < e) {
                    i = this.serverDataQueue[s].data;
                    break
                }
            i === null && (i = (n = this.serverDataQueue[0]) == null ? void 0 : n.data),
            this.serverDataQueue = this.serverDataQueue.slice(s + 1),
            this.leapHand = this.parse(i)
        }
        handleConnectionClosed() {
            this.connected && (this.connected = !1,
            this.dispatchEvent({
                type: "close"
            }),
            this.dispose(),
            console.warn("Server disconnected, shutting down..."))
        }
        parse(e) {
            if ((e == null ? void 0 : e.byteLength) === cn.CLOSE_BYTE_LENGTH)
                return this.handleConnectionClosed(),
                null;
            if (!e || typeof e == "string" || e.byteLength === 0 || e.byteLength % 4 !== 0 || e.byteLength === 0 || e.byteLength < 256)
                return null;
            {
                const i = -(new Float32Array(e,0,4)[0] - Math.PI);
                e = e.slice(4);
                const s = new Float32Array(e,0,4)[0]
                  , n = new Float32Array(e,4,4)[0]
                  , r = new Float32Array(e,8,4)[0]
                  , a = new l.Vector3(s,n,r);
                e = e.slice(3 * 4);
                let o = Array(21).fill(0).map( () => new l.Vector3);
                const h = Array(21).fill(0).map( () => new l.Euler)
                  , c = new Float32Array(e);
                for (let u = 0; u < 21; u++)
                    o[u].set(c[u * 3 + 0], c[u * 3 + 1], c[u * 3 + 2]);
                return o = o.map(u => {
                    const f = u.clone();
                    u.set(-f.x, -f.z, -f.y).multiplyScalar(.1);
                    const y = new l.Matrix4().makeRotationX(l.MathUtils.degToRad(T.ulPitch)).clone().invert();
                    return u.applyMatrix4(y),
                    u.x += T.ulX,
                    u.y += T.ulY,
                    u.z += T.ulZ,
                    u
                }
                ),
                Vu(i, a, o, h, this.leapDataOutdated)
            }
        }
        getLeapHand() {
            return this.leapHand
        }
        dispose() {
            var e;
            this.leapHand = null,
            this.realTimeLeapHand = null,
            this.leapDataOutdated = !1,
            this.connected = !1,
            this.serverDataQueue = [],
            (e = this.rtcManager) == null || e.dispose(),
            this.rtcManager = null
        }
    }
    ;
    cn.CLOSE_BYTE_LENGTH = 3;
    let ha = cn;
    class Iu extends l.EventDispatcher {
        constructor(e) {
            super(),
            this.fingerCenterWidthCalculator = e,
            this.changeDebounceTimeout = null,
            this.hintMessage = null,
            this.transitionMessage = null,
            this.transitionTimeout = null,
            this.bar = this.createBar()
        }
        show() {
            this.bar.style.opacity = "0",
            document.body.appendChild(this.bar),
            this.bar.offsetHeight,
            this.bar.style.opacity = "1"
        }
        showHint(e) {
            this.hintMessage && this.bar.removeChild(this.hintMessage),
            this.hintMessage = document.createElement("div"),
            this.hintMessage.style.color = "#FCD34D",
            this.hintMessage.style.backgroundColor = "rgba(252, 211, 77, 0.1)",
            this.hintMessage.style.padding = "12px",
            this.hintMessage.style.borderRadius = "8px",
            this.hintMessage.style.marginTop = "16px",
            this.hintMessage.style.fontSize = "14px",
            this.hintMessage.style.textAlign = "center",
            this.hintMessage.style.lineHeight = "1.5",
            this.hintMessage.style.fontFamily = "system-ui, -apple-system, sans-serif",
            this.hintMessage.innerText = e,
            this.bar.appendChild(this.hintMessage)
        }
        showTransitionMessage() {
            this.transitionMessage && this.bar.removeChild(this.transitionMessage),
            this.transitionMessage = document.createElement("div"),
            this.transitionMessage.style.position = "absolute",
            this.transitionMessage.style.top = "0",
            this.transitionMessage.style.left = "0",
            this.transitionMessage.style.width = "100%",
            this.transitionMessage.style.height = "100%",
            this.transitionMessage.style.backgroundColor = "rgba(17, 24, 39, 0.95)",
            this.transitionMessage.style.display = "flex",
            this.transitionMessage.style.alignItems = "center",
            this.transitionMessage.style.justifyContent = "center",
            this.transitionMessage.style.opacity = "0",
            this.transitionMessage.style.transition = "opacity 0.15s ease-in-out",
            this.transitionMessage.style.borderRadius = "16px",
            this.transitionMessage.style.zIndex = "1";
            const e = document.createElement("div");
            e.style.color = "#fff",
            e.style.fontSize = "32px",
            e.style.fontWeight = "600",
            e.style.fontFamily = "system-ui, -apple-system, sans-serif",
            e.style.textAlign = "center",
            e.style.lineHeight = "1.2",
            e.innerHTML = "All ready ✅<br><span style='font-size: 18px; color: #9CA3AF; margin-top: 8px; display: block;'>The application is running now.</span>",
            this.transitionMessage.appendChild(e),
            this.bar.appendChild(this.transitionMessage),
            this.transitionMessage.offsetHeight,
            this.transitionMessage.style.opacity = "1"
        }
        createBar() {
            const e = document.createElement("div");
            return e.style.position = "fixed",
            e.style.zIndex = "1000",
            e.style.left = "50%",
            e.style.top = "50%",
            e.style.transform = "translate(-50%, -50%)",
            e.style.backgroundColor = "rgba(17, 24, 39, 0.95)",
            e.style.padding = "40px",
            e.style.border = "1px solid rgba(255, 255, 255, 0.1)",
            e.style.borderRadius = "16px",
            e.style.width = "500px",
            e.style.textAlign = "center",
            e.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            e.style.backdropFilter = "blur(8px)",
            e.style.transition = "opacity 0.15s ease-in-out",
            this.addWelcomeMessage(e),
            this.addTitle(e, "Camera Brightness"),
            this.addExposureSlider(e),
            this.addTitle(e, "Focus"),
            this.addFocusSlider(e),
            this.addDoneButton(e),
            e
        }
        addWelcomeMessage(e) {
            const i = document.createElement("div");
            i.innerHTML = `
            <div style="color: #fff; font-size: 24px; font-weight: 600; margin-bottom: 16px; text-align: center;">Welcome!</div>
            <div style="color: #9CA3AF; font-size: 14px; margin-bottom: 24px; line-height: 1.6; text-align: left;">
                We need to set up the scene first to ensure the best experience.<br><br>
                
                Adjust the camera settings below to get a desired look. 
                Move the sliders to control brightness and focus.<br><br>
                
                <span style="color: #fff; font-weight: 500; display: block; margin-bottom: 8px;">Ready?</span>
                Before clicking "Start Experience", please:<br>
                • Allow us to scan the background by keeping it clear<br>
                • Ensure your hands are not in the camera's view<br>
        `,
            e.appendChild(i)
        }
        addTitle(e, i) {
            const s = document.createElement("div");
            s.innerText = i,
            s.style.color = "#fff",
            s.style.marginBottom = "8px",
            s.style.textAlign = "left",
            s.style.fontSize = "16px",
            s.style.fontWeight = "500",
            s.style.fontFamily = "system-ui, -apple-system, sans-serif",
            e.appendChild(s)
        }
        addExposureSlider(e) {
            const i = document.createElement("div");
            i.style.marginBottom = "24px";
            const s = document.createElement("input");
            s.style.width = "100%",
            s.style.height = "6px",
            s.style.webkitAppearance = "none",
            s.style.appearance = "none",
            s.style.background = "rgba(255, 255, 255, 0.1)",
            s.style.borderRadius = "3px",
            s.style.outline = "none",
            s.type = "range",
            s.min = "-9",
            s.max = "9",
            s.step = "1",
            s.value = T.exposureCompensation.toString(),
            s.style.background = `
            linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(parseInt(s.value) + 9) * 5.55}%, rgba(255, 255, 255, 0.1) ${(parseInt(s.value) + 9) * 5.55}%, rgba(255, 255, 255, 0.1) 100%)
        `,
            s.oninput = () => {
                clearTimeout(this.changeDebounceTimeout),
                this.changeDebounceTimeout = setTimeout( () => {
                    var r;
                    const n = parseInt(s.value);
                    (r = T.exposureCompensationGui) == null || r.setValue(n),
                    T.saveConfig(),
                    T.sendUpdatedColorCameraSettings(),
                    s.style.background = `
                    linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(n + 9) * 5.55}%, rgba(255, 255, 255, 0.1) ${(n + 9) * 5.55}%, rgba(255, 255, 255, 0.1) 100%)
                `
                }
                , 100)
            }
            ,
            i.appendChild(s),
            e.appendChild(i)
        }
        addFocusSlider(e) {
            const i = document.createElement("div");
            i.style.marginBottom = "32px";
            const s = document.createElement("input");
            s.style.width = "100%",
            s.style.height = "6px",
            s.style.webkitAppearance = "none",
            s.style.appearance = "none",
            s.style.background = "rgba(255, 255, 255, 0.1)",
            s.style.borderRadius = "3px",
            s.style.outline = "none",
            s.type = "range",
            s.min = "1",
            s.max = "255",
            s.step = "1",
            s.value = T.focus.toString(),
            s.style.background = `
            linear-gradient(to right, #3B82F6 0%, #3B82F6 ${parseInt(s.value) / 255 * 100}%, rgba(255, 255, 255, 0.1) ${parseInt(s.value) / 255 * 100}%, rgba(255, 255, 255, 0.1) 100%)
        `,
            s.oninput = () => {
                clearTimeout(this.changeDebounceTimeout),
                this.changeDebounceTimeout = setTimeout( () => {
                    var r;
                    const n = parseInt(s.value);
                    (r = T.focusGui) == null || r.setValue(n),
                    T.saveConfig(),
                    T.sendUpdatedColorCameraSettings(),
                    s.style.background = `
                    linear-gradient(to right, #3B82F6 0%, #3B82F6 ${n / 255 * 100}%, rgba(255, 255, 255, 0.1) ${n / 255 * 100}%, rgba(255, 255, 255, 0.1) 100%)
                `
                }
                , 100)
            }
            ,
            i.appendChild(s),
            e.appendChild(i)
        }
        addDoneButton(e) {
            const i = document.createElement("button");
            i.style.color = "#fff",
            i.style.backgroundColor = "#3B82F6",
            i.style.width = "100%",
            i.style.height = "48px",
            i.style.border = "none",
            i.style.borderRadius = "8px",
            i.style.fontSize = "16px",
            i.style.fontWeight = "500",
            i.style.cursor = "pointer",
            i.style.transition = "background-color 0.2s",
            i.innerText = "Start Experience",
            i.onmouseover = () => {
                i.disabled || (i.style.backgroundColor = "#2563EB")
            }
            ,
            i.onmouseout = () => {
                i.disabled || (i.style.backgroundColor = "#3B82F6")
            }
            ,
            i.onclick = async () => {
                i.disabled = !0,
                i.style.backgroundColor = "#6B7280",
                i.style.cursor = "not-allowed",
                i.innerText = "Calibrating...",
                await this.fingerCenterWidthCalculator.updateStaticBackgroundIfNeeded() ? (this.showTransitionMessage(),
                this.dispatchEvent({
                    type: "start"
                }),
                console.log("Dispatching start event"),
                this.transitionTimeout = setTimeout( () => {
                    this.bar.style.opacity = "0",
                    setTimeout( () => {
                        this.bar.parentNode && document.body.removeChild(this.bar)
                    }
                    , 150)
                }
                , 800)) : (i.disabled = !1,
                i.style.backgroundColor = "#3B82F6",
                i.style.cursor = "pointer",
                i.innerText = "Start Experience",
                this.showHint("Please ensure the background is clear and there are no obstructions (like hands) in the camera view. Try moving to a different position or clearing the view."))
            }
            ,
            e.appendChild(i)
        }
        dispose() {
            this.changeDebounceTimeout && (clearTimeout(this.changeDebounceTimeout),
            this.changeDebounceTimeout = null),
            this.transitionTimeout && (clearTimeout(this.transitionTimeout),
            this.transitionTimeout = null),
            this.bar.remove()
        }
    }
    class zu {
        constructor() {
            this.createUI()
        }
        show() {
            this.container.style.display = "block",
            this.container.style.opacity = "0",
            this.container.offsetHeight,
            this.container.style.opacity = "1"
        }
        dispose(e=!0) {
            if (!e) {
                this.container.parentNode && document.body.removeChild(this.container);
                return
            }
            this.container.style.opacity = "0",
            setTimeout( () => {
                this.container.parentNode && document.body.removeChild(this.container)
            }
            , 300)
        }
        createUI() {
            this.container = document.createElement("div"),
            this.container.style.position = "fixed",
            this.container.style.top = "50%",
            this.container.style.left = "50%",
            this.container.style.transform = "translate(-50%, -50%)",
            this.container.style.width = "400px",
            this.container.style.padding = "40px",
            this.container.style.backgroundColor = "rgba(17, 24, 39, 0.95)",
            this.container.style.backdropFilter = "blur(8px)",
            this.container.style.color = "white",
            this.container.style.borderRadius = "16px",
            this.container.style.zIndex = "1000",
            this.container.style.display = "none",
            this.container.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            this.container.style.border = "1px solid rgba(255, 255, 255, 0.1)",
            this.container.style.transition = "opacity 0.15s ease-in-out",
            document.body.appendChild(this.container),
            this.statusText = document.createElement("div"),
            this.statusText.innerText = "Initializing...",
            this.statusText.style.fontSize = "24px",
            this.statusText.style.fontWeight = "600",
            this.statusText.style.marginBottom = "24px",
            this.statusText.style.textAlign = "center",
            this.statusText.style.fontFamily = "system-ui, -apple-system, sans-serif",
            this.container.appendChild(this.statusText);
            const e = document.createElement("div");
            e.style.width = "100%",
            e.style.height = "6px",
            e.style.backgroundColor = "rgba(255, 255, 255, 0.1)",
            e.style.borderRadius = "3px",
            e.style.overflow = "hidden",
            e.style.marginBottom = "24px",
            this.container.appendChild(e),
            this.progressBar = document.createElement("div"),
            this.progressBar.style.width = "0%",
            this.progressBar.style.height = "100%",
            this.progressBar.style.backgroundColor = "#3B82F6",
            this.progressBar.style.borderRadius = "3px",
            this.progressBar.style.transition = "width 0.3s ease",
            e.appendChild(this.progressBar),
            this.progressTextContainer = document.createElement("div"),
            this.progressTextContainer.style.fontSize = "14px",
            this.progressTextContainer.style.fontFamily = "system-ui, -apple-system, sans-serif",
            this.container.appendChild(this.progressTextContainer)
        }
        showError(e) {
            this.statusText.style.color = "#EF4444",
            console.error(e),
            console.trace(e),
            this.setStatusText(e)
        }
        setStatusText(e) {
            this.statusText.innerText = e
        }
        updateStatus(e, i, s=!1) {
            this.setStatusText(e),
            this.progressBar.style.width = `${i}%`;
            const n = document.createElement("div");
            n.style.display = "flex",
            n.style.alignItems = "center",
            n.style.marginTop = "12px",
            n.style.padding = "8px",
            n.style.backgroundColor = "rgba(255, 255, 255, 0.05)",
            n.style.borderRadius = "8px";
            const r = document.createElement("div");
            r.style.width = "20px",
            r.style.height = "20px",
            r.style.borderRadius = "4px",
            r.style.marginRight = "12px",
            r.style.display = "flex",
            r.style.alignItems = "center",
            r.style.justifyContent = "center",
            r.style.fontSize = "12px",
            r.style.fontWeight = "600",
            r.style.color = "white",
            s ? (r.style.backgroundColor = "#EF4444",
            r.textContent = "×") : (r.style.backgroundColor = "#10B981",
            r.textContent = "✓");
            const a = document.createElement("span");
            a.innerText = e,
            a.style.color = s ? "#EF4444" : "#9CA3AF",
            a.style.fontSize = "14px",
            n.appendChild(r),
            n.appendChild(a),
            this.progressTextContainer.appendChild(n)
        }
    }
    var Bu = Object.defineProperty
      , Wu = Object.getOwnPropertyDescriptor
      , ca = (t, e, i, s) => {
        for (var n = s > 1 ? void 0 : s ? Wu(e, i) : e, r = t.length - 1, a; r >= 0; r--)
            (a = t[r]) && (n = (s ? a(e, i, n) : a(n)) || n);
        return s && n && Bu(e, i, n),
        n
    }
    ;
    const Uu = location.search.includes("debug");
    R.InstoreRingTryonPlugin = class extends R.RingTryonPlugin {
        constructor() {
            super(),
            this.serverManager = null,
            this.instoreInitUI = new zu,
            this.exposureBarUI = null,
            this.changeDebounceTimeout = null,
            this.closeRangeZoomIn = !1,
            this.useMotionBlur = !0,
            this.frameDelay = 2,
            this.minHandDistance = 0,
            this.segmenterModelMinConfidence = .5,
            this.useSegmenter = !1,
            this.scanFingerWidthAtStart = !1,
            this.backgroundReflections = !0,
            this.backgroundPlaneScale = 3.29,
            this.backgroundPlaneStretch = 1.35,
            this.centerRing = !0,
            this.onServerClose = () => {
                this.dispatchEvent({
                    type: "error",
                    reason: "runtimeError",
                    message: `Connection to back-end server application lost.
Please check if the server application is still running and try again later.`
                }),
                console.error("InstoreRingTryonPlugin: Server closed"),
                this.stop(!0)
            }
            ,
            this.onFullyHidden = () => {
                var i;
                const e = performance.now() - this.mpHand.lastSuccessTime > 1e3;
                (i = this.fingerCenterWidthCalculator) == null || i.reset(e)
            }
            ,
            this.zoom = 1,
            this.onServerClose = this.onServerClose.bind(this),
            this.onFullyHidden = this.onFullyHidden.bind(this)
        }
        get mediaSettings() {
            return {
                ...super.mediaSettings,
                label: "Luxonis"
            }
        }
        initDebugHelper() {
            Uu && (this.debugHelper = new Du(this._viewer))
        }
        hasLuxonisCamera() {
            var i;
            const e = this._viewer.getPlugin(dt.PluginType);
            return ((i = e == null ? void 0 : e.devicesData) == null ? void 0 : i.some(s => s.label.startsWith("Luxonis"))) ?? !1
        }
        async start() {
            this.canStart() && (this.instoreInitUI.show(),
            this.instoreInitUI.setStatusText("Loading...")),
            await super.start()
        }
        async _start() {
            await super._start(),
            this.instoreInitUI.updateStatus("Loaded assets", 25),
            await this.initializeServerConnection(),
            await this.initializeCameraAndHandDetection(),
            await this.initializeEffects(),
            this.instoreInitUI.updateStatus("Loaded all dependencies, ready to start", 100),
            this.instoreInitUI.dispose(),
            this.serverManager && this.serverManager.connected && this.hasLuxonisCamera() && (T.sendUpdatedColorCameraSettings(),
            this.serverManager.lockAutoExposure(!1),
            this.exposureBarUI = new Iu(this.fingerCenterWidthCalculator),
            this.exposureBarUI.addEventListener("start", () => {
                this.serverManager.lockAutoExposure(!0)
            }
            ),
            setTimeout( () => this.exposureBarUI.show(), 150)),
            this.setupDebugControls()
        }
        async initializeServerConnection() {
            var e;
            try {
                this.serverManager = new ha,
                T.init(this.serverManager),
                await this.serverManager.connectToServer(),
                this.serverManager.addEventListener("close", this.onServerClose),
                (e = this.handDetector) == null || e.addEventListener("trackingFail", () => {
                    this.serverManager.updateTrackingFail()
                }
                ),
                this.handDetector.addEventListener("trackingSuccess", () => {
                    this.serverManager.updateTrackingSuccess()
                }
                ),
                this.instoreInitUI.updateStatus("Connected", 50)
            } catch (i) {
                console.error("Error connecting to server", i),
                this.instoreInitUI.updateStatus("Could not connect to back-end server. Proceeding without it...", 50, !0),
                await new Promise(s => setTimeout(s, 3e3))
            }
        }
        async initializeCameraAndHandDetection() {
            var i, s;
            this.hasLuxonisCamera() || (this.instoreInitUI.updateStatus(`
                Target camera not found. Please make sure the back-end server application is running and the camera is connected.
                Proceeding with the default camera...`, 50, !0),
            await new Promise(n => setTimeout(n, 5e3))),
            this.instoreInitUI.updateStatus("Playing video", 75);
            const e = this._viewer.scene.activeCamera.cameraObject;
            this.fingerCenterWidthCalculator = new rn(this._viewer,this.copyPass.texture,this._videoFeed,this.debugHelper),
            this.leapMpHand = new la(e,this._videoFeed),
            this.combinedHand = new Ru(this.handDetector.hand,this.leapMpHand,e),
            this.handDetector.setHand(this.combinedHand),
            this.fingerCenterWidthCalculator.setMPHand(this.combinedHand),
            (i = this.segmenter) == null || i.setHand(this.combinedHand),
            (s = this.handAnalyzer) == null || s.setHand(this.combinedHand)
        }
        async initializeEffects() {
            var e, i, s, n, r;
            (e = this.fadeShaderExtension) == null || e.setMPHand(this.combinedHand),
            (i = this.fadeShaderExtension) == null || i.setUseSegmentation(this.fingerCenterWidthCalculator.getEdgeDetectorTexture()),
            (s = this.fadeShaderExtension) == null || s.setFingerWidthMultiplier(.5),
            (n = this.fadeShaderExtension) == null || n.setFadeDistance(.125),
            (r = this.fadeShaderExtension) == null || r.addEventListener("fullyHidden", this.onFullyHidden.bind(this))
        }
        setupDebugControls() {
            window.addEventListener("keydown", e => {
                e.code === "KeyF" && console.log(`(${this.mpHand.distance}, ${T.focus}})`)
            }
            )
        }
        getFingerWidth(e) {
            const i = this.fingerCenterWidthCalculator.getFingerWidthSamples(e)
              , s = Math.min(i / 10, 1)
              , n = super.getFingerWidth(e);
            return l.MathUtils.lerp(n, this.fingerCenterWidthCalculator.getFingerWidth(e), s)
        }
        get mpHand() {
            return this.combinedHand
        }
        _sync3DWithResult(e) {
            var n, r, a;
            if (this._starting || !this.running)
                return;
            if ((n = this.serverManager) == null || n.update(),
            this.updateLeapHand(),
            super._sync3DWithResult(e),
            this.centerRing && !this.fingerCenterWidthCalculator.isReady()) {
                this._hideAll();
                return
            }
            if ((r = this.fadeShaderExtension) == null || r.setVisible(!1, !1),
            this._viewer.scene.setBackground(T.showHandMask ? this.fingerCenterWidthCalculator.getEdgeDetectorTexture() : this.copyPass.texture),
            this.freeze || !this.visible || (this.updateCameraSettings(),
            this.updateHandedness(),
            this.updateFocus(),
            this.leapMpHand.confidence > .5 && ((a = this.debugHelper) == null || a.drawLeap(this.leapMpHand.rawLeapLandmarks3D)),
            !this.modelRoot || this.modelRoot.children.length === 0))
                return;
            A("lm13 z", this.mpHand.landmarks3D[13].z.toFixed(2));
            const i = this.modelRoot
              , s = $s(i.userData);
            if (this.centerRing && this.centerRingOnFinger(s),
            !this.validateModelTransform(s)) {
                this._hideAll();
                return
            }
            this.updateOcclusionAndShadow(s),
            this.updateCameraNearFar(),
            this.updateBackgroundPlane(),
            this._showAll()
        }
        updateLeapHand() {
            const e = T.useUltraleap ? this.serverManager.leapHand : null
              , i = T.useUltraleap ? this.serverManager.realTimeLeapHand : null;
            A("hasLeapHand", e !== null && i !== null),
            this.leapMpHand.setLeapHand(e),
            this.leapMpHand.setRealTimeLeapHand(i)
        }
        updateCameraSettings() {
            const e = this._viewer.scene.activeCamera.cameraObject;
            e.fov = T.fov,
            e.updateProjectionMatrix()
        }
        updateHandedness() {
            if (T.useUltraleap) {
                const e = this.mpHand.handedness === "Left" ? "Right" : "Left";
                this.serverManager.updateHandedness(e)
            }
        }
        updateFocus() {
            if (T.autoFocus && this.leapMpHand.confidence < .5) {
                let e = l.MathUtils.mapLinear(this.leapMpHand.confidence, 0, .5, 0, 1);
                e = l.MathUtils.clamp(e, 0, 1);
                const i = l.MathUtils.lerp(this.mpHand.distance, this.leapMpHand.distance, e);
                this.serverManager.updateFocusFromHandDistance(i - T.mpZ)
            }
        }
        centerRingOnFinger(e) {
            var n, r, a;
            const i = [this.mpHand.landmarks3D[3], this.mpHand.landmarks3D[6], this.mpHand.landmarks3D[10], this.mpHand.landmarks3D[14], this.mpHand.landmarks3D[18]][e];
            if (this.segmenter) {
                const o = (this.segmenter.isAsync() ? this.mpHand.targetLandmarks : this.mpHand.landmarks).map(h => (h = h.clone(),
                zh(h, this._videoFeed),
                h));
                (n = this.segmenter) != null && n.isAsync() ? (r = this.segmenter) == null || r.detectAsync({
                    landmarks: o,
                    landmarks3D: this.mpHand.landmarks3D
                }) : (a = this.segmenter) == null || a.detect({
                    landmarks: o,
                    landmarks3D: this.mpHand.landmarks3D
                })
            }
            const s = this._viewer.scene.activeCamera.cameraObject;
            this.fingerCenterWidthCalculator.alignToFinger(this.modelRoot, i, s, e, this.segmenter),
            A("objPosZ", this.modelRoot.position.z)
        }
        updateOcclusionAndShadow(e) {
            var s;
            this.occlusionModule.getCylinderByFinger(e).position.copy(this.modelRoot.position),
            (s = this.shadowModule) == null || s.shadowRoot.position.copy(this.modelRoot.position)
        }
        validateModelTransform(e) {
            if (!this.modelRoot || this.mpHand.distance < T.minHandDistance)
                return !1;
            const i = this.mpHand.getFingerLookAtFactor(e);
            A("fingerLookAtFactor", i);
            const s = Math.abs(this.mpHand.getCameraLookAtFactor())
              , n = .333;
            if (i < n || s < n)
                return !1;
            const r = this.modelRoot.rotation.z
              , a = Math.abs(l.MathUtils.radToDeg(r)) % 360;
            if (A("roll", l.MathUtils.radToDeg(r).toFixed(2)),
            !this.mpHand.isShowingFrontHand() && a > 110 || this.mpHand.isShowingFrontHand() && a < 70)
                return !1;
            const o = this._viewer.scene.activeCamera.cameraObject
              , h = Ji(this.modelRoot.position, o);
            return !(h.x < .1 || h.x > .9 || h.y < .1 || h.y > .9)
        }
        static async isAvailable() {
            return await on.pingServer()
        }
        _hideAll(e=!1) {
            var i;
            T.showHandMask || (super._hideAll(e),
            (i = this.debugHelper) == null || i.hide(),
            this.lastPosition.set(0, 0, 0),
            this.lastQuaternion.set(0, 0, 0, 1))
        }
        _showAll() {
            var e;
            super._showAll(),
            (e = this.debugHelper) == null || e.show()
        }
        _postFrame() {
            if (super._postFrame(),
            !(this._starting || !this.running) && this.closeRangeZoomIn) {
                let e = 1;
                (this.handDetector.success || this.leapMpHand.confidence > .5) && (e = l.MathUtils.mapLinear(this.mpHand.distance, 15, 25, 1, 0),
                e = l.MathUtils.clamp(e, 0, 1) ** 2 * .375 + 1),
                A("delta", this.delta.toFixed(2)),
                this.zoom = l.MathUtils.lerp(this.zoom, e, Math.min(.225 * this.delta / 10, 1));
                const i = this._videoFeed.texture
                  , s = this._videoFeed.view;
                s.scale = this.zoom;
                const n = ~~i.image.height
                  , r = ~~i.image.width
                  , a = ~~s.width
                  , o = ~~s.height
                  , h = r / n
                  , c = a / o;
                let d = a
                  , u = o;
                h > c ? d = ~~(o * h) : u = ~~(a / h);
                const f = 1 / (d / a) / (s.scale || 1)
                  , g = 1 / (u / o) / (s.scale || 1);
                this._videoFeed.textureScale = [f, g];
                const y = (1 - f) / 2
                  , b = (1 - g) / 2;
                i.repeat.set(f, g),
                i.offset.set(y, b)
            }
        }
        async _stop() {
            var i, s, n, r, a;
            await super._stop(),
            this.instoreInitUI.dispose(),
            (i = this.serverManager) == null || i.dispose(),
            (s = this.exposureBarUI) == null || s.dispose();
            const e = this._viewer.getPlugin(ra);
            this._viewer.removePlugin(e),
            (n = this.fingerCenterWidthCalculator) == null || n.dispose(),
            (r = this.serverManager) == null || r.removeEventListener("close", this.onServerClose),
            (a = this.fadeShaderExtension) == null || a.removeEventListener("fullyHidden", this.onFullyHidden),
            this.changeDebounceTimeout && (clearTimeout(this.changeDebounceTimeout),
            this.changeDebounceTimeout = null)
        }
    }
    ,
    R.InstoreRingTryonPlugin.PluginType = "RingTryonPlugin",
    ca([l.uiToggle("Close Range Zoom-In")], R.InstoreRingTryonPlugin.prototype, "closeRangeZoomIn", 2),
    ca([l.uiToggle("Center Ring")], R.InstoreRingTryonPlugin.prototype, "centerRing", 2),
    R.InstoreRingTryonPlugin = ca([l.uiFolder("In-Store Ring Tryon")], R.InstoreRingTryonPlugin),
    R.RingTryonUIPlugin = sa,
    R.WebCameraBackgroundPlugin = Di,
    R.WebCameraPlugin = dt,
    Object.defineProperty(R, Symbol.toStringTag, {
        value: "Module"
    })
});
//# sourceMappingURL=web-vto-instore.js.map
