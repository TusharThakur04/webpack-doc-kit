/**
 * Configuration for @node-core/doc-kit when generating webpack API docs.
 *
 * @type {import('@node-core/doc-kit/src/utils/configuration/types').Configuration}
 */
export default {
  global: {
    // Point GitHub links to the webpack repository instead of nodejs/node
    repository: 'webpack/webpack',
  },
  web: {
    // Use "webpack" as the product name in navbar and sidebar labels
    title: 'webpack',
  },
  'jsx-ast': {
    // Disable the "Edit this page" link — webpack API docs are generated from
    // TypeScript types and don't have a corresponding hand-editable source file.
    editURL: '',
  },
};
