/* Standalone Function: joinGroups */

function joinGroups(d) {
    for (let o = 0; o < d.length - 1; o++) {
        const c = d[o]
          , h = d[o + 1];
        if (c.materialIndex === h.materialIndex) {
            const _ = c.start
              , b = h.start + h.count;
            h.start = _,
            h.count = b - _,
            d.splice(o, 1),
            o--
        }
    }
}

export default joinGroups;
