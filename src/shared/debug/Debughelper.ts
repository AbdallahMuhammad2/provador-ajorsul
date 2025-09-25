import { MathUtils, Mesh, MeshStandardMaterial, SphereGeometry, Vector2, Vector3, ViewerApp } from "webgi";
import { Segmenter } from "../../tryon/ring/segmentation/FingerSegmenter";

export class DebugHelper {
    public debugCanvas: HTMLCanvasElement
    debugSpheres: Mesh[]
    segmenterEdgeSpheres: Mesh[]

    constructor(viewer: ViewerApp) {
        this.debugCanvas = viewer.canvas.cloneNode() as HTMLCanvasElement
        this.debugCanvas.id = 'debug-canvas'
        this.debugCanvas.style.transform = 'scale(-1, 1)'
        this.debugCanvas.style.pointerEvents = 'none'
        this.debugCanvas.style.position = 'absolute'
        this.debugCanvas.style.top = '0'
        viewer.canvas.parentNode?.insertBefore(this.debugCanvas, viewer.canvas.nextSibling);

        this.debugSpheres = Array.from({ length: 21 }, () => {
            const sphere = new SphereGeometry(0.25)
            const material = new MeshStandardMaterial({ color: 0xff0000, depthTest: false, depthWrite: false })
            material.userData.pluginsDisabled = true

            const mesh = new Mesh(sphere, material)
            mesh.renderOrder = 1000
            viewer.scene.add(mesh)
            return mesh
        })

        this.segmenterEdgeSpheres = Array.from({ length: 2 }, () => {
            const sphere = new SphereGeometry(0.1)
            const material = new MeshStandardMaterial({ color: 0xffff00, depthTest: false, depthWrite: false })
            material.userData.pluginsDisabled = true

            const mesh = new Mesh(sphere, material)
            mesh.position.set(0, 0, 100)
            viewer.scene.add(mesh)
            return mesh
        })
    }

    update(landmarks: Vector3[], landmarks3D: Vector3[], distance: number) {
        const ctx = this.debugCanvas.getContext('2d')
        if (!ctx) return
        ctx.clearRect(0, 0, this.debugCanvas.width, this.debugCanvas.height)

        if (landmarks3D.length === 0) return

        for (let i = 0; i < landmarks.length; i++) {
            const lm = landmarks[i]
            const lm3D = landmarks3D[i]

            const zDiff = Math.abs(lm3D.z) - distance
            let zVal = MathUtils.mapLinear(zDiff, 3, -3, 0, 255)
            zVal = MathUtils.clamp(zVal, 0, 255)

            // create a color based on the z value
            ctx.beginPath()
            ctx.fillStyle = `rgb(${zVal}, ${zVal}, ${0})`
            ctx.arc(lm.x * this.debugCanvas.width, lm.y * this.debugCanvas.height, 15, 0, 2 * Math.PI)
            ctx.fill()
        }

        this.debugSpheres.forEach((s, i) => {
            s.position.copy(landmarks3D[i])
        })
    }

    drawSegmenter(segmenter: Segmenter) {
        const ctx = this.debugCanvas.getContext('2d');
        if (!ctx) return;

        const imgData = segmenter.getDebugSegmentationImageData();
        if (imgData) {
            // Calculate the x-coordinate to center the image horizontally
            const xOffset = (this.debugCanvas.width - imgData.width) / 2;
            ctx.putImageData(imgData, xOffset, 0); // Draw at top-center
        }

        const edges = [segmenter.edgeLeft, segmenter.edgeRight];

        if (edges.some(e => e === null)) return;
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        if (edges[0]) ctx.moveTo(edges[0].x * this.debugCanvas.width, edges[0].y * this.debugCanvas.height);
        if (edges[1]) ctx.lineTo(edges[1].x * this.debugCanvas.width, edges[1].y * this.debugCanvas.height);
        ctx.stroke();
    }

    drawDot(dot: Vector2, color: string, mirror: boolean = false) {
        const ctx = this.debugCanvas.getContext('2d')
        if (!ctx) return
        // reset the canvas
        ctx.beginPath()
        ctx.fillStyle = color
        if (mirror) dot = dot.clone().setX(1 - dot.x)
        ctx.arc(dot.x * this.debugCanvas.width, dot.y * this.debugCanvas.height, 10, 0, 2 * Math.PI)
        ctx.fill()
    }

    drawLine(p1: Vector2, p2: Vector2, { color = "orange", mirror = false }: { color?: string, mirror?: boolean } = {}) {
        const ctx = this.debugCanvas.getContext('2d')
        if (!ctx) return
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 5

        if (mirror) {
            p1 = p1.clone().setX(1 - p1.x)
            p2 = p2.clone().setX(1 - p2.x)
        }

        ctx.moveTo(p1.x * this.debugCanvas.width, p1.y * this.debugCanvas.height)
        ctx.lineTo(p2.x * this.debugCanvas.width, p2.y * this.debugCanvas.height)
        ctx.stroke()
    }

