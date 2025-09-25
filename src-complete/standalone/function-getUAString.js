/* Standalone Function: getUAString */

function getUAString() {
    var d = navigator.userAgentData;
    return d != null && d.brands && Array.isArray(d.brands) ? d.brands.map(function(o) {
        return o.brand + "/" + o.version
    }).join(" ") : navigator.userAgent
}

export default getUAString;
