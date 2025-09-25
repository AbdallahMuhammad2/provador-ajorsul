/* Standalone Constant: build_e */

var build_e = {
    d: (d, o) => {
        for (var c in o)
            build_e.o(o, c) && !build_e.o(d, c) && Object.defineProperty(d, c, {
                enumerable: !0,
                get: o[c]
            })
    }
    ,
    o: (d, o) => Object.prototype.hasOwnProperty.call(d, o)
}
  , build_t = {};

export default build_e;
