/* Standalone Constant: vt */

const vt = {
                mimeType: _
            }
              , bt = getCanvas();
            bt.width = Math.min(b || o.width, ut.maxTextureSize),
            bt.height = Math.min(_e || o.height, ut.maxTextureSize);
            const St = bt.getContext("2d");
            if (h === !0 && (St.translate(0, bt.height),
            St.scale(1, -1)),
            o.data !== void 0) {
                c !== three_module.GWd && console.error("GLTFExporter: Only RGBAFormat is supported.", c),
                (o.width > ut.maxTextureSize || o.height > ut.maxTextureSize) && console.warn("GLTFExporter: Image size is bigger than maxTextureSize", o);
                const Et = new Uint8ClampedArray(o.height * o.width * 4);
                for (let Pt = 0; Pt < Et.length; Pt += 4)
                    Et[Pt + 0] = o.data[Pt + 0],
                    Et[Pt + 1] = o.data[Pt + 1],
                    Et[Pt + 2] = o.data[Pt + 2],
                    Et[Pt + 3] = o.data[Pt + 3];
                St.putImageData(new ImageData(Et,o.width,o.height), 0, 0)
            } else
                St.drawImage(o, 0, 0, bt.width, bt.height);
            ut.binary === !0 ? pt.push(getToBlobPromise(bt, _).then(Et => nt.processBufferViewImage(Et)).then(Et => {
                vt.bufferView = Et
            }
            )) : bt.toDataURL !== void 0 ? vt.uri = bt.toDataURL(_) : pt.push(getToBlobPromise(bt, _).then(Et => new FileReader().readAsDataURL(Et)).then(Et => {
                vt.uri = Et
            }
            ));
            const At = at.images.push(vt) - 1;
            return ht[_t] = At,
            At
        }
        throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")
    }
    processSampler(o) {
        const c = this.json;
        c.samplers || (c.samplers = []);
        const h = {
            magFilter: THREE_TO_WEBGL[o.magFilter],
            minFilter: THREE_TO_WEBGL[o.minFilter],
            wrapS: THREE_TO_WEBGL[o.wrapS],
            wrapT: THREE_TO_WEBGL[o.wrapT]
        };

export default vt;
