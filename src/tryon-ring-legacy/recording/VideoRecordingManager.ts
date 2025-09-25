import { WebGLRenderer, Scene, Camera, Vector2 } from 'webgi'

export interface RecordingOptions {
    quality: 'low' | 'medium' | 'high' | 'ultra'
    format: 'webm' | 'mp4'
    fps: number
    duration?: number
    includeAudio: boolean
    watermark?: {
        text: string
        position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
        opacity: number
    }
}

export interface RecordingStats {
    duration: number
    frames: number
    size: number
    fps: number
    quality: string
}

/**
 * Advanced Video Recording Manager for Perfect Corp level functionality
 * Records the virtual try-on experience with high quality output
 */
export class VideoRecordingManager {
    private renderer: WebGLRenderer
    private scene: Scene
    private camera: Camera
    
    // Recording state
    private isRecording: boolean = false
    private mediaRecorder: MediaRecorder | null = null
    private recordedChunks: Blob[] = []
    
    // Canvas and stream
    private recordingCanvas: HTMLCanvasElement
    private recordingContext: CanvasRenderingContext2D
    private stream: MediaStream | null = null
    
    // Recording configuration
    private currentOptions: RecordingOptions = {
        quality: 'high',
        format: 'webm',
        fps: 30,
        includeAudio: false
    }
    
    // Statistics
    private stats: RecordingStats = {
        duration: 0,
        frames: 0,
        size: 0,
        fps: 0,
        quality: 'high'
    }
    
    private startTime: number = 0
    private frameCount: number = 0
    
    // Watermark canvas
    private watermarkCanvas: HTMLCanvasElement | null = null
    
    // Event callbacks
    private onRecordingStart?: () => void
    private onRecordingStop?: (blob: Blob, stats: RecordingStats) => void
    private onRecordingError?: (error: Error) => void
    
    constructor(renderer: WebGLRenderer, scene: Scene, camera: Camera) {
        this.renderer = renderer
        this.scene = scene
        this.camera = camera
        
        this.setupRecordingCanvas()
        this.checkBrowserSupport()
    }
    
    private setupRecordingCanvas() {
        this.recordingCanvas = document.createElement('canvas')
        this.recordingContext = this.recordingCanvas.getContext('2d')!
        
        // Match renderer size
        this.updateCanvasSize()
    }
    
    private updateCanvasSize() {
        const size = this.renderer.getSize(new Vector2())
        this.recordingCanvas.width = size.x
        this.recordingCanvas.height = size.y
    }
    
    private checkBrowserSupport(): boolean {
        if (!MediaRecorder.isTypeSupported) {
            console.warn('VideoRecordingManager: MediaRecorder not supported')
            return false
        }
        
        // Check format support
        const webmSupport = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        const mp4Support = MediaRecorder.isTypeSupported('video/mp4;codecs=h264')
        
        console.log('Video recording support:', { webm: webmSupport, mp4: mp4Support })
        return webmSupport || mp4Support
    }
    
    /**
     * Start recording with specified options
     */
    public async startRecording(options: Partial<RecordingOptions> = {}): Promise<void> {
        if (this.isRecording) {
            throw new Error('Recording already in progress')
        }
        
        try {
            // Merge options with defaults
            this.currentOptions = { ...this.currentOptions, ...options }
            
            // Setup recording
            await this.initializeRecording()
            
            this.isRecording = true
            this.startTime = performance.now()
            this.frameCount = 0
            this.recordedChunks = []
            
            // Start the recording loop
            this.startRecordingLoop()
            
            console.log('VideoRecordingManager: Recording started')
            this.onRecordingStart?.()
            
        } catch (error) {
            console.error('VideoRecordingManager: Failed to start recording:', error)
            this.onRecordingError?.(error as Error)
            throw error
        }
    }
    
