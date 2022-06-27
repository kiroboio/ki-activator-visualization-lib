import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from "@rollup/plugin-image";
import pkg from './package.json';

export default [
	{
		input: 'src/main.js',
		output: [
			{ name: 'KiroboGame', file: pkg.browser, format: 'umd' },
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],

		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
			image({
				dom: true
			}),
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	// {
	// 	input: 'src/main.js',
	// 	output: [
	// 		{ file: pkg.main, format: 'cjs' },
	// 		{ file: pkg.module, format: 'es' }
	// 	],
	// }
];
