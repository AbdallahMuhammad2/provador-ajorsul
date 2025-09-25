/* Standalone Function: uiFolder */

function uiFolder(d, o, c="folder") {
    return h => class extends h {
        constructor() {
            super(...arguments),
            this.uiConfig = generateUiFolder(d, this, o || {}, c)
        }
    }
}

export default uiFolder;
