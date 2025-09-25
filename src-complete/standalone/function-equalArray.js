/* Standalone Function: equalArray */

function equalArray(d, o) {
    return d.length === o.length && d.every(function(c, h) {
        return c === o[h]
    })
}

export default equalArray;
