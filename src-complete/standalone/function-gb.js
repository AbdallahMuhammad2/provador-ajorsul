/* Standalone Function: gb */

function gb(d, o) {
    if (o.dangerouslySetInnerHTML != null)
        throw Error(p(91));
    return A({}, o, {
        value: void 0,
        defaultValue: void 0,
        children: "" + d._wrapperState.initialValue
    })
}

export default gb;
