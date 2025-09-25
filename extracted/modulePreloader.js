/* MODULEPRELOADER */
/* Module preloader and polyfills */
/* Lines: 1-34 */
/* Size: 1091 characters */

(function() {
    const o = document.createElement("link").relList;
    if (o && o.supports && o.supports("modulepreload"))
        return;
    for (const _ of document.querySelectorAll('link[rel="modulepreload"]'))
        h(_);
    new MutationObserver(_ => {
        for (const b of _)
            if (b.type === "childList")
                for (const _e of b.addedNodes)
                    _e.tagName === "LINK" && _e.rel === "modulepreload" && h(_e)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function c(_) {
        const b = {};
        return _.integrity && (b.integrity = _.integrity),
        _.referrerPolicy && (b.referrerPolicy = _.referrerPolicy),
        _.crossOrigin === "use-credentials" ? b.credentials = "include" : _.crossOrigin === "anonymous" ? b.credentials = "omit" : b.credentials = "same-origin",
        b
    }
    function h(_) {
        if (_.ep)
            return;
        _.ep = !0;
        const b = c(_);
        fetch(_.href, b)
    }
}
)();
/*! For license information please see bundle.m.js.LICENSE.txt */
