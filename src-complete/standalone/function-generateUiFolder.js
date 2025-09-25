/* Standalone Function: generateUiFolder */

function generateUiFolder(d, o, c={}, h="folder", _=!1) {
    return {
        type: h,
        label: d,
        children: _ ? [ () => generateUiConfig(Ee$1(o))] : generateUiConfig(Ee$1(o)),
        uuid: esm_browser_v4(),
        ...c
    }
}

export default generateUiFolder;
