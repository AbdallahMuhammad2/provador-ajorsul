/*
 * Module 957 (Pattern 0)
 * Params: __unused_webpack_module, __webpackgi_exports__, __webpackgi_require__
 * Size: 3249 chars
 */

// === MODULE CONTENT ===
function module957(__unused_webpack_module, __webpackgi_exports__, __webpackgi_require__) {
__webpackgi_require__.d(__webpackgi_exports__, {
            Z: function() {
                return DRACOLoader2
            }
        });
        var three_examples_jsm_loaders_DRACOLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpackgi_require__(149)
          , three__WEBPACK_IMPORTED_MODULE_1__ = __webpackgi_require__(848);
        class DRACOLoader2 extends three_examples_jsm_loaders_DRACOLoader__WEBPACK_IMPORTED_MODULE_0__.Z {
            constructor(d) {
                super(d),
                this.encoderPending = null,
                this.encoderConfig = {
                    type: "js"
                },
                this.isDRACOLoader2 = !0,
                this.setDecoderPath(DRACOLoader2.LIB_CDN_PATH),
                this.setDecoderConfig({
                    type: "js"
                })
            }
            transform(d, o) {
                return d ? new three__WEBPACK_IMPORTED_MODULE_1__.eaF(d,new three__WEBPACK_IMPORTED_MODULE_1__._4j) : void 0
            }
            preload(d=!0, o=!1) {
                return d && super.preload(),
                o && this.initEncoder(),
                this
            }
            async initEncoder() {
                if (this.encoderPending)
                    return this.encoderPending;
                const useJS = typeof WebAssembly != "object" || this.encoderConfig.type === "js"
                  , librariesPending = []
                  , libLoader = this._loadLibrary.bind(this);
                return useJS ? librariesPending.push(libLoader("draco_encoder.js", "text")) : (librariesPending.push(libLoader("draco_wasm_wrapper.js", "text")),
                librariesPending.push(libLoader("draco_encoder.wasm", "arraybuffer"))),
                this.encoderPending = Promise.all(librariesPending).then(libraries => {
                    var _a;
                    const jsContent = libraries[0];
                    return useJS || (this.encoderConfig.wasmBinary = libraries[1]),
                    (_a = eval(jsContent + `
DracoEncoderModule;`)) === null || _a === void 0 ? void 0 : _a()
                }
                ),
                this.encoderPending
            }
            async initDecoder() {
                var _a;
                await this._initDecoder();
                const jsContent = await fetch(this.workerSourceURL).then(async d => d.text()).then(d => {
                    const o = d.indexOf("/* worker */");
                    if (o < 1)
                        throw new Error("unable to load decoder module");
                    return d.substring(0, o - 1)
                }
                );
                return (_a = eval(jsContent + `
DracoDecoderModule;`)) === null || _a === void 0 ? void 0 : _a()
            }
            async _loadLibrary(d, o) {
                return DRACOLoader2.LibraryValueMap[d] ? DRACOLoader2.LibraryValueMap[d] : DRACOLoader2.LibraryValueMap[d] = await super._loadLibrary(d, o)
            }
            static SetDecoderJsString(d) {
                this.LibraryValueMap["draco_decoder.js"] = d
            }
        }
        DRACOLoader2.LIB_CDN_PATH = "https://cdn.jsdelivr.net/gh/google/draco@1.4.1/javascript/",
        DRACOLoader2.LibraryValueMap = {}
}

export default module957;
