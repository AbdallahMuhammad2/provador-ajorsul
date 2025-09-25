/* Standalone Function: App */

function App() {
    const [d,o] = reactExports.useState(!1)
      , {setDigitalZoom: c} = useUi()
      , [h,_] = reactExports.useState(!1)
      , b = reactExports.useCallback( () => {
        c(1),
        console.log("User Swiped up!"),
        o(!0)
    }
    , [o])
      , _e = reactExports.useCallback( () => {
        console.log("User Swiped down!"),
        o(!1)
    }
    , [o])
      , nt = useSwipeable({
        trackMouse: !0,
        swipeDuration: 500,
        onSwipedUp: b,
        onSwipedDown: _e
    });
    return jsxRuntimeExports.jsxs("div", {
        className: "w-full h-dvh pointer-events-none overflow-hidden bg-transparent font-main font-light relative",
        children: [jsxRuntimeExports.jsx(Intro, {
            setShowUi: _
        }), h && jsxRuntimeExports.jsxs("div", {
            className: "w-full pointer-events-auto h-dvh overflow-hidden flex bg-transparent font-main font-light relative",
            children: [jsxRuntimeExports.jsx("div", {
                className: "absolute left-1/2 -translate-x-1/2 top-5",
                children: jsxRuntimeExports.jsx("img", {
                    src: "./icons/logo.webp",
                    alt: "logo",
                    className: "w-32 h-20 object-contain"
                })
            }), jsxRuntimeExports.jsx(Share, {}), jsxRuntimeExports.jsxs("div", {
                ...nt,
                className: "w-full h-full flex flex-col transition-opacity opacity-100",
                id: "ui-wrapper",
                children: [jsxRuntimeExports.jsx("div", {
                    className: "flex-1 pointer-events-none"
                }), jsxRuntimeExports.jsx(Settings, {
                    show: d,
                    setShow: o
                }), jsxRuntimeExports.jsx(RingsWrapper, {})]
            })]
        })]
    })
}

export default App;
