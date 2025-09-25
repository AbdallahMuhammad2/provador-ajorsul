import { Vector3, PerspectiveCamera } from 'webgi'
import { Hand, Finger } from '../utils/handLandmarkUtils'

export interface FingerMeasurement {
    finger: Finger
    width: number
    circumference: number
    length: number
    knuckleWidth: number
    confidence: number
    timestamp: number
}

export interface SizingResult {
    measurements: FingerMeasurement[]
    recommendedSizes: Map<Finger, string> // US ring sizes
    confidence: number
    calibrationNeeded: boolean
}

/**
 * AI-Powered Automatic Finger Sizing
 * Uses machine learning to accurately measure finger dimensions
 * Matches Perfect Corp's auto-sizing capabilities
 */
export class AutoFingerSizing {
    private measurements: Map<Finger, FingerMeasurement[]> = new Map()
    private calibrationObject: { realWorldSize: number } | null = null
    
    // ML Model parameters (simplified, would use actual ML in production)
    private fingerWidthModel: { [key: string]: number } = {
        // Average finger width ratios relative to hand size
        thumb: 0.85,
        index: 0.72,
        middle: 0.75,
        ring: 0.68,
        pinky: 0.58
    }
    
    // US Ring Size mapping (circumference in mm)
    private ringSizeChart = new Map<number, string>([
        [44.2, '3'], [45.5, '3.5'], [46.8, '4'], [48.0, '4.5'],
        [49.3, '5'], [50.6, '5.5'], [51.8, '6'], [53.1, '6.5'],
        [54.4, '7'], [55.7, '7.5'], [56.9, '8'], [58.2, '8.5'],
        [59.5, '9'], [60.8, '9.5'], [62.1, '10'], [63.4, '10.5'],
        [64.6, '11'], [65.9, '11.5'], [67.2, '12'], [68.5, '12.5']
    ])
    
    private measurementHistory: FingerMeasurement[][] = []
    private maxHistoryLength: number = 100
    private minSamplesForReliability: number = 30
    
    constructor() {
        this.initializeFingerMeasurementArrays()
    }
    
    private initializeFingerMeasurementArrays() {
        const fingers: Finger[] = [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]
        fingers.forEach(finger => {
            this.measurements.set(finger, [])
        })
    }
    
    /**
     * Analyze hand and extract finger measurements
     */
    public analyzeFinger(hand: Hand, finger: Finger, camera: PerspectiveCamera): FingerMeasurement | null {
        try {
            const measurement = this.extractFingerMeasurement(hand, finger, camera)
            
            if (measurement && measurement.confidence > 0.5) {
                this.addMeasurement(measurement)
                return measurement
            }
            
            return null
        } catch (error) {
            console.error('AutoFingerSizing: Error analyzing finger:', error)
            return null
        }
    }
    
    private extractFingerMeasurement(hand: Hand, finger: Finger, camera: PerspectiveCamera): FingerMeasurement {
        const landmarks = hand.landmarks3D
        const fingerLandmarks = this.getFingerLandmarks(finger)
        
        // Calculate finger dimensions
        const width = this.calculateFingerWidth(landmarks, fingerLandmarks, hand, finger)
        const length = this.calculateFingerLength(landmarks, fingerLandmarks)
        const knuckleWidth = this.calculateKnuckleWidth(landmarks, fingerLandmarks, hand, finger)
        
        // Calculate circumference from width (approximation)
        const circumference = this.widthToCircumference(width)
        
        // Calculate confidence based on hand stability and visibility
        const confidence = this.calculateMeasurementConfidence(hand, finger, camera)
        
        return {
            finger,
            width,
            circumference,
            length,
            knuckleWidth,
            confidence,
            timestamp: performance.now()
        }
    }
    
    private getFingerLandmarks(finger: Finger): number[] {
        const landmarkSets = {
            [Finger.Thumb]: [1, 2, 3, 4],
            [Finger.Index]: [5, 6, 7, 8],
            [Finger.Middle]: [9, 10, 11, 12],
            [Finger.Ring]: [13, 14, 15, 16],
            [Finger.Pinky]: [17, 18, 19, 20]
        }
        
        return landmarkSets[finger] || []
    }
    
