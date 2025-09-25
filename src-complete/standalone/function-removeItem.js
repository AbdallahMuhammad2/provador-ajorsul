/* Standalone Function: removeItem */

function removeItem(d, o) {
    const c = d.indexOf(o);
    c > -1 && d.splice(c, 1)
}

export default removeItem;
