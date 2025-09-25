export interface HTMLVideoElement2 extends HTMLVideoElement {
    _requestHandles: Set<number>
    _cancelAllVideoFrameCallbacks(): void
}

/**
 * Required because VideoTexture in three.js uses requestVideoFrameCallback which is not cancelled.
 * @param v - normal video element
 */
export function videoElementCancelCallbackPolyfill(v: HTMLVideoElement): HTMLVideoElement2 {
    const video = v as HTMLVideoElement2
    const requestVideoFrameCallback = video.requestVideoFrameCallback

    if (typeof requestVideoFrameCallback !== 'function') {
        console.warn('requestVideoFrameCallback not found on video element')
        return video
    }

    video._requestHandles = new Set<number>()
    video._cancelAllVideoFrameCallbacks = () => {
        video._requestHandles.forEach(h => video.cancelVideoFrameCallback(h))
        video._requestHandles.clear()
    }
    video.requestVideoFrameCallback = (callback) => {
        const handle = requestVideoFrameCallback.call(video, (...args) => {
            callback(...args)
            video._requestHandles.delete(handle)
        })
        video._requestHandles.add(handle)
        return handle
    }
    return video
}

export function createOffscreenCanvasFromVideo(video: HTMLVideoElement): OffscreenCanvas {
    const offscreen = new OffscreenCanvas(video.videoWidth, video.videoHeight)
    const ctx = offscreen.getContext('2d')
    ctx?.drawImage(video, 0, 0)

    return offscreen
}