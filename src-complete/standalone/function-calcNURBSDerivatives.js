/* Standalone Function: calcNURBSDerivatives */

function calcNURBSDerivatives(d, o, c, h, _) {
    return calcRationalCurveDerivatives(calcBSplineDerivatives(d, o, c, h, _))
}

export default calcNURBSDerivatives;
