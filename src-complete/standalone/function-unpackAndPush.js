/* Standalone Function: unpackAndPush */

function unpackAndPush(d, o) {
    d.push((4294901760 & o) >> 16, 65535 & o)
}

export default unpackAndPush;
