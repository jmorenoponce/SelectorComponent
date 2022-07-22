const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: { index: path.resolve(__dirname, "src/js", "main.js") },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./", "index.html")
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'main.bundle.js',
    },
};
