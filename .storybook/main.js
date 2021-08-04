const jpex = require('@jpex-js/vite-plugin');
const svg = require('vite-plugin-react-svg');
const mdx = require('vite-plugin-mdx').default;
const jsxControl = require('../vite-plugin-jsx-control');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'storybook-builder-vite',
  },
  viteFinal: (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      infrastructure: '/src/infrastructure',
      core: '/src/core',
      domain: '/src/domain',
      application: '/src/application',
      ui: '/src/ui',
      crosscutting: '/src/crosscutting',
    };
    config.resolve.extensions = ['.js', '.ts', '.mjs', '.tsx', '.mdx'];
    config.plugins = [
      jpex({
        pathAlias: {
          infrastructure: '/src/infrastructure',
          core: '/src/core',
        },
        omitIndex: true,
      }),
      jsxControl,
      svg({
        defaultExport: 'component',
        expandProps: 'end',
      }),
      mdx(),
      ...config.plugins.filter((plugin) => {
        return (
          !plugin.name?.includes('mdx') && !plugin?.[0]?.name?.includes('mdx')
        );
      }),
    ];
    return config;
  },
};