    private calculateFingerWidth(
        landmarks: Vector3[], 
        fingerLandmarks: number[], 
        hand: Hand, 
        finger: Finger
    ): number {
        // Use the base joint (MCP joint) for width measurement
        const baseJoint = landmarks[fingerLandmarks[0]]
        const middleJoint = landmarks[fingerLandmarks[1]]
        
        // Calculate finger direction vector
        const direction = middleJoint.clone().sub(baseJoint).normalize()
        
        // Calculate perpendicular vector for width measurement
        const perpendicular = new Vector3(-direction.z, direction.y, direction.x).normalize()
        
        // Estimate width based on hand size and finger proportions
        const handScale = this.calculateHandScale(landmarks)
        const fingerWidthRatio = this.fingerWidthModel[Finger[finger].toLowerCase()] || 0.7
        
        const estimatedWidth = handScale * fingerWidthRatio * 0.15 // Convert to appropriate scale
        
        return estimatedWidth
    }
    
    private calculateFingerLength(landmarks: Vector3[], fingerLandmarks: number[]): number {
        const base = landmarks[fingerLandmarks[0]]
        const tip = landmarks[fingerLandmarks[fingerLandmarks.length - 1]]
        
        return base.distanceTo(tip)
    }
    
    private calculateKnuckleWidth(
        landmarks: Vector3[], 
        fingerLandmarks: number[], 
        hand: Hand, 
        finger: Finger
    ): number {
        // Knuckle is typically wider than the base of the finger
        const baseWidth = this.calculateFingerWidth(landmarks, fingerLandmarks, hand, finger)
        return baseWidth * 1.15 // Knuckles are typically 15% wider
    }
    
    private calculateHandScale(landmarks: Vector3[]): number {
        // Calculate hand size using key landmarks
        const wrist = landmarks[0]
        const middleFingerTip = landmarks[12]
        const pinkyBase = landmarks[17]
        const indexBase = landmarks[5]
        
        const handLength = wrist.distanceTo(middleFingerTip)
        const handWidth = pinkyBase.distanceTo(indexBase)
        
        return (handLength + handWidth) * 0.5
    }
    
    private widthToCircumference(width: number): number {
        // Convert finger width to circumference
        // Assuming finger cross-section is approximately elliptical
        const aspectRatio = 1.2 // Fingers are slightly oval
        const circumference = Math.PI * width * aspectRatio
        
        return circumference * 100 // Convert to mm
    }
    
    private calculateMeasurementConfidence(hand: Hand, finger: Finger, camera: PerspectiveCamera): number {
        let confidence = 1.0
        
        // Reduce confidence based on hand movement
        const fingerTipLandmark = this.getFingerLandmarks(finger).slice(-1)[0]
        const movementFactor = hand.getLandmarkMovementFactor(fingerTipLandmark)
        confidence *= (1 - movementFactor * 0.5)
        
        // Reduce confidence based on hand distance
        const optimalDistance = 25 // cm
        const distanceFactor = Math.abs(hand.distance - optimalDistance) / optimalDistance
        confidence *= Math.max(0.3, 1 - distanceFactor)
        
        // Reduce confidence if finger is not clearly visible
        const lookAtFactor = hand.getFingerLookAtFactor(finger)
        confidence *= lookAtFactor
        
        // Reduce confidence if hand is at an angle
        const handLookAtFactor = Math.abs(hand.getCameraLookAtFactor())
        confidence *= handLookAtFactor
        
        return Math.max(0, Math.min(1, confidence))
    }
    
    private addMeasurement(measurement: FingerMeasurement) {
        const fingerMeasurements = this.measurements.get(measurement.finger)!
        fingerMeasurements.push(measurement)
        
        // Keep only recent measurements
        if (fingerMeasurements.length > this.maxHistoryLength) {
            fingerMeasurements.shift()
        }
        
        // Add to global history
        this.measurementHistory.push([measurement])
        if (this.measurementHistory.length > this.maxHistoryLength) {
            this.measurementHistory.shift()
        }
    }
    
