/* Standalone Function: createTypeState */

function createTypeState(d=!1) {
    return {
        isActive: d,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
    }
}

export default createTypeState;
