/* Standalone Function: uiToggle */

function uiToggle(d, o) {
    return uiConfig("checkbox", {
        label: d,
        params: o
    })
}

export default uiToggle;
