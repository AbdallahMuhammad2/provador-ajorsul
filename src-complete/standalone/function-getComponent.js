/* Standalone Function: getComponent */

function getComponent(d, o) {
    switch (o) {
    case "x":
        return d.x;
    case "y":
        return d.y;
    case "z":
        return d.z
    }
    throw new Error(`Unexpected component ${o}`)
}

export default getComponent;
