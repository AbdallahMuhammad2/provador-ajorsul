/* Standalone Class: SpotLightHelper2 */

class SpotLightHelper2 extends ALightHelperWidget {
    constructor(o, c, h) {
        super(o),
        this.lineWidth = 5,
        this._v1 = new three_module.Pq0,
        this.color = h;
        let _ = new LineSegmentsGeometry;
        const b = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1];
        for (let _e = 0, nt = 1, it = 32; _e < it; _e++,
        nt++) {
            const at = _e / it * Math.PI * 2
              , ut = nt / it * Math.PI * 2;
            b.push(Math.cos(at), Math.sin(at), 1, Math.cos(ut), Math.sin(ut), 1)
        }
        _.setPositions(b),
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
        this.cone = new LineSegments2(_,this.material),
        this.add(this.cone),
        _ = new LineGeometry,
        _.setPositions([0, 0, 0, 0, 0, 1]),
        this.update(),
        this.traverse(_e => {
            _e.userData.__keepShadowDef = !0,
            _e.castShadow = !1,
            _e.receiveShadow = !1
        }
        )
    }
    dispose() {
        this.cone.geometry.dispose(),
        this.cone.material.dispose(),
        super.dispose()
    }
    update() {
        var o;
        if (!this.light || !this.cone)
            return;
        this.light.updateWorldMatrix(!0, !1),
        this.light.target.updateWorldMatrix(!0, !1);
        const c = this.light.distance ? this.light.distance : 1e3
          , h = c * Math.tan(this.light.angle);
        this.cone.scale.set(h, h, c),
        this._v1.setFromMatrixPosition(this.light.target.matrixWorld),
        this.cone.lookAt(this._v1),
        this.material.color.set((o = this.color) !== null && o !== void 0 ? o : this.light.color),
        this.material.linewidth = .001 * this.lineWidth
    }
    static Check(o) {
        return o.isSpotLight
    }
    static Create(o) {
        return new SpotLightHelper2(o)
    }
}

export default SpotLightHelper2;
