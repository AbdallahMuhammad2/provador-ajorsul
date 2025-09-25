/* Standalone Class: index_modern_Root */

class index_modern_Root extends ExtensibleProperty {
    init() {
        this.propertyType = index_modern_PropertyType.ROOT
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            asset: {
                generator: `glTF-Transform ${VERSION}`,
                version: "2.0"
            },
            defaultScene: null,
            accessors: new RefSet,
            animations: new RefSet,
            buffers: new RefSet,
            cameras: new RefSet,
            materials: new RefSet,
            meshes: new RefSet,
            nodes: new RefSet,
            scenes: new RefSet,
            skins: new RefSet,
            textures: new RefSet
        })
    }
    constructor(o) {
        super(o),
        this._extensions = new Set,
        o.addEventListener("node:create", c => {
            this._addChildOfRoot(c.target)
        }
        )
    }
    clone() {
        throw new Error("Root cannot be cloned.")
    }
    copy(o, c=COPY_IDENTITY) {
        if (c === COPY_IDENTITY)
            throw new Error("Root cannot be copied.");
        this.set("asset", index_modern_extends({}, o.get("asset"))),
        this.setName(o.getName()),
        this.setExtras(index_modern_extends({}, o.getExtras())),
        this.setDefaultScene(o.getDefaultScene() ? c(o.getDefaultScene()) : null);
        for (const h of o.listRefMapKeys("extensions")) {
            const _ = o.getExtension(h);
            this.setExtension(h, c(_))
        }
        return this
    }
    _addChildOfRoot(o) {
        return o instanceof index_modern_Scene ? this.addRef("scenes", o) : o instanceof index_modern_Node ? this.addRef("nodes", o) : o instanceof Camera ? this.addRef("cameras", o) : o instanceof Skin ? this.addRef("skins", o) : o instanceof index_modern_Mesh ? this.addRef("meshes", o) : o instanceof index_modern_Material ? this.addRef("materials", o) : o instanceof index_modern_Texture ? this.addRef("textures", o) : o instanceof Animation ? this.addRef("animations", o) : o instanceof index_modern_Accessor ? this.addRef("accessors", o) : o instanceof Buffer$1 && this.addRef("buffers", o),
        this
    }
    getAsset() {
        return this.get("asset")
    }
    listExtensionsUsed() {
        return Array.from(this._extensions)
    }
    listExtensionsRequired() {
        return this.listExtensionsUsed().filter(o => o.isRequired())
    }
    _enableExtension(o) {
        return this._extensions.add(o),
        this
    }
    _disableExtension(o) {
        return this._extensions.delete(o),
        this
    }
    listScenes() {
        return this.listRefs("scenes")
    }
    setDefaultScene(o) {
        return this.setRef("defaultScene", o)
    }
    getDefaultScene() {
        return this.getRef("defaultScene")
    }
    listNodes() {
        return this.listRefs("nodes")
    }
    listCameras() {
        return this.listRefs("cameras")
    }
    listSkins() {
        return this.listRefs("skins")
    }
    listMeshes() {
        return this.listRefs("meshes")
    }
    listMaterials() {
        return this.listRefs("materials")
    }
    listTextures() {
        return this.listRefs("textures")
    }
    listAnimations() {
        return this.listRefs("animations")
    }
    listAccessors() {
        return this.listRefs("accessors")
    }
    listBuffers() {
        return this.listRefs("buffers")
    }
}

export default index_modern_Root;
