/* Standalone Class: CanvasSnipper */

class CanvasSnipper {
    static async GetClonedCanvas(o, {rect: c={
        x: 0,
        y: 0,
        width: o.width,
        height: o.height,
        assumeClientRect: !1,
        normalized: !1
    }, displayPixelRatio: h=1, scale: _=1}) {
        var b, _e, nt;
        c = {
            ...c
        };
        const it = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
        c.normalized ? (c.x = Math.floor(c.x * o.width),
        c.y = Math.floor(c.y * o.height),
        c.width = Math.floor(c.width * o.width),
        c.height = Math.floor(c.height * o.height),
        c.assumeClientRect && console.warn("CanvasSnipper: rect.assumeClientRect is ignored when rect is normalized")) : c.assumeClientRect && (c.x = Math.floor(c.x * o.width / (h * o.clientWidth)),
        c.y = Math.floor(c.y * o.height / (h * o.clientHeight)),
        c.width = Math.floor(c.width * o.width / (h * o.clientWidth)),
        c.height = Math.floor(c.height * o.height / (h * o.clientHeight))),
        it.width = Math.floor(c.width * _ * h),
        it.height = Math.floor(c.height * _ * h);
        const at = it.getContext("2d");
        if (!at)
            return console.error("snapshot: cannot create context"),
            it;
        const ut = o.style.background || ((b = o.parentElement) === null || b === void 0 ? void 0 : b.style.background) || "";
        if (ut.includes("url")) {
            const pt = (_e = /url\("(.*)"\)/gi.exec(ut)) === null || _e === void 0 ? void 0 : _e[1];
            if (pt) {
                const ht = new Image;
                ht.src = pt,
                await new Promise( (_t, vt) => {
                    ht.onload = () => _t(),
                    ht.onerror = () => vt(),
                    ht.complete && _t()
                }
                ),
                at.drawImage(ht, Math.floor(ht.width * c.x * h / o.width), Math.floor(ht.height * c.y * h / o.height), Math.floor(ht.width * c.width * h / o.width), Math.floor(ht.height * c.height * h / o.height), 0, 0, it.width, it.height)
            }
        } else
            at.fillStyle = o.style.background || ((nt = o.parentElement) === null || nt === void 0 ? void 0 : nt.style.backgroundColor) || "#00000000",
            at.fillRect(0, 0, it.width, it.height);
        return at == null || at.drawImage(o, Math.floor(c.x * h), Math.floor(c.y * h), Math.floor(c.width * h), Math.floor(c.height * h), 0, 0, it.width, it.height),
        this.Debug && (document.body.appendChild(it),
        it.style.position = "absolute",
        it.style.top = "0",
        it.style.left = "0",
        it.style.borderWidth = "2px",
        it.style.borderColor = "#ff00ff",
        setTimeout( () => it.remove(), 5e3)),
        it
    }
    static async GetDataUrl(o, {mimeType: c="image/png", ...h}) {
        const _ = isSafari() || h.cloneCanvas || h.rect || h.scale || h.displayPixelRatio;
        !_ && (h.rect || h.scale || h.displayPixelRatio) && console.warn("rect, scale and displayPixelRatio are ignored when cloneCanvas is false");
        const b = _ ? await this.GetClonedCanvas(o, h) : o
          , _e = b.toDataURL(c);
        return this.Debug || b === o || b.remove(),
        _e
    }
    static async GetImage(o, {mimeType: c="image/png", ...h}={}) {
        const _ = await this.GetDataUrl(o, h);
        return new Promise( (b, _e) => {
            const nt = new Image;
            nt.onload = () => {
                b(nt)
            }
            ,
            nt.src = _
        }
        )
    }
    static async GetBlob(o, c={}) {
        const h = isSafari() || c.cloneCanvas || c.rect || c.scale || c.displayPixelRatio;
        !h && (c.rect || c.scale || c.displayPixelRatio) && console.warn("rect, scale and displayPixelRatio are ignored when cloneCanvas is false");
        const _ = h ? await this.GetClonedCanvas(o, c) : o
          , b = await new Promise( (_e, nt) => {
            var it;
            _.toBlob(at => {
                at ? _e(at) : nt("Unable to export")
            }
            , (it = c.mimeType) !== null && it !== void 0 ? it : "image/png")
        }
        );
        return this.Debug || _ === o || _.remove(),
        b
    }
    static async GetFile(o, c="image", h={}) {
        var _, b, _e;
        const nt = c + "." + ((b = (_ = h.mimeType) === null || _ === void 0 ? void 0 : _.split("/")[1]) !== null && b !== void 0 ? b : "png");
        return h.getDataUrl ? await this.GetDataUrl(o, h) : new File([await this.GetBlob(o, h)],nt,{
            type: (_e = h.mimeType) !== null && _e !== void 0 ? _e : "image/png",
            lastModified: g()
        })
    }
    static async GetTiledFiles(o, c="image", h=2, _=2, b={}) {
        var _e, nt, it;
        const at = (_e = b.rect) !== null && _e !== void 0 ? _e : {
            x: 0,
            y: 0,
            width: 1,
            height: 1,
            assumeClientRect: !1,
            normalized: !0
        }
          , ut = [];
        for (let pt = 0; pt < _; pt++)
            for (let ht = 0; ht < h; ht++) {
                const _t = (it = (nt = b.mimeType) === null || nt === void 0 ? void 0 : nt.split("/")[1]) !== null && it !== void 0 ? it : "png"
                  , vt = await this.GetFile(o, `${c}_${pt}_${ht}.${_t}`, {
                    rect: {
                        x: at.x + pt * at.width / _,
                        y: at.y + ht * at.height / h,
                        width: at.width / _,
                        height: at.height / h,
                        assumeClientRect: at.assumeClientRect,
                        normalized: at.normalized
                    }
                }).catch(bt => (console.error(`Error exporting file ${pt}, ${ht}`, bt),
                null));
                vt && ut.push(vt)
            }
        return ut
    }
}

export default CanvasSnipper;
