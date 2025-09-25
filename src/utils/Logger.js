/**
 * Logger Utility
 */

export class Logger {
    static info(message, ...args) {
        console.log(`ℹ️ ${message}`, ...args);
    }

    static error(message, ...args) {
        console.error(`❌ ${message}`, ...args);
    }

    static warn(message, ...args) {
        console.warn(`⚠️ ${message}`, ...args);
    }

    static debug(message, ...args) {
        if (new URLSearchParams(window.location.search).get('debug')) {
            console.log(`🐛 ${message}`, ...args);
        }
    }
}
