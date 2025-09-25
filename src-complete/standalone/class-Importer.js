/* Standalone Class: Importer */

class Importer {
    ctor(o) {
        const c = this.cls && new this.cls(o.loadingManager);
        return typeof this.onCtor == "function" ? this.onCtor(c, o) : c
    }
    constructor(o, c, h, _) {
        this.cls = o,
        this.ext = c,
        this.root = h,
        this.onCtor = _
    }
}

export default Importer;
