/* Standalone Function: al */

function al(d, o, c, h, _) {
    this.tag = o,
    this.containerInfo = d,
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
    this.timeoutHandle = -1,
    this.callbackNode = this.pendingContext = this.context = null,
    this.callbackPriority = 0,
    this.eventTimes = zc(0),
    this.expirationTimes = zc(-1),
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
    this.entanglements = zc(0),
    this.identifierPrefix = h,
    this.onRecoverableError = _,
    this.mutableSourceEagerHydrationData = null
}

export default al;
