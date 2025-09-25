/* Standalone Function: processViewer */

function processViewer(d, o) {
    const c = d.getPlugin(AssetManagerPlugin).exportViewerConfig();
    o.json.textures && o.json.samplers && o.json.images && c.resources.textures && [...Object.entries(c.resources.textures)].forEach( ([_,b]) => {
        o.json.textures.find(nt => {
            var it, at, ut, pt, ht;
            return ((it = nt.extras) === null || it === void 0 ? void 0 : it.uuid) === _ || ((ut = (at = o.json.samplers[nt.sampler]) === null || at === void 0 ? void 0 : at.extras) === null || ut === void 0 ? void 0 : ut.uuid) === _ || ((ht = (pt = o.json.images[nt.source]) === null || pt === void 0 ? void 0 : pt.extras) === null || ht === void 0 ? void 0 : ht.t_uuid) === _
        }
        ) && (b.image && c.resources.images && c.resources.images[b.image] && delete c.resources.images[b.image],
        c.resources.textures[_] = {})
    }
    ),
    o.json.materials && c.resources.materials && [...Object.entries(c.resources.materials)].forEach( ([_,b]) => {
        o.json.materials.find(nt => {
            var it;
            return ((it = nt.extras) === null || it === void 0 ? void 0 : it.uuid) === _
        }
        ) && (c.resources.materials[_] = {})
    }
    );
    const h = [];
    Object.values(c.resources).forEach(_ => {
        _ && Object.values(_).forEach(b => {
            b.url && (b.url.type === "Uint16Array" && b.url.data ? (b.url.data instanceof Uint16Array || (b.url.data = new Uint16Array(b.url.data)),
            h.push(b.url)) : b.url.type === "Uint8Array" && b.url.data && (b.url.data instanceof Uint8Array || (b.url.data = new Uint8Array(b.url.data)),
            h.push(b.url)))
        }
        )
    }
    );
    for (const _ of h) {
        let b = "application/octet-stream";
        if (_.mimeType && (b = _.mimeType),
        o.options.exporterOptions.encodeUint16Rgbe && _.type === "Uint16Array" && _.width > 0 && _.height > 0) {
            const at = halfFloatToRgbe(_.data, 4)
              , ut = new ImageData(at,_.width,_.height)
              , pt = three_module.HgN.getDataURL(ut, !0).split(",")[1]
              , ht = 2;
            b = "image/png",
            ht === 1 || (_.data = Uint8Array.from(atob(pt), _t => _t.charCodeAt(0))),
            _.encoding = "rgbe",
            _.encodingVersion = ht
        }
        o.json.images || (o.json.images = []);
        const _e = {
            mimeType: b
        }
          , nt = o.json.images.push(_e) - 1
          , it = _.data;
        _e.bufferView = o.processBufferViewImageBuffer(it),
        _.data = {
            image: nt
        }
    }
    return c
}

export default processViewer;
