/* Standalone Constant: dr */

const dr = {
            bitOffset: vt._nextUint16(),
            bitLength: vt._nextUint8(),
            channelType: vt._nextUint8(),
            samplePosition: [vt._nextUint8(), vt._nextUint8(), vt._nextUint8(), vt._nextUint8()],
            sampleLower: -1 / 0,
            sampleUpper: 1 / 0
        };

export default dr;
