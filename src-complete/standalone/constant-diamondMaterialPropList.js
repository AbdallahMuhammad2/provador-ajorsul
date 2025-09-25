/* Standalone Constant: diamondMaterialPropList */

const diamondMaterialPropList = {
    ...threeMaterialPropList,
    color: new three_module.Q1f(1,1,1),
    envMapIntensity: 1,
    envMapRotation: 0,
    dispersion: .012,
    squashFactor: .98,
    geometryFactor: .5,
    gammaFactor: 1,
    absorptionFactor: 1,
    reflectivity: .5,
    refractiveIndex: 2.4,
    boostFactors: new three_module.Pq0(.892,.892,.98595025),
    wireframe: !1,
    envMapRotationOffset: 0,
    wireframeLinewidth: 0,
    skinning: !1,
    transmission: 0,
    morphTargets: !1,
    morphNormals: !1,
    rayBounces: 1,
    diamondOrientedEnvMap: 0,
    envMapIndex: 0
};

export default diamondMaterialPropList;
