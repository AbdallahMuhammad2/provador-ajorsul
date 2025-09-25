/* Standalone Constant: AS */

const AS = {
            convertArray: Rp,
            isTypedArray: yA,
            getKeyframeOrder: xA,
            sortedArray: my,
            flattenJSON: fy,
            subclip: function(Tt, tt, lt, mt, ft=30) {
                const xt = Tt.clone();
                xt.name = tt;
                const Ct = [];
                for (let Lt = 0; Lt < xt.tracks.length; ++Lt) {
                    const Nt = xt.tracks[Lt]
                      , jt = Nt.getValueSize()
                      , Wt = []
                      , Qt = [];
                    for (let qt = 0; qt < Nt.times.length; ++qt) {
                        const Xt = Nt.times[qt] * ft;
                        if (!(Xt < lt || Xt >= mt)) {
                            Wt.push(Nt.times[qt]);
                            for (let Zt = 0; Zt < jt; ++Zt)
                                Qt.push(Nt.values[qt * jt + Zt])
                        }
                    }
                    Wt.length !== 0 && (Nt.times = Rp(Wt, Nt.times.constructor),
                    Nt.values = Rp(Qt, Nt.values.constructor),
                    Ct.push(Nt))
                }
                xt.tracks = Ct;
                let Mt = 1 / 0;
                for (let Lt = 0; Lt < xt.tracks.length; ++Lt)
                    Mt > xt.tracks[Lt].times[0] && (Mt = xt.tracks[Lt].times[0]);
                for (let Lt = 0; Lt < xt.tracks.length; ++Lt)
                    xt.tracks[Lt].shift(-1 * Mt);
                return xt.resetDuration(),
                xt
            },
            makeClipAdditive: function(Tt, tt=0, lt=Tt, mt=30) {
                mt <= 0 && (mt = 30);
                const ft = lt.tracks.length
                  , xt = tt / mt;
                for (let Ct = 0; Ct < ft; ++Ct) {
                    const Mt = lt.tracks[Ct]
                      , Lt = Mt.ValueTypeName;
                    if (Lt === "bool" || Lt === "string")
                        continue;
                    const Nt = Tt.tracks.find(function(sr) {
                        return sr.name === Mt.name && sr.ValueTypeName === Lt
                    });
                    if (Nt === void 0)
                        continue;
                    let jt = 0;
                    const Wt = Mt.getValueSize();
                    Mt.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (jt = Wt / 3);
                    let Qt = 0;
                    const qt = Nt.getValueSize();
                    Nt.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (Qt = qt / 3);
                    const Xt = Mt.times.length - 1;
                    let Zt;
                    if (xt <= Mt.times[0]) {
                        const sr = jt
                          , er = Wt - jt;
                        Zt = Mt.values.slice(sr, er)
                    } else if (xt >= Mt.times[Xt]) {
                        const sr = Xt * Wt + jt
                          , er = sr + Wt - jt;
                        Zt = Mt.values.slice(sr, er)
                    } else {
                        const sr = Mt.createInterpolant()
                          , er = jt
                          , rr = Wt - jt;
                        sr.evaluate(xt),
                        Zt = sr.resultBuffer.slice(er, rr)
                    }
                    Lt === "quaternion" && new Is().fromArray(Zt).normalize().conjugate().toArray(Zt);
                    const Yt = Nt.times.length;
                    for (let sr = 0; sr < Yt; ++sr) {
                        const er = sr * qt + Qt;
                        if (Lt === "quaternion")
                            Is.multiplyQuaternionsFlat(Nt.values, er, Zt, 0, Nt.values, er);
                        else {
                            const rr = qt - 2 * Qt;
                            for (let xr = 0; xr < rr; ++xr)
                                Nt.values[er + xr] -= Zt[xr]
                        }
                    }
                }
                return Tt.blendMode = Xp,
                Tt
            }
        };

export default AS;
