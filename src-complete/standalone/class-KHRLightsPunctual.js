/* Standalone Class: KHRLightsPunctual */

class KHRLightsPunctual extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$i
    }
    createLight(o="") {
        return new Light(this.document.getGraph(),o)
    }
    read(o) {
        const c = o.jsonDoc;
        if (!c.json.extensions || !c.json.extensions[NAME$i])
            return this;
        const h = (c.json.extensions[NAME$i].lights || []).map(_ => {
            var b, _e;
            const nt = this.createLight().setName(_.name || "").setType(_.type);
            return _.color !== void 0 && nt.setColor(_.color),
            _.intensity !== void 0 && nt.setIntensity(_.intensity),
            _.range !== void 0 && nt.setRange(_.range),
            ((b = _.spot) == null ? void 0 : b.innerConeAngle) !== void 0 && nt.setInnerConeAngle(_.spot.innerConeAngle),
            ((_e = _.spot) == null ? void 0 : _e.outerConeAngle) !== void 0 && nt.setOuterConeAngle(_.spot.outerConeAngle),
            nt
        }
        );
        return c.json.nodes.forEach( (_, b) => {
            if (!_.extensions || !_.extensions[NAME$i])
                return;
            const _e = _.extensions[NAME$i];
            o.nodes[b].setExtension(NAME$i, h[_e.light])
        }
        ),
        this
    }
    write(o) {
        const c = o.jsonDoc;
        if (this.properties.size === 0)
            return this;
        const h = []
          , _ = new Map;
        for (const b of this.properties) {
            const _e = b
              , nt = {
                type: _e.getType()
            };
            index_modern_MathUtils.eq(_e.getColor(), [1, 1, 1]) || (nt.color = _e.getColor()),
            _e.getIntensity() !== 1 && (nt.intensity = _e.getIntensity()),
            _e.getRange() != null && (nt.range = _e.getRange()),
            _e.getName() && (nt.name = _e.getName()),
            _e.getType() === Light.Type.SPOT && (nt.spot = {
                innerConeAngle: _e.getInnerConeAngle(),
                outerConeAngle: _e.getOuterConeAngle()
            }),
            h.push(nt),
            _.set(_e, h.length - 1)
        }
        return this.document.getRoot().listNodes().forEach(b => {
            const _e = b.getExtension(NAME$i);
            if (_e) {
                const nt = o.nodeIndexMap.get(b)
                  , it = c.json.nodes[nt];
                it.extensions = it.extensions || {},
                it.extensions[NAME$i] = {
                    light: _.get(_e)
                }
            }
        }
        ),
        c.json.extensions = c.json.extensions || {},
        c.json.extensions[NAME$i] = {
            lights: h
        },
        this
    }
}

export default KHRLightsPunctual;
