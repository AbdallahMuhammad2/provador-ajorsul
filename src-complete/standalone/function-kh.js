/* Standalone Function: kh */

function kh(d) {
    d.updateQueue = {
        baseState: d.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}

export default kh;
