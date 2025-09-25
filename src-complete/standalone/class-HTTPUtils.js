/* Standalone Class: HTTPUtils */

class HTTPUtils {
    static dirname(o) {
        const c = o.lastIndexOf("/");
        return c === -1 ? "./" : o.substring(0, c + 1)
    }
    static basename(o) {
        return index_modern_FileUtils.basename(new URL(o,NULL_DOMAIN).pathname)
    }
    static extension(o) {
        return index_modern_FileUtils.extension(new URL(o,NULL_DOMAIN).pathname)
    }
    static resolve(o, c) {
        if (!this.isRelativePath(c))
            return c;
        const h = o.split("/")
          , _ = c.split("/");
        h.pop();
        for (let b = 0; b < _.length; b++)
            _[b] !== "." && (_[b] === ".." ? h.pop() : h.push(_[b]));
        return h.join("/")
    }
    static isAbsoluteURL(o) {
        return this.PROTOCOL_REGEXP.test(o)
    }
    static isRelativePath(o) {
        return !/^(?:[a-zA-Z]+:)?\//.test(o)
    }
}

export default HTTPUtils;
