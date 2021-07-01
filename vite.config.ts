import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import jpex from '@jpex-js/vite-plugin';
import svg from 'vite-plugin-react-svg';
import { visualizer } from 'rollup-plugin-visualizer';
import mdx from 'vite-plugin-mdx';
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import';
import jsxControl from './vite-plugin-jsx-control';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    emptyOutDir: true,
    polyfillDynamicImport: false,
    rollupOptions: {
      plugins: [
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
    mdx(),
    importToCDN({
      modules: [autoComplete('react'), autoComplete('react-dom')],
    }),
    jpex({
      pathAlias: {
        infrastructure: '/src/infrastructure',
        core: '/src/core',
      },
      omitIndex: true,
    }),
    jsxControl,
    reactRefresh(),
    svg({
      defaultExport: 'component',
      expandProps: 'end',
    }),
  ],
});
