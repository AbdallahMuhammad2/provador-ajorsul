/* Standalone Class: FullScreenQuad */

class FullScreenQuad {
    constructor(o) {
        this._mesh = new three_module.eaF(_geometry,o)
    }
    dispose() {
        this._mesh.geometry.dispose()
    }
    render(o) {
        o.render(this._mesh, _camera)
    }
    get material() {
        return this._mesh.material
    }
    set material(o) {
        this._mesh.material = o
    }
}

export default FullScreenQuad;
