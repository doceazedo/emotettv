import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';

import { module, main } from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: main,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: module,
      format: 'es',
      exports: 'named',
    },
  ],
  plugins: [
    del({ targets: ['dist/*'] }),
    resolve(),
    commonjs(),
    terser(),
    typescript(),
  ],
};