    drawEdgeDetectionResult(edgeLeft: Vector2 | null, edgeRight: Vector2 | null, sampleStart: Vector2 | Vector3, sampleEnd: Vector2 | Vector3) {
        const ctx = this.debugCanvas.getContext('2d')
        if (!ctx) return

        if (edgeLeft) edgeLeft = edgeLeft.clone().setX(1 - edgeLeft.x)
        if (edgeRight) edgeRight = edgeRight.clone().setX(1 - edgeRight.x)

        if (edgeLeft && edgeRight) {
            ctx.beginPath()
            ctx.strokeStyle = 'red'
            ctx.lineWidth = 5
            ctx.moveTo(edgeLeft.x * this.debugCanvas.width, edgeLeft.y * this.debugCanvas.height)
            ctx.lineTo(edgeRight.x * this.debugCanvas.width, edgeRight.y * this.debugCanvas.height)
            ctx.stroke()

            const edgeLeftAbs = edgeLeft.clone().multiply(new Vector2(this.debugCanvas.width, this.debugCanvas.height))
            const edgeRightAbs = edgeRight.clone().multiply(new Vector2(this.debugCanvas.width, this.debugCanvas.height))

            const roll = Math.atan2(edgeLeftAbs.y - edgeRightAbs.y, edgeLeftAbs.x - edgeRightAbs.x) + Math.PI / 2
            const center = edgeLeftAbs.clone().lerp(edgeRightAbs, 0.5)

            // draw a line of length 100 passing through the center of the edge line
            const lineStart = center.clone().add(new Vector2(Math.cos(roll), Math.sin(roll)).multiplyScalar(50))
            const lineEnd = center.clone().add(new Vector2(Math.cos(roll), Math.sin(roll)).multiplyScalar(-50))

            ctx.beginPath()
            ctx.strokeStyle = 'orange'
            ctx.lineWidth = 5
            ctx.moveTo(lineStart.x, lineStart.y)
            ctx.lineTo(lineEnd.x, lineEnd.y)
            ctx.stroke()
        }

        // draw dots at the edges
        for (const point of [edgeLeft, edgeRight]) {
            if (!point) continue
            ctx.beginPath()
            ctx.fillStyle = 'red'
            ctx.arc(point.x * this.debugCanvas.width, point.y * this.debugCanvas.height, 5, 0, 2 * Math.PI)
            ctx.fill()
        }

        // draw the sample line
        ctx.beginPath()
        ctx.strokeStyle = 'green'
        ctx.lineWidth = 5
        ctx.moveTo(sampleStart.x * this.debugCanvas.width, sampleStart.y * this.debugCanvas.height)
        ctx.lineTo(sampleEnd.x * this.debugCanvas.width, sampleEnd.y * this.debugCanvas.height)
        ctx.stroke()

        for (const point of [sampleStart, sampleEnd]) {
            ctx.beginPath()
            ctx.fillStyle = 'green'
            ctx.arc(point.x * this.debugCanvas.width, point.y * this.debugCanvas.height, 5, 0, 2 * Math.PI)
            ctx.fill()
        }
    }

    getContext() {
        return this.debugCanvas.getContext('2d')
    }

    hide() {
        this.debugCanvas.style.display = 'none'
        this.debugSpheres.forEach(s => s.visible = false)
        this.segmenterEdgeSpheres.forEach(s => s.visible = false)
    }

    show() {
        this.debugCanvas.style.display = 'block'
        this.debugSpheres.forEach(s => s.visible = true)
        this.segmenterEdgeSpheres.forEach(s => s.visible = true)
    }

    dispose() {
        this.debugSpheres.forEach(s => {
            (s.material as MeshStandardMaterial).dispose()
            s.geometry.dispose()
            s.parent?.remove(s)
        })

        this.segmenterEdgeSpheres.forEach(s => {
            (s.material as MeshStandardMaterial).dispose()
            s.geometry.dispose()
            s.parent?.remove(s)
        })

        this.debugSpheres.length = 0
        this.segmenterEdgeSpheres.length = 0

        this.debugCanvas.remove()
    }
}

const isDebug = document.location.search.includes('debug');

let debugEl = null;

if (isDebug) {
    debugEl = document.createElement('div');
    debugEl.id = 'debug';
    debugEl.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 10px;
        font-size: 10px;
        z-index: 10000;
        font-family: monospace;
        line-height: 1.75;
        letter-spacing: 1px;
        width: 380px;
        pointer-events: none;
    `;

    // add a style element to the head that sets the font-size of the debug element to 8px for mobile devices
    const style = document.createElement('style');
    style.innerHTML = `
    @media (max-width: 600px) {
        #debug {
            font-size: 8px !important;
        }
    }
`;
    document.head.appendChild(style);
    document.body.appendChild(debugEl);
}

const blendedValues = new Map<string, number>();

export const debug = (label: string, value: string | number | boolean) => {
    if (!debugEl) return;

    if (value === undefined || value === null || !Number.isFinite(Number(value))) {
        if (typeof value !== "string" && typeof value !== "boolean") value = 'N/A';
    } else {

        if (typeof value === 'number' && !Number.isInteger(value)) {
            if (blendedValues.has(label)) {
                const prevValue = blendedValues.get(label)!;
                let alpha = MathUtils.mapLinear(Math.abs(value - prevValue), 0, 0.5, 0.01, 0.1);
                alpha = MathUtils.clamp(alpha, 0, 1);
                value = (1 - alpha) * prevValue + alpha * Number(value);
                blendedValues.set(label, value);
            } else {
                blendedValues.set(label, Number(value));
            }

            // round to 2 decimal places if the value is big enough (bigger than 0.01)
            if (Math.abs(value) > 0.01) {
                value = value.toFixed(2);
            } else {
                value = value.toFixed(4);
            }
        }
    }

    // check if the element already exists
    let span = document.getElementById("debug-" + label);

    if (!span) {
        span = document.createElement('span');
        span.style.color = '#00ff00';
        span.id = "debug-" + label;

        const div = document.createElement('div');
        div.innerHTML = label + ': ';
        div.appendChild(span);

        debugEl.appendChild(div);
    }

    // if the value is a boolean, set the color to green if true, red if false
    if (typeof value === 'boolean') {
        span.style.color = value ? '#00ff00' : '#ff0000';
    }

    span.textContent = value.toString();
}