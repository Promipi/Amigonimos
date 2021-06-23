const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ["./src/index.js", "./src/styles/main.scss"],
    output: {
        path: path.join(__dirname, "../public"),
        filename: "bundle.js"
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
        })
    ]
}