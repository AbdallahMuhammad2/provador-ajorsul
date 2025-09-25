/* Standalone Class: MaterialExtender */

class MaterialExtender {
    static ApplyMaterialExtensions(o, c, h, _) {
        for (const b of h)
            this.ApplyMaterialExtension(o, c, b, _)
    }
    static ApplyMaterialExtension(o, c, h, _) {
        var b, _e;
        let nt = (b = Ee$1(h.parsFragmentSnippet, _, o)) !== null && b !== void 0 ? b : "";
        nt.length && (c.fragmentShader = shaderReplaceString(c.fragmentShader, this.VoidMain, `
` + nt + `
`, {
            prepend: !0
        })),
        nt = (_e = Ee$1(h.parsVertexSnippet, _, o)) !== null && _e !== void 0 ? _e : "",
        nt.length && (c.vertexShader = shaderReplaceString(c.vertexShader, this.VoidMain, `
` + nt + `
`, {
            prepend: !0
        })),
        h.extraUniforms && (c.uniforms = Object.assign(c.uniforms, h.extraUniforms)),
        h.extraDefines && updateMaterialDefines(h.extraDefines, o),
        h.shaderExtender && h.shaderExtender(c, o, _),
        o.lastShader = c
    }
    static CacheKeyForExtensions(o, c) {
        let h = "";
        for (const _ of c)
            h += this.CacheKeyForExtension(o, _);
        return h
    }
    static CacheKeyForExtension(o, c) {
        let h = "";
        return c.customCacheKey && (h += c.customCacheKey),
        c.computeCacheKey && (h += c.computeCacheKey(o)),
        c.extraDefines && Object.values(c.extraDefines).forEach(_ => h += _),
        h
    }
    static RegisterExtensions(o, c) {
        const h = [];
        if (c)
            for (const _ of c)
                _.isCompatible && _.isCompatible(o) && (h.push(_),
                _.uuid || (_.uuid = esm_browser_v4()),
                _.__setDirty || (_.__setDirty = () => {
                    _.updateVersion || (_.updateVersion = 0),
                    _.updateVersion++
                }
                ),
                _.setDirty || (_.setDirty = _.__setDirty));
        o.materialExtensions = h,
        o.__ext_beforeRenderListen || (o.__ext_beforeRenderListen = !0,
        o.addEventListener("beforeRender", _ => materialBeforeRender(o, _))),
        o.__ext_afterRenderListen || (o.__ext_afterRenderListen = !0,
        o.addEventListener("afterRender", _ => materialAfterRender(o, _))),
        o.__ext_addToMeshListen || (o.__ext_addToMeshListen = !0,
        o.addEventListener("addToMesh", _ => {
            var b, _e;
            if (o.materialExtensions)
                for (const nt of o.materialExtensions)
                    (b = nt.onAddToMesh) === null || b === void 0 || b.call(nt, (_e = _.mesh) !== null && _e !== void 0 ? _e : _.object, o)
        }
        )),
        o.__ext_removeFromMeshListen || (o.__ext_removeFromMeshListen = !0,
        o.addEventListener("removeFromMesh", _ => {
            var b, _e;
            if (o.materialExtensions)
                for (const nt of o.materialExtensions)
                    (b = nt.onRemoveFromMesh) === null || b === void 0 || b.call(nt, (_e = _.mesh) !== null && _e !== void 0 ? _e : _.object, o)
        }
        )),
        o.__ext_materialUpdateListen || (o.__ext_materialUpdateListen = !0,
        o.addEventListener("materialUpdate", _ => {
            var b;
            if (o.materialExtensions)
                for (const _e of o.materialExtensions)
                    (b = _e.onMaterialUpdate) === null || b === void 0 || b.call(_e, o)
        }
        ));
        for (const _ of h)
            _.onRegister && _.onRegister(o);
        return h
    }
}

export default MaterialExtender;
