/* Standalone Function: createState */

function createState() {
    return {
        animate: createTypeState(!0),
        whileInView: createTypeState(),
        whileHover: createTypeState(),
        whileTap: createTypeState(),
        whileDrag: createTypeState(),
        whileFocus: createTypeState(),
        exit: createTypeState()
    }
}

export default createState;
