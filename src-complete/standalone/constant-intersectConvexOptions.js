/* Standalone Constant: intersectConvexOptions */

const intersectConvexOptions = {
    faceList: [0]
}
  , worldPillarOffset = new Vec3
  , intersectHeightfield_localRay = new Ray
  , intersectHeightfield_index = []
  , Ray_intersectSphere_intersectionPoint = new Vec3
  , Ray_intersectSphere_normal = new Vec3
  , intersectConvex_normal = new Vec3;
new Vec3;
new Vec3;
const intersectConvex_vector = new Vec3
  , intersectTrimesh_normal = new Vec3
  , intersectTrimesh_localDirection = new Vec3
  , intersectTrimesh_localFrom = new Vec3
  , intersectTrimesh_localTo = new Vec3
  , intersectTrimesh_worldNormal = new Vec3
  , intersectTrimesh_worldIntersectPoint = new Vec3;
new AABB;
const intersectTrimesh_triangles = []
  , intersectTrimesh_treeTransform = new cannon_es_Transform
  , v0 = new Vec3
  , intersect = new Vec3;
function distanceFromIntersection(d, o, c) {
    c.vsub(d, v0);
    const h = v0.dot(o);
    return o.scale(h, intersect),
    intersect.vadd(d, intersect),
    c.distanceTo(intersect)
}
class Utils {
    static defaults(o, c) {
        o === void 0 && (o = {});
        for (let h in c)
            h in o || (o[h] = c[h]);
        return o
    }
}
class Constraint {
    constructor(o, c, h) {
        h === void 0 && (h = {}),
        h = Utils.defaults(h, {
            collideConnected: !0,
            wakeUpBodies: !0
        }),
        this.equations = [],
        this.bodyA = o,
        this.bodyB = c,
        this.id = Constraint.idCounter++,
        this.collideConnected = h.collideConnected,
        h.wakeUpBodies && (o && o.wakeUp(),
        c && c.wakeUp())
    }
    update() {
        throw new Error("method update() not implmemented in this Constraint subclass!")
    }
    enable() {
        const o = this.equations;
        for (let c = 0; c < o.length; c++)
            o[c].enabled = !0
    }
    disable() {
        const o = this.equations;
        for (let c = 0; c < o.length; c++)
            o[c].enabled = !1
    }
}
Constraint.idCounter = 0;
class JacobianElement {
    constructor() {
        this.spatial = new Vec3,
        this.rotational = new Vec3
    }
    multiplyElement(o) {
        return o.spatial.dot(this.spatial) + o.rotational.dot(this.rotational)
    }
    multiplyVectors(o, c) {
        return o.dot(this.spatial) + c.dot(this.rotational)
    }
}
class Equation {
    constructor(o, c, h, _) {
        h === void 0 && (h = -1e6),
        _ === void 0 && (_ = 1e6),
        this.id = Equation.idCounter++,
        this.minForce = h,
        this.maxForce = _,
        this.bi = o,
        this.bj = c,
        this.a = 0,
        this.b = 0,
        this.eps = 0,
        this.jacobianElementA = new JacobianElement,
        this.jacobianElementB = new JacobianElement,
        this.enabled = !0,
        this.multiplier = 0,
        this.setSpookParams(1e7, 4, 1 / 60)
    }
    setSpookParams(o, c, h) {
        const _ = c
          , b = o
          , _e = h;
        this.a = 4 / (_e * (1 + 4 * _)),
        this.b = 4 * _ / (1 + 4 * _),
        this.eps = 4 / (_e * _e * b * (1 + 4 * _))
    }
    computeB(o, c, h) {
        const _ = this.computeGW();
        return -this.computeGq() * o - _ * c - this.computeGiMf() * h
    }
    computeGq() {
        const o = this.jacobianElementA
          , c = this.jacobianElementB
          , h = this.bi
          , _ = this.bj
          , b = h.position
          , _e = _.position;
        return o.spatial.dot(b) + c.spatial.dot(_e)
    }
    computeGW() {
        const o = this.jacobianElementA
          , c = this.jacobianElementB
          , h = this.bi
          , _ = this.bj
          , b = h.velocity
          , _e = _.velocity
          , nt = h.angularVelocity
          , it = _.angularVelocity;
        return o.multiplyVectors(b, nt) + c.multiplyVectors(_e, it)
    }
    computeGWlambda() {
        const o = this.jacobianElementA
          , c = this.jacobianElementB
          , h = this.bi
          , _ = this.bj
          , b = h.vlambda
          , _e = _.vlambda
          , nt = h.wlambda
          , it = _.wlambda;
        return o.multiplyVectors(b, nt) + c.multiplyVectors(_e, it)
    }
    computeGiMf() {
        const o = this.jacobianElementA
          , c = this.jacobianElementB
          , h = this.bi
          , _ = this.bj
          , b = h.force
          , _e = h.torque
          , nt = _.force
          , it = _.torque
          , at = h.invMassSolve
          , ut = _.invMassSolve;
        return b.scale(at, iMfi),
        nt.scale(ut, iMfj),
        h.invInertiaWorldSolve.vmult(_e, invIi_vmult_taui),
        _.invInertiaWorldSolve.vmult(it, invIj_vmult_tauj),
        o.multiplyVectors(iMfi, invIi_vmult_taui) + c.multiplyVectors(iMfj, invIj_vmult_tauj)
    }
    computeGiMGt() {
        const o = this.jacobianElementA
          , c = this.jacobianElementB
          , h = this.bi
          , _ = this.bj
          , b = h.invMassSolve
          , _e = _.invMassSolve
          , nt = h.invInertiaWorldSolve
          , it = _.invInertiaWorldSolve;
        let at = b + _e;
        return nt.vmult(o.rotational, tmp),
        at += tmp.dot(o.rotational),
        it.vmult(c.rotational, tmp),
        at += tmp.dot(c.rotational),
        at
    }
    addToWlambda(o) {
        const c = this.jacobianElementA
          , h = this.jacobianElementB
          , _ = this.bi
          , b = this.bj
          , _e = addToWlambda_temp;
        _.vlambda.addScaledVector(_.invMassSolve * o, c.spatial, _.vlambda),
        b.vlambda.addScaledVector(b.invMassSolve * o, h.spatial, b.vlambda),
        _.invInertiaWorldSolve.vmult(c.rotational, _e),
        _.wlambda.addScaledVector(o, _e, _.wlambda),
        b.invInertiaWorldSolve.vmult(h.rotational, _e),
        b.wlambda.addScaledVector(o, _e, b.wlambda)
    }
    computeC() {
        return this.computeGiMGt() + this.eps
    }
}
Equation.idCounter = 0;
const iMfi = new Vec3
  , iMfj = new Vec3
  , invIi_vmult_taui = new Vec3
  , invIj_vmult_tauj = new Vec3
  , tmp = new Vec3
  , addToWlambda_temp = new Vec3;
