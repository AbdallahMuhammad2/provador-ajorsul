/* Standalone Class: MaterialCreator */

class MaterialCreator {
    constructor(o="", c={}) {
        this.baseUrl = o,
        this.options = c,
        this.materialsInfo = {},
        this.materials = {},
        this.materialsArray = [],
        this.nameLookup = {},
        this.crossOrigin = "anonymous",
        this.side = this.options.side !== void 0 ? this.options.side : three_module.hB5,
        this.wrap = this.options.wrap !== void 0 ? this.options.wrap : three_module.GJx
    }
    setCrossOrigin(o) {
        return this.crossOrigin = o,
        this
    }
    setManager(o) {
        this.manager = o
    }
    setMaterials(o) {
        this.materialsInfo = this.convert(o),
        this.materials = {},
        this.materialsArray = [],
        this.nameLookup = {}
    }
    convert(o) {
        if (!this.options)
            return o;
        const c = {};
        for (const h in o) {
            const _ = o[h]
              , b = {};
            c[h] = b;
            for (const _e in _) {
                let nt = !0
                  , it = _[_e];
                const at = _e.toLowerCase();
                switch (at) {
                case "kd":
                case "ka":
                case "ks":
                    this.options && this.options.normalizeRGB && (it = [it[0] / 255, it[1] / 255, it[2] / 255]),
                    this.options && this.options.ignoreZeroRGBs && it[0] === 0 && it[1] === 0 && it[2] === 0 && (nt = !1)
                }
                nt && (b[at] = it)
            }
        }
        return c
    }
    async preload() {
        for (const o in this.materialsInfo)
            await this.create(o)
    }
    getIndex(o) {
        return this.nameLookup[o]
    }
    async getAsArray() {
        let o = 0;
        for (const c in this.materialsInfo)
            this.materialsArray[o] = await this.create(c),
            this.nameLookup[c] = o,
            o++;
        return this.materialsArray
    }
    async create(o) {
        return this.materials[o] === void 0 && await this.createMaterial_(o),
        this.materials[o]
    }
    async createMaterial_(o) {
        const c = this
          , h = this.materialsInfo[o]
          , _ = {
            name: o,
            side: this.side
        };
        async function b(it, at) {
            if (_[it])
                return;
            const ut = c.getTextureParams(at, _);
            return new Promise( (pt, ht) => {
                let _t = !1
                  , vt = () => !_t && (_t = !0) && pt();
                const bt = c.loadTexture((St = c.baseUrl,
                typeof (At = ut.url) != "string" || At === "" ? "" : /^https?:\/\//i.test(At) ? At : St + At), void 0, Et => {
                    _[it] = Et,
                    vt()
                }
                , void 0, vt);
                var St, At;
                setTimeout(vt, 50),
                bt.repeat.copy(ut.scale),
                bt.offset.copy(ut.offset),
                bt.wrapS = c.wrap,
                bt.wrapT = c.wrap,
                it !== "map" && it !== "emissiveMap" || (bt.colorSpace = three_module.er$)
            }
            )
        }
        const _e = Array.from(Object.keys(h || {}));
        let nt = _e.includes("d") || _e.includes("D");
        for (const it of _e) {
            const at = h[it];
            let ut;
            if (at !== "")
                switch (it.toLowerCase()) {
                case "kd":
                    _.color = new three_module.Q1f().fromArray(at).convertSRGBToLinear();
                    break;
                case "ks":
                    _.specular = new three_module.Q1f().fromArray(at).convertSRGBToLinear();
                    break;
                case "ke":
                    _.emissive = new three_module.Q1f().fromArray(at).convertSRGBToLinear();
                    break;
                case "map_kd":
                    await b("map", at);
                    break;
                case "map_ks":
                    await b("specularMap", at);
                    break;
                case "map_ke":
                    await b("emissiveMap", at);
                    break;
                case "norm":
                    await b("normalMap", at);
                    break;
                case "map_bump":
                case "bump":
                    await b("bumpMap", at);
                    break;
                case "map_d":
                    await b("alphaMap", at),
                    _.transparent = !0;
                    break;
                case "ns":
                    _.shininess = parseFloat(at);
                    break;
                case "d":
                    ut = parseFloat(at),
                    ut < 1 && (_.opacity = ut,
                    _.transparent = !0);
                    break;
                case "tr":
                    if (nt)
                        break;
                    ut = parseFloat(at),
                    this.options && this.options.invertTrProperty && (ut = 1 - ut),
                    ut > 0 && (_.opacity = 1 - ut,
                    _.transparent = !0)
                }
        }
        return this.materials[o] = new three_module.tXL(_),
        this.materials[o]
    }
    getTextureParams(o, c) {
        const h = {
            scale: new three_module.I9Y(1,1),
            offset: new three_module.I9Y(0,0)
        }
          , _ = o.split(/\s+/);
        let b;
        return b = _.indexOf("-bm"),
        b >= 0 && (c.bumpScale = parseFloat(_[b + 1]),
        _.splice(b, 2)),
        b = _.indexOf("-s"),
        b >= 0 && (h.scale.set(parseFloat(_[b + 1]), parseFloat(_[b + 2])),
        _.splice(b, 4)),
        b = _.indexOf("-o"),
        b >= 0 && (h.offset.set(parseFloat(_[b + 1]), parseFloat(_[b + 2])),
        _.splice(b, 4)),
        h.url = _.join(" ").trim(),
        h
    }
    loadTexture(o, c, h, _, b) {
        const _e = this.manager !== void 0 ? this.manager : three_module.h_9;
        let nt = _e.getHandler(o);
        nt === null && (nt = new three_module.Tap(_e)),
        nt.setCrossOrigin && nt.setCrossOrigin(this.crossOrigin);
        const it = nt.load(o, h, _, b);
        return c !== void 0 && (it.mapping = c),
        it
    }
}

export default MaterialCreator;
