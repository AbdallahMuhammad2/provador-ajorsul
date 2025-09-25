/* Standalone Function: Yk */

function Yk(d, o) {
    o === 0 && (d.mode & 1 ? (o = sc,
    sc <<= 1,
    !(sc & 130023424) && (sc = 4194304)) : o = 1);
    var c = R();
    d = ih(d, o),
    d !== null && (Ac(d, o, c),
    Dk(d, c))
}

export default Yk;
