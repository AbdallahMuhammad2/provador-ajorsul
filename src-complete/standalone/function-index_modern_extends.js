/* Standalone Function: index_modern_extends */

function index_modern_extends() {
    return index_modern_extends = Object.assign ? Object.assign.bind() : function(d) {
        for (var o = 1; o < arguments.length; o++) {
            var c = arguments[o];
            for (var h in c)
                ({}).hasOwnProperty.call(c, h) && (d[h] = c[h])
        }
        return d
    }
    ,
    index_modern_extends.apply(null, arguments)
}

export default index_modern_extends;
