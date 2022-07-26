const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: { index: path.resolve(__dirname, "src/js", "main.js") },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'main.bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./", "index.html")
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
};
