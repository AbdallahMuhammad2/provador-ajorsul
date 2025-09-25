import { ImageSegmenter } from "@mediapipe/tasks-vision";

// source: https://stackoverflow.com/a/1501725
function getDistanceToLineSegment(p: { x: number, y: number }, v: { x: number, y: number }, w: { x: number, y: number }): number {
    function dist2(v: { x: number, y: number }, w: { x: number, y: number }): number {
        return (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
    }


    function distToSegmentSquared(p: { x: number, y: number }, v: { x: number, y: number }, w: { x: number, y: number }): number {
        const l2 = dist2(v, w);
        if (l2 === 0) return dist2(p, v);
        let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return dist2(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) });
    }

    return Math.sqrt(distToSegmentSquared(p, v, w));
}

enum Finger {
    Thumb = 0,
    Index = 1,
    Middle = 2,
    Ring = 3,
    Pinky = 4
}

const getLandmarkIndicesFromFinger = (finger: Finger) => {
    switch (finger) {
        case Finger.Thumb:
            return [1, 2, 3, 4]
        case Finger.Index:
            return [5, 6, 7, 8]
        case Finger.Middle:
            return [9, 10, 11, 12]
        case Finger.Ring:
            return [13, 14, 15, 16]
        case Finger.Pinky:
            return [17, 18, 19, 20]
    }
}

const hasOffscreenCanvas = typeof OffscreenCanvas !== "undefined";
const cropCanvas = hasOffscreenCanvas ? new OffscreenCanvas(1, 1) : document.createElement("canvas");
const ctx = cropCanvas.getContext("2d", {
    willReadFrequently: true
})! as OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;

interface Landmark {
    x: number;
    y: number;
}

