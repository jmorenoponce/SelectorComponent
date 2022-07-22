const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/main.js',
    // plugins: [
    //     // Provides jQuery for other JS bundled with Webpack
    //     new webpack.ProvidePlugin({
    //         $: 'jquery',
    //         jQuery: 'jquery'
    //     })
    // ],
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'main.bundle.js',
    },
};