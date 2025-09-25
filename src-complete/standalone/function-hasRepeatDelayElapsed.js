/* Standalone Function: hasRepeatDelayElapsed */

function hasRepeatDelayElapsed(d, o, c, h) {
    return h ? d >= o + c : d <= -c
}

export default hasRepeatDelayElapsed;
