/* Standalone Constant: Rt */

const Rt = {
            toHalfFloat: Vt,
            fromHalfFloat: wt
        }
          , zt = new Er
          , nr = new mn;
        class mr {
            constructor(tt, lt, mt=!1) {
                if (Array.isArray(tt))
                    throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
                this.isBufferAttribute = !0,
                this.name = "",
                this.array = tt,
                this.itemSize = lt,
                this.count = tt !== void 0 ? tt.length / lt : 0,
                this.normalized = mt,
                this.usage = Nu,
                this.updateRange = {
                    offset: 0,
                    count: -1
                },
                this.gpuType = ss,
                this.version = 0
            }
            onUploadCallback() {}
            set needsUpdate(tt) {
                tt === !0 && this.version++
            }
            setUsage(tt) {
                return this.usage = tt,
                this
            }
            copy(tt) {
                return this.name = tt.name,
                this.array = new tt.array.constructor(tt.array),
                this.itemSize = tt.itemSize,
                this.count = tt.count,
                this.normalized = tt.normalized,
                this.usage = tt.usage,
                this.gpuType = tt.gpuType,
                this
            }
            copyAt(tt, lt, mt) {
                tt *= this.itemSize,
                mt *= lt.itemSize;
                for (let ft = 0, xt = this.itemSize; ft < xt; ft++)
                    this.array[tt + ft] = lt.array[mt + ft];
                return this
            }
            copyArray(tt) {
                return this.array.set(tt),
                this
            }
            applyMatrix3(tt) {
                if (this.itemSize === 2)
                    for (let lt = 0, mt = this.count; lt < mt; lt++)
                        nr.fromBufferAttribute(this, lt),
                        nr.applyMatrix3(tt),
                        this.setXY(lt, nr.x, nr.y);
                else if (this.itemSize === 3)
                    for (let lt = 0, mt = this.count; lt < mt; lt++)
                        zt.fromBufferAttribute(this, lt),
                        zt.applyMatrix3(tt),
                        this.setXYZ(lt, zt.x, zt.y, zt.z);
                return this
            }
            applyMatrix4(tt) {
                for (let lt = 0, mt = this.count; lt < mt; lt++)
                    zt.fromBufferAttribute(this, lt),
                    zt.applyMatrix4(tt),
                    this.setXYZ(lt, zt.x, zt.y, zt.z);
                return this
            }
            applyNormalMatrix(tt) {
                for (let lt = 0, mt = this.count; lt < mt; lt++)
                    zt.fromBufferAttribute(this, lt),
                    zt.applyNormalMatrix(tt),
                    this.setXYZ(lt, zt.x, zt.y, zt.z);
                return this
            }
            transformDirection(tt) {
                for (let lt = 0, mt = this.count; lt < mt; lt++)
                    zt.fromBufferAttribute(this, lt),
                    zt.transformDirection(tt),
                    this.setXYZ(lt, zt.x, zt.y, zt.z);
                return this
            }
            set(tt, lt=0) {
                return this.array.set(tt, lt),
                this
            }
            getComponent(tt, lt) {
                let mt = this.array[tt * this.itemSize + lt];
                return this.normalized && (mt = ws(mt, this.array)),
                mt
            }
            setComponent(tt, lt, mt) {
                return this.normalized && (mt = oo(mt, this.array)),
                this.array[tt * this.itemSize + lt] = mt,
                this
            }
            getX(tt) {
                let lt = this.array[tt * this.itemSize];
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            setX(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.array[tt * this.itemSize] = lt,
                this
            }
            getY(tt) {
                let lt = this.array[tt * this.itemSize + 1];
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            setY(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.array[tt * this.itemSize + 1] = lt,
                this
            }
            getZ(tt) {
                let lt = this.array[tt * this.itemSize + 2];
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            setZ(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.array[tt * this.itemSize + 2] = lt,
                this
            }
            getW(tt) {
                let lt = this.array[tt * this.itemSize + 3];
                return this.normalized && (lt = ws(lt, this.array)),
                lt
            }
            setW(tt, lt) {
                return this.normalized && (lt = oo(lt, this.array)),
                this.array[tt * this.itemSize + 3] = lt,
                this
            }
            setXY(tt, lt, mt) {
                return tt *= this.itemSize,
                this.normalized && (lt = oo(lt, this.array),
                mt = oo(mt, this.array)),
                this.array[tt + 0] = lt,
                this.array[tt + 1] = mt,
                this
            }
            setXYZ(tt, lt, mt, ft) {
                return tt *= this.itemSize,
                this.normalized && (lt = oo(lt, this.array),
                mt = oo(mt, this.array),
                ft = oo(ft, this.array)),
                this.array[tt + 0] = lt,
                this.array[tt + 1] = mt,
                this.array[tt + 2] = ft,
                this
            }
            setXYZW(tt, lt, mt, ft, xt) {
                return tt *= this.itemSize,
                this.normalized && (lt = oo(lt, this.array),
                mt = oo(mt, this.array),
                ft = oo(ft, this.array),
                xt = oo(xt, this.array)),
                this.array[tt + 0] = lt,
                this.array[tt + 1] = mt,
                this.array[tt + 2] = ft,
                this.array[tt + 3] = xt,
                this
            }
            onUpload(tt) {
                return this.onUploadCallback = tt,
                this
            }
            clone() {
                return new this.constructor(this.array,this.itemSize).copy(this)
            }
            toJSON() {
                const tt = {
                    itemSize: this.itemSize,
                    type: this.array.constructor.name,
                    array: Array.from(this.array),
                    normalized: this.normalized
                };

export default Rt;
