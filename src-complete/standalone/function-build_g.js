/* Standalone Function: build_g */

function build_g(d) {
    return build_P(d, {
        type: "RELEASE"
    }).then( () => {
        build_d(d)
    }
    )
}

export default build_g;
