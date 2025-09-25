/* Standalone Class: VisualElementDragControls */

class VisualElementDragControls {
    constructor(o) {
        this.openGlobalLock = null,
        this.isDragging = !1,
        this.currentDirection = null,
        this.originPoint = {
            x: 0,
            y: 0
        },
        this.constraints = !1,
        this.hasMutatedConstraints = !1,
        this.elastic = createBox(),
        this.visualElement = o
    }
    start(o, {snapToCursor: c=!1}={}) {
        const {presenceContext: h} = this.visualElement;
        if (h && h.isPresent === !1)
            return;
        const _ = ut => {
            const {dragSnapToOrigin: pt} = this.getProps();
            pt ? this.pauseAnimation() : this.stopAnimation(),
            c && this.snapToCursor(extractEventInfo(ut, "page").point)
        }
          , b = (ut, pt) => {
            const {drag: ht, dragPropagation: _t, onDragStart: vt} = this.getProps();
            if (ht && !_t && (this.openGlobalLock && this.openGlobalLock(),
            this.openGlobalLock = getGlobalLock(ht),
            !this.openGlobalLock))
                return;
            this.isDragging = !0,
            this.currentDirection = null,
            this.resolveConstraints(),
            this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0,
            this.visualElement.projection.target = void 0),
            eachAxis(St => {
                let At = this.getAxisMotionValue(St).get() || 0;
                if (percent.test(At)) {
                    const {projection: Et} = this.visualElement;
                    if (Et && Et.layout) {
                        const Pt = Et.layout.layoutBox[St];
                        Pt && (At = calcLength(Pt) * (parseFloat(At) / 100))
                    }
                }
                this.originPoint[St] = At
            }
            ),
            vt && frame.postRender( () => vt(ut, pt));
            const {animationState: bt} = this.visualElement;
            bt && bt.setActive("whileDrag", !0)
        }
          , _e = (ut, pt) => {
            const {dragPropagation: ht, dragDirectionLock: _t, onDirectionLock: vt, onDrag: bt} = this.getProps();
            if (!ht && !this.openGlobalLock)
                return;
            const {offset: St} = pt;
            if (_t && this.currentDirection === null) {
                this.currentDirection = getCurrentDirection(St),
                this.currentDirection !== null && vt && vt(this.currentDirection);
                return
            }
            this.updateAxis("x", pt.point, St),
            this.updateAxis("y", pt.point, St),
            this.visualElement.render(),
            bt && bt(ut, pt)
        }
          , nt = (ut, pt) => this.stop(ut, pt)
          , it = () => eachAxis(ut => {
            var pt;
            return this.getAnimationState(ut) === "paused" && ((pt = this.getAxisMotionValue(ut).animation) === null || pt === void 0 ? void 0 : pt.play())
        }
        )
          , {dragSnapToOrigin: at} = this.getProps();
        this.panSession = new PanSession(o,{
            onSessionStart: _,
            onStart: b,
            onMove: _e,
            onSessionEnd: nt,
            resumeAnimation: it
        },{
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin: at,
            contextWindow: getContextWindow(this.visualElement)
        })
    }
    stop(o, c) {
        const h = this.isDragging;
        if (this.cancel(),
        !h)
            return;
        const {velocity: _} = c;
        this.startAnimation(_);
        const {onDragEnd: b} = this.getProps();
        b && frame.postRender( () => b(o, c))
    }
    cancel() {
        this.isDragging = !1;
        const {projection: o, animationState: c} = this.visualElement;
        o && (o.isAnimationBlocked = !1),
        this.panSession && this.panSession.end(),
        this.panSession = void 0;
        const {dragPropagation: h} = this.getProps();
        !h && this.openGlobalLock && (this.openGlobalLock(),
        this.openGlobalLock = null),
        c && c.setActive("whileDrag", !1)
    }
    updateAxis(o, c, h) {
        const {drag: _} = this.getProps();
        if (!h || !shouldDrag(o, _, this.currentDirection))
            return;
        const b = this.getAxisMotionValue(o);
        let _e = this.originPoint[o] + h[o];
        this.constraints && this.constraints[o] && (_e = applyConstraints(_e, this.constraints[o], this.elastic[o])),
        b.set(_e)
    }
    resolveConstraints() {
        var o;
        const {dragConstraints: c, dragElastic: h} = this.getProps()
          , _ = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (o = this.visualElement.projection) === null || o === void 0 ? void 0 : o.layout
          , b = this.constraints;
        c && isRefObject(c) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : c && _ ? this.constraints = calcRelativeConstraints(_.layoutBox, c) : this.constraints = !1,
        this.elastic = resolveDragElastic(h),
        b !== this.constraints && _ && this.constraints && !this.hasMutatedConstraints && eachAxis(_e => {
            this.constraints !== !1 && this.getAxisMotionValue(_e) && (this.constraints[_e] = rebaseAxisConstraints(_.layoutBox[_e], this.constraints[_e]))
        }
        )
    }
    resolveRefConstraints() {
        const {dragConstraints: o, onMeasureDragConstraints: c} = this.getProps();
        if (!o || !isRefObject(o))
            return !1;
        const h = o.current
          , {projection: _} = this.visualElement;
        if (!_ || !_.layout)
            return !1;
        const b = measurePageBox(h, _.root, this.visualElement.getTransformPagePoint());
        let _e = calcViewportConstraints(_.layout.layoutBox, b);
        if (c) {
            const nt = c(convertBoxToBoundingBox(_e));
            this.hasMutatedConstraints = !!nt,
            nt && (_e = convertBoundingBoxToBox(nt))
        }
        return _e
    }
    startAnimation(o) {
        const {drag: c, dragMomentum: h, dragElastic: _, dragTransition: b, dragSnapToOrigin: _e, onDragTransitionEnd: nt} = this.getProps()
          , it = this.constraints || {}
          , at = eachAxis(ut => {
            if (!shouldDrag(ut, c, this.currentDirection))
                return;
            let pt = it && it[ut] || {};
            _e && (pt = {
                min: 0,
                max: 0
            });
            const ht = _ ? 200 : 1e6
              , _t = _ ? 40 : 1e7
              , vt = {
                type: "inertia",
                velocity: h ? o[ut] : 0,
                bounceStiffness: ht,
                bounceDamping: _t,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...b,
                ...pt
            };
            return this.startAxisValueAnimation(ut, vt)
        }
        );
        return Promise.all(at).then(nt)
    }
    startAxisValueAnimation(o, c) {
        const h = this.getAxisMotionValue(o);
        return h.start(animateMotionValue(o, h, 0, c, this.visualElement))
    }
    stopAnimation() {
        eachAxis(o => this.getAxisMotionValue(o).stop())
    }
    pauseAnimation() {
        eachAxis(o => {
            var c;
            return (c = this.getAxisMotionValue(o).animation) === null || c === void 0 ? void 0 : c.pause()
        }
        )
    }
    getAnimationState(o) {
        var c;
        return (c = this.getAxisMotionValue(o).animation) === null || c === void 0 ? void 0 : c.state
    }
    getAxisMotionValue(o) {
        const c = `_drag${o.toUpperCase()}`
          , h = this.visualElement.getProps()
          , _ = h[c];
        return _ || this.visualElement.getValue(o, (h.initial ? h.initial[o] : void 0) || 0)
    }
    snapToCursor(o) {
        eachAxis(c => {
            const {drag: h} = this.getProps();
            if (!shouldDrag(c, h, this.currentDirection))
                return;
            const {projection: _} = this.visualElement
              , b = this.getAxisMotionValue(c);
            if (_ && _.layout) {
                const {min: _e, max: nt} = _.layout.layoutBox[c];
                b.set(o[c] - mixNumber$1(_e, nt, .5))
            }
        }
        )
    }
    scalePositionWithinConstraints() {
        if (!this.visualElement.current)
            return;
        const {drag: o, dragConstraints: c} = this.getProps()
          , {projection: h} = this.visualElement;
        if (!isRefObject(c) || !h || !this.constraints)
            return;
        this.stopAnimation();
        const _ = {
            x: 0,
            y: 0
        };
        eachAxis(_e => {
            const nt = this.getAxisMotionValue(_e);
            if (nt && this.constraints !== !1) {
                const it = nt.get();
                _[_e] = calcOrigin({
                    min: it,
                    max: it
                }, this.constraints[_e])
            }
        }
        );
        const {transformTemplate: b} = this.visualElement.getProps();
        this.visualElement.current.style.transform = b ? b({}, "") : "none",
        h.root && h.root.updateScroll(),
        h.updateLayout(),
        this.resolveConstraints(),
        eachAxis(_e => {
            if (!shouldDrag(_e, o, null))
                return;
            const nt = this.getAxisMotionValue(_e)
              , {min: it, max: at} = this.constraints[_e];
            nt.set(mixNumber$1(it, at, _[_e]))
        }
        )
    }
    addListeners() {
        if (!this.visualElement.current)
            return;
        elementDragControls.set(this.visualElement, this);
        const o = this.visualElement.current
          , c = addPointerEvent(o, "pointerdown", it => {
            const {drag: at, dragListener: ut=!0} = this.getProps();
            at && ut && this.start(it)
        }
        )
          , h = () => {
            const {dragConstraints: it} = this.getProps();
            isRefObject(it) && (this.constraints = this.resolveRefConstraints())
        }
          , {projection: _} = this.visualElement
          , b = _.addEventListener("measure", h);
        _ && !_.layout && (_.root && _.root.updateScroll(),
        _.updateLayout()),
        h();
        const _e = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints())
          , nt = _.addEventListener("didUpdate", ({delta: it, hasLayoutChanged: at}) => {
            this.isDragging && at && (eachAxis(ut => {
                const pt = this.getAxisMotionValue(ut);
                pt && (this.originPoint[ut] += it[ut].translate,
                pt.set(pt.get() + it[ut].translate))
            }
            ),
            this.visualElement.render())
        }
        );
        return () => {
            _e(),
            c(),
            b(),
            nt && nt()
        }
    }
    getProps() {
        const o = this.visualElement.getProps()
          , {drag: c=!1, dragDirectionLock: h=!1, dragPropagation: _=!1, dragConstraints: b=!1, dragElastic: _e=defaultElastic, dragMomentum: nt=!0} = o;
        return {
            ...o,
            drag: c,
            dragDirectionLock: h,
            dragPropagation: _,
            dragConstraints: b,
            dragElastic: _e,
            dragMomentum: nt
        }
    }
}

export default VisualElementDragControls;
