/* Standalone Class: Logger */

class Logger {
    constructor(o) {
        this.verbosity = void 0,
        this.verbosity = o
    }
    debug(o) {
        this.verbosity <= Logger.Verbosity.DEBUG && console.debug(o)
    }
    info(o) {
        this.verbosity <= Logger.Verbosity.INFO && console.info(o)
    }
    warn(o) {
        this.verbosity <= Logger.Verbosity.WARN && console.warn(o)
    }
    error(o) {
        this.verbosity <= Logger.Verbosity.ERROR && console.error(o)
    }
}

export default Logger;
