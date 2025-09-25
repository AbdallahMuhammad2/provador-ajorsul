/* Standalone Function: bk */

function bk(d, o) {
    var c = 0;
    switch (d.tag) {
    case 13:
        var h = d.stateNode
          , _ = d.memoizedState;
        _ !== null && (c = _.retryLane);
        break;
    case 19:
        h = d.stateNode;
        break;
    default:
        throw Error(p(314))
    }
    h !== null && h.delete(o),
    Yk(d, c)
}

export default bk;
