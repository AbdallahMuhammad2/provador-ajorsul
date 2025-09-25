/* Standalone Constant: Utility */

let Utility = {
    createElement: (d, o, c, h) => {
        let _ = document.createElement(d);
        if (o && (_.className = o),
        c && (_.innerHTML = c),
        h)
            for (let b in h)
                _.setAttribute(b, h[b]);
        return _
    }
    ,
    createDiv: (d, o, c) => Utility.createElement("div", d, o, c),
    createDomTree: d => {
        if (!d || !d.hasOwnProperty("dom"))
            return d;
        let o = d.dom;
        if (d.children)
            for (let c in d.children)
                d.children[c] && o.appendChild(Utility.createDomTree(d.children[c]));
        return o
    }
    ,
    removeElement: d => {
        d != null && d.parentNode.removeChild(d)
    }
    ,
    appendToBody: d => {
        document.body.appendChild(d)
    }
    ,
    makeIconHTML: d => {
        let o = "";
        return d == "ok" && (o = "#tick"),
        d == "error" && (o = "#cancel"),
        d == "info" && (o = "#info-button"),
        d == "caution" && (o = "#danger"),
        d == "min" && (o = "#line"),
        d == "close" && (o = "#close"),
        `<svg class="icon ${d}"><use xlink:href="${o}" /></svg>`
    }
    ,
    makeNftContent: d => {
        let o = null;
        if (d.type) {
            let c = null;
            c = typeof d.content == "string" ? Utility.createDiv("inner-content", d.content) : Utility.createDomTree({
                dom: Utility.createDiv("inner-content"),
                children: [d.content]
            }),
            o = d.type == "text" ? Utility.createDomTree({
                dom: Utility.createDiv("content text"),
                children: [c]
            }) : Utility.createDomTree({
                dom: Utility.createDiv("content"),
                children: [Utility.createDiv("state", Utility.makeIconHTML(d.type)), c]
            })
        } else
            typeof d.content == "string" && (o = Utility.createDiv("content", d.content));
        return o
    }
    ,
    standardizeButtons: (d, o) => {
        let c = [];
        if (o.buttons === void 0)
            return o.type != "caution" && o.type != "info" || c.push({
                key: 27,
                text: "Cancel",
                onClick: d.close.bind(d, "cancel")
            }),
            c.push({
                key: 13,
                text: "OK",
                type: "main",
                onClick: d.close.bind(d, "ok")
            }),
            c;
        c = o.buttons,
        c.constructor !== Array && (c = [c]);
        for (let h in c)
            !c[h].onClick && (c[h].onClick = d.close.bind(d, c[h].id));
        return c
    }
    ,
    makeButtons: d => {
        let o = [];
        if (d)
            for (let c in d)
                o.push(js_button.create({
                    text: d[c].text ? d[c].text : "OK",
                    type: d[c].normal ? null : "main",
                    onClick: d[c].onClick
                }));
        return Utility.createDomTree({
            dom: Utility.createDiv("button-wrapper"),
            children: o
        })
    }
    ,
    bindButtonKeyEvents: d => {
        let o = c => {
            for (let h in d)
                if (d[h].key === c.keyCode)
                    return void d[h].onClick()
        }
        ;
        return window.addEventListener("keydown", o),
        o
    }
    ,
    unbindButtonKeyEvents: d => {
        window.removeEventListener("keydown", d)
    }
};

export default Utility;
