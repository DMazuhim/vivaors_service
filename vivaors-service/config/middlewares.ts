// path: ./config/middlewares.ts

export default [
  'strapi::logger',
  'strapi::errors',
  
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'http:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            // URL ATUALIZADO
            '0f39f40eb400.ngrok-free.app',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            // URL ATUALIZADO
            '0f39f40eb400.ngrok-free.app',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },

  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];