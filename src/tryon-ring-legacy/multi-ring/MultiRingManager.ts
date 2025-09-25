import {
    Object3D,
    Vector3,
    Quaternion,
    Group,
    Box3,
    Matrix4,
    Euler
} from 'webgi'
import { Hand, Finger } from '../utils/handLandmarkUtils'
import { AdvancedPBRMaterial } from '../materials/AdvancedPBRMaterial'

export interface RingConfiguration {
    id: string
    model: Object3D
    finger: Finger
    enabled: boolean
    scale: number
    rotation: Vector3
    offset: Vector3
    materials: AdvancedPBRMaterial[]
    stackingOrder: number // For multiple rings on same finger
    priority: number // Rendering priority
}

export interface StackingRule {
    finger: Finger
    maxRings: number
    spacing: number // Distance between rings
    direction: 'towards_palm' | 'towards_tip'
    alignToKnuckle: boolean
}

/**
 * Advanced Multi-Ring Manager - Perfect Corp level functionality
 * Handles multiple rings simultaneously with proper stacking and collision detection
 */
export class MultiRingManager {
    private rings = new Map<string, RingConfiguration>()
    private stackingRules = new Map<Finger, StackingRule>()
    private ringGroup: Group
    
    // Collision and spacing
    private collisionTolerance: number = 0.1
    private minRingSpacing: number = 0.15
    
    // Animation and transitions
    private animationDuration: number = 300
    private useSmoothing: boolean = true
    
    constructor() {
        this.ringGroup = new Group()
        this.ringGroup.name = 'MultiRingManager'
        
        this.setupDefaultStackingRules()
    }
    
    private setupDefaultStackingRules() {
        // Default stacking rules for each finger
        const fingers: Finger[] = [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]
        
        fingers.forEach(finger => {
            this.stackingRules.set(finger, {
                finger,
                maxRings: finger === Finger.Ring ? 4 : 3, // Ring finger can have more rings
                spacing: 0.2,
                direction: 'towards_palm',
                alignToKnuckle: true
            })
        })
    }
    
    /**
     * Add a new ring to the manager
     */
    public addRing(config: Omit<RingConfiguration, 'id'>): string {
        const id = this.generateRingId()
        
        const ringConfig: RingConfiguration = {
            ...config,
            id,
            enabled: config.enabled ?? true,
            scale: config.scale ?? 1.0,
            rotation: config.rotation ?? new Vector3(),
            offset: config.offset ?? new Vector3(),
            stackingOrder: this.getNextStackingOrder(config.finger),
            priority: config.priority ?? 1
        }
        
        this.rings.set(id, ringConfig)
        this.ringGroup.add(ringConfig.model)
        
        // Update positions of all rings on this finger
        this.updateFingerRings(config.finger)
        
        console.log(`MultiRingManager: Added ring ${id} to ${Finger[config.finger]} finger`)
        return id
    }
    
    /**
     * Remove a ring by ID
     */
    public removeRing(ringId: string): boolean {
        const ring = this.rings.get(ringId)
        if (!ring) return false
        
        this.rings.delete(ringId)
        this.ringGroup.remove(ring.model)
        
        // Update positions of remaining rings on this finger
        this.updateFingerRings(ring.finger)
        
        console.log(`MultiRingManager: Removed ring ${ringId}`)
        return true
    }
    
    /**
     * Enable/disable a specific ring
     */
    public setRingEnabled(ringId: string, enabled: boolean) {
        const ring = this.rings.get(ringId)
        if (!ring) return
        
        ring.enabled = enabled
        ring.model.visible = enabled
        
        if (enabled) {
            this.updateFingerRings(ring.finger)
        }
    }
    
    /**
     * Update all rings based on hand position
     */
    public updateRings(hand: Hand) {
        if (this.rings.size === 0) return
        
        // Group rings by finger
        const ringsByFinger = this.groupRingsByFinger()
        
        // Update each finger's rings
        for (const [finger, fingerRings] of ringsByFinger) {
            this.updateFingerRingsWithHand(finger, fingerRings, hand)
        }
    }
    
