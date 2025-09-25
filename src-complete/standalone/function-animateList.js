/* Standalone Function: animateList */

function animateList(d) {
    return o => Promise.all(o.map( ({animation: c, options: h}) => animateVisualElement(d, c, h)))
}

export default animateList;
