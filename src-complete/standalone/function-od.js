/* Standalone Function: od */

function od(d) {
    var o = d.keyCode;
    return "charCode"in d ? (d = d.charCode,
    d === 0 && o === 13 && (d = 13)) : d = o,
    d === 10 && (d = 13),
    32 <= d || d === 13 ? d : 0
}

export default od;
