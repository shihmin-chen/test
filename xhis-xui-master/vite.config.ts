import vue from '@vitejs/plugin-vue';
import Markdown from 'unplugin-vue-markdown/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { getConventionModuleExtension } from './scripts/getConventionModuleName';
import getIconName from './scripts/getIconName';
import { getXuiAssetsAlias } from './scripts/getViteAlias';
import { xuiSvgLoader } from './scripts/xuiSvgLoader';

// https://vitejs.dev/config/
// @ts-expect-error vite-plugin-dts
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const isDev = mode === 'development';

  /** For auto list all icon available in vite start */
  const iconNames = getIconName();

  return {
    plugins: isProd
      ? [
          xuiSvgLoader(),
          vue({ template: { compilerOptions: { hoistStatic: false } } }),
          dts(),
        ]
      : [
          xuiSvgLoader(),
          vue({
            template: { compilerOptions: { hoistStatic: false } },
            include: [/\.vue$/, /\.md$/],
          }),
          Markdown({}),
        ],
    base: './',
    define: {
      __XUI_VERSION__: JSON.stringify(process.env.npm_package_version),
      __XUI_IS_PROD__: `${isProd}`,
      __XUI_IS_DEV__: `${isDev}`,
      __XUI_ICON_NAMES__: JSON.stringify(iconNames),
    },
    resolve: {
      alias: {
        ...getXuiAssetsAlias(), // @xui-assets/ => /public/assets/
      },
    },
    server: {
      port: 3060,
    },
    /**  @see https://vitejs.dev/guide/build.html#library-mode */
    build: {
      cssCodeSplit: true,
      reportCompressedSize: false,
      target: ['esnext'],

      lib: {
        entry: './index.ts',
        formats: ['cjs', 'es'],
        name: 'ExtXFeXui',
        fileName: (format) => `index.${getConventionModuleExtension(format)}`,
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: [
          'vue',
          'tippy.js', // This is necessary!
          '@vueuse/core', // This is necessary!
          'vuedraggable', // This is necessary! because it is a vue2 module, can't be bundled with vue3 in mjs.
          '@asus-aics/x-fe-emitter', // This is necessary!
        ],
        output: {
          // Provide global variables to use in the UMD/iife build for externalized deps
          // https://rollupjs.org/guide/en/#outputglobals
          globals: {
            vue: 'Vue',
            'tippy.js': 'ExtTippyJs',
            '@vueuse/core': 'ExtVueUseCore',
            vuedraggable: 'ExtVueDraggable',
            '@asus-aics/x-fe-emitter': 'ExtXFeEmitter',
          },
        },
      },
    },
  };
});
