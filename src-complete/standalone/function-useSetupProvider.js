/* Standalone Function: useSetupProvider */

function useSetupProvider(d) {
    const [o,c] = reactExports.useState(d.digitalZoom || 1)
      , [h,_] = reactExports.useState(d.cameraZoom || 1)
      , [b,_e] = reactExports.useState(d.image || "")
      , nt = d.handleStartAR || ( () => {}
    )
      , it = d.loadRing || ( () => {}
    )
      , at = d.viewer
      , ut = d.clickImage || ( () => {}
    )
      , pt = d.flipCamera || ( () => {}
    )
      , ht = d.rings || []
      , [_t,vt] = reactExports.useState(3);
    return {
        image: b,
        setImage: _e,
        digitalZoom: o,
        setDigitalZoom: c,
        handleStartAR: nt,
        cameraZoom: h,
        fingerIndex: _t,
        setCameraZoom: _,
        selectPreviousFinger: () => {
            vt(At => (At - 1 + 5) % 5)
        }
        ,
        selectNextFinger: () => {
            vt(At => (At + 1) % 5)
        }
        ,
        loadRing: it,
        clickImage: ut,
        flipCamera: pt,
        viewer: at,
        rings: ht
    }
}

export default useSetupProvider;
