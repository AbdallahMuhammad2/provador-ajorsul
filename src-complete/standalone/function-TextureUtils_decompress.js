/* Standalone Function: TextureUtils_decompress */

function TextureUtils_decompress(d, o=1 / 0, c=null) {
    fullscreenQuadGeometry || (fullscreenQuadGeometry = new three_module.bdM(2,2,1,1)),
    fullscreenQuadMaterial || (fullscreenQuadMaterial = new three_module.BKk({
        uniforms: {
            blitTexture: new three_module.nc$(d)
        },
        vertexShader: `
            varying vec2 vUv;
            void main(){
                vUv = uv;
                gl_Position = vec4(position.xy * 1.0,0.,.999999);
            }`,
        fragmentShader: `
            uniform sampler2D blitTexture; 
            varying vec2 vUv;

            void main(){ 
                gl_FragColor = vec4(vUv.xy, 0, 1);
                
                #ifdef IS_SRGB
                gl_FragColor = LinearTosRGB( texture2D( blitTexture, vUv) );
                #else
                gl_FragColor = texture2D( blitTexture, vUv);
                #endif
            }`
    })),
    fullscreenQuadMaterial.uniforms.blitTexture.value = d,
    fullscreenQuadMaterial.defines.IS_SRGB = d.colorSpace == three_module.er$,
    fullscreenQuadMaterial.needsUpdate = !0,
    fullscreenQuad || (fullscreenQuad = new three_module.eaF(fullscreenQuadGeometry,fullscreenQuadMaterial),
    fullscreenQuad.frustrumCulled = !1);
    const h = new three_module.ubm
      , _ = new three_module.Z58;
    _.add(fullscreenQuad),
    c || (c = _renderer = new three_module.JeP({
        antialias: !1
    })),
    c.setSize(Math.min(d.image.width, o), Math.min(d.image.height, o)),
    c.clear(),
    c.render(_, h);
    const b = new three_module.gPd(c.domElement);
    return b.minFilter = d.minFilter,
    b.magFilter = d.magFilter,
    b.wrapS = d.wrapS,
    b.wrapT = d.wrapT,
    b.name = d.name,
    _renderer && (_renderer.dispose(),
    _renderer = null),
    b
}

export default TextureUtils_decompress;
