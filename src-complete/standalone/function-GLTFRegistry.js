/* Standalone Function: GLTFRegistry */

function GLTFRegistry() {
    let d = {};
    return {
        get: function(o) {
            return d[o]
        },
        add: function(o, c) {
            d[o] = c
        },
        remove: function(o) {
            delete d[o]
        },
        removeAll: function() {
            d = {}
        }
    }
}

export default GLTFRegistry;
