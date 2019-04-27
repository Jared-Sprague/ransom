const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/index.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    cache: true,
                    fix: true,
                },
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: ["@babel/preset-env"],
                        plugins: [
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-syntax-dynamic-import",
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(a?png|svg|jpe?g|gif|webp)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new PrettierPlugin({
            configFile: "prettier.config.js",
        }),
        new HtmlWebpackPlugin({
            template: "src/index.ejs",
            templateParameters: require("./src/metadata.js"),
            title: `Ransom`,
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    performance: {
        maxEntrypointSize: 5000000, // bytes
        maxAssetSize: 5000000, // bytes
    },
};
