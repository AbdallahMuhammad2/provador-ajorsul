/* Standalone Constant: Button */

let Button = {
    create: d => {
        let o = "button" + (d.type ? " " + d.type : "")
          , c = utility.createDiv(o, d.text);
        return c.addEventListener("click", d.onClick),
        c
    }
};

export default Button;
