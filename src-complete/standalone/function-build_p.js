/* Standalone Function: build_P */

function build_P(d, o, c) {
    return new Promise(h => {
        const _ = new Array(4).fill(0).map( () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
        d.addEventListener("message", function b(_e) {
            _e.data && _e.data.id && _e.data.id === _ && (d.removeEventListener("message", b),
            h(_e.data))
        }),
        d.start && d.start(),
        d.postMessage(Object.assign({
            id: _
        }, o), c)
    }
    )
}

export default build_P;
