/* Standalone Function: Ta */

function Ta(d) {
    var o = d.type;
    return (d = d.nodeName) && d.toLowerCase() === "input" && (o === "checkbox" || o === "radio")
}

export default Ta;
