const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: { index: path.resolve(__dirname, "src/js", "main.js") },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'main.bundle.js',
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ]
    }
};
