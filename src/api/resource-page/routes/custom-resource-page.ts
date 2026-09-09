export default {
  routes: [
    {
      method: 'GET',
      path: '/resource-pages/slug/:slug',
      handler: 'resource-page.findBySlug',
      config: { auth: false },
    },
  ],
};