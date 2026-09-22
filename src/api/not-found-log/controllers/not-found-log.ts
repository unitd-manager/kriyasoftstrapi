import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::not-found-log.not-found-log', ({ strapi }) => ({
  // Overrides the default POST /not-found-logs behavior: instead of
  // always creating a new row (which would spam the list every time the
  // same broken link is hit), find an existing row with this exact URL
  // and increment its hit count; only create a new row the first time
  // a given URL 404s.
  async create(ctx) {
    const url = ctx.request.body?.data?.url;

    if (typeof url !== 'string' || !url.trim()) {
      return ctx.badRequest('url is required');
    }

    const existing = await strapi.db
      .query('api::not-found-log.not-found-log')
      .findOne({ where: { url } });

    if (existing) {
      const updated = await strapi.db.query('api::not-found-log.not-found-log').update({
        where: { id: existing.id },
        data: {
          hits: (existing.hits ?? 0) + 1,
          lastSeenAt: new Date(),
        },
      });
      return { data: updated };
    }

    const created = await strapi.db.query('api::not-found-log.not-found-log').create({
      data: {
        url,
        hits: 1,
        lastSeenAt: new Date(),
      },
    });

    return { data: created };
  },
}));