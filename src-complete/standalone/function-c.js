/* Standalone Function: c */

function c(h) {
            let _ = ""
              , b = 1;
            for (; b < h.length && (_ += h[b],
            h[b].endsWith("\\")); b++)
                _ = _.slice(0, -1),
                _ += ".";
            return [_, b]
        }
        await super.onAdded(o),
        o._animGetters = {
            objects: h => {
                if (h.length < 2 || !o)
                    return;
                const [_,b] = c(h);
                return {
                    tar: o.scene.getObjectByName(_),
                    i: b
                }
            }
            ,
            materials: h => {
                var _, b, _e;
                if (h.length < 2 || !o)
                    return;
                const [nt,it] = c(h);
                return {
                    tar: (_e = (b = (_ = o.assetManager) === null || _ === void 0 ? void 0 : _.materials) === null || b === void 0 ? void 0 : b.findMaterialsByName(nt)) === null || _e === void 0 ? void 0 : _e[0],
                    i: it
                }
            }
        }
    }
}

export default c;
