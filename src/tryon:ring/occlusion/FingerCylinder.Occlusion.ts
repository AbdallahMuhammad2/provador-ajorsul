import { CylinderGeometry, MaterialExtension, Mesh, MeshBasicMaterial2, Object3D, shaderReplaceString, SphereGeometry, Texture, Vector2, Vector3, VelocityBufferPlugin } from 'webgi'
import { Finger, getFingerFromLandmarkIndex, getNormalizedFingerWidth } from '../utils/handLandmarkUtils'

const hideUsingColorWrite = false // todo: find why this is not working when user stops try-on and then starts it again

// mainly used for Screen-Space Reflections so that the jewelry on the finger reflects the other fingers and SSAO so that ring SSAO isn't visible on other fingers
export class FingerCylinderOcclusion {
    readonly occlusionRoot = new Object3D()
    readonly cylinderMaterial = new MeshBasicMaterial2({ color: '#0000ff' })
    private resolution: Vector2 = new Vector2(1, 1)
    private landmarksSpheres: Mesh[] = []

    occluderCylinders: Mesh[] = []

    readonly landmarksPairs = [
        // thumb
        [0, 1], // 0
        [1, 2], // 1
        [2, 3], // 2
        [3, 4], // 3

        // index
        [5, 6], // 4
        [6, 7], // 5
        [7, 8], // 6

        // middle
        [9, 10], // 7
        [10, 11], // 8
        [11, 12], // 9

        // ring
        [13, 14], // 10
        [14, 15], // 11
        [15, 16], // 12

        // pinky
        [17, 18], // 13
        [18, 19], // 14
        [19, 20], // 15
    ]

