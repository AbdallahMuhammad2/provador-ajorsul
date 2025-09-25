/* Standalone Function: isIdentityMatrix */

function isIdentityMatrix(d) {
    return equalArray(d.elements, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
}

export default isIdentityMatrix;
