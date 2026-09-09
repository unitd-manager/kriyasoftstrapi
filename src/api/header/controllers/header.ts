import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::header.header', ({ strapi }) => ({
  async find(ctx) {
    // Force a deep populate so nav_links -> children, and the logo media,
    // always come back regardless of what the client requests.
    ctx.query = {
      ...ctx.query,
      populate: {
        logo: true,
        nav_links: {
          populate: {
            children: true,
          },
        },
      },
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
}));