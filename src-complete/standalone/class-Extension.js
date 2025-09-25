/* Standalone Class: Extension */

class Extension {
    constructor(o) {
        this.extensionName = "",
        this.prereadTypes = [],
        this.prewriteTypes = [],
        this.readDependencies = [],
        this.writeDependencies = [],
        this.document = void 0,
        this.required = !1,
        this.properties = new Set,
        this._listener = void 0,
        this.document = o,
        o.getRoot()._enableExtension(this),
        this._listener = h => {
            const _ = h
              , b = _.target;
            b instanceof index_modern_ExtensionProperty && b.extensionName === this.extensionName && (_.type === "node:create" && this._addExtensionProperty(b),
            _.type === "node:dispose" && this._removeExtensionProperty(b))
        }
        ;
        const c = o.getGraph();
        c.addEventListener("node:create", this._listener),
        c.addEventListener("node:dispose", this._listener)
    }
    dispose() {
        this.document.getRoot()._disableExtension(this);
        const o = this.document.getGraph();
        o.removeEventListener("node:create", this._listener),
        o.removeEventListener("node:dispose", this._listener);
        for (const c of this.properties)
            c.dispose()
    }
    static register() {}
    isRequired() {
        return this.required
    }
    setRequired(o) {
        return this.required = o,
        this
    }
    listProperties() {
        return Array.from(this.properties)
    }
    _addExtensionProperty(o) {
        return this.properties.add(o),
        this
    }
    _removeExtensionProperty(o) {
        return this.properties.delete(o),
        this
    }
    install(o, c) {
        return this
    }
    preread(o, c) {
        return this
    }
    prewrite(o, c) {
        return this
    }
}

export default Extension;
