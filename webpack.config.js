/*
 * @Author: 柿子
 * @Date:   2017-07-01 00:04:43
 * @Last Modified by:   柿子
 * @Last Modified time: 2017-07-03 01:29:37
 */
var webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
    // 环境变量配置  dev/ online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

//获取html-webpack
var getHtmlConfig = function(name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['commons', name]
    }
}
var config = {
    entry: {
        'commons': ['./src/page/commons/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
    },
    output: {
        path: './dist',
        publicPath: '/dist',
        filename: 'js/[name].js',
    },
    external: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=20000&name=resource/[name].[ext]' },
        ]
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    },
    plugins: [
        //独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'js/base.js',
        }),
        //把css单独打包文件
        new ExtractTextPlugin("css/[name].css"),
        // html模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
}
if ('dev' == WEBPACK_ENV) {
    config.entry.commons.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config
