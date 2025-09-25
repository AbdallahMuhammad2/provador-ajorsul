/* Standalone Function: ct */

function ct(d, o) {
    const c = (o ? `var Module = { locateFile: function(s) { return "${o}"; } }; 
` : "") + `importScripts( "${d}" );`;
    return URL.createObjectURL(new Blob([c],{
        type: "text/javascript"
    }))
}

export default ct;
