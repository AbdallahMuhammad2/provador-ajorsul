import { AViewerPlugin, ViewerApp } from "webgi";
import { RingTryonPlugin } from "../RingTryonPlugin";

/**
 * A sample for how to bind UI to the RingTryonPlugin
 * The class registers to events from the RingTryonPlugin and updates the UI accordingly.
 * It is not required to use this class, you can implement your own UI.
 */

/**
 * Events fired by the RingTryonPlugin during the ring try-on process:
 * - start: Fired when the plugin starts loading required models and resources
 * - stop: Fired when the plugin is stopped
 * - error: Fired when an error occurs
 * - initializationProgress: Fired during initialization with progress updates (0-1)
 * - initialized: Fired when the plugin is fully initialized
 */
type RingTryonEvents =
    | 'start'
    | 'stop'
    | 'error'
    | 'initializationProgress'
    | 'initialized'

export class RingTryonUIPlugin extends AViewerPlugin<never> {
    static readonly PluginType = 'RingTryonUIPlugin'
    dependencies = [RingTryonPlugin]
    enabled = true

    // UI Elements
    private elements = {
        container: document.createElement('div'),  // Main container for all UI elements
        text: document.createElement('div'),      // Main message text
        subText: document.createElement('div'),   // Secondary/subtitle text
        progressBar: document.createElement('div'), // Progress indicator
        style: document.createElement('style')    // CSS styles
    };

    private ringTryonPlugin?: RingTryonPlugin;
    private boundEventHandlers: Map<RingTryonEvents, (e: any) => void>;

    // User-facing messages for different states
    private messages = {
        initialization: 'Loading...',
        initializationSubText: 'Loading models... This will take a few seconds.',
        error: {
            noCameraSupport: 'Your browser does not support webcam access. Please try again with a different browser.',
            permissionDenied: 'You have denied access to your webcam. Please allow access and try again.',
            startupFailed: 'There was an error starting the try-on. Please try again.',
            mediaDevicesError: 'There was an error getting your media devices. Please try again.',
            runtimeError: 'The try-on encountered an error during runtime. Please try again.',
            unknown: 'There was an error with the try-on. Please try again.'
        }
    };

    constructor() {
        super();
        this.boundEventHandlers = new Map();
    }

    async onAdded(viewer: ViewerApp): Promise<void> {
        await super.onAdded(viewer);
        this.ringTryonPlugin = viewer.getPlugin(RingTryonPlugin) || (() => { throw new Error('RingTryonPlugin not found') })();

        this.setupEventListeners();
    }

    async onRemove(viewer: ViewerApp): Promise<void> {
        this.cleanup();
        return super.onRemove(viewer);
    }

    /**
     * Creates and initializes all UI elements
     * Sets up the DOM structure and basic properties
     */
    private initializeElements() {
        const { container, text, subText, progressBar } = this.elements;

        // Setup element properties
        container.id = 'ringTryonUIPlugin';
        container.style.display = 'none';
        text.id = 'ringTryonUIPluginText';
        subText.id = 'ringTryonUIPluginSubText';
        progressBar.id = 'ringTryonUIPluginProgressBar';

        // Assemble elements
        container.append(text, subText, progressBar);
        this._viewer?.canvas.parentNode?.appendChild(this.elements.style);
        this._viewer?.canvas.parentNode?.insertBefore(container, this._viewer.canvas.nextSibling);
    }

    /**
     * Sets up the CSS styles for the UI elements
     * Includes responsive design and animations
     */
    private setupStyles() {
        this.elements.style.textContent = /* css */`
            #ringTryonUIPlugin {
                position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                padding: 4rem; border-radius: 0.5rem; z-index: 1000; width: calc(min(80vw, 600px));
                font-size: calc(min(2rem, 24px)); text-align: center;
                backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.1);
                color: white; text-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
                border: 1px solid rgba(255, 255, 255, 0.5);
            }
            #ringTryonUIPluginText { margin-bottom: 1rem; font-weight: 600; }
            #ringTryonUIPluginSubText { font-size: 1rem; color: #eee; }
            #ringTryonUIPluginProgressBar {
                width: 100%; height: 1rem; background: #333333;
                border-radius: 0.5rem; margin-top: 2rem;
                box-shadow: 0 0 12px rgba(255, 255, 255, 0.25);
                animation: pulse 2s infinite ease-in-out;
            }
            @keyframes pulse {
                0%, 100% { box-shadow: 0 0 12px rgba(255, 255, 255, 0.25); }
                50% { box-shadow: 0 0 12px rgba(255, 255, 255, 0.75); }
            }
            @media only screen and (max-width: 768px) {
                #ringTryonUIPlugin { width: 95vw; padding: 2rem; font-size: 1.5rem; }
                #ringTryonUIPluginSubText { font-size: 14px; }
            }
        `;
    }

    /**
     * Sets up event listeners for all RingTryonPlugin events
     * Each event handler updates the UI accordingly
     */
    private setupEventListeners() {
        const { container, text, subText, progressBar } = this.elements;

        // Event handlers for each RingTryonPlugin event
        const disposeUI = () => {
            const { container, style } = this.elements;
            container.remove();
            style.remove();
            progressBar.style.background = 'linear-gradient(to right, white 0%, #333333 0%)';
            container.classList.remove('fade-out');
        };

        // Event handlers for each RingTryonPlugin event
        const handlers: Record<RingTryonEvents, (e: any) => void> = {
            // Fired when plugin starts loading required models and resources
            start: () => {
                this.initializeElements();
                this.setupStyles();
                container.style.display = 'block';
                text.textContent = this.messages.initialization;
                subText.textContent = this.messages.initializationSubText;
            },

            // Fired during initialization with progress updates (0-1)
            initializationProgress: (e: any) => progressBar.style.background = `linear-gradient(to right, white ${e.detail.progress * 100}%, #333333 0%)`,

            // Fired when plugin is ready to analyze the user's hand
            initialized: () => {
                // Remove the box and show the top bar
                container.style.display = 'none';
            },

            // Fired when the plugin is stopped
            stop: () => disposeUI(),

            // Fired when an error occurs
            error: (e: any) => {
                const reason = e.detail.reason;
                const errorMessage = this.messages.error[reason as keyof typeof this.messages.error] ?? this.messages.error.unknown;
                alert(errorMessage);
                disposeUI();
            },
        };

        // Register event listeners and store bound handlers for cleanup
        Object.entries(handlers).forEach(([event, handler]) => {
            const boundHandler = handler.bind(this);
            this.boundEventHandlers.set(event as RingTryonEvents, boundHandler);
            this.ringTryonPlugin?.addEventListener(event as RingTryonEvents, boundHandler);
        });
    }

    /**
     * Cleanup method to remove all event listeners and DOM elements
     */
    private cleanup() {
        const { container, style } = this.elements;
        container.remove();
        style.remove();

        // Remove all event listeners using stored bound handlers
        this.boundEventHandlers.forEach((handler, event) => {
            this.ringTryonPlugin?.removeEventListener(event as RingTryonEvents, handler);
        });
        this.boundEventHandlers.clear();
    }
} 