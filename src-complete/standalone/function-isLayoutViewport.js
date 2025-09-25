/* Standalone Function: isLayoutViewport */

function isLayoutViewport() {
    return !/^((?!chrome|android).)*safari/i.test(getUAString())
}

export default isLayoutViewport;
