/* Standalone Class: SvgGradient */

class SvgGradient {
    constructor() {}
    get(o, c) {
        return this.colors = o,
        this.options = c,
        this.createGradient()
    }
    createSvgElement(o) {
        return document.createElementNS("http://www.w3.org/2000/svg", o)
    }
    createColorStop(o, c, h) {
        const _ = this.createSvgElement("stop");
        return _.setAttribute("offset", c / h * 100 + "%"),
        _.setAttribute("stop-color", o),
        _
    }
    colorsToStops() {
        const o = this.colors;
        return o.map( (c, h) => {
            const _ = c.getStyle();
            return this.createColorStop(_, h, o.length)
        }
        )
    }
    createGradientElement() {
        const o = this.options
          , c = this.createSvgElement(`${o.type}Gradient`)
          , h = /((id)|([c|f|x|y|r][x|y|1|2]?)|(gradientUnits))/
          , _ = o[`${o.type}Options`]
          , b = {
            id: o.id,
            type: o.type,
            gradientUnits: o.gradientUnits,
            ..._
        };
        return Object.entries(b).filter(_e => h.test(_e[0])).forEach(_e => {
            _e[0] !== "type" && c.setAttribute(_e[0], _e[1])
        }
        ),
        b.angle && c.setAttribute("gradientTransform", `rotate(${b.angle})`),
        c
    }
    createGradient() {
        const o = this.createGradientElement();
        return this.colorsToStops().forEach(c => o.appendChild(c)),
        o
    }
}

export default SvgGradient;
