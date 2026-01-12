import {
  vitePluginSvgLoader,
  VitePluginSvgLoaderPlugin,
} from '@asus-aics/vite-plugin-svg-loader';

/**
 * turn black into css variable with default black
 * @param code SVG code
 * @returns transformed SVG Code
 */
export const transformDarkColor = (code: string): string => {
  return code.replace(darkReg, 'var(--x-icon-color, currentColor)');
};
const darkReg = /(#00000000|#000000|#000|black)/g;

/**
 * XuiSvgLoader, should be import in fe.
 */
export const xuiSvgLoader = (): VitePluginSvgLoaderPlugin =>
  vitePluginSvgLoader({
    svgTransforms: [transformDarkColor],
    includes: [/icon-component(\\|\/).*\.svg/],
  });
