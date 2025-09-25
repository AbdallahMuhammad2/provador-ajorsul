/* Standalone Function: rectToClientRect */

function rectToClientRect(d) {
    return Object.assign({}, d, {
        left: d.x,
        top: d.y,
        right: d.x + d.width,
        bottom: d.y + d.height
    })
}

export default rectToClientRect;
