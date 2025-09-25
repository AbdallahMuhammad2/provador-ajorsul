/* Standalone Function: serialize */

function serialize(d) {
    return (o, c) => {
        const h = o.constructor;
        if (h === Object)
            throw new Error("All properties in an object are serialized by default");
        typeMap.has(h) || typeMap.set(h, []),
        typeMap.get(h).push([d || c, c])
    }
}

export default serialize;
