import path	from "path"
import webpack from "webpack"

export default {
	mode: 'development',
	entry: {index: path.resolve("src/js", "main.js")},
	output: {
		path: path.resolve('dist/js'),
		filename: 'main.bundle.js',
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	],
	resolve: {
		alias: {
			handlebars: 'handlebars/dist/handlebars.min.js'
		}
	}
};


//
// const path = require('path');
// const webpack = require('webpack');
//
// module.exports = {
// 	mode: 'development',
// 	entry: {index: path.resolve(__dirname, "src/js", "main.js")},
// 	output: {
// 		path: path.resolve(__dirname, 'dist/js'),
// 		filename: 'main.bundle.js',
// 	},
// 	plugins: [
// 		new webpack.ProvidePlugin({
// 			$: 'jquery',
// 			jQuery: 'jquery'
// 		})
// 	],
// 	resolve: {
// 		alias: {
// 			handlebars: 'handlebars/dist/handlebars.min.js'
// 		}
// 	}
// };
