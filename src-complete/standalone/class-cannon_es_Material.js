/* Standalone Class: cannon_es_Material */

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

export default cannon_es_Material;
