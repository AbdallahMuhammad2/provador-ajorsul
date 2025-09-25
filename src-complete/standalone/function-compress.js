/* Standalone Function: compress */

function compress(d, o, c) {
    return h => h < d ? 0 : h > o ? 1 : c(progress(d, o, h))
}

export default compress;
