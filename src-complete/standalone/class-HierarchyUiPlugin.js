/* Standalone Class: HierarchyUiPlugin */

class HierarchyUiPlugin extends AViewerPlugin {
    constructor(o=!0) {
        super(),
        this.enabled = !0,
        this.toJSON = void 0,
        this.treeView = void 0,
        this.hierarchyDiv = ee$1({
            innerHTML: "",
            id: "tpHierarchyContainer",
            addToBody: !1
        }),
        this._resetting = !1,
        this._uiConfig = {
            type: "folder",
            label: "Hierarchy",
            children: []
        },
        this._buildData = (c, h) => (c.push({
            text: h.name || "unnamed",
            id: h.uuid,
            children: h.children.reduce(this._buildData, [])
        }),
        c),
        this._findVisible = (c, h) => (h.visible && (h.children.length < 1 ? c.push(h.uuid) : c.push(...h.children.reduce(this._findVisible, []))),
        c),
        this._setVisible = c => {
            var h;
            (h = this._viewer) === null || h === void 0 || h.doOnce("postFrame", () => {
                var _, b, _e;
                const nt = (_ = this._viewer) === null || _ === void 0 ? void 0 : _.scene.modelRoot;
                if (!nt || c == null)
                    return;
                const it = new Set;
                nt.traverse(at => {
                    at !== nt && (at.visible = c.includes(at.uuid),
                    at.visible && at.traverseAncestors(ut => it.add(ut)))
                }
                ),
                it.forEach(at => at.visible = !0),
                (_e = (b = this._viewer) === null || b === void 0 ? void 0 : b.scene) === null || _e === void 0 || _e.setDirty({
                    sceneUpdate: !0,
                    fromHierarchyPlugin: !0,
                    updateGround: !1
                })
            }
            )
        }
        ,
        this.enabled = o,
        this.reset = this.reset.bind(this),
        P$2($`
#tpHierarchyContainer{
  width: 100%;
  height: auto;
  background-color: transparent;
  color: var(--tp-container-foreground-color, hsl(230, 7%, 75%));
  margin-top: 0;
}

export default HierarchyUiPlugin;
