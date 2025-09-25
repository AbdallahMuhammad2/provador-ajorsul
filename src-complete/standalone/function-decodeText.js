/* Standalone Function: decodeText */

function decodeText(d) {
    return typeof TextDecoder < "u" ? new TextDecoder().decode(d) : Buffer.from(d).toString("utf8")
}

export default decodeText;
