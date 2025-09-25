/* Standalone Class: Dropzone */

class Dropzone {
    get inputEl() {
        return this._inputEl
    }
    get el() {
        return this._el
    }
    constructor(o, c, h) {
        this._el = o,
        this._inputEl = c,
        this._listeners = {
            drop: [],
            dropstart: [],
            droperror: []
        },
        this._onDragover = this._onDragover.bind(this),
        this._onDrop = this._onDrop.bind(this),
        this._onSelect = this._onSelect.bind(this),
        o == null || o.addEventListener("dragover", this._onDragover, !1),
        o == null || o.addEventListener("drop", this._onDrop, !1),
        c == null || c.addEventListener("change", this._onSelect),
        h && Object.entries(h).forEach( ([_,b]) => b && this.on(_, b))
    }
    on(o, c) {
        return this._listeners[o].push(c),
        this
    }
    _emit(o, c) {
        return this._listeners[o].forEach(h => h(c)),
        this
    }
    destroy() {
        const o = this._el
          , c = this._inputEl;
        o == null || o.removeEventListener("dragover", this._onDragover),
        o == null || o.removeEventListener("drop", this._onDrop),
        c == null || c.removeEventListener("change", this._onSelect)
    }
    _onDrop(o) {
        var c, h;
        o.stopPropagation(),
        o.preventDefault(),
        this._emit("dropstart");
        const _ = Array.from(((c = o.dataTransfer) === null || c === void 0 ? void 0 : c.files) || [])
          , b = Array.from(((h = o.dataTransfer) === null || h === void 0 ? void 0 : h.items) || []);
        if (_.length !== 0 || b.length !== 0)
            if (b.length > 0) {
                const _e = b.map(nt => nt.webkitGetAsEntry());
                this._loadNextEntry(new Map, _e)
            } else
                this._emit("drop", {
                    files: new Map(_.map(_e => (_e.filePath = _e.name,
                    [_e.filePath, _e])))
                });
        else
            this._fail("Required drag-and-drop APIs are not supported in this browser.")
    }
    _onDragover(o) {
        o.stopPropagation(),
        o.preventDefault(),
        o.dataTransfer && (o.dataTransfer.dropEffect = "copy")
    }
    _onSelect(o) {
        var c;
        if (!this._inputEl)
            return void console.warn("Invalid Dropzone event ", o);
        this._emit("dropstart");
        const h = [].slice.call((c = this._inputEl.files) !== null && c !== void 0 ? c : new FileList)
          , _ = new Map;
        h.forEach(b => {
            b.filePath = b.webkitRelativePath || b.name,
            _.set(b.filePath, b)
        }
        ),
        this._emit("drop", {
            files: _
        })
    }
    _loadNextEntry(o, c) {
        const h = c.pop();
        if (h)
            if (h.isFile)
                h.file(_ => {
                    _.filePath = h.fullPath,
                    o.set(h.fullPath, _),
                    this._loadNextEntry(o, c)
                }
                , () => console.error("Could not load file: %s", h.fullPath));
            else if (h.isDirectory) {
                const _ = h.createReader()
                  , b = _e => {
                    _e.length ? (c = c.concat(_e),
                    _.readEntries(b)) : this._loadNextEntry(o, c)
                }
                ;
                _.readEntries(b)
            } else
                console.warn("Unknown asset type: " + h.fullPath),
                this._loadNextEntry(o, c);
        else
            this._emit("drop", {
                files: o
            })
    }
    _fail(o) {
        this._emit("droperror", {
            message: o
        })
    }
}

export default Dropzone;
