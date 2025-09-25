/* Standalone Constant: animations */

const animations = {
    animation: {
        Feature: AnimationFeature
    },
    exit: {
        Feature: ExitAnimationFeature
    }
}
  , distance = (d, o) => Math.abs(d - o);
function distance2D(d, o) {
    const c = distance(d.x, o.x)
      , h = distance(d.y, o.y);
    return Math.sqrt(c ** 2 + h ** 2)
}
class PanSession {
    constructor(o, c, {transformPagePoint: h, contextWindow: _, dragSnapToOrigin: b=!1}={}) {
        if (this.startEvent = null,
        this.lastMoveEvent = null,
        this.lastMoveEventInfo = null,
        this.handlers = {},
        this.contextWindow = window,
        this.updatePoint = () => {
            if (!(this.lastMoveEvent && this.lastMoveEventInfo))
                return;
            const pt = getPanInfo(this.lastMoveEventInfo, this.history)
              , ht = this.startEvent !== null
              , _t = distance2D(pt.offset, {
                x: 0,
                y: 0
            }) >= 3;
            if (!ht && !_t)
                return;
            const {point: vt} = pt
              , {timestamp: bt} = frameData;
            this.history.push({
                ...vt,
                timestamp: bt
            });
            const {onStart: St, onMove: At} = this.handlers;
            ht || (St && St(this.lastMoveEvent, pt),
            this.startEvent = this.lastMoveEvent),
            At && At(this.lastMoveEvent, pt)
        }
        ,
        this.handlePointerMove = (pt, ht) => {
            this.lastMoveEvent = pt,
            this.lastMoveEventInfo = transformPoint(ht, this.transformPagePoint),
            frame.update(this.updatePoint, !0)
        }
        ,
        this.handlePointerUp = (pt, ht) => {
            this.end();
            const {onEnd: _t, onSessionEnd: vt, resumeAnimation: bt} = this.handlers;
            if (this.dragSnapToOrigin && bt && bt(),
            !(this.lastMoveEvent && this.lastMoveEventInfo))
                return;
            const St = getPanInfo(pt.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(ht, this.transformPagePoint), this.history);
            this.startEvent && _t && _t(pt, St),
            vt && vt(pt, St)
        }
        ,
        !isPrimaryPointer(o))
            return;
        this.dragSnapToOrigin = b,
        this.handlers = c,
        this.transformPagePoint = h,
        this.contextWindow = _ || window;
        const _e = extractEventInfo(o)
          , nt = transformPoint(_e, this.transformPagePoint)
          , {point: it} = nt
          , {timestamp: at} = frameData;
        this.history = [{
            ...it,
            timestamp: at
        }];
        const {onSessionStart: ut} = c;
        ut && ut(o, getPanInfo(nt, this.history)),
        this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp))
    }
    updateHandlers(o) {
        this.handlers = o
    }
    end() {
        this.removeListeners && this.removeListeners(),
        cancelFrame(this.updatePoint)
    }
}
function transformPoint(d, o) {
    return o ? {
        point: o(d.point)
    } : d
}
function subtractPoint(d, o) {
    return {
        x: d.x - o.x,
        y: d.y - o.y
    }
}
function getPanInfo({point: d}, o) {
    return {
        point: d,
        delta: subtractPoint(d, lastDevicePoint(o)),
        offset: subtractPoint(d, startDevicePoint(o)),
        velocity: getVelocity(o, .1)
    }
}
function startDevicePoint(d) {
    return d[0]
}
function lastDevicePoint(d) {
    return d[d.length - 1]
}
function getVelocity(d, o) {
    if (d.length < 2)
        return {
            x: 0,
            y: 0
        };

export default animations;
