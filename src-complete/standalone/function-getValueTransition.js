/* Standalone Function: getValueTransition */

function getValueTransition(d, o) {
    return d[o] || d.default || d
}

export default getValueTransition;
