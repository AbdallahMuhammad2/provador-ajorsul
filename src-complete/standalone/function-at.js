/* Standalone Function: at */

function at(ut, pt) {
            nt.setXYZ(ut / 2, pt.r, pt.g, pt.b),
            it.setXYZ(ut / 2, pt.r, pt.g, pt.b)
        }
        at(0, o),
        at(2, o),
        at(4, o),
        at(6, o),
        at(8, o),
        at(10, o),
        at(12, o),
        at(14, o),
        at(16, o),
        at(18, o),
        at(20, o),
        at(22, o),
        at(24, c),
        at(26, c),
        at(28, c),
        at(30, c),
        at(32, h),
        at(34, h),
        at(36, h),
        at(38, _),
        at(40, b),
        at(42, b),
        at(44, b),
        at(46, b),
        at(48, b),
        nt.needsUpdate = !0,
        it.needsUpdate = !0
    }
    update() {
        if (!this.camera)
            return;
        const o = this.line.geometry
          , c = this.pointMap
          , {_camera: h, _vector: _} = this;
        h.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),
        setPoint("c", c, o, h, 0, 0, -1, _),
        setPoint("t", c, o, h, 0, 0, 1, _),
        setPoint("n1", c, o, h, -1, -1, -1, _),
        setPoint("n2", c, o, h, 1, -1, -1, _),
        setPoint("n3", c, o, h, -1, 1, -1, _),
        setPoint("n4", c, o, h, 1, 1, -1, _),
        setPoint("f1", c, o, h, -1, -1, 1, _),
        setPoint("f2", c, o, h, 1, -1, 1, _),
        setPoint("f3", c, o, h, -1, 1, 1, _),
        setPoint("f4", c, o, h, 1, 1, 1, _),
        setPoint("u1", c, o, h, .7, 1.1, -1, _),
        setPoint("u2", c, o, h, -.7, 1.1, -1, _),
        setPoint("u3", c, o, h, 0, 2, -1, _),
        setPoint("cf1", c, o, h, -1, 0, 1, _),
        setPoint("cf2", c, o, h, 1, 0, 1, _),
        setPoint("cf3", c, o, h, 0, -1, 1, _),
        setPoint("cf4", c, o, h, 0, 1, 1, _),
        setPoint("cn1", c, o, h, -1, 0, -1, _),
        setPoint("cn2", c, o, h, 1, 0, -1, _),
        setPoint("cn3", c, o, h, 0, -1, -1, _),
        setPoint("cn4", c, o, h, 0, 1, -1, _),
        o.getAttribute("instanceStart").needsUpdate = !0,
        o.getAttribute("instanceEnd").needsUpdate = !0,
        o.computeBoundingBox(),
        o.computeBoundingSphere()
    }
    dispose() {
        this.line.geometry.dispose(),
        this.line.material.dispose(),
        super.dispose()
    }
    static Check(o) {
        return o.isCamera
    }
    static Create(o) {
        return new CameraHelper2(o)
    }
}

export default at;
