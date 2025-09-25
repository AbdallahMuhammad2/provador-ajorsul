
import { OneEuroFilter } from '1eurofilter';
import { MathUtils, Quaternion } from 'webgi';

export class QuaternionFilter {
    private filters!: Array<OneEuroFilter>
    private lastQuat: Quaternion | null = null
    private min: number = 1
    private max: number = 1

    constructor(freq: number = 60, min = 1, max = 16) {
        this.min = min
        this.max = max
        this.filters = Array(4).fill(null).map(() => new OneEuroFilter(freq, 1, 1, 1))
    }

    filter(quat: Quaternion, timeStamp: number, m: number = 0) {
        const origQuat = quat.clone()
        if (this.lastQuat === null) {
            this.lastQuat = quat.clone()
            return
        }

        // prevent axis jumps
        if (this.lastQuat.dot(quat) < 0) {
            quat.x = -quat.x
            quat.y = -quat.y
            quat.z = -quat.z
            quat.w = -quat.w
        }

        const minCutoff = MathUtils.lerp(this.max, this.min, m)

        this.filters.forEach(f => {
            f.setMinCutoff(minCutoff)
            f.setBeta(0.001)
            f.setDerivateCutoff(0.001)
        })

        quat.set(
            this.filters[0].filter(quat.x, timeStamp),
            this.filters[1].filter(quat.y, timeStamp),
            this.filters[2].filter(quat.z, timeStamp),
            this.filters[3].filter(quat.w, timeStamp)
        ).normalize()

        if (isNaN(quat.x) || isNaN(quat.y) || isNaN(quat.z) || isNaN(quat.w)) {
            quat.copy(origQuat)
            this.lastQuat = origQuat
            return
        }

        this.lastQuat.copy(quat)
    }

    reset() {
        this.filters.forEach(f => f.reset())
        this.lastQuat = null
    }
}