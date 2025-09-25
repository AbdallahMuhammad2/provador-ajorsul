/* Standalone Class: index_modern_EXTMeshGPUInstancing */

class index_modern_EXTMeshGPUInstancing extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$o,
        this.provideTypes = [index_modern_PropertyType.NODE],
        this.prewriteTypes = [index_modern_PropertyType.ACCESSOR]
    }
    createInstancedMesh() {
        return new InstancedMesh(this.document.getGraph())
    }
    read(o) {
        return (o.jsonDoc.json.nodes || []).forEach( (c, h) => {
            if (!c.extensions || !c.extensions[NAME$o])
                return;
            const _ = c.extensions[NAME$o]
              , b = this.createInstancedMesh();
            for (const _e in _.attributes)
                b.setAttribute(_e, o.accessors[_.attributes[_e]]);
            o.nodes[h].setExtension(NAME$o, b)
        }
        ),
        this
    }
    prewrite(o) {
        o.accessorUsageGroupedByParent.add(INSTANCE_ATTRIBUTE);
        for (const c of this.properties)
            for (const h of c.listAttributes())
                o.addAccessorToUsageGroup(h, INSTANCE_ATTRIBUTE);
        return this
    }
    write(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listNodes().forEach(h => {
            const _ = h.getExtension(NAME$o);
            if (_) {
                const b = o.nodeIndexMap.get(h)
                  , _e = c.json.nodes[b]
                  , nt = {
                    attributes: {}
                };
                _.listSemantics().forEach(it => {
                    const at = _.getAttribute(it);
                    nt.attributes[it] = o.accessorIndexMap.get(at)
                }
                ),
                _e.extensions = _e.extensions || {},
                _e.extensions[NAME$o] = nt
            }
        }
        ),
        this
    }
}

export default index_modern_EXTMeshGPUInstancing;
