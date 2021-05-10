const { resolve } = require('path');

module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-typescript',
      {
        onlyRemoveTypeImports: true,
      },
    ],
  ],
  plugins: [
    [
      'jpex/babel-plugin',
      {
        pathAlias: {
          infrastructure: '/src/infrastructure',
          core: '/src/core',
        },
        omitIndex: true,
      },
    ],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    'babel-plugin-jsx-control-statements',
    [
      'babel-plugin-module-resolver',
      {
        root: [resolve('./src')],
        extensions: ['.ts', '.tsx'],
      },
    ],
  ],
};

if (process.env.NODE_ENV === 'test') {
  module.exports.presets.push([
    '@babel/preset-env',
    {
      modules: 'commonjs',
      useBuiltIns: false,
      targets: {
        node: 'current',
      },
    },
  ]);
}
