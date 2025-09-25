/* Standalone Class: WebIO */

class WebIO extends PlatformIO {
    constructor(o=HTTPUtils.DEFAULT_INIT) {
        super(),
        this._fetchConfig = void 0,
        this._fetchConfig = o
    }
    async readURI(o, c) {
        const h = await fetch(o, this._fetchConfig);
        switch (c) {
        case "view":
            return new Uint8Array(await h.arrayBuffer());
        case "text":
            return h.text()
        }
    }
    resolve(o, c) {
        return HTTPUtils.resolve(o, c)
    }
    dirname(o) {
        return HTTPUtils.dirname(o)
    }
}

export default WebIO;
