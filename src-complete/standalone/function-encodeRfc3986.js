/* Standalone Function: encodeRfc3986 */

function encodeRfc3986(d) {
    return d.replace(/[!'()*]/g, o => "%" + o.charCodeAt(0).toString(16).toUpperCase())
}

export default encodeRfc3986;
