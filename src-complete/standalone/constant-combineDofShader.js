/* Standalone Constant: combineDofShader */

const combineDofShader = {
    uniforms: {
        colorTexture: {
            value: null
        },
        tNormalDepth: {
            value: null
        },
        blurTexture: {
            value: null
        },
        cocTexture: {
            value: null
        },
        cocTextureSize: {
            value: new three_module.I9Y
        },
        cameraNearFar: {
            value: new three_module.I9Y
        }
    },
    vertexShader: defaultVertex,
    fragmentShader: unpackGbuffer + `
` + combineDepthOfField
};

export default combineDofShader;
