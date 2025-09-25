/* Standalone Class: Solver */

class Solver {
    constructor() {
        this.equations = []
    }
    solve(o, c) {
        return 0
    }
    addEquation(o) {
        !o.enabled || o.bi.isTrigger || o.bj.isTrigger || this.equations.push(o)
    }
    removeEquation(o) {
        const c = this.equations
          , h = c.indexOf(o);
        h !== -1 && c.splice(h, 1)
    }
    removeAllEquations() {
        this.equations.length = 0
    }
}

export default Solver;
