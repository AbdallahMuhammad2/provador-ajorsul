/* Standalone Function: createLock */

function createLock(d) {
    let o = null;
    return () => {
        const c = () => {
            o = null
        }
        ;
        return o === null ? (o = d,
        c) : !1
    }
}

export default createLock;
