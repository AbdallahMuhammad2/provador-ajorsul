/* Standalone Function: makeGLBFile */

function makeGLBFile(d, o) {
    const c = dom_getPaddedArrayBuffer(d)
      , h = new DataView(new ArrayBuffer(dom_GLB_CHUNK_PREFIX_BYTES));
    h.setUint32(0, c.byteLength, !0),
    h.setUint32(4, dom_GLB_CHUNK_TYPE_BIN, !0);
    const _ = dom_getPaddedArrayBuffer(new TextEncoder().encode(JSON.stringify(o || {})).buffer, 32)
      , b = new DataView(new ArrayBuffer(dom_GLB_CHUNK_PREFIX_BYTES));
    b.setUint32(0, _.byteLength, !0),
    b.setUint32(4, dom_GLB_CHUNK_TYPE_JSON, !0);
    const _e = new ArrayBuffer(dom_GLB_HEADER_BYTES)
      , nt = new DataView(_e);
    nt.setUint32(0, dom_GLB_HEADER_MAGIC, !0),
    nt.setUint32(4, dom_GLB_VERSION, !0);
    const it = dom_GLB_HEADER_BYTES + b.byteLength + _.byteLength + h.byteLength + c.byteLength;
    nt.setUint32(8, it, !0);
    const at = new Blob([_e, b, _, h, c],{
        type: "application/octet-stream"
    });
    return at.ext = "glb",
    at
}

export default makeGLBFile;
