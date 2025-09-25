/* Standalone Constant: mt */

const mt = {
                    nodeName: lt[2],
                    objectName: lt[3],
                    objectIndex: lt[4],
                    propertyName: lt[5],
                    propertyIndex: lt[6]
                }
                  , ft = mt.nodeName && mt.nodeName.lastIndexOf(".");
                if (ft !== void 0 && ft !== -1) {
                    const xt = mt.nodeName.substring(ft + 1);
                    WS.indexOf(xt) !== -1 && (mt.nodeName = mt.nodeName.substring(0, ft),
                    mt.objectName = xt)
                }
                if (mt.propertyName === null || mt.propertyName.length === 0)
                    throw new Error("PropertyBinding: can not parse propertyName from trackName: " + tt);
                return mt
            }
            static findNode(tt, lt) {
                if (lt === void 0 || lt === "" || lt === "." || lt === -1 || lt === tt.name || lt === tt.uuid)
                    return tt;
                if (tt.skeleton) {
                    const mt = tt.skeleton.getBoneByName(lt);
                    if (mt !== void 0)
                        return mt
                }
                if (tt.children) {
                    const mt = function(xt) {
                        for (let Ct = 0; Ct < xt.length; Ct++) {
                            const Mt = xt[Ct];
                            if (Mt.name === lt || Mt.uuid === lt)
                                return Mt;
                            const Lt = mt(Mt.children);
                            if (Lt)
                                return Lt
                        }
                        return null
                    }
                      , ft = mt(tt.children);
                    if (ft)
                        return ft
                }
                return null
            }
            _getValue_unavailable() {}
            _setValue_unavailable() {}
            _getValue_direct(tt, lt) {
                tt[lt] = this.targetObject[this.propertyName]
            }
            _getValue_array(tt, lt) {
                const mt = this.resolvedProperty;
                for (let ft = 0, xt = mt.length; ft !== xt; ++ft)
                    tt[lt++] = mt[ft]
            }
            _getValue_arrayElement(tt, lt) {
                tt[lt] = this.resolvedProperty[this.propertyIndex]
            }
            _getValue_toArray(tt, lt) {
                this.resolvedProperty.toArray(tt, lt)
            }
            _setValue_direct(tt, lt) {
                this.targetObject[this.propertyName] = tt[lt]
            }
            _setValue_direct_setNeedsUpdate(tt, lt) {
                this.targetObject[this.propertyName] = tt[lt],
                this.targetObject.needsUpdate = !0
            }
            _setValue_direct_setMatrixWorldNeedsUpdate(tt, lt) {
                this.targetObject[this.propertyName] = tt[lt],
                this.targetObject.matrixWorldNeedsUpdate = !0
            }
            _setValue_array(tt, lt) {
                const mt = this.resolvedProperty;
                for (let ft = 0, xt = mt.length; ft !== xt; ++ft)
                    mt[ft] = tt[lt++]
            }
            _setValue_array_setNeedsUpdate(tt, lt) {
                const mt = this.resolvedProperty;
                for (let ft = 0, xt = mt.length; ft !== xt; ++ft)
                    mt[ft] = tt[lt++];
                this.targetObject.needsUpdate = !0
            }
            _setValue_array_setMatrixWorldNeedsUpdate(tt, lt) {
                const mt = this.resolvedProperty;
                for (let ft = 0, xt = mt.length; ft !== xt; ++ft)
                    mt[ft] = tt[lt++];
                this.targetObject.matrixWorldNeedsUpdate = !0
            }
            _setValue_arrayElement(tt, lt) {
                this.resolvedProperty[this.propertyIndex] = tt[lt]
            }
            _setValue_arrayElement_setNeedsUpdate(tt, lt) {
                this.resolvedProperty[this.propertyIndex] = tt[lt],
                this.targetObject.needsUpdate = !0
            }
            _setValue_arrayElement_setMatrixWorldNeedsUpdate(tt, lt) {
                this.resolvedProperty[this.propertyIndex] = tt[lt],
                this.targetObject.matrixWorldNeedsUpdate = !0
            }
            _setValue_fromArray(tt, lt) {
                this.resolvedProperty.fromArray(tt, lt)
            }
            _setValue_fromArray_setNeedsUpdate(tt, lt) {
                this.resolvedProperty.fromArray(tt, lt),
                this.targetObject.needsUpdate = !0
            }
            _setValue_fromArray_setMatrixWorldNeedsUpdate(tt, lt) {
                this.resolvedProperty.fromArray(tt, lt),
                this.targetObject.matrixWorldNeedsUpdate = !0
            }
            _getValue_unbound(tt, lt) {
                this.bind(),
                this.getValue(tt, lt)
            }
            _setValue_unbound(tt, lt) {
                this.bind(),
                this.setValue(tt, lt)
            }
            bind() {
                let tt = this.node;
                const lt = this.parsedPath
                  , mt = lt.objectName
                  , ft = lt.propertyName;
                let xt = lt.propertyIndex;
                if (tt || (tt = Ro.findNode(this.rootNode, lt.nodeName),
                this.node = tt),
                this.getValue = this._getValue_unavailable,
                this.setValue = this._setValue_unavailable,
                !tt)
                    return void console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + ".");
                if (mt) {
                    let Nt = lt.objectIndex;
                    switch (mt) {
                    case "materials":
                        if (!tt.material)
                            return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
                        if (!tt.material.materials)
                            return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
                        tt = tt.material.materials;
                        break;
                    case "bones":
                        if (!tt.skeleton)
                            return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
                        tt = tt.skeleton.bones;
                        for (let jt = 0; jt < tt.length; jt++)
                            if (tt[jt].name === Nt) {
                                Nt = jt;
                                break
                            }
                        break;
                    case "map":
                        if ("map"in tt) {
                            tt = tt.map;
                            break
                        }
                        if (!tt.material)
                            return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
                        if (!tt.material.map)
                            return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
                        tt = tt.material.map;
                        break;
                    default:
                        if (tt[mt] === void 0)
                            return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
                        tt = tt[mt]
                    }
                    if (Nt !== void 0) {
                        if (tt[Nt] === void 0)
                            return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, tt);
                        tt = tt[Nt]
                    }
                }
                const Ct = tt[ft];
                if (Ct === void 0) {
                    const Nt = lt.nodeName;
                    return void console.error("THREE.PropertyBinding: Trying to update property for track: " + Nt + "." + ft + " but it wasn't found.", tt)
                }
                let Mt = this.Versioning.None;
                this.targetObject = tt,
                tt.needsUpdate !== void 0 ? Mt = this.Versioning.NeedsUpdate : tt.matrixWorldNeedsUpdate !== void 0 && (Mt = this.Versioning.MatrixWorldNeedsUpdate);
                let Lt = this.BindingType.Direct;
                if (xt !== void 0) {
                    if (ft === "morphTargetInfluences") {
                        if (!tt.geometry)
                            return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
                        if (!tt.geometry.morphAttributes)
                            return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
                        tt.morphTargetDictionary[xt] !== void 0 && (xt = tt.morphTargetDictionary[xt])
                    }
                    Lt = this.BindingType.ArrayElement,
                    this.resolvedProperty = Ct,
                    this.propertyIndex = xt
                } else
                    Ct.fromArray !== void 0 && Ct.toArray !== void 0 ? (Lt = this.BindingType.HasFromToArray,
                    this.resolvedProperty = Ct) : Array.isArray(Ct) ? (Lt = this.BindingType.EntireArray,
                    this.resolvedProperty = Ct) : this.propertyName = ft;
                this.getValue = this.GetterByBindingType[Lt],
                this.setValue = this.SetterByBindingTypeAndVersioning[Lt][Mt]
            }
            unbind() {
                this.node = null,
                this.getValue = this._getValue_unbound,
                this.setValue = this._setValue_unbound
            }
        }
        Ro.Composite = class {
            constructor(Tt, tt, lt) {
                const mt = lt || Ro.parseTrackName(tt);
                this._targetGroup = Tt,
                this._bindings = Tt.subscribe_(tt, mt)
            }
            getValue(Tt, tt) {
                this.bind();
                const lt = this._targetGroup.nCachedObjects_
                  , mt = this._bindings[lt];
                mt !== void 0 && mt.getValue(Tt, tt)
            }
            setValue(Tt, tt) {
                const lt = this._bindings;
                for (let mt = this._targetGroup.nCachedObjects_, ft = lt.length; mt !== ft; ++mt)
                    lt[mt].setValue(Tt, tt)
            }
            bind() {
                const Tt = this._bindings;
                for (let tt = this._targetGroup.nCachedObjects_, lt = Tt.length; tt !== lt; ++tt)
                    Tt[tt].bind()
            }
            unbind() {
                const Tt = this._bindings;
                for (let tt = this._targetGroup.nCachedObjects_, lt = Tt.length; tt !== lt; ++tt)
                    Tt[tt].unbind()
            }
        }
        ,
        Ro.prototype.BindingType = {
            Direct: 0,
            EntireArray: 1,
            ArrayElement: 2,
            HasFromToArray: 3
        },
        Ro.prototype.Versioning = {
            None: 0,
            NeedsUpdate: 1,
            MatrixWorldNeedsUpdate: 2
        },
        Ro.prototype.GetterByBindingType = [Ro.prototype._getValue_direct, Ro.prototype._getValue_array, Ro.prototype._getValue_arrayElement, Ro.prototype._getValue_toArray],
        Ro.prototype.SetterByBindingTypeAndVersioning = [[Ro.prototype._setValue_direct, Ro.prototype._setValue_direct_setNeedsUpdate, Ro.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [Ro.prototype._setValue_array, Ro.prototype._setValue_array_setNeedsUpdate, Ro.prototype._setValue_array_setMatrixWorldNeedsUpdate], [Ro.prototype._setValue_arrayElement, Ro.prototype._setValue_arrayElement_setNeedsUpdate, Ro.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [Ro.prototype._setValue_fromArray, Ro.prototype._setValue_fromArray_setNeedsUpdate, Ro.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];
        class qS {
            constructor() {
                this.isAnimationObjectGroup = !0,
                this.uuid = Ms(),
                this._objects = Array.prototype.slice.call(arguments),
                this.nCachedObjects_ = 0;
                const tt = {};

export default mt;
