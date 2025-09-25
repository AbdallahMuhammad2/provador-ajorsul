/* Standalone Class: Window */

class Window {
    static create(o, c) {
        let h = o.getElementsByClassName("title")[0];
        h && (h = h.innerHTML);
        let _ = o.getElementsByClassName("content")[0];
        return _ && (_ = _.innerHTML),
        utility.removeElement(o),
        c.title = h,
        c.content = _,
        new Window(c)
    }
    constructor(o) {
        this.options = JSON.parse(JSON.stringify(defaultOptions));
        for (let it in o)
            o[it] != null && (this.options[it] = o[it]);
        let c = this.options.position;
        if (c.indexOf(" ") == -1 && (c == "left" || c == "right" ? c += " center" : c = c == "top" || c == "bottom" ? "center " + c : c + " " + c),
        this.options.position = c,
        this.options.overlay) {
            let it = document.getElementsByClassName("wwise-overlay");
            it.length ? (this.overlay = it[0],
            this.hasOverlay = !0) : (this.overlay = utility.createDiv("wwise-overlay"),
            this.options.zIndex && (this.overlay.style.zIndex = this.options.zIndex)),
            this.overlayClickHandler = this.close.bind(this, void 0)
        } else
            this.options.clickOverlayToClose = !1;
        let h = "content";
        if (this.options.topbar) {
            let it = [];
            this.options.topbar.showMin && (it.push(utility.createDiv(null, utility.makeIconHTML("min"))),
            it[it.length - 1].addEventListener("click", this.min.bind(this))),
            this.options.topbar.showClose && (it.push(utility.createDiv(null, utility.makeIconHTML("close"))),
            it[it.length - 1].addEventListener("click", this.close.bind(this, void 0)));
            let at = null;
            at = typeof this.options.title == "string" ? utility.createDiv("title", this.options.title) : utility.createDomTree({
                dom: utility.createDiv("title"),
                children: [this.options.title]
            }),
            this.topbar = utility.createDomTree({
                dom: utility.createDiv("topbar"),
                children: [{
                    dom: utility.createDiv("control"),
                    children: it.map(ut => ({
                        dom: ut
                    }))
                }, {
                    dom: at
                }, {
                    dom: utility.createDiv("clear")
                }]
            })
        } else
            h += " no-topbar";
        typeof this.options.content == "string" ? this.content = utility.createDomTree({
            dom: utility.createDiv(h, this.options.content)
        }) : this.content = utility.createDomTree({
            dom: utility.createDiv(h),
            children: [this.options.content]
        }),
        this.options.removeBackground && (this.content.style.background = "initial"),
        this.window = utility.createDomTree({
            dom: utility.createDiv("wwise" + (this.options.noRadius ? " no-radius" : "")),
            children: [this.topbar, this.content]
        });
        let _ = utility.createDiv("wwise-wrapper");
        this.options.zIndex && (_.style.zIndex = this.options.zIndex),
        this.wrapper = utility.createDomTree({
            dom: _,
            children: [this.window]
        }),
        this.dom = utility.createDomTree({
            dom: utility.createDiv(),
            children: [this.wrapper]
        });
        let b = this.options.position.split(" ")
          , _e = -50
          , nt = -50;
        if (b[0] == "left" ? (_e = 0,
        this.wrapper.classList.add("left")) : b[0] == "right" ? (_e = -100,
        this.wrapper.classList.add("right")) : b[0] == "center" ? this.wrapper.classList.add("h-center") : this.wrapper.style.left = b[0],
        b[1] == "top" ? (nt = 0,
        this.wrapper.classList.add("top")) : b[1] == "bottom" ? (nt = -100,
        this.wrapper.classList.add("bottom")) : b[1] == "center" ? this.wrapper.classList.add("v-center") : this.wrapper.style.top = c[1],
        this.window.style.transform = `translate(${_e}%, ${nt}%)`,
        this.options.style)
            for (let it in this.options.style)
                this.window.style[it] = this.options.style[it];
        this.options.margin && (this.wrapper.style.margin = this.options.margin),
        this.options.draggable && this.draggable()
    }
    open(o) {
        if (this.opened)
            return;
        this.promise = new Promise(h => {
            this.promiseResolve = h
        }
        ),
        this.appendDoms(),
        this.opened = !0,
        this.options.clickOverlayToClose && (this.overlay.addEventListener("click", this.overlayClickHandler),
        this.overlay.addEventListener("touchstart", this.overlayClickHandler));
        let c = o ? "min" : this.options.animation;
        if (c) {
            c != "min" && c != "flip" || this.dom.classList.add("wwise-perspective");
            let h = [new animator.Queue(this.wrapper,js_animation[c + "_in"],{
                instant: !0,
                applyOnEnd: !0
            }).getPromise()];
            return this.options.overlay && !this.hasOverlay && h.push(new animator.Queue(this.overlay,js_animation.overlay_in,{
                instant: !0,
                applyOnEnd: !0
            }).getPromise()),
            Promise.all(h).then( () => {
                this.dom.classList.remove("wwise-perspective")
            }
            )
        }
        return Promise.resolve()
    }
    close(o) {
        if (!this.opened)
            return;
        this.opened = !1;
        let c = o ? "min" : this.options.animation;
        if (this.overlay && (this.overlay.removeEventListener("click", this.overlayClickHandler),
        this.overlay.removeEventListener("touchstart", this.overlayClickHandler)),
        c) {
            c != "min" && c != "flip" || this.dom.classList.add("wwise-perspective");
            let h = [new animator.Queue(this.wrapper,js_animation[c + "_out"],{
                instant: !0,
                applyOnEnd: !0
            }).getPromise()];
            return this.options.overlay && !this.options.keepOverlay && h.push(new animator.Queue(this.overlay,js_animation.overlay_out,{
                instant: !0,
                applyOnEnd: !0
            }).getPromise()),
            Promise.all(h).then( () => {
                this.removeDoms(),
                this.dom.classList.remove("wwise-perspective"),
                this.promiseResolve()
            }
            )
        }
        return this.removeDoms(),
        this.promiseResolve(),
        Promise.resolve()
    }
    min() {
        return this.close(!0)
    }
    resume() {
        return this.open(!0)
    }
    getPromise() {
        return this.promise
    }
    appendDoms() {
        this.options.overlay && !this.hasOverlay && (utility.appendToBody(this.overlay),
        document.body.classList.add("wwise-no-scroll"),
        this.overlay.addEventListener("touchstart", o => {
            o.preventDefault()
        }
        )),
        utility.appendToBody(this.dom)
    }
    removeDoms() {
        utility.removeElement(this.dom),
        !this.options.keepOverlay && this.overlay && (utility.removeElement(this.overlay),
        document.body.classList.remove("wwise-no-scroll"))
    }
    draggable(o=!0) {
        this.topbar && (o ? (this.draggableMouseMoveHandler = this.handleDraggableMouseMove.bind(this),
        this.draggableMouseDownHandler = this.handleDraggableMouseDown.bind(this),
        this.draggableMouseUpHandler = this.handleDraggableMouseUp.bind(this),
        this.draggableMouseOutHandler = this.handleDraggableMouseOut.bind(this),
        window.addEventListener("mousemove", this.draggableMouseMoveHandler),
        window.addEventListener("mouseout", this.draggableMouseOutHandler),
        this.topbar.addEventListener("mousedown", this.draggableMouseDownHandler),
        window.addEventListener("mouseup", this.draggableMouseUpHandler)) : (window.removeEventListener("mousemove", this.draggableMouseMoveHandler),
        window.removeEventListener("mouseout", this.draggableMouseOutHandler),
        this.topbar.removeEventListener("mousedown", this.draggableMouseDownHandler),
        window.removeEventListener("mouseup", this.draggableMouseUpHandler)))
    }
    handleDraggableMouseMove(o) {
        if (this.inDragging) {
            let c = {
                x: o.clientX - this.dragPrev.x,
                y: o.clientY - this.dragPrev.y
            }
              , h = window.getComputedStyle(this.wrapper)
              , _ = this.options.draggable
              , b = parseFloat(h.left)
              , _e = parseFloat(h.top);
            if (h.left.indexOf("%") != -1) {
                b = h.left,
                b = b.substr(0, b.length - 1),
                b = parseInt(b);
                let nt = window
                  , it = document
                  , at = it.documentElement
                  , ut = it.getElementsByTagName("body")[0];
                b = b * (nt.innerWidth || at.clientWidth || ut.clientWidth) / 100
            }
            if (h.top.indexOf("%") != -1) {
                _e = h.top,
                _e = _e.substr(0, _e.length - 1),
                _e = parseInt(_e);
                let nt = window
                  , it = document
                  , at = it.documentElement
                  , ut = it.getElementsByTagName("body")[0];
                _e = _e * (nt.innerHeight || at.clientHeight || ut.clientHeight) / 100
            }
            _ != 1 && _ != "horizontal" || (this.wrapper.style.left = b + c.x + "px"),
            _ != 1 && _ != "vertical" || (this.wrapper.style.top = _e + c.y + "px"),
            this.dragPrev = {
                x: o.clientX,
                y: o.clientY
            }
        }
    }
    handleDraggableMouseDown(o) {
        this.inDragging = !0,
        this.dragPrev = {
            x: o.clientX,
            y: o.clientY
        }
    }
    handleDraggableMouseUp(o) {
        this.inDragging = !1
    }
    handleDraggableMouseOut(o) {
        let c = o.relatedTarget;
        c && c.nodeName != "HTML" || (this.inDragging = !1)
    }
}

export default Window;
