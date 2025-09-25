/* Standalone Function: Vc */

function Vc(d) {
    var o = Wc(d.target);
    if (o !== null) {
        var c = Vb(o);
        if (c !== null) {
            if (o = c.tag,
            o === 13) {
                if (o = Wb(c),
                o !== null) {
                    d.blockedOn = o,
                    Ic(d.priority, function() {
                        Gc(c)
                    });
                    return
                }
            } else if (o === 3 && c.stateNode.current.memoizedState.isDehydrated) {
                d.blockedOn = c.tag === 3 ? c.stateNode.containerInfo : null;
                return
            }
        }
    }
    d.blockedOn = null
}

export default Vc;
