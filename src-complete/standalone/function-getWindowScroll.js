/* Standalone Function: getWindowScroll */

function getWindowScroll(d) {
    var o = getWindow(d);
    return {
        scrollLeft: o.pageXOffset,
        scrollTop: o.pageYOffset
    }
}

export default getWindowScroll;
