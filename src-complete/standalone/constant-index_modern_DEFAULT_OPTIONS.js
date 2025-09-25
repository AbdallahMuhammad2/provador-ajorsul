/* Standalone Constant: index_modern_DEFAULT_OPTIONS */

const index_modern_DEFAULT_OPTIONS = {
    logger: Logger.DEFAULT_INSTANCE,
    extensions: [],
    dependencies: {}
}
  , SUPPORTED_PREREAD_TYPES = new Set([index_modern_PropertyType.BUFFER, index_modern_PropertyType.TEXTURE, index_modern_PropertyType.MATERIAL, index_modern_PropertyType.MESH, index_modern_PropertyType.PRIMITIVE, index_modern_PropertyType.NODE, index_modern_PropertyType.SCENE]);
class GLTFReader {
    static read(o, c=index_modern_DEFAULT_OPTIONS) {
        const h = index_modern_extends({}, index_modern_DEFAULT_OPTIONS, c)
          , {json: _} = o
          , b = new index_modern_Document().setLogger(h.logger);
        this.validate(o, h);
        const _e = new ReaderContext(o)
          , nt = _.asset
          , it = b.getRoot().getAsset();
        nt.copyright && (it.copyright = nt.copyright),
        nt.extras && (it.extras = nt.extras),
        _.extras !== void 0 && b.getRoot().setExtras(index_modern_extends({}, _.extras));
        const at = _.extensionsUsed || []
          , ut = _.extensionsRequired || [];
        h.extensions.sort( (Bt, kt) => Bt.EXTENSION_NAME > kt.EXTENSION_NAME ? 1 : -1);
        for (const Bt of h.extensions)
            if (at.includes(Bt.EXTENSION_NAME)) {
                const kt = b.createExtension(Bt).setRequired(ut.includes(Bt.EXTENSION_NAME))
                  , Ut = kt.prereadTypes.filter(Ht => !SUPPORTED_PREREAD_TYPES.has(Ht));
                Ut.length && h.logger.warn(`Preread hooks for some types (${Ut.join()}), requested by extension ${kt.extensionName}, are unsupported. Please file an issue or a PR.`);
                for (const Ht of kt.readDependencies)
                    kt.install(Ht, h.dependencies[Ht])
            }
        const pt = _.buffers || [];
        b.getRoot().listExtensionsUsed().filter(Bt => Bt.prereadTypes.includes(index_modern_PropertyType.BUFFER)).forEach(Bt => Bt.preread(_e, index_modern_PropertyType.BUFFER)),
        _e.buffers = pt.map(Bt => {
            const kt = b.createBuffer(Bt.name);
            return Bt.extras && kt.setExtras(Bt.extras),
            Bt.uri && Bt.uri.indexOf("__") !== 0 && kt.setURI(Bt.uri),
            kt
        }
        );
        const ht = _.bufferViews || [];
        _e.bufferViewBuffers = ht.map( (Bt, kt) => {
            if (!_e.bufferViews[kt]) {
                const Ut = o.json.buffers[Bt.buffer]
                  , Ht = Ut.uri ? o.resources[Ut.uri] : o.resources[GLB_BUFFER]
                  , Kt = Bt.byteOffset || 0;
                _e.bufferViews[kt] = index_modern_BufferUtils.toView(Ht, Kt, Bt.byteLength)
            }
            return _e.buffers[Bt.buffer]
        }
        );
        const _t = _.accessors || [];
        _e.accessors = _t.map(Bt => {
            const kt = _e.bufferViewBuffers[Bt.bufferView]
              , Ut = b.createAccessor(Bt.name, kt).setType(Bt.type);
            return Bt.extras && Ut.setExtras(Bt.extras),
            Bt.normalized !== void 0 && Ut.setNormalized(Bt.normalized),
            Bt.bufferView === void 0 || Ut.setArray(getAccessorArray(Bt, _e)),
            Ut
        }
        );
        const vt = _.images || []
          , bt = _.textures || [];
        b.getRoot().listExtensionsUsed().filter(Bt => Bt.prereadTypes.includes(index_modern_PropertyType.TEXTURE)).forEach(Bt => Bt.preread(_e, index_modern_PropertyType.TEXTURE)),
        _e.textures = vt.map(Bt => {
            const kt = b.createTexture(Bt.name);
            if (Bt.extras && kt.setExtras(Bt.extras),
            Bt.bufferView !== void 0) {
                const Ut = _.bufferViews[Bt.bufferView]
                  , Ht = o.json.buffers[Ut.buffer]
                  , Kt = Ht.uri ? o.resources[Ht.uri] : o.resources[GLB_BUFFER]
                  , Jt = Ut.byteOffset || 0
                  , or = Ut.byteLength
                  , ir = Kt.slice(Jt, Jt + or);
                kt.setImage(ir)
            } else
                Bt.uri !== void 0 && (kt.setImage(o.resources[Bt.uri]),
                Bt.uri.indexOf("__") !== 0 && kt.setURI(Bt.uri));
            if (Bt.mimeType !== void 0)
                kt.setMimeType(Bt.mimeType);
            else if (Bt.uri) {
                const Ut = index_modern_FileUtils.extension(Bt.uri);
                kt.setMimeType(index_modern_ImageUtils.extensionToMimeType(Ut))
            }
            return kt
        }
        ),
        b.getRoot().listExtensionsUsed().filter(Bt => Bt.prereadTypes.includes(index_modern_PropertyType.MATERIAL)).forEach(Bt => Bt.preread(_e, index_modern_PropertyType.MATERIAL));
        const St = _.materials || [];
        _e.materials = St.map(Bt => {
            const kt = b.createMaterial(Bt.name);
            Bt.extras && kt.setExtras(Bt.extras),
            Bt.alphaMode !== void 0 && kt.setAlphaMode(Bt.alphaMode),
            Bt.alphaCutoff !== void 0 && kt.setAlphaCutoff(Bt.alphaCutoff),
            Bt.doubleSided !== void 0 && kt.setDoubleSided(Bt.doubleSided);
            const Ut = Bt.pbrMetallicRoughness || {};

export default index_modern_DEFAULT_OPTIONS;
