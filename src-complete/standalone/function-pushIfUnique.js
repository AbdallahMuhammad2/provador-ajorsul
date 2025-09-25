/* Standalone Function: pushIfUnique */

function pushIfUnique(d, o) {
    d.indexOf(o) === -1 && d.push(o)
}

export default pushIfUnique;
