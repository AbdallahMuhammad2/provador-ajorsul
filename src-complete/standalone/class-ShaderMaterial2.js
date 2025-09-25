/* Standalone Class: ShaderMaterial2 */

class ShaderMaterial2 extends AShaderMaterial2 {
    constructor() {
        super(...arguments),
        this.typeSlug = "shaderMat"
    }
    toJSON(o) {
        throw new Error("Method not supported for this material.")
    }
    fromJSON(o, c) {
        throw new Error("Method not supported for this material.")
    }
    copyProps(o) {
        throw new Error("Method not supported for this material.")
    }
}

export default ShaderMaterial2;
