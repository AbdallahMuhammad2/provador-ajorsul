/* Standalone Function: kj */

function kj(d) {
    var o = d.stateNode;
    o.pendingContext ? ag(d, o.pendingContext, o.pendingContext !== o.context) : o.context && ag(d, o.context, !1),
    yh(d, o.containerInfo)
}

export default kj;
