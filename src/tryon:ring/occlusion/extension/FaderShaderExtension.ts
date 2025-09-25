import { EventDispatcher, IMaterial, IUniform, MaterialExtension, MathUtils, PerspectiveCamera, Shader, shaderReplaceString, Texture, Vector3, WebGLRenderer } from "webgi";
import { Finger, getLandmarkIndicesFromFinger, isValidFingerIndex } from "../../utils/handLandmarkUtils";
import { FingerWidthInterface } from "../../instore/center/FingerCenterWidthCalculator";
import { Hand } from "../../hand/MPHand";

let fadeShaderExtensionCounter = 0

interface FadeShaderEvent {
    'fullyHidden': object
    'fullyVisible': object;
}

export class FadeShaderExtension extends EventDispatcher<FadeShaderEvent> implements MaterialExtension {
    private mpHand: Hand
    isCompatible = () => true;
    computeCacheKey = () => "FadeShaderExtension" + fadeShaderExtensionCounter;
    extraUniforms?: { [uniform: string]: IUniform<any>; } | undefined;
    extraDefines?: { [key: string]: any; } | undefined;
    shaderExtender?: ((shader: Shader & { defines: any; }, material: IMaterial, renderer: WebGLRenderer) => void) | undefined;
    private visible = true
    private videoTexture: Texture
    private fadeDistance = 0.375
    private fingerWidthMultiplier = 0.5
    private finger: Finger | number = Finger.Ring
    public opacity = 0
    private ringPosition: Vector3 = new Vector3()
    private fadeFlag = true

