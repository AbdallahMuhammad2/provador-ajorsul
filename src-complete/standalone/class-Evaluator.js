/* Standalone Class: Evaluator */

class Evaluator {
    constructor() {
        this.triangleSplitter = new TriangleSplitter,
        this.attributeData = [],
        this.attributes = ["position", "uv", "normal"],
        this.useGroups = !0,
        this.consolidateGroups = !0,
        this.debug = new OperationDebugData
    }
    getGroupRanges(o) {
        return this.useGroups && o.groups.length !== 0 ? o.groups.map(c => ({
            ...c
        })) : [{
            start: 0,
            count: 1 / 0,
            materialIndex: 0
        }]
    }
    evaluate(o, c, h, _=new Brush) {
        let b = !0;
        if (Array.isArray(h) || (h = [h]),
        Array.isArray(_) || (_ = [_],
        b = !1),
        _.length !== h.length)
            throw new Error("Evaluator: operations and target array passed as different sizes.");
        o.prepareGeometry(),
        c.prepareGeometry();
        const {triangleSplitter: _e, attributeData: nt, attributes: it, useGroups: at, consolidateGroups: ut, debug: pt} = this;
        for (; nt.length < _.length; )
            nt.push(new TypedAttributeData);
        _.forEach( (At, Et) => {
            prepareAttributesData(o.geometry, At.geometry, nt[Et], it)
        }
        ),
        pt.init(),
        performOperation(o, c, h, _e, nt, {
            useGroups: at
        }),
        pt.complete();
        const ht = this.getGroupRanges(o.geometry)
          , _t = getMaterialList(ht, o.material)
          , vt = this.getGroupRanges(c.geometry)
          , bt = getMaterialList(vt, c.material);
        vt.forEach(At => At.materialIndex += _t.length);
        let St = [...ht, ...vt].map( (At, Et) => ({
            ...At,
            index: Et
        }));
        if (at) {
            const At = [..._t, ...bt];
            ut && (St = St.map(Pt => {
                const It = At[Pt.materialIndex];
                return Pt.materialIndex = At.indexOf(It),
                Pt
            }
            ).sort( (Pt, It) => Pt.materialIndex - It.materialIndex));
            const Et = [];
            for (let Pt = 0, It = At.length; Pt < It; Pt++) {
                let Dt = !1;
                for (let Gt = 0, Bt = St.length; Gt < Bt; Gt++) {
                    const kt = St[Gt];
                    kt.materialIndex === Pt && (Dt = !0,
                    kt.materialIndex = Et.length)
                }
                Dt && Et.push(At[Pt])
            }
            _.forEach(Pt => {
                Pt.material = Et
            }
            )
        } else
            St = [{
                start: 0,
                count: 1 / 0,
                index: 0,
                materialIndex: 0
            }],
            _.forEach(At => {
                At.material = _t[0]
            }
            );
        return _.forEach( (At, Et) => {
            const Pt = At.geometry;
            assignBufferData(Pt, nt[Et], St),
            ut && joinGroups(Pt.groups)
        }
        ),
        b ? _ : _[0]
    }
    evaluateHierarchy(o, c=new Brush) {
        o.updateMatrixWorld(!0);
        const h = (b, _e) => {
            const nt = b.children;
            for (let it = 0, at = nt.length; it < at; it++) {
                const ut = nt[it];
                ut.isOperationGroup ? h(ut, _e) : _e(ut)
            }
        }
          , _ = b => {
            const _e = b.children;
            let nt = !1;
            for (let at = 0, ut = _e.length; at < ut; at++) {
                const pt = _e[at];
                nt = _(pt) || nt
            }
            const it = b.isDirty();
            if (it && b.markUpdated(),
            nt && !b.isOperationGroup) {
                let at;
                return h(b, ut => {
                    at = at ? this.evaluate(at, ut, ut.operation) : this.evaluate(b, ut, ut.operation)
                }
                ),
                b._cachedGeometry = at.geometry,
                b._cachedMaterials = at.material,
                !0
            }
            return nt || it
        }
        ;
        return _(o),
        c.geometry = o._cachedGeometry,
        c.material = o._cachedMaterials,
        c
    }
    reset() {
        this.triangleSplitter.reset()
    }
}

export default Evaluator;
