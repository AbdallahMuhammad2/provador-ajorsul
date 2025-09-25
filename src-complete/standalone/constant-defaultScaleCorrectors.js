/* Standalone Constant: defaultScaleCorrectors */

const defaultScaleCorrectors = {
    borderRadius: {
        ...correctBorderRadius,
        applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
    },
    borderTopLeftRadius: correctBorderRadius,
    borderTopRightRadius: correctBorderRadius,
    borderBottomLeftRadius: correctBorderRadius,
    borderBottomRightRadius: correctBorderRadius,
    boxShadow: correctBoxShadow
}
  , borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"]
  , numBorders = borders.length
  , asNumber = d => typeof d == "string" ? parseFloat(d) : d
  , isPx = d => typeof d == "number" || px.test(d);
function mixValues(d, o, c, h, _, b) {
    _ ? (d.opacity = mixNumber$1(0, c.opacity !== void 0 ? c.opacity : 1, easeCrossfadeIn(h)),
    d.opacityExit = mixNumber$1(o.opacity !== void 0 ? o.opacity : 1, 0, easeCrossfadeOut(h))) : b && (d.opacity = mixNumber$1(o.opacity !== void 0 ? o.opacity : 1, c.opacity !== void 0 ? c.opacity : 1, h));
    for (let _e = 0; _e < numBorders; _e++) {
        const nt = `border${borders[_e]}Radius`;
        let it = getRadius(o, nt)
          , at = getRadius(c, nt);
        if (it === void 0 && at === void 0)
            continue;
        it || (it = 0),
        at || (at = 0),
        it === 0 || at === 0 || isPx(it) === isPx(at) ? (d[nt] = Math.max(mixNumber$1(asNumber(it), asNumber(at), h), 0),
        (percent.test(at) || percent.test(it)) && (d[nt] += "%")) : d[nt] = at
    }
    (o.rotate || c.rotate) && (d.rotate = mixNumber$1(o.rotate || 0, c.rotate || 0, h))
}
function getRadius(d, o) {
    return d[o] !== void 0 ? d[o] : d.borderRadius
}
const easeCrossfadeIn = compress(0, .5, circOut)
  , easeCrossfadeOut = compress(.5, .95, noop);
function compress(d, o, c) {
    return h => h < d ? 0 : h > o ? 1 : c(progress(d, o, h))
}
function copyAxisInto(d, o) {
    d.min = o.min,
    d.max = o.max
}
function copyBoxInto(d, o) {
    copyAxisInto(d.x, o.x),
    copyAxisInto(d.y, o.y)
}
function removePointDelta(d, o, c, h, _) {
    return d -= o,
    d = scalePoint(d, 1 / c, h),
    _ !== void 0 && (d = scalePoint(d, 1 / _, h)),
    d
}
function removeAxisDelta(d, o=0, c=1, h=.5, _, b=d, _e=d) {
    if (percent.test(o) && (o = parseFloat(o),
    o = mixNumber$1(_e.min, _e.max, o / 100) - _e.min),
    typeof o != "number")
        return;
    let nt = mixNumber$1(b.min, b.max, h);
    d === b && (nt -= o),
    d.min = removePointDelta(d.min, o, c, nt, _),
    d.max = removePointDelta(d.max, o, c, nt, _)
}
function removeAxisTransforms(d, o, [c,h,_], b, _e) {
    removeAxisDelta(d, o[c], o[h], o[_], o.scale, b, _e)
}
const xKeys = ["x", "scaleX", "originX"]
  , yKeys = ["y", "scaleY", "originY"];
function removeBoxTransforms(d, o, c, h) {
    removeAxisTransforms(d.x, o, xKeys, c ? c.x : void 0, h ? h.x : void 0),
    removeAxisTransforms(d.y, o, yKeys, c ? c.y : void 0, h ? h.y : void 0)
}
function isAxisDeltaZero(d) {
    return d.translate === 0 && d.scale === 1
}
function isDeltaZero(d) {
    return isAxisDeltaZero(d.x) && isAxisDeltaZero(d.y)
}
function boxEquals(d, o) {
    return d.x.min === o.x.min && d.x.max === o.x.max && d.y.min === o.y.min && d.y.max === o.y.max
}
function boxEqualsRounded(d, o) {
    return Math.round(d.x.min) === Math.round(o.x.min) && Math.round(d.x.max) === Math.round(o.x.max) && Math.round(d.y.min) === Math.round(o.y.min) && Math.round(d.y.max) === Math.round(o.y.max)
}
function aspectRatio(d) {
    return calcLength(d.x) / calcLength(d.y)
}
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
function buildProjectionTransform(d, o, c) {
    let h = "";
    const _ = d.x.translate / o.x
      , b = d.y.translate / o.y
      , _e = (c == null ? void 0 : c.z) || 0;
    if ((_ || b || _e) && (h = `translate3d(${_}px, ${b}px, ${_e}px) `),
    (o.x !== 1 || o.y !== 1) && (h += `scale(${1 / o.x}, ${1 / o.y}) `),
    c) {
        const {transformPerspective: at, rotate: ut, rotateX: pt, rotateY: ht, skewX: _t, skewY: vt} = c;
        at && (h = `perspective(${at}px) ${h}`),
        ut && (h += `rotate(${ut}deg) `),
        pt && (h += `rotateX(${pt}deg) `),
        ht && (h += `rotateY(${ht}deg) `),
        _t && (h += `skewX(${_t}deg) `),
        vt && (h += `skewY(${vt}deg) `)
    }
    const nt = d.x.scale * o.x
      , it = d.y.scale * o.y;
    return (nt !== 1 || it !== 1) && (h += `scale(${nt}, ${it})`),
    h || "none"
}
const compareByDepth = (d, o) => d.depth - o.depth;
class FlatTree {
    constructor() {
        this.children = [],
        this.isDirty = !1
    }
    add(o) {
        addUniqueItem(this.children, o),
        this.isDirty = !0
    }
    remove(o) {
        removeItem(this.children, o),
        this.isDirty = !0
    }
    forEach(o) {
        this.isDirty && this.children.sort(compareByDepth),
        this.isDirty = !1,
        this.children.forEach(o)
    }
}
function delay(d, o) {
    const c = time.now()
      , h = ({timestamp: _}) => {
        const b = _ - c;
        b >= o && (cancelFrame(h),
        d(b - o))
    }
    ;
    return frame.read(h, !0),
    () => cancelFrame(h)
}
function record(d) {
    window.MotionDebug && window.MotionDebug.record(d)
}
function isSVGElement(d) {
    return d instanceof SVGElement && d.tagName !== "svg"
}
function animateSingleValue(d, o, c) {
    const h = isMotionValue(d) ? d : motionValue(d);
    return h.start(animateMotionValue("", h, o, c)),
    h.animation
}
const transformAxes = ["", "X", "Y", "Z"]
  , hiddenVisibility = {
    visibility: "hidden"
}
  , animationTarget = 1e3;
let id = 0;
const projectionFrameData = {
    type: "projectionFrame",
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0
};

export default defaultScaleCorrectors;
