/* Standalone Function: ktx_parse_modern_read */

function ktx_parse_modern_read(d) {
    const o = new Uint8Array(d.buffer,d.byteOffset,KTX2_ID.length);
    if (o[0] !== KTX2_ID[0] || o[1] !== KTX2_ID[1] || o[2] !== KTX2_ID[2] || o[3] !== KTX2_ID[3] || o[4] !== KTX2_ID[4] || o[5] !== KTX2_ID[5] || o[6] !== KTX2_ID[6] || o[7] !== KTX2_ID[7] || o[8] !== KTX2_ID[8] || o[9] !== KTX2_ID[9] || o[10] !== KTX2_ID[10] || o[11] !== KTX2_ID[11])
        throw new Error("Missing KTX 2.0 identifier.");
    const c = new KTX2Container
      , h = 17 * Uint32Array.BYTES_PER_ELEMENT
      , _ = new BufferReader(d,KTX2_ID.length,h,!0);
    c.vkFormat = _._nextUint32(),
    c.typeSize = _._nextUint32(),
    c.pixelWidth = _._nextUint32(),
    c.pixelHeight = _._nextUint32(),
    c.pixelDepth = _._nextUint32(),
    c.layerCount = _._nextUint32(),
    c.faceCount = _._nextUint32();
    const b = _._nextUint32();
    c.supercompressionScheme = _._nextUint32();
    const _e = _._nextUint32()
      , nt = _._nextUint32()
      , it = _._nextUint32()
      , at = _._nextUint32()
      , ut = _._nextUint64()
      , pt = _._nextUint64()
      , ht = 3 * b * 8
      , _t = new BufferReader(d,KTX2_ID.length + h,ht,!0);
    for (let gr = 0; gr < b; gr++)
        c.levels.push({
            levelData: new Uint8Array(d.buffer,d.byteOffset + _t._nextUint64(),_t._nextUint64()),
            uncompressedByteLength: _t._nextUint64()
        });
    const vt = new BufferReader(d,_e,nt,!0)
      , bt = {
        vendorId: vt._skip(4)._nextUint16(),
        descriptorType: vt._nextUint16(),
        versionNumber: vt._nextUint16(),
        descriptorBlockSize: vt._nextUint16(),
        colorModel: vt._nextUint8(),
        colorPrimaries: vt._nextUint8(),
        transferFunction: vt._nextUint8(),
        flags: vt._nextUint8(),
        texelBlockDimension: [vt._nextUint8(), vt._nextUint8(), vt._nextUint8(), vt._nextUint8()],
        bytesPlane: [vt._nextUint8(), vt._nextUint8(), vt._nextUint8(), vt._nextUint8(), vt._nextUint8(), vt._nextUint8(), vt._nextUint8(), vt._nextUint8()],
        samples: []
    }
      , St = (bt.descriptorBlockSize / 4 - 6) / 4;
    for (let gr = 0; gr < St; gr++) {
        const dr = {
            bitOffset: vt._nextUint16(),
            bitLength: vt._nextUint8(),
            channelType: vt._nextUint8(),
            samplePosition: [vt._nextUint8(), vt._nextUint8(), vt._nextUint8(), vt._nextUint8()],
            sampleLower: -1 / 0,
            sampleUpper: 1 / 0
        };
        dr.channelType & KHR_DF_SAMPLE_DATATYPE_SIGNED ? (dr.sampleLower = vt._nextInt32(),
        dr.sampleUpper = vt._nextInt32()) : (dr.sampleLower = vt._nextUint32(),
        dr.sampleUpper = vt._nextUint32()),
        bt.samples[gr] = dr
    }
    c.dataFormatDescriptor.length = 0,
    c.dataFormatDescriptor.push(bt);
    const At = new BufferReader(d,it,at,!0);
    for (; At._offset < at; ) {
        const gr = At._nextUint32()
          , dr = At._scan(gr)
          , cr = decodeText(dr)
          , Ar = At._scan(gr - dr.byteLength);
        c.keyValue[cr] = cr.match(/^ktx/i) ? decodeText(Ar) : Ar,
        At._offset % 4 && At._skip(4 - At._offset % 4)
    }
    if (pt <= 0)
        return c;
    const Et = new BufferReader(d,ut,pt,!0)
      , Pt = Et._nextUint16()
      , It = Et._nextUint16()
      , Dt = Et._nextUint32()
      , Gt = Et._nextUint32()
      , Bt = Et._nextUint32()
      , kt = Et._nextUint32()
      , Ut = [];
    for (let gr = 0; gr < b; gr++)
        Ut.push({
            imageFlags: Et._nextUint32(),
            rgbSliceByteOffset: Et._nextUint32(),
            rgbSliceByteLength: Et._nextUint32(),
            alphaSliceByteOffset: Et._nextUint32(),
            alphaSliceByteLength: Et._nextUint32()
        });
    const Ht = ut + Et._offset
      , Kt = Ht + Dt
      , Jt = Kt + Gt
      , or = Jt + Bt
      , ir = new Uint8Array(d.buffer,d.byteOffset + Ht,Dt)
      , lr = new Uint8Array(d.buffer,d.byteOffset + Kt,Gt)
      , ar = new Uint8Array(d.buffer,d.byteOffset + Jt,Bt)
      , hr = new Uint8Array(d.buffer,d.byteOffset + or,kt);
    return c.globalData = {
        endpointCount: Pt,
        selectorCount: It,
        imageDescs: Ut,
        endpointsData: ir,
        selectorsData: lr,
        tablesData: ar,
        extendedData: hr
    },
    c
}

export default ktx_parse_modern_read;
