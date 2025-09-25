/* Standalone Function: fflate_module_unzlibSync */

function fflate_module_unzlibSync(d, o) {
    return fflate_module_inflt((fflate_module_zlv(d),
    d.subarray(2, -4)), o)
}

export default fflate_module_unzlibSync;
