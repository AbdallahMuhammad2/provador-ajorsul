/* Standalone Class: index_modern_ExtensionProperty */

class index_modern_ExtensionProperty extends Property {
    _validateParent(o) {
        if (!this.parentTypes.includes(o.propertyType))
            throw new Error(`Parent "${o.propertyType}" invalid for child "${this.propertyType}".`)
    }
}

export default index_modern_ExtensionProperty;
