/* Standalone Function: Dt */

function Dt(hr, gr) {
            const dr = new three_module.O3Y(hr,.0075,3,64,gr * Math.PI * 2);
            return dr.rotateY(Math.PI / 2),
            dr.rotateX(Math.PI / 2),
            dr
        }
        function Gt(hr, gr) {
            const dr = new three_module.O3Y(hr,.1,4,24,gr * Math.PI * 2);
            return dr.rotateY(Math.PI / 2),
            dr.rotateX(Math.PI / 2),
            dr
        }
        It.translate(0, .25, 0);
        const Bt = {
            X: [[new three_module.eaF(At,it), [.5, 0, 0], [0, 0, -Math.PI / 2]], [new three_module.eaF(It,b), [0, 0, 0], [0, 0, -Math.PI / 2]]],
            Y: [[new three_module.eaF(At,at), [0, .5, 0]], [new three_module.eaF(It,_e)]],
            Z: [[new three_module.eaF(At,ut), [0, 0, .5], [Math.PI / 2, 0, 0]], [new three_module.eaF(It,nt), null, [Math.PI / 2, 0, 0]]],
            XYZ: [[new three_module.eaF(new three_module.Ufg(.1,2),vt.clone()), [0, 0, 0]]],
            XY: [[new three_module.eaF(new three_module.iNn(.2,.2,.01),_t.clone()), [.2, .2, 0]]],
            YZ: [[new three_module.eaF(new three_module.iNn(.2,.2,.01),pt.clone()), [0, .2, .2], [0, Math.PI / 2, 0]]],
            XZ: [[new three_module.eaF(new three_module.iNn(.2,.2,.01),ht.clone()), [.2, 0, .2], [-Math.PI / 2, 0, 0]]]
        }
          , kt = {
            X: [[new three_module.eaF(new three_module.Ho_(.2,0,.6,4),h), [.3, 0, 0], [0, 0, -Math.PI / 2]]],
            Y: [[new three_module.eaF(new three_module.Ho_(.2,0,.6,4),h), [0, .3, 0]]],
            Z: [[new three_module.eaF(new three_module.Ho_(.2,0,.6,4),h), [0, 0, .3], [Math.PI / 2, 0, 0]]],
            XYZ: [[new three_module.eaF(new three_module.Ufg(.2,0),h)]],
            XY: [[new three_module.eaF(new three_module.iNn(.25,.25,.01),h), [.2, .2, 0]]],
            YZ: [[new three_module.eaF(new three_module.iNn(.25,.25,.01),h), [0, .2, .2], [0, Math.PI / 2, 0]]],
            XZ: [[new three_module.eaF(new three_module.iNn(.25,.25,.01),h), [.2, 0, .2], [-Math.PI / 2, 0, 0]]]
        }
          , Ut = {
            START: [[new three_module.eaF(new three_module.Ufg(.01,2),_), null, null, null, "helper"]],
            END: [[new three_module.eaF(new three_module.Ufg(.01,2),_), null, null, null, "helper"]],
            DELTA: [[new three_module.N1A(function() {
                const hr = new three_module.LoY;
                return hr.setAttribute("position", new three_module.qtW([0, 0, 0, 1, 1, 1],3)),
                hr
            }(),_), null, null, null, "helper"]],
            X: [[new three_module.N1A(Pt,_.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]],
            Y: [[new three_module.N1A(Pt,_.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]],
            Z: [[new three_module.N1A(Pt,_.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]]
        }
          , Ht = {
            XYZE: [[new three_module.eaF(new three_module.Gu$(.1,10,8),vt)], [new three_module.eaF(Dt(.5, 1),St), null, [0, Math.PI / 2, 0]]],
            X: [[new three_module.eaF(Dt(.5, .5),b)], [new three_module.eaF(It,b), [0, 0, 0], [0, 0, -Math.PI / 2]], [new three_module.eaF(At.clone().translate(.5, 0, 0),it), [0, 0, 0], [-Math.PI / 2, -Math.PI / 2, -Math.PI / 2]]],
            Y: [[new three_module.eaF(Dt(.5, .5),_e), null, [0, 0, -Math.PI / 2]], [new three_module.eaF(It,_e)], [new three_module.eaF(At.clone().rotateZ(-Math.PI / 2).translate(0, .5, 0),at), [0, 0, 0], [Math.PI / 2, 0, 0]]],
            Z: [[new three_module.eaF(Dt(.5, .5),nt), null, [0, Math.PI / 2, 0]], [new three_module.eaF(It,nt), null, [Math.PI / 2, 0, 0]], [new three_module.eaF(At.clone().rotateZ(-Math.PI).translate(0, 0, .5),ut), [0, 0, 0], [0, Math.PI / 2, 0]]]
        }
          , Kt = {
            AXIS: [[new three_module.N1A(Pt,_.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]]
        }
          , Jt = {
            XYZE: [[new three_module.eaF(new three_module.Gu$(.25,10,8),h)]],
            X: [[new three_module.eaF(Gt(.5, .5),h)]],
            Y: [[new three_module.eaF(Gt(.5, .5),h), [0, 0, 0], [0, 0, -Math.PI / 2]]],
            Z: [[new three_module.eaF(Gt(.5, .5),h), [0, 0, 0], [0, Math.PI / 2, 0]]]
        }
          , or = {
            X: [[new three_module.eaF(Et,it), [.5, 0, 0], [0, 0, -Math.PI / 2]], [new three_module.eaF(It,b), [0, 0, 0], [0, 0, -Math.PI / 2]]],
            Y: [[new three_module.eaF(Et,at), [0, .5, 0]], [new three_module.eaF(It,_e)]],
            Z: [[new three_module.eaF(Et,ut), [0, 0, .5], [Math.PI / 2, 0, 0]], [new three_module.eaF(It,nt), [0, 0, 0], [Math.PI / 2, 0, 0]]],
            XY: [[new three_module.eaF(new three_module.iNn(.15,.15,.01),_t), [.15, .15, 0]]],
            YZ: [[new three_module.eaF(new three_module.iNn(.15,.15,.01),pt), [0, .15, .15], [0, Math.PI / 2, 0]]],
            XZ: [[new three_module.eaF(new three_module.iNn(.15,.15,.01),ht), [.15, 0, .15], [-Math.PI / 2, 0, 0]]],
            XYZ: [[new three_module.eaF(new three_module.iNn(.1,.1,.1),vt.clone())]]
        }
          , ir = {
            X: [[new three_module.eaF(new three_module.Ho_(.2,0,.6,4),h), [.3, 0, 0], [0, 0, -Math.PI / 2]], [new three_module.eaF(new three_module.Ho_(.2,0,.6,4),h), [-.3, 0, 0], [0, 0, Math.PI / 2]]],
            Y: [[new three_module.eaF(new three_module.Ho_(.2,0,.6,4),h), [0, .3, 0]], [new three_module.eaF(new three_module.Ho_(.2,0,.6,4),h), [0, -.3, 0], [0, 0, Math.PI]]],
            Z: [[new three_module.eaF(new three_module.Ho_(.2,0,.6,4),h), [0, 0, .3], [Math.PI / 2, 0, 0]], [new three_module.eaF(new three_module.Ho_(.2,0,.6,4),h), [0, 0, -.3], [-Math.PI / 2, 0, 0]]],
            XY: [[new three_module.eaF(new three_module.iNn(.2,.2,.01),h), [.15, .15, 0]]],
            YZ: [[new three_module.eaF(new three_module.iNn(.2,.2,.01),h), [0, .15, .15], [0, Math.PI / 2, 0]]],
            XZ: [[new three_module.eaF(new three_module.iNn(.2,.2,.01),h), [.15, 0, .15], [-Math.PI / 2, 0, 0]]],
            XYZ: [[new three_module.eaF(new three_module.iNn(.2,.2,.2),h), [0, 0, 0]]]
        }
          , lr = {
            X: [[new three_module.N1A(Pt,_.clone()), [-1e3, 0, 0], null, [1e6, 1, 1], "helper"]],
            Y: [[new three_module.N1A(Pt,_.clone()), [0, -1e3, 0], [0, 0, Math.PI / 2], [1e6, 1, 1], "helper"]],
            Z: [[new three_module.N1A(Pt,_.clone()), [0, 0, -1e3], [0, -Math.PI / 2, 0], [1e6, 1, 1], "helper"]]
        };
        function ar(hr) {
            const gr = new three_module.B69;
            for (const dr in hr)
                for (let cr = hr[dr].length; cr--; ) {
                    const Ar = hr[dr][cr][0].clone()
                      , wr = hr[dr][cr][1]
                      , Rr = hr[dr][cr][2]
                      , Cr = hr[dr][cr][3]
                      , tr = hr[dr][cr][4];
                    Ar.name = dr,
                    Ar.tag = tr,
                    wr && Ar.position.set(wr[0], wr[1], wr[2]),
                    Rr && Ar.rotation.set(Rr[0], Rr[1], Rr[2]),
                    Cr && Ar.scale.set(Cr[0], Cr[1], Cr[2]),
                    Ar.updateMatrix();
                    const fr = Ar.geometry.clone();
                    fr.applyMatrix4(Ar.matrix),
                    Ar.geometry = fr,
                    Ar.renderOrder = 1 / 0,
                    Ar.position.set(0, 0, 0),
                    Ar.rotation.set(0, 0, 0),
                    Ar.scale.set(1, 1, 1),
                    gr.add(Ar)
                }
            return gr
        }
        this.gizmo = {},
        this.picker = {},
        this.helper = {},
        this.add(this.gizmo.translate = ar(Bt)),
        this.add(this.gizmo.rotate = ar(Ht)),
        this.add(this.gizmo.scale = ar(or)),
        this.add(this.picker.translate = ar(kt)),
        this.add(this.picker.rotate = ar(Jt)),
        this.add(this.picker.scale = ar(ir)),
        this.add(this.helper.translate = ar(Ut)),
        this.add(this.helper.rotate = ar(Kt)),
        this.add(this.helper.scale = ar(lr)),
        this.picker.translate.visible = !1,
        this.picker.rotate.visible = !1,
        this.picker.scale.visible = !1
    }
    updateMatrixWorld(o) {
        const c = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : _identityQuaternion;
        this.gizmo.translate.visible = this.mode === "translate",
        this.gizmo.rotate.visible = this.mode === "rotate",
        this.gizmo.scale.visible = this.mode === "scale",
        this.helper.translate.visible = this.mode === "translate",
        this.helper.rotate.visible = this.mode === "rotate",
        this.helper.scale.visible = this.mode === "scale";
        let h = [];
        h = h.concat(this.picker[this.mode].children),
        h = h.concat(this.gizmo[this.mode].children),
        h = h.concat(this.helper[this.mode].children);
        for (let _ = 0; _ < h.length; _++) {
            const b = h[_];
            let _e;
            b.visible = !0,
            b.rotation.set(0, 0, 0),
            b.position.copy(this.worldPosition),
            _e = this.camera.isOrthographicCamera ? (this.camera.top - this.camera.bottom) / this.camera.zoom : this.worldPosition.distanceTo(this.cameraPosition) * Math.min(1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom, 7),
            b.scale.set(1, 1, 1).multiplyScalar(_e * this.size / 4),
            b.tag !== "helper" ? (b.quaternion.copy(c),
            this.mode === "translate" || this.mode === "scale" ? (b.name === "X" && Math.abs(_alignVector.copy(_unitX).applyQuaternion(c).dot(this.eye)) > .99 && (b.scale.set(1e-10, 1e-10, 1e-10),
            b.visible = !1),
            b.name === "Y" && Math.abs(_alignVector.copy(_unitY).applyQuaternion(c).dot(this.eye)) > .99 && (b.scale.set(1e-10, 1e-10, 1e-10),
            b.visible = !1),
            b.name === "Z" && Math.abs(_alignVector.copy(_unitZ).applyQuaternion(c).dot(this.eye)) > .99 && (b.scale.set(1e-10, 1e-10, 1e-10),
            b.visible = !1),
            b.name === "XY" && Math.abs(_alignVector.copy(_unitZ).applyQuaternion(c).dot(this.eye)) < .2 && (b.scale.set(1e-10, 1e-10, 1e-10),
            b.visible = !1),
            b.name === "YZ" && Math.abs(_alignVector.copy(_unitX).applyQuaternion(c).dot(this.eye)) < .2 && (b.scale.set(1e-10, 1e-10, 1e-10),
            b.visible = !1),
            b.name === "XZ" && Math.abs(_alignVector.copy(_unitY).applyQuaternion(c).dot(this.eye)) < .2 && (b.scale.set(1e-10, 1e-10, 1e-10),
            b.visible = !1)) : this.mode === "rotate" && (_tempQuaternion2.copy(c),
            _alignVector.copy(this.eye).applyQuaternion(_tempQuaternion.copy(c).invert()),
            b.name.search("E") !== -1 && b.quaternion.setFromRotationMatrix(_lookAtMatrix.lookAt(this.eye, _zeroVector, _unitY)),
            b.name === "X" && (_tempQuaternion.setFromAxisAngle(_unitX, Math.atan2(-_alignVector.y, _alignVector.z)),
            _tempQuaternion.multiplyQuaternions(_tempQuaternion2, _tempQuaternion),
            b.quaternion.copy(_tempQuaternion)),
            b.name === "Y" && (_tempQuaternion.setFromAxisAngle(_unitY, Math.atan2(_alignVector.x, _alignVector.z)),
            _tempQuaternion.multiplyQuaternions(_tempQuaternion2, _tempQuaternion),
            b.quaternion.copy(_tempQuaternion)),
            b.name === "Z" && (_tempQuaternion.setFromAxisAngle(_unitZ, Math.atan2(_alignVector.y, _alignVector.x)),
            _tempQuaternion.multiplyQuaternions(_tempQuaternion2, _tempQuaternion),
            b.quaternion.copy(_tempQuaternion))),
            b.visible = b.visible && (b.name.indexOf("X") === -1 || this.showX),
            b.visible = b.visible && (b.name.indexOf("Y") === -1 || this.showY),
            b.visible = b.visible && (b.name.indexOf("Z") === -1 || this.showZ),
            b.visible = b.visible && (b.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ),
            b.material._color = b.material._color || b.material.color.clone(),
            b.material._opacity = b.material._opacity || b.material.opacity,
            b.material.color.copy(b.material._color),
            b.material.opacity = b.material._opacity,
            this.enabled && this.axis && (b.name === this.axis || this.axis.split("").some(function(nt) {
                return b.name === nt
            })) && (b.material.__color && b.material.color.setHex(b.material.__color),
            b.material.opacity = 1)) : (b.visible = !1,
            b.name === "AXIS" ? (b.visible = !!this.axis,
            this.axis === "X" && (_tempQuaternion.setFromEuler(_tempEuler.set(0, 0, 0)),
            b.quaternion.copy(c).multiply(_tempQuaternion),
            Math.abs(_alignVector.copy(_unitX).applyQuaternion(c).dot(this.eye)) > .9 && (b.visible = !1)),
            this.axis === "Y" && (_tempQuaternion.setFromEuler(_tempEuler.set(0, 0, Math.PI / 2)),
            b.quaternion.copy(c).multiply(_tempQuaternion),
            Math.abs(_alignVector.copy(_unitY).applyQuaternion(c).dot(this.eye)) > .9 && (b.visible = !1)),
            this.axis === "Z" && (_tempQuaternion.setFromEuler(_tempEuler.set(0, Math.PI / 2, 0)),
            b.quaternion.copy(c).multiply(_tempQuaternion),
            Math.abs(_alignVector.copy(_unitZ).applyQuaternion(c).dot(this.eye)) > .9 && (b.visible = !1)),
            this.axis === "XYZE" && (_tempQuaternion.setFromEuler(_tempEuler.set(0, Math.PI / 2, 0)),
            _alignVector.copy(this.rotationAxis),
            b.quaternion.setFromRotationMatrix(_lookAtMatrix.lookAt(_zeroVector, _alignVector, _unitY)),
            b.quaternion.multiply(_tempQuaternion),
            b.visible = this.dragging),
            this.axis === "E" && (b.visible = !1)) : b.name === "START" ? (b.position.copy(this.worldPositionStart),
            b.visible = this.dragging) : b.name === "END" ? (b.position.copy(this.worldPosition),
            b.visible = this.dragging) : b.name === "DELTA" ? (b.position.copy(this.worldPositionStart),
            b.quaternion.copy(this.worldQuaternionStart),
            _tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),
            _tempVector.applyQuaternion(this.worldQuaternionStart.clone().invert()),
            b.scale.copy(_tempVector),
            b.visible = this.dragging) : (b.quaternion.copy(c),
            this.dragging ? b.position.copy(this.worldPositionStart) : b.position.copy(this.worldPosition),
            this.axis && (b.visible = this.axis.search(b.name) !== -1)))
        }
        super.updateMatrixWorld(o)
    }
}

export default Dt;
