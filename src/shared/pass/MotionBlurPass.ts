import { ShaderPass2, Vector2, WebGLRenderer, WebGLRenderTarget } from "webgi";
import { setupBlueNoise } from "./blue-noise/BlueNoiseUtils";

// GLSL shader code
const fragmentShader = /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float motionBlurIntensity;
    uniform float motionBlurJitter;
    uniform vec2 manualVelocity;
    uniform vec2 motionBlurCenter;
    uniform float motionBlurRadius;
    uniform vec2 resolution;
    uniform int frame;

    varying vec2 vUv;

    vec4 sampleColor(vec2 uv){
        return texture2D(tDiffuse, uv);
    }

    vec4 motionBlur(vec4 color) {
        vec2 velocity = manualVelocity;

        vec2 aspectVec = vec2(resolution.x / resolution.y, 1.0);
        float d = distance(vUv * aspectVec, vec2(motionBlurCenter.x, 1. - motionBlurCenter.y) * aspectVec);


        if(d > motionBlurRadius) {
            return color;
        }

        d = smoothstep(motionBlurRadius * 0.25, motionBlurRadius, d);
        d = sqrt(d);
        // return vec4(vec3(d), 1.);
        float centerIntensity = 1.0 - d;

        velocity *= motionBlurIntensity * centerIntensity;

        vec4 r = blueNoise(vUv, frame);
        vec2 motionBlurJitterOffset = motionBlurJitter * velocity * r.xy;

        vec2 startUv = vUv;
        vec2 endUv = vUv - (motionBlurJitterOffset - velocity);

        startUv = max(vec2(0.), startUv);
        endUv = min(vec2(1.), endUv);

        vec3 motionBlurredColor = color.rgb;
        for (float i = 1.0; i <= 16.0; i++) {
            vec2 reprojectedUv = mix(startUv, endUv, i / 16.0);
            vec3 neighborColor = sampleColor(reprojectedUv).rgb;
            motionBlurredColor += neighborColor;
        }

        motionBlurredColor /= 17.0;

        return vec4(motionBlurredColor, color.a);
    }

    void main() {
        vec4 baseColor = texture2D(tDiffuse, vUv);
        if(length(manualVelocity) < 0.000001) {
            gl_FragColor = baseColor;
        } else {
            gl_FragColor = motionBlur(baseColor);
        }
    }
`;

const vertexShader = /* glsl */`
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export class MotionBlurPass extends ShaderPass2 {
    private _lastFrameTime = performance.now();

    constructor() {
        const { fragmentShader: bnFragmentShader, uniforms: bnUniforms } = setupBlueNoise(fragmentShader)

        super({
            fragmentShader: bnFragmentShader,
            vertexShader,
            uniforms: {
                ...bnUniforms,
                tDiffuse: { value: null },
                motionBlurIntensity: { value: 1.0 },
                motionBlurJitter: { value: 1.0 },
                manualVelocity: { value: new Vector2(0, 0) },
                motionBlurCenter: { value: new Vector2(0.5, 0.5) },
                motionBlurRadius: { value: 0.5 },
                resolution: { value: new Vector2(1, 1) },
                frame: { value: 0 }
            }
        });
    }

    setIntensity(intensity: number) {
        this.material.uniforms.motionBlurIntensity.value = intensity;
    }

    setManualVelocity(velocity: Vector2) {
        // try to dampen low-frequency motion (mostly static noise)
        if (velocity.length() < 0.000001) {
            velocity = velocity.clone()
            const velocitySq = velocity.clone().multiply(velocity)

            velocity.lerp(velocitySq, velocity.length() / 0.000001)
        }
        this.material.uniforms.manualVelocity.value.copy(velocity);
    }

    setMotionBlurCenterAndRadius(center: Vector2, radius: number) {
        this.material.uniforms.motionBlurCenter.value.copy(center);
        this.material.uniforms.motionBlurRadius.value = radius;
    }

    setResolution(width: number, height: number) {
        this.material.uniforms.resolution.value.set(width, height);
    }

    incrementFrame() {
        this.material.uniforms.frame.value++;
    }

    render(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, outputBuffer: WebGLRenderTarget) {
        // Update resolution
        const size = renderer.getSize(new Vector2());
        this.setResolution(size.width, size.height);
        // Update input texture and frame
        this.material.uniforms.tDiffuse.value = inputBuffer.texture;
        this.incrementFrame();

        // Render
        super.render(renderer, inputBuffer, outputBuffer);
    }
}
