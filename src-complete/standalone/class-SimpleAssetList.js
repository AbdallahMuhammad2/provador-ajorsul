/* Standalone Class: SimpleAssetList */

class SimpleAssetList {
    get basePath() {
        return this._basePath
    }
    get assets() {
        return this._assets
    }
    constructor(o) {
        var c, h, _;
        this._basePath = (c = o == null ? void 0 : o.basePath) !== null && c !== void 0 ? c : "",
        this._assets = (_ = (h = o == null ? void 0 : o.assets) === null || h === void 0 ? void 0 : h.map(b => this._resolveAsset(b))) !== null && _ !== void 0 ? _ : []
    }
    find(o) {
        const c = this._assets.find(o);
        return c ?? void 0
    }
    _resolveAsset(o) {
        return {
            ...o,
            path: ot([this._basePath, o.path])
        }
    }
}

export default SimpleAssetList;
