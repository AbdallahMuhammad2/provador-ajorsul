/* Standalone Function: loadFeatures */

function loadFeatures(d) {
    for (const o in d)
        featureDefinitions[o] = {
            ...featureDefinitions[o],
            ...d[o]
        }
}

export default loadFeatures;
