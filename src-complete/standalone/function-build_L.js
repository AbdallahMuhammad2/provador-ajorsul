/* Standalone Function: build_L */

function build_L(d) {
    switch (d.type) {
    case "HANDLER":
        return build_h.get(d.name).deserialize(d.value);
    case "RAW":
        return d.value
    }
}

export default build_L;
