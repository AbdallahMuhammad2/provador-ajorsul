/* Standalone Class: Modal */

class Modal {
    constructor(o) {
        let c = this.options = o;
        !c.type && (c.type = "ok");
        let h = {
            topbar: !1
        };
        h.content = this.constructContent({
            type: c.type,
            title: c.title,
            text: c.text,
            content: c.content,
            buttons: c.buttons
        }),
        h.overlay = !0,
        h.keepOverlay = c.keepOverlay,
        h.clickOverlayToClose = !1,
        h.animation = c.animation,
        h.zIndex = c.zIndex,
        this.wwise = new js_window(h)
    }
    constructContent(o) {
        let c = utility.createDiv("modal")
          , h = utility.createDomTree({
            dom: utility.createDiv("main " + o.type),
            children: [utility.createDiv(null, utility.makeIconHTML(o.type)), utility.createDiv("title", o.title), utility.createDiv("text", o.text)]
        });
        this.buttonArr = utility.standardizeButtons(this, o);
        let _ = utility.makeButtons(this.buttonArr)
          , b = null;
        o.content && (b = typeof o.content == "string" ? utility.createDiv(null, o.content) : o.content);
        let _e = null;
        return _.innerHTML && (_e = utility.createDomTree({
            dom: utility.createDiv("operation " + o.type),
            children: [_]
        })),
        b || _e || h.classList.add("no-op"),
        utility.createDomTree({
            dom: c,
            children: [h, b, _e]
        })
    }
    open() {
        if (this.wwise.opened)
            return;
        let o = this.wwise.open();
        return this.value = void 0,
        this.promise = new Promise(c => {
            this.promiseResolve = c
        }
        ),
        this.wwise.getPromise().then(this.handlePromiseResolve.bind(this)),
        this.keyHandler = utility.bindButtonKeyEvents(this.buttonArr),
        this.options.closeAfter && window.setTimeout( () => {
            this.close("timer")
        }
        , this.options.closeAfter),
        o
    }
    close(o) {
        if (this.wwise.opened)
            return this.value = o,
            utility.unbindButtonKeyEvents(this.keyHandler),
            this.wwise.close()
    }
    getPromise() {
        return this.promise
    }
    handlePromiseResolve() {
        this.promiseResolve(this.value)
    }
}

export default Modal;
