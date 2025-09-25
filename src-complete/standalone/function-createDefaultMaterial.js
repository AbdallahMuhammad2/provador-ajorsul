/* Standalone Function: createDefaultMaterial */

function createDefaultMaterial(d) {
    return d.DefaultMaterial === void 0 && (d.DefaultMaterial = new GLTFLoader.ObjectConstructors.MeshStandardMaterial({
        color: 16777215,
        emissive: 0,
        metalness: 1,
        roughness: 1,
        transparent: !1,
        depthTest: !0,
        side: three_module.hB5
    })),
    d.DefaultMaterial
}

export default createDefaultMaterial;
