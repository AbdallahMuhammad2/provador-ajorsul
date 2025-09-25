/* Standalone Constant: ft */

const ft = {}
                  , xt = /^([\w-]*?)([\d]+)$/;
                for (let Mt = 0, Lt = tt.length; Mt < Lt; Mt++) {
                    const Nt = tt[Mt]
                      , jt = Nt.name.match(xt);
                    if (jt && jt.length > 1) {
                        const Wt = jt[1];
                        let Qt = ft[Wt];
                        Qt || (ft[Wt] = Qt = []),
                        Qt.push(Nt)
                    }
                }
                const Ct = [];
                for (const Mt in ft)
                    Ct.push(this.CreateFromMorphTargetSequence(Mt, ft[Mt], lt, mt));
                return Ct
            }
            static parseAnimation(tt, lt) {
                if (!tt)
                    return console.error("THREE.AnimationClip: No animation in JSONLoader data."),
                    null;
                const mt = function(jt, Wt, Qt, qt, Xt) {
                    if (Qt.length !== 0) {
                        const Zt = []
                          , Yt = [];
                        fy(Qt, Zt, Yt, qt),
                        Zt.length !== 0 && Xt.push(new jt(Wt,Zt,Yt))
                    }
                }
                  , ft = []
                  , xt = tt.name || "default"
                  , Ct = tt.fps || 30
                  , Mt = tt.blendMode;
                let Lt = tt.length || -1;
                const Nt = tt.hierarchy || [];
                for (let jt = 0; jt < Nt.length; jt++) {
                    const Wt = Nt[jt].keys;
                    if (Wt && Wt.length !== 0)
                        if (Wt[0].morphTargets) {
                            const Qt = {};

export default ft;
