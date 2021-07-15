export const isIos = () => !!navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && (/MacIntel/.test(navigator.platform) || /iPhone/.test(navigator.platform));
