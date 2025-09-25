/* Standalone Function: updateAttribute */

function updateAttribute(d, o, c, h, _) {
    const b = d.getAttribute(o)
      , _e = h.length / c;
    return b && b.count === _e ? (b.set(h),
    b.needsUpdate = !0) : d.setAttribute(o, new three_module.qtW(h,c)),
    b
}

export default updateAttribute;
