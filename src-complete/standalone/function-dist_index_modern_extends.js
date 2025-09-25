/* Standalone Function: dist_index_modern_extends */

function dist_index_modern_extends() {
    return dist_index_modern_extends = Object.assign ? Object.assign.bind() : function(d) {
        for (var o = 1; o < arguments.length; o++) {
            var c = arguments[o];
            for (var h in c)
                ({}).hasOwnProperty.call(c, h) && (d[h] = c[h])
        }
        return d
    }
    ,
    dist_index_modern_extends.apply(null, arguments)
}

export default dist_index_modern_extends;
