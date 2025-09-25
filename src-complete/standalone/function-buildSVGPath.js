/* Standalone Function: buildSVGPath */

function buildSVGPath(d, o, c=1, h=0, _=!0) {
    d.pathLength = 1;
    const b = _ ? dashKeys : camelKeys;
    d[b.offset] = px.transform(-h);
    const _e = px.transform(o)
      , nt = px.transform(c);
    d[b.array] = `${_e} ${nt}`
}

export default buildSVGPath;
