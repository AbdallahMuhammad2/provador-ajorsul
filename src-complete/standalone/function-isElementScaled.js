/* Standalone Function: isElementScaled */

function isElementScaled(d) {
    var o = d.getBoundingClientRect()
      , c = round(o.width) / d.offsetWidth || 1
      , h = round(o.height) / d.offsetHeight || 1;
    return c !== 1 || h !== 1
}

export default isElementScaled;
