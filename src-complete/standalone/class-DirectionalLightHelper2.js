/* Standalone Class: DirectionalLightHelper2 */

class DirectionalLightHelper2 extends ALightHelperWidget {
    constructor(o, c, h) {
        super(o),
        this.lineWidth = 5,
        this.size = .5,
        this._v1 = new three_module.Pq0,
        this._v2 = new three_module.Pq0,
        this._v3 = new three_module.Pq0,
        this.color = h,
        c !== void 0 && (this.size = c);
        let _ = new LineGeometry;
        this.material = new LineMaterial({
            color: 16711680,
            linewidth: .005,
            vertexColors: !1,
            dashed: !1,
            alphaToCoverage: !0,
            toneMapped: !1,
            transparent: !0,
            depthTest: !1,
            depthWrite: !1
        }),
        this.lightPlane = new Line2(_,this.material),
        this.add(this.lightPlane),
        _ = new LineGeometry,
        _.setPositions([0, 0, 0, 0, 0, 1]),
        this.targetLine = new Line2(_,this.material),
        this.add(this.targetLine),
        this.update(),
        this.traverse(b => {
            b.userData.__keepShadowDef = !0,
            b.castShadow = !1,
            b.receiveShadow = !1
        }
        )
    }
    dispose() {
        this.lightPlane.geometry.dispose(),
        this.lightPlane.material.dispose(),
        this.targetLine.geometry.dispose(),
        this.targetLine.material.dispose(),
        super.dispose()
    }
    update() {
        var o;
        this.light && this.lightPlane && (this._v1.setFromMatrixPosition(this.light.matrixWorld),
        this._v2.setFromMatrixPosition(this.light.target.matrixWorld),
        this._v3.subVectors(this._v2, this._v1),
        this.lightPlane.geometry.setPositions([-this.size, this.size, 0, this.size, this.size, 0, this.size, -this.size, 0, -this.size, -this.size, 0, -this.size, this.size, 0]),
        this.lightPlane.lookAt(this._v2),
        this.lightPlane.material = this.material,
        this.targetLine.material = this.material,
        this.material.color.set((o = this.color) !== null && o !== void 0 ? o : this.light.color),
        this.material.linewidth = .001 * this.lineWidth,
        this.targetLine.lookAt(this._v2),
        this.targetLine.scale.z = this.light.intensity / 3)
    }
    static Check(o) {
        return o.isDirectionalLight
    }
    static Create(o) {
        return new DirectionalLightHelper2(o)
    }
}

export default DirectionalLightHelper2;
