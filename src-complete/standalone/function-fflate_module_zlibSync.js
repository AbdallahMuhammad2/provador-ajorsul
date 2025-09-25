/* Standalone Function: fflate_module_zlibSync */

function fflate_module_zlibSync(d, o) {
    o || (o = {});
    var c = fflate_module_adler();
    c.p(d);
    var h = fflate_module_dopt(d, o, 2, 4);
    return fflate_module_zlh(h, o),
    fflate_module_wbytes(h, h.length - 4, c.d()),
    h
}

export default fflate_module_zlibSync;
