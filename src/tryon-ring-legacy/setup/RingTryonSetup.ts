import {
    BoxGeometry,
    ConeGeometry,
    CylinderGeometry,
    GridHelper,
    Group,
    Mesh,
    MeshBasicMaterial2,
    MeshStandardMaterial,
    Object3D,
    Vector3,
    ViewerApp
} from 'webgi'
import { RingTryonPlugin } from '../RingTryonPlugin'
import { FingerCylinderShadow } from '../occlusion/FingerCylinderShadow'

export class RingTryonSetupMode {
    private ringTryonPlugin: RingTryonPlugin
    private setupModeFingerCylinder: FingerCylinderShadow | null = null
    private gridHelper: GridHelper | null = null
    private axesBoxes: Mesh[] = []
    public setupMode = false
    private directionArrow: Group | null = null
    private directionMarker: Mesh | null = null

    constructor(private viewer: ViewerApp) {
        this.ringTryonPlugin = viewer.getPlugin(RingTryonPlugin)!
        if (!this.ringTryonPlugin) {
            throw new Error('RingTryonPlugin not found')
        }
    }

    public frontView() {
        const camera = this.viewer.scene.activeCamera

        camera.position.set(0, 0, 5)
        camera.target.set(0, 0, 0)
        camera.positionUpdated(true)
        camera.targetUpdated(true)
    }

    public topView() {
        const camera = this.viewer.scene.activeCamera

        camera.position.set(0, 5, 0)
        camera.target.set(0, 0, 0)
        camera.positionUpdated(true)
        camera.targetUpdated(true)
    }

    public sideView() {
        const camera = this.viewer.scene.activeCamera

        camera.position.set(5, 0, 0)
        camera.target.set(0, 0, 0)
        camera.positionUpdated(true)
        camera.targetUpdated(true)
    }

    public rotateX90() {
        this.ringTryonPlugin.modelRotation ??= new Vector3()
        this.ringTryonPlugin.modelRotation.x += Math.PI / 2
        this.ringTryonPlugin.setDirty()
    }

    public rotateY90() {
        this.ringTryonPlugin.modelRotation ??= new Vector3()
        this.ringTryonPlugin.modelRotation.y += Math.PI / 2
        this.ringTryonPlugin.setDirty()
    }

    public rotateZ90() {
        this.ringTryonPlugin.modelRotation ??= new Vector3()
        this.ringTryonPlugin.modelRotation.z += Math.PI / 2
        this.ringTryonPlugin.setDirty()
    }