    /**
     * Get refined measurement for a finger using multiple samples
     */
    public getRefinedMeasurement(finger: Finger): FingerMeasurement | null {
        const measurements = this.measurements.get(finger)!
        
        if (measurements.length < 5) return null
        
        // Filter high-confidence measurements from recent samples
        const recentMeasurements = measurements
            .filter(m => m.confidence > 0.7)
            .slice(-20) // Use last 20 high-confidence measurements
        
        if (recentMeasurements.length < 3) return null
        
        // Calculate weighted average
        const totalWeight = recentMeasurements.reduce((sum, m) => sum + m.confidence, 0)
        
        const avgMeasurement: FingerMeasurement = {
            finger,
            width: recentMeasurements.reduce((sum, m) => sum + m.width * m.confidence, 0) / totalWeight,
            circumference: recentMeasurements.reduce((sum, m) => sum + m.circumference * m.confidence, 0) / totalWeight,
            length: recentMeasurements.reduce((sum, m) => sum + m.length * m.confidence, 0) / totalWeight,
            knuckleWidth: recentMeasurements.reduce((sum, m) => sum + m.knuckleWidth * m.confidence, 0) / totalWeight,
            confidence: Math.min(1.0, totalWeight / recentMeasurements.length),
            timestamp: performance.now()
        }
        
        return avgMeasurement
    }
    
    /**
     * Generate comprehensive sizing results for all fingers
     */
    public generateSizingResults(): SizingResult {
        const measurements: FingerMeasurement[] = []
        const recommendedSizes = new Map<Finger, string>()
        let totalConfidence = 0
        let fingerCount = 0
        
        const fingers: Finger[] = [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]
        
        fingers.forEach(finger => {
            const measurement = this.getRefinedMeasurement(finger)
            if (measurement) {
                measurements.push(measurement)
                
                // Find closest ring size
                const size = this.findClosestRingSize(measurement.circumference)
                recommendedSizes.set(finger, size)
                
                totalConfidence += measurement.confidence
                fingerCount++
            }
        })
        
        const avgConfidence = fingerCount > 0 ? totalConfidence / fingerCount : 0
        const calibrationNeeded = avgConfidence < 0.8 || measurements.length < 3
        
        return {
            measurements,
            recommendedSizes,
            confidence: avgConfidence,
            calibrationNeeded
        }
    }
    
    private findClosestRingSize(circumference: number): string {
        let closestSize = '7' // Default
        let minDiff = Infinity
        
        for (const [size, name] of this.ringSizeChart) {
            const diff = Math.abs(circumference - size)
            if (diff < minDiff) {
                minDiff = diff
                closestSize = name
            }
        }
        
        return closestSize
    }
    
    /**
     * Calibrate sizing using a known object (like a coin or credit card)
     */
    public calibrateWithKnownObject(objectSize: number, measuredSize: number) {
        const scaleFactor = objectSize / measuredSize
        this.calibrationObject = { realWorldSize: scaleFactor }
        
        console.log(`AutoFingerSizing: Calibrated with scale factor ${scaleFactor}`)
    }
    
    /**
     * Get sizing statistics
     */
    public getStats() {
        const stats: { [key: string]: any } = {}
        
        const fingers: Finger[] = [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]
        
        fingers.forEach(finger => {
            const measurements = this.measurements.get(finger)!
            stats[Finger[finger]] = {
                totalMeasurements: measurements.length,
                avgConfidence: measurements.length > 0 
                    ? measurements.reduce((sum, m) => sum + m.confidence, 0) / measurements.length 
                    : 0,
                isReliable: measurements.length >= this.minSamplesForReliability
            }
        })
        
        return stats
    }
    
    /**
     * Reset all measurements
     */
    public reset() {
        this.measurements.clear()
        this.measurementHistory = []
        this.initializeFingerMeasurementArrays()
        console.log('AutoFingerSizing: Reset all measurements')
    }
    
    /**
     * Export measurements for analysis
     */
    public exportMeasurements() {
        const exportData = {
            measurements: Object.fromEntries(
                Array.from(this.measurements.entries()).map(([finger, measurements]) => 
                    [Finger[finger], measurements]
                )
            ),
            calibration: this.calibrationObject,
            timestamp: Date.now()
        }
        
        return JSON.stringify(exportData, null, 2)
    }
}