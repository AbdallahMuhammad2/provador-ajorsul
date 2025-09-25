/* Standalone Function: ut */

function ut(pt) {
            const ht = d.canvas.getBoundingClientRect()
              , _t = new three_module.I9Y;
            return _t.x = (pt.clientX - ht.x) / ht.width * 2 - 1,
            _t.y = -(pt.clientY - ht.y) / ht.height * 2 + 1,
            _t
        }
        d.addEventListener("preFrame", () => {
            const pt = d.getPlugin(GroundPlugin)
              , ht = d.getPlugin(FrameFadePlugin);
            if (!this.enabled) {
                if (!(this.nextSteps > 0))
                    return pt && it && (pt.enableRefreshTransform = !0,
                    it = !1),
                    ht && at && (ht.enable(CannonPhysicsPlugin_1.PluginType),
                    at = !1),
                    void (this._dirty = !1);
                this.enabled = !0
            }
            if (pt && pt.enableRefreshTransform && !it && (pt.enableRefreshTransform = !1,
            it = !0),
            ht && !at && ht.disable(CannonPhysicsPlugin_1.PluginType),
            this.nextSteps > 0)
                for (let vt = 0; vt < this.stepPhysics.stepCount; vt++)
                    this._world.step(this.stepPhysics.delta);
            else
                this._world.fixedStep();
            this._dirty = !1;
            let _t = !1;
            for (const vt of this._world.bodies) {
                if (vt.mass === 0)
                    continue;
                const bt = this._bodyMeshMap.get(vt);
                if (bt && (bt.updateMatrixWorld(),
                bt.getWorldPosition(c),
                bt.getWorldQuaternion(b),
                bt.getWorldScale(h),
                c.manhattanDistanceTo(o.copy(vt.position)) > 0 && (_t = !0),
                b.angleTo(_.copy(vt.quaternion)) > 0 && (_t = !0),
                _t)) {
                    if (_e.compose(o, _, h),
                    !bt.parent)
                        throw new Error("no parent");
                    nt.copy(bt.parent.matrixWorld).invert(),
                    nt.multiply(_e),
                    nt.decompose(o, _, h),
                    bt.position.copy(o),
                    bt.quaternion.copy(_)
                }
            }
            this._dirty = _t,
            d.setDirty(),
            d.renderer.resetShadows(),
            pt == null || pt.bakeShadows(),
            this.nextSteps > 0 && (this.enabled = !1,
            this.nextSteps = 0)
        }
        ),
        d.scene.addEventListener("update", pt => {
            this._bodyMeshMap.forEach( (ht, _t) => {
                _t.velocity.set(0, 0, 0),
                _t.angularVelocity.set(0, 0, 0)
            }
            )
        }
        ),
        d.scene.addEventListener("addSceneObject", pt => {
            var ht;
            const _t = (ht = pt.object) === null || ht === void 0 ? void 0 : ht.modelObject;
            _t && _t.traverse(vt => {
                const bt = vt.uiConfig;
                bt && Array.isArray(bt.children) && !vt.isWidget && (bt.children.push({
                    type: "folder",
                    label: "Physics",
                    children: [{
                        type: "button",
                        label: "Make Body",
                        value: () => this.makeBody(vt)
                    }, {
                        type: "number",
                        label: "Mass",
                        hidden: () => !vt._physicsBody,
                        getValue: () => {
                            var St, At;
                            return (At = (St = vt._physicsBody) === null || St === void 0 ? void 0 : St.mass) !== null && At !== void 0 ? At : 0
                        }
                        ,
                        setValue: St => {
                            vt._physicsBody && (vt._physicsBody.mass = St)
                        }
                    }]
                }),
                vt.userData.physicsMass !== void 0 && this.makeBody(vt))
            }
            )
        }
        ),
        d.canvas.addEventListener("pointerdown", pt => {
            if (!this.enabled || !pt.isPrimary)
                return;
            d.getPlugin(PickingPlugin) && (d.getPlugin(PickingPlugin).enabled = !1);
            const ht = ut(pt)
              , _t = new three_module.tBo;
            _t.setFromCamera(ht, d.scene.activeCamera.cameraObject);
            const vt = _t.intersectObjects([...this._bodyMeshMap.values()], !0);
            if (!vt.length)
                return;
            let bt, St = null, At = vt[0];
            for (const It of vt) {
                for (St = It.object,
                At = It; !(St == null || St.visible && St.material); )
                    St = St.parent;
                if (St)
                    break
            }
            if (!St)
                return;
            for (; St.parent && !bt; ) {
                for (const [It,Dt] of this._bodyMeshMap.entries())
                    if (Dt === St) {
                        It.mass > 0 && (bt = It);
                        break
                    }
                St = St.parent
            }
            if (!bt)
                return;
            d.scene.activeCamera.setInteractions(!1, CannonPhysicsPlugin_1.PluginType),
            this._movementPlane.position.copy(At.point),
            this._movementPlane.lookAt(d.scene.activeCamera.cameraObject.getWorldPosition(new three_module.Pq0));
            const Et = new Vec3().copy(At.point).vsub(bt.position)
              , Pt = bt.quaternion.inverse().vmult(Et);
            this._jointBody.position.copy(At.point),
            this._jointConstraint = new PointToPointConstraint(bt,Pt,this._jointBody,new Vec3(0,0,0)),
            this._world.addConstraint(this._jointConstraint)
        }
        ),
        d.canvas.addEventListener("pointermove", pt => {
            if (!this.enabled || !pt.isPrimary || !this._jointConstraint)
                return;
            const ht = ut(pt)
              , _t = new three_module.tBo;
            _t.setFromCamera(ht, d.scene.activeCamera.cameraObject);
            const vt = _t.intersectObject(this._movementPlane);
            if (!vt.length)
                return;
            const bt = vt[0];
            this._jointBody.position.copy(bt.point),
            this._jointConstraint.update()
        }
        ),
        d.canvas.addEventListener("pointerup", pt => {
            this.enabled && pt.isPrimary && (d.getPlugin(PickingPlugin) && (d.getPlugin(PickingPlugin).enabled = !0),
            d.scene.activeCamera.setInteractions(!0, CannonPhysicsPlugin_1.PluginType),
            this._jointConstraint && (this._world.removeConstraint(this._jointConstraint),
            this._jointConstraint = void 0))
        }
        )
    }
    makeBody(d) {
        if (d.isLight || d._physicsBody)
            return;
        const o = [];
        let c = 0;
        if (d.updateMatrixWorld(),
        d.traverse(it => {
            var at;
            const ut = it;
            if (!ut.isMesh || !ut.material || !ut.visible)
                return;
            if (ut._physicsShape)
                return void o.push(ut._physicsShape);
            if (c += (at = ut.userData.physicsMass) !== null && at !== void 0 ? at : 1,
            ut.addEventListener("objectUpdate", () => {
                ut.userData.physicsMass === 0 && (this._ground.position.y = ut.position.y,
                this._bodyMeshMap.forEach( (ht, _t) => {
                    _t.velocity.set(0, 0, 0),
                    _t.angularVelocity.set(0, 0, 0),
                    _t.force.set(0, 0, 0),
                    _t.torque.set(0, 0, 0)
                }
                ))
            }
            ),
            ut.userData.physicsMass === 0)
                return;
            const pt = threeToCannon(ut, {
                type: ShapeType.HULL
            });
            pt ? (o.push([pt.shape, ut]),
            ut._physicsShape = pt.shape) : console.warn("Failed to convert mesh to cannon shape", ut)
        }
        ),
        !o.length)
            return;
        const h = new Body({
            mass: c,
            angularVelocity: new Vec3(0,0,0),
            velocity: new Vec3(0,0,0)
        })
          , _ = new three_module.Pq0
          , b = new three_module.PTz
          , _e = new three_module.Pq0
          , nt = new three_module.kn4;
        for (const [it,at] of o)
            at !== d ? (at.updateMatrixWorld(),
            nt.copy(d.matrixWorld).invert(),
            nt.multiply(at.matrixWorld),
            nt.decompose(_, b, _e),
            h.addShape(it, new Vec3(..._.toArray()), new Quaternion(...b.toArray()))) : h.addShape(it);
        h.position.set(...d.getWorldPosition(_).toArray()),
        h.quaternion.set(...d.getWorldQuaternion(b).toArray()),
        h.angularVelocity.set(0, 0, 0),
        h.velocity.set(0, 0, 0),
        d.addEventListener("objectUpdate", () => {
            h.position.set(...d.getWorldPosition(_).toArray()),
            h.quaternion.set(...d.getWorldQuaternion(b).toArray()),
            h.angularVelocity.set(0, 0, 0),
            h.velocity.set(0, 0, 0)
        }
        ),
        this._world.addBody(h),
        this._bodyMeshMap.set(h, d),
        d._physicsBody = h,
        d.setDirty({
            sceneUpdate: !0,
            updateGround: !1,
            frameFade: !1,
            refreshUi: !0
        })
    }
}

export default ut;
