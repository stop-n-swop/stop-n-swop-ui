const jpex = require('@jpex-js/vite-plugin');
const svg = require('vite-plugin-react-svg');
// const mdx = require('vite-plugin-mdx').default;
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
    config.plugins = [
      // mdx(),
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
      ...config.plugins,
    ];
    return config;
  },
};
