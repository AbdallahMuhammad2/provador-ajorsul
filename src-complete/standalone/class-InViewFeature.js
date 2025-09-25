/* Standalone Class: InViewFeature */

class InViewFeature extends Feature {
    constructor() {
        super(...arguments),
        this.hasEnteredView = !1,
        this.isInView = !1
    }
    startObserver() {
        this.unmount();
        const {viewport: o={}} = this.node.getProps()
          , {root: c, margin: h, amount: _="some", once: b} = o
          , _e = {
            root: c ? c.current : void 0,
            rootMargin: h,
            threshold: typeof _ == "number" ? _ : thresholdNames[_]
        }
          , nt = it => {
            const {isIntersecting: at} = it;
            if (this.isInView === at || (this.isInView = at,
            b && !at && this.hasEnteredView))
                return;
            at && (this.hasEnteredView = !0),
            this.node.animationState && this.node.animationState.setActive("whileInView", at);
            const {onViewportEnter: ut, onViewportLeave: pt} = this.node.getProps()
              , ht = at ? ut : pt;
            ht && ht(it)
        }
        ;
        return observeIntersection(this.node.current, _e, nt)
    }
    mount() {
        this.startObserver()
    }
    update() {
        if (typeof IntersectionObserver > "u")
            return;
        const {props: o, prevProps: c} = this.node;
        ["amount", "margin", "root"].some(hasViewportOptionChanged(o, c)) && this.startObserver()
    }
    unmount() {}
}

export default InViewFeature;
