/* Standalone Function: getSlot */

function getSlot(d, o) {
    const c = d.getGraph().listParentEdges(o).find(h => h.getParent() !== d.getRoot());
    return c ? c.getName().replace(/texture$/i, "") : ""
}

export default getSlot;
