/* Standalone Function: getMeshes */

function getMeshes(d) {
    const o = [];
    return d.traverse(function(c) {
        c.isMesh && o.push(c)
    }),
    o
}

export default getMeshes;
