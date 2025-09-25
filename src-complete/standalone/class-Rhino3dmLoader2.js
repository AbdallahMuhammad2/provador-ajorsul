/* Standalone Class: Rhino3dmLoader2 */

class Rhino3dmLoader2 extends Rhino3dmLoader {
    constructor(o) {
        super(o),
        this.materials = [],
        this.setLibraryPath(Rhino3dmLoader2.LIBRARY_PATH)
    }
    _createMaterial(o) {
        return Rhino3dmLoader2.ImportMaterials ? super._createMaterial(o) : this.materials[0] || new three_module._4j({
            color: new three_module.Q1f(1,1,1),
            metalness: .8,
            name: three_module.aHM.DEFAULT_MATERIAL_NAME,
            side: three_module.$EB
        })
    }
    async loadAsync(o, c) {
        const h = await super.loadAsync(o, c);
        h.rotateX(-Math.PI / 2),
        h.userData.materials && delete h.userData.materials;
        const _ = h.userData.layers;
        return h.traverse(b => {
            var _e, nt, it, at, ut;
            const pt = (_e = b.userData.attributes) === null || _e === void 0 ? void 0 : _e.castsShadows
              , ht = (nt = b.userData.attributes) === null || nt === void 0 ? void 0 : nt.receivesShadows;
            b.castShadow = pt,
            b.receiveShadow = ht;
            const _t = (at = (it = b.userData.attributes) === null || it === void 0 ? void 0 : it.layerIndex) !== null && at !== void 0 ? at : (ut = b.userData.defAttributes) === null || ut === void 0 ? void 0 : ut.layerIndex
              , vt = _[_t];
            vt && (b.userData.rhinoLayer = vt),
            b.userData.rhino3dmRoot = h.uuid,
            Rhino3dmLoader2.LoadUserDataStrings || (b.userData.strings = []),
            Rhino3dmLoader2.LoadUserDataWarnings || delete b.userData.warnings,
            this._hideLineMesh(b),
            this._useInstancedMesh(b),
            this._useMaterialSource(b, vt)
        }
        ),
        this.materials = [],
        h
    }
    _useMaterialSource(o, c) {
        var h, _, b, _e, nt;
        if (!Rhino3dmLoader2.ImportMaterials)
            return;
        const it = o;
        if (((h = it.material) === null || h === void 0 ? void 0 : h.name) === "default" || Rhino3dmLoader2.ForceLayerMaterials) {
            const at = ((_ = it.userData.attributes) === null || _ === void 0 ? void 0 : _.materialSource) || ((b = it.userData.defAttributes) === null || b === void 0 ? void 0 : b.materialSource)
              , ut = ((_e = it.userData.attributes) === null || _e === void 0 ? void 0 : _e.colorSource) || ((nt = it.userData.defAttributes) === null || nt === void 0 ? void 0 : nt.colorSource);
            if (!Rhino3dmLoader2.ForceLayerMaterials && !at && !ut)
                return;
            Rhino3dmLoader2.ForceLayerMaterials || (at == null ? void 0 : at.value) === 0 || (at == null ? void 0 : at.value) === 1 && (ut == null ? void 0 : ut.value) === 0 ? c && (it.material = this._compareMaterials(this._createMaterial({
                diffuseColor: c.color,
                name: c.name,
                emissionColor: {
                    r: 0,
                    g: 0,
                    b: 0
                },
                disableLighting: !1,
                indexOfRefraction: 1.5,
                reflectivity: 1,
                transparency: 0,
                specularColor: {
                    r: 0,
                    g: 0,
                    b: 0
                },
                textures: []
            }))) : (at == null ? void 0 : at.value) === 3 || (at == null ? void 0 : at.value) === 1 && (ut == null ? void 0 : ut.value) === 3 ? it.traverseAncestors(pt => {
                pt != null && pt.material && (it.material = pt.material)
            }
            ) : at && at.value !== 1 && console.warn("Unknown material source", at, it, it.userData.attributes)
        }
    }
    _useInstancedMesh(o) {
        if (!Rhino3dmLoader2.ReplaceWithInstancedMesh || o.children.length <= 0)
            return;
        const c = o.children
          , h = c.map(b => b.geometry);
        h.filter( (b, _e) => h.indexOf(b) === _e).forEach(b => {
            var _e;
            const nt = c.filter(at => at.geometry === b)
              , it = nt.length > 0 ? nt.filter(at => at.material === nt[0].material) : [];
            if (it.length > 1) {
                const at = new three_module.ZLX(b,it[0].material,it.length);
                at.userData = {
                    ...it[0].userData
                },
                at.userData.instanceUserData = [],
                at.userData.attributes = at.userData.defAttributes || at.userData.attributes,
                at.userData.defAttributes && delete at.userData.defAttributes,
                at.name = ((_e = at.userData.attributes) === null || _e === void 0 ? void 0 : _e.name) || it[0].name,
                it.forEach( (ut, pt) => {
                    at.setMatrixAt(pt, ut.matrix),
                    o.remove(ut),
                    at.userData.instanceUserData.push(ut.userData)
                }
                ),
                o.add(at)
            }
        }
        )
    }
    _hideLineMesh(o) {
        if (!Rhino3dmLoader2.HideLineMesh && !Rhino3dmLoader2.HidePointMesh || o.children.length <= 0)
            return;
        const c = [];
        o.traverse(h => {
            (h && Rhino3dmLoader2.HideLineMesh && (h.isLine || h.isLineSegments) || Rhino3dmLoader2.HidePointMesh && h.isPoints) && c.push(h)
        }
        ),
        c.forEach(h => {
            h.userData.visible_3dm = h.visible,
            h.visible = !1
        }
        )
    }
}

export default Rhino3dmLoader2;
