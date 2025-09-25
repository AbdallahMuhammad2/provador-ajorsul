/* Standalone Class: SimpleTextExporter */

class SimpleTextExporter {
    async parseAsync(o, c) {
        return new Blob([o],{
            type: "text/plain"
        })
    }
}

export default SimpleTextExporter;
