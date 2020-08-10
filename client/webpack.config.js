const path = require("path");
const BabiliPlugin = require("babili-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let plugins = [];

if (process.env.NODE_ENV == "production") {
    minify = {
        html5: true,
        collapseWhitespace: true,
        removeComments: true
    };
} else {
    minify = { html5: true };
}

plugins.push(new HtmlWebpackPlugin({
    hash: true,
    minify,
    filename: "index.html",
    template: __dirname + "/main.html"
}));

plugins.push(new ExtractTextPlugin("styles.css"));

plugins.push(new Webpack.ProvidePlugin({
    "$": "jquery/dist/jquery.js",
    "jQuery": "jquery/dist/jquery.js"
}));

plugins.push(new Webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor.bundle.js"
}));

let SERVICE_URL = JSON.stringify("http://localhost:3000");
if (process.env.NODE_ENV == "production") {

    SERVICE_URL = JSON.stringify("http://endereco-da-sua-api");

    plugins.push(new Webpack.optimize.ModuleConcatenationPlugin())

    plugins.push(new BabiliPlugin());

    plugins.push(new OptimizeCSSAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true
    }));
}

plugins.push(new Webpack.DefinePlugin({
    SERVICE_URL
}));

module.exports = {
    entry: {
        app: "./app-src/app.js",
        vendor: ["jquery", "bootstrap", "reflect-metadata"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            { 
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'file-loader' 
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml' 
            }
        ]
    },
    plugins
}