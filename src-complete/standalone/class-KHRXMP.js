/* Standalone Class: KHRXMP */

class KHRXMP extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME
    }
    createPacket() {
        return new Packet(this.document.getGraph())
    }
    listPackets() {
        return Array.from(this.properties)
    }
    read(o) {
        var c;
        const h = (c = o.jsonDoc.json.extensions) == null ? void 0 : c[NAME];
        if (!h || !h.packets)
            return this;
        const _ = o.jsonDoc.json
          , b = this.document.getRoot()
          , _e = h.packets.map(at => this.createPacket().fromJSONLD(at))
          , nt = [[_.asset], _.scenes, _.nodes, _.meshes, _.materials, _.images, _.animations]
          , it = [[b], b.listScenes(), b.listNodes(), b.listMeshes(), b.listMaterials(), b.listTextures(), b.listAnimations()];
        for (let at = 0; at < nt.length; at++) {
            const ut = nt[at] || [];
            for (let pt = 0; pt < ut.length; pt++) {
                const ht = ut[pt];
                if (ht.extensions && ht.extensions[NAME]) {
                    const _t = ht.extensions[NAME];
                    it[at][pt].setExtension(NAME, _e[_t.packet])
                }
            }
        }
        return this
    }
    write(o) {
        const {json: c} = o.jsonDoc
          , h = [];
        for (const _ of this.properties) {
            h.push(_.toJSONLD());
            for (const b of _.listParents()) {
                let _e;
                switch (b.propertyType) {
                case index_modern_PropertyType.ROOT:
                    _e = c.asset;
                    break;
                case index_modern_PropertyType.SCENE:
                    _e = c.scenes[o.sceneIndexMap.get(b)];
                    break;
                case index_modern_PropertyType.NODE:
                    _e = c.nodes[o.nodeIndexMap.get(b)];
                    break;
                case index_modern_PropertyType.MESH:
                    _e = c.meshes[o.meshIndexMap.get(b)];
                    break;
                case index_modern_PropertyType.MATERIAL:
                    _e = c.materials[o.materialIndexMap.get(b)];
                    break;
                case index_modern_PropertyType.TEXTURE:
                    _e = c.images[o.imageIndexMap.get(b)];
                    break;
                case index_modern_PropertyType.ANIMATION:
                    _e = c.animations[o.animationIndexMap.get(b)];
                    break;
                default:
                    _e = null,
                    this.document.getLogger().warn(`[${NAME}]: Unsupported parent property, "${b.propertyType}"`)
                }
                _e && (_e.extensions = _e.extensions || {},
                _e.extensions[NAME] = {
                    packet: h.length - 1
                })
            }
        }
        return h.length > 0 && (c.extensions = c.extensions || {},
        c.extensions[NAME] = {
            packets: h
        }),
        this
    }
}

export default KHRXMP;
