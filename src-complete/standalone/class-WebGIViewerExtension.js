/* Standalone Class: WebGIViewerExtension */

class WebGIViewerExtension extends Extension {
    constructor() {
        super(...arguments),
        this.extensionName = viewerGLTFExtension,
        this._viewerConfig = {},
        this._texturesRef = [],
        this.required = !0
    }
    read(o) {
        var c;
        return this._viewerConfig = {},
        (c = o.jsonDoc.json.scenes) === null || c === void 0 || c.forEach( (h, _) => {
            if (h.extensions && h.extensions[viewerGLTFExtension]) {
                const b = new WebGIViewerExtensionProperty(this.document.getGraph());
                o.scenes[_].setExtension(viewerGLTFExtension, b),
                this._viewerConfig = h.extensions[viewerGLTFExtension]
            }
        }
        ),
        this
    }
    write(o) {
        return this.document.getRoot().listScenes().forEach(c => {
            var h;
            if (c.getExtension(viewerGLTFExtension)) {
                const _ = (h = o.jsonDoc.json.scenes) === null || h === void 0 ? void 0 : h[o.jsonDoc.json.scene || 0];
                _ && Object.keys(this._viewerConfig).length > 0 && (_.extensions = _.extensions || {},
                _.extensions[viewerGLTFExtension] = this._viewerConfig,
                this._texturesRef = [],
                this._viewerConfig = {})
            }
        }
        ),
        this
    }
}

export default WebGIViewerExtension;
