# 创建最好的webpack构建工具

## **基础篇**
### **webpack核心概念**
* entry: 入口
* output: 输出
* loader: 模块转换器，用于把模块原内容按照需求转换成新内容
* 插件(plugins): 扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事情

## **工程初始化**
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

## **转化js语法（es6->es5,jsx语法转化）**
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
## **mode**
```
module.exports = {
    mode: 'development' | 'production' | 'none
}
```
mode=development 时，启动用 NamedChunksPlugin 和 NamedModulesPlugin
model=production 时， 启动用FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin

## **在浏览器中查看页面**