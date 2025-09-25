/* Standalone Constant: Vm */

const Vm = {
                "**": (Vt, wt) => Math.pow(Vt, wt),
                "*": (Vt, wt) => Vt * wt,
                "/": (Vt, wt) => Vt / wt,
                "%": (Vt, wt) => Vt % wt,
                "+": (Vt, wt) => Vt + wt,
                "-": (Vt, wt) => Vt - wt,
                "<<": (Vt, wt) => Vt << wt,
                ">>": (Vt, wt) => Vt >> wt,
                ">>>": (Vt, wt) => Vt >>> wt,
                "&": (Vt, wt) => Vt & wt,
                "^": (Vt, wt) => Vt ^ wt,
                "|": (Vt, wt) => Vt | wt
            };

export default Vm;
