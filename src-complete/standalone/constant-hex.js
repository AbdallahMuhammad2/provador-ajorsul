/* Standalone Constant: hex */

const hex = {
    test: isColorString("#"),
    parse: parseHex,
    transform: rgba.transform
}
  , hsla = {
    test: isColorString("hsl", "hue"),
    parse: splitColor("hue", "saturation", "lightness"),
    transform: ({hue: d, saturation: o, lightness: c, alpha: h=1}) => "hsla(" + Math.round(d) + ", " + percent.transform(sanitize(o)) + ", " + percent.transform(sanitize(c)) + ", " + sanitize(alpha.transform(h)) + ")"
}
  , color = {
    test: d => rgba.test(d) || hex.test(d) || hsla.test(d),
    parse: d => rgba.test(d) ? rgba.parse(d) : hsla.test(d) ? hsla.parse(d) : hex.parse(d),
    transform: d => isString(d) ? d : d.hasOwnProperty("red") ? rgba.transform(d) : hsla.transform(d)
};

export default hex;
