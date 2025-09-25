/* Standalone Constant: basicMaterialPropList */

const basicMaterialPropList = {
    ...threeMaterialPropList,
    color: "#ffffff",
    map: null,
    lightMap: null,
    lightMapIntensity: 1,
    aoMap: null,
    aoMapIntensity: 1,
    specularMap: null,
    alphaMap: null,
    envMap: null,
    combine: three_module.caT,
    reflectivity: 1,
    refractionRatio: .98,
    wireframe: !1,
    wireframeLinewidth: 1,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    skinning: !1,
    fog: !0
};

export default basicMaterialPropList;
