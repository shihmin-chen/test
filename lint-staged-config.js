module.exports = {
  '*vue': (files) => {
    const isXuiComponentFolderChanges = files.some((fileName) => fileName.includes('/xui/src/'));
    const scripts = ['pnpm --filter xui-doc run docs:api', 'git add **/docs/api/**/*.md'];

    return isXuiComponentFolderChanges ? scripts : [];
  },
};
