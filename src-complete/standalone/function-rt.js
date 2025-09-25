/* Standalone Function: rt */

function rt(d, o=null) {
    return new URL(window.location.href).searchParams.get(d) ?? o
}

export default rt;
