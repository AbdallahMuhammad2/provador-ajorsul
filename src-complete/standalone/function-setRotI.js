/* Standalone Function: setRotI */

function setRotI(d, o, c, h) {
    d.traverse(_ => {
        _ && (_.userData.cloneRotI = o,
        _.userData.rotationCount = c,
        _.userData.rotationAxis = h,
        _.addEventListener("beforeRender", b => objectBeforeRender(_, b.material)))
    }
    )
}

export default setRotI;
