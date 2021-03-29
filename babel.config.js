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
    // [
    //   '@babel/preset-env',
    //   {
    //     modules: process.env.NODE_ENV === 'test' ? 'commonjs' : false,
    //     useBuiltIns: false,
    //   },
    // ],
  ],
  plugins: [
    [
      'jpex/babel-plugin',
      {
        pathAlias: {
          adapters: '/src/adapters',
          core: '/src/core',
          ports: '/src/ports',
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
