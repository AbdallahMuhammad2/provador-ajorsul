/* Standalone Function: getTargetPath */

function getTargetPath(d) {
    for (const o of d.listParents())
        if (o instanceof index_modern_AnimationSampler) {
            for (const c of o.listParents())
                if (c instanceof index_modern_AnimationChannel)
                    return c.getTargetPath()
        }
    return null
}

export default getTargetPath;
