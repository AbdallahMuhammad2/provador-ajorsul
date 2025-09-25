/* Standalone Class: Camera */

class Camera extends ExtensibleProperty {
    init() {
        this.propertyType = index_modern_PropertyType.CAMERA
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            type: Camera.Type.PERSPECTIVE,
            znear: .1,
            zfar: 100,
            aspectRatio: null,
            yfov: 2 * Math.PI * 50 / 360,
            xmag: 1,
            ymag: 1
        })
    }
    getType() {
        return this.get("type")
    }
    setType(o) {
        return this.set("type", o)
    }
    getZNear() {
        return this.get("znear")
    }
    setZNear(o) {
        return this.set("znear", o)
    }
    getZFar() {
        return this.get("zfar")
    }
    setZFar(o) {
        return this.set("zfar", o)
    }
    getAspectRatio() {
        return this.get("aspectRatio")
    }
    setAspectRatio(o) {
        return this.set("aspectRatio", o)
    }
    getYFov() {
        return this.get("yfov")
    }
    setYFov(o) {
        return this.set("yfov", o)
    }
    getXMag() {
        return this.get("xmag")
    }
    setXMag(o) {
        return this.set("xmag", o)
    }
    getYMag() {
        return this.get("ymag")
    }
    setYMag(o) {
        return this.set("ymag", o)
    }
}

export default Camera;
