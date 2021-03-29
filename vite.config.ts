import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import babel from '@babel/core';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      adapters: '/src/adapters',
      core: '/src/core',
      ports: '/src/ports',
      ui: '/src/ui',
    },
  },
  server: {
    // open: true,
  },
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
                      adapters: '/src/adapters',
                      core: '/src/core',
                      ports: '/src/ports',
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