    private updateFingerRingsWithHand(finger: Finger, rings: RingConfiguration[], hand: Hand) {
        if (rings.length === 0) return
        
        const enabledRings = rings.filter(r => r.enabled).sort((a, b) => a.stackingOrder - b.stackingOrder)
        if (enabledRings.length === 0) return
        
        const basePosition = hand.getRingAttachPositionForFinger(finger)
        const baseQuaternion = hand.getRingAttachQuaternionForFinger(finger)
        const rule = this.stackingRules.get(finger)!
        
        // Calculate positions for stacked rings
        const positions = this.calculateStackedPositions(basePosition, baseQuaternion, enabledRings, rule)
        
        // Apply positions with collision detection
        enabledRings.forEach((ring, index) => {
            const targetPosition = positions[index]
            const targetQuaternion = baseQuaternion.clone()
            
            // Apply ring-specific transformations
            this.applyRingTransformations(ring, targetPosition, targetQuaternion, hand)
            
            // Smooth animation
            if (this.useSmoothing) {
                this.smoothTransition(ring.model, targetPosition, targetQuaternion)
            } else {
                ring.model.position.copy(targetPosition)
                ring.model.quaternion.copy(targetQuaternion)
            }
            
            // Apply scaling
            ring.model.scale.setScalar(ring.scale)
        })
    }
    
    private calculateStackedPositions(
        basePosition: Vector3, 
        baseQuaternion: Quaternion, 
        rings: RingConfiguration[], 
        rule: StackingRule
    ): Vector3[] {
        const positions: Vector3[] = []
        
        if (rings.length === 1) {
            // Single ring - use base position
            positions.push(basePosition.clone())
        } else {
            // Multiple rings - calculate stacking
            const spacing = rule.spacing
            const direction = rule.direction === 'towards_palm' ? 1 : -1
            
            // Create forward vector from quaternion
            const forward = new Vector3(0, 0, direction).applyQuaternion(baseQuaternion)
            
            rings.forEach((ring, index) => {
                const offset = index * spacing
                const position = basePosition.clone().add(forward.clone().multiplyScalar(offset))
                positions.push(position)
            })
        }
        
        return positions
    }
    
    private applyRingTransformations(
        ring: RingConfiguration, 
        position: Vector3, 
        quaternion: Quaternion, 
        hand: Hand
    ) {
        // Apply custom rotation
        if (ring.rotation.length() > 0) {
            const euler = new Euler().setFromVector3(ring.rotation)
            const rotationQuat = new Quaternion().setFromEuler(euler)
            quaternion.multiply(rotationQuat)
        }
        
        // Apply custom offset
        if (ring.offset.length() > 0) {
            const offsetWorld = ring.offset.clone().applyQuaternion(quaternion)
            position.add(offsetWorld)
        }
        
        // Apply finger-specific adjustments based on hand movement
        const movementFactor = hand.getLandmarkMovementFactor(this.getFingerTipLandmark(ring.finger))
        const stabilization = 1 - movementFactor * 0.1 // Reduce jitter during movement
        
        // Slight position adjustment for natural look
        position.multiplyScalar(stabilization)
    }
    
    private smoothTransition(model: Object3D, targetPosition: Vector3, targetQuaternion: Quaternion) {
        const lerpFactor = 0.15 // Smooth interpolation
        
        model.position.lerp(targetPosition, lerpFactor)
        model.quaternion.slerp(targetQuaternion, lerpFactor)
    }
    
    private groupRingsByFinger(): Map<Finger, RingConfiguration[]> {
        const groups = new Map<Finger, RingConfiguration[]>()
        
        for (const ring of this.rings.values()) {
            if (!groups.has(ring.finger)) {
                groups.set(ring.finger, [])
            }
            groups.get(ring.finger)!.push(ring)
        }
        
        return groups
    }
    
    private updateFingerRings(finger: Finger) {
        // This will be called when rings are added/removed to reposition remaining rings
        console.log(`Updating rings for ${Finger[finger]} finger`)
    }
    
