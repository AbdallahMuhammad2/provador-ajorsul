/* Standalone Function: addUniqueItem */

function addUniqueItem(d, o) {
    d.indexOf(o) === -1 && d.push(o)
}

export default addUniqueItem;
