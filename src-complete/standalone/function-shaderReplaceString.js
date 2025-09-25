/* Standalone Function: shaderReplaceString */

function shaderReplaceString(d, o, c, {replaceAll: h=!1, prepend: _=!1, append: b=!1}={}) {
    if (!d.includes(o))
        return console.error(`${o} not found in shader`),
        d;
    let _e = c;
    return _ ? _e = c + o : b && (_e = o + c),
    h ? d.replaceAll(o, _e) : d.replace(o, _e)
}

export default shaderReplaceString;
