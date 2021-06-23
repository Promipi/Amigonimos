const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;

module.exports = {
    entry: ["./src/index.js", "./src/styles/main.scss"],
    output: {
        path: path.join(__dirname, "../public"),
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        contentBase: __dirname + '../public'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: 
                [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new MiniCSSExtractPlugin({
            filename: "bundle.css",
        }),
        new LinkTypePlugin({
            '*.css' : 'text/css'
        })
    ]
}