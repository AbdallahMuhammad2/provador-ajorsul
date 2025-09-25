import {
    MaterialExtension,
    Mesh,
    MeshPhysicalMaterial,
    shaderReplaceString, Texture, Vector2, VelocityBufferPlugin,
    ViewerApp
} from "webgi";
import { FingerCylinderShadow } from "./FingerCylinderShadow";

/**
 * For shadow of ring on the finger, assuming it a cylinder.
 * todo: make a flag in the tryon plugin to allow disable dynamic shadow and use a custom one.
 */
export class SSSFingerCylinderShadow extends FingerCylinderShadow {
    private resolution: Vector2 = new Vector2(1, 1);
    private videoRepeat = new Vector2(1, 1);
    private videoOffset = new Vector2(0, 0);

    init(viewer: ViewerApp) {
        const material = viewer.createPhysicalMaterial()!
        material.userData.renderToDepth = true;
        material.userData.postTonemap = false;
        material.userData[VelocityBufferPlugin.PluginType] = { disabled: true }
        material.userData.ssaoCastDisabled = true;
        material.userData.pluginsDisabled = true
        material.colorWrite = true;
        material.map = new Texture();
        this.shadowMaterial = material;

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const th = this

        const ext: MaterialExtension = { // todo maybe we should make a parameter for opacity/color
            uuid: "shadowSSAO",
            isCompatible: () => true,
            computeCacheKey: () => "1",
            extraDefines: {
                HAS_VIDEO: 1
            },
            extraUniforms: {
                resolution: { value: this.resolution },
                videoRepeat: { get value() { return th.videoRepeat } },
                videoOffset: { get value() { return th.videoOffset } },
            },
            parsFragmentSnippet: /* glsl */`
            uniform sampler2D videoTexture;
            uniform vec2 resolution;
            uniform vec2 videoRepeat;
            uniform vec2 videoOffset;

            vec3 rgb2hsv(vec3 c)
            {
                vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
                vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
                vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

                float d = q.x - min(q.w, q.y);
                float e = 1.0e-10;
                return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
            }

            vec3 hsv2rgb(vec3 c)
            {
                vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
                vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
                return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
            }
            
            // Converts a color from sRGB gamma to linear light gamma
            vec4 convertToLinear(vec4 sRGB)
            {
                bvec3 cutoff = lessThan(sRGB.rgb, vec3(0.04045));
                vec3 higher = pow((sRGB.rgb + vec3(0.055))/vec3(1.055), vec3(2.4));
                vec3 lower = sRGB.rgb/vec3(12.92);

                return vec4(mix(higher, lower, cutoff), sRGB.a);
            }
            `,
            shaderExtender: (shader) => {
                const ssaoPatch = /* glsl */`
                vec2 videoUv = gl_FragCoord.xy / resolution;
                videoUv = videoUv * videoRepeat + videoOffset;
                // videoUv.x = 1. - videoUv.x;

                vec3 video = texture2D(map, videoUv).rgb;
                video = convertToLinear(vec4(video, 1.)).rgb;
                
                #ifdef SSAO_ENABLED
                    #if SSAO_ENABLED == 1
                        float ao = clamp(pow(ambientOcclusion, 2.), 0., 1.);

                        // increase video saturation
                        vec3 hsv = rgb2hsv(video);

                        float o = 1. - ao;

                        float hue = hsv.x;// hsv.x < 0.5 ? mix(0., hsv.x, ao) : mix(1., hsv.x, ao);
                        float saturation = min(1., hsv.y + sqrt(hsv.y) * o * 0.35);
                        float value = hsv.z * ao;

                        vec3 finalColor = hsv2rgb(vec3(hue, saturation, value));

                    gl_FragColor.rgb = finalColor;
                        // float clampAo = step(0.99, ao);
                        // gl_FragColor.rgb = vec3(0., ao, 0.);
                    #else
                        gl_FragColor.rgb = video;
                    #endif
                #else
                    gl_FragColor.rgb = video;
                #endif
                `;

                // maintain backwards compatibility to pre WebGi 0.11.0 versions where opaque_fragment.glsl was called output_fragment.glsl
                // see: https://webgi.xyz/docs/api/Changelog/index.html#0110-major-changes
                if (shader.fragmentShader.includes("#include <opaque_fragment>")) {
                    shader.fragmentShader = shaderReplaceString(shader.fragmentShader, "#include <opaque_fragment>", ssaoPatch, {
                        append: true,
                    });
                } else if (shader.fragmentShader.includes("#include <output_fragment>")) {
                    shader.fragmentShader = shaderReplaceString(shader.fragmentShader, "#include <output_fragment>", ssaoPatch, {
                        append: true,
                    });
                } else {
                    console.warn("SSSFingerCylinderShadow: no opaque_fragment or output_fragment found in shader. Disabling SSAO mesh.")
                    if (this.shadowMaterial) this.shadowMaterial.visible = false
                    return;
                }
            },
        };

        this.shadowMaterial.registerMaterialExtensions([ext]);

        const mesh = new Mesh(this.fingerCylinder, this.shadowMaterial);

        mesh.onBeforeRender = () => {
            const w = viewer.canvas.width
            const h = viewer.canvas.height
            this.resolution.set(w, h)
        };

        this.shadowRoot.add(mesh);
    }

    setVideoTexture(videoTexture: Texture) {
        this.videoRepeat = videoTexture.repeat
        this.videoOffset = videoTexture.offset

        this.shadowRoot.traverse((obj) => {
            const c = obj as Mesh
            if (!c.isMesh) return

            (c.material as MeshPhysicalMaterial).map = videoTexture
        })
    }
}