class ContactEquation extends Equation {
    constructor(o, c, h) {
        h === void 0 && (h = 1e6),
        super(o, c, 0, h),
        this.restitution = 0,
        this.ri = new Vec3,
        this.rj = new Vec3,
        this.ni = new Vec3
    }
    computeB(o) {
        const c = this.a
          , h = this.b
          , _ = this.bi
          , b = this.bj
          , _e = this.ri
          , nt = this.rj
          , it = ContactEquation_computeB_temp1
          , at = ContactEquation_computeB_temp2
          , ut = _.velocity
          , pt = _.angularVelocity;
        _.force,
        _.torque;
        const ht = b.velocity
          , _t = b.angularVelocity;
        b.force,
        b.torque;
        const vt = ContactEquation_computeB_temp3
          , bt = this.jacobianElementA
          , St = this.jacobianElementB
          , At = this.ni;
        _e.cross(At, it),
        nt.cross(At, at),
        At.negate(bt.spatial),
        it.negate(bt.rotational),
        St.spatial.copy(At),
        St.rotational.copy(at),
        vt.copy(b.position),
        vt.vadd(nt, vt),
        vt.vsub(_.position, vt),
        vt.vsub(_e, vt);
        const Et = At.dot(vt)
          , Pt = this.restitution + 1;
        return -Et * c - (Pt * ht.dot(At) - Pt * ut.dot(At) + _t.dot(at) - pt.dot(it)) * h - o * this.computeGiMf()
    }
    getImpactVelocityAlongNormal() {
        const o = ContactEquation_getImpactVelocityAlongNormal_vi
          , c = ContactEquation_getImpactVelocityAlongNormal_vj
          , h = ContactEquation_getImpactVelocityAlongNormal_xi
          , _ = ContactEquation_getImpactVelocityAlongNormal_xj
          , b = ContactEquation_getImpactVelocityAlongNormal_relVel;
        return this.bi.position.vadd(this.ri, h),
        this.bj.position.vadd(this.rj, _),
        this.bi.getVelocityAtWorldPoint(h, o),
        this.bj.getVelocityAtWorldPoint(_, c),
        o.vsub(c, b),
        this.ni.dot(b)
    }
}
const ContactEquation_computeB_temp1 = new Vec3
  , ContactEquation_computeB_temp2 = new Vec3
  , ContactEquation_computeB_temp3 = new Vec3
  , ContactEquation_getImpactVelocityAlongNormal_vi = new Vec3
  , ContactEquation_getImpactVelocityAlongNormal_vj = new Vec3
  , ContactEquation_getImpactVelocityAlongNormal_xi = new Vec3
  , ContactEquation_getImpactVelocityAlongNormal_xj = new Vec3
  , ContactEquation_getImpactVelocityAlongNormal_relVel = new Vec3;
