/* Standalone Function: lh */

function lh(d, o) {
    d = d.updateQueue,
    o.updateQueue === d && (o.updateQueue = {
        baseState: d.baseState,
        firstBaseUpdate: d.firstBaseUpdate,
        lastBaseUpdate: d.lastBaseUpdate,
        shared: d.shared,
        effects: d.effects
    })
}

export default lh;
