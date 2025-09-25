/* Standalone Function: Spinner */

function Spinner(d) {
    return jsxRuntimeExports.jsx("div", {
        className: "w-20 h-20 flex " + d.className,
        children: jsxRuntimeExports.jsx("span", {
            className: "spinner"
        })
    })
}

export default Spinner;
