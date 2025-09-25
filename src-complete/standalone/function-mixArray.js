/* Standalone Function: mixArray */

function mixArray(d, o) {
    const c = [...d]
      , h = c.length
      , _ = d.map( (b, _e) => getMixer$1(b)(b, o[_e]));
    return b => {
        for (let _e = 0; _e < h; _e++)
            c[_e] = _[_e](b);
        return c
    }
}

export default mixArray;
