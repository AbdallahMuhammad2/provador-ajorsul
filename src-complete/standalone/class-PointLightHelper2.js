/* Standalone Class: PointLightHelper2 */

class PointLightHelper2 extends ALightHelperWidget {
    constructor(o, c, h) {
        super(o),
        this.lineWidth = 5,
        this.size = .5,
        this.color = h,
        c !== void 0 && (this.size = c);
        const _ = new WireframeGeometry2(new three_module.Gu$(.5,4,2));
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
        this.lightSphere = new Wireframe(_,this.material),
        this.lightSphere.computeLineDistances(),
        this.add(this.lightSphere),
        this.update(),
        this.traverse(b => {
            b.userData.__keepShadowDef = !0,
            b.castShadow = !1,
            b.receiveShadow = !1
        }
        )
    }
    dispose() {
        this.lightSphere.geometry.dispose(),
        this.lightSphere.material.dispose(),
        super.dispose()
    }
    update() {
        var o;
        this.light && this.lightSphere && (this.material.color.set((o = this.color) !== null && o !== void 0 ? o : this.light.color),
        this.material.linewidth = .001 * this.lineWidth,
        this.lightSphere.scale.setScalar(this.size))
    }
    static Check(o) {
        return o.isPointLight
    }
    static Create(o) {
        return new PointLightHelper2(o)
    }
}

export default PointLightHelper2;
