/* Standalone Function: getNodeName */

function getNodeName(d) {
    return d ? (d.nodeName || "").toLowerCase() : null
}

export default getNodeName;
