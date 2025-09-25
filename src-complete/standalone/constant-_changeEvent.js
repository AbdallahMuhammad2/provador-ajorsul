/* Standalone Constant: _changeEvent */

const _changeEvent = {
    type: "change"
}
  , _startEvent = {
    type: "start"
}
  , _endEvent = {
    type: "end"
}
  , _ray = new three_module.RlV
  , _plane = new three_module.Zcv
  , TILT_LIMIT = Math.cos(70 * three_module.cj9.DEG2RAD);
class OrbitControls extends three_module.Qev {
    constructor(o, c) {
        super(),
        this.object = o,
        this.domElement = c,
        this.domElement.style.touchAction = "none",
        this.enabled = !0,
        this.target = new three_module.Pq0,
        this.minDistance = 1e-5,
        this.maxDistance = 1 / 0,
        this.autoPushTarget = !0,
        this.autoPullTarget = !0,
        this.clampMax = new three_module.Pq0(1 / 0,1 / 0,1 / 0),
        this.clampMin = new three_module.Pq0(-1 / 0,-1 / 0,-1 / 0),
        this.minZoom = 0,
        this.maxZoom = 1 / 0,
        this.minPolarAngle = 0,
        this.maxPolarAngle = Math.PI,
        this.minAzimuthAngle = -1 / 0,
        this.maxAzimuthAngle = 1 / 0,
        this.enableDamping = !1,
        this.dampingFactor = .05,
        this.enableZoom = !0,
        this.zoomSpeed = 1,
        this.maxZoomSpeed = 1,
        this.maxZoomSpeed = 1,
        this.dollyZoom = !1,
        this.enableRotate = !0,
        this.rotateSpeed = 1,
        this.enablePan = !0,
        this.panSpeed = 1,
        this.screenSpacePanning = !0,
        this.keyPanSpeed = 7,
        this.zoomToCursor = !1,
        this.autoRotate = !1,
        this.autoRotateSpeed = 2,
        this.throttleUpdate = 0,
        this.keys = {
            LEFT: "ArrowLeft",
            UP: "ArrowUp",
            RIGHT: "ArrowRight",
            BOTTOM: "ArrowDown"
        },
        this.mouseButtons = {
            LEFT: three_module.kBv.ROTATE,
            MIDDLE: three_module.kBv.DOLLY,
            RIGHT: three_module.kBv.PAN
        },
        this.touches = {
            ONE: three_module.wtR.ROTATE,
            TWO: three_module.wtR.DOLLY_PAN
        },
        this.target0 = this.target.clone(),
        this.position0 = this.object.position.clone(),
        this.zoom0 = this.object.zoom,
        this._domElementKeyEvents = null,
        this.getPolarAngle = function() {
            return nt.phi
        }
        ,
        this.getAzimuthalAngle = function() {
            return nt.theta
        }
        ,
        this.getDistance = function() {
            return this.object.position.distanceTo(this.target)
        }
        ,
        this.listenToKeyEvents = function(Ur) {
            Ur.addEventListener("keydown", Nn),
            this._domElementKeyEvents = Ur
        }
        ,
        this.stopListenToKeyEvents = function() {
            this._domElementKeyEvents.removeEventListener("keydown", Nn),
            this._domElementKeyEvents = null
        }
        ,
        this.saveState = function() {
            h.target0.copy(h.target),
            h.position0.copy(h.object.position),
            h.zoom0 = h.object.zoom
        }
        ,
        this.reset = function() {
            h.target.copy(h.target0),
            h.object.position.copy(h.position0),
            h.object.zoom = h.zoom0,
            h.object.updateProjectionMatrix(),
            h.dispatchEvent(_changeEvent),
            h.update(),
            b = _.NONE
        }
        ,
        this.update = function() {
            const Ur = new three_module.Pq0
              , nn = new three_module.PTz().setFromUnitVectors(o.up, new three_module.Pq0(0,1,0))
              , xn = nn.clone().invert()
              , ur = new three_module.Pq0
              , pr = new three_module.PTz
              , Ir = new three_module.Pq0
              , jr = 2 * Math.PI;
            return function(Qr=null) {
                if (this.throttleUpdate && this.throttleUpdate >= 1 && Date.now() - 0 < 1e3 / this.throttleUpdate)
                    return;
                const Or = h.object.position;
                Ur.copy(Or).sub(h.target),
                Ur.applyQuaternion(nn),
                nt.setFromVector3(Ur),
                h.autoRotate && b === _.NONE && Ht(function(Cn) {
                    return Cn !== null ? 2 * Math.PI / 60 * h.autoRotateSpeed * Cn : 2 * Math.PI / 60 / 60 * h.autoRotateSpeed
                }(Qr)),
                h.enableDamping ? (nt.theta += it.theta * h.dampingFactor,
                nt.phi += it.phi * h.dampingFactor) : (nt.theta += it.theta,
                nt.phi += it.phi);
                let qr = h.minAzimuthAngle
                  , gn = h.maxAzimuthAngle;
                isFinite(qr) && isFinite(gn) && (qr < -Math.PI ? qr += jr : qr > Math.PI && (qr -= jr),
                gn < -Math.PI ? gn += jr : gn > Math.PI && (gn -= jr),
                nt.theta = qr <= gn ? Math.max(qr, Math.min(gn, nt.theta)) : nt.theta > (qr + gn) / 2 ? Math.max(qr, nt.theta) : Math.min(gn, nt.theta)),
                nt.phi = Math.max(h.minPolarAngle, Math.min(h.maxPolarAngle, nt.phi)),
                nt.makeSafe(),
                h.enableDamping === !0 ? h.target.addScaledVector(ut, h.dampingFactor) : h.target.add(ut);
                let Mn = 0;
                h.zoomToCursor && Gt || h.object.isOrthographicCamera || (Math.abs(it.radius) > 0 && (h.dollyZoom && (h.object.zoom = Math.max(Math.max(h.minZoom, .1), Math.min(Math.min(h.maxZoom, 20), h.object.zoom * (1 + it.radius * (h.enableDamping ? h.dampingFactor : 1)))),
                h.object.updateProjectionMatrix(),
                (h.object.zoom >= Math.min(h.maxZoom, 20) || h.object.zoom <= Math.max(h.minZoom, .1)) && (it.radius = 0)),
                nt.radius *= 1 + it.radius * (h.enableDamping ? h.dampingFactor : 1)),
                Math.abs(at - 1) > 1e-5 && (h.dollyZoom && (h.object.zoom = Math.max(Math.max(h.minZoom, .1), Math.min(Math.min(h.maxZoom, 20), h.object.zoom * at)),
                h.object.updateProjectionMatrix(),
                (h.object.zoom >= Math.min(h.maxZoom, 20) || h.object.zoom <= Math.max(h.minZoom, .1)) && (at = 1)),
                nt.radius *= at),
                h.autoPushTarget && nt.radius < h.minDistance && (Mn = h.minDistance - nt.radius),
                h.autoPullTarget && nt.radius > h.maxDistance && (Mn = h.maxDistance - nt.radius)),
                nt.radius = gr(nt.radius),
                Ur.setFromSpherical(nt),
                Ur.applyQuaternion(xn),
                Or.copy(h.target).add(Ur),
                h.target.add(Ur.normalize().multiplyScalar(-Mn)),
                Or.clamp(h.clampMin, h.clampMax),
                h.target.clamp(h.clampMin, h.clampMax),
                h.object.lookAt(h.target);
                let Tn = !1;
                h.enableDamping === !0 && Math.abs(it.theta) + Math.abs(it.phi) + Math.abs(it.radius) + ut.length() > .001 ? (it.theta *= 1 - h.dampingFactor,
                it.phi *= 1 - h.dampingFactor,
                it.radius *= 1 - h.dampingFactor,
                ut.multiplyScalar(1 - h.dampingFactor),
                Tn = !0) : (it.set(0, 0, 0),
                ut.set(0, 0, 0));
                let wn = !1;
                if (h.zoomToCursor && Gt) {
                    let Cn = null;
                    if (h.object.isPerspectiveCamera) {
                        const fn = nt.radius;
                        Cn = nt.radius * at,
                        Cn = gr(Cn);
                        const bn = fn - Cn;
                        h.object.position.addScaledVector(It, bn),
                        h.object.updateMatrixWorld()
                    } else if (h.object.isOrthographicCamera) {
                        const fn = new three_module.Pq0(Dt.x,Dt.y,0);
                        fn.unproject(h.object),
                        h.object.zoom = Math.max(h.minZoom, Math.min(h.maxZoom, h.object.zoom / at)),
                        h.object.updateProjectionMatrix(),
                        wn = !0;
                        const bn = new three_module.Pq0(Dt.x,Dt.y,0);
                        bn.unproject(h.object),
                        h.object.position.sub(bn).add(fn),
                        h.object.updateMatrixWorld(),
                        Cn = nt.radius
                    } else
                        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),
                        h.zoomToCursor = !1;
                    Cn !== null && (this.screenSpacePanning ? h.target.set(0, 0, -1).transformDirection(h.object.matrix).multiplyScalar(Cn).add(h.object.position) : (_ray.origin.copy(h.object.position),
                    _ray.direction.set(0, 0, -1).transformDirection(h.object.matrix),
                    Math.abs(h.object.up.dot(_ray.direction)) < TILT_LIMIT ? o.lookAt(h.target) : (_plane.setFromNormalAndCoplanarPoint(h.object.up, h.target),
                    _ray.intersectPlane(_plane, h.target))))
                } else
                    h.object.isOrthographicCamera && (h.object.zoom = Math.max(h.minZoom, Math.min(h.maxZoom, h.object.zoom / at)),
                    h.object.updateProjectionMatrix(),
                    wn = !0);
                return at = 1,
                Gt = !1,
                !!(wn || Tn || ur.distanceToSquared(h.object.position) > _e || 8 * (1 - pr.dot(h.object.quaternion)) > _e || Ir.distanceToSquared(h.target) > 0) && (h.dispatchEvent(_changeEvent),
                ur.copy(h.object.position),
                pr.copy(h.object.quaternion),
                Ir.copy(h.target),
                wn = !1,
                !0)
            }
        }(),
        this.stopDamping = function() {
            it.set(0, 0, 0),
            ut.set(0, 0, 0)
        }
        ,
        this.dispose = function() {
            h.domElement.removeEventListener("contextmenu", Wn),
            h.domElement.removeEventListener("pointerdown", vr),
            h.domElement.removeEventListener("pointercancel", rn),
            h.domElement.removeEventListener("wheel", hn),
            h.domElement.removeEventListener("pointermove", Zr),
            h.domElement.removeEventListener("pointerup", rn),
            h._domElementKeyEvents !== null && (h._domElementKeyEvents.removeEventListener("keydown", Nn),
            h._domElementKeyEvents = null)
        }
        ;
        const h = this
          , _ = {
            NONE: -1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_PAN: 4,
            TOUCH_DOLLY_PAN: 5,
            TOUCH_DOLLY_ROTATE: 6
        };

export default _changeEvent;
