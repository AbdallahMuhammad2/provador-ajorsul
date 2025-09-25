/* Standalone Function: Ch */

function Ch(d) {
    for (var o = d; o !== null; ) {
        if (o.tag === 13) {
            var c = o.memoizedState;
            if (c !== null && (c = c.dehydrated,
            c === null || c.data === "$?" || c.data === "$!"))
                return o
        } else if (o.tag === 19 && o.memoizedProps.revealOrder !== void 0) {
            if (o.flags & 128)
                return o
        } else if (o.child !== null) {
            o.child.return = o,
            o = o.child;
            continue
        }
        if (o === d)
            break;
        for (; o.sibling === null; ) {
            if (o.return === null || o.return === d)
                return null;
            o = o.return
        }
        o.sibling.return = o.return,
        o = o.sibling
    }
    return null
}

export default Ch;
