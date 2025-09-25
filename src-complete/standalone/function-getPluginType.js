/* Standalone Function: getPluginType */

function getPluginType(d) {
    return Object.getPrototypeOf(d).constructor.PluginType
}

export default getPluginType;
