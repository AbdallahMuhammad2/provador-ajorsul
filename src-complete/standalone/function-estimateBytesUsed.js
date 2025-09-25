/* Standalone Function: estimateBytesUsed */

function estimateBytesUsed(d) {
    let o = 0;
    for (const h in d.attributes) {
        const _ = d.getAttribute(h);
        o += _.count * _.itemSize * _.array.BYTES_PER_ELEMENT
    }
    const c = d.getIndex();
    return o += c ? c.count * c.itemSize * c.array.BYTES_PER_ELEMENT : 0,
    o
}

export default estimateBytesUsed;
