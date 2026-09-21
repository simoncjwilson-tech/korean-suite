// shared/theme.js — Korean Suite dark-mode toggle.
//
// Base layer is CSS-only: each app's `@media (prefers-color-scheme: dark)`
// block follows the system setting with zero JS. This script only adds the
// manual override: a `data-theme="dark"|"light"` attribute on <html>, backed
// by ONE shared localStorage key (`ks-theme`) so every app under this origin
// agrees — set it once anywhere in the suite, it applies everywhere.
//
// Must run synchronously in <head>, before first paint, so the saved
// preference applies without a flash of the wrong theme.
(function () {
  'use strict';
  var KEY = 'ks-theme';
  var root = document.documentElement;

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function apply(theme) {
    if (theme === 'dark' || theme === 'light') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
  }
  function write(theme) {
    try {
      if (theme === 'dark' || theme === 'light') localStorage.setItem(KEY, theme);
      else localStorage.removeItem(KEY);
    } catch (e) { /* private mode / storage disabled — falls back to in-memory only */ }
  }

  // Apply the saved preference immediately (before any <style> below this
  // script resolves, and long before <body> paints).
  apply(read());

  var ICONS = {
    // auto: half-filled circle
    auto:  '<path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 12.4V2.6A5.4 5.4 0 0 1 8 13.4Z"/>',
    // dark: crescent moon
    dark:  '<path d="M13.4 9.4A5.8 5.8 0 0 1 6.6 2.6a5.8 5.8 0 1 0 6.8 6.8Z"/>',
    // light: sun
    light: '<circle cx="8" cy="8" r="3.4"/><path d="M8 1.2a.8.8 0 0 1 .8.8v1.3a.8.8 0 0 1-1.6 0V2a.8.8 0 0 1 .8-.8Zm0 11.5a.8.8 0 0 1 .8.8V14.8a.8.8 0 0 1-1.6 0v-1.3a.8.8 0 0 1 .8-.8ZM1.2 8a.8.8 0 0 1 .8-.8h1.3a.8.8 0 0 1 0 1.6H2a.8.8 0 0 1-.8-.8Zm11.5 0a.8.8 0 0 1 .8-.8H14.8a.8.8 0 0 1 0 1.6h-1.3a.8.8 0 0 1-.8-.8ZM3.3 3.3a.8.8 0 0 1 1.13 0l.92.92a.8.8 0 1 1-1.13 1.13l-.92-.92a.8.8 0 0 1 0-1.13Zm8.42 8.42a.8.8 0 0 1 1.13 0l.92.92a.8.8 0 1 1-1.13 1.13l-.92-.92a.8.8 0 0 1 0-1.13ZM3.3 12.7a.8.8 0 0 1 0-1.13l.92-.92a.8.8 0 1 1 1.13 1.13l-.92.92a.8.8 0 0 1-1.13 0Zm8.42-8.42a.8.8 0 0 1 0-1.13l.92-.92a.8.8 0 1 1 1.13 1.13l-.92.92a.8.8 0 0 1-1.13 0Z"/>'
  };
  var LABELS = { auto: 'Theme: Auto (follows system)', dark: 'Theme: Dark', light: 'Theme: Light' };
  var ORDER = [null, 'dark', 'light']; // null = auto

  function stateKey(theme) {
    return theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : 'auto';
  }

  function paint(btn, theme) {
    var s = stateKey(theme);
    var svg = btn.querySelector('svg');
    if (svg) svg.innerHTML = ICONS[s];
    var label = LABELS[s] + ' — tap to change';
    btn.setAttribute('aria-label', label);
    btn.title = LABELS[s];
  }

  function wire(btn) {
    var theme = read();
    paint(btn, theme);
    btn.addEventListener('click', function () {
      theme = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
      apply(theme);
      write(theme);
      paint(btn, theme);
    });
  }

  function init() {
    var btns = document.querySelectorAll('[data-ks-theme-toggle]');
    for (var i = 0; i < btns.length; i++) wire(btns[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
