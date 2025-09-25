/* Standalone Constant: time */

const time = {
    now: () => (now === void 0 && time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now()),
    now),
    set: d => {
        now = d,
        queueMicrotask(clearTime)
    }
}
  , isZeroValueString = d => /^0[^.\s]+$/u.test(d);
function isNone(d) {
    return typeof d == "number" ? d === 0 : d !== null ? d === "none" || d === "0" || isZeroValueString(d) : !0
}
let invariant = noop;
const isNumericalString = d => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(d)
  , splitCSSVariableRegex = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function parseCSSVariable(d) {
    const o = splitCSSVariableRegex.exec(d);
    if (!o)
        return [, ];
    const [,c,h,_] = o;
    return [`--${c ?? h}`, _]
}
function getVariableValue(d, o, c=1) {
    const [h,_] = parseCSSVariable(d);
    if (!h)
        return;
    const b = window.getComputedStyle(o).getPropertyValue(h);
    if (b) {
        const _e = b.trim();
        return isNumericalString(_e) ? parseFloat(_e) : _e
    }
    return isCSSVariableToken(_) ? getVariableValue(_, o, c + 1) : _
}
const positionalKeys = new Set(["width", "height", "top", "left", "right", "bottom", "x", "y", "translateX", "translateY"])
  , isNumOrPxType = d => d === number || d === px
  , getPosFromMatrix = (d, o) => parseFloat(d.split(", ")[o])
  , getTranslateFromMatrix = (d, o) => (c, {transform: h}) => {
    if (h === "none" || !h)
        return 0;
    const _ = h.match(/^matrix3d\((.+)\)$/u);
    if (_)
        return getPosFromMatrix(_[1], o);
    {
        const b = h.match(/^matrix\((.+)\)$/u);
        return b ? getPosFromMatrix(b[1], d) : 0
    }
}
  , transformKeys = new Set(["x", "y", "z"])
  , nonTranslationalTransformKeys = transformPropOrder.filter(d => !transformKeys.has(d));
function removeNonTranslationalTransform(d) {
    const o = [];
    return nonTranslationalTransformKeys.forEach(c => {
        const h = d.getValue(c);
        h !== void 0 && (o.push([c, h.get()]),
        h.set(c.startsWith("scale") ? 1 : 0))
    }
    ),
    o
}
const positionalValues = {
    width: ({x: d}, {paddingLeft: o="0", paddingRight: c="0"}) => d.max - d.min - parseFloat(o) - parseFloat(c),
    height: ({y: d}, {paddingTop: o="0", paddingBottom: c="0"}) => d.max - d.min - parseFloat(o) - parseFloat(c),
    top: (d, {top: o}) => parseFloat(o),
    left: (d, {left: o}) => parseFloat(o),
    bottom: ({y: d}, {top: o}) => parseFloat(o) + (d.max - d.min),
    right: ({x: d}, {left: o}) => parseFloat(o) + (d.max - d.min),
    x: getTranslateFromMatrix(4, 13),
    y: getTranslateFromMatrix(5, 14)
};

export default time;
