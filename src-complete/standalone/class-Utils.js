/* Standalone Class: Utils */

class Utils {
    static defaults(o, c) {
        o === void 0 && (o = {});
        for (let h in c)
            h in o || (o[h] = c[h]);
        return o
    }
}

export default Utils;
