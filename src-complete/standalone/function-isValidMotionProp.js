/* Standalone Function: isValidMotionProp */

function isValidMotionProp(d) {
    return d.startsWith("while") || d.startsWith("drag") && d !== "draggable" || d.startsWith("layout") || d.startsWith("onTap") || d.startsWith("onPan") || d.startsWith("onLayout") || validMotionProps.has(d)
}

export default isValidMotionProp;
