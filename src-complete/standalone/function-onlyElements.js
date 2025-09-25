/* Standalone Function: onlyElements */

function onlyElements(d) {
    const o = [];
    return reactExports.Children.forEach(d, c => {
        reactExports.isValidElement(c) && o.push(c)
    }
    ),
    o
}

export default onlyElements;
