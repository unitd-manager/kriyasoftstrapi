/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const {
  PAGE_BUILDER_COMPONENTS,
} = require('../config/section-components');

const pageSchemaPath = path.resolve(
  process.cwd(),
  'src/api/page/content-types/page/schema.json'
);

const HIDDEN_PLUGIN_OPTIONS = {
  'content-manager': {
    visible: false,
  },
};

function createDynamicZone(components, options = {}) {
  return {
    type: 'dynamiczone',
    ...options,
    components: [...new Set(components)],
  };
}

function createSectionAttributes() {
  return {
    acf: {
      type: 'json',
      pluginOptions: HIDDEN_PLUGIN_OPTIONS,
    },
  };
}

function buildPageSchema() {
  const pageBuilderComponents = [
    ...new Set([
      ...PAGE_BUILDER_COMPONENTS,

      // Explicitly preserve the Qubi Differentiators block.
      'acf-sections.qubi-differentiators-section',
    ]),
  ];

  return {
    kind: 'collectionType',

    collectionName: 'pages',

    info: {
      displayName: 'Page',
      singularName: 'page',
      pluralName: 'pages',
    },

    attributes: {
      title: {
        type: 'string',
        pluginOptions: HIDDEN_PLUGIN_OPTIONS,
      },

      slug: {
        type: 'uid',
        targetField: 'title',
        pluginOptions: HIDDEN_PLUGIN_OPTIONS,
      },

      seo: {
        type: 'component',
        repeatable: false,
        component: 'shared.seo',
      },

      pageType: {
        type: 'enumeration',
        enum: [
          'landing',
          'blog',
          'about',
          'service',
          'career',
          'resource',
        ],
        default: 'landing',
        pluginOptions: HIDDEN_PLUGIN_OPTIONS,
      },

      ...createSectionAttributes(),

      pageBuilder: createDynamicZone(
        pageBuilderComponents,
        {
          configurable: false,
        }
      ),
    },
  };
}

function writeSchema() {
  const schema = buildPageSchema();

  fs.mkdirSync(path.dirname(pageSchemaPath), {
    recursive: true,
  });

  fs.writeFileSync(
    pageSchemaPath,
    `${JSON.stringify(schema, null, 2)}\n`,
    'utf8'
  );

  const components =
    schema.attributes.pageBuilder.components;

  const differentiatorExists = components.includes(
    'acf-sections.qubi-differentiators-section'
  );

  console.log(
    `Generated ${path.relative(
      process.cwd(),
      pageSchemaPath
    )}`
  );

  console.log(
    `Page Builder components: ${components.length}`
  );

  console.log(
    `Qubi Differentiator registered: ${differentiatorExists}`
  );

  if (!differentiatorExists) {
    throw new Error(
      'Qubi Differentiator was not registered in pageBuilder.'
    );
  }
}

writeSchema();