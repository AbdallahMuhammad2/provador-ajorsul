/* Standalone Function: uiDropdown */

function uiDropdown(d, o, c) {
    return uiConfig("dropdown", {
        label: d,
        children: o,
        params: c
    })
}

export default uiDropdown;
