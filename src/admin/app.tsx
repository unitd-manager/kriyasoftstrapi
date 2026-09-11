import type { StrapiApp } from '@strapi/strapi/admin';
import SeoScorePanel from './extensions/seo-score-panel/SeoScorePanel';

export default {
  config: {
    locales: [],
  },

  register(app: StrapiApp) {
    // WordPress Posts plugin registration removed.
  },

  bootstrap(app: StrapiApp) {
    const contentManagerApis = app.getPlugin('content-manager')
      .apis as { addEditViewSidePanel: (panels: Array<any>) => void };

    contentManagerApis.addEditViewSidePanel([SeoScorePanel]);
  },
};