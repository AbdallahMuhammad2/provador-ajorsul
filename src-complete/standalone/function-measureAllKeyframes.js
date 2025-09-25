/* Standalone Function: measureAllKeyframes */

function measureAllKeyframes() {
    if (anyNeedsMeasurement) {
        const d = Array.from(toResolve).filter(h => h.needsMeasurement)
          , o = new Set(d.map(h => h.element))
          , c = new Map;
        o.forEach(h => {
            const _ = removeNonTranslationalTransform(h);
            _.length && (c.set(h, _),
            h.render())
        }
        ),
        d.forEach(h => h.measureInitialState()),
        o.forEach(h => {
            h.render();
            const _ = c.get(h);
            _ && _.forEach( ([b,_e]) => {
                var nt;
                (nt = h.getValue(b)) === null || nt === void 0 || nt.set(_e)
            }
            )
        }
        ),
        d.forEach(h => h.measureEndState()),
        d.forEach(h => {
            h.suspendedScrollY !== void 0 && window.scrollTo(0, h.suspendedScrollY)
        }
        )
    }
    anyNeedsMeasurement = !1,
    isScheduled = !1,
    toResolve.forEach(d => d.complete()),
    toResolve.clear()
}

export default measureAllKeyframes;
