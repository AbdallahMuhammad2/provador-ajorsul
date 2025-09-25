/* Standalone Class: SimpleJSONExporter */

class SimpleJSONExporter {
    async parseAsync(o, c) {
        var h;
        return new Blob([JSON.stringify(o, null, (h = c.jsonSpaces) !== null && h !== void 0 ? h : 2)],{
            type: "application/json"
        })
    }
}

export default SimpleJSONExporter;
