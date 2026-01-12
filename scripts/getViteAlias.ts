import { resolve } from 'path';
const xuiRoot = resolve(__dirname, '../');

function getXuiAssetsAlias(): { '@xui-assets': string } {
  const outside = 'public/assets/';

  return {
    '@xui-assets': resolve(xuiRoot, outside),
  };
}

/**
 * Get xui alias which can be used.
 */
function getXuiAlias(): Record<string, string> {
  return {
    ...getXuiAssetsAlias(),
    '@asus-aics/xui/assets': resolve(xuiRoot, 'public/assets'),
    '@asus-aics/xui/xui.css': resolve(xuiRoot, 'dist/index.css'),
    '@asus-aics/xui/normalize.css': resolve(xuiRoot, 'node_modules/modern-normalize/modern-normalize.css'),
    '@asus-aics/xui': resolve(xuiRoot, 'index.ts'),
  };
}

export { xuiRoot, getXuiAlias, getXuiAssetsAlias };
