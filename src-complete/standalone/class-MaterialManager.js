/* Standalone Class: MaterialManager */

class MaterialManager extends AMaterialManager {
    _generateFromTemplate(o, c) {
        var h, _, b, _e, nt, it;
        let at;
        const ut = {
            ...o
        };
        ut.customMaterialExtensions = [...(h = ut.customMaterialExtensions) !== null && h !== void 0 ? h : [], ...this._materialExtensions];
        const pt = (c == null ? void 0 : c.metadata) && (c == null ? void 0 : c.metadata.version) <= 4.5;
        pt && (three_module.ppV.enabled = !1);
        let ht = {};
        switch (o.materialType) {
        case "MeshStandardMaterial2":
        case "standard":
            c && xe$1(c, ut, Array.from(Object.keys(physicalMaterialPropList))),
            (c == null ? void 0 : c.type) === "MeshBasicMaterial" && (ut.roughness = .9,
            ut.metalness = 0,
            !((_ = ut.userData) === null || _ === void 0) && _.uuid && delete ut.userData.uuid),
            ht = (b = ut.userData) === null || b === void 0 ? void 0 : b.uuid,
            ht && delete ut.userData.uuid,
            at = new MeshStandardMaterial2({
                customMaterialExtensions: ut.customMaterialExtensions
            }).fromJSON(ut, void 0, !0),
            ht && (at.uuid = ht),
            at.userData.uuid = at.uuid,
            at.setDirty(),
            c != null && c.isMaterial && c.userData !== void 0 && (c.userData.iMaterial = at);
            break;
        case "MeshBasicMaterial2":
        case "basic":
        case "unlit":
            c && xe$1(c, ut, Array.from(Object.keys(basicMaterialPropList))),
            ht = (_e = ut.userData) === null || _e === void 0 ? void 0 : _e.uuid,
            ht && delete ut.userData.uuid,
            at = new MeshBasicMaterial2({
                customMaterialExtensions: ut.customMaterialExtensions
            }).fromJSON(ut, void 0, !0),
            ht && (at.uuid = ht,
            ut.userData.uuid = ht),
            at.userData.uuid = at.uuid,
            at.setDirty();
            break;
        case "shadow":
            throw "TODO: Not implemented shadow material";
        default:
            ht = null,
            c && c.userData && (ht = c.userData,
            delete c.userData),
            at = ((nt = o.generator) === null || nt === void 0 ? void 0 : nt.call(o, ut, c)) || void 0,
            c && ht && (c.userData = ht),
            ht && at && (copyMaterialUserData(at.userData, ht),
            ht != null && ht.uuid && (at.uuid = ht.uuid),
            ht = null),
            at && (at.userData.uuid = at.uuid)
        }
        if (at) {
            c.runtimeMaterial && (at.userData.runtimeMaterial = !0);
            const _t = at;
            if (at.clone = () => {
                _t.userData.cloneId || (_t.userData.cloneId = "0"),
                _t.userData.cloneCount || (_t.userData.cloneCount = 0),
                _t.userData.cloneCount += 1;
                const vt = this.generateFromTemplate(o.name);
                return vt && (vt.copyProps(_t),
                vt.userData.cloneId = vt.userData.cloneId + "_" + _t.userData.cloneCount,
                vt.userData.cloneCount = 0,
                vt.name = vt.name + "_" + vt.userData.cloneId,
                vt.userData.uuid = vt.uuid),
                vt == null ? void 0 : vt.materialObject
            }
            ,
            c) {
                let vt = this.findMaterial(c == null ? void 0 : c.uuid);
                vt && this.unregisterMaterial(vt),
                vt = this.findMaterial((it = c == null ? void 0 : c.materialObject) === null || it === void 0 ? void 0 : it.uuid),
                vt && this.unregisterMaterial(vt)
            }
        }
        return pt && (three_module.ppV.enabled = !0),
        at ? this.registerMaterialObject(at) : void 0
    }
    _processModel(o, c) {
        if (!o.modelObject)
            return console.error("MaterialManager: No modelObject found for ", o),
            o;
        let h = o.material;
        if (!h && o.geometry && (this._defaultMaterial || (this._defaultMaterial = this.generateFromTemplate("standard")),
        h = this._defaultMaterial,
        o.material = h),
        h) {
            let _ = !0;
            Array.isArray(h) || (h = [h],
            _ = !1);
            const b = [];
            for (const _e of h) {
                const nt = this._processMaterial(_e, c);
                b.push(nt == null ? void 0 : nt.materialObject)
            }
            o.setMaterial && (o.modelObject.material = null,
            o.setMaterial(_ ? b : b[0]))
        }
        if (c.recursive !== !1)
            for (let _ = 0; _ < o.modelObject.children.length; _++)
                o.modelObject.children[_] = this._processModel(o.modelObject.children[_], c);
        return o
    }
}

export default MaterialManager;
