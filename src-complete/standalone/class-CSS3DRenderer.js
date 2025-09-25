/* Standalone Class: CSS3DRenderer */

class CSS3DRenderer {
    constructor(o={}) {
        const c = this;
        let h, _, b, _e;
        const nt = {
            camera: {
                fov: 0,
                style: ""
            },
            objects: new WeakMap
        }
          , it = o.element !== void 0 ? o.element : document.createElement("div");
        it.style.overflow = "hidden",
        this.domElement = it;
        const at = document.createElement("div");
        at.style.transformOrigin = "0 0",
        at.style.pointerEvents = "none",
        it.appendChild(at);
        const ut = document.createElement("div");
        function pt(bt) {
            return Math.abs(bt) < 1e-10 ? 0 : bt
        }
        function ht(bt) {
            const St = bt.elements;
            return "matrix3d(" + pt(St[0]) + "," + pt(-St[1]) + "," + pt(St[2]) + "," + pt(St[3]) + "," + pt(St[4]) + "," + pt(-St[5]) + "," + pt(St[6]) + "," + pt(St[7]) + "," + pt(St[8]) + "," + pt(-St[9]) + "," + pt(St[10]) + "," + pt(St[11]) + "," + pt(St[12]) + "," + pt(-St[13]) + "," + pt(St[14]) + "," + pt(St[15]) + ")"
        }
        function _t(bt) {
            const St = bt.elements;
            return "translate(-50%,-50%)matrix3d(" + pt(St[0]) + "," + pt(St[1]) + "," + pt(St[2]) + "," + pt(St[3]) + "," + pt(-St[4]) + "," + pt(-St[5]) + "," + pt(-St[6]) + "," + pt(-St[7]) + "," + pt(St[8]) + "," + pt(St[9]) + "," + pt(St[10]) + "," + pt(St[11]) + "," + pt(St[12]) + "," + pt(St[13]) + "," + pt(St[14]) + "," + pt(St[15]) + ")"
        }
        function vt(bt, St, At, Et) {
            if (bt.isCSS3DObject) {
                const Pt = bt.visible === !0 && bt.layers.test(At.layers) === !0;
                if (bt.element.style.display = Pt === !0 ? "" : "none",
                Pt === !0) {
                    let It;
                    bt.onBeforeRender(c, St, At),
                    bt.isCSS3DSprite ? (_matrix.copy(At.matrixWorldInverse),
                    _matrix.transpose(),
                    bt.rotation2D !== 0 && _matrix.multiply(_matrix2.makeRotationZ(bt.rotation2D)),
                    bt.matrixWorld.decompose(_position, _quaternion, _scale),
                    _matrix.setPosition(_position),
                    _matrix.scale(_scale),
                    _matrix.elements[3] = 0,
                    _matrix.elements[7] = 0,
                    _matrix.elements[11] = 0,
                    _matrix.elements[15] = 1,
                    It = _t(_matrix)) : It = _t(bt.matrixWorld);
                    const Dt = bt.element
                      , Gt = nt.objects.get(bt);
                    if (Gt === void 0 || Gt.style !== It) {
                        Dt.style.transform = It;
                        const Bt = {
                            style: It
                        };
                        nt.objects.set(bt, Bt)
                    }
                    Dt.parentNode !== ut && ut.appendChild(Dt),
                    bt.onAfterRender(c, St, At)
                }
            }
            for (let Pt = 0, It = bt.children.length; Pt < It; Pt++)
                vt(bt.children[Pt], St, At)
        }
        ut.style.transformStyle = "preserve-3d",
        at.appendChild(ut),
        this.getSize = function() {
            return {
                width: h,
                height: _
            }
        }
        ,
        this.render = function(bt, St) {
            const At = St.projectionMatrix.elements[5] * _e;
            let Et, Pt;
            nt.camera.fov !== At && (at.style.perspective = St.isPerspectiveCamera ? At + "px" : "",
            nt.camera.fov = At),
            St.view && St.view.enabled ? (at.style.transform = `translate( ${-St.view.offsetX * (h / St.view.width)}px, ${-St.view.offsetY * (_ / St.view.height)}px )`,
            at.style.transform += `scale( ${St.view.fullWidth / St.view.width}, ${St.view.fullHeight / St.view.height} )`) : at.style.transform = "",
            bt.matrixWorldAutoUpdate === !0 && bt.updateMatrixWorld(),
            St.parent === null && St.matrixWorldAutoUpdate === !0 && St.updateMatrixWorld(),
            St.isOrthographicCamera && (Et = -(St.right + St.left) / 2,
            Pt = (St.top + St.bottom) / 2);
            const It = St.view && St.view.enabled ? St.view.height / St.view.fullHeight : 1
              , Dt = St.isOrthographicCamera ? `scale( ${It} )scale(` + At + ")translate(" + pt(Et) + "px," + pt(Pt) + "px)" + ht(St.matrixWorldInverse) : `scale( ${It} )translateZ(` + At + "px)" + ht(St.matrixWorldInverse)
              , Gt = Dt + "translate(" + b + "px," + _e + "px)";
            nt.camera.style !== Gt && (ut.style.transform = Gt,
            nt.camera.style = Gt),
            vt(bt, bt, St)
        }
        ,
        this.setSize = function(bt, St) {
            h = bt,
            _ = St,
            b = h / 2,
            _e = _ / 2,
            it.style.width = bt + "px",
            it.style.height = St + "px",
            at.style.width = bt + "px",
            at.style.height = St + "px",
            ut.style.width = bt + "px",
            ut.style.height = St + "px"
        }
    }
}

export default CSS3DRenderer;
