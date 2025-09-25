/* Standalone Function: functions_modern_extends */

function functions_modern_extends() {
    return functions_modern_extends = Object.assign ? Object.assign.bind() : function(d) {
        for (var o = 1; o < arguments.length; o++) {
            var c = arguments[o];
            for (var h in c)
                ({}).hasOwnProperty.call(c, h) && (d[h] = c[h])
        }
        return d
    }
    ,
    functions_modern_extends.apply(null, arguments)
}

export default functions_modern_extends;
