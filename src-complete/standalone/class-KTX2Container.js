/* Standalone Class: KTX2Container */

class KTX2Container {
    constructor() {
        this.vkFormat = VK_FORMAT_UNDEFINED,
        this.typeSize = 1,
        this.pixelWidth = 0,
        this.pixelHeight = 0,
        this.pixelDepth = 0,
        this.layerCount = 0,
        this.faceCount = 1,
        this.supercompressionScheme = KHR_SUPERCOMPRESSION_NONE,
        this.levels = [],
        this.dataFormatDescriptor = [{
            vendorId: KHR_DF_VENDORID_KHRONOS,
            descriptorType: KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT,
            descriptorBlockSize: 0,
            versionNumber: KHR_DF_VERSION,
            colorModel: KHR_DF_MODEL_UNSPECIFIED,
            colorPrimaries: KHR_DF_PRIMARIES_BT709,
            transferFunction: KHR_DF_TRANSFER_SRGB,
            flags: KHR_DF_FLAG_ALPHA_STRAIGHT,
            texelBlockDimension: [0, 0, 0, 0],
            bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0],
            samples: []
        }],
        this.keyValue = {},
        this.globalData = null
    }
}

export default KTX2Container;