interface ROI {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ResultData {
    detectionTime: number;
    roi: ROI;
    timestamp: number;
    edgeLeft: Landmark | null;
    edgeRight: Landmark | null;
    ringFingerMovementFactor: number;
    overstep: boolean;
    distance?: number;
    writeBuffer?: Uint8ClampedArray;
}

export const performSegmentation = (
    imageSegmenter: ImageSegmenter,
    videoSource: HTMLVideoElement | ImageBitmap,
    timestamp: number,
    codedWidth: number,
    codedHeight: number,
    landmarks: Landmark[],
    ringFingerMovementFactor: number,
    modelMinConfidence: number = 0.375
): ResultData | null => {
    const startTime = performance.now();

    const isDebugMode = globalThis.window?.location.search.includes("debug");

    const lmAbs = landmarks.map(lm => {
        return {
            x: Math.round(lm.x * codedWidth),
            y: Math.round(lm.y * codedHeight)
        }
    });

    // create a bounding box of the hand by determining min and max x and y values
    const min = { x: Infinity, y: Infinity };
    const max = { x: -Infinity, y: -Infinity };

    for (const lm of lmAbs) {
        min.x = Math.min(min.x, lm.x);
        min.y = Math.min(min.y, lm.y);
        max.x = Math.max(max.x, lm.x);
        max.y = Math.max(max.y, lm.y);
    }

    let size = ~~(Math.hypot(lmAbs[9].x - lmAbs[0].x, lmAbs[9].y - lmAbs[0].y) * 1.25);
    size = Math.max(
        size,
        ~~(Math.hypot(lmAbs[13].x - lmAbs[15].x, lmAbs[13].y - lmAbs[15].y) * 4)
    )

    // bring size to a multiple of 2
    size = Math.ceil(size / 2) * 2;

    const t = 0.666
    const roiCenterX = lmAbs[13].x * (1 - t) + lmAbs[14].x * t;
    const roiCenterY = lmAbs[13].y * (1 - t) + lmAbs[14].y * t;

    const roi: ROI = {
        x: roiCenterX - size / 2,
        y: roiCenterY - size / 2,
        width: size,
        height: size
    };

    for (const prop of Object.keys(roi)) roi[prop as keyof ROI] = Math.round(roi[prop as keyof ROI]);

    roi.x = roi.x - (roi.x % 2);
    roi.y = roi.y - (roi.y % 2);

    const lmMappedRoi = lmAbs.map(lm => {
        return {
            x: lm.x - roi.x,
            y: lm.y - roi.y
        }
    })

    // clamp roi
    // todo!: take care of distorted finger width when the roi is clamped
    if (roi.x < 0) {
        lmMappedRoi.forEach(lm => lm.x += roi.x);
        roi.x = 0;
    }
    if (roi.y < 0) {
        lmMappedRoi.forEach(lm => lm.y += roi.y);
        roi.y = 0;
    }
    if (roi.x > codedWidth) {
        lmMappedRoi.forEach(lm => lm.x -= roi.x - codedWidth);
        roi.x = codedWidth;
    }
    if (roi.y > codedHeight) {
        lmMappedRoi.forEach(lm => lm.y -= roi.y - codedHeight);
        roi.y = codedHeight;
    }

    roi.width = Math.min(roi.width, codedWidth - roi.x);
    roi.height = Math.min(roi.height, codedHeight - roi.y);

    if (roi.width < 8 || roi.height < 8) {
        return null;
    }

    // crop the offscreenCanvas to the roi
    cropCanvas.width = roi.width;
    cropCanvas.height = roi.height;
    ctx.drawImage(videoSource, roi.x, roi.y, roi.width, roi.height, 0, 0, roi.width, roi.height);

    const resultData: ResultData = {
        detectionTime: 0,
        roi,
        timestamp,
        edgeLeft: null,
        edgeRight: null,
        ringFingerMovementFactor,
        overstep: false
    };

    // const d = new ImageData(5000, 5000)
    const result = imageSegmenter.segmentForVideo(cropCanvas, performance.now());

    if ("close" in videoSource) videoSource.close();

    if (!result || !result.confidenceMasks) {
        result.close();
        return null;
    }

    if (result?.confidenceMasks?.length > 0) {
        const segmentationMask = result.confidenceMasks[2]; // body skin mask
        const { width, height } = segmentationMask;

        const segmentationData = segmentationMask.getAsFloat32Array();

        // flip segmentationData -> x = 1 - x
        // for (let i = 0; i < segmentationData.length; i++) {
        //     segmentationData[i] = 1 - segmentationData[i];
        // }

        let writeBufferView: Uint8ClampedArray | null = null;

        if (isDebugMode) {
            writeBufferView = new Uint8ClampedArray(width * height * 4);
            resultData.writeBuffer = writeBufferView;

            for (let i = 0; i < segmentationData.length; i++) {
                const v = segmentationData[i] > modelMinConfidence ? 255 : 0;

                writeBufferView[i * 4] = v;
                writeBufferView[i * 4 + 1] = v;
                writeBufferView[i * 4 + 2] = v;
                writeBufferView[i * 4 + 3] = 255;
            }

            for (const lm of lmMappedRoi) {
                for (let i = -2; i <= 2; i++) {
                    for (let j = -2; j <= 2; j++) {
                        if (lm.x + i < 0 || lm.x + i >= width || lm.y + j < 0 || lm.y + j >= height) {
                            continue;
                        }

                        const idx = ((lm.y + j) * width + (lm.x + i)) * 4;
                        writeBufferView[idx] = 0;
                        writeBufferView[idx + 1] = 0;
                        writeBufferView[idx + 2] = 255;
                    }
                }
            }
        }

        const finger = Finger.Ring

        const getClosestLandmark = (x: number, y: number) => {
            let closestFinger = -1;
            let closestBone = -1;
            let closestDistance = Infinity;

            const p = { x, y };

            for (let i = 0; i < 5; i++) {
                const fingerLms = getLandmarkIndicesFromFinger(i as Finger)

                for (let j = 0; j < fingerLms.length; j++) {
                    const a = lmMappedRoi[fingerLms[j]];
                    const b = lmMappedRoi[fingerLms[j + 1]];
                    if (!b) continue;

                    let distance = getDistanceToLineSegment(p, a, b);
                    if (i === finger) distance *= 0.6;

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestFinger = i;
                        closestBone = j;
                    }
                }
            }

            return [closestFinger, closestBone, closestDistance];
        }

        const raymarch = (dir: number, x: number, y: number, roll: number, fingerBoneIndex: number): Landmark | null => {
            let i = 0;

            const stepX = Math.cos(roll) * dir * 0.5;
            const stepY = Math.sin(roll) * dir * 0.5;

            let accumulatedX = 0;
            let accumulatedY = 0;

            while (i++ < 500) {
                accumulatedX += stepX;
                accumulatedY += stepY;

                const currentX = Math.round(x + accumulatedX);
                const currentY = Math.round(y + accumulatedY);

                const [closestFinger, closestBone] = getClosestLandmark(currentX, currentY)

                if (closestFinger !== finger || closestBone !== fingerBoneIndex) {
                    resultData.overstep = true;
                    if (isDebugMode) console.log("Raymarch overstepped the gap between fingers", closestFinger);
                    return null;
                }

                if (currentX < 0 || currentX >= width || currentY < 0 || currentY >= height) {
                    continue;
                }

                const idx = (currentY * width + currentX);

                if (segmentationData[idx] < modelMinConfidence) {
                    if (isDebugMode) {
                        for (let j = -3; j <= 3; j++) {
                            for (let k = -3; k <= 3; k++) {
                                const edgeX = currentX + k;
                                const edgeY = currentY + j;
                                if (edgeX >= 0 && edgeX < width && edgeY >= 0 && edgeY < height) {
                                    const edgeIdx = (edgeY * width * 4 + edgeX * 4);
                                    writeBufferView![edgeIdx] = 255;
                                    writeBufferView![edgeIdx + 1] = 0;
                                    writeBufferView![edgeIdx + 2] = 0;
                                }
                            }
                        }
                    }

                    return { x: accumulatedX, y: accumulatedY };
                }

                if (isDebugMode) {
                    const writeBufferIdx = (currentY * width * 4 + currentX * 4);

                    writeBufferView![writeBufferIdx] = 255;
                    writeBufferView![writeBufferIdx + 1] = 0;
                    writeBufferView![writeBufferIdx + 2] = 0;
                }
            }

            return null;
        };

        let edgeLeftRoi: Landmark | null = null;
        let edgeRightRoi: Landmark | null = null;

        const roll1314 = Math.atan2(lmAbs[14].y - lmAbs[13].y, lmAbs[14].x - lmAbs[13].x) + Math.PI / 2;
        let x = 0
        let y = 0
        let t = 0.666

        const targetX = lmMappedRoi[13].x * (1 - t) + lmMappedRoi[14].x * t;
        const targetY = lmMappedRoi[13].y * (1 - t) + lmMappedRoi[14].y * t;

        let earliestEdgeLeft: Landmark | null = null;
        let earliestEdgeLeftXY = { x: 0, y: 0 };
        let earliestEdgeRight: Landmark | null = null;
        let earliestEdgeRightXY = { x: 0, y: 0 };

        while (t < 1) {
            x = lmMappedRoi[13].x * (1 - t) + lmMappedRoi[14].x * t;
            y = lmMappedRoi[13].y * (1 - t) + lmMappedRoi[14].y * t;

            const raymarchEdgeLeftRoi = raymarch(-1, x, y, roll1314, 0);
            const raymarchEdgeRightRoi = raymarch(1, x, y, roll1314, 0);

            if (raymarchEdgeLeftRoi && raymarchEdgeRightRoi) {
                edgeLeftRoi = raymarchEdgeLeftRoi;
                edgeRightRoi = raymarchEdgeRightRoi;
                break;
            }

            if (!earliestEdgeLeft && raymarchEdgeLeftRoi) {
                earliestEdgeLeft = raymarchEdgeLeftRoi;
                earliestEdgeLeftXY = { x, y };
            }

            if (!earliestEdgeRight && raymarchEdgeRightRoi) {
                earliestEdgeRight = raymarchEdgeRightRoi;
                earliestEdgeRightXY = { x, y };
            }

            t += 0.05;
        }

        if (!edgeLeftRoi && earliestEdgeLeft) {
            edgeLeftRoi = earliestEdgeLeft;
            x = earliestEdgeLeftXY.x;
            y = earliestEdgeLeftXY.y;
        }

        if (!edgeRightRoi && earliestEdgeRight) {
            edgeRightRoi = earliestEdgeRight;
            x = earliestEdgeRightXY.x;
            y = earliestEdgeRightXY.y;
        }

        const xDiff = x - targetX;
        const yDiff = y - targetY;

        // subtract xDiff and yDiff from the edgeLeftRoi and edgeRightRoi to get the actual position of the edges
        if (edgeLeftRoi) {
            edgeLeftRoi.x -= xDiff;
            edgeLeftRoi.y -= yDiff;
        }
        if (edgeRightRoi) {
            edgeRightRoi.x -= xDiff;
            edgeRightRoi.y -= yDiff;
        }

        const edgeLeft = edgeLeftRoi ? {
            x: (edgeLeftRoi.x + x + roi.x) / codedWidth,
            y: (edgeLeftRoi.y + y + roi.y) / codedHeight,
        } : null;

        const edgeRight = edgeRightRoi ? {
            x: (edgeRightRoi.x + x + roi.x) / codedWidth,
            y: (edgeRightRoi.y + y + roi.y) / codedHeight,
        } : null;

        resultData.edgeLeft = edgeLeft;
        resultData.edgeRight = edgeRight;

        resultData.detectionTime = performance.now() - startTime;
    }
    result.close()
    return resultData;
};