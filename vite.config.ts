import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import babel from '@babel/core';
// import analyze from 'rollup-plugin-analyzer';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      infrastructure: '/src/infrastructure',
      core: '/src/core',
      domain: '/src/domain',
      application: '/src/application',
      ui: '/src/ui',
      crosscutting: '/src/crosscutting',
    },
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  // build: {
  //   minify: false,
  //   rollupOptions: {
  //     plugins: [analyze({ summaryOnly: true, stdout: true })],
  //   },
  // },
  plugins: [
    {
      name: 'babel',
      enforce: 'pre',
      transform(code, id) {
        if (!id.endsWith('.ts') && !id.endsWith('.tsx')) {
          return;
        }
        if (
          !code.includes('jpex') &&
          !code.includes('react-jpex') &&
          !code.includes('<If') &&
          !code.includes('<Choose>')
        ) {
          return;
        }
        return new Promise((res, rej) => {
          babel.transform(
            code,
            {
              filename: id,
              babelrc: false,
              presets: [],
              plugins: [
                '@babel/plugin-syntax-typescript',
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
                'babel-plugin-jsx-control-statements',
              ],
            },
            (err, result) => {
              if (err) {
                return rej(err);
              }
              res({
                code: result.code,
              });
            },
          );
        });
      },
    },
    reactRefresh(),
  ],
});
