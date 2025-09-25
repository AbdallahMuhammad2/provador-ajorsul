/* Standalone Class: Body */

class Body extends EventTarget {
    constructor(o) {
        o === void 0 && (o = {}),
        super(),
        this.id = Body.idCounter++,
        this.index = -1,
        this.world = null,
        this.vlambda = new Vec3,
        this.collisionFilterGroup = typeof o.collisionFilterGroup == "number" ? o.collisionFilterGroup : 1,
        this.collisionFilterMask = typeof o.collisionFilterMask == "number" ? o.collisionFilterMask : -1,
        this.collisionResponse = typeof o.collisionResponse != "boolean" || o.collisionResponse,
        this.position = new Vec3,
        this.previousPosition = new Vec3,
        this.interpolatedPosition = new Vec3,
        this.initPosition = new Vec3,
        o.position && (this.position.copy(o.position),
        this.previousPosition.copy(o.position),
        this.interpolatedPosition.copy(o.position),
        this.initPosition.copy(o.position)),
        this.velocity = new Vec3,
        o.velocity && this.velocity.copy(o.velocity),
        this.initVelocity = new Vec3,
        this.force = new Vec3;
        const c = typeof o.mass == "number" ? o.mass : 0;
        this.mass = c,
        this.invMass = c > 0 ? 1 / c : 0,
        this.material = o.material || null,
        this.linearDamping = typeof o.linearDamping == "number" ? o.linearDamping : .01,
        this.type = c <= 0 ? Body.STATIC : Body.DYNAMIC,
        typeof o.type == typeof Body.STATIC && (this.type = o.type),
        this.allowSleep = o.allowSleep === void 0 || o.allowSleep,
        this.sleepState = Body.AWAKE,
        this.sleepSpeedLimit = o.sleepSpeedLimit !== void 0 ? o.sleepSpeedLimit : .1,
        this.sleepTimeLimit = o.sleepTimeLimit !== void 0 ? o.sleepTimeLimit : 1,
        this.timeLastSleepy = 0,
        this.wakeUpAfterNarrowphase = !1,
        this.torque = new Vec3,
        this.quaternion = new Quaternion,
        this.initQuaternion = new Quaternion,
        this.previousQuaternion = new Quaternion,
        this.interpolatedQuaternion = new Quaternion,
        o.quaternion && (this.quaternion.copy(o.quaternion),
        this.initQuaternion.copy(o.quaternion),
        this.previousQuaternion.copy(o.quaternion),
        this.interpolatedQuaternion.copy(o.quaternion)),
        this.angularVelocity = new Vec3,
        o.angularVelocity && this.angularVelocity.copy(o.angularVelocity),
        this.initAngularVelocity = new Vec3,
        this.shapes = [],
        this.shapeOffsets = [],
        this.shapeOrientations = [],
        this.inertia = new Vec3,
        this.invInertia = new Vec3,
        this.invInertiaWorld = new Mat3,
        this.invMassSolve = 0,
        this.invInertiaSolve = new Vec3,
        this.invInertiaWorldSolve = new Mat3,
        this.fixedRotation = o.fixedRotation !== void 0 && o.fixedRotation,
        this.angularDamping = o.angularDamping !== void 0 ? o.angularDamping : .01,
        this.linearFactor = new Vec3(1,1,1),
        o.linearFactor && this.linearFactor.copy(o.linearFactor),
        this.angularFactor = new Vec3(1,1,1),
        o.angularFactor && this.angularFactor.copy(o.angularFactor),
        this.aabb = new AABB,
        this.aabbNeedsUpdate = !0,
        this.boundingRadius = 0,
        this.wlambda = new Vec3,
        this.isTrigger = !!o.isTrigger,
        o.shape && this.addShape(o.shape),
        this.updateMassProperties()
    }
    wakeUp() {
        const o = this.sleepState;
        this.sleepState = Body.AWAKE,
        this.wakeUpAfterNarrowphase = !1,
        o === Body.SLEEPING && this.dispatchEvent(Body.wakeupEvent)
    }
    sleep() {
        this.sleepState = Body.SLEEPING,
        this.velocity.set(0, 0, 0),
        this.angularVelocity.set(0, 0, 0),
        this.wakeUpAfterNarrowphase = !1
    }
    sleepTick(o) {
        if (this.allowSleep) {
            const c = this.sleepState
              , h = this.velocity.lengthSquared() + this.angularVelocity.lengthSquared()
              , _ = this.sleepSpeedLimit ** 2;
            c === Body.AWAKE && h < _ ? (this.sleepState = Body.SLEEPY,
            this.timeLastSleepy = o,
            this.dispatchEvent(Body.sleepyEvent)) : c === Body.SLEEPY && h > _ ? this.wakeUp() : c === Body.SLEEPY && o - this.timeLastSleepy > this.sleepTimeLimit && (this.sleep(),
            this.dispatchEvent(Body.sleepEvent))
        }
    }
    updateSolveMassProperties() {
        this.sleepState === Body.SLEEPING || this.type === Body.KINEMATIC ? (this.invMassSolve = 0,
        this.invInertiaSolve.setZero(),
        this.invInertiaWorldSolve.setZero()) : (this.invMassSolve = this.invMass,
        this.invInertiaSolve.copy(this.invInertia),
        this.invInertiaWorldSolve.copy(this.invInertiaWorld))
    }
    pointToLocalFrame(o, c) {
        return c === void 0 && (c = new Vec3),
        o.vsub(this.position, c),
        this.quaternion.conjugate().vmult(c, c),
        c
    }
    vectorToLocalFrame(o, c) {
        return c === void 0 && (c = new Vec3),
        this.quaternion.conjugate().vmult(o, c),
        c
    }
    pointToWorldFrame(o, c) {
        return c === void 0 && (c = new Vec3),
        this.quaternion.vmult(o, c),
        c.vadd(this.position, c),
        c
    }
    vectorToWorldFrame(o, c) {
        return c === void 0 && (c = new Vec3),
        this.quaternion.vmult(o, c),
        c
    }
    addShape(o, c, h) {
        const _ = new Vec3
          , b = new Quaternion;
        return c && _.copy(c),
        h && b.copy(h),
        this.shapes.push(o),
        this.shapeOffsets.push(_),
        this.shapeOrientations.push(b),
        this.updateMassProperties(),
        this.updateBoundingRadius(),
        this.aabbNeedsUpdate = !0,
        o.body = this,
        this
    }
    removeShape(o) {
        const c = this.shapes.indexOf(o);
        return c === -1 ? (console.warn("Shape does not belong to the body"),
        this) : (this.shapes.splice(c, 1),
        this.shapeOffsets.splice(c, 1),
        this.shapeOrientations.splice(c, 1),
        this.updateMassProperties(),
        this.updateBoundingRadius(),
        this.aabbNeedsUpdate = !0,
        o.body = null,
        this)
    }
    updateBoundingRadius() {
        const o = this.shapes
          , c = this.shapeOffsets
          , h = o.length;
        let _ = 0;
        for (let b = 0; b !== h; b++) {
            const _e = o[b];
            _e.updateBoundingSphereRadius();
            const nt = c[b].length()
              , it = _e.boundingSphereRadius;
            nt + it > _ && (_ = nt + it)
        }
        this.boundingRadius = _
    }
    updateAABB() {
        const o = this.shapes
          , c = this.shapeOffsets
          , h = this.shapeOrientations
          , _ = o.length
          , b = tmpVec
          , _e = tmpQuat
          , nt = this.quaternion
          , it = this.aabb
          , at = updateAABB_shapeAABB;
        for (let ut = 0; ut !== _; ut++) {
            const pt = o[ut];
            nt.vmult(c[ut], b),
            b.vadd(this.position, b),
            nt.mult(h[ut], _e),
            pt.calculateWorldAABB(b, _e, at.lowerBound, at.upperBound),
            ut === 0 ? it.copy(at) : it.extend(at)
        }
        this.aabbNeedsUpdate = !1
    }
    updateInertiaWorld(o) {
        const c = this.invInertia;
        if (c.x !== c.y || c.y !== c.z || o) {
            const h = uiw_m1
              , _ = uiw_m2;
            h.setRotationFromQuaternion(this.quaternion),
            h.transpose(_),
            h.scale(c, h),
            h.mmult(_, this.invInertiaWorld)
        }
    }
    applyForce(o, c) {
        if (c === void 0 && (c = new Vec3),
        this.type !== Body.DYNAMIC)
            return;
        this.sleepState === Body.SLEEPING && this.wakeUp();
        const h = Body_applyForce_rotForce;
        c.cross(o, h),
        this.force.vadd(o, this.force),
        this.torque.vadd(h, this.torque)
    }
    applyLocalForce(o, c) {
        if (c === void 0 && (c = new Vec3),
        this.type !== Body.DYNAMIC)
            return;
        const h = Body_applyLocalForce_worldForce
          , _ = Body_applyLocalForce_relativePointWorld;
        this.vectorToWorldFrame(o, h),
        this.vectorToWorldFrame(c, _),
        this.applyForce(h, _)
    }
    applyTorque(o) {
        this.type === Body.DYNAMIC && (this.sleepState === Body.SLEEPING && this.wakeUp(),
        this.torque.vadd(o, this.torque))
    }
    applyImpulse(o, c) {
        if (c === void 0 && (c = new Vec3),
        this.type !== Body.DYNAMIC)
            return;
        this.sleepState === Body.SLEEPING && this.wakeUp();
        const h = c
          , _ = Body_applyImpulse_velo;
        _.copy(o),
        _.scale(this.invMass, _),
        this.velocity.vadd(_, this.velocity);
        const b = Body_applyImpulse_rotVelo;
        h.cross(o, b),
        this.invInertiaWorld.vmult(b, b),
        this.angularVelocity.vadd(b, this.angularVelocity)
    }
    applyLocalImpulse(o, c) {
        if (c === void 0 && (c = new Vec3),
        this.type !== Body.DYNAMIC)
            return;
        const h = Body_applyLocalImpulse_worldImpulse
          , _ = Body_applyLocalImpulse_relativePoint;
        this.vectorToWorldFrame(o, h),
        this.vectorToWorldFrame(c, _),
        this.applyImpulse(h, _)
    }
    updateMassProperties() {
        const o = Body_updateMassProperties_halfExtents;
        this.invMass = this.mass > 0 ? 1 / this.mass : 0;
        const c = this.inertia
          , h = this.fixedRotation;
        this.updateAABB(),
        o.set((this.aabb.upperBound.x - this.aabb.lowerBound.x) / 2, (this.aabb.upperBound.y - this.aabb.lowerBound.y) / 2, (this.aabb.upperBound.z - this.aabb.lowerBound.z) / 2),
        Box.calculateInertia(o, this.mass, c),
        this.invInertia.set(c.x > 0 && !h ? 1 / c.x : 0, c.y > 0 && !h ? 1 / c.y : 0, c.z > 0 && !h ? 1 / c.z : 0),
        this.updateInertiaWorld(!0)
    }
    getVelocityAtWorldPoint(o, c) {
        const h = new Vec3;
        return o.vsub(this.position, h),
        this.angularVelocity.cross(h, c),
        this.velocity.vadd(c, c),
        c
    }
    integrate(o, c, h) {
        if (this.previousPosition.copy(this.position),
        this.previousQuaternion.copy(this.quaternion),
        this.type !== Body.DYNAMIC && this.type !== Body.KINEMATIC || this.sleepState === Body.SLEEPING)
            return;
        const _ = this.velocity
          , b = this.angularVelocity
          , _e = this.position
          , nt = this.force
          , it = this.torque
          , at = this.quaternion
          , ut = this.invMass
          , pt = this.invInertiaWorld
          , ht = this.linearFactor
          , _t = ut * o;
        _.x += nt.x * _t * ht.x,
        _.y += nt.y * _t * ht.y,
        _.z += nt.z * _t * ht.z;
        const vt = pt.elements
          , bt = this.angularFactor
          , St = it.x * bt.x
          , At = it.y * bt.y
          , Et = it.z * bt.z;
        b.x += o * (vt[0] * St + vt[1] * At + vt[2] * Et),
        b.y += o * (vt[3] * St + vt[4] * At + vt[5] * Et),
        b.z += o * (vt[6] * St + vt[7] * At + vt[8] * Et),
        _e.x += _.x * o,
        _e.y += _.y * o,
        _e.z += _.z * o,
        at.integrate(this.angularVelocity, o, this.angularFactor, at),
        c && (h ? at.normalizeFast() : at.normalize()),
        this.aabbNeedsUpdate = !0,
        this.updateInertiaWorld()
    }
}

export default Body;
