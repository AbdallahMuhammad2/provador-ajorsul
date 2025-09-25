/* Standalone Function: hasOpacityCrossfade */

function hasOpacityCrossfade(d) {
    return d.animationValues && d.animationValues.opacityExit !== void 0
}

export default hasOpacityCrossfade;
