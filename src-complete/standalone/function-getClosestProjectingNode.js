/* Standalone Function: getClosestProjectingNode */

function getClosestProjectingNode(d) {
    if (d)
        return d.options.allowProjection !== !1 ? d.projection : getClosestProjectingNode(d.parent)
}

export default getClosestProjectingNode;
