/* Standalone Function: Ua */

function Ua(d) {
    var o = Ta(d) ? "checked" : "value"
      , c = Object.getOwnPropertyDescriptor(d.constructor.prototype, o)
      , h = "" + d[o];
    if (!d.hasOwnProperty(o) && typeof c < "u" && typeof c.get == "function" && typeof c.set == "function") {
        var _ = c.get
          , b = c.set;
        return Object.defineProperty(d, o, {
            configurable: !0,
            get: function() {
                return _.call(this)
            },
            set: function(_e) {
                h = "" + _e,
                b.call(this, _e)
            }
        }),
        Object.defineProperty(d, o, {
            enumerable: c.enumerable
        }),
        {
            getValue: function() {
                return h
            },
            setValue: function(_e) {
                h = "" + _e
            },
            stopTracking: function() {
                d._valueTracker = null,
                delete d[o]
            }
        }
    }
}

export default Ua;
