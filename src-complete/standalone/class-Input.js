/* Standalone Class: Input */

class Input {
    constructor(o) {
        this.options = JSON.parse(JSON.stringify(input_defaultOptions));
        for (let b in o)
            o[b] != null && (this.options[b] = o[b]);
        let c = this.options
          , h = JSON.parse(JSON.stringify(defaultWwiseOptions));
        for (let b in h)
            c.hasOwnProperty(b) && (h[b] = c[b]);
        let _ = [];
        c.showCancel && _.push({
            key: 27,
            text: c.cancelText,
            normal: !0,
            onClick: this.handleCancel.bind(this)
        }),
        _.push({
            key: 13,
            text: c.okText,
            onClick: this.handleOk.bind(this)
        }),
        h.buttons = _,
        this.input = utility.createElement("input", "input", null, {
            placeholder: c.placeholder
        }),
        this.error = utility.createDiv("error"),
        h.content = utility.createDomTree({
            dom: utility.createDiv("input-wrapper"),
            children: [this.input, this.error]
        }),
        this.modal = new js_modal(h)
    }
    handleCancel() {
        this.close().then(this.promiseReject.bind(this))
    }
    handleOk() {
        this.options.validator ? this.options.validator(this.input.value).then( () => {
            this.close().then(this.promiseResolve.bind(this, this.input.value))
        }
        , o => {
            this.error.innerText = o
        }
        ) : this.close().then(this.promiseResolve.bind(this, this.input.value))
    }
    open() {
        if (this.modal.wwise.opened)
            return;
        let o = this.modal.open();
        return this.input.value = "",
        this.error.innerText = "",
        this.input.focus(),
        this.promise = new Promise( (c, h) => {
            this.promiseResolve = c,
            this.promiseReject = h
        }
        ),
        o
    }
    close() {
        if (this.modal.wwise.opened)
            return this.modal.close()
    }
    getPromise() {
        return this.promise
    }
}

export default Input;
