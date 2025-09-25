/* Standalone Function: decode */

function decode(d) {
    return JSON.parse(atob(d.split(".")[1]))
}

export default decode;
