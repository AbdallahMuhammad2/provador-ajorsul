/* Standalone Function: setupObject3dModel */

function setupObject3dModel(d, o) {
    return [d.modelObject, ...d.modelObject.children].forEach(c => {
        setupIModel(c, c !== d.modelObject ? d : void 0, o)
    }
    ),
    d
}

export default setupObject3dModel;
