/* Standalone Class: build_T */

class build_T extends build_s {
    init(o, c, h, _) {
        if (!this.api) {
            if (!_)
                throw new Error("workerFilePath is required");
            ( () => {
                var b, _e, nt;
                b = this,
                nt = function*() {
                    const it = yield fetch(_).then(pt => pt.blob())
                      , at = URL.createObjectURL(it)
                      , ut = new Worker(at,{
                        type: "module"
                    });
                    this.api = yield new (build_f(ut))(build_x( () => {
                        o(),
                        URL.revokeObjectURL(at)
                    }
                    ),build_x( (pt, ht) => pt === "xatlas.wasm" ? h : pt + ht),build_x(c))
                }
                ,
                new ((_e = void 0) || (_e = Promise))(function(it, at) {
                    function ut(_t) {
                        try {
                            ht(nt.next(_t))
                        } catch (vt) {
                            at(vt)
                        }
                    }
                    function pt(_t) {
                        try {
                            ht(nt.throw(_t))
                        } catch (vt) {
                            at(vt)
                        }
                    }
                    function ht(_t) {
                        var vt;
                        _t.done ? it(_t.value) : (vt = _t.value,
                        vt instanceof _e ? vt : new _e(function(bt) {
                            bt(vt)
                        }
                        )).then(ut, pt)
                    }
                    ht((nt = nt.apply(b, [])).next())
                }
                )
            }
            )()
        }
    }
}

export default build_T;
