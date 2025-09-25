/* Standalone Class: VariationConfiguratorPlugin */

class VariationConfiguratorPlugin extends AViewerPlugin {
    constructor() {
        super(...arguments),
        this.dependencies = [AssetManagerPlugin],
        this.enabled = !0,
        this.serializeWithViewer = !1,
        this.baseUrl = "",
        this.variations = {
            objects: [],
            materials: []
        },
        this.autoDispose = !0,
        this._ty = ["objects", "materials"],
        this._extForType = {
            objects: ["glb", "fbx", "obj", "gltf", "stl", "3dm", "json", "vjson"],
            materials: ["pmat", "dmat"],
            images: ["png", "jpg", "jpeg", "gif", "bmp", "webp", "svg"]
        },
        this.utils = {
            getName: o => o.name || o.prefix.replace(/^\//, "").replace(/\/$/, "").replaceAll("/", "_"),
            getTitle: o => o.title || this.utils.getName(o),
            getIcon: (o, c) => {
                let h = o.icon;
                return (h && /^(\w+)\(([^)]*)\)/.exec(h) || /^#([A-Fa-f\d]+)$/.exec(h)) && (h = Je$1(h)),
                h && h.startsWith("http") && h.startsWith("data:") || (h = this.utils.pathToIcon(this.baseUrl + c + "/" + o.prefix + (h || ""))),
                h
            }
            ,
            getItemIcon: (o, c, h) => {
                const _ = o.iconFiles[c];
                if (_)
                    return URL.createObjectURL(_);
                let b = o.icons[c];
                return (b && /^(\w+)\(([^)]*)\)/.exec(b) || /^#([A-Fa-f\d]+)$/.exec(b)) && (b = Je$1(b)),
                b || (b = this.utils.pathToIcon(o.items[c])),
                !b || b.startsWith("http") || b.startsWith("data:") || (b = this.baseUrl + h + "/" + o.prefix + b),
                b
            }
            ,
            getItemTitle: (o, c) => o.titles[c] || this.utils.pathToTitle(o.items[c]),
            getItemPath: (o, c, h) => o.items[c].startsWith("http") ? o.items[c] : `${this.baseUrl}${h}/${o.prefix}${o.items[c]}`,
            pathToTitle: o => o.split("/").pop().replace(/\.[^.]*$/, ""),
            pathToIcon: o => o.replace(/\/$/, "").replace(/\.[^/.]+$/, "") + ".webp"
        },
        this.toJSON = void 0
    }
    _getVariationId(o) {
        return this.utils.getName(o)
    }
    async applyVariation(o, c, h, _=!1) {
        var b, _e;
        if (!this._viewer)
            return;
        const nt = this._getVariationId(o);
        typeof c == "number" && (c = o.items[c]);
        const it = o.items.indexOf(c);
        if (it === -1)
            return void this._viewer.console.warn(`Item ${c} not found`);
        const at = o.itemFiles[it]
          , ut = o.selected;
        if (!_ && ut === it)
            return;
        o.selected = it;
        const pt = this._viewer.getManager()
          , ht = this.utils.getItemPath(o, it, h);
        if (h === "objects") {
            let _t = this._viewer.scene.findObjectsByName(nt).map(Et => Et.modelObject);
            _t.length === 0 && (_t = [(await this._viewer.createObject3D()).modelObject],
            _t[0].name = nt),
            this._viewer.renderEnabled = !1;
            for (const Et of _t)
                [...Et.children].forEach(Pt => Pt.dispose && this.autoDispose ? Pt.dispose() : Pt.removeFromParent());
            const vt = await this._loadObject(ht, at);
            if (!vt.length)
                return void (ht.endsWith("json") || this._viewer.console.warn(`Object ${ht} not found`));
            let bt = !1;
            for (const Et of _t) {
                [...Et.children].forEach(Pt => Pt.dispose && this.autoDispose ? Pt.dispose() : Pt.removeFromParent());
                for (const Pt of vt)
                    bt ? Et.add(Pt.modelObject.clone()) : Et.add(Pt.modelObject);
                bt = !0
            }
            const St = []
              , At = this.variations.materials.filter(Et => Et && typeof Et.selected == "number");
            for (const Et of At)
                St.push(this.applyVariation(Et, Et.selected, "materials", !0));
            await Promise.all(St),
            this._viewer.renderEnabled = !0
        }
        if (h === "materials") {
            const _t = await this._loadMaterial(ht, at);
            if (!_t)
                return void this._viewer.console.warn(`Material ${ht} not found`);
            _t.userData.__isVariation = !0;
            const vt = this._viewer.scene.findObjectsByName(nt)
              , bt = St => {
                var At, Et, Pt, It;
                St.material && (!((At = o.data) === null || At === void 0) && At.matType) && (Array.isArray(St.material) ? St.material.length !== 0 && ((Et = o.data) === null || Et === void 0 ? void 0 : Et.matType) !== St.material[0].typeSlug : ((Pt = o.data) === null || Pt === void 0 ? void 0 : Pt.matType) !== St.material.typeSlug) || (It = St == null ? void 0 : St.setMaterial) === null || It === void 0 || It.call(St, _t)
            }
            ;
            for (const St of vt)
                !((b = o.data) === null || b === void 0) && b.traverse ? St.traverse(bt) : bt(St);
            (_e = pt.materials) === null || _e === void 0 || _e.applyMaterial(_t, nt)
        }
    }
    clearVariations() {
        const o = this.variations.objects;
        if (this.variations.materials,
        this.variations = {
            objects: [],
            materials: []
        },
        this._viewer)
            for (const c of o) {
                const h = this._getVariationId(c)
                  , _ = this._viewer.scene.findObjectsByName(h);
                for (const b of _)
                    [...b.children].forEach(_e => {
                        var nt;
                        return ((nt = _e.dispose) !== null && nt !== void 0 ? nt : _e.removeFromParent)()
                    }
                    )
            }
    }
    async _loadMaterial(o, c) {
        var h, _, b;
        return (b = (_ = (h = this._viewer) === null || h === void 0 ? void 0 : h.getManager()) === null || _ === void 0 ? void 0 : _.importer) === null || b === void 0 ? void 0 : b.importSinglePath(o, {
            importedFile: c
        })
    }
    async _loadObject(o, c) {
        var h, _, b;
        return (b = (_ = (h = this._viewer) === null || h === void 0 ? void 0 : h.getManager()) === null || _ === void 0 ? void 0 : _.importer) === null || b === void 0 ? void 0 : b.importPath(o, {
            importedFile: c,
            reimportDisposed: !0
        })
    }
    importConfig(o, c) {
        var h, _;
        typeof o == "string" && (o = JSON.parse(o)),
        o.baseUrl !== void 0 && (this.baseUrl = o.baseUrl),
        !c && o.folder && (c = typeof o.folder == "object" ? o.folder : typeof o.folder == "string" ? unzipSync(strToU8(o.folder)) : unzipSync(o.folder));
        for (const b of this._ty)
            if (o[b])
                for (const _e of o[b]) {
                    const nt = {
                        items: _e.items,
                        prefix: _e.prefix,
                        name: _e.name,
                        title: _e.title || "",
                        icon: _e.icon || "",
                        icons: (h = _e.icons) !== null && h !== void 0 ? h : _e.items.map( () => ""),
                        titles: (_ = _e.titles) !== null && _ !== void 0 ? _ : _e.items.map( () => ""),
                        itemFiles: [],
                        iconFiles: [],
                        data: {
                            ..._e.data
                        }
                    };
                    if (c)
                        for (let it = 0; it < _e.items.length; it++) {
                            const at = _e.items[it]
                              , ut = c[b + "/" + _e.prefix + at];
                            nt.itemFiles[it] = ut ? new File([ut],at) : void 0;
                            const pt = _e.icons[it];
                            if (!pt)
                                continue;
                            const ht = c[b + "/" + _e.prefix + pt];
                            nt.iconFiles[it] = ht ? new File([ht],pt) : void 0
                        }
                    this.variations[b].push(nt)
                }
    }
    async importPath(o) {
        var c, h;
        if (o.endsWith(".json")) {
            const _ = await ((h = (c = this._viewer) === null || c === void 0 ? void 0 : c.getManager().importer) === null || h === void 0 ? void 0 : h.importSinglePath(o, {
                processImported: !1
            }))
              , b = o.split("?")[0];
            return this.baseUrl || (this.baseUrl = b.substring(0, b.lastIndexOf("/") + 1)),
            this.importConfig(_)
        }
        o.endsWith(".zip") ? alert("not implemented") : alert("not supported")
    }
    getMaterials(o) {
        var c;
        return ((c = this.variations.materials.find(h => this.utils.getName(h) === o)) === null || c === void 0 ? void 0 : c.items) || []
    }
    getObjects(o) {
        var c;
        return ((c = this.variations.objects.find(h => this.utils.getName(h) === o)) === null || c === void 0 ? void 0 : c.items) || []
    }
    getMaterialVariations() {
        return this.variations.materials.map(o => this.utils.getName(o))
    }
    getObjectVariations() {
        return this.variations.objects.map(o => this.utils.getName(o))
    }
    async onRemove(o) {
        return super.onRemove(o)
    }
    fromJSON(o) {
        return super.fromJSON(o) ? (this.importConfig(o),
        this) : null
    }
    async _exportConfiguratorState() {
        var o;
        let c = {
            objects: {},
            materials: {}
        };
        const h = {
            objects: [],
            materials: [],
            type: VariationConfiguratorPlugin.PluginType
        };
        this.baseUrl && (h.baseUrl = this.baseUrl);
        let _ = !1;
        for (const b of this._ty)
            for (const _e of this.variations[b]) {
                const nt = {
                    ..._e
                };
                nt.data = {
                    ...nt.data
                },
                delete nt.itemFiles,
                delete nt.iconFiles,
                h[b].push(nt);
                const it = _e.prefix.replace(/^\//, "")
                  , at = it.trimEnd().endsWith("/") ? "" : it.split("/").pop() || ""
                  , ut = it.replace(at, "").trimEnd().replace(/\/$/, "")
                  , pt = {};
                let ht = !1;
                for (let bt = 0; bt < _e.items.length; bt++) {
                    const St = _e.items[bt]
                      , At = _e.itemFiles[bt]
                      , Et = _e.iconFiles[bt]
                      , Pt = _e.icons[bt];
                    At ? (pt[at + St] = new Uint8Array(await At.arrayBuffer()),
                    Et && !Pt && ((o = this._viewer) === null || o === void 0 || o.console.error("Icon file without icon name")),
                    Et && Pt && (pt[at + Pt] = new Uint8Array(await Et.arrayBuffer())),
                    ht = !0) : Et && alert("Icon file without model/material file not supported")
                }
                if (!ht)
                    continue;
                _ = !0;
                const _t = ut.split("/");
                let vt = c[b];
                for (const bt of _t) {
                    vt[bt] || (vt[bt] = {});
                    const St = vt[bt];
                    if (typeof St != "object")
                        throw new Error("Invalid prefix: " + _e.prefix);
                    vt = St
                }
                Object.assign(vt, pt)
            }
        return _ || (c = void 0),
        {
            folder: c,
            config: h
        }
    }
}

export default VariationConfiguratorPlugin;
