/* Standalone Function: gl */

function gl(d) {
    if (d = d.current,
    !d.child)
        return null;
    switch (d.child.tag) {
    case 5:
        return d.child.stateNode;
    default:
        return d.child.stateNode
    }
}

export default gl;
