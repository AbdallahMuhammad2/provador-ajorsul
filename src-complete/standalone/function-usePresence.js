/* Standalone Function: usePresence */

function usePresence() {
    const d = reactExports.useContext(PresenceContext);
    if (d === null)
        return [!0, null];
    const {isPresent: o, onExitComplete: c, register: h} = d
      , _ = reactExports.useId();
    return reactExports.useEffect( () => h(_), []),
    !o && c ? [!1, () => c && c(_)] : [!0]
}

export default usePresence;
