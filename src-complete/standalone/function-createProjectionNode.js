/* Standalone Function: createProjectionNode */

function createProjectionNode({attachResizeListener: d, defaultParent: o, measureScroll: c, checkIsScrollRoot: h, resetTransform: _}) {
    return class {
        constructor(_e={}, nt=o == null ? void 0 : o()) {
            this.id = id++,
            this.animationId = 0,
            this.children = new Set,
            this.options = {},
            this.isTreeAnimating = !1,
            this.isAnimationBlocked = !1,
            this.isLayoutDirty = !1,
            this.isProjectionDirty = !1,
            this.isSharedProjectionDirty = !1,
            this.isTransformDirty = !1,
            this.updateManuallyBlocked = !1,
            this.updateBlockedByResize = !1,
            this.isUpdating = !1,
            this.isSVG = !1,
            this.needsReset = !1,
            this.shouldResetTransform = !1,
            this.treeScale = {
                x: 1,
                y: 1
            },
            this.eventHandlers = new Map,
            this.hasTreeAnimated = !1,
            this.updateScheduled = !1,
            this.projectionUpdateScheduled = !1,
            this.checkUpdateFailed = () => {
                this.isUpdating && (this.isUpdating = !1,
                this.clearAllSnapshots())
            }
            ,
            this.updateProjection = () => {
                this.projectionUpdateScheduled = !1,
                projectionFrameData.totalNodes = projectionFrameData.resolvedTargetDeltas = projectionFrameData.recalculatedProjection = 0,
                this.nodes.forEach(propagateDirtyNodes),
                this.nodes.forEach(resolveTargetDelta),
                this.nodes.forEach(calcProjection),
                this.nodes.forEach(cleanDirtyNodes),
                record(projectionFrameData)
            }
            ,
            this.hasProjected = !1,
            this.isVisible = !0,
            this.animationProgress = 0,
            this.sharedNodes = new Map,
            this.latestValues = _e,
            this.root = nt ? nt.root || nt : this,
            this.path = nt ? [...nt.path, nt] : [],
            this.parent = nt,
            this.depth = nt ? nt.depth + 1 : 0;
            for (let it = 0; it < this.path.length; it++)
                this.path[it].shouldResetTransform = !0;
            this.root === this && (this.nodes = new FlatTree)
        }
        addEventListener(_e, nt) {
            return this.eventHandlers.has(_e) || this.eventHandlers.set(_e, new SubscriptionManager),
            this.eventHandlers.get(_e).add(nt)
        }
        notifyListeners(_e, ...nt) {
            const it = this.eventHandlers.get(_e);
            it && it.notify(...nt)
        }
        hasListeners(_e) {
            return this.eventHandlers.has(_e)
        }
        mount(_e, nt=this.root.hasTreeAnimated) {
            if (this.instance)
                return;
            this.isSVG = isSVGElement(_e),
            this.instance = _e;
            const {layoutId: it, layout: at, visualElement: ut} = this.options;
            if (ut && !ut.current && ut.mount(_e),
            this.root.nodes.add(this),
            this.parent && this.parent.children.add(this),
            nt && (at || it) && (this.isLayoutDirty = !0),
            d) {
                let pt;
                const ht = () => this.root.updateBlockedByResize = !1;
                d(_e, () => {
                    this.root.updateBlockedByResize = !0,
                    pt && pt(),
                    pt = delay(ht, 250),
                    globalProjectionState.hasAnimatedSinceResize && (globalProjectionState.hasAnimatedSinceResize = !1,
                    this.nodes.forEach(finishAnimation))
                }
                )
            }
            it && this.root.registerSharedNode(it, this),
            this.options.animate !== !1 && ut && (it || at) && this.addEventListener("didUpdate", ({delta: pt, hasLayoutChanged: ht, hasRelativeTargetChanged: _t, layout: vt}) => {
                if (this.isTreeAnimationBlocked()) {
                    this.target = void 0,
                    this.relativeTarget = void 0;
                    return
                }
                const bt = this.options.transition || ut.getDefaultTransition() || defaultLayoutTransition
                  , {onLayoutAnimationStart: St, onLayoutAnimationComplete: At} = ut.getProps()
                  , Et = !this.targetLayout || !boxEqualsRounded(this.targetLayout, vt) || _t
                  , Pt = !ht && _t;
                if (this.options.layoutRoot || this.resumeFrom && this.resumeFrom.instance || Pt || ht && (Et || !this.currentAnimation)) {
                    this.resumeFrom && (this.resumingFrom = this.resumeFrom,
                    this.resumingFrom.resumingFrom = void 0),
                    this.setAnimationOrigin(pt, Pt);
                    const It = {
                        ...getValueTransition(bt, "layout"),
                        onPlay: St,
                        onComplete: At
                    };
                    (ut.shouldReduceMotion || this.options.layoutRoot) && (It.delay = 0,
                    It.type = !1),
                    this.startAnimation(It)
                } else
                    ht || finishAnimation(this),
                    this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
                this.targetLayout = vt
            }
            )
        }
        unmount() {
            this.options.layoutId && this.willUpdate(),
            this.root.nodes.remove(this);
            const _e = this.getStack();
            _e && _e.remove(this),
            this.parent && this.parent.children.delete(this),
            this.instance = void 0,
            cancelFrame(this.updateProjection)
        }
        blockUpdate() {
            this.updateManuallyBlocked = !0
        }
        unblockUpdate() {
            this.updateManuallyBlocked = !1
        }
        isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize
        }
        isTreeAnimationBlocked() {
            return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1
        }
        startUpdate() {
            this.isUpdateBlocked() || (this.isUpdating = !0,
            this.nodes && this.nodes.forEach(resetSkewAndRotation),
            this.animationId++)
        }
        getTransformTemplate() {
            const {visualElement: _e} = this.options;
            return _e && _e.getProps().transformTemplate
        }
        willUpdate(_e=!0) {
            if (this.root.hasTreeAnimated = !0,
            this.root.isUpdateBlocked()) {
                this.options.onExitComplete && this.options.onExitComplete();
                return
            }
            if (!this.root.isUpdating && this.root.startUpdate(),
            this.isLayoutDirty)
                return;
            this.isLayoutDirty = !0;
            for (let ut = 0; ut < this.path.length; ut++) {
                const pt = this.path[ut];
                pt.shouldResetTransform = !0,
                pt.updateScroll("snapshot"),
                pt.options.layoutRoot && pt.willUpdate(!1)
            }
            const {layoutId: nt, layout: it} = this.options;
            if (nt === void 0 && !it)
                return;
            const at = this.getTransformTemplate();
            this.prevTransformTemplateValue = at ? at(this.latestValues, "") : void 0,
            this.updateSnapshot(),
            _e && this.notifyListeners("willUpdate")
        }
        update() {
            if (this.updateScheduled = !1,
            this.isUpdateBlocked()) {
                this.unblockUpdate(),
                this.clearAllSnapshots(),
                this.nodes.forEach(clearMeasurements);
                return
            }
            this.isUpdating || this.nodes.forEach(clearIsLayoutDirty),
            this.isUpdating = !1,
            window.HandoffCancelAllAnimations && window.HandoffCancelAllAnimations(),
            this.nodes.forEach(resetTransformStyle),
            this.nodes.forEach(updateLayout),
            this.nodes.forEach(notifyLayoutUpdate),
            this.clearAllSnapshots();
            const nt = time.now();
            frameData.delta = clamp(0, 1e3 / 60, nt - frameData.timestamp),
            frameData.timestamp = nt,
            frameData.isProcessing = !0,
            steps.update.process(frameData),
            steps.preRender.process(frameData),
            steps.render.process(frameData),
            frameData.isProcessing = !1
        }
        didUpdate() {
            this.updateScheduled || (this.updateScheduled = !0,
            microtask.read( () => this.update()))
        }
        clearAllSnapshots() {
            this.nodes.forEach(clearSnapshot),
            this.sharedNodes.forEach(removeLeadSnapshots)
        }
        scheduleUpdateProjection() {
            this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0,
            frame.preRender(this.updateProjection, !1, !0))
        }
        scheduleCheckAfterUnmount() {
            frame.postRender( () => {
                this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
            }
            )
        }
        updateSnapshot() {
            this.snapshot || !this.instance || (this.snapshot = this.measure())
        }
        updateLayout() {
            if (!this.instance || (this.updateScroll(),
            !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
                return;
            if (this.resumeFrom && !this.resumeFrom.instance)
                for (let it = 0; it < this.path.length; it++)
                    this.path[it].updateScroll();
            const _e = this.layout;
            this.layout = this.measure(!1),
            this.layoutCorrected = createBox(),
            this.isLayoutDirty = !1,
            this.projectionDelta = void 0,
            this.notifyListeners("measure", this.layout.layoutBox);
            const {visualElement: nt} = this.options;
            nt && nt.notify("LayoutMeasure", this.layout.layoutBox, _e ? _e.layoutBox : void 0)
        }
        updateScroll(_e="measure") {
            let nt = !!(this.options.layoutScroll && this.instance);
            this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === _e && (nt = !1),
            nt && (this.scroll = {
                animationId: this.root.animationId,
                phase: _e,
                isRoot: h(this.instance),
                offset: c(this.instance)
            })
        }
        resetTransform() {
            if (!_)
                return;
            const _e = this.isLayoutDirty || this.shouldResetTransform
              , nt = this.projectionDelta && !isDeltaZero(this.projectionDelta)
              , it = this.getTransformTemplate()
              , at = it ? it(this.latestValues, "") : void 0
              , ut = at !== this.prevTransformTemplateValue;
            _e && (nt || hasTransform(this.latestValues) || ut) && (_(this.instance, at),
            this.shouldResetTransform = !1,
            this.scheduleRender())
        }
        measure(_e=!0) {
            const nt = this.measurePageBox();
            let it = this.removeElementScroll(nt);
            return _e && (it = this.removeTransform(it)),
            roundBox(it),
            {
                animationId: this.root.animationId,
                measuredBox: nt,
                layoutBox: it,
                latestValues: {},
                source: this.id
            }
        }
        measurePageBox() {
            const {visualElement: _e} = this.options;
            if (!_e)
                return createBox();
            const nt = _e.measureViewportBox()
              , {scroll: it} = this.root;
            return it && (translateAxis(nt.x, it.offset.x),
            translateAxis(nt.y, it.offset.y)),
            nt
        }
        removeElementScroll(_e) {
            const nt = createBox();
            copyBoxInto(nt, _e);
            for (let it = 0; it < this.path.length; it++) {
                const at = this.path[it]
                  , {scroll: ut, options: pt} = at;
                if (at !== this.root && ut && pt.layoutScroll) {
                    if (ut.isRoot) {
                        copyBoxInto(nt, _e);
                        const {scroll: ht} = this.root;
                        ht && (translateAxis(nt.x, -ht.offset.x),
                        translateAxis(nt.y, -ht.offset.y))
                    }
                    translateAxis(nt.x, ut.offset.x),
                    translateAxis(nt.y, ut.offset.y)
                }
            }
            return nt
        }
        applyTransform(_e, nt=!1) {
            const it = createBox();
            copyBoxInto(it, _e);
            for (let at = 0; at < this.path.length; at++) {
                const ut = this.path[at];
                !nt && ut.options.layoutScroll && ut.scroll && ut !== ut.root && transformBox(it, {
                    x: -ut.scroll.offset.x,
                    y: -ut.scroll.offset.y
                }),
                hasTransform(ut.latestValues) && transformBox(it, ut.latestValues)
            }
            return hasTransform(this.latestValues) && transformBox(it, this.latestValues),
            it
        }
        removeTransform(_e) {
            const nt = createBox();
            copyBoxInto(nt, _e);
            for (let it = 0; it < this.path.length; it++) {
                const at = this.path[it];
                if (!at.instance || !hasTransform(at.latestValues))
                    continue;
                hasScale(at.latestValues) && at.updateSnapshot();
                const ut = createBox()
                  , pt = at.measurePageBox();
                copyBoxInto(ut, pt),
                removeBoxTransforms(nt, at.latestValues, at.snapshot ? at.snapshot.layoutBox : void 0, ut)
            }
            return hasTransform(this.latestValues) && removeBoxTransforms(nt, this.latestValues),
            nt
        }
        setTargetDelta(_e) {
            this.targetDelta = _e,
            this.root.scheduleUpdateProjection(),
            this.isProjectionDirty = !0
        }
        setOptions(_e) {
            this.options = {
                ...this.options,
                ..._e,
                crossfade: _e.crossfade !== void 0 ? _e.crossfade : !0
            }
        }
        clearMeasurements() {
            this.scroll = void 0,
            this.layout = void 0,
            this.snapshot = void 0,
            this.prevTransformTemplateValue = void 0,
            this.targetDelta = void 0,
            this.target = void 0,
            this.isLayoutDirty = !1
        }
        forceRelativeParentToResolveTarget() {
            this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp && this.relativeParent.resolveTargetDelta(!0)
        }
        resolveTargetDelta(_e=!1) {
            var nt;
            const it = this.getLead();
            this.isProjectionDirty || (this.isProjectionDirty = it.isProjectionDirty),
            this.isTransformDirty || (this.isTransformDirty = it.isTransformDirty),
            this.isSharedProjectionDirty || (this.isSharedProjectionDirty = it.isSharedProjectionDirty);
            const at = !!this.resumingFrom || this !== it;
            if (!(_e || at && this.isSharedProjectionDirty || this.isProjectionDirty || !((nt = this.parent) === null || nt === void 0) && nt.isProjectionDirty || this.attemptToResolveRelativeTarget))
                return;
            const {layout: pt, layoutId: ht} = this.options;
            if (!(!this.layout || !(pt || ht))) {
                if (this.resolvedRelativeTargetAt = frameData.timestamp,
                !this.targetDelta && !this.relativeTarget) {
                    const _t = this.getClosestProjectingParent();
                    _t && _t.layout && this.animationProgress !== 1 ? (this.relativeParent = _t,
                    this.forceRelativeParentToResolveTarget(),
                    this.relativeTarget = createBox(),
                    this.relativeTargetOrigin = createBox(),
                    calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, _t.layout.layoutBox),
                    copyBoxInto(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0
                }
                if (!(!this.relativeTarget && !this.targetDelta)) {
                    if (this.target || (this.target = createBox(),
                    this.targetWithTransforms = createBox()),
                    this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(),
                    calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : copyBoxInto(this.target, this.layout.layoutBox),
                    applyBoxDelta(this.target, this.targetDelta)) : copyBoxInto(this.target, this.layout.layoutBox),
                    this.attemptToResolveRelativeTarget) {
                        this.attemptToResolveRelativeTarget = !1;
                        const _t = this.getClosestProjectingParent();
                        _t && !!_t.resumingFrom == !!this.resumingFrom && !_t.options.layoutScroll && _t.target && this.animationProgress !== 1 ? (this.relativeParent = _t,
                        this.forceRelativeParentToResolveTarget(),
                        this.relativeTarget = createBox(),
                        this.relativeTargetOrigin = createBox(),
                        calcRelativePosition(this.relativeTargetOrigin, this.target, _t.target),
                        copyBoxInto(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0
                    }
                    projectionFrameData.resolvedTargetDeltas++
                }
            }
        }
        getClosestProjectingParent() {
            if (!(!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)))
                return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent()
        }
        isProjecting() {
            return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
        }
        calcProjection() {
            var _e;
            const nt = this.getLead()
              , it = !!this.resumingFrom || this !== nt;
            let at = !0;
            if ((this.isProjectionDirty || !((_e = this.parent) === null || _e === void 0) && _e.isProjectionDirty) && (at = !1),
            it && (this.isSharedProjectionDirty || this.isTransformDirty) && (at = !1),
            this.resolvedRelativeTargetAt === frameData.timestamp && (at = !1),
            at)
                return;
            const {layout: ut, layoutId: pt} = this.options;
            if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation),
            this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
            !this.layout || !(ut || pt))
                return;
            copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
            const ht = this.treeScale.x
              , _t = this.treeScale.y;
            applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, it),
            nt.layout && !nt.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (nt.target = nt.layout.layoutBox,
            nt.targetWithTransforms = createBox());
            const {target: vt} = nt;
            if (!vt) {
                this.projectionTransform && (this.projectionDelta = createDelta(),
                this.projectionTransform = "none",
                this.scheduleRender());
                return
            }
            this.projectionDelta || (this.projectionDelta = createDelta(),
            this.projectionDeltaWithTransform = createDelta());
            const bt = this.projectionTransform;
            calcBoxDelta(this.projectionDelta, this.layoutCorrected, vt, this.latestValues),
            this.projectionTransform = buildProjectionTransform(this.projectionDelta, this.treeScale),
            (this.projectionTransform !== bt || this.treeScale.x !== ht || this.treeScale.y !== _t) && (this.hasProjected = !0,
            this.scheduleRender(),
            this.notifyListeners("projectionUpdate", vt)),
            projectionFrameData.recalculatedProjection++
        }
        hide() {
            this.isVisible = !1
        }
        show() {
            this.isVisible = !0
        }
        scheduleRender(_e=!0) {
            if (this.options.scheduleRender && this.options.scheduleRender(),
            _e) {
                const nt = this.getStack();
                nt && nt.scheduleRender()
            }
            this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
        }
        setAnimationOrigin(_e, nt=!1) {
            const it = this.snapshot
              , at = it ? it.latestValues : {}
              , ut = {
                ...this.latestValues
            }
              , pt = createDelta();
            (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0),
            this.attemptToResolveRelativeTarget = !nt;
            const ht = createBox()
              , _t = it ? it.source : void 0
              , vt = this.layout ? this.layout.source : void 0
              , bt = _t !== vt
              , St = this.getStack()
              , At = !St || St.members.length <= 1
              , Et = !!(bt && !At && this.options.crossfade === !0 && !this.path.some(hasOpacityCrossfade));
            this.animationProgress = 0;
            let Pt;
            this.mixTargetDelta = It => {
                const Dt = It / 1e3;
                mixAxisDelta(pt.x, _e.x, Dt),
                mixAxisDelta(pt.y, _e.y, Dt),
                this.setTargetDelta(pt),
                this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (calcRelativePosition(ht, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
                mixBox(this.relativeTarget, this.relativeTargetOrigin, ht, Dt),
                Pt && boxEquals(this.relativeTarget, Pt) && (this.isProjectionDirty = !1),
                Pt || (Pt = createBox()),
                copyBoxInto(Pt, this.relativeTarget)),
                bt && (this.animationValues = ut,
                mixValues(ut, at, this.latestValues, Dt, Et, At)),
                this.root.scheduleUpdateProjection(),
                this.scheduleRender(),
                this.animationProgress = Dt
            }
            ,
            this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0)
        }
        startAnimation(_e) {
            this.notifyListeners("animationStart"),
            this.currentAnimation && this.currentAnimation.stop(),
            this.resumingFrom && this.resumingFrom.currentAnimation && this.resumingFrom.currentAnimation.stop(),
            this.pendingAnimation && (cancelFrame(this.pendingAnimation),
            this.pendingAnimation = void 0),
            this.pendingAnimation = frame.update( () => {
                globalProjectionState.hasAnimatedSinceResize = !0,
                this.currentAnimation = animateSingleValue(0, animationTarget, {
                    ..._e,
                    onUpdate: nt => {
                        this.mixTargetDelta(nt),
                        _e.onUpdate && _e.onUpdate(nt)
                    }
                    ,
                    onComplete: () => {
                        _e.onComplete && _e.onComplete(),
                        this.completeAnimation()
                    }
                }),
                this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
                this.pendingAnimation = void 0
            }
            )
        }
        completeAnimation() {
            this.resumingFrom && (this.resumingFrom.currentAnimation = void 0,
            this.resumingFrom.preserveOpacity = void 0);
            const _e = this.getStack();
            _e && _e.exitAnimationComplete(),
            this.resumingFrom = this.currentAnimation = this.animationValues = void 0,
            this.notifyListeners("animationComplete")
        }
        finishAnimation() {
            this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(animationTarget),
            this.currentAnimation.stop()),
            this.completeAnimation()
        }
        applyTransformsToTarget() {
            const _e = this.getLead();
            let {targetWithTransforms: nt, target: it, layout: at, latestValues: ut} = _e;
            if (!(!nt || !it || !at)) {
                if (this !== _e && this.layout && at && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, at.layoutBox)) {
                    it = this.target || createBox();
                    const pt = calcLength(this.layout.layoutBox.x);
                    it.x.min = _e.target.x.min,
                    it.x.max = it.x.min + pt;
                    const ht = calcLength(this.layout.layoutBox.y);
                    it.y.min = _e.target.y.min,
                    it.y.max = it.y.min + ht
                }
                copyBoxInto(nt, it),
                transformBox(nt, ut),
                calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, nt, ut)
            }
        }
        registerSharedNode(_e, nt) {
            this.sharedNodes.has(_e) || this.sharedNodes.set(_e, new NodeStack),
            this.sharedNodes.get(_e).add(nt);
            const at = nt.options.initialPromotionConfig;
            nt.promote({
                transition: at ? at.transition : void 0,
                preserveFollowOpacity: at && at.shouldPreserveFollowOpacity ? at.shouldPreserveFollowOpacity(nt) : void 0
            })
        }
        isLead() {
            const _e = this.getStack();
            return _e ? _e.lead === this : !0
        }
        getLead() {
            var _e;
            const {layoutId: nt} = this.options;
            return nt ? ((_e = this.getStack()) === null || _e === void 0 ? void 0 : _e.lead) || this : this
        }
        getPrevLead() {
            var _e;
            const {layoutId: nt} = this.options;
            return nt ? (_e = this.getStack()) === null || _e === void 0 ? void 0 : _e.prevLead : void 0
        }
        getStack() {
            const {layoutId: _e} = this.options;
            if (_e)
                return this.root.sharedNodes.get(_e)
        }
        promote({needsReset: _e, transition: nt, preserveFollowOpacity: it}={}) {
            const at = this.getStack();
            at && at.promote(this, it),
            _e && (this.projectionDelta = void 0,
            this.needsReset = !0),
            nt && this.setOptions({
                transition: nt
            })
        }
        relegate() {
            const _e = this.getStack();
            return _e ? _e.relegate(this) : !1
        }
        resetSkewAndRotation() {
            const {visualElement: _e} = this.options;
            if (!_e)
                return;
            let nt = !1;
            const {latestValues: it} = _e;
            if ((it.z || it.rotate || it.rotateX || it.rotateY || it.rotateZ || it.skewX || it.skewY) && (nt = !0),
            !nt)
                return;
            const at = {};
            it.z && resetDistortingTransform("z", _e, at, this.animationValues);
            for (let ut = 0; ut < transformAxes.length; ut++)
                resetDistortingTransform(`rotate${transformAxes[ut]}`, _e, at, this.animationValues),
                resetDistortingTransform(`skew${transformAxes[ut]}`, _e, at, this.animationValues);
            _e.render();
            for (const ut in at)
                _e.setStaticValue(ut, at[ut]),
                this.animationValues && (this.animationValues[ut] = at[ut]);
            _e.scheduleRender()
        }
        getProjectionStyles(_e) {
            var nt, it;
            if (!this.instance || this.isSVG)
                return;
            if (!this.isVisible)
                return hiddenVisibility;
            const at = {
                visibility: ""
            }
              , ut = this.getTransformTemplate();
            if (this.needsReset)
                return this.needsReset = !1,
                at.opacity = "",
                at.pointerEvents = resolveMotionValue(_e == null ? void 0 : _e.pointerEvents) || "",
                at.transform = ut ? ut(this.latestValues, "") : "none",
                at;
            const pt = this.getLead();
            if (!this.projectionDelta || !this.layout || !pt.target) {
                const bt = {};
                return this.options.layoutId && (bt.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1,
                bt.pointerEvents = resolveMotionValue(_e == null ? void 0 : _e.pointerEvents) || ""),
                this.hasProjected && !hasTransform(this.latestValues) && (bt.transform = ut ? ut({}, "") : "none",
                this.hasProjected = !1),
                bt
            }
            const ht = pt.animationValues || pt.latestValues;
            this.applyTransformsToTarget(),
            at.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, ht),
            ut && (at.transform = ut(ht, at.transform));
            const {x: _t, y: vt} = this.projectionDelta;
            at.transformOrigin = `${_t.origin * 100}% ${vt.origin * 100}% 0`,
            pt.animationValues ? at.opacity = pt === this ? (it = (nt = ht.opacity) !== null && nt !== void 0 ? nt : this.latestValues.opacity) !== null && it !== void 0 ? it : 1 : this.preserveOpacity ? this.latestValues.opacity : ht.opacityExit : at.opacity = pt === this ? ht.opacity !== void 0 ? ht.opacity : "" : ht.opacityExit !== void 0 ? ht.opacityExit : 0;
            for (const bt in scaleCorrectors) {
                if (ht[bt] === void 0)
                    continue;
                const {correct: St, applyTo: At} = scaleCorrectors[bt]
                  , Et = at.transform === "none" ? ht[bt] : St(ht[bt], pt);
                if (At) {
                    const Pt = At.length;
                    for (let It = 0; It < Pt; It++)
                        at[At[It]] = Et
                } else
                    at[bt] = Et
            }
            return this.options.layoutId && (at.pointerEvents = pt === this ? resolveMotionValue(_e == null ? void 0 : _e.pointerEvents) || "" : "none"),
            at
        }
        clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0
        }
        resetTree() {
            this.root.nodes.forEach(_e => {
                var nt;
                return (nt = _e.currentAnimation) === null || nt === void 0 ? void 0 : nt.stop()
            }
            ),
            this.root.nodes.forEach(clearMeasurements),
            this.root.sharedNodes.clear()
        }
    }
}

export default createProjectionNode;
