/* Standalone Class: CustomContextGrid */

class CustomContextGrid {
    static _initializeStyles() {
        P$2($`
  .customContextGrid {
    background: #eeeeee55;
    border: 0.5px solid rgba(220, 220, 220, 0.2);
    width: auto;
    height: auto;
    position: absolute;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    z-index: 200;
    padding: 0.35rem 0.35rem;
    border-radius: 0.375rem;
    min-width: 5rem;
    pointer-events: auto;
    box-shadow: 0px 2px 6px rgba(12, 12, 12, 0.2);

    color: #111111;
    font-size: 0.65rem;
    font-family: Inter, "Roboto Mono", "Source Code Pro", Menlo, Courier, monospace;
    backdrop-filter: blur(20px);
  }
  .customContextGridItems {
    background-color: transparent;
    cursor: pointer;
    border-radius: 0.25rem;
    line-height: 1rem;
    font-weight: 500;
    overflow: hidden;
    margin: 0.12rem;
  }

  .customContextGridItems:hover {
    color: white;
    //background-color: #017AFF;
    box-shadow: 0 0 7px 0px rgba(64, 64, 64, 0.3);
  }
  .customContextGridItemImage{
    width: 100%;
    height: 100%;
  }
  .customContextGridHeading{
    width: 100%;
    padding: 5px;
    font-size: 0.85rem;
  }
  .customContextGridParent{
    position: absolute;
    top: 0;
    left: 0;
    width: 270px;
    height: calc(100% - 100px);
    overflow-y: scroll;
    z-index: 100;
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    margin-top: 50px;
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  .customContextGridParent::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  .customContextGridParent {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

        `, this._container),
        this._container.style.position = "absolute",
        this._container.style.top = "0",
        this._container.style.left = "0",
        this._container.style.width = "270px",
        this._container.style.height = "100%",
        this._container.style.pointerEvents = "none",
        this._container.style.zIndex = "100",
        this._container.style.overflowY = "auto"
    }
    static Create(o, c, h, _, b, _e, nt) {
        var it;
        const at = we$1()
          , ut = at ? .15 : .25
          , pt = at ? 1.5 : 2.5
          , ht = ee$1({
            classList: ["customContextGrid"],
            addToBody: !1,
            innerHTML: `
            <div class="customContextGridHeading"> ${c} </div>
            `
        });
        ht.style.top = b + "px",
        ht.style.left = _ + "px",
        ht.style.gap = ut + "rem",
        ht.style.width = (pt + ut) * h - ut + "rem",
        ht.dataset.tag = o;
        for (const _t of _e) {
            const vt = ee$1({
                classList: ["customContextGridItems"],
                addToBody: !1,
                innerHTML: `
            <img src="${_t.image}" class="customContextGridItemImage">
            `
            });
            vt.style.width = pt + "rem",
            vt.style.height = pt + "rem",
            ht.appendChild(vt),
            vt.onclick = () => {
                var bt;
                return (bt = _t.onClick) === null || bt === void 0 ? void 0 : bt.call(_t, _t.id)
            }
            ,
            nt(vt, _t, ht)
        }
        return (it = this.Elements) === null || it === void 0 || it.push(ht),
        ht
    }
    static RemoveAll(o) {
        if (o) {
            const c = this.Elements.filter(h => h.dataset.tag === o);
            for (const h of c)
                h.remove();
            this.Elements = this.Elements.filter(h => h.dataset.tag !== o)
        } else {
            for (const c of this.Elements)
                c.remove();
            this.Elements = []
        }
    }
    static RebuildUi(o) {
        if (this.Elements.length === 0)
            return;
        o || (o = ee$1({
            addToBody: !0,
            classList: ["customContextGridParent"]
        }));
        for (const h of this.Elements)
            h.remove();
        this._container.innerHTML = "",
        this._initializeStyles();
        let c = 20;
        o.appendChild(this._container);
        for (const h of this.Elements)
            h.style.top = c + "px",
            this._container.appendChild(h),
            c += h.clientHeight + 20
    }
}

export default CustomContextGrid;
