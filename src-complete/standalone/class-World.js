/* Standalone Class: World */

class World extends EventTarget {
    constructor(o) {
        o === void 0 && (o = {}),
        super(),
        this.dt = -1,
        this.allowSleep = !!o.allowSleep,
        this.contacts = [],
        this.frictionEquations = [],
        this.quatNormalizeSkip = o.quatNormalizeSkip !== void 0 ? o.quatNormalizeSkip : 0,
        this.quatNormalizeFast = o.quatNormalizeFast !== void 0 && o.quatNormalizeFast,
        this.time = 0,
        this.stepnumber = 0,
        this.default_dt = 1 / 60,
        this.nextId = 0,
        this.gravity = new Vec3,
        o.gravity && this.gravity.copy(o.gravity),
        this.broadphase = o.broadphase !== void 0 ? o.broadphase : new NaiveBroadphase,
        this.bodies = [],
        this.hasActiveBodies = !1,
        this.solver = o.solver !== void 0 ? o.solver : new GSSolver,
        this.constraints = [],
        this.narrowphase = new Narrowphase(this),
        this.collisionMatrix = new ArrayCollisionMatrix,
        this.collisionMatrixPrevious = new ArrayCollisionMatrix,
        this.bodyOverlapKeeper = new OverlapKeeper,
        this.shapeOverlapKeeper = new OverlapKeeper,
        this.contactmaterials = [],
        this.contactMaterialTable = new TupleDictionary,
        this.defaultMaterial = new cannon_es_Material("default"),
        this.defaultContactMaterial = new ContactMaterial(this.defaultMaterial,this.defaultMaterial,{
            friction: .3,
            restitution: 0
        }),
        this.doProfiling = !1,
        this.profile = {
            solve: 0,
            makeContactConstraints: 0,
            broadphase: 0,
            integrate: 0,
            narrowphase: 0
        },
        this.accumulator = 0,
        this.subsystems = [],
        this.addBodyEvent = {
            type: "addBody",
            body: null
        },
        this.removeBodyEvent = {
            type: "removeBody",
            body: null
        },
        this.idToBodyMap = {},
        this.broadphase.setWorld(this)
    }
    getContactMaterial(o, c) {
        return this.contactMaterialTable.get(o.id, c.id)
    }
    collisionMatrixTick() {
        const o = this.collisionMatrixPrevious;
        this.collisionMatrixPrevious = this.collisionMatrix,
        this.collisionMatrix = o,
        this.collisionMatrix.reset(),
        this.bodyOverlapKeeper.tick(),
        this.shapeOverlapKeeper.tick()
    }
    addConstraint(o) {
        this.constraints.push(o)
    }
    removeConstraint(o) {
        const c = this.constraints.indexOf(o);
        c !== -1 && this.constraints.splice(c, 1)
    }
    rayTest(o, c, h) {
        h instanceof RaycastResult ? this.raycastClosest(o, c, {
            skipBackfaces: !0
        }, h) : this.raycastAll(o, c, {
            skipBackfaces: !0
        }, h)
    }
    raycastAll(o, c, h, _) {
        return h === void 0 && (h = {}),
        h.mode = Ray.ALL,
        h.from = o,
        h.to = c,
        h.callback = _,
        tmpRay.intersectWorld(this, h)
    }
    raycastAny(o, c, h, _) {
        return h === void 0 && (h = {}),
        h.mode = Ray.ANY,
        h.from = o,
        h.to = c,
        h.result = _,
        tmpRay.intersectWorld(this, h)
    }
    raycastClosest(o, c, h, _) {
        return h === void 0 && (h = {}),
        h.mode = Ray.CLOSEST,
        h.from = o,
        h.to = c,
        h.result = _,
        tmpRay.intersectWorld(this, h)
    }
    addBody(o) {
        this.bodies.includes(o) || (o.index = this.bodies.length,
        this.bodies.push(o),
        o.world = this,
        o.initPosition.copy(o.position),
        o.initVelocity.copy(o.velocity),
        o.timeLastSleepy = this.time,
        o instanceof Body && (o.initAngularVelocity.copy(o.angularVelocity),
        o.initQuaternion.copy(o.quaternion)),
        this.collisionMatrix.setNumObjects(this.bodies.length),
        this.addBodyEvent.body = o,
        this.idToBodyMap[o.id] = o,
        this.dispatchEvent(this.addBodyEvent))
    }
    removeBody(o) {
        o.world = null;
        const c = this.bodies.length - 1
          , h = this.bodies
          , _ = h.indexOf(o);
        if (_ !== -1) {
            h.splice(_, 1);
            for (let b = 0; b !== h.length; b++)
                h[b].index = b;
            this.collisionMatrix.setNumObjects(c),
            this.removeBodyEvent.body = o,
            delete this.idToBodyMap[o.id],
            this.dispatchEvent(this.removeBodyEvent)
        }
    }
    getBodyById(o) {
        return this.idToBodyMap[o]
    }
    getShapeById(o) {
        const c = this.bodies;
        for (let h = 0; h < c.length; h++) {
            const _ = c[h].shapes;
            for (let b = 0; b < _.length; b++) {
                const _e = _[b];
                if (_e.id === o)
                    return _e
            }
        }
        return null
    }
    addContactMaterial(o) {
        this.contactmaterials.push(o),
        this.contactMaterialTable.set(o.materials[0].id, o.materials[1].id, o)
    }
    removeContactMaterial(o) {
        const c = this.contactmaterials.indexOf(o);
        c !== -1 && (this.contactmaterials.splice(c, 1),
        this.contactMaterialTable.delete(o.materials[0].id, o.materials[1].id))
    }
    fixedStep(o, c) {
        o === void 0 && (o = 1 / 60),
        c === void 0 && (c = 10);
        const h = cannon_es_performance.now() / 1e3;
        if (this.lastCallTime) {
            const _ = h - this.lastCallTime;
            this.step(o, _, c)
        } else
            this.step(o, void 0, c);
        this.lastCallTime = h
    }
    step(o, c, h) {
        if (h === void 0 && (h = 10),
        c === void 0)
            this.internalStep(o),
            this.time += o;
        else {
            this.accumulator += c;
            const _ = cannon_es_performance.now();
            let b = 0;
            for (; this.accumulator >= o && b < h && (this.internalStep(o),
            this.accumulator -= o,
            b++,
            !(cannon_es_performance.now() - _ > 1e3 * o)); )
                ;
            this.accumulator = this.accumulator % o;
            const _e = this.accumulator / o;
            for (let nt = 0; nt !== this.bodies.length; nt++) {
                const it = this.bodies[nt];
                it.previousPosition.lerp(it.position, _e, it.interpolatedPosition),
                it.previousQuaternion.slerp(it.quaternion, _e, it.interpolatedQuaternion),
                it.previousQuaternion.normalize()
            }
            this.time += c
        }
    }
    internalStep(o) {
        this.dt = o;
        const c = this.contacts
          , h = World_step_p1
          , _ = World_step_p2
          , b = this.bodies.length
          , _e = this.bodies
          , nt = this.solver
          , it = this.gravity
          , at = this.doProfiling
          , ut = this.profile
          , pt = Body.DYNAMIC;
        let ht = -1 / 0;
        const _t = this.constraints
          , vt = World_step_frictionEquationPool;
        it.length();
        const bt = it.x
          , St = it.y
          , At = it.z;
        let Et = 0;
        for (at && (ht = cannon_es_performance.now()),
        Et = 0; Et !== b; Et++) {
            const Jt = _e[Et];
            if (Jt.type === pt) {
                const or = Jt.force
                  , ir = Jt.mass;
                or.x += ir * bt,
                or.y += ir * St,
                or.z += ir * At
            }
        }
        for (let Jt = 0, or = this.subsystems.length; Jt !== or; Jt++)
            this.subsystems[Jt].update();
        at && (ht = cannon_es_performance.now()),
        h.length = 0,
        _.length = 0,
        this.broadphase.collisionPairs(this, h, _),
        at && (ut.broadphase = cannon_es_performance.now() - ht);
        let Pt = _t.length;
        for (Et = 0; Et !== Pt; Et++) {
            const Jt = _t[Et];
            if (!Jt.collideConnected)
                for (let or = h.length - 1; or >= 0; or -= 1)
                    (Jt.bodyA === h[or] && Jt.bodyB === _[or] || Jt.bodyB === h[or] && Jt.bodyA === _[or]) && (h.splice(or, 1),
                    _.splice(or, 1))
        }
        this.collisionMatrixTick(),
        at && (ht = cannon_es_performance.now());
        const It = World_step_oldContacts
          , Dt = c.length;
        for (Et = 0; Et !== Dt; Et++)
            It.push(c[Et]);
        c.length = 0;
        const Gt = this.frictionEquations.length;
        for (Et = 0; Et !== Gt; Et++)
            vt.push(this.frictionEquations[Et]);
        for (this.frictionEquations.length = 0,
        this.narrowphase.getContacts(h, _, this, c, It, this.frictionEquations, vt),
        at && (ut.narrowphase = cannon_es_performance.now() - ht),
        at && (ht = cannon_es_performance.now()),
        Et = 0; Et < this.frictionEquations.length; Et++)
            nt.addEquation(this.frictionEquations[Et]);
        const Bt = c.length;
        for (let Jt = 0; Jt !== Bt; Jt++) {
            const or = c[Jt]
              , ir = or.bi
              , lr = or.bj
              , ar = or.si
              , hr = or.sj;
            let gr;
            gr = ir.material && lr.material && this.getContactMaterial(ir.material, lr.material) || this.defaultContactMaterial,
            gr.friction,
            ir.material && lr.material && (ir.material.friction >= 0 && lr.material.friction >= 0 && (ir.material.friction,
            lr.material.friction),
            ir.material.restitution >= 0 && lr.material.restitution >= 0 && (or.restitution = ir.material.restitution * lr.material.restitution)),
            nt.addEquation(or),
            ir.allowSleep && ir.type === Body.DYNAMIC && ir.sleepState === Body.SLEEPING && lr.sleepState === Body.AWAKE && lr.type !== Body.STATIC && lr.velocity.lengthSquared() + lr.angularVelocity.lengthSquared() >= 2 * lr.sleepSpeedLimit ** 2 && (ir.wakeUpAfterNarrowphase = !0),
            lr.allowSleep && lr.type === Body.DYNAMIC && lr.sleepState === Body.SLEEPING && ir.sleepState === Body.AWAKE && ir.type !== Body.STATIC && ir.velocity.lengthSquared() + ir.angularVelocity.lengthSquared() >= 2 * ir.sleepSpeedLimit ** 2 && (lr.wakeUpAfterNarrowphase = !0),
            this.collisionMatrix.set(ir, lr, !0),
            this.collisionMatrixPrevious.get(ir, lr) || (World_step_collideEvent.body = lr,
            World_step_collideEvent.contact = or,
            ir.dispatchEvent(World_step_collideEvent),
            World_step_collideEvent.body = ir,
            lr.dispatchEvent(World_step_collideEvent)),
            this.bodyOverlapKeeper.set(ir.id, lr.id),
            this.shapeOverlapKeeper.set(ar.id, hr.id)
        }
        for (this.emitContactEvents(),
        at && (ut.makeContactConstraints = cannon_es_performance.now() - ht,
        ht = cannon_es_performance.now()),
        Et = 0; Et !== b; Et++) {
            const Jt = _e[Et];
            Jt.wakeUpAfterNarrowphase && (Jt.wakeUp(),
            Jt.wakeUpAfterNarrowphase = !1)
        }
        for (Pt = _t.length,
        Et = 0; Et !== Pt; Et++) {
            const Jt = _t[Et];
            Jt.update();
            for (let or = 0, ir = Jt.equations.length; or !== ir; or++) {
                const lr = Jt.equations[or];
                nt.addEquation(lr)
            }
        }
        nt.solve(o, this),
        at && (ut.solve = cannon_es_performance.now() - ht),
        nt.removeAllEquations();
        const kt = Math.pow;
        for (Et = 0; Et !== b; Et++) {
            const Jt = _e[Et];
            if (Jt.type & pt) {
                const or = kt(1 - Jt.linearDamping, o)
                  , ir = Jt.velocity;
                ir.scale(or, ir);
                const lr = Jt.angularVelocity;
                if (lr) {
                    const ar = kt(1 - Jt.angularDamping, o);
                    lr.scale(ar, lr)
                }
            }
        }
        this.dispatchEvent(World_step_preStepEvent),
        at && (ht = cannon_es_performance.now());
        const Ut = this.stepnumber % (this.quatNormalizeSkip + 1) == 0
          , Ht = this.quatNormalizeFast;
        for (Et = 0; Et !== b; Et++)
            _e[Et].integrate(o, Ut, Ht);
        this.clearForces(),
        this.broadphase.dirty = !0,
        at && (ut.integrate = cannon_es_performance.now() - ht),
        this.stepnumber += 1,
        this.dispatchEvent(World_step_postStepEvent);
        let Kt = !0;
        if (this.allowSleep)
            for (Kt = !1,
            Et = 0; Et !== b; Et++) {
                const Jt = _e[Et];
                Jt.sleepTick(this.time),
                Jt.sleepState !== Body.SLEEPING && (Kt = !0)
            }
        this.hasActiveBodies = Kt
    }
    emitContactEvents() {
        const o = this.hasAnyEventListener("beginContact")
          , c = this.hasAnyEventListener("endContact");
        if ((o || c) && this.bodyOverlapKeeper.getDiff(additions, removals),
        o) {
            for (let b = 0, _e = additions.length; b < _e; b += 2)
                beginContactEvent.bodyA = this.getBodyById(additions[b]),
                beginContactEvent.bodyB = this.getBodyById(additions[b + 1]),
                this.dispatchEvent(beginContactEvent);
            beginContactEvent.bodyA = beginContactEvent.bodyB = null
        }
        if (c) {
            for (let b = 0, _e = removals.length; b < _e; b += 2)
                endContactEvent.bodyA = this.getBodyById(removals[b]),
                endContactEvent.bodyB = this.getBodyById(removals[b + 1]),
                this.dispatchEvent(endContactEvent);
            endContactEvent.bodyA = endContactEvent.bodyB = null
        }
        additions.length = removals.length = 0;
        const h = this.hasAnyEventListener("beginShapeContact")
          , _ = this.hasAnyEventListener("endShapeContact");
        if ((h || _) && this.shapeOverlapKeeper.getDiff(additions, removals),
        h) {
            for (let b = 0, _e = additions.length; b < _e; b += 2) {
                const nt = this.getShapeById(additions[b])
                  , it = this.getShapeById(additions[b + 1]);
                beginShapeContactEvent.shapeA = nt,
                beginShapeContactEvent.shapeB = it,
                nt && (beginShapeContactEvent.bodyA = nt.body),
                it && (beginShapeContactEvent.bodyB = it.body),
                this.dispatchEvent(beginShapeContactEvent)
            }
            beginShapeContactEvent.bodyA = beginShapeContactEvent.bodyB = beginShapeContactEvent.shapeA = beginShapeContactEvent.shapeB = null
        }
        if (_) {
            for (let b = 0, _e = removals.length; b < _e; b += 2) {
                const nt = this.getShapeById(removals[b])
                  , it = this.getShapeById(removals[b + 1]);
                endShapeContactEvent.shapeA = nt,
                endShapeContactEvent.shapeB = it,
                nt && (endShapeContactEvent.bodyA = nt.body),
                it && (endShapeContactEvent.bodyB = it.body),
                this.dispatchEvent(endShapeContactEvent)
            }
            endShapeContactEvent.bodyA = endShapeContactEvent.bodyB = endShapeContactEvent.shapeA = endShapeContactEvent.shapeB = null
        }
    }
    clearForces() {
        const o = this.bodies
          , c = o.length;
        for (let h = 0; h !== c; h++) {
            const _ = o[h];
            _.force,
            _.torque,
            _.force.set(0, 0, 0),
            _.torque.set(0, 0, 0)
        }
    }
}

export default World;
