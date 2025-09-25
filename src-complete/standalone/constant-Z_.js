/* Standalone Constant: Z_ */

const Z_ = {
                deg: Vt => Vt,
                grad: Vt => 360 * Vt / 400,
                rad: Vt => 360 * Vt / (2 * Math.PI),
                turn: Vt => 360 * Vt
            };

export default Z_;