    private async initializeRecording() {
        this.updateCanvasSize()
        
        // Create watermark if specified
        if (this.currentOptions.watermark) {
            this.createWatermark()
        }
        
        // Create media stream from canvas
        const frameRate = this.currentOptions.fps
        this.stream = this.recordingCanvas.captureStream(frameRate)
        
        // Add audio if requested
        if (this.currentOptions.includeAudio) {
            await this.addAudioTrack()
        }
        
        // Setup MediaRecorder
        const mimeType = this.getMimeType()
        const options = {
            mimeType,
            videoBitsPerSecond: this.getVideoBitrate()
        }
        
        this.mediaRecorder = new MediaRecorder(this.stream, options)
        
        this.mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                this.recordedChunks.push(event.data)
                this.stats.size += event.data.size
            }
        }
        
        this.mediaRecorder.onstop = () => {
            this.finalizeRecording()
        }
        
        this.mediaRecorder.onerror = (event) => {
            console.error('MediaRecorder error:', event)
            this.onRecordingError?.(new Error('MediaRecorder error'))
        }
        
        this.mediaRecorder.start(100) // Collect data every 100ms
    }
    
    private createWatermark() {
        const watermark = this.currentOptions.watermark!
        this.watermarkCanvas = document.createElement('canvas')
        const ctx = this.watermarkCanvas.getContext('2d')!
        
        // Size watermark canvas
        this.watermarkCanvas.width = 300
        this.watermarkCanvas.height = 50
        
        // Style watermark text
        ctx.font = '16px Arial'
        ctx.fillStyle = `rgba(255, 255, 255, ${watermark.opacity})`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        // Draw watermark text
        ctx.fillText(watermark.text, 150, 25)
    }
    
    private async addAudioTrack() {
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                } 
            })
            
            // Add audio tracks to the stream
            audioStream.getAudioTracks().forEach(track => {
                this.stream!.addTrack(track)
            })
        } catch (error) {
            console.warn('Failed to add audio track:', error)
        }
    }
    
    private getMimeType(): string {
        const format = this.currentOptions.format
        
        if (format === 'webm') {
            if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
                return 'video/webm;codecs=vp9'
            } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
                return 'video/webm;codecs=vp8'
            }
        } else if (format === 'mp4') {
            if (MediaRecorder.isTypeSupported('video/mp4;codecs=h264')) {
                return 'video/mp4;codecs=h264'
            }
        }
        
        // Fallback
        return 'video/webm'
    }
    
    private getVideoBitrate(): number {
        const quality = this.currentOptions.quality
        const bitrateMap = {
            'low': 1000000,    // 1 Mbps
            'medium': 2500000, // 2.5 Mbps
            'high': 5000000,   // 5 Mbps
            'ultra': 10000000  // 10 Mbps
        }
        
        return bitrateMap[quality]
    }
    
    private startRecordingLoop() {
        const recordFrame = () => {
            if (!this.isRecording) return
            
            // Capture frame from WebGI renderer
            this.captureFrame()
            this.frameCount++
            
            // Check duration limit
            if (this.currentOptions.duration) {
                const elapsed = (performance.now() - this.startTime) / 1000
                if (elapsed >= this.currentOptions.duration) {
                    this.stopRecording()
                    return
                }
            }
            
            // Update stats
            this.updateStats()
            
            // Schedule next frame
            requestAnimationFrame(recordFrame)
        }
        
        recordFrame()
    }
    
    private captureFrame() {
        // Clear recording canvas
        this.recordingContext.clearRect(0, 0, this.recordingCanvas.width, this.recordingCanvas.height)
        
        // Get renderer's canvas
        const rendererCanvas = this.renderer.domElement
        
        // Draw renderer output to recording canvas
        this.recordingContext.drawImage(
            rendererCanvas, 
            0, 0, 
            this.recordingCanvas.width, 
            this.recordingCanvas.height
        )
        
        // Add watermark if present
        if (this.watermarkCanvas && this.currentOptions.watermark) {
            this.drawWatermark()
        }
    }
    
    private drawWatermark() {
        const watermark = this.currentOptions.watermark!
        const pos = this.getWatermarkPosition(watermark.position)
        
        this.recordingContext.drawImage(
            this.watermarkCanvas!,
            pos.x,
            pos.y
        )
    }
    
    private getWatermarkPosition(position: string): { x: number, y: number } {
        const margin = 20
        const watermarkWidth = this.watermarkCanvas!.width
        const watermarkHeight = this.watermarkCanvas!.height
        
        switch (position) {
            case 'top-left':
                return { x: margin, y: margin }
            case 'top-right':
                return { x: this.recordingCanvas.width - watermarkWidth - margin, y: margin }
            case 'bottom-left':
                return { x: margin, y: this.recordingCanvas.height - watermarkHeight - margin }
            case 'bottom-right':
                return { 
                    x: this.recordingCanvas.width - watermarkWidth - margin, 
                    y: this.recordingCanvas.height - watermarkHeight - margin 
                }
            default:
                return { x: margin, y: margin }
        }
    }
    
    private updateStats() {
        const elapsed = (performance.now() - this.startTime) / 1000
        this.stats.duration = elapsed
        this.stats.frames = this.frameCount
        this.stats.fps = this.frameCount / elapsed
        this.stats.quality = this.currentOptions.quality
    }
    
    /**
     * Stop recording and generate video blob
     */
    public async stopRecording(): Promise<Blob> {
        if (!this.isRecording || !this.mediaRecorder) {
            throw new Error('No recording in progress')
        }
        
        this.isRecording = false
        
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Recording stop timeout'))
            }, 5000)
            
            this.mediaRecorder!.onstop = () => {
                clearTimeout(timeout)
                this.finalizeRecording()
                
                const blob = new Blob(this.recordedChunks, { 
                    type: this.getMimeType() 
                })
                
                console.log('VideoRecordingManager: Recording stopped')
                this.onRecordingStop?.(blob, { ...this.stats })
                
                resolve(blob)
            }
            
            this.mediaRecorder!.stop()
            
            // Stop all stream tracks
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop())
            }
        })
    }
    
    private finalizeRecording() {
        // Final stats update
        this.updateStats()
        this.stats.size = this.recordedChunks.reduce((total, chunk) => total + chunk.size, 0)
        
        // Cleanup
        this.mediaRecorder = null
        this.stream = null
        this.watermarkCanvas = null
    }
    
    /**
     * Pause recording (if supported)
     */
    public pauseRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.pause()
            console.log('VideoRecordingManager: Recording paused')
        }
    }
    
    /**
     * Resume recording (if supported)
     */
    public resumeRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
            this.mediaRecorder.resume()
            console.log('VideoRecordingManager: Recording resumed')
        }
    }
    
    /**
     * Take a screenshot
     */
    public takeScreenshot(): Blob {
        this.captureFrame()
        
        return new Promise((resolve) => {
            this.recordingCanvas.toBlob((blob) => {
                resolve(blob!)
            }, 'image/png')
        }) as any
    }
    
    /**
     * Download recorded video
     */
    public async downloadRecording(filename: string = 'ring-tryon-recording'): Promise<void> {
        if (this.isRecording) {
            throw new Error('Cannot download while recording')
        }
        
        if (this.recordedChunks.length === 0) {
            throw new Error('No recording to download')
        }
        
        const blob = new Blob(this.recordedChunks, { 
            type: this.getMimeType() 
        })
        
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${filename}.${this.currentOptions.format}`
        
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        
        URL.revokeObjectURL(url)
    }
    
    /**
     * Share recording (if Web Share API is supported)
     */
    public async shareRecording(title: string = 'My Ring Try-On'): Promise<void> {
        if (!navigator.share) {
            throw new Error('Web Share API not supported')
        }
        
        if (this.recordedChunks.length === 0) {
            throw new Error('No recording to share')
        }
        
        const blob = new Blob(this.recordedChunks, { 
            type: this.getMimeType() 
        })
        
        const file = new File([blob], `ring-tryon.${this.currentOptions.format}`, {
            type: blob.type
        })
        
        await navigator.share({
            title,
            text: 'Check out my virtual ring try-on experience!',
            files: [file]
        })
    }
    
    /**
     * Get current recording status
     */
    public getStatus() {
        return {
            isRecording: this.isRecording,
            isPaused: this.mediaRecorder?.state === 'paused',
            canRecord: this.checkBrowserSupport(),
            stats: { ...this.stats }
        }
    }
    
    /**
     * Set event callbacks
     */
    public setCallbacks(callbacks: {
        onStart?: () => void
        onStop?: (blob: Blob, stats: RecordingStats) => void
        onError?: (error: Error) => void
    }) {
        this.onRecordingStart = callbacks.onStart
        this.onRecordingStop = callbacks.onStop
        this.onRecordingError = callbacks.onError
    }
    
    /**
     * Get supported formats
     */
    public getSupportedFormats(): string[] {
        const formats: string[] = []
        
        if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
            formats.push('webm')
        }
        if (MediaRecorder.isTypeSupported('video/mp4;codecs=h264')) {
            formats.push('mp4')
        }
        
        return formats
    }
    
    /**
     * Estimate file size for given duration
     */
    public estimateFileSize(durationSeconds: number): number {
        const bitrate = this.getVideoBitrate()
        return (bitrate / 8) * durationSeconds // Convert bits to bytes
    }
    
    /**
     * Clear recorded data
     */
    public clearRecording() {
        this.recordedChunks = []
        this.stats = {
            duration: 0,
            frames: 0,
            size: 0,
            fps: 0,
            quality: this.currentOptions.quality
        }
    }
    
    /**
     * Dispose resources
     */
    public dispose() {
        if (this.isRecording) {
            this.stopRecording().catch(console.error)
        }
        
        this.clearRecording()
        
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop())
        }
        
        this.recordingCanvas.remove()
        this.watermarkCanvas?.remove()
    }
}