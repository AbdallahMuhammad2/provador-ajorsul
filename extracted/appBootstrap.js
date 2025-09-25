/* APPBOOTSTRAP */
/* Application bootstrap and initialization */
/* Lines: 141961-141974 */
/* Size: 528 characters */

Object.entries(WEBGI).forEach( ([d,o]) => {
    d !== "default" && !window[d] && (window[d] = o)
}
);
const ijVtoVersion = "0.0.24";
window.webgi = window;
const ijVtoScript = document.createElement("script");
ijVtoScript.onload = () => setupViewer();
const urlParams = new URLSearchParams(window.location.search)
  , v = urlParams.get("v") || ijVtoVersion;
ijVtoScript.src = `./0.0.24/web-vto-instore.js`;
ijVtoScript.onerror = () => alert("Failed to load web-vto script version " + v);
document.head.appendChild(ijVtoScript);