    public downloadRingConfig() {
        const modelRotation = {
            x: this.ringTryonPlugin.modelRotation?.x ?? 0,
            y: this.ringTryonPlugin.modelRotation?.y ?? 0,
            z: this.ringTryonPlugin.modelRotation?.z ?? 0,
            isVector3: true
        }

        const modelPosition = {
            x: this.ringTryonPlugin.modelPosition?.x ?? 0,
            y: this.ringTryonPlugin.modelPosition?.y ?? 0,
            z: this.ringTryonPlugin.modelPosition?.z ?? 0,
            isVector3: true
        }

        const ringConfig = {
            modelScaleFactor: this.ringTryonPlugin.modelScaleFactor,
            modelPosition,
            modelRotation,
            ssr: this.ringTryonPlugin.ssr,
            ssao: this.ringTryonPlugin.ssao,
            type: "RingTryonPlugin",
            resources: {
                "geometries": {},
                "materials": {},
                "textures": {},
                "images": {},
                "shapes": {},
                "skeletons": {},
                "animations": {},
                "extras": {}
            }
        }

        const blob = new Blob([JSON.stringify(ringConfig, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url

        const ringModelName = this.ringTryonPlugin.modelRoot?.children[0]?.name ?? 'ring'
        a.download = ringModelName + '.json'
        a.click()
        URL.revokeObjectURL(url)
    }

    enterSetupMode() {
        if (this.setupMode) return
        this.setupMode = true

        if (!this.setupModeFingerCylinder) {
            // add setup mode finger cylinder
            this.setupModeFingerCylinder = new FingerCylinderShadow()
            this.setupModeFingerCylinder.shadowRoot = new Object3D()
            this.setupModeFingerCylinder.shadowRoot.rotateX(Math.PI / 2)
            this.setupModeFingerCylinder.shadowRoot.scale.set(0.5, 0.5, 2.5)
            this.setupModeFingerCylinder.shadowRoot.add(
                new Mesh(
                    new CylinderGeometry(1, 1, 1, 32).rotateX(Math.PI / 2),
                    new MeshStandardMaterial({ color: "#494ca6", transparent: true, opacity: 0.8, roughness: 0.5, metalness: 0.5 })
                )
            )

            this.viewer.scene.add(this.setupModeFingerCylinder.shadowRoot)
        }
        // Create custom arrow mesh
        this.directionArrow = new Group()

        // Create arrow shaft (cylinder)
        const shaftGeometry = new CylinderGeometry(0.01, 0.01, 0.4, 32)
        const shaftMaterial = new MeshStandardMaterial({ color: 0xff00ff, depthWrite: false, depthTest: false })
        const shaft = new Mesh(shaftGeometry, shaftMaterial)
        shaft.renderOrder = 1000
        this.directionArrow.add(shaft)

        // Create arrow head (cone)
        const headGeometry = new ConeGeometry(0.05, 0.1, 32)
        const headMaterial = new MeshBasicMaterial2({ color: 0xff00ff, depthWrite: false, depthTest: false })
        const head = new Mesh(headGeometry, headMaterial)
        head.position.y = 0.2 // Position at the end of the shaft
        head.renderOrder = 1000
        this.directionArrow.add(head)

        // Set render order to ensure arrow is visible
        this.directionArrow.renderOrder = 1000
        this.directionArrow.rotateX(Math.PI / 2)
        this.viewer.scene.add(this.directionArrow)

        const size = 100
        // add grid
        this.gridHelper = new GridHelper(size, size)
        this.viewer.scene.add(this.gridHelper)

        // add 3 long boxes for the axes
        const boxGeometry = new BoxGeometry(0.005, 0.005, 100)
        for (let i = 0; i < 3; i++) {
            const boxMaterial = new MeshBasicMaterial2({ color: 0xff0000 })
            const box = new Mesh(boxGeometry, boxMaterial)
            if (i === 0) {
                box.rotation.x = Math.PI / 2
                boxMaterial.color.set(0x00ff00)
            } else if (i === 1) {
                box.rotation.y = Math.PI / 2
                boxMaterial.color.set(0xff0000)
            } else {
                box.rotation.z = Math.PI / 2
                boxMaterial.color.set(0x0000ff)
            }

            // box.renderOrder = 1000
            this.viewer.scene.add(box)
            this.axesBoxes.push(box)
        }

        this.ringTryonPlugin.setDirty()
    }

    exitSetupMode() {
        if (!this.setupMode) return
        this.setupMode = false

        // remove setup mode finger cylinder
        if (this.setupModeFingerCylinder) {
            this.viewer.scene.remove(this.setupModeFingerCylinder.shadowRoot)
            this.setupModeFingerCylinder.dispose()
            this.setupModeFingerCylinder = null
        }

        // remove grid
        if (this.gridHelper) {
            this.viewer.scene.remove(this.gridHelper)
            this.gridHelper.geometry.dispose()
            this.gridHelper.material.dispose()
            this.gridHelper = null
        }

        // remove axes boxes
        for (const box of this.axesBoxes) {
            this.viewer.scene.remove(box)
            box.geometry.dispose()
            if ("dispose" in box.material) box.material.dispose()
        }
        this.axesBoxes = []

        // Remove direction arrow
        if (this.directionArrow) {
            this.viewer.scene.remove(this.directionArrow)
            this.directionArrow.traverse((child) => {
                if (child instanceof Mesh) {
                    child.geometry.dispose()
                    const material = child.material as MeshStandardMaterial
                    material.dispose()
                }
            })
            this.directionArrow = null
        }

        // Remove direction marker
        if (this.directionMarker) {
            this.viewer.scene.remove(this.directionMarker)
            this.directionMarker.geometry.dispose()
            const material = this.directionMarker.material as MeshStandardMaterial
            material.dispose()
            this.directionMarker = null
        }

        this.ringTryonPlugin.setDirty()
    }

    dispose() {
        this.exitSetupMode()
    }
} 