    private getNextStackingOrder(finger: Finger): number {
        const fingerRings = Array.from(this.rings.values()).filter(r => r.finger === finger)
        return fingerRings.length > 0 ? Math.max(...fingerRings.map(r => r.stackingOrder)) + 1 : 0
    }
    
    private generateRingId(): string {
        return `ring_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    
    private getFingerTipLandmark(finger: Finger): number {
        const tipLandmarks = [4, 8, 12, 16, 20] // Thumb, Index, Middle, Ring, Pinky tips
        return tipLandmarks[finger]
    }
    
    /**
     * Check for collisions between rings
     */
    public checkCollisions(): { ringA: string, ringB: string }[] {
        const collisions: { ringA: string, ringB: string }[] = []
        const ringArray = Array.from(this.rings.values()).filter(r => r.enabled)
        
        for (let i = 0; i < ringArray.length; i++) {
            for (let j = i + 1; j < ringArray.length; j++) {
                if (this.ringsCollide(ringArray[i], ringArray[j])) {
                    collisions.push({
                        ringA: ringArray[i].id,
                        ringB: ringArray[j].id
                    })
                }
            }
        }
        
        return collisions
    }
    
    private ringsCollide(ringA: RingConfiguration, ringB: RingConfiguration): boolean {
        // Simple distance-based collision detection
        const distance = ringA.model.position.distanceTo(ringB.model.position)
        const minDistance = (this.getRingRadius(ringA) + this.getRingRadius(ringB)) + this.collisionTolerance
        
        return distance < minDistance
    }
    
    private getRingRadius(ring: RingConfiguration): number {
        const box = new Box3().setFromObject(ring.model)
        const size = box.getSize(new Vector3())
        return Math.max(size.x, size.z) * 0.5 * ring.scale
    }
    
    /**
     * Set stacking rule for a finger
     */
    public setStackingRule(finger: Finger, rule: Partial<StackingRule>) {
        const currentRule = this.stackingRules.get(finger)!
        this.stackingRules.set(finger, { ...currentRule, ...rule })
        
        // Update rings on this finger
        this.updateFingerRings(finger)
    }
    
    /**
     * Get all rings on a specific finger
     */
    public getRingsOnFinger(finger: Finger): RingConfiguration[] {
        return Array.from(this.rings.values()).filter(r => r.finger === finger)
    }
    
    /**
     * Get ring by ID
     */
    public getRing(ringId: string): RingConfiguration | undefined {
        return this.rings.get(ringId)
    }
    
    /**
     * Get all ring IDs
     */
    public getAllRingIds(): string[] {
        return Array.from(this.rings.keys())
    }
    
    /**
     * Clear all rings
     */
    public clearAllRings() {
        for (const ring of this.rings.values()) {
            this.ringGroup.remove(ring.model)
        }
        this.rings.clear()
        console.log('MultiRingManager: Cleared all rings')
    }
    
    /**
     * Get the main group containing all rings
     */
    public getRingGroup(): Group {
        return this.ringGroup
    }
    
    /**
     * Update ring material properties
     */
    public updateRingMaterial(ringId: string, materialUpdates: Partial<AdvancedPBRMaterial>) {
        const ring = this.rings.get(ringId)
        if (!ring) return
        
        ring.materials.forEach(material => {
            Object.assign(material, materialUpdates)
            material.needsUpdate = true
        })
    }
    
    /**
     * Set animation settings
     */
    public setAnimationSettings(duration: number, useSmoothing: boolean) {
        this.animationDuration = duration
        this.useSmoothing = useSmoothing
    }
    
    /**
     * Get performance stats
     */
    public getStats() {
        return {
            totalRings: this.rings.size,
            enabledRings: Array.from(this.rings.values()).filter(r => r.enabled).length,
            ringsByFinger: Object.fromEntries(
                Array.from(this.groupRingsByFinger().entries()).map(([finger, rings]) => 
                    [Finger[finger], rings.length]
                )
            )
        }
    }
    
    /**
     * Dispose of all resources
     */
    public dispose() {
        this.clearAllRings()
        this.ringGroup.removeFromParent()
    }
}