/* Standalone Constant: zstddec_module_g */

const zstddec_module_g = {
    env: {
        emscripten_notify_memory_growth: function(d) {
            zstddec_module_B = new Uint8Array(zstddec_module_I.exports.memory.buffer)
        }
    }
};

export default zstddec_module_g;
