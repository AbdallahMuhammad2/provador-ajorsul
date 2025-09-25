/* Standalone Function: getImageURIMimeType */

function getImageURIMimeType(d) {
    return d.search(/\.jpe?g($|\?)/i) > 0 || d.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : d.search(/\.webp($|\?)/i) > 0 || d.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png"
}

export default getImageURIMimeType;
