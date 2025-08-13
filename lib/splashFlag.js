// lib/splashFlag.js
const key = (slug) => `splash-${slug}`;

export const shouldShowSplash = (slug) =>
  typeof window !== 'undefined' && !window.localStorage.getItem(key(slug));

export const markSplashShown = (slug) =>
  typeof window !== 'undefined' && window.localStorage.setItem(key(slug), '1');