    constructor(videoTexture: Texture) {
        const cylinderGeometry = new CylinderGeometry(1, 1, 1, 32, 32, true).rotateX(Math.PI / 2)

        this.cylinderMaterial.userData.postTonemap = false; // todo sync with tonemapBackground in TonemapPlugin
        this.cylinderMaterial.userData.renderToDepth = true;
        this.cylinderMaterial.userData.pluginsDisabled = true
        this.cylinderMaterial.userData[VelocityBufferPlugin.PluginType] = { disabled: true } // for ssao, taa, ssr, etc. required since render to depth is true.

        for (let i = 0; i < this.landmarksPairs.length; i++) {
            const geo = cylinderGeometry
            const mat = this.cylinderMaterial

            const cylinder = new Mesh(geo, mat)
            cylinder.name = "joint" + i
            cylinder.userData.landmarksPairIndex = i
            // if (i === 10 || i === 11) cylinder.visible = false // hide ring finger occluder

            this.occluderCylinders.push(cylinder)
            this.occlusionRoot.add(cylinder)
        }

        // add spheres
        const sphereGeometry = new SphereGeometry(1, 32, 32)
        for (let i = 0; i < 21; i++) {
            const sphere = new Mesh(sphereGeometry, this.cylinderMaterial)
            this.landmarksSpheres.push(sphere)
            this.occlusionRoot.add(sphere)
        }

        if (hideUsingColorWrite) {
            this.cylinderMaterial.colorWrite = false
        } else {
            this.cylinderMaterial.map = videoTexture

            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const th = this

            const ext: MaterialExtension = {
                uuid: "shadowSSAO",
                isCompatible: () => true,
                computeCacheKey: () => "1",
                extraUniforms: {
                    resolution: { value: th.resolution },
                    videoRepeat: { get value() { return videoTexture.repeat } },
                    videoOffset: { get value() { return videoTexture.offset } },
                },
                parsFragmentSnippet: /* glsl */`
                    uniform vec2 resolution;
                    uniform vec2 videoRepeat;
                    uniform vec2 videoOffset;

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
                    const map_fragment_patch = /* glsl */`
                    vec2 videoUv = gl_FragCoord.xy / resolution;
                    // videoUv.x = 1.0 - videoUv.x; // flip x
                    videoUv = videoUv * videoRepeat + videoOffset;

                    diffuseColor.rgb = texture2D(map, videoUv).rgb;
                    diffuseColor = convertToLinear(diffuseColor);
                    `;

                    shader.fragmentShader = shaderReplaceString(shader.fragmentShader, "#include <map_fragment>", map_fragment_patch)
                }
            };

            th.cylinderMaterial.registerMaterialExtensions([ext]);

            this.occlusionRoot.children[0].onBeforeRender = (renderer) => {
                const w = renderer.domElement.width
                const h = renderer.domElement.height

                this.resolution.set(w, h)
            }
        }
    }

    connectCylinders(landmarks3D: Vector3[], width: number = 1) {
        for (let i = 0; i < this.landmarksPairs.length; i++) {
            const [a, b] = this.landmarksPairs[i]

            const finger = getFingerFromLandmarkIndex(a)
            const normalizedFingerWidth = getNormalizedFingerWidth(finger)
            const s = normalizedFingerWidth * width

            const cylinder = this.occluderCylinders[i]
            cylinder.visible = true
            const posA = landmarks3D[a]
            const posB = landmarks3D[b]

            const mid = new Vector3().addVectors(posA, posB).multiplyScalar(0.5)
            cylinder.position.copy(mid)

            const dist = posA.distanceTo(posB)

            cylinder.scale.set(s, s, dist)
            cylinder.lookAt(posA)
        }

        // connect spheres
        for (let i = 0; i < 21; i++) {
            const sphere = this.landmarksSpheres[i]
            sphere.visible = true

            const finger = getFingerFromLandmarkIndex(i)
            const normalizedFingerWidth = getNormalizedFingerWidth(finger)
            const s = normalizedFingerWidth * width

            sphere.scale.setScalar(s)
            sphere.position.copy(landmarks3D[i])
        }
    }

    getCylinders() {
        return this.occluderCylinders
    }

    getCylinderByFinger(finger: Finger) {
        switch (finger) {
            case Finger.Thumb:
                return this.occluderCylinders[2]
            case Finger.Index:
                return this.occluderCylinders[4]
            case Finger.Middle:
                return this.occluderCylinders[7]
            case Finger.Ring:
                return this.occluderCylinders[10]
            case Finger.Pinky:
                return this.occluderCylinders[13]
        }
    }

    getCylindersByFinger(finger: Finger): Mesh[] {
        switch (finger) {
            case Finger.Thumb:
                return [this.occluderCylinders[2], this.occluderCylinders[3]]
            case Finger.Index:
                return [this.occluderCylinders[4], this.occluderCylinders[5], this.occluderCylinders[6]]
            case Finger.Middle:
                return [this.occluderCylinders[7], this.occluderCylinders[8], this.occluderCylinders[9]]
            case Finger.Ring:
                return [this.occluderCylinders[10], this.occluderCylinders[11], this.occluderCylinders[12]]
            case Finger.Pinky:
                return [this.occluderCylinders[13], this.occluderCylinders[14], this.occluderCylinders[15]]
        }
    }

    getSpheresByFinger(finger: Finger): Mesh[] {
        const spheres = this.landmarksSpheres

        // for thumb, return spheres with indices 0 to 4
        // for index, return spheres with indices 5 to 8
        // for middle   , return spheres with indices 9 to 12
        // for ring, return spheres with indices 13 to 16
        // for pinky, return spheres with indices 17 to 20

        return spheres.filter((_, i) => {
            if (finger === Finger.Thumb) {
                return i >= 0 && i <= 4
            } else if (finger === Finger.Index) {
                return i >= 5 && i <= 8
            } else if (finger === Finger.Middle) {
                return i >= 9 && i <= 12
            } else if (finger === Finger.Ring) {
                return i >= 13 && i <= 16
            } else if (finger === Finger.Pinky) {
                return i >= 17 && i <= 20
            }
        })
    }

    dispose() {
        this.occluderCylinders.forEach(c => {
            c.removeFromParent()
            c.geometry.dispose()
        })
        this.occlusionRoot.removeFromParent()

        this.cylinderMaterial.dispose()

        this.occluderCylinders = []
    }
}