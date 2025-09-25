/* Standalone Function: tf */

function tf(d, o, c) {
    return {
        instance: d,
        listener: o,
        currentTarget: c
    }
}

export default tf;
