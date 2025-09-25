import {
    Object3D,
    Group,
    Vector3,
    Quaternion,
    Scene,
    Camera,
    WebGLRenderer,
    Vector2,
    Color,
    Mesh,
    PlaneGeometry,
    MeshBasicMaterial,
    Texture,
    CanvasTexture
} from 'webgi'
import { Hand } from '../hand/MPHand'
import { MultiRingManager, RingConfiguration } from '../multi-ring/MultiRingManager'
import { AdvancedPBRMaterial } from '../materials/AdvancedPBRMaterial'

export interface ComparisonItem {
    id: string
    name: string
    model: Object3D
    materials: AdvancedPBRMaterial[]
    thumbnail?: Texture
    metadata: {
        price?: number
        material?: string
        style?: string
        size?: string
        brand?: string
    }
}

export interface ComparisonLayout {
    type: 'side-by-side' | 'grid' | 'carousel' | 'split-screen'
    maxItems: number
    showLabels: boolean
    showMetadata: boolean
    enableInteraction: boolean
}

export interface ComparisonState {
    activeItems: ComparisonItem[]
    selectedIndex: number
    layout: ComparisonLayout
    syncMovement: boolean
    showDifferences: boolean
}

/**
 * Advanced Side-by-Side Comparison System
 * Perfect Corp level comparison functionality for multiple rings
 */
export class SideBySideComparison {
    private scene: Scene
    private camera: Camera
    private renderer: WebGLRenderer
    
    // Comparison state
    private state: ComparisonState = {
        activeItems: [],
        selectedIndex: 0,
        layout: {
            type: 'side-by-side',
            maxItems: 4,
            showLabels: true,
            showMetadata: false,
            enableInteraction: true
        },
        syncMovement: true,
        showDifferences: false
    }
    
    // Visual elements
    private comparisonGroup: Group
    private separatorLines: Mesh[] = []
    private labelPanels: Mesh[] = []
    private thumbnailPanels: Mesh[] = []
    
    // Layout management
    private viewportDivisions: { x: number, y: number, width: number, height: number }[] = []
    private currentViewport: Vector2
    
    // Interaction
    private isInteracting: boolean = false
    private lastInteractionTime: number = 0
    
    // Event callbacks
    private onItemSelect?: (item: ComparisonItem, index: number) => void
    private onLayoutChange?: (layout: ComparisonLayout) => void
    private onComparisonUpdate?: (state: ComparisonState) => void
    
    constructor(scene: Scene, camera: Camera, renderer: WebGLRenderer) {
        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.currentViewport = renderer.getSize(new Vector2())
        
        this.comparisonGroup = new Group()
        this.comparisonGroup.name = 'SideBySideComparison'
        this.scene.add(this.comparisonGroup)
        
        this.setupEventListeners()
    }
    
