/* Standalone Function: Share */

function Share() {
    const {viewer: d, image: o} = useUi()
      , c = reactExports.useCallback( () => {
        d.renderEnabled = !0;
        const _ = document.getElementById("ui-wrapper");
        _ && (_.style.opacity = "1",
        _.style.pointerEvents = "auto");
        const b = document.getElementById("share");
        b && (b.style.opacity = "0",
        b.style.pointerEvents = "none")
    }
    , [])
      , h = reactExports.useCallback(async () => {
        const _ = await (await fetch(o)).blob()
          , b = new File([_],"fileName.jpeg",{
            type: _.type
        });
        navigator.share({
            title: "Hello",
            text: "Check out this image!",
            files: [b]
        })
    }
    , [o]);
    return jsxRuntimeExports.jsxs("div", {
        className: "absolute z-10 opacity-0 gap-4 pointer-events-none w-full h-fit flex flex-col justify-center items-center bottom-7 transition-opacity duration-200",
        id: "share",
        children: [jsxRuntimeExports.jsx(SettingsButton, {
            onClick: c,
            img: jsxRuntimeExports.jsx(ArrowDownIcon, {
                className: "rotate-90"
            }),
            text: "back"
        }), jsxRuntimeExports.jsx("p", {
            className: "text-white",
            children: "Share this moment!"
        }), jsxRuntimeExports.jsx("button", {
            onClick: h,
            className: "w-40 h-10 bg-primary rounded-full active:bg-secondary text-black font-bold",
            children: "Share"
        })]
    })
}

export default Share;
