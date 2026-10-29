// ─── Meta Pixel Config ─────────────────────────────────────────────────────────
const META_PIXEL_ID = '448738179262542';

export const loadMetaPixel = () => {
  if (window.fbq) return; // already loaded, avoid double-init
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v;
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', META_PIXEL_ID);
};

export const trackLead = () => {
  loadMetaPixel();
  window.fbq('track', 'Lead');
};

export const PIXEL_NOSCRIPT_SRC = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=Lead&noscript=1`;