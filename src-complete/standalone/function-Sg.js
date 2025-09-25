/* Standalone Function: Sg */

function Sg(d, o, c) {
    return o = Bg(4, d.children !== null ? d.children : [], d.key, o),
    o.lanes = c,
    o.stateNode = {
        containerInfo: d.containerInfo,
        pendingChildren: null,
        implementation: d.implementation
    },
    o
}

export default Sg;
