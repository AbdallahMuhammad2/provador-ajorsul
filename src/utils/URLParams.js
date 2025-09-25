/**
 * URL Parameters Utility
 */

export class URLParams {
    constructor() {
        this.params = new URLSearchParams(window.location.search);
    }

    get(key) {
        return this.params.get(key);
    }

    set(key, value) {
        this.params.set(key, value);
        // Update URL without refresh
        const newURL = `${window.location.pathname}?${this.params.toString()}`;
        window.history.replaceState({}, '', newURL);
    }
}
