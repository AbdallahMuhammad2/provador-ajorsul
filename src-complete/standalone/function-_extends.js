/* Standalone Function: _extends */

function _extends() {
    return _extends = Object.assign || function(d) {
        for (var o = 1; o < arguments.length; o++) {
            var c = arguments[o];
            for (var h in c)
                Object.prototype.hasOwnProperty.call(c, h) && (d[h] = c[h])
        }
        return d
    }
    ,
    _extends.apply(this, arguments)
}

export default _extends;
