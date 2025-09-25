/* Standalone Class: FileTransferPlugin */

class FileTransferPlugin extends AViewerPlugin {
    constructor() {
        super(...arguments),
        this.enabled = !0,
        this.toJSON = void 0,
        this.defaultActions = {
            exportFile: async (o, c, h) => {
                N$2(o, c)
            }
        },
        this.actions = {
            ...this.defaultActions
        }
    }
    async exportFile(o, c) {
        c = c || o.name || "file_export",
        this.dispatchEvent({
            type: "transferFile",
            path: c,
            state: "exporting"
        }),
        await this.actions.exportFile(o, c, ({state: h, progress: _}) => {
            this.dispatchEvent({
                type: "transferFile",
                path: c,
                state: h ?? "exporting",
                progress: _
            })
        }
        ),
        this.dispatchEvent({
            type: "transferFile",
            path: c,
            state: "done"
        })
    }
}

export default FileTransferPlugin;
