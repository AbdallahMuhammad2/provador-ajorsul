/* Standalone Class: FBXLoader2 */

class FBXLoader2 extends FBXLoader {
    async loadAsync(o, c) {
        const h = three_module.gPd.DEFAULT_IMAGE;
        three_module.gPd.DEFAULT_IMAGE || (three_module.gPd.DEFAULT_IMAGE = AssetImporter.WHITE_IMAGE_DATA);
        const _ = await super.loadAsync(o, c);
        return three_module.gPd.DEFAULT_IMAGE = h,
        _
    }
}

export default FBXLoader2;
