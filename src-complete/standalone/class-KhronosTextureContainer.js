/* Standalone Class: KhronosTextureContainer */

class KhronosTextureContainer {
    constructor(o, c) {
        this.arrayBuffer = o;
        const h = new Uint8Array(this.arrayBuffer,0,12);
        if (h[0] !== 171 || h[1] !== 75 || h[2] !== 84 || h[3] !== 88 || h[4] !== 32 || h[5] !== 49 || h[6] !== 49 || h[7] !== 187 || h[8] !== 13 || h[9] !== 10 || h[10] !== 26 || h[11] !== 10)
            return void console.error("texture missing KTX identifier");
        const _ = Uint32Array.BYTES_PER_ELEMENT
          , b = new DataView(this.arrayBuffer,12,13 * _)
          , _e = b.getUint32(0, !0) === 67305985;
        this.glType = b.getUint32(1 * _, _e),
        this.glTypeSize = b.getUint32(2 * _, _e),
        this.glFormat = b.getUint32(3 * _, _e),
        this.glInternalFormat = b.getUint32(4 * _, _e),
        this.glBaseInternalFormat = b.getUint32(5 * _, _e),
        this.pixelWidth = b.getUint32(6 * _, _e),
        this.pixelHeight = b.getUint32(7 * _, _e),
        this.pixelDepth = b.getUint32(8 * _, _e),
        this.numberOfArrayElements = b.getUint32(9 * _, _e),
        this.numberOfFaces = b.getUint32(10 * _, _e),
        this.numberOfMipmapLevels = b.getUint32(11 * _, _e),
        this.bytesOfKeyValueData = b.getUint32(12 * _, _e),
        this.glType === 0 ? (this.numberOfMipmapLevels = Math.max(1, this.numberOfMipmapLevels),
        this.pixelHeight !== 0 && this.pixelDepth === 0 ? this.numberOfArrayElements === 0 ? this.numberOfFaces === c ? this.loadType = COMPRESSED_2D : console.warn("number of faces expected" + c + ", but found " + this.numberOfFaces) : console.warn("texture arrays not currently supported") : console.warn("only 2D textures currently supported")) : console.warn("only compressed formats currently supported")
    }
    mipmaps(o) {
        const c = [];
        let h = HEADER_LEN + this.bytesOfKeyValueData
          , _ = this.pixelWidth
          , b = this.pixelHeight;
        const _e = o ? this.numberOfMipmapLevels : 1;
        for (let nt = 0; nt < _e; nt++) {
            const it = new Int32Array(this.arrayBuffer,h,1)[0];
            h += 4;
            for (let at = 0; at < this.numberOfFaces; at++) {
                const ut = new Uint8Array(this.arrayBuffer,h,it);
                c.push({
                    data: ut,
                    width: _,
                    height: b
                }),
                h += it,
                h += 3 - (it + 3) % 4
            }
            _ = Math.max(1, .5 * _),
            b = Math.max(1, .5 * b)
        }
        return c
    }
}

export default KhronosTextureContainer;