class PointToPointConstraint extends Constraint {
    constructor(o, c, h, _, b) {
        c === void 0 && (c = new Vec3),
        _ === void 0 && (_ = new Vec3),
        b === void 0 && (b = 1e6),
        super(o, h),
        this.pivotA = c.clone(),
        this.pivotB = _.clone();
        const _e = this.equationX = new ContactEquation(o,h)
          , nt = this.equationY = new ContactEquation(o,h)
          , it = this.equationZ = new ContactEquation(o,h);
        this.equations.push(_e, nt, it),
        _e.minForce = nt.minForce = it.minForce = -b,
        _e.maxForce = nt.maxForce = it.maxForce = b,
        _e.ni.set(1, 0, 0),
        nt.ni.set(0, 1, 0),
        it.ni.set(0, 0, 1)
    }
    update() {
        const o = this.bodyA
          , c = this.bodyB
          , h = this.equationX
          , _ = this.equationY
          , b = this.equationZ;
        o.quaternion.vmult(this.pivotA, h.ri),
        c.quaternion.vmult(this.pivotB, h.rj),
        _.ri.copy(h.ri),
        _.rj.copy(h.rj),
        b.ri.copy(h.ri),
        b.rj.copy(h.rj)
    }
}
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3,
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
class FrictionEquation extends Equation {
    constructor(o, c, h) {
        super(o, c, -h, h),
        this.ri = new Vec3,
        this.rj = new Vec3,
        this.t = new Vec3
    }
    computeB(o) {
        this.a;
        const c = this.b;
        this.bi,
        this.bj;
        const h = this.ri
          , _ = this.rj
          , b = FrictionEquation_computeB_temp1
          , _e = FrictionEquation_computeB_temp2
          , nt = this.t;
        h.cross(nt, b),
        _.cross(nt, _e);
        const it = this.jacobianElementA
          , at = this.jacobianElementB;
        return nt.negate(it.spatial),
        b.negate(it.rotational),
        at.spatial.copy(nt),
        at.rotational.copy(_e),
        -this.computeGW() * c - o * this.computeGiMf()
    }
}
const FrictionEquation_computeB_temp1 = new Vec3
  , FrictionEquation_computeB_temp2 = new Vec3;
