const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// Tree-shaking examples from webpack docs (commented)
// Reference: https://webpack.js.org/guides/tree-shaking/
//
// 1) Development hint to mark used exports (helps see shakeable code):
// optimization: {
// 	usedExports: true,
// },
//
// 2) Production build enabling minification and tree-shaking automatically:
// mode: 'production',
// Note: 'production' also applies ModuleConcatenationPlugin internally.
// Ensure CSS side effects are preserved when using sideEffects by listing "**/*.css".

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src/main.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.[contenthash].js',
		clean: true
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			title: 'Vue + Webpack App'
		})
	],
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist')
		},
		port: 5173,
		open: true,
		hot: true
	}
};


