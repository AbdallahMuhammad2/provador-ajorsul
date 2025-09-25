/* Standalone Function: getMaterialList */

function getMaterialList(d, o) {
    let c = o;
    return Array.isArray(o) || (c = [],
    d.forEach(h => {
        c[h.materialIndex] = o
    }
    )),
    c
}

export default getMaterialList;
