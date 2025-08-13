// data/index.js   (NEW file)
export const serviceData = {
  'web-development': () => import('./webDev.js').then(m => m.default),
  'ai-development' : () => import('./aiDev.js').then(m => m.default),
  'app-development': () => import('./appDev.js').then(m => m.default),
  'social-media'   : () => import('./socialMedia.js').then(m => m.default),
  'email'          : () => import('./email.js').then(m => m.default),
  'branding'       : () => import('./branding.js').then(m => m.default),
  'analytics'      : () => import('./analytics.js').then(m => m.default),
  'seo'            : () => import('./seo.js').then(m => m.default),
  'ppc'            : () => import('./ppc.js').then(m => m.default),
  'content'        : () => import('./content.js').then(m => m.default),
};