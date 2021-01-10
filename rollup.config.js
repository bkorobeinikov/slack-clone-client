import path from 'path';

import { terser } from 'rollup-plugin-terser';
import clear from 'rollup-plugin-clear';
import replace from 'rollup-plugin-replace';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import visualize from 'rollup-plugin-visualizer';
import postcss from 'rollup-plugin-postcss';
import html from '@rollup/plugin-html';

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

export default {
    input: 'src/clients/web/src/index.tsx',
    preserveEntrySignatures: false,
    output: {
        dir: 'dist/web',
        format: 'es',
        sourcemap: true,
        plugins: isProduction ? [terser()] : [],
    },
    plugins: [
        clear({
            targets: ['dist/web'],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(env),
        }),
        typescript({ tsconfig: path.resolve(__dirname, './src/clients/web/tsconfig.json') }),
        // postcss({
        //     plugins: [postcssUrl({ url: 'inline', basePath: path.resolve(__dirname, './src/app/ui/styles/') })],
        // }),
        resolve(),
        commonjs(),
        visualize({ filename: './dist/report-web.html' }),
        postcss({
            plugins: [require('tailwindcss')('./tailwind.config.js'), require('autoprefixer')],
        }),
        html(),
    ],
};
