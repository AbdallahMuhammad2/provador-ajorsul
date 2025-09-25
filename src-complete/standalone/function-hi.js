/* Standalone Function: Hi */

function Hi(d, o, c, h) {
    d = o.state,
    typeof o.componentWillReceiveProps == "function" && o.componentWillReceiveProps(c, h),
    typeof o.UNSAFE_componentWillReceiveProps == "function" && o.UNSAFE_componentWillReceiveProps(c, h),
    o.state !== d && Ei.enqueueReplaceState(o, o.state, null)
}

export default Hi;
