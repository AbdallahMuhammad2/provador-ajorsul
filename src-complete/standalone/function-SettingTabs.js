/* Standalone Function: SettingTabs */

function SettingTabs({setShow: d}) {
    const [o,c] = reactExports.useState(0)
      , {setDigitalZoom: h, digitalZoom: _, cameraZoom: b, setCameraZoom: _e, flipCamera: nt, selectPreviousFinger: it, selectNextFinger: at} = useUi();
    return jsxRuntimeExports.jsxs("div", {
        className: "w-full h-full flex flex-col gap-6 justify-center items-center",
        children: [jsxRuntimeExports.jsxs("div", {
            className: "w-full flex justify-center items-center gap-4",
            children: [jsxRuntimeExports.jsx(SettingsButton, {
                img: jsxRuntimeExports.jsx(ArrowDownIcon, {}),
                text: "Hide",
                onClick: () => d(!1)
            }), jsxRuntimeExports.jsx(SettingsButton, {
                img: jsxRuntimeExports.jsx(CameraIcon, {}),
                text: "Digital Zoom",
                isActive: o === 0,
                onClick: () => c(0)
            }), jsxRuntimeExports.jsx(SettingsButton, {
                img: jsxRuntimeExports.jsx(CameraZoomIcon, {}),
                text: "Camera Zoom",
                isActive: o === 1,
                onClick: () => c(1)
            }), jsxRuntimeExports.jsx(SettingsButton, {
                img: jsxRuntimeExports.jsx(FingerSelectionIcon, {}),
                text: "Finger",
                isActive: o === 2,
                onClick: () => c(2)
            }), jsxRuntimeExports.jsx(SettingsButton, {
                onClick: nt,
                img: jsxRuntimeExports.jsx(FlipCameraIcon, {})
            })]
        }), jsxRuntimeExports.jsx(AnimatePresence, {
            children: jsxRuntimeExports.jsxs("div", {
                className: "h-10 w-full max-w-96",
                children: [o === 0 && jsxRuntimeExports.jsx(Slider, {
                    step: .1,
                    value: _,
                    setSliderValue: h,
                    min: 1,
                    max: 5
                }, "digital-zoom"), o === 1 && jsxRuntimeExports.jsx(Slider, {
                    step: .1,
                    value: b,
                    setSliderValue: _e,
                    min: 1,
                    max: 5
                }, "camera-zoom"), o === 2 && jsxRuntimeExports.jsxs("div", {
                    className: "flex justify-center items-center gap-4",
                    children: [jsxRuntimeExports.jsx("button", {
                        className: "p-2 rounded-md w-32 bg-gray-200",
                        onClick: it,
                        children: "Previous Finger"
                    }), jsxRuntimeExports.jsx("button", {
                        className: "p-2 rounded-md w-32 bg-gray-200",
                        onClick: at,
                        children: "Next Finger"
                    })]
                })]
            })
        })]
    })
}

export default SettingTabs;
