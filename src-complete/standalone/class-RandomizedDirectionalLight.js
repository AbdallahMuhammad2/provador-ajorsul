/* Standalone Class: RandomizedDirectionalLight */

class RandomizedDirectionalLight extends DirectionalLight2 {
    constructor(o, c, h, _) {
        super(o, c),
        this._shadowParams = {
            enabled: !0,
            radius: 2,
            width: 1024,
            height: 1024,
            bias: -.001,
            normalBias: 0,
            near: 1.5,
            far: 4,
            frustumSize: 4
        },
        this._randomParams = {
            focus: 1,
            spread: .01,
            distanceScale: 50,
            minDistanceScale: new three_module.Pq0(10,10,10),
            normalDirection: new three_module.Pq0(.01,.98,.01).normalize(),
            direction: new three_module.Pq0(-.9,.5,-1)
        },
        this.isRandomizedDirectionalLight = !0,
        this.shadowParams = h ?? {},
        this.randomParams = _ ?? {},
        this.updateShadowParams = this.updateShadowParams.bind(this)
    }
    get shadowParams() {
        return this._shadowParams
    }
    set shadowParams(o) {
        Object.keys(o).forEach(c => o[c] === void 0 && delete o[c]),
        this._shadowParams = {
            ...this._shadowParams,
            ...o
        },
        this.updateShadowParams()
    }
    get randomParams() {
        return this._randomParams
    }
    set randomParams(o) {
        Object.keys(o).forEach(c => o[c] === void 0 && delete o[c]),
        Object.assign(this._randomParams, o)
    }
    updateShadowParams() {
        this.castShadow = this._shadowParams.enabled,
        this.shadow.mapSize.x = this._shadowParams.width,
        this.shadow.mapSize.y = this._shadowParams.height,
        this.shadow.bias = this._shadowParams.bias,
        this.shadow.normalBias = this._shadowParams.normalBias,
        this.refreshShadowCamNearFar(),
        this.shadow.radius = this._shadowParams.radius,
        this.shadow.camera.right = this._shadowParams.frustumSize / 2,
        this.shadow.camera.left = -this._shadowParams.frustumSize / 2,
        this.shadow.camera.top = this._shadowParams.frustumSize / 2,
        this.shadow.camera.bottom = -this._shadowParams.frustumSize / 2,
        this.shadow.camera.updateProjectionMatrix(),
        this.matrixWorldNeedsUpdate = !0
    }
    randomizePosition(o, c=null, h=null) {
        const _ = new a(o.toString())
          , b = new three_module.I9Y(_.next() * Math.PI * 2,Math.asin(2 * _.next() - 1));
        let _e = new three_module.Pq0(Math.cos(b.x) * Math.cos(b.y),Math.sin(b.y),Math.sin(b.x) * Math.cos(b.y));
        const nt = new three_module.I9Y;
        for (let it = 0; it < 5; it++) {
            nt.set(_.next(), _.next()),
            _e = getSample(nt, this._randomParams.normalDirection, .4),
            _.next() < Math.sqrt(c ?? this._randomParams.focus) && (nt.set(_.next(), _.next()),
            _e = getSample(nt, this._randomParams.direction, Math.pow((h ?? this._randomParams.spread) / 2, 2)));
            const at = _e.dot(this._randomParams.normalDirection);
            if (at > 0 && at < .4)
                break
        }
        _e.normalize(),
        _e.multiplyScalar(this._randomParams.distanceScale),
        this.position.set(0, 0, 0),
        this.target.position.copy(_e.normalize().negate()),
        this.target.updateMatrixWorld(),
        this.refreshShadowCamNearFar(),
        this.updateMatrixWorld()
    }
    refreshShadowCamNearFar() {
        const o = new three_module.Pq0().subVectors(this.target.position, this.shadow.camera.position).length();
        this.shadow.camera.near = o - this._shadowParams.near * this._shadowParams.frustumSize / 2,
        this.shadow.camera.far = o + this._shadowParams.far * this._shadowParams.frustumSize / 2
    }
    dispose() {}
    get uiConfig() {
        if (this._uiConfig)
            return this._uiConfig
    }
    fromJSON(o, c) {
        return super.fromJSON(o, c) ? (this.updateShadowParams(),
        this) : null
    }
}

export default RandomizedDirectionalLight;
