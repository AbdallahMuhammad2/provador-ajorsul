/* Standalone Class: GLTFLoader2 */

class GLTFLoader2 extends GLTFLoader {
    constructor(o) {
        super(o),
        this.isGLTFLoader2 = !0,
        this.preparsers = [],
        this.preparsers.push(glbEncryptionPreparser)
    }
    async preparse(o, c) {
        for (const h of this.preparsers)
            o = await h.process(o, c);
        return o
    }
    parse(o, c, h, _, b) {
        this.preparse.call(this, o, b || c).then(_e => {
            const nt = three_module.gPd.DEFAULT_IMAGE;
            return three_module.gPd.DEFAULT_IMAGE || (three_module.gPd.DEFAULT_IMAGE = AssetImporter.WHITE_IMAGE_DATA),
            _e ? super.parse(_e, c, it => {
                three_module.gPd.DEFAULT_IMAGE = nt,
                h && h(it)
            }
            , _) : _ && _(new ErrorEvent("no data"))
        }
        ).catch(_e => {
            console.error(_e),
            _ && _(_e ?? new ErrorEvent("unknown error"))
        }
        )
    }
    transform(o, c) {
        const h = o ? o.scene || (o.scenes && o.scenes.length > 0 ? o.scenes[0] : void 0) : void 0;
        return h && o.animations.length > 0 && (h.animations = o.animations),
        h == null || h.traverse(_ => {
            _.userData.gltfUUID && (_.uuid = _.userData.gltfUUID,
            delete _.userData.gltfUUID)
        }
        ),
        h
    }
    register(o) {
        return super.register(o)
    }
}

export default GLTFLoader2;
