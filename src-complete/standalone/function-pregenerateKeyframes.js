/* Standalone Function: pregenerateKeyframes */

function pregenerateKeyframes(d, o) {
    const c = new MainThreadAnimation({
        ...o,
        keyframes: d,
        repeat: 0,
        delay: 0,
        isGenerator: !0
    });
    let h = {
        done: !1,
        value: d[0]
    };
    const _ = [];
    let b = 0;
    for (; !h.done && b < maxDuration; )
        h = c.sample(b),
        _.push(h.value),
        b += sampleDelta;
    return {
        times: void 0,
        keyframes: _,
        duration: b - sampleDelta,
        ease: "linear"
    }
}

export default pregenerateKeyframes;
