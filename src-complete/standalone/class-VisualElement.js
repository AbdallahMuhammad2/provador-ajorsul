/* Standalone Class: VisualElement */

class VisualElement {
    scrapeMotionValuesFromProps(o, c, h) {
        return {}
    }
    constructor({parent: o, props: c, presenceContext: h, reducedMotionConfig: _, blockInitialAnimation: b, visualState: _e}, nt={}) {
        this.resolveKeyframes = (ht, _t, vt, bt) => new this.KeyframeResolver(ht,_t,vt,bt,this),
        this.current = null,
        this.children = new Set,
        this.isVariantNode = !1,
        this.isControllingVariants = !1,
        this.shouldReduceMotion = null,
        this.values = new Map,
        this.KeyframeResolver = KeyframeResolver,
        this.features = {},
        this.valueSubscriptions = new Map,
        this.prevMotionValues = {},
        this.events = {},
        this.propEventSubscriptions = {},
        this.notifyUpdate = () => this.notify("Update", this.latestValues),
        this.render = () => {
            this.current && (this.triggerBuild(),
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection))
        }
        ,
        this.scheduleRender = () => frame.render(this.render, !1, !0);
        const {latestValues: it, renderState: at} = _e;
        this.latestValues = it,
        this.baseTarget = {
            ...it
        },
        this.initialValues = c.initial ? {
            ...it
        } : {},
        this.renderState = at,
        this.parent = o,
        this.props = c,
        this.presenceContext = h,
        this.depth = o ? o.depth + 1 : 0,
        this.reducedMotionConfig = _,
        this.options = nt,
        this.blockInitialAnimation = !!b,
        this.isControllingVariants = isControllingVariants(c),
        this.isVariantNode = isVariantNode(c),
        this.isVariantNode && (this.variantChildren = new Set),
        this.manuallyAnimateOnMount = !!(o && o.current);
        const {willChange: ut, ...pt} = this.scrapeMotionValuesFromProps(c, {}, this);
        for (const ht in pt) {
            const _t = pt[ht];
            it[ht] !== void 0 && isMotionValue(_t) && (_t.set(it[ht], !1),
            isWillChangeMotionValue(ut) && ut.add(ht))
        }
    }
    mount(o) {
        this.current = o,
        visualElementStore.set(o, this),
        this.projection && !this.projection.instance && this.projection.mount(o),
        this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)),
        this.values.forEach( (c, h) => this.bindToMotionValue(h, c)),
        hasReducedMotionListener.current || initPrefersReducedMotion(),
        this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : prefersReducedMotion.current,
        this.parent && this.parent.children.add(this),
        this.update(this.props, this.presenceContext)
    }
    unmount() {
        var o;
        visualElementStore.delete(this.current),
        this.projection && this.projection.unmount(),
        cancelFrame(this.notifyUpdate),
        cancelFrame(this.render),
        this.valueSubscriptions.forEach(c => c()),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent && this.parent.children.delete(this);
        for (const c in this.events)
            this.events[c].clear();
        for (const c in this.features)
            (o = this.features[c]) === null || o === void 0 || o.unmount();
        this.current = null
    }
    bindToMotionValue(o, c) {
        const h = transformProps.has(o)
          , _ = c.on("change", _e => {
            this.latestValues[o] = _e,
            this.props.onUpdate && frame.preRender(this.notifyUpdate),
            h && this.projection && (this.projection.isTransformDirty = !0)
        }
        )
          , b = c.on("renderRequest", this.scheduleRender);
        this.valueSubscriptions.set(o, () => {
            _(),
            b(),
            c.owner && c.stop()
        }
        )
    }
    sortNodePosition(o) {
        return !this.current || !this.sortInstanceNodePosition || this.type !== o.type ? 0 : this.sortInstanceNodePosition(this.current, o.current)
    }
    loadFeatures({children: o, ...c}, h, _, b) {
        let _e, nt;
        for (let it = 0; it < numFeatures; it++) {
            const at = featureNames[it]
              , {isEnabled: ut, Feature: pt, ProjectionNode: ht, MeasureLayout: _t} = featureDefinitions[at];
            ht && (_e = ht),
            ut(c) && (!this.features[at] && pt && (this.features[at] = new pt(this)),
            _t && (nt = _t))
        }
        if ((this.type === "html" || this.type === "svg") && !this.projection && _e) {
            this.projection = new _e(this.latestValues,getClosestProjectingNode(this.parent));
            const {layoutId: it, layout: at, drag: ut, dragConstraints: pt, layoutScroll: ht, layoutRoot: _t} = c;
            this.projection.setOptions({
                layoutId: it,
                layout: at,
                alwaysMeasureLayout: !!ut || pt && isRefObject(pt),
                visualElement: this,
                scheduleRender: () => this.scheduleRender(),
                animationType: typeof at == "string" ? at : "both",
                initialPromotionConfig: b,
                layoutScroll: ht,
                layoutRoot: _t
            })
        }
        return nt
    }
    updateFeatures() {
        for (const o in this.features) {
            const c = this.features[o];
            c.isMounted ? c.update() : (c.mount(),
            c.isMounted = !0)
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.options, this.props)
    }
    measureViewportBox() {
        return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox()
    }
    getStaticValue(o) {
        return this.latestValues[o]
    }
    setStaticValue(o, c) {
        this.latestValues[o] = c
    }
    update(o, c) {
        (o.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
        this.prevProps = this.props,
        this.props = o,
        this.prevPresenceContext = this.presenceContext,
        this.presenceContext = c;
        for (let h = 0; h < propEventHandlers.length; h++) {
            const _ = propEventHandlers[h];
            this.propEventSubscriptions[_] && (this.propEventSubscriptions[_](),
            delete this.propEventSubscriptions[_]);
            const b = "on" + _
              , _e = o[b];
            _e && (this.propEventSubscriptions[_] = this.on(_, _e))
        }
        this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(o, this.prevProps, this), this.prevMotionValues),
        this.handleChildMotionValue && this.handleChildMotionValue()
    }
    getProps() {
        return this.props
    }
    getVariant(o) {
        return this.props.variants ? this.props.variants[o] : void 0
    }
    getDefaultTransition() {
        return this.props.transition
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint
    }
    getClosestVariantNode() {
        return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0
    }
    getVariantContext(o=!1) {
        if (o)
            return this.parent ? this.parent.getVariantContext() : void 0;
        if (!this.isControllingVariants) {
            const h = this.parent ? this.parent.getVariantContext() || {} : {};
            return this.props.initial !== void 0 && (h.initial = this.props.initial),
            h
        }
        const c = {};
        for (let h = 0; h < numVariantProps; h++) {
            const _ = variantProps[h]
              , b = this.props[_];
            (isVariantLabel(b) || b === !1) && (c[_] = b)
        }
        return c
    }
    addVariantChild(o) {
        const c = this.getClosestVariantNode();
        if (c)
            return c.variantChildren && c.variantChildren.add(o),
            () => c.variantChildren.delete(o)
    }
    addValue(o, c) {
        const h = this.values.get(o);
        c !== h && (h && this.removeValue(o),
        this.bindToMotionValue(o, c),
        this.values.set(o, c),
        this.latestValues[o] = c.get())
    }
    removeValue(o) {
        this.values.delete(o);
        const c = this.valueSubscriptions.get(o);
        c && (c(),
        this.valueSubscriptions.delete(o)),
        delete this.latestValues[o],
        this.removeValueFromRenderState(o, this.renderState)
    }
    hasValue(o) {
        return this.values.has(o)
    }
    getValue(o, c) {
        if (this.props.values && this.props.values[o])
            return this.props.values[o];
        let h = this.values.get(o);
        return h === void 0 && c !== void 0 && (h = motionValue(c === null ? void 0 : c, {
            owner: this
        }),
        this.addValue(o, h)),
        h
    }
    readValue(o, c) {
        var h;
        let _ = this.latestValues[o] !== void 0 || !this.current ? this.latestValues[o] : (h = this.getBaseTargetFromProps(this.props, o)) !== null && h !== void 0 ? h : this.readValueFromInstance(this.current, o, this.options);
        return _ != null && (typeof _ == "string" && (isNumericalString(_) || isZeroValueString(_)) ? _ = parseFloat(_) : !findValueType(_) && complex.test(c) && (_ = getAnimatableNone(o, c)),
        this.setBaseTarget(o, isMotionValue(_) ? _.get() : _)),
        isMotionValue(_) ? _.get() : _
    }
    setBaseTarget(o, c) {
        this.baseTarget[o] = c
    }
    getBaseTarget(o) {
        var c;
        const {initial: h} = this.props;
        let _;
        if (typeof h == "string" || typeof h == "object") {
            const _e = resolveVariantFromProps(this.props, h, (c = this.presenceContext) === null || c === void 0 ? void 0 : c.custom);
            _e && (_ = _e[o])
        }
        if (h && _ !== void 0)
            return _;
        const b = this.getBaseTargetFromProps(this.props, o);
        return b !== void 0 && !isMotionValue(b) ? b : this.initialValues[o] !== void 0 && _ === void 0 ? void 0 : this.baseTarget[o]
    }
    on(o, c) {
        return this.events[o] || (this.events[o] = new SubscriptionManager),
        this.events[o].add(c)
    }
    notify(o, ...c) {
        this.events[o] && this.events[o].notify(...c)
    }
}

export default VisualElement;
