/* Standalone Function: Fi */

function Fi(d, o, c, h, _, b, _e) {
    return d = d.stateNode,
    typeof d.shouldComponentUpdate == "function" ? d.shouldComponentUpdate(h, b, _e) : o.prototype && o.prototype.isPureReactComponent ? !Ie(c, h) || !Ie(_, b) : !0
}

export default Fi;
