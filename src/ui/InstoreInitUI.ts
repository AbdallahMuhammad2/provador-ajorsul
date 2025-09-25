// InstoreInitUi.ts

export class InstoreInitUI {
    private container!: HTMLDivElement;
    private statusText!: HTMLDivElement;
    private progressBar!: HTMLDivElement;
    private progressTextContainer!: HTMLDivElement;

    constructor() {
        this.createUI();
    }

    show() {
        this.container.style.display = 'block';
        this.container.style.opacity = '0';
        // Trigger reflow
        this.container.offsetHeight;
        this.container.style.opacity = '1';
    }

    dispose(fadeOut = true) {
        if (!fadeOut) {
            if (this.container.parentNode) document.body.removeChild(this.container);
            return;
        }

        this.container.style.opacity = '0';
        setTimeout(() => {
            if (this.container.parentNode) document.body.removeChild(this.container);
        }, 300);
    }

    private createUI() {
        // Create container
        this.container = document.createElement('div');
        this.container.style.position = 'fixed';
        this.container.style.top = '50%';
        this.container.style.left = '50%';
        this.container.style.transform = 'translate(-50%, -50%)';
        this.container.style.width = '400px';
        this.container.style.padding = '40px';
        this.container.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
        this.container.style.backdropFilter = 'blur(8px)';
        this.container.style.color = 'white';
        this.container.style.borderRadius = '16px';
        this.container.style.zIndex = '1000';
        this.container.style.display = 'none';
        this.container.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        this.container.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        this.container.style.transition = 'opacity 0.15s ease-in-out';
        document.body.appendChild(this.container);

        // Create status text
        this.statusText = document.createElement('div');
        this.statusText.innerText = 'Initializing...';
        this.statusText.style.fontSize = '24px';
        this.statusText.style.fontWeight = '600';
        this.statusText.style.marginBottom = '24px';
        this.statusText.style.textAlign = 'center';
        this.statusText.style.fontFamily = 'system-ui, -apple-system, sans-serif';
        this.container.appendChild(this.statusText);

        // Create progress bar container
        const progressBarContainer = document.createElement('div');
        progressBarContainer.style.width = '100%';
        progressBarContainer.style.height = '6px';
        progressBarContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        progressBarContainer.style.borderRadius = '3px';
        progressBarContainer.style.overflow = 'hidden';
        progressBarContainer.style.marginBottom = '24px';
        this.container.appendChild(progressBarContainer);

        // Create progress bar
        this.progressBar = document.createElement('div');
        this.progressBar.style.width = '0%';
        this.progressBar.style.height = '100%';
        this.progressBar.style.backgroundColor = '#3B82F6';
        this.progressBar.style.borderRadius = '3px';
        this.progressBar.style.transition = 'width 0.3s ease';
        progressBarContainer.appendChild(this.progressBar);

        // Create progress text container
        this.progressTextContainer = document.createElement('div');
        this.progressTextContainer.style.fontSize = '14px';
        this.progressTextContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';
        this.container.appendChild(this.progressTextContainer);
    }

    public showError(error: string) {
        this.statusText.style.color = '#EF4444';
        console.error(error);
        console.trace(error);
        this.setStatusText(error);
    }

    public setStatusText(status: string) {
        this.statusText.innerText = status;
    }

    public updateStatus(status: string, progress: number, isError: boolean = false) {
        this.setStatusText(status);
        this.progressBar.style.width = `${progress}%`;

        // Create progress update text with checkbox or error icon
        const progressUpdate = document.createElement('div');
        progressUpdate.style.display = 'flex';
        progressUpdate.style.alignItems = 'center';
        progressUpdate.style.marginTop = '12px';
        progressUpdate.style.padding = '8px';
        progressUpdate.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        progressUpdate.style.borderRadius = '8px';

        const icon = document.createElement('div');
        icon.style.width = '20px';
        icon.style.height = '20px';
        icon.style.borderRadius = '4px';
        icon.style.marginRight = '12px';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.fontSize = '12px';
        icon.style.fontWeight = '600';
        icon.style.color = 'white';

        if (isError) {
            icon.style.backgroundColor = '#EF4444';
            icon.textContent = '×';
        } else {
            icon.style.backgroundColor = '#10B981';
            icon.textContent = '✓';
        }

        const progressText = document.createElement('span');
        progressText.innerText = status;
        progressText.style.color = isError ? '#EF4444' : '#9CA3AF';
        progressText.style.fontSize = '14px';

        progressUpdate.appendChild(icon);
        progressUpdate.appendChild(progressText);
        this.progressTextContainer.appendChild(progressUpdate);
    }
}