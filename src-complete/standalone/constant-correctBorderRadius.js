/* Standalone Constant: correctBorderRadius */

const correctBorderRadius = {
    correct: (d, o) => {
        if (!o.target)
            return d;
        if (typeof d == "string")
            if (px.test(d))
                d = parseFloat(d);
            else
                return d;
        const c = pixelsToPercent(d, o.target.x)
          , h = pixelsToPercent(d, o.target.y);
        return `${c}% ${h}%`
    }
}
  , correctBoxShadow = {
    correct: (d, {treeScale: o, projectionDelta: c}) => {
        const h = d
          , _ = complex.parse(d);
        if (_.length > 5)
            return h;
        const b = complex.createTransformer(d)
          , _e = typeof _[0] != "number" ? 1 : 0
          , nt = c.x.scale * o.x
          , it = c.y.scale * o.y;
        _[0 + _e] /= nt,
        _[1 + _e] /= it;
        const at = mixNumber$1(nt, it, .5);
        return typeof _[2 + _e] == "number" && (_[2 + _e] /= at),
        typeof _[3 + _e] == "number" && (_[3 + _e] /= at),
        b(_)
    }
};

export default correctBorderRadius;
