/* Standalone Function: getWindowScrollBarX */

function getWindowScrollBarX(d) {
    return getBoundingClientRect(getDocumentElement(d)).left + getWindowScroll(d).scrollLeft
}

export default getWindowScrollBarX;
