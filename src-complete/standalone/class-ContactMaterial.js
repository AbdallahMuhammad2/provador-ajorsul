/* Standalone Class: ContactMaterial */

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

export default ContactMaterial;
