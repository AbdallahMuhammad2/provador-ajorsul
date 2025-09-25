/* Standalone Function: updateChildLookup */

function updateChildLookup(d, o) {
    d.forEach(c => {
        const h = getChildKey(c);
        o.set(h, c)
    }
    )
}

export default updateChildLookup;
