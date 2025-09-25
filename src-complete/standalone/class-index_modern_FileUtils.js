/* Standalone Class: index_modern_FileUtils */

class index_modern_FileUtils {
    static basename(o) {
        const c = o.split(/[\\/]/).pop();
        return c.substring(0, c.lastIndexOf("."))
    }
    static extension(o) {
        if (o.startsWith("data:image/")) {
            const c = o.match(/data:(image\/\w+)/)[1];
            return index_modern_ImageUtils.mimeTypeToExtension(c)
        }
        return o.startsWith("data:model/gltf+json") ? "gltf" : o.startsWith("data:model/gltf-binary") ? "glb" : o.startsWith("data:application/") ? "bin" : o.split(/[\\/]/).pop().split(/[.]/).pop()
    }
}

export default index_modern_FileUtils;
