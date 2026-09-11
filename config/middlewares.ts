import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',

  {
    name: 'strapi::cors',
    config: {
      origin: (ctx) => {
        const requestOrigin = ctx.request.header.origin;

        if (!requestOrigin) {
          return '';
        }

        /**
         * Allow ANY localhost / 127.0.0.1 port during local
         * development (npm run dev, npm run preview, or any
         * other local tool), so this never needs manual
         * editing again when a port changes.
         */
        const isLocalhost =
          /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(
            requestOrigin
          );

        const allowedProdOrigins = [
                 'https://kriyasoft.io',
        'https://www.kriyasoft.io',

        ];

        if (
          isLocalhost ||
          allowedProdOrigins.includes(requestOrigin)
        ) {
          return requestOrigin;
        }

        return '';
      },

      headers: [
        'Content-Type',
        'Authorization',
        'Origin',
        'Accept',
      ],

      credentials: true,

      keepHeaderOnError: true,
    },
  },

  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',

  {
    name: 'global::normalize-media-urls',
  },

  'strapi::favicon',
  'strapi::public',

  // Temporarily disabled custom page admin optimization.
  //
  // {
  //   name: 'global::optimize-page-admin-list',
  // },

  {
    name: 'global::qbo-posts-router',
  },
];

export default config;