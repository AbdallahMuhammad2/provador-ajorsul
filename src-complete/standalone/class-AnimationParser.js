/* Standalone Class: AnimationParser */

class AnimationParser {
    parse() {
        const o = []
          , c = this.parseClips();
        if (c !== void 0)
            for (const h in c) {
                const _ = c[h]
                  , b = this.addClip(_);
                o.push(b)
            }
        return o
    }
    parseClips() {
        if (fbxTree.Objects.AnimationCurve === void 0)
            return;
        const o = this.parseAnimationCurveNodes();
        this.parseAnimationCurves(o);
        const c = this.parseAnimationLayers(o);
        return this.parseAnimStacks(c)
    }
    parseAnimationCurveNodes() {
        const o = fbxTree.Objects.AnimationCurveNode
          , c = new Map;
        for (const h in o) {
            const _ = o[h];
            if (_.attrName.match(/S|R|T|DeformPercent/) !== null) {
                const b = {
                    id: _.id,
                    attr: _.attrName,
                    curves: {}
                };
                c.set(b.id, b)
            }
        }
        return c
    }
    parseAnimationCurves(o) {
        const c = fbxTree.Objects.AnimationCurve;
        for (const h in c) {
            const _ = {
                id: c[h].id,
                times: c[h].KeyTime.a.map(convertFBXTimeToSeconds),
                values: c[h].KeyValueFloat.a
            }
              , b = connections.get(_.id);
            if (b !== void 0) {
                const _e = b.parents[0].ID
                  , nt = b.parents[0].relationship;
                nt.match(/X/) ? o.get(_e).curves.x = _ : nt.match(/Y/) ? o.get(_e).curves.y = _ : nt.match(/Z/) ? o.get(_e).curves.z = _ : nt.match(/DeformPercent/) && o.has(_e) && (o.get(_e).curves.morph = _)
            }
        }
    }
    parseAnimationLayers(o) {
        const c = fbxTree.Objects.AnimationLayer
          , h = new Map;
        for (const _ in c) {
            const b = []
              , _e = connections.get(parseInt(_));
            _e !== void 0 && (_e.children.forEach(function(nt, it) {
                if (o.has(nt.ID)) {
                    const at = o.get(nt.ID);
                    if (at.curves.x !== void 0 || at.curves.y !== void 0 || at.curves.z !== void 0) {
                        if (b[it] === void 0) {
                            const ut = connections.get(nt.ID).parents.filter(function(pt) {
                                return pt.relationship !== void 0
                            })[0].ID;
                            if (ut !== void 0) {
                                const pt = fbxTree.Objects.Model[ut.toString()];
                                if (pt === void 0)
                                    return void console.warn("THREE.FBXLoader: Encountered a unused curve.", nt);
                                const ht = {
                                    modelName: pt.attrName ? three_module.Nwf.sanitizeNodeName(pt.attrName) : "",
                                    ID: pt.id,
                                    initialPosition: [0, 0, 0],
                                    initialRotation: [0, 0, 0],
                                    initialScale: [1, 1, 1]
                                };
                                sceneGraph.traverse(function(_t) {
                                    _t.ID === pt.id && (ht.transform = _t.matrix,
                                    _t.userData.transformData && (ht.eulerOrder = _t.userData.transformData.eulerOrder))
                                }),
                                ht.transform || (ht.transform = new three_module.kn4),
                                "PreRotation"in pt && (ht.preRotation = pt.PreRotation.value),
                                "PostRotation"in pt && (ht.postRotation = pt.PostRotation.value),
                                b[it] = ht
                            }
                        }
                        b[it] && (b[it][at.attr] = at)
                    } else if (at.curves.morph !== void 0) {
                        if (b[it] === void 0) {
                            const ut = connections.get(nt.ID).parents.filter(function(St) {
                                return St.relationship !== void 0
                            })[0].ID
                              , pt = connections.get(ut).parents[0].ID
                              , ht = connections.get(pt).parents[0].ID
                              , _t = connections.get(ht).parents[0].ID
                              , vt = fbxTree.Objects.Model[_t]
                              , bt = {
                                modelName: vt.attrName ? three_module.Nwf.sanitizeNodeName(vt.attrName) : "",
                                morphName: fbxTree.Objects.Deformer[ut].attrName
                            };
                            b[it] = bt
                        }
                        b[it][at.attr] = at
                    }
                }
            }),
            h.set(parseInt(_), b))
        }
        return h
    }
    parseAnimStacks(o) {
        const c = fbxTree.Objects.AnimationStack
          , h = {};
        for (const _ in c) {
            const b = connections.get(parseInt(_)).children;
            b.length > 1 && console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");
            const _e = o.get(b[0].ID);
            h[_] = {
                name: c[_].attrName,
                layer: _e
            }
        }
        return h
    }
    addClip(o) {
        let c = [];
        const h = this;
        return o.layer.forEach(function(_) {
            c = c.concat(h.generateTracks(_))
        }),
        new three_module.tz3(o.name,-1,c)
    }
    generateTracks(o) {
        const c = [];
        let h = new three_module.Pq0
          , _ = new three_module.PTz
          , b = new three_module.Pq0;
        if (o.transform && o.transform.decompose(h, _, b),
        h = h.toArray(),
        _ = new three_module.O9p().setFromQuaternion(_, o.eulerOrder).toArray(),
        b = b.toArray(),
        o.T !== void 0 && Object.keys(o.T.curves).length > 0) {
            const _e = this.generateVectorTrack(o.modelName, o.T.curves, h, "position");
            _e !== void 0 && c.push(_e)
        }
        if (o.R !== void 0 && Object.keys(o.R.curves).length > 0) {
            const _e = this.generateRotationTrack(o.modelName, o.R.curves, _, o.preRotation, o.postRotation, o.eulerOrder);
            _e !== void 0 && c.push(_e)
        }
        if (o.S !== void 0 && Object.keys(o.S.curves).length > 0) {
            const _e = this.generateVectorTrack(o.modelName, o.S.curves, b, "scale");
            _e !== void 0 && c.push(_e)
        }
        if (o.DeformPercent !== void 0) {
            const _e = this.generateMorphTrack(o);
            _e !== void 0 && c.push(_e)
        }
        return c
    }
    generateVectorTrack(o, c, h, _) {
        const b = this.getTimesForAllAxes(c)
          , _e = this.getKeyframeTrackValues(b, c, h);
        return new three_module.RiT(o + "." + _,b,_e)
    }
    generateRotationTrack(o, c, h, _, b, _e) {
        c.x !== void 0 && (this.interpolateRotations(c.x),
        c.x.values = c.x.values.map(three_module.cj9.degToRad)),
        c.y !== void 0 && (this.interpolateRotations(c.y),
        c.y.values = c.y.values.map(three_module.cj9.degToRad)),
        c.z !== void 0 && (this.interpolateRotations(c.z),
        c.z.values = c.z.values.map(three_module.cj9.degToRad));
        const nt = this.getTimesForAllAxes(c)
          , it = this.getKeyframeTrackValues(nt, c, h);
        _ !== void 0 && ((_ = _.map(three_module.cj9.degToRad)).push(_e),
        _ = new three_module.O9p().fromArray(_),
        _ = new three_module.PTz().setFromEuler(_)),
        b !== void 0 && ((b = b.map(three_module.cj9.degToRad)).push(_e),
        b = new three_module.O9p().fromArray(b),
        b = new three_module.PTz().setFromEuler(b).invert());
        const at = new three_module.PTz
          , ut = new three_module.O9p
          , pt = [];
        for (let ht = 0; ht < it.length; ht += 3)
            ut.set(it[ht], it[ht + 1], it[ht + 2], _e),
            at.setFromEuler(ut),
            _ !== void 0 && at.premultiply(_),
            b !== void 0 && at.multiply(b),
            at.toArray(pt, ht / 3 * 4);
        return new three_module.MBL(o + ".quaternion",nt,pt)
    }
    generateMorphTrack(o) {
        const c = o.DeformPercent.curves.morph
          , h = c.values.map(function(b) {
            return b / 100
        })
          , _ = sceneGraph.getObjectByName(o.modelName).morphTargetDictionary[o.morphName];
        return new three_module.Hit(o.modelName + ".morphTargetInfluences[" + _ + "]",c.times,h)
    }
    getTimesForAllAxes(o) {
        let c = [];
        if (o.x !== void 0 && (c = c.concat(o.x.times)),
        o.y !== void 0 && (c = c.concat(o.y.times)),
        o.z !== void 0 && (c = c.concat(o.z.times)),
        c = c.sort(function(h, _) {
            return h - _
        }),
        c.length > 1) {
            let h = 1
              , _ = c[0];
            for (let b = 1; b < c.length; b++) {
                const _e = c[b];
                _e !== _ && (c[h] = _e,
                _ = _e,
                h++)
            }
            c = c.slice(0, h)
        }
        return c
    }
    getKeyframeTrackValues(o, c, h) {
        const _ = h
          , b = [];
        let _e = -1
          , nt = -1
          , it = -1;
        return o.forEach(function(at) {
            if (c.x && (_e = c.x.times.indexOf(at)),
            c.y && (nt = c.y.times.indexOf(at)),
            c.z && (it = c.z.times.indexOf(at)),
            _e !== -1) {
                const ut = c.x.values[_e];
                b.push(ut),
                _[0] = ut
            } else
                b.push(_[0]);
            if (nt !== -1) {
                const ut = c.y.values[nt];
                b.push(ut),
                _[1] = ut
            } else
                b.push(_[1]);
            if (it !== -1) {
                const ut = c.z.values[it];
                b.push(ut),
                _[2] = ut
            } else
                b.push(_[2])
        }),
        b
    }
    interpolateRotations(o) {
        for (let c = 1; c < o.values.length; c++) {
            const h = o.values[c - 1]
              , _ = o.values[c] - h
              , b = Math.abs(_);
            if (b >= 180) {
                const _e = b / 180
                  , nt = _ / _e;
                let it = h + nt;
                const at = o.times[c - 1]
                  , ut = (o.times[c] - at) / _e;
                let pt = at + ut;
                const ht = []
                  , _t = [];
                for (; pt < o.times[c]; )
                    ht.push(pt),
                    pt += ut,
                    _t.push(it),
                    it += nt;
                o.times = inject(o.times, c, ht),
                o.values = inject(o.values, c, _t)
            }
        }
    }
}

export default AnimationParser;
