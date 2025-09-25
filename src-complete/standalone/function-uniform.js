/* Standalone Function: uniform */

function uniform({uniforms: d, propKey: o, thisTarget: c=!1}={}) {
    const h = !!d
      , _ = !!o
      , b = c;
    return (_e, nt) => {
        const it = at => {
            const ut = b ? at : h ? d : at.uniforms || at._uniforms;
            let pt = _ ? o : nt;
            b && (pt = "_" + pt);
            let ht = ut[pt];
            return ht || (ht = {
                value: null
            },
            ut[pt] = ht),
            ht
        }
        ;
        Object.defineProperty(_e, nt, {
            get() {
                return it(this).value
            },
            set(at) {
                it(this).value = at,
                S$2(this, "uniformsNeedUpdate", !0, !0)
            }
        })
    }
}

export default uniform;
