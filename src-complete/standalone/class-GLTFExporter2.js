/* Standalone Class: GLTFExporter2 */

class GLTFExporter2 extends GLTFExporter {
    register(o) {
        return super.register(o)
    }
    async parseAsync(o, c) {
        var h;
        if (!o)
            throw new Error("No object to export");
        const _ = o.__isGLTFOutput || !Array.isArray(o) && !o.isObject3D ? o : await new Promise( (b, _e) => this.parse(o, b, _e, c));
        if (_ && typeof _ == "object" && !_.byteLength)
            return new Blob([JSON.stringify(_, (b, _e) => b.startsWith("__") ? void 0 : _e, (h = c.jsonSpaces) !== null && h !== void 0 ? h : 2)],{
                type: "model/gltf+json"
            });
        if (_) {
            let b = null;
            return c.encrypt && (!c.encryptKey && window.prompt && (c.encryptKey = window.prompt("GLTFEncryption: Enter encryption key") || ""),
            c.encryptKey ? b = makeGLBFile(await Te$1(new Uint8Array(_), c.encryptKey), {
                asset: {
                    version: "2.0",
                    generator: "WebGiGLBWrapper",
                    encryption: {
                        type: "aesgcm",
                        version: 1
                    }
                }
            }) : console.warn("WebGi GLTF Export: encryption key not provided, skipping encryption")),
            b || (b = new Blob([_],{
                type: "model/gltf+binary"
            })),
            b
        }
        throw new Error("GLTFExporter2.parse() failed")
    }
    parse(o, c, h, _={}) {
        var b, _e, nt, it, at, ut, pt;
        const ht = {
            binary: !1,
            trs: (b = _.trs) !== null && b !== void 0 && b,
            onlyVisible: (_e = _.onlyVisible) !== null && _e !== void 0 && _e,
            truncateDrawRange: (nt = _.truncateDrawRange) === null || nt === void 0 || nt,
            externalImagesInExtras: !_.embedUrlImages && _.externalImagesInExtras || !1,
            embedUrlImages: (it = _.embedUrlImages) !== null && it !== void 0 && it,
            maxTextureSize: (at = _.maxTextureSize) !== null && at !== void 0 ? at : 1 / 0,
            animations: (ut = _.animations) !== null && ut !== void 0 ? ut : [],
            includeCustomExtensions: (pt = _.includeCustomExtensions) === null || pt === void 0 || pt,
            exporterOptions: _,
            ignoreInvalidMorphTargetTracks: _.ignoreInvalidMorphTargetTracks,
            ignoreEmptyTextures: _.ignoreEmptyTextures
        };
        return _.exportExt === "glb" && (ht.binary = !0),
        _.preserveUUIDs !== !1 && (Array.isArray(o) ? o : [o]).forEach(_t => _t.traverse(vt => {
            vt.uuid && (vt.userData.gltfUUID = vt.uuid)
        }
        )),
        (Array.isArray(o) ? o : [o]).forEach(_t => _t.traverse(vt => {
            if (vt.animations)
                for (const bt of vt.animations)
                    bt.__gltfExport === !1 || ht.animations.includes(bt) || ht.animations.push(...vt.animations)
        }
        )),
        super.parse(o, _t => {
            _.preserveUUIDs !== !1 && (Array.isArray(o) ? o : [o]).forEach(vt => vt.traverse(bt => {
                delete bt.userData.gltfUUID
            }
            )),
            c(Object.assign(_t, {
                __isGLTFOutput: !0
            }))
        }
        , h, ht, new GLTFWriter2)
    }
}

export default GLTFExporter2;
