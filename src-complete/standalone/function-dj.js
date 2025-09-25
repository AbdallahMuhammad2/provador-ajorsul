/* Standalone Function: Dj */

function Dj(d, o) {
    if (!I)
        switch (d.tailMode) {
        case "hidden":
            o = d.tail;
            for (var c = null; o !== null; )
                o.alternate !== null && (c = o),
                o = o.sibling;
            c === null ? d.tail = null : c.sibling = null;
            break;
        case "collapsed":
            c = d.tail;
            for (var h = null; c !== null; )
                c.alternate !== null && (h = c),
                c = c.sibling;
            h === null ? o || d.tail === null ? d.tail = null : d.tail.sibling = null : h.sibling = null
        }
}

export default Dj;
