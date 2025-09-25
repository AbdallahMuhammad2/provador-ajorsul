/* Standalone Constant: Eu */

const Eu = {
            enabled: !1,
            files: {},
            add: function(Tt, tt) {
                this.enabled !== !1 && (this.files[Tt] = tt)
            },
            get: function(Tt, tt) {
                return this.enabled === !1 ? tt ? Promise.resolve() : void 0 : tt ? Promise.resolve(this.files[Tt]) : this.files[Tt]
            },
            remove: function(Tt) {
                delete this.files[Tt]
            },
            clear: function() {
                this.files = {}
            }
        };

export default Eu;
