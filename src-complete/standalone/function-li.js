/* Standalone Function: Li */

function Li(d, o) {
    try {
        console.error(o.value)
    } catch (c) {
        setTimeout(function() {
            throw c
        })
    }
}

export default Li;
