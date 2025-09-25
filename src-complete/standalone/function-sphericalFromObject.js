/* Standalone Function: sphericalFromObject */

function sphericalFromObject(d, o) {
    const c = d.position.clone();
    c.sub(o);
    const h = new three_module.YHV().setFromVector3(c);
    return h.makeSafe(),
    h
}

export default sphericalFromObject;
