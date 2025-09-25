/* Standalone Function: invokeWithArgsOrReturn */

function invokeWithArgsOrReturn(d, o) {
    return typeof d == "function" ? d.apply(void 0, o) : d
}

export default invokeWithArgsOrReturn;
