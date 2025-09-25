import { EventDispatcher } from "webgi";
import { FingerCenterWidthCalculator } from "../center/FingerCenterWidthCalculator";
import { Config } from "../config/Config";

interface ExposureBarUIEvent {
    "start": object
}

export class ExposureBarUI extends EventDispatcher<ExposureBarUIEvent> {
    private bar: HTMLDivElement;
    private changeDebounceTimeout: ReturnType<typeof setTimeout> | null = null;
    private hintMessage: HTMLDivElement | null = null;
    private transitionMessage: HTMLDivElement | null = null;
    private transitionTimeout: ReturnType<typeof setTimeout> | null = null;

    constructor(private fingerCenterWidthCalculator: FingerCenterWidthCalculator) {
        super();
        this.bar = this.createBar();
    }

    public show() {
        this.bar.style.opacity = "0";
        document.body.appendChild(this.bar);
        // Trigger reflow
        this.bar.offsetHeight;
        this.bar.style.opacity = "1";
    }

    private showHint(message: string) {
        if (this.hintMessage) {
            this.bar.removeChild(this.hintMessage);
        }

        this.hintMessage = document.createElement("div");
        this.hintMessage.style.color = "#FCD34D";
        this.hintMessage.style.backgroundColor = "rgba(252, 211, 77, 0.1)";
        this.hintMessage.style.padding = "12px";
        this.hintMessage.style.borderRadius = "8px";
        this.hintMessage.style.marginTop = "16px";
        this.hintMessage.style.fontSize = "14px";
        this.hintMessage.style.textAlign = "center";
        this.hintMessage.style.lineHeight = "1.5";
        this.hintMessage.style.fontFamily = "system-ui, -apple-system, sans-serif";
        this.hintMessage.innerText = message;

        this.bar.appendChild(this.hintMessage);
    }

    private showTransitionMessage() {
        if (this.transitionMessage) {
            this.bar.removeChild(this.transitionMessage);
        }

        this.transitionMessage = document.createElement("div");
        this.transitionMessage.style.position = "absolute";
        this.transitionMessage.style.top = "0";
        this.transitionMessage.style.left = "0";
        this.transitionMessage.style.width = "100%";
        this.transitionMessage.style.height = "100%";
        this.transitionMessage.style.backgroundColor = "rgba(17, 24, 39, 0.95)";
        this.transitionMessage.style.display = "flex";
        this.transitionMessage.style.alignItems = "center";
        this.transitionMessage.style.justifyContent = "center";
        this.transitionMessage.style.opacity = "0";
        this.transitionMessage.style.transition = "opacity 0.15s ease-in-out";
        this.transitionMessage.style.borderRadius = "16px";
        this.transitionMessage.style.zIndex = "1";

        const message = document.createElement("div");
        message.style.color = "#fff";
        message.style.fontSize = "32px";
        message.style.fontWeight = "600";
        message.style.fontFamily = "system-ui, -apple-system, sans-serif";
        message.style.textAlign = "center";
        message.style.lineHeight = "1.2";
        message.innerHTML = "All ready ✅<br><span style='font-size: 18px; color: #9CA3AF; margin-top: 8px; display: block;'>The application is running now.</span>";

        this.transitionMessage.appendChild(message);
        this.bar.appendChild(this.transitionMessage);

        // Trigger reflow
        this.transitionMessage.offsetHeight;
        this.transitionMessage.style.opacity = "1";
    }

    private createBar(): HTMLDivElement {
        const bar = document.createElement("div");
        bar.style.position = "fixed";
        bar.style.zIndex = "1000";
        bar.style.left = "50%";
        bar.style.top = "50%";
        bar.style.transform = "translate(-50%, -50%)";
        bar.style.backgroundColor = "rgba(17, 24, 39, 0.95)";
        bar.style.padding = "40px";
        bar.style.border = "1px solid rgba(255, 255, 255, 0.1)";
        bar.style.borderRadius = "16px";
        bar.style.width = "500px";
        bar.style.textAlign = "center";
        bar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
        bar.style.backdropFilter = "blur(8px)";
        bar.style.transition = "opacity 0.15s ease-in-out";

        this.addWelcomeMessage(bar);
        this.addTitle(bar, "Camera Brightness");
        this.addExposureSlider(bar);
        this.addTitle(bar, "Focus");
        this.addFocusSlider(bar);
        this.addDoneButton(bar);

        return bar;
    }

    private addWelcomeMessage(bar: HTMLDivElement) {
        const welcome = document.createElement("div");
        welcome.innerHTML = `
            <div style="color: #fff; font-size: 24px; font-weight: 600; margin-bottom: 16px; text-align: center;">Welcome!</div>
            <div style="color: #9CA3AF; font-size: 14px; margin-bottom: 24px; line-height: 1.6; text-align: left;">
                We need to set up the scene first to ensure the best experience.<br><br>
                
                Adjust the camera settings below to get a desired look. 
                Move the sliders to control brightness and focus.<br><br>
                
                <span style="color: #fff; font-weight: 500; display: block; margin-bottom: 8px;">Ready?</span>
                Before clicking "Start Experience", please:<br>
                • Allow us to scan the background by keeping it clear<br>
                • Ensure your hands are not in the camera's view<br>
        `;
        bar.appendChild(welcome);
    }

    private addTitle(bar: HTMLDivElement, text: string) {
        const title = document.createElement("div");
        title.innerText = text;
        title.style.color = "#fff";
        title.style.marginBottom = "8px";
        title.style.textAlign = "left";
        title.style.fontSize = "16px";
        title.style.fontWeight = "500";
        title.style.fontFamily = "system-ui, -apple-system, sans-serif";
        bar.appendChild(title);
    }

