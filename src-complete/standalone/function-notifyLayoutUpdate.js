/* Standalone Function: notifyLayoutUpdate */

function notifyLayoutUpdate(d) {
    var o;
    const c = ((o = d.resumeFrom) === null || o === void 0 ? void 0 : o.snapshot) || d.snapshot;
    if (d.isLead() && d.layout && c && d.hasListeners("didUpdate")) {
        const {layoutBox: h, measuredBox: _} = d.layout
          , {animationType: b} = d.options
          , _e = c.source !== d.layout.source;
        b === "size" ? eachAxis(pt => {
            const ht = _e ? c.measuredBox[pt] : c.layoutBox[pt]
              , _t = calcLength(ht);
            ht.min = h[pt].min,
            ht.max = ht.min + _t
        }
        ) : shouldAnimatePositionOnly(b, c.layoutBox, h) && eachAxis(pt => {
            const ht = _e ? c.measuredBox[pt] : c.layoutBox[pt]
              , _t = calcLength(h[pt]);
            ht.max = ht.min + _t,
            d.relativeTarget && !d.currentAnimation && (d.isProjectionDirty = !0,
            d.relativeTarget[pt].max = d.relativeTarget[pt].min + _t)
        }
        );
        const nt = createDelta();
        calcBoxDelta(nt, h, c.layoutBox);
        const it = createDelta();
        _e ? calcBoxDelta(it, d.applyTransform(_, !0), c.measuredBox) : calcBoxDelta(it, h, c.layoutBox);
        const at = !isDeltaZero(nt);
        let ut = !1;
        if (!d.resumeFrom) {
            const pt = d.getClosestProjectingParent();
            if (pt && !pt.resumeFrom) {
                const {snapshot: ht, layout: _t} = pt;
                if (ht && _t) {
                    const vt = createBox();
                    calcRelativePosition(vt, c.layoutBox, ht.layoutBox);
                    const bt = createBox();
                    calcRelativePosition(bt, h, _t.layoutBox),
                    boxEqualsRounded(vt, bt) || (ut = !0),
                    pt.options.layoutRoot && (d.relativeTarget = bt,
                    d.relativeTargetOrigin = vt,
                    d.relativeParent = pt)
                }
            }
        }
        d.notifyListeners("didUpdate", {
            layout: h,
            snapshot: c,
            delta: it,
            layoutDelta: nt,
            hasLayoutChanged: at,
            hasRelativeTargetChanged: ut
        })
    } else if (d.isLead()) {
        const {onExitComplete: h} = d.options;
        h && h()
    }
    d.options.transition = void 0
}

export default notifyLayoutUpdate;
