/* Standalone Class: Packet */

class Packet extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_XMP_JSON_LD,
        this.propertyType = "Packet",
        this.parentTypes = PARENT_TYPES
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            context: {},
            properties: {}
        })
    }
    getContext() {
        return this.get("context")
    }
    setContext(o) {
        return this.set("context", dist_index_modern_extends({}, o))
    }
    listProperties() {
        return Object.keys(this.get("properties"))
    }
    getProperty(o) {
        const c = this.get("properties");
        return o in c ? c[o] : null
    }
    setProperty(o, c) {
        this._assertContext(o);
        const h = dist_index_modern_extends({}, this.get("properties"));
        return c ? h[o] = c : delete h[o],
        this.set("properties", h)
    }
    toJSONLD() {
        return dist_index_modern_extends({
            "@context": copyJSON(this.get("context"))
        }, copyJSON(this.get("properties")))
    }
    fromJSONLD(o) {
        const c = (o = copyJSON(o))["@context"];
        return c && this.set("context", c),
        delete o["@context"],
        this.set("properties", o)
    }
    _assertContext(o) {
        if (!(o.split(":")[0]in this.get("context")))
            throw new Error(`${KHR_XMP_JSON_LD}: Missing context for term, "${o}".`)
    }
}

export default Packet;
