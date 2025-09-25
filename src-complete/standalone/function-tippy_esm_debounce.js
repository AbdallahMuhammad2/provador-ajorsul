/* Standalone Function: tippy_esm_debounce */

function tippy_esm_debounce(d, o) {
    return o === 0 ? d : function(h) {
        clearTimeout(c),
        c = setTimeout(function() {
            d(h)
        }, o)
    }
    ;
    var c
}

export default tippy_esm_debounce;
