/* Standalone Class: GenericExtension */

class GenericExtension extends Extension {
    constructor() {
        super(...arguments),
        this.textureChannels = {}
    }
    read(o) {
        const c = o.jsonDoc
          , h = c.json.materials || []
          , _ = c.json.textures || [];
        return h.forEach( (b, _e) => {
            var nt, it;
            if (b.extensions && b.extensions[this.extensionName]) {
                const at = new GenericExtensionProperty(this.document.getGraph(),"",this.extensionName);
                o.materials[_e].setExtension(this.extensionName, at);
                const ut = {
                    ...b.extensions[this.extensionName]
                };
                for (const [pt,ht] of Object.entries(ut))
                    if (typeof (ht == null ? void 0 : ht.index) == "number") {
                        const _t = ht
                          , vt = (nt = _[_t.index]) === null || nt === void 0 ? void 0 : nt.source;
                        if (typeof vt != "number") {
                            console.warn("GLTF Pipeline: source texture not found for texture info", _t);
                            continue
                        }
                        const bt = o.textures[vt]
                          , St = new index_modern_TextureInfo(this.document.getGraph())
                          , At = (it = this.textureChannels[pt]) !== null && it !== void 0 ? it : 4369;
                        at.addTexture(pt, St, bt, At),
                        o.setTextureInfo(St, _t),
                        delete ut[pt]
                    }
                at.setExtras(ut)
            }
        }
        ),
        (c.json.meshes || []).forEach( (b, _e) => {
            if (b.extensions && b.extensions[this.extensionName]) {
                const nt = new GenericExtensionProperty(this.document.getGraph(),"",this.extensionName);
                o.meshes[_e].setExtension(this.extensionName, nt);
                const it = b.extensions[this.extensionName];
                nt.setExtras(it)
            }
        }
        ),
        (c.json.nodes || []).forEach( (b, _e) => {
            if (b.extensions && b.extensions[this.extensionName]) {
                const nt = new GenericExtensionProperty(this.document.getGraph(),"",this.extensionName);
                o.nodes[_e].setExtension(this.extensionName, nt);
                const it = b.extensions[this.extensionName];
                nt.setExtras(it)
            }
        }
        ),
        (c.json.scenes || []).forEach( (b, _e) => {
            if (b.extensions && b.extensions[this.extensionName]) {
                const nt = new GenericExtensionProperty(this.document.getGraph(),"",this.extensionName);
                o.scenes[_e].setExtension(this.extensionName, nt);
                const it = b.extensions[this.extensionName];
                nt.setExtras(it)
            }
        }
        ),
        this
    }
    write(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listMaterials().forEach(h => {
            const _ = h.getExtension(this.extensionName);
            if (_) {
                const b = o.materialIndexMap.get(h)
                  , _e = c.json.materials[b];
                _e.extensions = _e.extensions || {};
                const nt = {
                    ..._.getExtras()
                };
                for (const [it,at] of Object.entries(_.textures)) {
                    const ut = at[0]
                      , pt = at[1];
                    pt && (nt[it] = o.createTextureInfoDef(pt, ut))
                }
                _e.extensions[this.extensionName] = nt
            }
        }
        ),
        this.document.getRoot().listMeshes().forEach(h => {
            const _ = h.getExtension(this.extensionName);
            if (_) {
                const b = o.meshIndexMap.get(h)
                  , _e = c.json.meshes[b];
                _e.extensions = _e.extensions || {},
                _e.extensions[this.extensionName] = _.getExtras()
            }
        }
        ),
        this.document.getRoot().listNodes().forEach(h => {
            const _ = h.getExtension(this.extensionName);
            if (_) {
                const b = o.nodeIndexMap.get(h)
                  , _e = c.json.nodes[b];
                _e.extensions = _e.extensions || {},
                _e.extensions[this.extensionName] = _.getExtras()
            }
        }
        ),
        this.document.getRoot().listScenes().forEach(h => {
            const _ = h.getExtension(this.extensionName);
            if (_) {
                const b = o.jsonDoc.json.scene || 0
                  , _e = c.json.scenes[b];
                if (!_e)
                    return;
                _e.extensions = _e.extensions || {},
                _e.extensions[this.extensionName] = _.getExtras()
            }
        }
        ),
        this
    }
}

export default GenericExtension;