class ContactMaterial {
    constructor(o, c, h) {
        h = Utils.defaults(h, {
            friction: .3,
            restitution: .3,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 3
        }),
        this.id = ContactMaterial.idCounter++,
        this.materials = [o, c],
        this.friction = h.friction,
        this.restitution = h.restitution,
        this.contactEquationStiffness = h.contactEquationStiffness,
        this.contactEquationRelaxation = h.contactEquationRelaxation,
        this.frictionEquationStiffness = h.frictionEquationStiffness,
        this.frictionEquationRelaxation = h.frictionEquationRelaxation
    }
}
ContactMaterial.idCounter = 0;
class cannon_es_Material {
    constructor(o) {
        o === void 0 && (o = {});
        let c = "";
        typeof o == "string" && (c = o,
        o = {}),
        this.name = c,
        this.id = cannon_es_Material.idCounter++,
        this.friction = o.friction !== void 0 ? o.friction : -1,
        this.restitution = o.restitution !== void 0 ? o.restitution : -1
    }
}
cannon_es_Material.idCounter = 0;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3,
new Vec3,
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Ray,
new Vec3;
new Vec3;
new Vec3;
new Vec3(1,0,0),
new Vec3(0,1,0),
new Vec3(0,0,1);
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
class Sphere extends Shape {
    constructor(o) {
        if (super({
            type: Shape.types.SPHERE
        }),
        this.radius = o !== void 0 ? o : 1,
        this.radius < 0)
            throw new Error("The sphere radius cannot be negative.");
        this.updateBoundingSphereRadius()
    }
    calculateLocalInertia(o, c) {
        c === void 0 && (c = new Vec3);
        const h = 2 * o * this.radius * this.radius / 5;
        return c.x = h,
        c.y = h,
        c.z = h,
        c
    }
    volume() {
        return 4 * Math.PI * Math.pow(this.radius, 3) / 3
    }
    updateBoundingSphereRadius() {
        this.boundingSphereRadius = this.radius
    }
    calculateWorldAABB(o, c, h, _) {
        const b = this.radius
          , _e = ["x", "y", "z"];
        for (let nt = 0; nt < _e.length; nt++) {
            const it = _e[nt];
            h[it] = o[it] - b,
            _[it] = o[it] + b
        }
    }
}
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
class Cylinder extends ConvexPolyhedron {
    constructor(o, c, h, _) {
        if (o === void 0 && (o = 1),
        c === void 0 && (c = 1),
        h === void 0 && (h = 1),
        _ === void 0 && (_ = 8),
        o < 0)
            throw new Error("The cylinder radiusTop cannot be negative.");
        if (c < 0)
            throw new Error("The cylinder radiusBottom cannot be negative.");
        const b = _
          , _e = []
          , nt = []
          , it = []
          , at = []
          , ut = []
          , pt = Math.cos
          , ht = Math.sin;
        _e.push(new Vec3(-c * ht(0),.5 * -h,c * pt(0))),
        at.push(0),
        _e.push(new Vec3(-o * ht(0),.5 * h,o * pt(0))),
        ut.push(1);
        for (let vt = 0; vt < b; vt++) {
            const bt = 2 * Math.PI / b * (vt + 1)
              , St = 2 * Math.PI / b * (vt + .5);
            vt < b - 1 ? (_e.push(new Vec3(-c * ht(bt),.5 * -h,c * pt(bt))),
            at.push(2 * vt + 2),
            _e.push(new Vec3(-o * ht(bt),.5 * h,o * pt(bt))),
            ut.push(2 * vt + 3),
            it.push([2 * vt, 2 * vt + 1, 2 * vt + 3, 2 * vt + 2])) : it.push([2 * vt, 2 * vt + 1, 1, 0]),
            (b % 2 == 1 || vt < b / 2) && nt.push(new Vec3(-ht(St),0,pt(St)))
        }
        it.push(at),
        nt.push(new Vec3(0,1,0));
        const _t = [];
        for (let vt = 0; vt < ut.length; vt++)
            _t.push(ut[ut.length - vt - 1]);
        it.push(_t),
        super({
            vertices: _e,
            faces: it,
            axes: nt
        }),
        this.type = Shape.types.CYLINDER,
        this.radiusTop = o,
        this.radiusBottom = c,
        this.height = h,
        this.numSegments = _
    }
}
class cannon_es_Plane extends Shape {
    constructor() {
        super({
            type: Shape.types.PLANE
        }),
        this.worldNormal = new Vec3,
        this.worldNormalNeedsUpdate = !0,
        this.boundingSphereRadius = Number.MAX_VALUE
    }
    computeWorldNormal(o) {
        const c = this.worldNormal;
        c.set(0, 0, 1),
        o.vmult(c, c),
        this.worldNormalNeedsUpdate = !1
    }
    calculateLocalInertia(o, c) {
        return c === void 0 && (c = new Vec3),
        c
    }
    volume() {
        return Number.MAX_VALUE
    }
    calculateWorldAABB(o, c, h, _) {
        tempNormal.set(0, 0, 1),
        c.vmult(tempNormal, tempNormal);
        const b = Number.MAX_VALUE;
        h.set(-b, -b, -b),
        _.set(b, b, b),
        tempNormal.x === 1 ? _.x = o.x : tempNormal.x === -1 && (h.x = o.x),
        tempNormal.y === 1 ? _.y = o.y : tempNormal.y === -1 && (h.y = o.y),
        tempNormal.z === 1 ? _.z = o.z : tempNormal.z === -1 && (h.z = o.z)
    }
    updateBoundingSphereRadius() {
        this.boundingSphereRadius = Number.MAX_VALUE
    }
}
const tempNormal = new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
new Vec3;
class OctreeNode {
    constructor(o) {
        o === void 0 && (o = {}),
        this.root = o.root || null,
        this.aabb = o.aabb ? o.aabb.clone() : new AABB,
        this.data = [],
        this.children = []
    }
    reset() {
        this.children.length = this.data.length = 0
    }
    insert(o, c, h) {
        h === void 0 && (h = 0);
        const _ = this.data;
        if (!this.aabb.contains(o))
            return !1;
        const b = this.children;
        if (h < (this.maxDepth || this.root.maxDepth)) {
            let _e = !1;
            b.length || (this.subdivide(),
            _e = !0);
            for (let nt = 0; nt !== 8; nt++)
                if (b[nt].insert(o, c, h + 1))
                    return !0;
            _e && (b.length = 0)
        }
        return _.push(c),
        !0
    }
    subdivide() {
        const o = this.aabb
          , c = o.lowerBound
          , h = o.upperBound
          , _ = this.children;
        _.push(new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(0,0,0)
            })
        }), new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(1,0,0)
            })
        }), new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(1,1,0)
            })
        }), new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(1,1,1)
            })
        }), new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(0,1,1)
            })
        }), new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(0,0,1)
            })
        }), new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(1,0,1)
            })
        }), new OctreeNode({
            aabb: new AABB({
                lowerBound: new Vec3(0,1,0)
            })
        })),
        h.vsub(c, halfDiagonal),
        halfDiagonal.scale(.5, halfDiagonal);
        const b = this.root || this;
        for (let _e = 0; _e !== 8; _e++) {
            const nt = _[_e];
            nt.root = b;
            const it = nt.aabb.lowerBound;
            it.x *= halfDiagonal.x,
            it.y *= halfDiagonal.y,
            it.z *= halfDiagonal.z,
            it.vadd(c, it),
            it.vadd(halfDiagonal, nt.aabb.upperBound)
        }
    }
    aabbQuery(o, c) {
        this.data,
        this.children;
        const h = [this];
        for (; h.length; ) {
            const _ = h.pop();
            _.aabb.overlaps(o) && Array.prototype.push.apply(c, _.data),
            Array.prototype.push.apply(h, _.children)
        }
        return c
    }
    rayQuery(o, c, h) {
        return o.getAABB(tmpAABB),
        tmpAABB.toLocalFrame(c, tmpAABB),
        this.aabbQuery(tmpAABB, h),
        h
    }
    removeEmptyNodes() {
        for (let o = this.children.length - 1; o >= 0; o--)
            this.children[o].removeEmptyNodes(),
            this.children[o].children.length || this.children[o].data.length || this.children.splice(o, 1)
    }
}
class Octree extends OctreeNode {
    constructor(o, c) {
        c === void 0 && (c = {}),
        super({
            root: null,
            aabb: o
        }),
        this.maxDepth = c.maxDepth !== void 0 ? c.maxDepth : 8
    }
}
const halfDiagonal = new Vec3
  , tmpAABB = new AABB;
