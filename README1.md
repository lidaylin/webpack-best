# 创建最好的webpack构建工具

## **基础篇**
### **webpack核心概念**
* entry: 入口
* output: 输出
* loader: 模块转换器，用于把模块原内容按照需求转换成新内容
* 插件(plugins): 扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情

### **工程初始化**
先安装webpack, webpack-cli
```
npm install webpack webpack-cli -D
```
然后在新建在新建一个src/index.js的入口文件
```
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
```
最后用npx mode=development webpack 构建，查看构建结果
或者用npx mode=production webpack 构建，查看构建结果

### **转化js语法（es6->es5,jsx语法转化）**
先安装babel-loader
```
npm install babel-loader -D
```
同时安装依赖
```
npm install @babel/core @babel/preset-env @babel/plugin-transform-runtime -D

npm install @babel/runtime @babel/runtime-corejs3
```
新建webpack.config.js
```
module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/ //排除 node_modules 目录
            }
        ]
    }
}
```
创建一个.babelrc文件为babel-loader提供配置信息
```
{
    "presets": ["@babel/preset-env"],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "corejs": 3
            }
        ]
    ]
}
```
或者
```
module.exports = {
    // mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs": 3
                                }
                            ]
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
}
```
### **mode**
```
module.exports = {
    mode: 'development' | 'production' | 'none
}
```
mode=development 时，启动用 NamedChunksPlugin 和 NamedModulesPlugin  
model=production 时， 启动用FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin

### **在浏览器中查看页面**
安装html-webpack-plugin
```
npm install html-webpack-plugin
```
然后使用
```
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    ...
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            config: {
                title: '首页'
            }
        })
    ]
}
```
config作用是为模板引擎提供模板数据
```
<html>
    <head>
        <title><%= htmlWebpackPlugin.options.config.title %></title>
    </head>
    <body>
    </body>
</html>
```
####如何在浏览器实时展示效果
先安装webpack-dev-server
```
npm install webpack-dev-server -D
```
修改package.json里的scripts:
```
"scripts": {
    "dev": "NODE_ENV=development webpack-dev-server",
    "build": "NODE_ENV=production webpack"
}
```
配置webpack.config.js
```
//webpack.config.js
module.exports = {
    //...
    devServer: {
        port: '3000', //默认是8080
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
    }
```
### **devtool**
```
module.exports = {
    devtool: 'cheap-module-eval-source-map' //开发环境下使用
}
```
在生产环境使用，source-map或者是none,使用source-map会生成一个.map文件，可以根据.map文件进行解析定位到源代码。

### **如何处理样式文件**
先安装
```
npm install style-loader less-loader css-loader postcss-loader autoprefixer less -D
```
然后配置
```
module.exports = {
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
}
```
### **图片/字体文件处理**
1.安装url-loader, file-loader
### **处理 html 中的本地图片**
使用html-withimg-loader可以解决问题，但是会无法使用html模板赋值<%=%><%%>无效，所以建议<img src="<%= require(url) %>">
### **入口配置**
```
entry 字符串 数组或者对象

```
### **出口配置**
output {  
    path //编译出来的代码  
    filename // 生成的文件名  
    publicPath // 生成的公共文件名，用于静态文件存在cdn的文件前缀  
}
### **每次打包前清空dist文件**





