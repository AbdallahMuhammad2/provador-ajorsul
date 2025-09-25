/* Standalone Function: Za */

function Za(d, o) {
    var c = o.defaultValue == null ? "" : o.defaultValue
      , h = o.checked != null ? o.checked : o.defaultChecked;
    c = Sa(o.value != null ? o.value : c),
    d._wrapperState = {
        initialChecked: h,
        initialValue: c,
        controlled: o.type === "checkbox" || o.type === "radio" ? o.checked != null : o.value != null
    }
}

export default Za;
