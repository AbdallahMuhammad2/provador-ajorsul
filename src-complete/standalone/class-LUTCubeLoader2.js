/* Standalone Class: LUTCubeLoader2 */

class LUTCubeLoader2 extends LUTCubeLoader {
    parse(o) {
        const c = super.parse(o);
        return new LUTCubeTextureWrapper(c)
    }
}

export default LUTCubeLoader2;
