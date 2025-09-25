/* Standalone Function: serializable */

function serializable(d) {
    return o => (o = class extends o {
        constructor() {
            super(...arguments),
            this.serializableClassId = d
        }
    }
    ,
    serializableClasses.set(d, o),
    o)
}

export default serializable;
