/* Standalone Function: ib */

function ib(d, o) {
    var c = Sa(o.value)
      , h = Sa(o.defaultValue);
    c != null && (c = "" + c,
    c !== d.value && (d.value = c),
    o.defaultValue == null && d.defaultValue !== c && (d.defaultValue = c)),
    h != null && (d.defaultValue = "" + h)
}

export default ib;
