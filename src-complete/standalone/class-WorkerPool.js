/* Standalone Class: WorkerPool */

class WorkerPool {
    constructor(o=4) {
        this.pool = o,
        this.queue = [],
        this.workers = [],
        this.workersResolve = [],
        this.workerStatus = 0
    }
    _initWorker(o) {
        if (!this.workers[o]) {
            const c = this.workerCreator();
            c.addEventListener("message", this._onMessage.bind(this, o)),
            this.workers[o] = c
        }
    }
    _getIdleWorker() {
        for (let o = 0; o < this.pool; o++)
            if (!(this.workerStatus & 1 << o))
                return o;
        return -1
    }
    _onMessage(o, c) {
        const h = this.workersResolve[o];
        if (h && h(c),
        this.queue.length) {
            const {resolve: _, msg: b, transfer: _e} = this.queue.shift();
            this.workersResolve[o] = _,
            this.workers[o].postMessage(b, _e)
        } else
            this.workerStatus ^= 1 << o
    }
    setWorkerCreator(o) {
        this.workerCreator = o
    }
    setWorkerLimit(o) {
        this.pool = o
    }
    postMessage(o, c) {
        return new Promise(h => {
            const _ = this._getIdleWorker();
            _ !== -1 ? (this._initWorker(_),
            this.workerStatus |= 1 << _,
            this.workersResolve[_] = h,
            this.workers[_].postMessage(o, c)) : this.queue.push({
                resolve: h,
                msg: o,
                transfer: c
            })
        }
        )
    }
    dispose() {
        this.workers.forEach(o => o.terminate()),
        this.workersResolve.length = 0,
        this.workers.length = 0,
        this.queue.length = 0,
        this.workerStatus = 0
    }
}

export default WorkerPool;
