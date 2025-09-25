/* Standalone Class: Vec3Pool */

class Vec3Pool extends Pool {
    constructor() {
        super(...arguments),
        this.type = Vec3
    }
    constructObject() {
        return new Vec3
    }
}

export default Vec3Pool;
