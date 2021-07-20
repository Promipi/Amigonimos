const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;

module.exports = {
    stats: {
        warnings:false,
    },
    entry: [
        path.join(__dirname, "./src/index.js"),
        path.join(__dirname, "./src/styles/main.scss")
    ], 
    resolve: {
        extensions:[".ts",".js"]
    },
    output: {
        path: path.join(__dirname, "./public"),
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, "./public")
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
                test:/\.ts/,
                use:["ts-loader"]
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
            template: path.join(__dirname, "./index.html")
        }),
        new MiniCSSExtractPlugin({
            filename: "bundle.css",
        }),
        new LinkTypePlugin({
            '*.css' : 'text/css'
        })
    ]
}