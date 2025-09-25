/* Standalone Class: ARTouchInputHelper */

class ARTouchInputHelper {
    constructor() {
        this.inputSource = null,
        this.isTranslating = !1,
        this.isRotating = !1,
        this.isTwoFingering = !1,
        this.lastDragPosition = new three_module.Pq0,
        this.firstRatio = 0,
        this.lastAngle = 0,
        this.goalPosition = new three_module.Pq0,
        this.goalYaw = 0,
        this.goalScale = 1,
        this.presentedScene = null,
        this.placementBox = null,
        this.placeOnWall = !1,
        this.placementComplete = !1,
        this.xr = null,
        this.session = null,
        this._hitPosition = new three_module.Pq0,
        this._hitMatrix = new three_module.kn4,
        this.xDamper = new k$1,
        this.yDamper = new k$1,
        this.zDamper = new k$1,
        this.yawDamper = new k$1,
        this.scaleDamper = new k$1,
        this.onSelectStart = o => {
            const c = this.transientHitTestSource;
            if (c == null)
                return;
            const h = this.frame.getHitTestResultsForTransientInput(c)
              , _ = this.presentedScene
              , b = this.placementBox;
            if (h.length === 1) {
                this.inputSource = o.inputSource;
                const {axes: _e} = this.inputSource.gamepad || {
                    axes: [0, 0]
                }
                  , nt = b.getHit(_, _e[0], _e[1]);
                b.show = !0,
                nt != null ? (this.isTranslating = !0,
                this.lastDragPosition.copy(nt),
                this.presentedScene && (this.presentedScene.visible = !0)) : this.placeOnWall || (this.isRotating = !0,
                this.lastAngle = _e[0] * ROTATION_RATE)
            } else if (h.length === 2) {
                b.show = !0,
                this.isTwoFingering = !0;
                const {separation: _e} = this.fingerPolar(h);
                this.firstRatio = _e / _.scale.x
            }
        }
        ,
        this.onSelectEnd = () => {
            this.isTranslating = !1,
            this.isRotating = !1,
            this.isTwoFingering = !1,
            this.inputSource = null,
            this.goalPosition.y += this.placementBox.offsetHeight * this.presentedScene.scale.x,
            this.placementBox.show = !1
        }
    }
    async setSession(o, c, h) {
        var _;
        this.transientHitTestSource = await ((_ = o.requestHitTestSourceForTransientInput) === null || _ === void 0 ? void 0 : _.call(o, {
            profile: "generic-touchscreen"
        })),
        this.presentedScene = c,
        this.placementBox = h,
        this.session = o,
        this.placementComplete = !1,
        this.goalPosition.copy(c.position),
        this.goalYaw = c.rotation.y,
        this.goalScale = c.scale.x,
        o.addEventListener("selectstart", this.onSelectStart),
        o.addEventListener("selectend", this.onSelectEnd)
    }
    cancel() {
        this.transientHitTestSource && (this.transientHitTestSource.cancel(),
        this.transientHitTestSource = void 0),
        this.presentedScene = null,
        this.placeOnWall = !1,
        this.frame = void 0,
        this.xr = null,
        this.placementBox && (this.placementBox.show = !1,
        this.placementBox = null),
        this.session && (this.session.removeEventListener("selectstart", this.onSelectStart),
        this.session.removeEventListener("selectend", this.onSelectEnd),
        this.session = null)
    }
    getHitPoint(o) {
        var c;
        const h = (c = this.xr) === null || c === void 0 ? void 0 : c.getReferenceSpace()
          , _ = h ? o.getPose(h) : null;
        return _ ? (this._hitMatrix.fromArray(_.transform.matrix),
        this.placeOnWall && (this.goalYaw = Math.atan2(this._hitMatrix.elements[4], this._hitMatrix.elements[6])),
        this._hitMatrix.elements[5] > .75 !== this.placeOnWall ? this._hitPosition.setFromMatrixPosition(this._hitMatrix) : null) : null
    }
    moveScene(o) {
        if (!this.session)
            return;
        const c = this.presentedScene
          , h = c.position
          , _ = c.rotation.y
          , b = this.placementBox
          , _e = Math.max(b.boundingSize.x, b.boundingSize.y, b.boundingSize.z) / 2
          , nt = this.goalPosition
          , it = c.scale.x;
        if (!nt.equals(h) || this.goalScale !== it) {
            let {x: at, y: ut, z: pt} = h;
            at = this.xDamper.update(at, nt.x, o, _e),
            ut = this.yDamper.update(ut, nt.y, o, _e),
            pt = this.zDamper.update(pt, nt.z, o, _e),
            h.set(at, ut, pt);
            const ht = this.scaleDamper.update(it, this.goalScale, o, 1);
            if (c.scale.set(ht, ht, ht),
            !this.isTranslating) {
                const _t = nt.y - ut;
                this.placementComplete && !this.placeOnWall ? b.offsetHeight = _t / ht : _t === 0 && (this.placementComplete = !0,
                b.show = !1)
            }
        }
        b.updateOpacity(o),
        c.rotation.y = this.yawDamper.update(_, this.goalYaw, o, Math.PI)
    }
    processInput(o) {
        var c;
        this.frame = o;
        const h = this.transientHitTestSource;
        if (!h || !this.isTranslating && !this.isTwoFingering && !this.isRotating)
            return;
        const _ = o.getHitTestResultsForTransientInput(h)
          , b = this.presentedScene
          , _e = b.scale.x;
        if (this.isTwoFingering)
            if (_.length < 2)
                this.isTwoFingering = !1;
            else {
                const {separation: nt, deltaYaw: it} = this.fingerPolar(_);
                if (this.placeOnWall || (this.goalYaw += it),
                !b.userData.__scaleDisabled) {
                    const at = nt / this.firstRatio;
                    this.goalScale = at < SCALE_SNAP_HIGH && at > SCALE_SNAP_LOW ? 1 : at
                }
            }
        else if (_.length !== 2)
            if (this.isRotating && (!((c = this.inputSource) === null || c === void 0) && c.gamepad)) {
                const nt = this.inputSource.gamepad.axes[0] * ROTATION_RATE;
                this.goalYaw += nt - this.lastAngle,
                this.lastAngle = nt
            } else
                this.isTranslating && (console.log("translating"),
                _.forEach(nt => {
                    if (nt.inputSource !== this.inputSource)
                        return;
                    let it = null;
                    if (nt.results.length > 0 && (it = this.getHitPoint(nt.results[0])),
                    it == null && (it = this.getTouchLocation()),
                    it != null) {
                        if (this.goalPosition.sub(this.lastDragPosition),
                        !this.placeOnWall) {
                            const at = it.y - this.lastDragPosition.y;
                            if (at < 0) {
                                this.placementBox.offsetHeight = at / _e;
                                const ut = vector3.copy(this.xr.getCamera().position)
                                  , pt = -at / (ut.y - it.y);
                                ut.multiplyScalar(pt),
                                it.multiplyScalar(1 - pt).add(ut)
                            }
                        }
                        this.goalPosition.add(it),
                        this.lastDragPosition.copy(it)
                    }
                }
                ));
        else {
            this.isTranslating = !1,
            this.isRotating = !1,
            this.isTwoFingering = !0;
            const {separation: nt} = this.fingerPolar(_);
            this.firstRatio = nt / _e
        }
    }
    getTouchLocation() {
        var o, c;
        const {axes: h} = (o = this.inputSource.gamepad) !== null && o !== void 0 ? o : {
            axes: [0, 0]
        }
          , _ = this.placementBox.getExpandedHit(this.presentedScene, h[0], h[1]);
        return _ != null && (vector3.copy(_).sub((c = this.xr) === null || c === void 0 ? void 0 : c.getCamera().position),
        vector3.length() > MAX_DISTANCE) ? null : _
    }
    fingerPolar(o) {
        var c, h, _, b, _e, nt;
        const it = (_ = (h = (c = o[0].inputSource) === null || c === void 0 ? void 0 : c.gamepad) === null || h === void 0 ? void 0 : h.axes) !== null && _ !== void 0 ? _ : [0, 0]
          , at = (nt = (_e = (b = o[1].inputSource) === null || b === void 0 ? void 0 : b.gamepad) === null || _e === void 0 ? void 0 : _e.axes) !== null && nt !== void 0 ? nt : [0, 0]
          , ut = at[0] - it[0]
          , pt = at[1] - it[1]
          , ht = Math.atan2(pt, ut);
        let _t = this.lastAngle - ht;
        return _t > Math.PI ? _t -= 2 * Math.PI : _t < -Math.PI && (_t += 2 * Math.PI),
        this.lastAngle = ht,
        {
            separation: Math.sqrt(ut * ut + pt * pt),
            deltaYaw: _t
        }
    }
}

export default ARTouchInputHelper;
