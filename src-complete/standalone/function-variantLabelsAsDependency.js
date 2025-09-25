/* Standalone Function: variantLabelsAsDependency */

function variantLabelsAsDependency(d) {
    return Array.isArray(d) ? d.join(" ") : d
}

export default variantLabelsAsDependency;
