/* Standalone Class: CustomContextMenu */

class CustomContextMenu {
    static _initialize() {
        this._inited = !0,
        P$2($`
          #customContextMenu {
            background: #2c2c2e99;
            backdrop-filter: blur(8px);
            border: 0.5px solid rgba(20, 20, 20, 0.3);
            width: auto;
            height: auto;
            position: absolute;
            display: flex;
            flex-direction: column;
            z-index: 9999;
            padding: 0.35rem 0.20rem;
            border-radius: 0.375rem;
            min-width: 6rem;
            pointer-events: auto;
            box-shadow: 0px 2px 10px rgba(12, 12, 12, 0.2);
          }

          .customContextMenuItems {
            color: white;
            font-size: 0.65rem;
            font-family: "Roboto Mono", "Source Code Pro", Menlo, Courier, monospace;
            background-color: transparent;
            cursor: pointer;
            padding: 0.12rem 0.35rem;
            border-radius: 0.25rem;
            line-height: 1rem;
            font-weight: 500;
          }

          .customContextMenuItems:hover {
            color: white;
            background-color: #017AFF;
          }
        `),
        document.addEventListener("mouseup", o => {
            this.Element && !this.Element.contains(o.target) && o.button === 0 && this.Remove()
        }
        )
    }
    static Create(o, c, h) {
        this._inited || this._initialize(),
        this.Element && this.Remove();
        const _ = ee$1({
            id: "customContextMenu",
            addToBody: !1
        });
        _.style.top = h + "px",
        _.style.left = c + "px";
        for (const [b,_e] of Object.entries(o)) {
            const nt = ee$1({
                classList: ["customContextMenuItems"],
                addToBody: !1,
                innerHTML: b
            });
            _.appendChild(nt),
            nt.onclick = _e
        }
        return this.Element = _,
        _
    }
    static Remove() {
        var o;
        (o = this.Element) === null || o === void 0 || o.remove(),
        this.Element = void 0
    }
}

export default CustomContextMenu;
