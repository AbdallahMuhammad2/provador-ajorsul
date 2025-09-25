/* Standalone Constant: pb */

var pb = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
}
  , qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(d) {
    qb.forEach(function(o) {
        o = o + d.charAt(0).toUpperCase() + d.substring(1),
        pb[o] = pb[d]
    })
});
function rb(d, o, c) {
    return o == null || typeof o == "boolean" || o === "" ? "" : c || typeof o != "number" || o === 0 || pb.hasOwnProperty(d) && pb[d] ? ("" + o).trim() : o + "px"
}
function sb(d, o) {
    d = d.style;
    for (var c in o)
        if (o.hasOwnProperty(c)) {
            var h = c.indexOf("--") === 0
              , _ = rb(c, o[c], h);
            c === "float" && (c = "cssFloat"),
            h ? d.setProperty(c, _) : d[c] = _
        }
}
var tb = A({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});
function ub(d, o) {
    if (o) {
        if (tb[d] && (o.children != null || o.dangerouslySetInnerHTML != null))
            throw Error(p(137, d));
        if (o.dangerouslySetInnerHTML != null) {
            if (o.children != null)
                throw Error(p(60));
            if (typeof o.dangerouslySetInnerHTML != "object" || !("__html"in o.dangerouslySetInnerHTML))
                throw Error(p(61))
        }
        if (o.style != null && typeof o.style != "object")
            throw Error(p(62))
    }
}
function vb(d, o) {
    if (d.indexOf("-") === -1)
        return typeof o.is == "string";
    switch (d) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
        return !1;
    default:
        return !0
    }
}
var wb = null;
function xb(d) {
    return d = d.target || d.srcElement || window,
    d.correspondingUseElement && (d = d.correspondingUseElement),
    d.nodeType === 3 ? d.parentNode : d
}
var yb = null
  , zb = null
  , Ab = null;
function Bb(d) {
    if (d = Cb(d)) {
        if (typeof yb != "function")
            throw Error(p(280));
        var o = d.stateNode;
        o && (o = Db(o),
        yb(d.stateNode, d.type, o))
    }
}
function Eb(d) {
    zb ? Ab ? Ab.push(d) : Ab = [d] : zb = d
}
function Fb() {
    if (zb) {
        var d = zb
          , o = Ab;
        if (Ab = zb = null,
        Bb(d),
        o)
            for (d = 0; d < o.length; d++)
                Bb(o[d])
    }
}
function Gb(d, o) {
    return d(o)
}
function Hb() {}
var Ib = !1;
function Jb(d, o, c) {
    if (Ib)
        return d(o, c);
    Ib = !0;
    try {
        return Gb(d, o, c)
    } finally {
        Ib = !1,
        (zb !== null || Ab !== null) && (Hb(),
        Fb())
    }
}
function Kb(d, o) {
    var c = d.stateNode;
    if (c === null)
        return null;
    var h = Db(c);
    if (h === null)
        return null;
    c = h[o];
    e: switch (o) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
        (h = !h.disabled) || (d = d.type,
        h = !(d === "button" || d === "input" || d === "select" || d === "textarea")),
        d = !h;
        break e;
    default:
        d = !1
    }
    if (d)
        return null;
    if (c && typeof c != "function")
        throw Error(p(231, o, typeof c));
    return c
}
var Lb = !1;
if (ia)
    try {
        var Mb = {};

export default pb;
