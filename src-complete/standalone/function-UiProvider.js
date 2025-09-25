/* Standalone Function: UiProvider */

function UiProvider({children: d, initialValues: o}) {
    const c = useSetupProvider(o);
    return reactExports.createElement(Uicontext.Provider, {
        value: c
    }, d)
}

export default UiProvider;
