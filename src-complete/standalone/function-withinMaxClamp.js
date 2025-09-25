/* Standalone Function: withinMaxClamp */

function withinMaxClamp(d, o, c) {
    var h = within(d, o, c);
    return h > c ? c : h
}

export default withinMaxClamp;
