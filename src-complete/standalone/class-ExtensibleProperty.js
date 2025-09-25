/* Standalone Class: ExtensibleProperty */

class ExtensibleProperty extends Property {
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            extensions: new RefMap
        })
    }
    getExtension(o) {
        return this.getRefMap("extensions", o)
    }
    setExtension(o, c) {
        return c && c._validateParent(this),
        this.setRefMap("extensions", o, c)
    }
    listExtensions() {
        return this.listRefMapValues("extensions")
    }
}

export default ExtensibleProperty;
