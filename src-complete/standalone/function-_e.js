/* Standalone Function: _e */

function _e(At, Et) {
            let Pt = Et;
            Object.defineProperty(b, At, {
                get: function() {
                    return Pt !== void 0 ? Pt : Et
                },
                set: function(It) {
                    Pt !== It && (Pt = It,
                    _[At] = It,
                    h[At] = It,
                    b.dispatchEvent({
                        type: At + "-changed",
                        value: It
                    }),
                    b.dispatchEvent(TransformControls_changeEvent))
                }
            }),
            b[At] = Et,
            _[At] = Et,
            h[At] = Et
        }
        _e("camera", o),
        _e("object", void 0),
        _e("enabled", !0),
        _e("axis", null),
        _e("mode", "translate"),
        _e("translationSnap", null),
        _e("rotationSnap", null),
        _e("scaleSnap", null),
        _e("space", "world"),
        _e("size", 1),
        _e("dragging", !1),
        _e("showX", !0),
        _e("showY", !0),
        _e("showZ", !0);
        const nt = new three_module.Pq0
          , it = new three_module.Pq0
          , at = new three_module.PTz
          , ut = new three_module.PTz
          , pt = new three_module.Pq0
          , ht = new three_module.PTz
          , _t = new three_module.Pq0
          , vt = new three_module.Pq0
          , bt = new three_module.Pq0
          , St = new three_module.Pq0;
        _e("worldPosition", nt),
        _e("worldPositionStart", it),
        _e("worldQuaternion", at),
        _e("worldQuaternionStart", ut),
        _e("cameraPosition", pt),
        _e("cameraQuaternion", ht),
        _e("pointStart", _t),
        _e("pointEnd", vt),
        _e("rotationAxis", bt),
        _e("rotationAngle", 0),
        _e("eye", St),
        this._offset = new three_module.Pq0,
        this._startNorm = new three_module.Pq0,
        this._endNorm = new three_module.Pq0,
        this._cameraScale = new three_module.Pq0,
        this._parentPosition = new three_module.Pq0,
        this._parentQuaternion = new three_module.PTz,
        this._parentQuaternionInv = new three_module.PTz,
        this._parentScale = new three_module.Pq0,
        this._worldScaleStart = new three_module.Pq0,
        this._worldQuaternionInv = new three_module.PTz,
        this._worldScale = new three_module.Pq0,
        this._positionStart = new three_module.Pq0,
        this._quaternionStart = new three_module.PTz,
        this._scaleStart = new three_module.Pq0,
        this._getPointer = getPointer.bind(this),
        this._onPointerDown = onPointerDown.bind(this),
        this._onPointerHover = onPointerHover.bind(this),
        this._onPointerMove = onPointerMove.bind(this),
        this._onPointerUp = onPointerUp.bind(this),
        this.domElement.addEventListener("pointerdown", this._onPointerDown),
        this.domElement.addEventListener("pointermove", this._onPointerHover),
        this.domElement.addEventListener("pointerup", this._onPointerUp)
    }
    updateMatrixWorld() {
        this.object !== void 0 && (this.object.updateMatrixWorld(),
        this.object.parent === null ? console.error("TransformControls: The attached 3D object must be a part of the scene graph.") : this.object.parent.matrixWorld.decompose(this._parentPosition, this._parentQuaternion, this._parentScale),
        this.object.matrixWorld.decompose(this.worldPosition, this.worldQuaternion, this._worldScale),
        this._parentQuaternionInv.copy(this._parentQuaternion).invert(),
        this._worldQuaternionInv.copy(this.worldQuaternion).invert()),
        this.camera.updateMatrixWorld(),
        this.camera.matrixWorld.decompose(this.cameraPosition, this.cameraQuaternion, this._cameraScale),
        this.camera.isOrthographicCamera ? this.camera.getWorldDirection(this.eye).negate() : this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(),
        super.updateMatrixWorld(this)
    }
    pointerHover(o) {
        if (this.object === void 0 || this.dragging === !0 || o.buttons)
            return;
        _raycaster.setFromCamera(o, this.camera);
        const c = intersectObjectWithRay(this._gizmo.picker[this.mode], _raycaster);
        this.axis = c ? c.object.name : null
    }
    pointerDown(o) {
        if (this.object !== void 0 && this.dragging !== !0 && o.button === 0 && this.axis !== null) {
            _raycaster.setFromCamera(o, this.camera);
            const c = intersectObjectWithRay(this._plane, _raycaster, !0);
            c && (this.object.updateMatrixWorld(),
            this.object.parent.updateMatrixWorld(),
            this._positionStart.copy(this.object.position),
            this._quaternionStart.copy(this.object.quaternion),
            this._scaleStart.copy(this.object.scale),
            this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart),
            this.pointStart.copy(c.point).sub(this.worldPositionStart)),
            this.dragging = !0,
            _mouseDownEvent.mode = this.mode,
            this.dispatchEvent(_mouseDownEvent)
        }
    }
    pointerMove(o) {
        const c = this.axis
          , h = this.mode
          , _ = this.object;
        let b = this.space;
        if (h === "scale" ? b = "local" : c !== "E" && c !== "XYZE" && c !== "XYZ" || (b = "world"),
        _ === void 0 || c === null || this.dragging === !1 || o.button !== -1)
            return;
        _raycaster.setFromCamera(o, this.camera);
        const _e = intersectObjectWithRay(this._plane, _raycaster, !0);
        if (_e) {
            if (this.pointEnd.copy(_e.point).sub(this.worldPositionStart),
            h === "translate")
                this._offset.copy(this.pointEnd).sub(this.pointStart),
                b === "local" && c !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv),
                c.indexOf("X") === -1 && (this._offset.x = 0),
                c.indexOf("Y") === -1 && (this._offset.y = 0),
                c.indexOf("Z") === -1 && (this._offset.z = 0),
                b === "local" && c !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),
                _.position.copy(this._offset).add(this._positionStart),
                this.translationSnap && (b === "local" && (_.position.applyQuaternion(_tempQuaternion.copy(this._quaternionStart).invert()),
                c.search("X") !== -1 && (_.position.x = Math.round(_.position.x / this.translationSnap) * this.translationSnap),
                c.search("Y") !== -1 && (_.position.y = Math.round(_.position.y / this.translationSnap) * this.translationSnap),
                c.search("Z") !== -1 && (_.position.z = Math.round(_.position.z / this.translationSnap) * this.translationSnap),
                _.position.applyQuaternion(this._quaternionStart)),
                b === "world" && (_.parent && _.position.add(_tempVector.setFromMatrixPosition(_.parent.matrixWorld)),
                c.search("X") !== -1 && (_.position.x = Math.round(_.position.x / this.translationSnap) * this.translationSnap),
                c.search("Y") !== -1 && (_.position.y = Math.round(_.position.y / this.translationSnap) * this.translationSnap),
                c.search("Z") !== -1 && (_.position.z = Math.round(_.position.z / this.translationSnap) * this.translationSnap),
                _.parent && _.position.sub(_tempVector.setFromMatrixPosition(_.parent.matrixWorld))));
            else if (h === "scale") {
                if (c.search("XYZ") !== -1) {
                    let nt = this.pointEnd.length() / this.pointStart.length();
                    this.pointEnd.dot(this.pointStart) < 0 && (nt *= -1),
                    _tempVector2.set(nt, nt, nt)
                } else
                    _tempVector.copy(this.pointStart),
                    _tempVector2.copy(this.pointEnd),
                    _tempVector.applyQuaternion(this._worldQuaternionInv),
                    _tempVector2.applyQuaternion(this._worldQuaternionInv),
                    _tempVector2.divide(_tempVector),
                    c.search("X") === -1 && (_tempVector2.x = 1),
                    c.search("Y") === -1 && (_tempVector2.y = 1),
                    c.search("Z") === -1 && (_tempVector2.z = 1);
                _.scale.copy(this._scaleStart).multiply(_tempVector2),
                this.scaleSnap && (c.search("X") !== -1 && (_.scale.x = Math.round(_.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap),
                c.search("Y") !== -1 && (_.scale.y = Math.round(_.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap),
                c.search("Z") !== -1 && (_.scale.z = Math.round(_.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap))
            } else if (h === "rotate") {
                this._offset.copy(this.pointEnd).sub(this.pointStart);
                const nt = 20 / this.worldPosition.distanceTo(_tempVector.setFromMatrixPosition(this.camera.matrixWorld));
                let it = !1;
                c === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),
                this.rotationAngle = this._offset.dot(_tempVector.copy(this.rotationAxis).cross(this.eye)) * nt) : c !== "X" && c !== "Y" && c !== "Z" || (this.rotationAxis.copy(_unit[c]),
                _tempVector.copy(_unit[c]),
                b === "local" && _tempVector.applyQuaternion(this.worldQuaternion),
                _tempVector.cross(this.eye),
                _tempVector.length() === 0 ? it = !0 : this.rotationAngle = this._offset.dot(_tempVector.normalize()) * nt),
                (c === "E" || it) && (this.rotationAxis.copy(this.eye),
                this.rotationAngle = this.pointEnd.angleTo(this.pointStart),
                this._startNorm.copy(this.pointStart).normalize(),
                this._endNorm.copy(this.pointEnd).normalize(),
                this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1),
                this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap),
                b === "local" && c !== "E" && c !== "XYZE" ? (_.quaternion.copy(this._quaternionStart),
                _.quaternion.multiply(_tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle)).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv),
                _.quaternion.copy(_tempQuaternion.setFromAxisAngle(this.rotationAxis, this.rotationAngle)),
                _.quaternion.multiply(this._quaternionStart).normalize())
            }
            this.dispatchEvent(TransformControls_changeEvent),
            this.dispatchEvent(_objectChangeEvent)
        }
    }
    pointerUp(o) {
        o.button === 0 && (this.dragging && this.axis !== null && (_mouseUpEvent.mode = this.mode,
        this.dispatchEvent(_mouseUpEvent)),
        this.dragging = !1,
        this.axis = null)
    }
    dispose() {
        this.domElement.removeEventListener("pointerdown", this._onPointerDown),
        this.domElement.removeEventListener("pointermove", this._onPointerHover),
        this.domElement.removeEventListener("pointermove", this._onPointerMove),
        this.domElement.removeEventListener("pointerup", this._onPointerUp),
        this.traverse(function(o) {
            o.geometry && o.geometry.dispose(),
            o.material && o.material.dispose()
        })
    }
    attach(o) {
        return this.object = o,
        this.visible = !0,
        this
    }
    detach() {
        return this.object = void 0,
        this.visible = !1,
        this.axis = null,
        this
    }
    reset() {
        this.enabled && this.dragging && (this.object.position.copy(this._positionStart),
        this.object.quaternion.copy(this._quaternionStart),
        this.object.scale.copy(this._scaleStart),
        this.dispatchEvent(TransformControls_changeEvent),
        this.dispatchEvent(_objectChangeEvent),
        this.pointStart.copy(this.pointEnd))
    }
    getRaycaster() {
        return _raycaster
    }
    getMode() {
        return this.mode
    }
    setMode(o) {
        this.mode = o
    }
    setTranslationSnap(o) {
        this.translationSnap = o
    }
    setRotationSnap(o) {
        this.rotationSnap = o
    }
    setScaleSnap(o) {
        this.scaleSnap = o
    }
    setSize(o) {
        this.size = o
    }
    setSpace(o) {
        this.space = o
    }
}

export default _e;