class Trimesh extends Shape {
    constructor(o, c) {
        super({
            type: Shape.types.TRIMESH
        }),
        this.vertices = new Float32Array(o),
        this.indices = new Int16Array(c),
        this.normals = new Float32Array(c.length),
        this.aabb = new AABB,
        this.edges = null,
        this.scale = new Vec3(1,1,1),
        this.tree = new Octree,
        this.updateEdges(),
        this.updateNormals(),
        this.updateAABB(),
        this.updateBoundingSphereRadius(),
        this.updateTree()
    }
    updateTree() {
        const o = this.tree;
        o.reset(),
        o.aabb.copy(this.aabb);
        const c = this.scale;
        o.aabb.lowerBound.x *= 1 / c.x,
        o.aabb.lowerBound.y *= 1 / c.y,
        o.aabb.lowerBound.z *= 1 / c.z,
        o.aabb.upperBound.x *= 1 / c.x,
        o.aabb.upperBound.y *= 1 / c.y,
        o.aabb.upperBound.z *= 1 / c.z;
        const h = new AABB
          , _ = new Vec3
          , b = new Vec3
          , _e = new Vec3
          , nt = [_, b, _e];
        for (let it = 0; it < this.indices.length / 3; it++) {
            const at = 3 * it;
            this._getUnscaledVertex(this.indices[at], _),
            this._getUnscaledVertex(this.indices[at + 1], b),
            this._getUnscaledVertex(this.indices[at + 2], _e),
            h.setFromPoints(nt),
            o.insert(h, it)
        }
        o.removeEmptyNodes()
    }
    getTrianglesInAABB(o, c) {
        unscaledAABB.copy(o);
        const h = this.scale
          , _ = h.x
          , b = h.y
          , _e = h.z
          , nt = unscaledAABB.lowerBound
          , it = unscaledAABB.upperBound;
        return nt.x /= _,
        nt.y /= b,
        nt.z /= _e,
        it.x /= _,
        it.y /= b,
        it.z /= _e,
        this.tree.aabbQuery(unscaledAABB, c)
    }
    setScale(o) {
        const c = this.scale.x === this.scale.y && this.scale.y === this.scale.z
          , h = o.x === o.y && o.y === o.z;
        c && h || this.updateNormals(),
        this.scale.copy(o),
        this.updateAABB(),
        this.updateBoundingSphereRadius()
    }
    updateNormals() {
        const o = computeNormals_n
          , c = this.normals;
        for (let h = 0; h < this.indices.length / 3; h++) {
            const _ = 3 * h
              , b = this.indices[_]
              , _e = this.indices[_ + 1]
              , nt = this.indices[_ + 2];
            this.getVertex(b, va$1),
            this.getVertex(_e, vb$1),
            this.getVertex(nt, vc$1),
            Trimesh.computeNormal(vb$1, va$1, vc$1, o),
            c[_] = o.x,
            c[_ + 1] = o.y,
            c[_ + 2] = o.z
        }
    }
    updateEdges() {
        const o = {}
          , c = (_, b) => {
            o[_ < b ? `${_}_${b}` : `${b}_${_}`] = !0
        }
        ;
        for (let _ = 0; _ < this.indices.length / 3; _++) {
            const b = 3 * _
              , _e = this.indices[b]
              , nt = this.indices[b + 1]
              , it = this.indices[b + 2];
            c(_e, nt),
            c(nt, it),
            c(it, _e)
        }
        const h = Object.keys(o);
        this.edges = new Int16Array(2 * h.length);
        for (let _ = 0; _ < h.length; _++) {
            const b = h[_].split("_");
            this.edges[2 * _] = parseInt(b[0], 10),
            this.edges[2 * _ + 1] = parseInt(b[1], 10)
        }
    }
    getEdgeVertex(o, c, h) {
        const _ = this.edges[2 * o + (c ? 1 : 0)];
        this.getVertex(_, h)
    }
    getEdgeVector(o, c) {
        const h = getEdgeVector_va
          , _ = getEdgeVector_vb;
        this.getEdgeVertex(o, 0, h),
        this.getEdgeVertex(o, 1, _),
        _.vsub(h, c)
    }
    static computeNormal(o, c, h, _) {
        c.vsub(o, ab$1),
        h.vsub(c, cannon_es_cb),
        cannon_es_cb.cross(ab$1, _),
        _.isZero() || _.normalize()
    }
    getVertex(o, c) {
        const h = this.scale;
        return this._getUnscaledVertex(o, c),
        c.x *= h.x,
        c.y *= h.y,
        c.z *= h.z,
        c
    }
    _getUnscaledVertex(o, c) {
        const h = 3 * o
          , _ = this.vertices;
        return c.set(_[h], _[h + 1], _[h + 2])
    }
    getWorldVertex(o, c, h, _) {
        return this.getVertex(o, _),
        cannon_es_Transform.pointToWorldFrame(c, h, _, _),
        _
    }
    getTriangleVertices(o, c, h, _) {
        const b = 3 * o;
        this.getVertex(this.indices[b], c),
        this.getVertex(this.indices[b + 1], h),
        this.getVertex(this.indices[b + 2], _)
    }
    getNormal(o, c) {
        const h = 3 * o;
        return c.set(this.normals[h], this.normals[h + 1], this.normals[h + 2])
    }
    calculateLocalInertia(o, c) {
        this.computeLocalAABB(cli_aabb);
        const h = cli_aabb.upperBound.x - cli_aabb.lowerBound.x
          , _ = cli_aabb.upperBound.y - cli_aabb.lowerBound.y
          , b = cli_aabb.upperBound.z - cli_aabb.lowerBound.z;
        return c.set(1 / 12 * o * (2 * _ * 2 * _ + 2 * b * 2 * b), 1 / 12 * o * (2 * h * 2 * h + 2 * b * 2 * b), 1 / 12 * o * (2 * _ * 2 * _ + 2 * h * 2 * h))
    }
    computeLocalAABB(o) {
        const c = o.lowerBound
          , h = o.upperBound
          , _ = this.vertices.length;
        this.vertices;
        const b = computeLocalAABB_worldVert;
        this.getVertex(0, b),
        c.copy(b),
        h.copy(b);
        for (let _e = 0; _e !== _; _e++)
            this.getVertex(_e, b),
            b.x < c.x ? c.x = b.x : b.x > h.x && (h.x = b.x),
            b.y < c.y ? c.y = b.y : b.y > h.y && (h.y = b.y),
            b.z < c.z ? c.z = b.z : b.z > h.z && (h.z = b.z)
    }
    updateAABB() {
        this.computeLocalAABB(this.aabb)
    }
    updateBoundingSphereRadius() {
        let o = 0;
        const c = this.vertices
          , h = new Vec3;
        for (let _ = 0, b = c.length / 3; _ !== b; _++) {
            this.getVertex(_, h);
            const _e = h.lengthSquared();
            _e > o && (o = _e)
        }
        this.boundingSphereRadius = Math.sqrt(o)
    }
    calculateWorldAABB(o, c, h, _) {
        const b = calculateWorldAABB_frame
          , _e = calculateWorldAABB_aabb;
        b.position = o,
        b.quaternion = c,
        this.aabb.toWorldFrame(b, _e),
        h.copy(_e.lowerBound),
        _.copy(_e.upperBound)
    }
    volume() {
        return 4 * Math.PI * this.boundingSphereRadius / 3
    }
    static createTorus(o, c, h, _, b) {
        o === void 0 && (o = 1),
        c === void 0 && (c = .5),
        h === void 0 && (h = 8),
        _ === void 0 && (_ = 6),
        b === void 0 && (b = 2 * Math.PI);
        const _e = []
          , nt = [];
        for (let it = 0; it <= h; it++)
            for (let at = 0; at <= _; at++) {
                const ut = at / _ * b
                  , pt = it / h * Math.PI * 2
                  , ht = (o + c * Math.cos(pt)) * Math.cos(ut)
                  , _t = (o + c * Math.cos(pt)) * Math.sin(ut)
                  , vt = c * Math.sin(pt);
                _e.push(ht, _t, vt)
            }
        for (let it = 1; it <= h; it++)
            for (let at = 1; at <= _; at++) {
                const ut = (_ + 1) * it + at - 1
                  , pt = (_ + 1) * (it - 1) + at - 1
                  , ht = (_ + 1) * (it - 1) + at
                  , _t = (_ + 1) * it + at;
                nt.push(ut, pt, _t),
                nt.push(pt, ht, _t)
            }
        return new Trimesh(_e,nt)
    }
}
const computeNormals_n = new Vec3
  , unscaledAABB = new AABB
  , getEdgeVector_va = new Vec3
  , getEdgeVector_vb = new Vec3
  , cannon_es_cb = new Vec3
  , ab$1 = new Vec3
  , va$1 = new Vec3
  , vb$1 = new Vec3
  , vc$1 = new Vec3
  , cli_aabb = new AABB
  , computeLocalAABB_worldVert = new Vec3
  , calculateWorldAABB_frame = new cannon_es_Transform
  , calculateWorldAABB_aabb = new AABB;
