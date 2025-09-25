/* Standalone Function: Dg */

function Dg(d) {
    return (d.mode & 1) !== 0 && (d.flags & 128) === 0
}

export default Dg;
