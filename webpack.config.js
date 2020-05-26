const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const isDev = process.env.WEB_ENV === 'development' ? true : false

module.exports = {
    entry: ['./src/index.js', 'babel-polyfill', 'whatwg-fetch'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.[hash:16].js',
        publicPath: '/'
    },
    mode: process.env.WEB_ENV,
    devtool: isDev ? 'cheap-module-eval-source-map' : 'hidden-source-map',
    devServer: {
        port: '3000', //默认是8080ß
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    'style-loader', 
                    {
                       loader: 'css-loader',
                       options: {
                           modules: {
                            localIdentName: '[path][name]__[local]--[hash:5]'
                           }
                       }
                    }, 
                   {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('autoprefixer')({
                                    "overrideBrowserslist": [
                                        ">0.25%",
                                        "not dead"
                                    ]
                                })
                            ]
                        }
                    }
                }, 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10K
                            esModule: false 
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            config: {
                title: '首页'
            }
        }),
        new CleanWebpackPlugin()
    ]
} 