class Solver {
    constructor() {
        this.equations = []
    }
    solve(o, c) {
        return 0
    }
    addEquation(o) {
        !o.enabled || o.bi.isTrigger || o.bj.isTrigger || this.equations.push(o)
    }
    removeEquation(o) {
        const c = this.equations
          , h = c.indexOf(o);
        h !== -1 && c.splice(h, 1)
    }
    removeAllEquations() {
        this.equations.length = 0
    }
}
class GSSolver extends Solver {
    constructor() {
        super(),
        this.iterations = 10,
        this.tolerance = 1e-7
    }
    solve(o, c) {
        let h = 0;
        const _ = this.iterations
          , b = this.tolerance * this.tolerance
          , _e = this.equations
          , nt = _e.length
          , it = c.bodies
          , at = it.length
          , ut = o;
        let pt, ht, _t, vt, bt, St;
        if (nt !== 0)
            for (let It = 0; It !== at; It++)
                it[It].updateSolveMassProperties();
        const At = GSSolver_solve_invCs
          , Et = GSSolver_solve_Bs
          , Pt = GSSolver_solve_lambda;
        At.length = nt,
        Et.length = nt,
        Pt.length = nt;
        for (let It = 0; It !== nt; It++) {
            const Dt = _e[It];
            Pt[It] = 0,
            Et[It] = Dt.computeB(ut),
            At[It] = 1 / Dt.computeC()
        }
        if (nt !== 0) {
            for (let Gt = 0; Gt !== at; Gt++) {
                const Bt = it[Gt]
                  , kt = Bt.vlambda
                  , Ut = Bt.wlambda;
                kt.set(0, 0, 0),
                Ut.set(0, 0, 0)
            }
            for (h = 0; h !== _; h++) {
                vt = 0;
                for (let Gt = 0; Gt !== nt; Gt++) {
                    const Bt = _e[Gt];
                    pt = Et[Gt],
                    ht = At[Gt],
                    St = Pt[Gt],
                    bt = Bt.computeGWlambda(),
                    _t = ht * (pt - bt - Bt.eps * St),
                    St + _t < Bt.minForce ? _t = Bt.minForce - St : St + _t > Bt.maxForce && (_t = Bt.maxForce - St),
                    Pt[Gt] += _t,
                    vt += _t > 0 ? _t : -_t,
                    Bt.addToWlambda(_t)
                }
                if (vt * vt < b)
                    break
            }
            for (let Gt = 0; Gt !== at; Gt++) {
                const Bt = it[Gt]
                  , kt = Bt.velocity
                  , Ut = Bt.angularVelocity;
                Bt.vlambda.vmul(Bt.linearFactor, Bt.vlambda),
                kt.vadd(Bt.vlambda, kt),
                Bt.wlambda.vmul(Bt.angularFactor, Bt.wlambda),
                Ut.vadd(Bt.wlambda, Ut)
            }
            let It = _e.length;
            const Dt = 1 / ut;
            for (; It--; )
                _e[It].multiplier = Pt[It] * Dt
        }
        return h
    }
}
const GSSolver_solve_lambda = []
  , GSSolver_solve_invCs = []
  , GSSolver_solve_Bs = [];
