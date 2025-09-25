/* Standalone Function: onWindowBlur */

function onWindowBlur() {
    var d = document.activeElement;
    if (isReferenceElement(d)) {
        var o = d._tippy;
        d.blur && !o.state.isVisible && d.blur()
    }
}

export default onWindowBlur;
