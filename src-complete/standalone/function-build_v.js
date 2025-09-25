/* Standalone Function: build_v */

function build_v(d, o=[], c=function() {}
) {
    let h = !1;
    const _ = new Proxy(c,{
        get(b, _e) {
            if (build_m(h),
            _e === build_o)
                return () => {
                    (function(nt) {
                        build_w && build_w.unregister(nt)
                    }
                    )(_),
                    build_g(d),
                    h = !0
                }
                ;
            if (_e === "then") {
                if (o.length === 0)
                    return {
                        then: () => _
                    };
                const nt = build_P(d, {
                    type: "GET",
                    path: o.map(it => it.toString())
                }).then(build_L);
                return nt.then.bind(nt)
            }
            return build_v(d, [...o, _e])
        },
        set(b, _e, nt) {
            build_m(h);
            const [it,at] = build_A(nt);
            return build_P(d, {
                type: "SET",
                path: [...o, _e].map(ut => ut.toString()),
                value: it
            }, at).then(build_L)
        },
        apply(b, _e, nt) {
            build_m(h);
            const it = o[o.length - 1];
            if (it === build_a)
                return build_P(d, {
                    type: "ENDPOINT"
                }).then(build_L);
            if (it === "bind")
                return build_v(d, o.slice(0, -1));
            const [at,ut] = build_b(nt);
            return build_P(d, {
                type: "APPLY",
                path: o.map(pt => pt.toString()),
                argumentList: at
            }, ut).then(build_L)
        },
        construct(b, _e) {
            build_m(h);
            const [nt,it] = build_b(_e);
            return build_P(d, {
                type: "CONSTRUCT",
                path: o.map(at => at.toString()),
                argumentList: nt
            }, it).then(build_L)
        }
    });
    return function(b, _e) {
        const nt = (build_y.get(_e) || 0) + 1;
        build_y.set(_e, nt),
        build_w && build_w.register(b, _e, b)
    }(_, d),
    _
}

export default build_v;