Body.STATIC;
class Pool {
    constructor() {
        this.objects = [],
        this.type = Object
    }
    release() {
        const o = arguments.length;
        for (let c = 0; c !== o; c++)
            this.objects.push(c < 0 || arguments.length <= c ? void 0 : arguments[c]);
        return this
    }
    get() {
        return this.objects.length === 0 ? this.constructObject() : this.objects.pop()
    }
    constructObject() {
        throw new Error("constructObject() not implemented in this Pool subclass yet!")
    }
    resize(o) {
        const c = this.objects;
        for (; c.length > o; )
            c.pop();
        for (; c.length < o; )
            c.push(this.constructObject());
        return this
    }
}
class Vec3Pool extends Pool {
    constructor() {
        super(...arguments),
        this.type = Vec3
    }
    constructObject() {
        return new Vec3
    }
}
const COLLISION_TYPES = {
    sphereSphere: Shape.types.SPHERE,
    spherePlane: Shape.types.SPHERE | Shape.types.PLANE,
    boxBox: Shape.types.BOX | Shape.types.BOX,
    sphereBox: Shape.types.SPHERE | Shape.types.BOX,
    planeBox: Shape.types.PLANE | Shape.types.BOX,
    convexConvex: Shape.types.CONVEXPOLYHEDRON,
    sphereConvex: Shape.types.SPHERE | Shape.types.CONVEXPOLYHEDRON,
    planeConvex: Shape.types.PLANE | Shape.types.CONVEXPOLYHEDRON,
    boxConvex: Shape.types.BOX | Shape.types.CONVEXPOLYHEDRON,
    sphereHeightfield: Shape.types.SPHERE | Shape.types.HEIGHTFIELD,
    boxHeightfield: Shape.types.BOX | Shape.types.HEIGHTFIELD,
    convexHeightfield: Shape.types.CONVEXPOLYHEDRON | Shape.types.HEIGHTFIELD,
    sphereParticle: Shape.types.PARTICLE | Shape.types.SPHERE,
    planeParticle: Shape.types.PLANE | Shape.types.PARTICLE,
    boxParticle: Shape.types.BOX | Shape.types.PARTICLE,
    convexParticle: Shape.types.PARTICLE | Shape.types.CONVEXPOLYHEDRON,
    cylinderCylinder: Shape.types.CYLINDER,
    sphereCylinder: Shape.types.SPHERE | Shape.types.CYLINDER,
    planeCylinder: Shape.types.PLANE | Shape.types.CYLINDER,
    boxCylinder: Shape.types.BOX | Shape.types.CYLINDER,
    convexCylinder: Shape.types.CONVEXPOLYHEDRON | Shape.types.CYLINDER,
    heightfieldCylinder: Shape.types.HEIGHTFIELD | Shape.types.CYLINDER,
    particleCylinder: Shape.types.PARTICLE | Shape.types.CYLINDER,
    sphereTrimesh: Shape.types.SPHERE | Shape.types.TRIMESH,
    planeTrimesh: Shape.types.PLANE | Shape.types.TRIMESH
};

export default intersectConvexOptions;
