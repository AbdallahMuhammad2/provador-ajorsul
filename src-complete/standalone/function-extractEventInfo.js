/* Standalone Function: extractEventInfo */

function extractEventInfo(d, o="page") {
    return {
        point: {
            x: d[`${o}X`],
            y: d[`${o}Y`]
        }
    }
}

export default extractEventInfo;
