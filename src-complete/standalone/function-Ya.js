/* Standalone Function: Ya */

function Ya(d, o) {
    var c = o.checked;
    return A({}, o, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: c ?? d._wrapperState.initialChecked
    })
}

export default Ya;