    private setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.currentViewport = this.renderer.getSize(new Vector2())
            this.updateLayout()
        })
    }
    
    /**
     * Add item to comparison
     */
    public addItem(item: ComparisonItem): boolean {
        if (this.state.activeItems.length >= this.state.layout.maxItems) {
            console.warn('Maximum comparison items reached')
            return false
        }
        
        // Clone model to avoid conflicts
        const clonedModel = item.model.clone()
        const clonedItem: ComparisonItem = {
            ...item,
            model: clonedModel
        }
        
        this.state.activeItems.push(clonedItem)
        this.comparisonGroup.add(clonedModel)
        
        // Generate thumbnail if not provided
        if (!item.thumbnail) {
            this.generateThumbnail(clonedItem)
        }
        
        this.updateLayout()
        this.onComparisonUpdate?.(this.state)
        
        console.log(`Added item ${item.name} to comparison`)
        return true
    }
    
    /**
     * Remove item from comparison
     */
    public removeItem(itemId: string): boolean {
        const index = this.state.activeItems.findIndex(item => item.id === itemId)
        if (index === -1) return false
        
        const item = this.state.activeItems[index]
        this.comparisonGroup.remove(item.model)
        this.state.activeItems.splice(index, 1)
        
        // Adjust selected index
        if (this.state.selectedIndex >= this.state.activeItems.length) {
            this.state.selectedIndex = Math.max(0, this.state.activeItems.length - 1)
        }
        
        this.updateLayout()
        this.onComparisonUpdate?.(this.state)
        
        console.log(`Removed item ${itemId} from comparison`)
        return true
    }
    
    /**
     * Update comparison with hand tracking
     */
    public updateComparison(hand: Hand) {
        if (this.state.activeItems.length === 0) return
        
        const now = performance.now()
        this.lastInteractionTime = now
        
        // Update each item based on hand
        this.state.activeItems.forEach((item, index) => {
            this.updateItemPosition(item, hand, index)
        })
        
        // Update visual elements
        this.updateVisualElements()
    }
    
    private updateItemPosition(item: ComparisonItem, hand: Hand, index: number) {
        // Get viewport division for this item
        const division = this.viewportDivisions[index]
        if (!division) return
        
        // Calculate position offset based on layout
        const offsetX = this.calculateXOffset(index, division)
        const basePosition = hand.getRingAttachPositionForFinger(0) // Default to ring finger
        const baseQuaternion = hand.getRingAttachQuaternionForFinger(0)
        
        // Apply position with offset
        const position = basePosition.clone()
        position.x += offsetX
        
        item.model.position.copy(position)
        item.model.quaternion.copy(baseQuaternion)
        
        // Sync movement if enabled
        if (!this.state.syncMovement) {
            this.applyIndependentMovement(item, index)
        }
    }
    
    private calculateXOffset(index: number, division: { x: number, width: number }): number {
        const totalItems = this.state.activeItems.length
        
        switch (this.state.layout.type) {
            case 'side-by-side':
                const spacing = 0.3 // Distance between rings
                return (index - (totalItems - 1) / 2) * spacing
                
            case 'grid':
                const cols = Math.ceil(Math.sqrt(totalItems))
                const col = index % cols
                const gridSpacing = 0.25
                return (col - (cols - 1) / 2) * gridSpacing
                
            case 'carousel':
                const angle = (index / totalItems) * Math.PI * 2
                return Math.sin(angle) * 0.4
                
            case 'split-screen':
                return index === 0 ? -0.2 : 0.2
                
            default:
                return 0
        }
    }
    
    private applyIndependentMovement(item: ComparisonItem, index: number) {
        // Apply subtle individual movement for visual variety
        const time = performance.now() / 1000
        const phaseOffset = index * 0.5
        
        const bobAmount = 0.002
        const yOffset = Math.sin(time * 2 + phaseOffset) * bobAmount
        
        item.model.position.y += yOffset
    }
    
    private updateLayout() {
        this.calculateViewportDivisions()
        this.updateSeparators()
        this.updateLabels()
        this.updateThumbnails()
    }
    
    private calculateViewportDivisions() {
        this.viewportDivisions = []
        const itemCount = this.state.activeItems.length
        if (itemCount === 0) return
        
        switch (this.state.layout.type) {
            case 'side-by-side':
                const itemWidth = 1.0 / itemCount
                for (let i = 0; i < itemCount; i++) {
                    this.viewportDivisions.push({
                        x: i * itemWidth,
                        y: 0,
                        width: itemWidth,
                        height: 1.0
                    })
                }
                break
                
            case 'grid':
                const cols = Math.ceil(Math.sqrt(itemCount))
                const rows = Math.ceil(itemCount / cols)
                const cellWidth = 1.0 / cols
                const cellHeight = 1.0 / rows
                
                for (let i = 0; i < itemCount; i++) {
                    const col = i % cols
                    const row = Math.floor(i / cols)
                    
                    this.viewportDivisions.push({
                        x: col * cellWidth,
                        y: row * cellHeight,
                        width: cellWidth,
                        height: cellHeight
                    })
                }
                break
                
            case 'split-screen':
                for (let i = 0; i < Math.min(itemCount, 2); i++) {
                    this.viewportDivisions.push({
                        x: i * 0.5,
                        y: 0,
                        width: 0.5,
                        height: 1.0
                    })
                }
                break
                
            case 'carousel':
                // Carousel uses full viewport for each item (with rotation)
                for (let i = 0; i < itemCount; i++) {
                    this.viewportDivisions.push({
                        x: 0,
                        y: 0,
                        width: 1.0,
                        height: 1.0
                    })
                }
                break
        }
    }
    
    private updateSeparators() {
        // Clear existing separators
        this.separatorLines.forEach(line => {
            this.comparisonGroup.remove(line)
            line.geometry.dispose()
            ;(line.material as any).dispose()
        })
        this.separatorLines = []
        
        if (!this.shouldShowSeparators()) return
        
        // Create new separators based on layout
        const divisions = this.viewportDivisions
        
        for (let i = 1; i < divisions.length; i++) {
            const separator = this.createSeparatorLine(divisions[i].x)
            this.separatorLines.push(separator)
            this.comparisonGroup.add(separator)
        }
    }
    
    private shouldShowSeparators(): boolean {
        return this.state.layout.type === 'side-by-side' || this.state.layout.type === 'split-screen'
    }
    
    private createSeparatorLine(x: number): Mesh {
        const geometry = new PlaneGeometry(0.002, 2)
        const material = new MeshBasicMaterial({ 
            color: 0xffffff, 
            transparent: true, 
            opacity: 0.3 
        })
        
        const separator = new Mesh(geometry, material)
        separator.position.set(x * 2 - 1, 0, -0.5) // Convert to world coordinates
        
        return separator
    }
    
    private updateLabels() {
        // Clear existing labels
        this.labelPanels.forEach(panel => {
            this.comparisonGroup.remove(panel)
            panel.geometry.dispose()
            ;(panel.material as any).dispose()
        })
        this.labelPanels = []
        
        if (!this.state.layout.showLabels) return
        
        // Create labels for each item
        this.state.activeItems.forEach((item, index) => {
            const label = this.createLabelPanel(item, index)
            this.labelPanels.push(label)
            this.comparisonGroup.add(label)
        })
    }
    
    private createLabelPanel(item: ComparisonItem, index: number): Mesh {
        const division = this.viewportDivisions[index]
        
        // Create canvas for label
        const canvas = document.createElement('canvas')
        canvas.width = 200
        canvas.height = 60
        
        const ctx = canvas.getContext('2d')!
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
        ctx.fillRect(0, 0, 200, 60)
        
        ctx.fillStyle = 'white'
        ctx.font = '14px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(item.name, 100, 25)
        
        if (item.metadata.price) {
            ctx.font = '12px Arial'
            ctx.fillText(`$${item.metadata.price}`, 100, 45)
        }
        
        const texture = new CanvasTexture(canvas)
        const geometry = new PlaneGeometry(0.4, 0.12)
        const material = new MeshBasicMaterial({ map: texture, transparent: true })
        
        const panel = new Mesh(geometry, material)
        panel.position.set(
            (division.x + division.width / 2) * 2 - 1,
            -0.8,
            -0.3
        )
        
        return panel
    }
    
    private updateThumbnails() {
        // Implementation for thumbnail updates
        // This would show small previews of each ring
    }
    
    private updateVisualElements() {
        // Update highlighting for selected item
        this.state.activeItems.forEach((item, index) => {
            const isSelected = index === this.state.selectedIndex
            
            // Apply selection highlighting
            item.model.traverse(child => {
                if (child instanceof Mesh && child.material instanceof AdvancedPBRMaterial) {
                    if (isSelected) {
                        child.material.emissiveIntensity = 0.1
                        child.material.emissive = new Color(0x4444ff)
                    } else {
                        child.material.emissiveIntensity = 0
                        child.material.emissive = new Color(0x000000)
                    }
                }
            })
        })
    }
    
    private generateThumbnail(item: ComparisonItem) {
        // Generate thumbnail by rendering the model to a small texture
        // This is a simplified version - full implementation would use offscreen rendering
        
        const canvas = document.createElement('canvas')
        canvas.width = 128
        canvas.height = 128
        
        const ctx = canvas.getContext('2d')!
        ctx.fillStyle = '#f0f0f0'
        ctx.fillRect(0, 0, 128, 128)
        ctx.fillStyle = '#666'
        ctx.fillText('Ring', 50, 70)
        
        item.thumbnail = new CanvasTexture(canvas)
    }
    
    /**
     * Select specific comparison item
     */
    public selectItem(index: number) {
        if (index >= 0 && index < this.state.activeItems.length) {
            this.state.selectedIndex = index
            this.updateVisualElements()
            
            const item = this.state.activeItems[index]
            this.onItemSelect?.(item, index)
        }
    }
    
    /**
     * Set comparison layout
     */
    public setLayout(layout: Partial<ComparisonLayout>) {
        this.state.layout = { ...this.state.layout, ...layout }
        this.updateLayout()
        this.onLayoutChange?.(this.state.layout)
    }
    
    /**
     * Toggle synchronized movement
     */
    public setSyncMovement(sync: boolean) {
        this.state.syncMovement = sync
        this.onComparisonUpdate?.(this.state)
    }
    
    /**
     * Clear all comparison items
     */
    public clearAll() {
        this.state.activeItems.forEach(item => {
            this.comparisonGroup.remove(item.model)
        })
        
        this.state.activeItems = []
        this.state.selectedIndex = 0
        this.updateLayout()
        this.onComparisonUpdate?.(this.state)
    }
    
    /**
     * Get comparison statistics
     */
    public getStats() {
        return {
            itemCount: this.state.activeItems.length,
            maxItems: this.state.layout.maxItems,
            selectedIndex: this.state.selectedIndex,
            layoutType: this.state.layout.type,
            syncMovement: this.state.syncMovement,
            lastInteraction: this.lastInteractionTime
        }
    }
    
    /**
     * Export comparison state
     */
    public exportState(): any {
        return {
            items: this.state.activeItems.map(item => ({
                id: item.id,
                name: item.name,
                metadata: item.metadata
            })),
            layout: this.state.layout,
            selectedIndex: this.state.selectedIndex
        }
    }
    
    /**
     * Set event callbacks
     */
    public setCallbacks(callbacks: {
        onItemSelect?: (item: ComparisonItem, index: number) => void
        onLayoutChange?: (layout: ComparisonLayout) => void
        onComparisonUpdate?: (state: ComparisonState) => void
    }) {
        this.onItemSelect = callbacks.onItemSelect
        this.onLayoutChange = callbacks.onLayoutChange
        this.onComparisonUpdate = callbacks.onComparisonUpdate
    }
    
    /**
     * Get current state
     */
    public getState(): ComparisonState {
        return { ...this.state }
    }
    
    /**
     * Set visibility
     */
    public setVisible(visible: boolean) {
        this.comparisonGroup.visible = visible
    }
    
    /**
     * Dispose resources
     */
    public dispose() {
        this.clearAll()
        
        // Dispose visual elements
        this.separatorLines.forEach(line => {
            line.geometry.dispose()
            ;(line.material as any).dispose()
        })
        
        this.labelPanels.forEach(panel => {
            panel.geometry.dispose()
            ;(panel.material as any).dispose()
        })
        
        this.thumbnailPanels.forEach(panel => {
            panel.geometry.dispose()
            ;(panel.material as any).dispose()
        })
        
        this.comparisonGroup.removeFromParent()
    }
}