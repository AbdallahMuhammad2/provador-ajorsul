/* Standalone Function: initDecoderModule */

function initDecoderModule(d) {
    decoderModule = d,
    COMPONENT_ARRAY = {
        [index_modern_Accessor.ComponentType.FLOAT]: Float32Array,
        [index_modern_Accessor.ComponentType.UNSIGNED_INT]: Uint32Array,
        [index_modern_Accessor.ComponentType.UNSIGNED_SHORT]: Uint16Array,
        [index_modern_Accessor.ComponentType.UNSIGNED_BYTE]: Uint8Array,
        [index_modern_Accessor.ComponentType.SHORT]: Int16Array,
        [index_modern_Accessor.ComponentType.BYTE]: Int8Array
    },
    DATA_TYPE = {
        [index_modern_Accessor.ComponentType.FLOAT]: decoderModule.DT_FLOAT32,
        [index_modern_Accessor.ComponentType.UNSIGNED_INT]: decoderModule.DT_UINT32,
        [index_modern_Accessor.ComponentType.UNSIGNED_SHORT]: decoderModule.DT_UINT16,
        [index_modern_Accessor.ComponentType.UNSIGNED_BYTE]: decoderModule.DT_UINT8,
        [index_modern_Accessor.ComponentType.SHORT]: decoderModule.DT_INT16,
        [index_modern_Accessor.ComponentType.BYTE]: decoderModule.DT_INT8
    }
}

export default initDecoderModule;
