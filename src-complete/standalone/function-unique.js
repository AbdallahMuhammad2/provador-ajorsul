/* Standalone Function: unique */

function unique(d) {
    return d.filter(function(o, c) {
        return d.indexOf(o) === c
    })
}

export default unique;
