/* Standalone Class: index_modern_Document */

class index_modern_Document {
    static fromGraph(o) {
        return index_modern_Document._GRAPH_DOCUMENTS.get(o) || null
    }
    constructor() {
        this._graph = new Graph,
        this._root = new index_modern_Root(this._graph),
        this._logger = Logger.DEFAULT_INSTANCE,
        index_modern_Document._GRAPH_DOCUMENTS.set(this._graph, this)
    }
    getRoot() {
        return this._root
    }
    getGraph() {
        return this._graph
    }
    getLogger() {
        return this._logger
    }
    setLogger(o) {
        return this._logger = o,
        this
    }
    clone() {
        throw new Error("Use 'cloneDocument(source)' from '@gltf-transform/functions'.")
    }
    merge(o) {
        throw new Error("Use 'mergeDocuments(target, source)' from '@gltf-transform/functions'.")
    }
    async transform(...o) {
        const c = o.map(h => h.name);
        for (const h of o)
            await h(this, {
                stack: c
            });
        return this
    }
    createExtension(o) {
        const c = o.EXTENSION_NAME;
        return this.getRoot().listExtensionsUsed().find(h => h.extensionName === c) || new o(this)
    }
    createScene(o="") {
        return new index_modern_Scene(this._graph,o)
    }
    createNode(o="") {
        return new index_modern_Node(this._graph,o)
    }
    createCamera(o="") {
        return new Camera(this._graph,o)
    }
    createSkin(o="") {
        return new Skin(this._graph,o)
    }
    createMesh(o="") {
        return new index_modern_Mesh(this._graph,o)
    }
    createPrimitive() {
        return new index_modern_Primitive(this._graph)
    }
    createPrimitiveTarget(o="") {
        return new index_modern_PrimitiveTarget(this._graph,o)
    }
    createMaterial(o="") {
        return new index_modern_Material(this._graph,o)
    }
    createTexture(o="") {
        return new index_modern_Texture(this._graph,o)
    }
    createAnimation(o="") {
        return new Animation(this._graph,o)
    }
    createAnimationChannel(o="") {
        return new index_modern_AnimationChannel(this._graph,o)
    }
    createAnimationSampler(o="") {
        return new index_modern_AnimationSampler(this._graph,o)
    }
    createAccessor(o="", c=null) {
        return c || (c = this.getRoot().listBuffers()[0]),
        new index_modern_Accessor(this._graph,o).setBuffer(c)
    }
    createBuffer(o="") {
        return new Buffer$1(this._graph,o)
    }
}

export default index_modern_Document;
