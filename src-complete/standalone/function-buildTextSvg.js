/* Standalone Function: buildTextSvg */

function buildTextSvg({text: d="Custom Text", svgBackground: o="#ffffff", xOffset: c=0, yOffset: h=0, width: _=1024, height: b=1024, boxWidth: _e=1024, boxHeight: nt=1024, fontFamily: it="", fontSize: at=32, maskText: ut=!0, innerShadow: pt=!0, bgFillColor: ht="#000000", textColor: _t="#ffffff", textAnchor: vt="middle", style: bt=""}) {
    return `
<svg style="background-color:${o}" width="${_}" height="${b}" viewBox="0 0 ${_e} ${nt}"
 xmlns="http://www.w3.org/2000/svg"
 xmlns:xlink="http://www.w3.org/1999/xlink">
     <defs>
        <style>
        ${bt}
        </style>
    </defs>

    <g style="overflow:hidden; text-anchor: ${vt}; font-size: ${at}px; font-family: ${it || "Arial"}">
        <defs>

` + (ut ? `
<mask id="textMask">
<text style="fill:white; font-size: ${at}px;" x="${c + _e / 2}" y="${nt / 2 + h + at / 4}" > ${d} </text>
</mask>
` : "") + `

` + (pt ? `
<filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
<feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur"/>
<feOffset in="blur" dx="1.5" dy="1.5"/>
</filter>
` : "") + `

        </defs>

` + (ut ? `
        <g mask="url(#textMask)">
` : "") + `

        <rect x="0" y="0" width="${_e}" height="${nt}" style="fill:${ht}"/>
        <text style="${pt ? "filter: url(#innerShadow);" : ""} fill:${_t};" x="${c + _e / 2}" y="${nt / 2 + h + at / 4}"> ${d} </text>

` + (ut ? `
        </g>
` : "") + `

    </g>
</svg>
`
}

export default buildTextSvg;
