/* Standalone Function: hh */

function hh(d, o, c, h) {
    var _ = o.interleaved;
    return _ === null ? (c.next = c,
    gh(o)) : (c.next = _.next,
    _.next = c),
    o.interleaved = c,
    ih(d, h)
}

export default hh;
