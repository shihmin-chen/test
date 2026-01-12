import glob from 'fast-glob';

export default (): string[] => {
  const names = glob.sync('src/**/XIcon/icon-component/*.svg').map((str) => {
    const paths = str.split('/');
    return paths[paths.length - 1].replace('.svg', '');
  });
  return names;
};
