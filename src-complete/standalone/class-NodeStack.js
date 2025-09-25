/* Standalone Class: NodeStack */

class NodeStack {
    constructor() {
        this.members = []
    }
    add(o) {
        addUniqueItem(this.members, o),
        o.scheduleRender()
    }
    remove(o) {
        if (removeItem(this.members, o),
        o === this.prevLead && (this.prevLead = void 0),
        o === this.lead) {
            const c = this.members[this.members.length - 1];
            c && this.promote(c)
        }
    }
    relegate(o) {
        const c = this.members.findIndex(_ => o === _);
        if (c === 0)
            return !1;
        let h;
        for (let _ = c; _ >= 0; _--) {
            const b = this.members[_];
            if (b.isPresent !== !1) {
                h = b;
                break
            }
        }
        return h ? (this.promote(h),
        !0) : !1
    }
    promote(o, c) {
        const h = this.lead;
        if (o !== h && (this.prevLead = h,
        this.lead = o,
        o.show(),
        h)) {
            h.instance && h.scheduleRender(),
            o.scheduleRender(),
            o.resumeFrom = h,
            c && (o.resumeFrom.preserveOpacity = !0),
            h.snapshot && (o.snapshot = h.snapshot,
            o.snapshot.latestValues = h.animationValues || h.latestValues),
            o.root && o.root.isUpdating && (o.isLayoutDirty = !0);
            const {crossfade: _} = o.options;
            _ === !1 && h.hide()
        }
    }
    exitAnimationComplete() {
        this.members.forEach(o => {
            const {options: c, resumingFrom: h} = o;
            c.onExitComplete && c.onExitComplete(),
            h && h.options.onExitComplete && h.options.onExitComplete()
        }
        )
    }
    scheduleRender() {
        this.members.forEach(o => {
            o.instance && o.scheduleRender(!1)
        }
        )
    }
    removeLeadSnapshot() {
        this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
    }
}

export default NodeStack;
