export const isAppleMobileDevice = () => {
    const isIpad = navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2;

    return /iPhone|iPod/.test(navigator.userAgent) || isIpad;
}