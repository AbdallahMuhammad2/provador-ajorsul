/* Standalone Function: createIFrameCSS3DObject */

function createIFrameCSS3DObject(d, o, c, h) {
    const _ = document.createElement("div");
    _.style.width = o.toString() + "px",
    _.style.height = c.toString() + "px",
    _.style.backgroundColor = "transparent";
    const b = document.createElement("iframe", {
        is: "x-frame-bypass"
    });
    b.style.width = "100%",
    b.style.height = "100%",
    b.style.border = "0px";
    const _e = () => {
        var nt, it;
        try {
            b.contentWindow.name
        } catch (at) {
            (typeof at == "string" ? at : (it = (nt = at == null ? void 0 : at.toString) === null || nt === void 0 ? void 0 : nt.call(at)) !== null && it !== void 0 ? it : "").includes("cross-origin") ? console.warn("Trying to load cross-origin scripts, Install chrome extension if not able to load: https://chrome.google.com/webstore/detail/ignore-x-frame-headers/gleekbfjekiniecknbkamfmkohkpodhe") : console.error(at)
        }
        h(),
        b.removeEventListener("load", _e)
    }
    ;
    return b.addEventListener("load", _e),
    b.src = d,
    _.appendChild(b),
    new CSS3DObject(_)
}

export default createIFrameCSS3DObject;
