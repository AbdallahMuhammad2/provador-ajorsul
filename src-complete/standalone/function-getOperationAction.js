/* Standalone Function: getOperationAction */

function getOperationAction(d, o, c=!1) {
    switch (d) {
    case ADDITION:
        if (o === FRONT_SIDE || o === COPLANAR_ALIGNED && !c)
            return ADD_TRI;
        break;
    case SUBTRACTION:
        if (c) {
            if (o === BACK_SIDE)
                return INVERT_TRI
        } else if (o === FRONT_SIDE || o === COPLANAR_OPPOSITE)
            return ADD_TRI;
        break;
    case REVERSE_SUBTRACTION:
        if (c) {
            if (o === FRONT_SIDE || o === COPLANAR_OPPOSITE)
                return ADD_TRI
        } else if (o === BACK_SIDE)
            return INVERT_TRI;
        break;
    case DIFFERENCE:
        if (o === BACK_SIDE)
            return INVERT_TRI;
        if (o === FRONT_SIDE)
            return ADD_TRI;
        break;
    case INTERSECTION:
        if (o === BACK_SIDE || o === COPLANAR_ALIGNED && !c)
            return ADD_TRI;
        break;
    case HOLLOW_SUBTRACTION:
        if (!c && (o === FRONT_SIDE || o === COPLANAR_OPPOSITE))
            return ADD_TRI;
        break;
    case HOLLOW_INTERSECTION:
        if (!c && (o === BACK_SIDE || o === COPLANAR_ALIGNED))
            return ADD_TRI;
        break;
    default:
        throw new Error(`Unrecognized CSG operation enum "${d}".`)
    }
    return SKIP_TRI
}

export default getOperationAction;