    private addExposureSlider(bar: HTMLDivElement) {
        const container = document.createElement("div");
        container.style.marginBottom = "24px";

        const slider = document.createElement("input");
        slider.style.width = "100%";
        slider.style.height = "6px";
        slider.style.webkitAppearance = "none";
        slider.style.appearance = "none";
        slider.style.background = "rgba(255, 255, 255, 0.1)";
        slider.style.borderRadius = "3px";
        slider.style.outline = "none";
        slider.type = "range";
        slider.min = "-9";
        slider.max = "9";
        slider.step = "1";
        slider.value = Config.exposureCompensation.toString();

        // Custom slider thumb
        slider.style.background = `
            linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(parseInt(slider.value) + 9) * 5.55}%, rgba(255, 255, 255, 0.1) ${(parseInt(slider.value) + 9) * 5.55}%, rgba(255, 255, 255, 0.1) 100%)
        `;

        slider.oninput = () => {
            clearTimeout(this.changeDebounceTimeout!);
            this.changeDebounceTimeout = setTimeout(() => {
                const value = parseInt(slider.value);
                Config.exposureCompensationGui?.setValue(value);
                Config.saveConfig();
                Config.sendUpdatedColorCameraSettings();
                slider.style.background = `
                    linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(value + 9) * 5.55}%, rgba(255, 255, 255, 0.1) ${(value + 9) * 5.55}%, rgba(255, 255, 255, 0.1) 100%)
                `;
            }, 100);
        };

        container.appendChild(slider);
        bar.appendChild(container);
    }

    private addFocusSlider(bar: HTMLDivElement) {
        const container = document.createElement("div");
        container.style.marginBottom = "32px";

        const focusSlider = document.createElement("input");
        focusSlider.style.width = "100%";
        focusSlider.style.height = "6px";
        focusSlider.style.webkitAppearance = "none";
        focusSlider.style.appearance = "none";
        focusSlider.style.background = "rgba(255, 255, 255, 0.1)";
        focusSlider.style.borderRadius = "3px";
        focusSlider.style.outline = "none";
        focusSlider.type = "range";
        focusSlider.min = "1";
        focusSlider.max = "255";
        focusSlider.step = "1";
        focusSlider.value = Config.focus.toString();

        // Custom slider thumb
        focusSlider.style.background = `
            linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(parseInt(focusSlider.value) / 255) * 100}%, rgba(255, 255, 255, 0.1) ${(parseInt(focusSlider.value) / 255) * 100}%, rgba(255, 255, 255, 0.1) 100%)
        `;

        focusSlider.oninput = () => {
            clearTimeout(this.changeDebounceTimeout!);
            this.changeDebounceTimeout = setTimeout(() => {
                const value = parseInt(focusSlider.value);
                Config.focusGui?.setValue(value);
                Config.saveConfig();
                Config.sendUpdatedColorCameraSettings();
                focusSlider.style.background = `
                    linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(value / 255) * 100}%, rgba(255, 255, 255, 0.1) ${(value / 255) * 100}%, rgba(255, 255, 255, 0.1) 100%)
                `;
            }, 100);
        };

        container.appendChild(focusSlider);
        bar.appendChild(container);
    }

    private addDoneButton(bar: HTMLDivElement) {
        const button = document.createElement("button");
        button.style.color = "#fff";
        button.style.backgroundColor = "#3B82F6";
        button.style.width = "100%";
        button.style.height = "48px";
        button.style.border = "none";
        button.style.borderRadius = "8px";
        button.style.fontSize = "16px";
        button.style.fontWeight = "500";
        button.style.cursor = "pointer";
        button.style.transition = "background-color 0.2s";
        button.innerText = "Start Experience";

        button.onmouseover = () => {
            if (!button.disabled) {
                button.style.backgroundColor = "#2563EB";
            }
        }

        button.onmouseout = () => {
            if (!button.disabled) {
                button.style.backgroundColor = "#3B82F6";
            }
        }

        button.onclick = async () => {
            // Disable button and show loading state
            button.disabled = true;
            button.style.backgroundColor = "#6B7280";
            button.style.cursor = "not-allowed";
            button.innerText = "Calibrating...";

            const updated = await this.fingerCenterWidthCalculator.updateStaticBackgroundIfNeeded();

            if (updated) {
                this.showTransitionMessage();
                this.dispatchEvent({ type: "start" });
                console.log("Dispatching start event")
                this.transitionTimeout = setTimeout(() => {
                    this.bar.style.opacity = "0";
                    setTimeout(() => {
                        if (this.bar.parentNode) {
                            document.body.removeChild(this.bar);
                        }
                    }, 150);
                }, 800); // Show the transition message for 800ms
            } else {
                // Reset button state
                button.disabled = false;
                button.style.backgroundColor = "#3B82F6";
                button.style.cursor = "pointer";
                button.innerText = "Start Experience";

                this.showHint("Please ensure the background is clear and there are no obstructions (like hands) in the camera view. Try moving to a different position or clearing the view.");
            }
        };

        bar.appendChild(button);
    }

    dispose() {
        if (this.changeDebounceTimeout) {
            clearTimeout(this.changeDebounceTimeout);
            this.changeDebounceTimeout = null;
        }
        if (this.transitionTimeout) {
            clearTimeout(this.transitionTimeout);
            this.transitionTimeout = null;
        }
        this.bar.remove();
    }
} 