    constructor(
        camera: PerspectiveCamera,
        mpHand: Hand,
        fingerWidthInterface: FingerWidthInterface,
        finger: Finger,
        videoTexture: Texture,
        fingerWidthMultiplier = 0.5,
        fadeDistance = 0.375
    ) {
        super()
        this.mpHand = mpHand
        this.finger = finger
        this.videoTexture = videoTexture
        this.fadeDistance = fadeDistance
        this.fingerWidthMultiplier = fingerWidthMultiplier

        fadeShaderExtensionCounter++

        let lastVisible = false
        let lastVisibleTime = performance.now()
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const th = this

        this.extraUniforms = {
            projMatrix: { value: camera.projectionMatrix },
            projMatrixInverse: { value: camera.projectionMatrixInverse },
            cameraMatrixWorld: { value: camera.matrixWorld },
            cameraNear: { get value() { return camera.near } },
            cameraFar: { get value() { return camera.far } },
            camPos: { value: camera.position },
            videoTexture: { value: th.videoTexture },
            videoRepeat: { value: th.videoTexture.repeat },
            videoOffset: { value: th.videoTexture.offset },
            landmarks: { get value() { return th.mpHand.landmarks } },
            landmarks3D: { get value() { return th.mpHand.landmarks3D } },
            fingerWidth: {
                get value() {
                    const width = isValidFingerIndex(th.finger) ? fingerWidthInterface.getFingerWidth(th.finger) : 1
                    return width * th.fingerWidthMultiplier
                }
            },
            fingerLandmarkIndex: {
                get value() {
                    if (!isValidFingerIndex(th.finger)) return -1
                    return th.finger === Finger.Thumb ? 3 : getLandmarkIndicesFromFinger(th.finger)[1]
                }
            },
            fadeDistance: { get value() { return th.fadeDistance } },
            backHandFactor: { get value() { return th.mpHand.getMappedBackHandFactor() } },
            isRightHand: { get value() { return th.mpHand.handedness === "Right" } },
            ringPosition: { get value() { return th.ringPosition } },
            segmentationMask: { value: null },
            hidingOpacity: {
                get value() {
                    const { visible } = th
                    if (visible !== lastVisible) {
                        lastVisibleTime = th.fadeFlag ? performance.now() : 0
                        lastVisible = visible
                    }
                    th.fadeFlag = true

                    const dt = performance.now() - lastVisibleTime

                    let opacity = 1

                    // check if we need to fade in or out
                    if (visible) {
                        opacity = MathUtils.mapLinear(dt, 0, 200, 0, 1)
                    } else {
                        opacity = MathUtils.mapLinear(dt, 0, 100, 1, 0)
                    }
                    opacity = MathUtils.clamp(opacity, 0, 1)

                    if (opacity === 0) th.dispatchEvent({ type: 'fullyHidden' })
                    else if (opacity === 1) th.dispatchEvent({ type: 'fullyVisible' })

                    opacity = MathUtils.clamp(opacity, 0, 1) ** 2

                    // todo: allow to set when to fade in
                    if (visible) opacity = 1
                    th.opacity = opacity

                    return opacity
                }
            }
        }

        this.extraDefines = {
            USE_SEGMENTATION: 0
        }

        this.shaderExtender = (shader: any) => {
            shader.fragmentShader = shaderReplaceString(shader.fragmentShader, "varying vec2 vUv;", /* glsl */`
            varying vec2 vUv;

            #ifndef TONE_MAPPING
                 // TODO: remove this hack to allow for tone mapping before applying motion blur
                 #define TONE_MAPPING 1

                    #include <tonemapping_pars_fragment>
                    vec3 toneMapping(vec3 color) {
                        return ACESFilmicToneMapping(color.rgb);
                    }
                #endif

            uniform mat4 projMatrix;
            uniform mat4 projMatrixInverse;
            uniform mat4 cameraMatrixWorld;
            uniform float cameraNear;
            uniform float cameraFar;
            
            vec3 getViewPosition(float viewZ) {
                float clipW = projMatrix[2][3] * viewZ + projMatrix[3][3];
                vec4 clipPosition = vec4((vec3(vUv, viewZ) - 0.5) * 2.0, 1.0);
                clipPosition *= clipW;
                vec3 p = (projMatrixInverse * clipPosition).xyz;
                p.z = viewZ;
                return p;
            }

            // get world position from depth and projection matrix
            vec3 getWorldPosition(vec2 uv, float depth) {
                vec3 viewPos = getViewPosition(-mix(cameraNear, cameraFar, depth));
                vec4 worldPos = cameraMatrixWorld * vec4(viewPos, 1.0);

                return worldPos.xyz;
            }

            #if USE_SEGMENTATION == 1
                uniform sampler2D segmentationMask;
            #endif

            #ifndef HAS_VIDEO
                uniform sampler2D videoTexture;
                uniform vec2 videoRepeat;
                uniform vec2 videoOffset;
            #endif
                uniform vec3 ringPosition;
                uniform vec3 landmarks[21];
                uniform vec3 landmarks3D[21];
                uniform float fingerWidth;
                uniform float hidingOpacity;
                uniform float fadeDistance;
                uniform int fingerLandmarkIndex;
                uniform float backHandFactor;
                uniform bool isRightHand;
                uniform vec3 camPos;

                const ivec2 landmarksPairs[] = ivec2[](
                    ivec2(0, 1), // 0
                    ivec2(1, 2), // 1
                    ivec2(2, 3), // 2
                    ivec2(3, 4), // 3

                    ivec2(5, 6), // 4
                    ivec2(6, 7), // 5
                    ivec2(7, 8), // 6

                    ivec2(9, 10), // 7
                    ivec2(10, 11), // 8
                    ivec2(11, 12), // 9

                    ivec2(13, 14), // 10
                    ivec2(14, 15), // 11
                    ivec2(15, 16), // 12

                    ivec2(17, 18), // 13
                    ivec2(18, 19), // 14
                    ivec2(19, 20) // 15

                    // ivec2(5, 9), // knuckles 0
                    // ivec2(9, 13), // knuckles 1
                    // ivec2(13, 17) // knuckles 2
                );

                float distanceToLine2D(vec2 p, vec2 start, vec2 end) {
                    // p: the point in 2D space
                    // start: the starting point of the line segment
                    // end: the ending point of the line segment

                    // Vector from start to end
                    vec2 lineVec = end - start;

                    // Vector from start to point
                    vec2 pointVec = p - start;

                    // Project pointVec onto lineVec to find the projection t
                    float t = dot(pointVec, lineVec) / dot(lineVec, lineVec);

                    // Clamp t to the range [0, 1] to restrict it to the line segment
                    t = clamp(t, 0.0, 1.0);

                    // Find the closest point on the line segment
                    vec2 closestPoint = start + t * lineVec;

                    // Return the distance from the point to the closest point on the line segment
                    return length(p - closestPoint);
                }

                // this function checks how far a 2D point is from a 2D convex hull made of 5 points
                // the 5 points are the 5 finger tips (thumb, index, middle, ring, pinky)
                // the function returns 0 if the point is inside the convex hull
                // the function returns a positive distance if the point is outside the convex hull
                // the function returns a negative distance if the point is on the edge of the convex hull
                float distanceToPalm2D(vec2 p, vec2 thumb, vec2 index, vec2 middle, vec2 ring, vec2 pinky) {
                    // calculate the cross product of vectors from the point to the finger tips
                    float crossThumb = cross(vec3(thumb - p, 0), vec3(index - p, 0)).z;
                    float crossIndex = cross(vec3(index - p, 0), vec3(middle - p, 0)).z;
                    float crossMiddle = cross(vec3(middle - p, 0), vec3(ring - p, 0)).z;
                    float crossRing = cross(vec3(ring - p, 0), vec3(pinky - p, 0)).z;
                    float crossPinky = cross(vec3(pinky - p, 0), vec3(thumb - p, 0)).z;

                    // check if the point is inside the convex hull
                    if (crossThumb >= 0. && crossIndex >= 0. && crossMiddle >= 0. && crossRing >= 0. && crossPinky >= 0.) {
                        return 0.0;
                    }

                    // calculate the distance from the point to each line segment
                    float distThumbIndex = distanceToLine2D(p, thumb, index);
                    float distIndexMiddle = distanceToLine2D(p, index, middle);
                    float distMiddleRing = distanceToLine2D(p, middle, ring);
                    float distRingPinky = distanceToLine2D(p, ring, pinky);
                    float distPinkyThumb = distanceToLine2D(p, pinky, thumb);

                    // return the minimum distance as the distance to the convex hull
                    return min(distThumbIndex, min(distIndexMiddle, min(distMiddleRing, min(distRingPinky, distPinkyThumb))));
                }
                
                // GLSL function to compute the closest point on a finite cylinder to point P
                // Function to perform analytical ray-cylinder intersection
                float distanceBetweenSegments(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {
                    vec3 u = p2 - p1, v = p4 - p3, w = p1 - p3;
                    float a = dot(u, u), b = dot(u, v), c = dot(v, v), d = dot(u, w), e = dot(v, w);
                    float denom = a * c - b * b, sN, tN, sD = denom, tD = denom;

                    if (denom < 1e-8) {
                        sN = 0.0; sD = 1.0;
                        tN = e; tD = c;
                    }
                    else {
                        sN = b * e - c * d;
                        tN = a * e - b * d;
                        if (sN < 0.0) { sN = 0.0; tN = e; tD = c; }
                        else if (sN > sD) { sN = sD; tN = e + b; tD = c; }
                    }

                    if (tN < 0.0) {
                        tN = 0.0;
                        sN = (-d < 0.0) ? 0.0 : ((-d > a) ? sD : -d);
                        sD = ((-d > a) || (-d < 0.0)) ? sD : a;
                    }
                    else if (tN > tD) {
                        tN = tD;
                        sN = ((-d + b) < 0.0) ? 0.0 : (((-d + b) > a) ? sD : (-d + b));
                        sD = a;
                    }

                    float sc = (abs(sN) < 1e-8) ? 0.0 : sN / sD;
                    float tc = (abs(tN) < 1e-8) ? 0.0 : tN / tD;

                    vec3 closestPoint1 = p1 + sc * u;
                    vec3 closestPoint2 = p3 + tc * v;

                    return length(closestPoint1 - closestPoint2);
                }

                float distanceToSegment(vec3 p, vec3 a, vec3 b) {
                    vec3 ab = b - a;
                    vec3 ap = p - a;
                    vec3 bp = p - b;

                    float e = dot(ap, ab);

                    if (e <= 0.0) return length(ap);

                    float f = dot(ab, ab);
                    if (e >= f) return length(bp);

                    return length(ap - ab * e / f);
                }

                float getNormalizedFingerWidth(int index) {
                    const float ringWidth = 1.1;
                    const float thumbWidth = 1.25;
                    const float indexWidth = 1.15;
                    const float middleWidth = 1.2;
                    const float pinkyWidth = 0.9;
                    
                    float fingerWidth;
                    
                    if (index < 5) {
                        fingerWidth = thumbWidth;
                    } else if (index < 9) {
                        fingerWidth = indexWidth;
                    } else if (index < 13) {
                        fingerWidth = middleWidth;
                    } else if (index < 17) {
                        fingerWidth = ringWidth;
                    } else {
                        fingerWidth = pinkyWidth;
                    }
                    
                    return fingerWidth / ringWidth;
                }
                `)

            shader.fragmentShader = shaderReplaceString(shader.fragmentShader, "gl_FragColor = ToneMapping(gl_FragColor);", /* glsl */`
            float depth = getDepth(vUv);
            bool colorWrite = getToneMapBit(getGBufferFlags(vUv).b) < 1; // todo: use better method here
            bool doTonemap = getToneMapBit(getGBufferFlags(vUv).a) > 0;
            
            bool isTargetPixel = colorWrite;
            // todo: only tone map geometry pixels
            vec2 videoUv = vUv;
            videoUv = videoUv * videoRepeat + videoOffset;
            vec3 video = texture2D(videoTexture, videoUv).rgb;

            if(isTargetPixel){
                vec3 worldPos = getWorldPosition(vUv, depth);

                float m = 1.0;

                for(int i = 0; i < landmarksPairs.length(); i++) {
                    if(i == 0) continue;
                    ivec2 pair = landmarksPairs[i];
                    vec3 a = landmarks3D[pair.x];
                    vec3 b = landmarks3D[pair.y];
                    bool isSameFinger = pair[1] == fingerLandmarkIndex + 1 || pair[1] == fingerLandmarkIndex + 2;

                    if(pair[1] == fingerLandmarkIndex) continue;

                    float d = distanceBetweenSegments(a, b, worldPos, camPos);
                    d = max(d, 0.);

                    // if(i >= 15) d *= 0.8;
                    float pairWidth = fingerWidth * getNormalizedFingerWidth(pair.x);

                    float stepMin = pairWidth;
                    float stepMax = pairWidth + fadeDistance;

                    if (isSameFinger) {
                        stepMin -= 0.25 * backHandFactor;
                        stepMax -= 0.25 * backHandFactor;
                    }

                    float curM = smoothstep(stepMin, stepMax, d);

                    // this for example prevents the ring from being faded out by the segment from lm 14 to lm 15
                    if(isSameFinger) curM = mix(curM, 1., 1. - backHandFactor);

                    m = min(m, curM);
                }
                // m *= m;

                float a = 1.0;
                
                #if USE_SEGMENTATION == 1
                    float background = 1. - texture2D(segmentationMask, vUv).r;

                    // check what is closer to the camera, the worldPos or the ring position
                    float ringPosDistToCamera = length(ringPosition - camPos);
                    float worldPosDistToCamera = length(worldPos - camPos);
                    a = smoothstep(-0.2, 0.2, ringPosDistToCamera - worldPosDistToCamera);
                    
                    m = mix(m, 1., background * a);
                    m = mix(m, 0., (1. - background) * (1. - a));
                #endif

                m *= hidingOpacity;

                vec2 uv = 1. - vUv;

                // get dist of uv from convex hull
                vec2 thumb = landmarks[0].xy;
                vec2 index = landmarks[5].xy;
                vec2 middle = landmarks[9].xy;
                vec2 ring = landmarks[13].xy;
                vec2 pinky = landmarks[17].xy;

                // scale the 5 landmarks with the pivot at the center of the palm
                vec2 pivot = (thumb + index + middle + ring + pinky) / 5.;
                const float scale = 1.5;
                thumb = (thumb - pivot) * scale + pivot;
                index = (index - pivot) * scale + pivot;
                middle = (middle - pivot) * scale + pivot;
                ring = (ring - pivot) * scale + pivot;
                pinky = (pinky - pivot) * scale + pivot;

                bool isShowingFrontHand = backHandFactor < 0.5;

                float dist = (isRightHand && isShowingFrontHand) || (!isRightHand && !isShowingFrontHand) ?
                    distanceToPalm2D(uv, thumb, index, middle, ring, pinky)
                    :
                    distanceToPalm2D(uv, thumb, pinky, ring, middle, index);


                float palmM = smoothstep(0., 0.01, dist);

                vec3 palmPos = 0.25 * (landmarks3D[5] + landmarks3D[9] + landmarks3D[13] + landmarks3D[17]);
                float palmZDiff = worldPos.z - palmPos.z;

                palmM = mix(palmM, 1., smoothstep(0., 0.05, palmZDiff));
                m = min(m, palmM);

                gl_FragColor = mix(vec4(video, gl_FragColor.a), LinearTosRGB(doTonemap ? ToneMapping(gl_FragColor) : gl_FragColor), m);
                // if(m > 0. && m < 1.) gl_FragColor.rgb = vec3(0., 1., 0.);
                // gl_FragColor.rgb = vec3(0., m, 0.);
                // gl_FragColor.a = 1.;
                // gl_FragColor.rgb = vec3(worldPos);
            }else{
                gl_FragColor = LinearTosRGB(ToneMapping(gl_FragColor));
            }

            // gl_FragColor.rgb = vec3(colorWrite && doTonemap ? 1. : 0., 0., 0.);
            `).replace("gl_FragColor = LinearTosRGB(gl_FragColor);", "")
        }
    }

    setFadeDistance(fadeDistance: number) {
        this.fadeDistance = fadeDistance
    }

    setFingerWidthMultiplier(fingerWidthMultiplier: number) {
        this.fingerWidthMultiplier = fingerWidthMultiplier
    }

    setVisible(visible: boolean, fade = true) {
        this.visible = visible
        this.fadeFlag = fade
    }

    setFinger(finger: Finger) {
        this.finger = finger
    }

    unsetFinger() {
        this.finger = -1
    }

    setVideoTexture(videoTexture: Texture) {
        this.videoTexture = videoTexture
    }

    setUseSegmentation(segmentationMask: Texture) {
        this.extraDefines!.USE_SEGMENTATION = 1
        this.extraUniforms!.segmentationMask = { value: segmentationMask }
    }

    getOpacity() {
        return this.opacity
    }

    setMPHand(mpHand: Hand) {
        this.mpHand = mpHand
    }

    updateRingPosition(ringPosition: Vector3) {
        this.ringPosition.copy(ringPosition)
    }
}