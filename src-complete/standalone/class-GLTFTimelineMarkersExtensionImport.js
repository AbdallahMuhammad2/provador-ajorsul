/* Standalone Class: GLTFTimelineMarkersExtensionImport */

class GLTFTimelineMarkersExtensionImport {
    constructor(o, c) {
        this.parser = o,
        this.name = GLTFAnimationPlugin.AnimationMarkersExtension,
        this.plugin = c
    }
    async afterRoot(o) {
        var c;
        let h = [];
        for (const ht of this.parser.json.scenes || []) {
            if (!ht.extensions)
                continue;
            const _t = ht.extensions[this.name];
            for (const vt of (_t == null ? void 0 : _t.markers) || []) {
                const bt = vt.camera !== void 0 ? await this.parser.getDependency("camera", vt.camera) : void 0;
                vt.time === void 0 && (vt.time = vt.frame / 30,
                console.error("Update timeline markers plugin for correct times.")),
                h.push({
                    name: vt.name,
                    frame: vt.frame,
                    time: vt.time,
                    camera: bt
                })
            }
        }
        if (h.length < 1)
            return;
        h = h.sort( (ht, _t) => ht.frame - _t.frame);
        const _ = (c = o.scene) !== null && c !== void 0 ? c : o.scenes[0];
        if (!_)
            return;
        _.userData.__markers = h;
        const b = this.plugin.timelineMarkers
          , _e = h.map(ht => ht.time);
        let nt = b.length;
        const it = h.map(ht => nt++)
          , at = Math.max(..._e) + .01;
        b.push(...h);
        const ut = new three_module.Hit(".currentTimelineMarker",_e,it,three_module.ljd)
          , pt = new three_module.tz3("animationTimelineMarker",at,[ut]);
        pt.__gltfExport = !1,
        o.animations.push(pt)
    }
}

export default GLTFTimelineMarkersExtensionImport;
