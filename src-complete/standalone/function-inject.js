/* Standalone Function: inject */

function inject(d, o, c) {
    return d.slice(0, o).concat(c).concat(d.slice(o))
}

export default inject;
