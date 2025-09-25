/* Standalone Constant: standardMaterialTemplate */

const standardMaterialTemplate = {
    materialType: MeshStandardMaterial2.TYPE,
    name: "standard",
    color: "#ffffff"
}
  , basicMaterialTemplate = {
    materialType: MeshBasicMaterial2.TYPE,
    name: "basic",
    color: "#ffffff"
}
  , typeTemplateNameMap = {
    [MeshStandardMaterial2.TYPE]: standardMaterialTemplate.name,
    MeshStandardMaterial: standardMaterialTemplate.name,
    MeshPhysicalMaterial: standardMaterialTemplate.name,
    [MeshBasicMaterial2.TYPE]: basicMaterialTemplate.name,
    MeshBasicMaterial: basicMaterialTemplate.name
};

export default standardMaterialTemplate;
