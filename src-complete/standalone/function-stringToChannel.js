/* Standalone Function: stringToChannel */

function stringToChannel(d) {
    let o = 0;
    return d.includes("R") && (o |= index_modern_TextureChannel.R),
    d.includes("G") && (o |= index_modern_TextureChannel.G),
    d.includes("B") && (o |= index_modern_TextureChannel.B),
    d.includes("A") && (o |= index_modern_TextureChannel.A),
    o
}

export default stringToChannel;
