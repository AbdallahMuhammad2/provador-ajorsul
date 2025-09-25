/* Standalone Class: ScrollableCameraViewPlugin */

class ScrollableCameraViewPlugin extends CameraViewControlPlugin {
    constructor(o=document.body, c=!0) {
        super(c),
        this.wrapper = document.createElement("div"),
        this.toJSON = void 0,
        this.uiConfig = {
            type: "folder",
            label: "Scrollable Camera Views",
            children: [...generateUiConfig(this)]
        },
        typeof o == "string" ? (this.parent = document.getElementById(o),
        this.parent || (console.error("parent doesn't exist"),
        this.parent = document.body)) : this.parent = o
    }
    _preFrame(o) {
        var c;
        if (this.enabled && !(this._cameraViews.length <= 1))
            try {
                const h = this._findActiveView()
                  , _ = this._getScroll(h);
                this.setState(_ + h),
                super._preFrame(o)
            } catch (h) {
                return void (((c = this._viewer) === null || c === void 0 ? void 0 : c.getPluginByType("Debug")) && console.error(h))
            }
    }
    _getScroll(o) {
        var c, h;
        if (o >= this._cameraViews.length - 1)
            return 0;
        const _ = (c = this.parent.querySelector(this._cameraViews[o].name)) !== null && c !== void 0 ? c : this.parent.getElementsByTagName("section")[o]
          , b = (h = this.parent.querySelector(this._cameraViews[o + 1].name)) !== null && h !== void 0 ? h : this.parent.getElementsByTagName("section")[o + 1]
          , _e = this.parent.getBoundingClientRect();
        if (!_ || !b)
            return 0;
        const nt = _.getBoundingClientRect()
          , it = b.getBoundingClientRect()
          , at = this.parent === document.body ? 0 : _e.top;
        return three_module.cj9.clamp((at - nt.top) / Math.max(it.top - nt.top, 1e-4), 0, 1)
    }
    _findActiveView() {
        var o, c;
        for (let h = this._cameraViews.length - 1; h >= 0; h--) {
            const _ = (o = this.parent.querySelector(this._cameraViews[h].name)) !== null && o !== void 0 ? o : this.parent.getElementsByTagName("section")[h]
              , b = this.parent.getBoundingClientRect();
            if (_) {
                if (_.getBoundingClientRect().top < (this.parent === document.body ? 0 : b.top))
                    return h
            } else
                !((c = this._cameraViews[h].name) === null || c === void 0) && c.startsWith("#") && console.error("section with id " + this._cameraViews[h].name + " doesn't exist!")
        }
        return 0
    }
}

export default ScrollableCameraViewPlugin;
