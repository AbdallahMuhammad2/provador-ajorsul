/* Standalone Function: mc */

function mc(d) {
    if (lc && typeof lc.onCommitFiberRoot == "function")
        try {
            lc.onCommitFiberRoot(kc, d, void 0, (d.current.flags & 128) === 128)
        } catch {}
}

export default mc;
