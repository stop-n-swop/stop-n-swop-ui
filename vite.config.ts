import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import babel from '@babel/core';
import jpex from '@jpex-js/vite-plugin';
// import analyze from 'rollup-plugin-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      plugins: [
        // analyze()
        visualizer({
          gzipSize: true,
          brotliSize: true,
          template: 'sunburst',
        }),
      ],
    },
  },
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
    port: 6001,
    proxy: {
      '/api': {
        target: 'http://localhost:6000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/'),
      },
    },
  },
  plugins: [
    jpex({
      pathAlias: {
        infrastructure: '/src/infrastructure',
        core: '/src/core',
      },
      omitIndex: true,
    }),
    {
      name: 'babel',
      enforce: 'pre',
      transform(code, id) {
        if (!id.endsWith('.ts') && !id.endsWith('.tsx')) {
          return;
        }
        if (!code.includes('<If') && !code.includes('<Choose>')) {
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
