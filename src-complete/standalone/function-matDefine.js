/* Standalone Function: matDefine */

function matDefine(d, o, c=!1, h) {
    const _ = !!o
      , b = !!d;
    return (_e, nt) => {
        const it = at => ({
            t: _ ? o : at.defines || at._defines,
            p: b ? d : nt
        });
        Object.defineProperty(_e, nt, {
            get() {
                const {t: at, p: ut} = it(c ? this : this.material);
                return at[ut]
            },
            set(at) {
                const {t: ut, p: pt} = it(c ? this : this.material);
                if (S$2(ut, pt, at, !0),
                typeof h == "function") {
                    const ht = [pt, at];
                    if (h.name) {
                        const _t = this[h.name];
                        _t === h ? h.call(this, ...ht) : _t.name === `bound ${h.name}` ? _t(...ht) : h(...ht)
                    } else
                        h(...ht)
                } else
                    S$2(c ? this : this.material, "needsUpdate", !0, !0)
            }
        })
    }
}

export default matDefine;
