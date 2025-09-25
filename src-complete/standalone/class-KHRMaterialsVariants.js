/* Standalone Class: KHRMaterialsVariants */

class KHRMaterialsVariants extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$5
    }
    createMappingList() {
        return new MappingList(this.document.getGraph())
    }
    createVariant(o="") {
        return new Variant(this.document.getGraph(),o)
    }
    createMapping() {
        return new Mapping(this.document.getGraph())
    }
    listVariants() {
        return Array.from(this.properties).filter(o => o instanceof Variant)
    }
    read(o) {
        const c = o.jsonDoc;
        if (!c.json.extensions || !c.json.extensions[NAME$5])
            return this;
        const h = (c.json.extensions[NAME$5].variants || []).map(_ => this.createVariant().setName(_.name || ""));
        return (c.json.meshes || []).forEach( (_, b) => {
            const _e = o.meshes[b];
            (_.primitives || []).forEach( (nt, it) => {
                if (!nt.extensions || !nt.extensions[NAME$5])
                    return;
                const at = this.createMappingList()
                  , ut = nt.extensions[NAME$5];
                for (const pt of ut.mappings) {
                    const ht = this.createMapping();
                    pt.material !== void 0 && ht.setMaterial(o.materials[pt.material]);
                    for (const _t of pt.variants || [])
                        ht.addVariant(h[_t]);
                    at.addMapping(ht)
                }
                _e.listPrimitives()[it].setExtension(NAME$5, at)
            }
            )
        }
        ),
        this
    }
    write(o) {
        const c = o.jsonDoc
          , h = this.listVariants();
        if (!h.length)
            return this;
        const _ = []
          , b = new Map;
        for (const _e of h)
            b.set(_e, _.length),
            _.push(o.createPropertyDef(_e));
        for (const _e of this.document.getRoot().listMeshes()) {
            const nt = o.meshIndexMap.get(_e);
            _e.listPrimitives().forEach( (it, at) => {
                const ut = it.getExtension(NAME$5);
                if (!ut)
                    return;
                const pt = o.jsonDoc.json.meshes[nt].primitives[at]
                  , ht = ut.listMappings().map(_t => {
                    const vt = o.createPropertyDef(_t)
                      , bt = _t.getMaterial();
                    return bt && (vt.material = o.materialIndexMap.get(bt)),
                    vt.variants = _t.listVariants().map(St => b.get(St)),
                    vt
                }
                );
                pt.extensions = pt.extensions || {},
                pt.extensions[NAME$5] = {
                    mappings: ht
                }
            }
            )
        }
        return c.json.extensions = c.json.extensions || {},
        c.json.extensions[NAME$5] = {
            variants: _
        },
        this
    }
}

export default KHRMaterialsVariants;
