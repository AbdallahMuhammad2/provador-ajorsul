/* Standalone Function: db */

function db(d, o, c) {
    if (o.hasOwnProperty("value") || o.hasOwnProperty("defaultValue")) {
        var h = o.type;
        if (!(h !== "submit" && h !== "reset" || o.value !== void 0 && o.value !== null))
            return;
        o = "" + d._wrapperState.initialValue,
        c || o === d.value || (d.value = o),
        d.defaultValue = o
    }
    c = d.name,
    c !== "" && (d.name = ""),
    d.defaultChecked = !!d._wrapperState.initialChecked,
    c !== "" && (d.name = c)
}

export default db;
