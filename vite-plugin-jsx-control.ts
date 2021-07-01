import babel from '@babel/core';

export default {
  name: 'babel',
  enforce: 'pre',
  transform(code: string, id: string) {
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
};
