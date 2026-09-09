import type { StrapiApp } from '@strapi/strapi/admin';
import type {
  ContentManagerPlugin,
  PanelComponent,
  PanelComponentProps,
} from '@strapi/content-manager/strapi-admin';

import WordPressPostsIcon from './components/WordPressPostsIcon';
import WordPressPostsTable from './components/WordPressPostsTable';
import SeoScorePanel from './extensions/seo-score-panel/SeoScorePanel'; // ★ ADDED

const PLUGIN_ID = 'qbo-wordpress-posts';

type PostDocument = {
  wpPostIds?: string;
  displayWpData?: boolean;
};

const WordPressPostsPanel: PanelComponent = ({ model, document }: PanelComponentProps) => {
  if (model !== 'api::post.post') {
    return null;
  }

  const postDocument = (document ?? {}) as PostDocument;

  return {
    title: 'WordPress Posts',
    content: (
      <WordPressPostsTable
        wpPostIds={postDocument.wpPostIds}
        enabled={postDocument.displayWpData ?? false}
      />
    ),
  };
};

export default {
  config: {
    locales: [],
  },

  register(app: StrapiApp) {
    app.addMenuLink({
      to: `/plugins/${PLUGIN_ID}`,
      icon: WordPressPostsIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'WordPress Posts',
      },
      // ★ FIXED — return the import() promise directly instead of
      // awaiting it and returning `.default` manually. Strapi's
      // addMenuLink expects Component: () => Promise<{ default: ComponentType }>,
      // and TS was rejecting the async/await/return-.default version.
      Component: () => import('./pages/WordPressPostsPage'),
      permissions: [],
      position: 20,
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      name: 'WordPress Posts',
    });
  },

  bootstrap(app: StrapiApp) {
    const apis = app.getPlugin('content-manager')
      .apis as ContentManagerPlugin['config']['apis'];

    apis.addEditViewSidePanel([WordPressPostsPanel, SeoScorePanel]); // ★ CHANGED
  },
};